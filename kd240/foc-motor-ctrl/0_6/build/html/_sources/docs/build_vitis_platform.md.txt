<table class="sphinxhide">
 <tr>
   <td align="center"><img src="media/xilinx-logo.png" width="30%"/><h1> Kria&trade; KD240 Drives Starter Kit Tutorial</h1>
   </td>
 </tr>
 <tr>
 <td align="center"><h1>Using Vivado to Build the Hardware Design</h1>

 </td>
 </tr>
</table>

# Creating a Vitis Platform

## Introduction

This tutorial shows how to build a Platform for applications running on the KD240 Drives Starter Kit.

## Prerequisites

* AMD Vitis™­ Unified Software Platform of the appropriate version

### Accessing the Tutorial Reference Files

> ***Note***: Skip the following steps if the design files have already been cloned and extracted to a working repository.

1. To access the reference files, type the following into a terminal:

   ```shell
   git clone --branch xlnx_rel_v2023.1 --recursive https://github.com/Xilinx/kria-vitis-platforms.git
   ```

2. Navigate to the `kria-vitis-platforms/kd260`, which is the working directory.

## Generating a Vitis Software Platform

1. Go to the working directory.

   ```shell
   cd $working_dir/
   ```

2. To build the platform, run the following command. The Makefile calls a lower-level Makefile to generate a platform. It also builds an XSA if it is not already available.

   ```shell
   make platform PLATFORM=<platform_name>
   ```

   Applications and their corresponding platforms are listed in the following table.

   |Application |Platform|
   |----|----|
   |KD240 ROS 2 Multi-Node Communications via TSN |kd240_motor_ctrl_qei|
   |KD240 BIST|kd240_bist|
   |FOC Motor Control|kd240_motor_ctrl_qei|

3. The generated platform is located here:

   ```shell
   $working_dir/platforms/xilinx_<platform_name>_<version_number>
   ```

   The `xpfm` file in this directory is used as an input when building the Vitis application acceleration projects. It exposes all the essential platform interfaces like clock, interrupts, master AXI interfaces, and slave AXI interfaces, which allow the accelerator to connect to them.

> ***Note***: The software components (boot, smp_linux, and so on.) in this platform are empty. The software components are generated later when building PetaLinux.




<p class="sphinxhide" align="center">Copyright&copy; 2023-2024 Advanced Micro Devices, Inc.</p>