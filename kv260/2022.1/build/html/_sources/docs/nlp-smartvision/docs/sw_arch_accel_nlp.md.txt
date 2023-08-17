<table class="sphinxhide">
 <tr>
   <td align="center"><img src="../../media/xilinx-logo.png" width="30%"/><h1> Kria&trade; KV260 Vision AI Starter Kit NLP SmartVision Tutorial</h1>
   </td>
 </tr>
 <tr>
 <td align="center"><h1> Software Architecture of the Accelerator </h1>

 </td>
 </tr>
</table>

# Software Architecture of the Accelerator

## Introduction

 This document describes the software architecture of the NLP SmartVision accelerator application.

## Software Platform and Dependencies

The OpenCV multi-media orchestration platform for application software development is leveraged. cv::VideoCapture is used to read from video capture pipeline. The captured buffer is sent to the data-processing unit (DPU) after the processor pre-processing. The DPU returns metadata and the processor handles post-processing to render the output buffer. cv::VideoWrite sends the buffer to KMS Sink to display it on the DP/HDMI monitor.

Arm&reg; CMSIS for implementing keyword spotting.

**AMD Vitis&trade; AI 2.5.0** is the core underlying component to access the AI inference capability provides by the AMD DPU.

## Video Pipeline

![Overall video data flow](../../media/nlp_smartvision/software-overall-data-flow.png)

   > _Overall video data flow_

NLP SmartVision Accelerated Application supports live audio and video inputs from USB Microphone and MIPI respectively.

MIPI source will output the frames with a NV12 format which in turn are processed to BGR frames by VPSS.

![Gstreamer pipeline of the application](../../media/nlp_smartvision/gstreamer-pipeline.png)

   > _Gstreamer pipeline of the application_

Three AI tasks are supported: Facedetect, Objectdetect, and Platedetect.

## Additional GStreamer component used

## Next Steps

* Go back to the [KV260 SOM NLP SmartVision Design Start Page](../nlp_smartvision_landing)

## References

### License

Licensed under the Apache License, Version 2.0 (the "License"); you may not use this file except in compliance with the License.

You may obtain a copy of the License at
[http://www.apache.org/licenses/LICENSE-2.0](http://www.apache.org/licenses/LICENSE-2.0).

Unless required by applicable law or agreed to in writing, software distributed under the License is distributed on an "AS IS" BASIS, WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied. See the License for the specific language governing permissions and limitations under the License.

<p align="center">Copyright&copy; 2021-2023 Advanced Micro Devices, Inc</p>
