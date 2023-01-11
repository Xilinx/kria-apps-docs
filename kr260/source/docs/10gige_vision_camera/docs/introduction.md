<table>
 <tr>
   <td align="center"><img src="https://www.xilinx.com/content/dam/xilinx/imgs/press/media-kits/corporate/xilinx-logo.png" width="30%"/><h1>Kria&trade; KR260 Robotics Starter Kit</h1>
   </td>
 </tr>
 <tr>
 <td align="center"><h1>Machine Vision Camera Tutorial</h1>
 
 </td>
 </tr>
</table>

# Introduction to Sensor Capture, MV-Defect-Detect, and 10GigE

The SLVS-EC Machine Vision application on Kria KR260 board demonstrates the use of a Xilinx Zynq® Ultrascale+™ device together with Framos SLVS-EC IP and Sensor to Image 10GigE Vision IP to build a machine vision application according to the GigE Vision standard.

10GigE machine vision application developed on Xilinx SOM embedded platform. This document covers various components such as Hardware, Software, High Level Design, Test Environment and more.

The following table lists the specific hardware (SOM + Carrier card) and the associated peripherals used in the MV-Camera accelerated application.

| **HW Component**        | **Description**           |
| :------------- |:-------------|
| SOM-K26      | K26 SOM with Zynq® UltraScale+™ MPSoC |
| Carrier Card (CC)-KR260     | The board that the SOM is plugged into is called the Carrier Card    |
| FSM*     | Framos sensor module which has IMX547 sensor + FSA    |
| NIC*     | 10G NIC card     |
| 10G SFP+ Transceiver*     | Transceiver to connect fiber optic cable    |
| Fiber optic cable*     | Fiber optic cable to connect KR260 to host machine  |
| 1080p Monitor     | MV-Defect-Detect output displays on DP Monitor  |
| DP Cable     | Connects KR260 board and DP monitor  |

<*> This is not shipped along with KRIA starter kit

The 10GigE reference design has the following pipelines:

- Capture Pipeline - Capture images from the live camera source.

- Sink Pipeline - Streaming video data via 10GigE pipeline.

The Application Processing Unit (APU) in the Processing System (PS) consists of four ARM Cortex-A53 cores and is configured to run in Symmetric Multi-Processing (SMP) Linux mode in the design. The application running on Linux is responsible for configuring and controlling the video pipeline.

The APU application controls the following video data paths implemented in a combination of the PS and PL:

- Capture pipeline collects video frames from IMX547 sensor interfaced through SLVS EC Interface, and it handovers to FPGA block where it converts into AXI streams.
- Acceleration Pipeline:
  *	Pre-Process Pipeline – Pre-Process received images as required for the processing function.
  * CCA Pipeline – The implemented Connected Component Analysis (CCA), is a custom solution to find the defective pixels in the problem object. This algorithm considers few assumptions that the background must be easily separable from the foreground object.
  * Defect Decision Pipeline - The output of the CCA plugin is fed into the Defect Decision block that determines the defect density and decides the quality of the mango.

- Display Pipelines – Display detection results and images of the mango at various stages.

- GenDC in the 10GigE pipeline receives the AXI stream data and converts it into GenICam protocol. Through SFP+ transceiver, the data transmits to host machine.

The 10GigE application stream out the sensor's RAW format through 10GigE protocol.

For the live use case, connect the IMX547 sensor to capture 2472 x 2128\@122fps - 10bpp data. The application processes this data and sends the outputs to the host PC.

## Next Steps

- [Sensor](sensor.md)
- Go back to the [MV Camera Overview](overview.md)

<!---

Licensed under the Apache License, Version 2.0 (the "License"); you may not use this file except in compliance with the License.

You may obtain a copy of the License at http://www.apache.org/licenses/LICENSE-2.0.

Unless required by applicable law or agreed to in writing, software distributed under the License is distributed on an "AS IS" BASIS, WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied. See the License for the specific language governing permissions and limitations under the License.

-->
<p align="center"><sup>Copyright&copy; 2022 Xilinx</sup></p>