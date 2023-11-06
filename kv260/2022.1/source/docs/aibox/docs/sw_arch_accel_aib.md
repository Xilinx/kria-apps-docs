<table class="sphinxhide">
 <tr>
   <td align="center"><img src="../../media/xilinx-logo.png" width="30%"/><h1>Kria&trade; KV260 Vision AI Starter Kit AI Box Distributed Tutorial</h1>
   </td>
 </tr>
 <tr>
 <td align="center"><h1> Software Architecture of the Application</h1>

 </td>
 </tr>
</table>

# Software Architecture of the Application

## Introduction

 This document describes the software architecture of the AI Box Distributed application.

## Software Platform and Dependencies

We leverage the GStreamer multi-media orchestration platform for application software development. As described in following sections about GStreamer pipeline, all the processing units in the stream pipeline are presented to the user as easily pluggable and changeable plugins, enabling a “low touch” developer adaptation of the reference design pipeline within the context of an open-source and non-vendor specific implementation.

**Vitis AI 2.5.0** is the core underlying component to access the AI inference capability provided by Xilinx DPU.

To access DPU and other PL hardware accelerator functions from GStreamer, Xilinx developed Vitis Video Analysis SDK (VVAS) to provide convenient and customizable GStreamer plugins for it.

## Overview of The Distributed Application

![Overall video data flow](../../media/aibox-dist-diagram.png)

The AI Box Distributed application supports up to 4 distributed SOM with Camera to capture, inference and stream(**1080p, H264/H265**), and 1 dedicated monitoring center SOM with application which accepts up to 4 channels of RTSP streams from the remote IP Cameras.

## Server Application: Image Capturing and Streaming

The distributed camera application supports capturing images (**1080p, NV12**) from MIPI/USB camera or decoding from on-disk video files, then performs pedestrian detection and pedestrian feature extraction on the stream using the AI inference accelerator (DPU). Next, orientation detection is performed on each detect pedestrian. Finally, the 3 kinds of info, bounding boxes, feature, and orientation are sent together with the encoded H264/H265 as RTSP stream.

As shown in following figures, decoded NV12 buffers are first pre-processed to prepare the buffer for ingestion by the pedestrian detection model in DPU. This includes color space conversion and resize operations.

The DPU then performs the inference with **RefineDet** on the incoming buffer, whose results are post-processed to get bounding box around and feature of each pedestrian. The bounding box information is then used to crop the region of interest for the detected person and DPU will run **Orientation** model on it to get orientation info of the pedestrian.

![refinedet-inference-data-flow](../../media/aibox-dist-data_flow_refinedet.png)

The figure above shows the GStreamer pipeline used in this application. There are 5 main components described below: Pedestrian Preprocess, Pedestrian Detection, Crop, ReID and Orientation, Meta Data Attaching.

