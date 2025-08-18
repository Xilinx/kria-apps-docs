<table class="sphinxhide">
 <tr>
   <td align="center"><img src="https://raw.githubusercontent.com/Xilinx/Image-Collateral/main/xilinx-logo.png" width="30%"/><h1>Kria&trade; KR260 Robotics Starter Kit</h1>
   </td>
 </tr>
 <tr>
 <td align="center"><h1>Machine Vision Camera Tutorial</h1>
 
 </td>
 </tr>
</table>

# Introduction 

The Machine vision application is built on the KR260 Robotics Starter Kit and demonstrates use of SLVS-EC and GigE Vision standards for transferring of video frames. The design consists of four pipelines

* Capture pipeline : Capture images from IMX547 Sensor, color or monochrome
* Image Sensor Processing (ISP) pipeline: Processes and improves the captured mango images
* Acceleration pipeline: Runs defect detect function on the processed mango images
* Output pipelines 
  * 10GigE : Streams video data received from the the capture pipeline to a host system over 10G SFP+ Transceiver
  * Display Port: Displays detection results and images of the mango at various stages.

 The design has a platform and integrated accelerator functions. The platform consists of capture pipeline, output pipelines, and some video processing functions. This approach makes the design leaner and provides maximum programmable logic (PL) for the accelerator development.

The Application Processing Unit (APU) in the Processing System (PS) consists of four ARM Cortex-A53 cores and is configured to run in Symmetric Multi-Processing (SMP) Linux mode in the design. The application running on Linux is responsible for configuring and controlling the pipelines.

The APU application controls the following video data paths implemented in the PL:

* Capture pipeline captures video frames from the IMX547 sensor through SLVS EC Interface, and converts data to Video AXI streams. The Video AXI streams are broadcasted to 10GigE pipeline and ISP Pipeline
* ISP Pipeline receives streaming data from the capture pipeline, improves the video frame quality and writes the frame to DDR memory.
* Acceleration Pipeline is implemented as a memory to memory pipeline. Each block in acceleration pipeline reads from DDR memory, processes the data, and writes back to memory
* Output pipeline 
  * Display pipeline reads video frames from memory, written by the acceleration blocks and sends the frame to Display Port sink.
  * 10GigE pipeline transfers the AXI stream data carrying raw video frames via 10GigE Vision protocol through SFP+ transceiver, to the host machine. 
  
The application running on the host is responsible for interpreting the raw video stream. 

# Design Components

### Hardware components

* KR260 Robotics Starter Kit including:
  * K26 SOM with an AMD Zynq&trade; UltraScale+™ MPSoC
  * Carrier Card with SLVS-EC Rx connector, SFP+ cage and Display Port connector
* Sony IMX547 Camera Kit Monochrome or Color*
* 10G SFP+ Transceiver*
* Fiber optic cable* connecting KR260 to the host machine*
* 10G NIC card to be installed in the host machine*
* 1080p Monitor to display defect detection results*

[*] Not included in the KR260 Starter Kit

### Interfaces and IP

* Video inputs
  * SLVS-EC Rx
* Video outputs
  * Display Port
  * 10GigeE 
* Video processing
  * Vitis Vsion Accelerator functions 
  * PL and PS based pre and post processing specific to a accelerator function

### Software components

* Operating system
  * APU: SMP Linux
* Linux kernel subsystems
  * Video source: Video4 Linux (V4L2)
  * Display: Direct Rendering Manager (DRM)/Kernel Mode Setting (KMS)
* Linux user space frameworks on KR260
  * GStreamer/VVAS
  * AMD Vitis&trade; AI
  * Xilinx run-time (XRT)
* Linux user space frameworks on host
  * Frame Grabber SW stack
  * Sphinx GEV Viewer

### Supported Resolution and Formats

* Resolutions
  * 1080p on DP
  * 2472x2128 on Sencor
* Sensor Pixel formats
  * MONO8
  * BAYRG8

# Next Steps

- [HW architecture of the platform](10gige.md) 
- Go back to the [MV Camera Overview](overview.md)


<hr class="sphinxhide"></hr>

<p class="sphinxhide" align="center"><sub>Copyright © 2023–2024 Advanced Micro Devices, Inc.</sub></p>

<p class="sphinxhide" align="center"><sup><a href="https://www.amd.com/en/corporate/copyright">Terms and Conditions</a></sup></p>
