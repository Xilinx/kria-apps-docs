##################################################
10GigE Machine Vision Camera - Defect Detect
##################################################


*******************************
Overview
*******************************

.. toctree::
   :maxdepth: 1

   Overview <src/overview>

*******************************
Introduction
*******************************

.. toctree::
   :maxdepth: 1

   Introduction <src/introduction>

Features
================================

* Raw image from a live camera source (SONY IMX547 color and mono sensors).

* Sphinx GE Viewer to display the live streaming data through 10 GigE pipeline.

* Run camera stream through defect detection algorithm implemented in PL and
  display defect decision on monitor.


*******************************
Quick Start
*******************************

.. toctree::
   :maxdepth: 1

   KR260 Starter Kit Linux Boot <../linux_boot>
   Setting up the Board and Application deployment <src/app_deployment>


***************************
Tutorials
***************************


* The pre-built bitstream included in the MV-Camera contains licensed FPGA IP modules from technology partners Sensor-to-Image and Framos. If a user wants to customize or create a similar production design to the MV-Camera bitstream they must obtain a license from the corresponding partner.

* In order to generate a custom bitstream that leverages either the Framos SLVS-EC receiver or the GigE Vision interface, complete the `Product Inquiry form <https://www.xilinx.com/products/app-store/kria/10gige-vision-camera/product-inquiry.html>`_ to get in contact with the partners.


.. toctree::
   :maxdepth: 1

   Generate Custom Firmware <../generating_custom_firmware>


******************
Architecture
******************


.. toctree::
   :maxdepth: 1

   Hardware Architecture of the Platform <src/10gige>
   Hardware Architecture of the Accelerator <src/hw_arch_accel_dd>
   Software Architecture of the Platform <src/sw_arch_platform_dd>
   Software Architecture of the Accelerator <src/sw_arch_accel_dd>


*******************************
Repositories
*******************************

.. toctree::
   :maxdepth: 1

   Software Application Repository <https://github.com/Xilinx/mv-defect-detect>
   Sony IMX547 Linux Driver Repository <https://github.com/Xilinx/mv-camera-sensor-module>
   AMD Vitis Vision ISP Linux Driver Repository <https://github.com/Xilinx/xilinx-isp-module>


******
Other
******

.. toctree::
   :maxdepth: 1

   Debugging <src/debug>
   Known Issues & Limitations <src/known_issues>


Xilinx Support
====================================

GitHub issues will be used for tracking requests and bugs. For questions, go to `forums.xilinx.com <http://forums.xilinx.com/>`_.



..
   License
   Licensed under the Apache License, Version 2.0 (the "License"); you may not use this file except in compliance with the License.

   You may obtain a copy of the License at http://www.apache.org/licenses/LICENSE-2.0.

   Unless required by applicable law or agreed to in writing, software distributed under the License is distributed on an "AS IS" BASIS, WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied. See the License for the specific language governing permissions and limitations under the License.
