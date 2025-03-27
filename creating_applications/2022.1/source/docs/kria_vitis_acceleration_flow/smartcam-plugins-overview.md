# Overview of the Smartcam VVAS Plug-in

This step gives an overview of the VVAS plug-in used for the SmartCam application. The VVAS SmartCam code invokes the image-resizing kernel and DPU. The following graph shows the SmartCam application from input video to outputting insights. All the individual blocks are various plug-ins that are used. At the bottom, are the different hardware engines that are utilized throughout the application. The SmartCam pipeline works as follows:

- Streaming data can come over the MIPI camera directly. The meadiasrc bin plug-in is a wrapper around GStreamer generic v4l2src plug-in. The mediasrcbin plug-in is designed to simplify using live video capture devices in this design.

- ***AI Pre-processing***: The captured frames are sent to the image pre-processing step, where the input image can be pre-processed before inference. The plug-in performs the pre-processing step, as seen in the previous step. The pre-processor step converts the NV12 image to BGR format, image resizing, and quantizing blocks as required by the DPU AI inference engine. The quantizer function is added in step 1 of the ML tutorial.  

- ***AI Inference:*** After pre-processing, the frame is sent for inference. Inference is performed using the VVAS infrastructure plug-in, vvas_xfilter and the vvas_xdpuinfer acceleration library. The vvas_xdpuinfer library is an acceleration software library that controls the DPU through the Vitis AI interface.

- ***AI Rendering:*** To overlay the inference results, such as bounding boxes, labels, arrows, and so on, there is a software acceleration library called vvas_xboundingbox. This library and the vvas_xfilter plug-in draw bounding boxes and label information on the frame.

- Finally, VVAS presents various options to output the results, like rendering the output with the bounding boxes on the screen, saving the output to the local disk, and so on.
![smartcam](./images/Images/smartcam.png)

## Video Capture Plug-in

[Video Capture](https://xilinx.github.io/kria-apps-docs/kv260/2022.1/build/html/docs/smartcamera/docs/sw_arch_platform.html#video-capture) at the user-space level uses a media source bin plug-in. The [mediasrcbin](https://xilinx.github.io/kria-apps-docs/kv260/2022.1/build/html/docs/smartcamera/docs/sw_arch_platform.html#media-source-bin-gstreamer-plugin) plug-in is designed to simplify using live video capture devices in this design. The plug-in is a bin element that includes the standard [v4l2src](https://gstreamer.freedesktop.org/documentation/video4linux2/v4l2src.html?gi-language=c) GStreamer element. It configures the media pipelines of the supported video sources in this design. It allows you to configure the media pipeline and its sub-devices. It uses the libmediactl and libv4l2subdev libraries which provide the following functionality:

```
- Enumerate entities, pads and links
- Configure sub-devices
    - Set media bus format
    - Set dimensions (width/height)
    - Set frame rate
    - Export sub-device controls
```

## AI Pre-processing Plug-in

The vvas_xmultisrc plug-in controls the pre-processing step. The inputs to the plug-in are a JSON file and xclbin, which are available on the card at `/opt/xilinx/kv260-smartcam/share/vvas/${AI_TASK}/preprocess.json`. It contains information on the quantization of the resized BGR images. These values are generated from the AI model protoxt file and vary between AI task configs as the core AI algorithm demands. In the last step of compiling a YOLO model and changing these values, we will see. The current preprocess.json file uses the following:

```
"config": {
        "debug_level" : 0,
        "mean_r": 128,
        "mean_g": 128,
        "mean_b": 128,
        "scale_r": 1,
        "scale_g": 1,
        "scale_b": 1
    }
```

## AI Inference Plug-in

vvas_xfilter GStreamer plug-in with kernel library `/usr/lib/libvvas_dpuinfer.so` works as middleware between applications that interface with you and the underlying Vitis AI library, which interface with DPU to do the actual AI inference tasks. For three AI tasks that are supported: Facedetect, Refinedet, and SSD, you do not need to change anything in the .json file. The following is the .json file for Facedetect:

```
"xclbin-location":"/lib/firmware/xilinx/kv260-smartcam/kv260-smartcam.xclbin",
"vvas-library-repo": "/opt/xilinx/kv260-smartcam/lib",
  "element-mode": "transform",
  "kernels": [
    {
      "kernel-name": "pp_pipeline_accel:{pp_pipeline_accel_1}",
      "library-name": "libvvas_xpp.so",
      "config": {
        "debug_level" : 1,
        "mean_r": 128,
        "mean_g": 128,
        "mean_b": 128,
        "scale_r": 1,
        "scale_g": 1,
        "scale_b": 1
      }
    }
 }
```

## AI Rendering Plug-in

The results from the AI Inference step (such as coordinates of detected faces) are passed to the AI Rendering plug-in, which is responsible for drawing bounding boxes around the objects in the original frame. The vvas_xfilter GStreamer plug-in and kernel library, `/usr/lib/libvvas_xboundingbox.so`, do the AI results rendering work, based on the meta info passed down from the AI Inference plug-in to here with video buffers. The JSON file at `/opt/xilinx/kv260-smartcam/share/vvas/${AI_TASK}/drawresult.json` provides a way to customize the rendering properties such as font of the label and colors of the bounding box for different classes.

```
"xclbin-location":"/usr/lib/dpu.xclbin",
 "vvas-library-repo": "/opt/xilinx/kv260-smartcam/lib",
 "element-mode":"inplace",
 "kernels" :[
   {
     "library-name":"libvvas_airender.so",
     "config": {
         "fps_interval" : 10,
         "font_size" : 2,
         "font" : 3,
         "thickness" : 2,
         "debug_level" : 0,
         "label_color" : { "blue" : 0, "green" : 0, "red" : 255 },
         "label_filter" : [ "class", "probability" ],
         "classes" : [
         ]
     }
   }
 ]
```

## DP Output Plug-in

[kmssink](https://gstreamer.freedesktop.org/documentation/kms/index.html?gi-language=c) is a simple video sink that renders video frames directly in a plane of a DRM device. The kmssink element interfaces with the DRM/KMS Linux framework and the AMD DRM driver through the libdrm library and the dri-card device node. The kmssink element library uses the libdrm library to configure the cathode ray tube controller (CRTC) based on the monitor's extended display identification data (EDID) information with the video resolution of the display. It also configures plane properties such as the alpha value. Information on the Display software stack can be found [here](https://xilinx.github.io/kria-apps-docs/kv260/2022.1/build/html/docs/smartcamera/docs/sw_arch_platform.html#dp-tx-display).

## Next Steps

This completes the SmartCam VVAS overview. The next step is [SmartCam PetaLinux-firmware](./smartcam-petalinux.md).

<hr class="sphinxhide"></hr>

<p class="sphinxhide" align="center"><sub>Copyright © 2023-2025 Advanced Micro Devices, Inc.</sub></p>

<p class="sphinxhide" align="center"><sup><a href="https://www.amd.com/en/corporate/copyright">Terms and Conditions</a></sup></p>