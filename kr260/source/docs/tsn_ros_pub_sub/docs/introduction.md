<table class="sphinxhide">
 <tr>
   <td align="center"><img src="../../media/xilinx-logo.png" width="30%"/><h1>Kria&trade; KR260 Robotics Starter Kit <br>ROS 2 Multi-Node Communications via TSN Tutorial</h1>
   </td>
   </td>
 </tr>
 <tr>
 <td align="center"><h1> Introduction </h1>

 </td>
 </tr>
</table>

## Design Overview

ROS 2 Multi-Node Communications via TSN application built on KR260 Robotics Start Kit provides a framework for building deterministic interaction between devices. The figure below shows the top-level overview of the design implemented on each KR260 board.

![overview diagram](../media/intro_overview.png)

In this application the transmitter/publisher and receiver/subscriber functions are on two separate boards and communicate over Ethernet PHY. The TSN IP in the hardware platform supports time synchronization between devices. It also allows traffic shaping based on traffic classes. The AXI Uartlite IP enables communication with RS485 devices over MODBUS RTU protocol. 


Short intro on ROS stack: Pallav
The ROS 2 TSN example application is to be built with the ISM Kria Robotics Stack(KRS) .......

Two topologies are supported with this application

* KR260 to KR260
* KR260 to Intel I210 card

The oscilloscope can used to check clock synchronization, measure latency and check traffic patterns with the signals routed out to the 12-pin Test PMOD.

![topology diagram](../media/intro_topology.png)


Some extensions of this application are
* Robotic system with a sensor and actuator.
* Industrial controller with multiple field devices.

## Next Steps
* [Hardware Architecture of the Platform](hw_arch_platform.md)
* Go back to the [KR260 SOM ROS 2 Multi-Node Communications via TSN start page](fix:../tsn_pub_sub_landing)


### License

Licensed under the Apache License, Version 2.0 (the "License"); you may not use this file except in compliance with the License.

You may obtain a copy of the License at
[http://www.apache.org/licenses/LICENSE-2.0](http://www.apache.org/licenses/LICENSE-2.0)


Unless required by applicable law or agreed to in writing, software distributed under the License is distributed on an "AS IS" BASIS, WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied. See the License for the specific language governing permissions and limitations under the License.

<p align="center">Copyright&copy; 2021 Xilinx</p>
