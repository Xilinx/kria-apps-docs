########################################################################################################################
Kria SOM Accelerator and Custom Carrier Card Firmware Development
########################################################################################################################






.. include:: ../../../shared/somtoctree.txt


.. toctree::
   :maxdepth: 3
   :caption: Flows
   :hidden:

   docs/overview
   docs/vitis_accel_flow
   docs/vitis_platform_flow
   docs/vivado_accel_flow
   docs/custom_cc_flow
   docs/examples
   docs/baremetal


.. toctree::
   :maxdepth: 3
   :caption: Kria Vitis Acceleration Flow
   :hidden:

   docs/kria_vitis_acceleration_flow/kria-vitis-acceleration


.. toctree::
   :maxdepth: 3
   :caption: Common Utilities
   :hidden:

   docs/target
   docs/bootmodes
   docs/dtsi_dtbo_generation
   docs/bitstream_management
   docs/AI_customization
   docs/Generate_vivado_project_from_boardfile
   docs/IPMI_EEPROM_design_guide
   docs/EEPROM_mapping_for_Kria_products
   docs/FTDI_EEPROM_design_guide
   docs/soft_ip_notes


.. toctree::
   :maxdepth: 3
   :caption: Other Releases
   :hidden:

   2021.1 <https://xilinx.github.io/kria-apps-docs/creating_applications/2021.1/build/html/index.html>





With Kria SOMs, you can create and test your own custom applications and programmable logic (PL) functions. Use one or more of the Xilinx development tools (such as Vivado™, Vitis™, and PetaLinux) and open source tools (such as Linux Device Tree Generator/Compiler) to build your applications. This document focuses on the overall concept of the different PL hardware generation flows. Whenever available, this document also points to detailed step-by-step tutorials.

The Kria SOM hardware design consist of the SOM (K26) and a carrier card. The carrier card (CC) can be a Xilinx carrier card (e.g. KV260 , KR260), or a custom carrier card. The Kria K26 SOM uses the XCK26 Zynq MPSoC chip containing both the Processor Subsystem (PS) and Programmable Logic (PL). The Kria Starter Kit reference designs have a Linux operating system running in PS, which then runs applications that utilize HW accelerators implemented in PL. The PL design or bitstream is generated using Vivado and/or Vitis, and it is integrated with Linux software components in PetaLinux or Ubuntu.

The SOM board files in Vivado captures the hardware configuration of K26 SOM and maps connectivity to Xilinx provided carrier card peripherals. Developers can use Vivado to generate a custom HW design which may include a different peripheral configuration set than pre-built Xilinx reference designs. Vitis provides a design abstraction for provided "Vitis platforms" in which a subset of CC physical interface peripherals is defined and developers can focus on generating an acceleration "overlay" within the context of that platform. Developers can leverage Xilinx provided Kria Vitis platforms that align to a given CC or they can create their own Vitis platform. Developers can use the same generalized flows when creating platforms and designs for their own custom carrier card.


.. note::
   The default SOM Kria Starter Kit Flow leverages dynamic bitstream management in place of the legacy Zynq MPSoC evaluation board flow which used a monolithic boot file with integrated bitstream. Please see their difference in :doc:`docs/bitstream_management`.

