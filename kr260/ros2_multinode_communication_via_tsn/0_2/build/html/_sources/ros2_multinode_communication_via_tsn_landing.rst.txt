##################################################
ROS 2 Multi-Node Communications Via TSN 
##################################################



.. include:: ../../../../shared/somtoctree.txt




.. toctree::
   :maxdepth: 1
   :caption: Overview

   Introduction <docs/introduction.md>



Features
================================

* ROS application to demonstrate publisher subscriber communication over Xilinx TSN.
* Realtime demonstration of ongoing TSN traffic (Both best effort and Scheduled) through the oscilloscope.

  - Demonstrate Network Time Synchronization between master and slave
  - Demonstrate software latency for TSN traffic
  - Demonstrate Network Time Shaper Function (802.1Qbv) on TSN traffic
* Demonstrate Modbus based RS485 communication over uart+pmod interface.


.. toctree::
   :maxdepth: 1
   :caption: Quick Start

   Setting Up the Board and Application deployment <docs/app_deployment.md>



.. toctree::
   :maxdepth: 1
   :caption: Tutorials

   Linux Boot <docs/linux_boot>
   Building the Design Components <docs/building_the_design>
   Building the Hardware Design Using Vivado <docs/build_vivado_design>
   Creating a Vitis Platform <docs/build_vitis_platform>
   Generate Custom Firmware <docs/generating_custom_firmware>
   Software Build Instructions <docs/sw_build_instructions>






.. important::
   Review the `FAQ <https://pages.gitenterprise.xilinx.com/techdocs/SOM/faq.html>`_ for commonly encountered issues across Kria SOM applications.


.. toctree::
   :maxdepth: 1
   :caption: Architecture
  
   Software Architecture - Platform <docs/sw_arch_platform>
   Hardware Architecture - Platform <docs/hw_arch_platform>




.. toctree::
   :maxdepth: 1
   :caption: Repository
  
   Software Repository <https://github.com/xilinx/ros-tsn-pubsub/tree/v0.2>


.. important:: Other Releases

   * `TSN v0.1 <../../../0_1/build/html/ros2_multinode_communication_via_tsn_landing.html>`_
   * `TSN v0.3 <../../../0_3/build/html/ros2_multinode_communication_via_tsn_landing.html>`_


.. toctree::
   :maxdepth: 1
   :caption: Other KR260 Applications
   :hidden:

   10GigE Machine Vision Camera <https://pages.gitenterprise.xilinx.com/techdocs/SOM/kr260/10gige_vision_camera.html>
   ROS 2 Perception Node <https://pages.gitenterprise.xilinx.com/techdocs/SOM/kr260/ros2_perception_node.html>
   Precision Time Management <https://pages.gitenterprise.xilinx.com/techdocs/SOM/kr260/precision_time_management.html>
   Built-In Self Test (BIST) <https://pages.gitenterprise.xilinx.com/techdocs/SOM/kr260/bist.html>



Xilinx Support
====================================

GitHub issues will be used for tracking requests and bugs. For questions, go to `forums.xilinx.com <http://forums.xilinx.com/>`_.




.. Copyright © 2023-2024 Advanced Micro Devices, Inc

.. `Terms and Conditions <https://www.amd.com/en/corporate/copyright>`_.