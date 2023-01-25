##################################################
10GigE Vision Camera
##################################################


*******************************
Overview
*******************************

.. toctree::
  :maxdepth: 1
  
  Overview <docs/overview>

*******************************
Introduction
*******************************

.. toctree::
  :maxdepth: 1
  
  Introduction <docs/introduction>

Features
================================

* Raw image from a live camera source (SONY IMX547).

* Sphinx GE Viewer to display the live streaming data through 10 GigE pipeline.


*******************************
Quick Start
*******************************

.. toctree::
  :maxdepth: 1
  
  KR260 Starter Kit Linux Boot <../kria_starterkit_linux_boot>
  Setting up the Board and Application deployment <docs/app_deployment>


***************************
Tutorials
***************************

.. toctree::
  :maxdepth: 1
  
  KR260 Starter Kit Linux Boot <../kria_starterkit_linux_boot>
  Building the Design components <../building_the_design>
  Generate Custom Firmware <../generating_custom_firmware>

* Building the Hardware design using Vivado

  * The pre-built bitstream included in the MV-Camera contains licensed FPGA IP modules from technology partners Sensor-to-Image and Framos. If a user wants to customize or create a similar production design to the MV-Camera bitstream they must obtain a license from the corresponding partner.

  * In order to generate a custom bitstream that leverages either the Framos SLVS-EC receiver or the GigE Vision interface, complete the `Product Inquiry form <https://www.xilinx.com/products/app-store/kria/10gige-vision-camera/product-inquiry.html>`_ to get in contact with the partners.


******************
Architecture
******************


.. toctree::
  :maxdepth: 1

  Framos Sensors <docs/sensor>
  Sensor to Image 10GigE Vision Pipeline <docs/10gige>


******
Other
******

.. toctree::
  :maxdepth: 1
  
  Debugging <docs/debug>
  Known Issues & Limitations <docs/known_issues>



Xilinx Support
====================================

GitHub issues will be used for tracking requests and bugs. For questions, go to `forums.xilinx.com <http://forums.xilinx.com/>`_.



.. 
   License
   Licensed under the Apache License, Version 2.0 (the "License"); you may not use this file except in compliance with the License.

   You may obtain a copy of the License at http://www.apache.org/licenses/LICENSE-2.0.

   Unless required by applicable law or agreed to in writing, software distributed under the License is distributed on an "AS IS" BASIS, WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied. See the License for the specific language governing permissions and limitations under the License.
