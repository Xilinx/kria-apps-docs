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

# Overview

The Machine Vision (MV) camera application uses a Sony IMX547 sensor module which interfaces to the KR260 with the widely adopted SLVS-EC interface standard. The FPGA will implement a SLVS-EC Receiver IP Core and a 10GigE pipeline. The MV Camera application design contribution is from IP partners Framos and Euresys.

The KR260 carrier card has the interface for Euresys 10GigE. 10GigE pipeline consist of multiple IP's like GenDC, Framebuffer, 10GigE MAC etc. GenDC Front-End IP core implements GenICam protocol GenDC layer to be used together with additional machine vision interfacing IP cores provided by Sensor to Image(S2I). Frame Buffer companion IP implements a video frame buffering functionality, packetization, and optional packet resending. The data divided into packets is transmitted to the back-end IP cores implementing particular machine vision interfaces like GigE Vision. Using SFP+ packets will be sent to host machine and displayed in Sphinx GEV Viewer software.

The MV-Camera high level pipeline is depicted in below figure,

![KR260 Overview Diagram](media/Overview_diagram.PNG)

## Features

1) IMX547 Camera Sensor with 5.1 Mega Pixel/2472 x 2128 pixel with max framerate of 122 fps.

2) Sphinx GE Viewer to display the live streaming data through 10 GigE pipeline.

## Next Steps

* [Introduction](introduction.md)
* Go back to the [MV Camera Landing Page](../10gige_vision_camera_landing)

<!---

Licensed under the Apache License, Version 2.0 (the "License"); you may not use this file except in compliance with the License.

You may obtain a copy of the License at http://www.apache.org/licenses/LICENSE-2.0.

Unless required by applicable law or agreed to in writing, software distributed under the License is distributed on an "AS IS" BASIS, WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied. See the License for the specific language governing permissions and limitations under the License.

-->