# Creating a Vitis Platform

## Introduction

This tutorial shows how to build a Platform for applications running on the KR260 Robotics Starter Kit.

## Prerequisites

* AMD Vitis™ Unified Software Platform of the appropriate version

### Accessing the Tutorial Reference Files

> ***Note***: Skip the following steps if the design files have already been cloned and extracted to a working repository.

1. To access the reference files, type the following into a terminal:

   ```shell
   git clone --branch xlnx_rel_v2022.1 --recursive https://github.com/Xilinx/kria-vitis-platforms.git
   ```

2. Navigate to the `kria-vitis-platforms/kr260-vitis`, which is the working directory.

## Generating a Vitis Software Platform

1. Go to the working directory.

   ```shell
   cd $working_dir/
   ```

2. To build the platform, run the following command. The Makefile calls a lower-level Makefile to generate a platform. It also builds an XSA if it is not already available.

   ```shell
   make platform PFM=<platform_name>
   ```

   Applications and their corresponding platforms are listed in the following table.

   |Application |Platform|
   |----|----|
   |ROS 2 Multi-Node Communications via TSN |kr260_tsn_rs485pmod|
   |10GigE Vision Camera - Defect Detect |Not Available Publicly due to Propriety IP|
   |ROS 2 Perception Node |Not released publicly|
   |Precision Time |kr260_pmod_gps|
   |BIST|Not Available Publicly due to Propriety IP|

3. The generated platform is located here:

   ```shell
   $working_dir/platforms/xilinx_<platform_name>_<version_number>
   ```

   The `xpfm` file in this directory is used as an input when building the Vitis application acceleration projects. It exposes all the essential platform interfaces like clock, interrupts, master AXI interfaces, and slave AXI interfaces, which allow the accelerator to connect to them.

> ***Note***: The software components (boot, smp_linux, and so on.) in this platform are empty. The software components are generated later when building PetaLinux.


<p class="sphinxhide" align="center">Copyright&copy; 2023-2024 Advanced Micro Devices, Inc.</p>
