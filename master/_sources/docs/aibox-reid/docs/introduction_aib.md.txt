<table class="sphinxhide">
 <tr>
   <td align="center"><img src="../../media/xilinx-logo.png" width="30%"/><h1> Kria&trade; KV260 Vision AI Starter Kit AIBox-ReID Tutorial</h1>
   </td>
 </tr>
 <tr>
 <td align="center"><h1> Design Overview </h1>

 </td>
 </tr>
</table>

# Design Overview

## Introduction

The AI Box application design built on KV260 Vision AI Starter Kit provides a framework for building and customizing video platforms that consist of four pipeline stages:

* Capture pipeline
* Video processing pipeline
* Acceleration pipeline
* Output pipeline

The design has a platform and integrated accelerator functions. The platform consists of Capture pipeline, Output pipeline and some video processing functions. This approach makes the design leaner and provides a user maximum Programmable Logic (PL) for the accelerator development. The platform supports input streams from IP camera and as well as file sources. The output can be displayed on DisplayPort/HDMI monitor.

Some video processing functions are performed on hard blocks like the Video Codec Unit (VCU) since it is most performant to do so. Video decoding/decompression and encoding/compression is done using the VCU.

The following example acceleration functions can be run on this platform using programmable Deep Learning Processor Units (DPU).

* Pedestrian Detection - Network model: refinedet_pruned_0_96
* Re-identification (ReID) - Network model: personreid-res18_pt

An example usecase for this design is as an edge device with multiple cameras as endpoints for Smart cities or Retail Analytics.

The following figure shows the various pipelines supported by the design.

![Pipelines Supported](../../media/pipelines_aib.png)

The application processing unit (APU) in the Processing Sytem (PS) consists of four ARM Cortex-A53 cores and is configured to run in symmetric multi-processing (SMP) Linux mode in the design. The application running on Linux is responsible for configuring and controlling the video pipelines and accelerators using Jupyter notebooks or the aibox-reid application.


The APU application controls the following video data paths implemented in a combination of the PS and PL:

* Capture pipeline capturing video frames into DDR memory from
   * A file on a storage device such as an SD card
   * An IP camera using the Ethernet interface inside the PS


* Memory-to-memory (M2M) pipeline implementing a neural network inference application. In this design the Neural Net is implemented in DPU, preprocessed video frames are read from DDR memory, processed by the DPU, and then written back to memory.

* An output pipeline reads video frames from memory and sends the frames to a sink.
     * In the display pipeline sink is a monitor, DP live port in the PS is coupled to STDP4320 De-multiplexer on the carrier card. STDP4320 consists of dual mode output ports configured as DP and HDMI.


The following figure shows an example end-to-end pipeline which could be an IP camera as the video source, Pre-process and DPU IPs for application NN Inference. The video frames are displayed via DP splitter onto a DP and HDMI port for display, as the video sink. The video format in the figure is the output format on each block. Details are described in the [Hardware Architecture document](hw_arch_platform_aib.md).

![End to end example pipelines](../../media/end_to_end_pp_aib.png)


## Design Components

<details>
 <summary><b>Hardware components</b></summary>

* KV260 Vision AI Starter Kit including
   * HDMI-DP splitter on the carrier card

</details>

<details>
 <summary><b>Interfaces and IP</b></summary>

* Video inputs
   * File
   * IP camera
* Video outputs
   * DisplayPort/ HDMI
* Video processing
   * VCU decoding on four streams
   * Accelerator functions on DPU
   * PL and PS based pre and post processing specific to a accelerator function
* Auxiliary Peripherals
   * QSPI
   * SD
   * I2C
   * UART
   * Ethernet
   * General purpose I/O (GPIO)

</details>

<details>
 <summary><b>Software components</b></summary>

* Operating system
   * APU: SMP Linux
* Linux kernel subsystems
   * Video source: Video4 Linux (V4L2)
   * Display: Direct Rendering Manager (DRM)/Kernel Mode Setting (KMS)
* Linux user space frameworks
   * Jupyter
   * GStreamer / Xilinx IVAS
   * Vitis AI
   * Xilinx run-time (XRT)

</details>

<details>
 <summary><b>Resolution and format supported</b></summary>

* Resolutions
   * 1080p30 per stream
   * Lower resolution and lower frame rates for file I/O
* Pixel format
   * YUV 4:2:0 (NV12)

</details>


## Next Steps

* [Setting up the Board and Application Deployment Tutorial](app_deployment_aib.md)
* Go back to the [KV260 AI Box design start page](../aibox_landing)


## References

* Kria KV260 Vision AI Starter Kit User Guide ([UG1089](https://www.xilinx.com/cgi-bin/docs/rdoc?t=som-doc;v=latest;d=ug1089-kv260-starter-kit.pdf))
* Kria SOM Carrier Card Design Guide ([UG1091](https://www.xilinx.com/cgi-bin/docs/rdoc?t=som-doc;d=ug1091-carrier-card-design.pdf))
* Kria KV260 Vision AI Starter Kit Data Sheet([DS986](https://www.xilinx.com/cgi-bin/docs/ndoc?t=data_sheets;d=ds986-kv260-starter-kit.pdf))
* Kria K26 SOM Data Sheet([DS987]( https://www.xilinx.com/cgi-bin/docs/ndoc?t=data_sheets;d=ds987-k26-som.pdf))

 ### License

Licensed under the Apache License, Version 2.0 (the "License"); you may not use this file except in compliance with the License.

You may obtain a copy of the License at
[http://www.apache.org/licenses/LICENSE-2.0](http://www.apache.org/licenses/LICENSE-2.0)

Unless required by applicable law or agreed to in writing, software distributed under the License is distributed on an "AS IS" BASIS, WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied. See the License for the specific language governing permissions and limitations under the License.

<p align="center">Copyright&copy; 2021 Xilinx</p>
