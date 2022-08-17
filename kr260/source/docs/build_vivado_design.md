<table class="sphinxhide">
 <tr>
   <td align="center"><img src="media/xilinx-logo.png" width="30%"/><h1> Kria&trade; KR260 Robotics Starter Kit Tutorial</h1>
   </td>
 </tr>
 <tr>
 <td align="center"><h1>Using Vivado to Build the Hardware Design</h1>

 </td>
 </tr>
</table>

# Using Vivado to Build the Hardware Design

## Introduction

This tutorial shows how to build the hardware design for applications running on KR260 Robotics AI Starter Kit.

## Prerequisites

* Vivado Design Suite of the appropiate version
* TSN Subsytem IP evaluation license when building the kr260_tsn_rs485pmod platform

> **Info**: To request TSN Subsystem IP evaluation license, send an email to [1gtsn_eval_request@amd.com](1gtsn_eval_request@amd.com).

### Accessing the Tutorial Reference Files

> **Note**: Skip the following steps if the design files have already been cloned and extracted to a working repository

1. To access the reference files, type the following into a terminal:

   ```shell
   git clone --recursive https://github.com/Xilinx/kria-vitis-platforms.git
   ```

2. Navigate to the `kria-vitis-platforms/kr260` which is the working directory.

## Generating an Extensible XSA

1. Go to the platform directory specific to the application

   ```shell
   cd $working_dir/platforms/vivado/<platform_name>
   ```

   Applications and their corresponding platform names are listed in the table below

   |Application |Platform name|
   |----|----|
   |ROS 2 Multi-Node Communications via TSN |kr260_tsn_rs485pmod|

2. To build the XSA, Source Vivado and run the following command. The Makefile uses scripts/main.tcl file to create a Vivado project, populate the block design and finally build a XSA. The XSA generation may take couple of hours depending on the system specification

   ```shell
   make xsa
   ```

3. The generated XSA will be located at:

   ```shell
   $working_dir/platforms/vivado/<platform_name>/project/<platform_name>.xsa
   ```

>**Note**: The steps under *Modifying the Vivado design and creating a new XSA* are optinal and are required only if you need to change the platform design. 

## Modifying the Vivado design and creating a new XSA

1. Go to the directory specific to the platform design

   ```shell
   cd $working_dir/platforms/vivado/<platform_name>
   ```

2. To open the Vivado project, first open the Vivado GUI, then run the following command from the Vivado tcl console:

   ```shell
   open_project ./project/<platform_name>.xpr
   ```

3. In the Flow Navigator pane on the left-hand side under IP integrator, click on Open Block Design. An IP integrator block design becomes visible that contains the Processing System (PS) IP and other PL IPs.

4. To view the Platform interfaces that are enabled for the Vitis compiler to stitch in accelerators, on the tool bar at the top click on Window > Platform Setup. Platform interfaces that are enabled are

   * Clocks: To drive clock inputs on the accelerator.
   * Master AXI: AXI memory-mapped master ports on the Interconnect IP to drive the accelerator's control port.
   * Slave AXI: AXI memory-mapped slave ports driven by the accelerator's read/write data ports.
   * Interrupts: interrupt controller for the accelerator to drive interrupt signals. 

5. You can now modify the block design and validate it (tool bar at the top: Tools → Validate design). Then, click on Run Synthesis to complete synthesis

6. To write out a new extensible platform XSA file, run the following command from the Vivado tcl console:

   ```shell
   write_hw_platform -force -file <platform_name>.xsa
   ```

The generated XSA or the modified XSA file can now be used to create a Vitis Platform

## Next Steps

* [Creating a Vitis Platform](build_vitis_platform.md)
* Go back to the [KR260 SOM designs start page](../index.html)

## References

For more information on how to setup Platform Interfaces refer to Xilinx Vitis Unified Software Platform Documentation [UG1393](https://docs.xilinx.com/r/en-US/ug1393-vitis-application-acceleration/Adding-Hardware-Interfaces)

<!---

Licensed under the Apache License, Version 2.0 (the "License"); you may not use this file except in compliance with the License.

You may obtain a copy of the License at http://www.apache.org/licenses/LICENSE-2.0.

Unless required by applicable law or agreed to in writing, software distributed under the License is distributed on an "AS IS" BASIS, WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied. See the License for the specific language governing permissions and limitations under the License.

-->

<p class="sphinxhide" align="center">Copyright&copy; 2022 Xilinx</p>