* Pedestrian Preprocess

    The pedestrian detection model requires downscaled BGR frames so the received decoded NV12 frames need to be pre-processed to do color space conversion and resizing. For best performance, these steps are performed using a dedicated pre-processing hardware accelerator IP, as described in the [Hardware Accelerator Architecture](hw_arch_accel_aib.md)

    NV12 to BGR conversion and image resizing, are to meet the requirement of the DPU AI inference engine. These steps are done in one dedicate preprocessing IP, which is detailed in the [Accelerator IP Modules](../../smartcamera/docs/hw_arch_accel.md#pre-processing-ips-and-dpu), to achieve the optimal framerate and latency.

    vvas_xmultisrc GStreamer plugin from VVAS with customized kernel /opt/xilinx/kv260-aibox-dist/lib/libvvas_pedpp.so are used to integrate the accelerator IP functionality into the pipeline.

    Configuration file: /opt/xilinx/kv260-aibox-dist/share/vvas/ped_pp.json, contains the PL kernel and software kernel library info, which will do the colour conversion and resize.

```json
    {
      "kernel-name": "pp_pipeline_accel:{pp_pipeline_accel_1}",
      "library-name": "libvvas_pedpp.so",
      "config": {
        "debug_level" : 0,
        "mean_r": 0,
        "mean_g": 0,
        "mean_b": 0,
        "scale_r": 1,
        "scale_g": 1,
        "scale_b": 1
      }
    }
```

* Pedestrian Detection

    vvas_xfilter GStreamer plugin with kernel library /usr/lib/libvvas_dpuinfer.so works as middleware between the application which interfaces with user and underlying Vitis AI library. The Vits AI library then interfaces with DPU to feed the actual AI inference tasks.

    Configuration file: /opt/xilinx/kv260-aibox-dist/share/vvas/refinedet.json, contains the actual model info we will run in this plugin.

```json
    "config": {
        "model-name" : "refinedet_pruned_0_96",
        "model-class" : "REFINEDET",
        "model-path" : "/opt/xilinx/kv260-aibox-dist/share/vitis_ai_library/models/",
        "run_time_model" : false,
        "need_preprocess" : true,
        "performance_test" : false,
        "debug_level" : 0
    }
```

* Crop Plugin

    Ivas_xfilter GStreamer plugin with kernel library /opt/xilinx/kv260-aibox-dist/lib/libvvas_crop.so will do the crop and resize on the input BGR image from previous pedestrian detection, based on the bbox info contained in the inference meta data, and attach the preprocessed images to the incoming inference meta data which will be passed down.

    Configuration file: /opt/xilinx/kv260-aibox-dist/share/vvas/crop.json.

* ReID and Orientation

    vvas_xfilter GStreamer plugin with kernel library /opt/xilinx/kv260-aibox-dist/lib/libvvas_reid.so will run ReID on the incoming pedestrian images, get the ReID features, together with the coordinates of each person

    Configuration file: /opt/xilinx/kv260-aibox-dist/share/vvas/reid.json.

* Meta Data Attaching

    This plugin will send the AI inference results including the bounding boxes, pedestrian features and pedestrian orientation through ZMQ to the monitoring client board. These info will be used to do cross camera tracking.

### Additional GStreamer component used in Server App

Gst-Rtsp-Server lib is utilized to build up the RTSP server video stream with AI detection results.

## Client Application: Monitor Center Tracking and Rendering

At the monitor center, the application accepts the RTSP streams together with the AI inference meta data (bounding box, pedestrian feature and orientation) from remote camera, then decode the image stream, and perform the tracking algorithm on the meta data to obtain the cross camera ID for each pedestrian. Finally, bounding boxes and ID text are rendered over the original video frames and displayed on a **4K** monitor in a 2x2 grid.

![client_monitor_data_flow](../../media/aibox-dist-monitor-data-flow.png)

### Xilinx GStreamer Plugins

* Meta Parser

    MetaParser plugin receives the AI inference results and frame index info from server side and embeds it to the decoded buffers as meta data.

* Cross Cameras Tracking

    Accepts incominig buffers from the N (N<=4) streams, and syncs them according to either timestamp or frame index, then feeds to the cross camera tracking algorithm to get the final ID info, and pass this info down to next stage.

* AI Rendering

    vvas_xfilter GStreamer plugin with kernel library /opt/xilinx/kv260-aibox-dist/lib/libvvas_drawreid.so will just draw the bounding box and ID for each detected person.

    Configuration file: /opt/xilinx/kv260-aibox-dist/share/vvas/draw_reid.json.

### Additional GStreamer component used in Client App

The rtspsrc and omxh264dec are the standard GStreamer plugin which accept the RTSP stream and decode to NV12.

## Next Step

You can choose any of the following next steps:

* Read [Hardware Architecture of the Platform](hw_arch_platform_aib.md)

* Go back to the [KV260 AI Box design start page](../aibox-dist_landing)

## License

Licensed under the Apache License, Version 2.0 (the "License"); you may not use this file except in compliance with the License.

You may obtain a copy of the License at
[http://www.apache.org/licenses/LICENSE-2.0](http://www.apache.org/licenses/LICENSE-2.0)

Unless required by applicable law or agreed to in writing, software distributed under the License is distributed on an "AS IS" BASIS, WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied. See the License for the specific language governing permissions and limitations under the License.

<p align="center">Copyright&copy; 2022 Xilinx</p>
