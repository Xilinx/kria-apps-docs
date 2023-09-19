##################################################
FOC Motor Control Application
##################################################

*******************************
Overview
*******************************

.. toctree::
   :maxdepth: 1

   Introduction <docs/introduction.md>

Features
================================

* Dashboard with customizable plots

  - Three control modes (speed, torque, and open loop)
  - Control loop parameter tuning
  - Buffer based data collection
  - Fault monitoring
  - Live analysis plots
  - Configurable sample window size
* IIO Linux kernel drivers for hardware IP
* Vitis Motor Control Libraries based HLS IP
* C++ & Python library for using entire motor control stack


*******************************
Quick Start
*******************************

.. toctree::
   :maxdepth: 1

   Setting up the Board and Application deployment <docs/app_deployment.md>



***************************
Tutorials
***************************


* :doc:`Linux Boot <../kria_starterkit_linux_boot>`
* :doc:`Building the Design components <../building_the_design>`
* :doc:`Building the Hardware design using Vivado <../build_vivado_design>`
* :doc:`Generate Custom Firmware <../generating_custom_firmware>`



.. important::
   Review the `FAQ <https://xilinx.github.io/kria-apps-docs/faq.html>`_ for commonly encountered issues across Kria SOM applications.




******************
Architecture
******************

.. toctree::
   :maxdepth: 1

   Hardware Architecture <docs/hw_description.md>
   Software Architecture <docs/sw_arch.md>

*******************************
Repository
*******************************

.. toctree::
   :maxdepth: 1

   Software Repository <https://github.com/Xilinx/foc-motor-ctrl>

*******************************
Other
*******************************

.. toctree::
   :maxdepth: 1

   Known Issues <docs/known_issues.md>

..
   License
   Licensed under the Apache License, Version 2.0 (the "License"); you may not
   use this file except in compliance with the License.

   You may obtain a copy of the License at
   http://www.apache.org/licenses/LICENSE-2.0.

   Unless required by applicable law or agreed to in writing, software
   distributed under the License is distributed on an "AS IS" BASIS, WITHOUT
   WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied. See the
   License for the specific language governing permissions and limitations under
   the License.
