##################################################
TSN ROS Pub Sub 
##################################################


*******************************
Overview
*******************************

.. toctree::
   :maxdepth: 1
  
   Introduction <docs/introduction.md>


Features
================================

* ROS application to demonstrate publisher subscriber communication over Xilinx TSN.
* Realtime demonstration of ongoing TSN traffic (Both best effort and Scheduled) through the oscilloscope.

  - Demonstrate Network Time Synchronization between master and slave
  - Demonstrate software latency for TSN traffic
  - Demonstrate Network Time Shaper Function (802.1Qbv) on TSN traffic
* Demonstrate Modbus based RS485 communication over uart+pmod interface.


*******************************
Quick Start
*******************************

.. toctree::
   :maxdepth: 1
  
   KR260 Starter Kit Linux Boot <../kria_starterkit_linux_boot>
   Setting up the Board and Application deployment <docs/app_deployment.md>

***************************
Tutorials
***************************

.. toctree::
   :maxdepth: 1
  
   KR260 Starter Kit Linux Boot <../kria_starterkit_linux_boot>
   Building the Design components <../building_the_design>
   Building the Hardware design using Vivado <../build_vivado_design>
   Creating a Vitis Platform <../build_vitis_platform>
   Generate Custom Firmware <../generating_custom_firmware>

* Please first review the [FAQ](https://xilinx.github.io/kria-apps-docs/faq.html) for commonly encountered issues across Kria SOM applications.

******************
Architecture
******************

.. toctree::
   :maxdepth: 1
  
   Software Architecture - Platform <docs/sw_arch_platform>
   Hardware Architecture - Platform <docs/hw_arch_platform>



Xilinx Support
====================================

GitHub issues will be used for tracking requests and bugs. For questions, go to `forums.xilinx.com <http://forums.xilinx.com/>`_.




.. 
   License
   Licensed under the Apache License, Version 2.0 (the "License"); you may not use this file except in compliance with the License.

   You may obtain a copy of the License at http://www.apache.org/licenses/LICENSE-2.0.

   Unless required by applicable law or agreed to in writing, software distributed under the License is distributed on an "AS IS" BASIS, WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied. See the License for the specific language governing permissions and limitations under the License.
