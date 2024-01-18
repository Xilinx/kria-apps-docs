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

# Using Vivado to Build the Hardware Design

## Introduction

This tutorial shows how to build the hardware design for applications running on the KD240 Drives Starter Kit.

## Prerequisites

* AMD Vivado Design Suite&trade; of the appropiate version
* TSN Subsytem IP evaluation license when building the kd240_motor_ctrl_qei platform.

> **Info**: To request TSN Subsystem IP evaluation license, send an email to [1gtsn_eval_request@amd.com](1gtsn_eval_request@amd.com).

### Accessing the Tutorial Reference Files

> **NOTE:** Skip the following steps if the design files have already been cloned and extracted to a working repository.

1. To access the reference files, type the following into a terminal:

   ```shell
   git clone --branch xlnx_rel_v2023.1 --recursive https://github.com/Xilinx/kria-vitis-platforms.git
   ```

2. Navigate to the `kria-vitis-platforms/kd240`, which is the working directory.

## Generating an Extensible XSA

1. Go to the platform directory specific to the application.

   ```shell
   cd $working_dir/platforms/vivado/<platform_name>
   ```

   Applications and their corresponding platform names are listed in the following table:

   |Application |Platform Name|
   |----|----|
   | Built-in self test (BIST) | kd240_bist |
   | FOC motor control with position sensor | kd240_motor_ctrl_qei |
   | ROS TSN Pub Sub |  kd240_motor_ctrl_qei |

   Note that the FOC motor control with position sensor and ROS TSN Pub Sub shares a single platform that requires a license for the TSN IP. However, the FOC motor control with position sensor can be used without TSN IP, they are grouped together as that can be a usecase. The TSN IP can be removed for FOC motor control with position sensor application if getting a license is undesireable.

2. To build the XSA, source Vivado, and run the following command. The Makefile uses the scripts/`main.tcl` file to create a Vivado project, populate the block design, and finally build a XSA. The XSA generation can take some time depending on the system specification.

   ```shell
   make xsa
   ```

3. The generated XSA is located at:

   ```shell
   $working_dir/platforms/vivado/<platform_name>/project/<platform_name>.xsa
   ```

>**NOTE:** The steps under *Modifying the Vivado Design and Creating a new XSA* are optional and are required only if you need to change the platform design.

## Modifying the Vivado Design and Creating a New XSA

1. Go to the directory specific to the platform design.

   ```shell
   cd $working_dir/platforms/vivado/<platform_name>
   ```

2. To open the Vivado project, open the Vivado GUI, then run the following command from the Vivado Tcl console:

   ```shell
   open_project ./project/<platform_name>.xpr
   ```

3. In the Flow Navigator pane on the left-hand side under IP integrator, click **Open Block Design**. An IP integrator block design becomes visible that contains the Processing System (PS) IP and other programmable logic (PL) IPs.

4. To view the platform interfaces that are enabled for the AMD Vitis&trade; compiler to stitch in accelerators, click **Window** → **Platform Setup** on the toolbar at the top. Platform interfaces that are enabled are:

   * Clocks: To drive clock inputs on the accelerator.
   * Master AXI: AXI memory-mapped master ports on the Interconnect IP to drive the accelerator's control port.
   * Slave AXI: AXI memory-mapped slave ports driven by the accelerator's read/write data ports.
   * Interrupts: interrupt controller for the accelerator to drive interrupt signals.

   >**NOTE:** Not every Vivado design has platform interfaces specified.

5. You can now modify the block design and validate it (toolbar at the top: **Tools** → **Validate design**). Then click **Run Synthesis** to complete the synthesis.

6. To write out a new extensible platform XSA file, run the following command from the Vivado Tcl console:

   ```shell
   write_hw_platform -force -file <platform_name>.xsa
   ```

The generated XSA or the modified XSA file can now be used to create a Vitis platform (optional).

## Next Steps

* [Generate Custom Firmware](generating_custom_firmware.md)
* Go back to the [KD240 SOM Designs Start Page](../index)

## References

For more information on how to set up platform interfaces, refer to the AMD Vitis Unified Software Platform Documentation [UG1393](https://docs.xilinx.com/r/en-US/ug1393-vitis-application-acceleration/Adding-Hardware-Interfaces).

<!---

Licensed under the Apache License, Version 2.0 (the "License"); you may not use this file except in compliance with the License.

You may obtain a copy of the License at http://www.apache.org/licenses/LICENSE-2.0.

Unless required by applicable law or agreed to in writing, software distributed under the License is distributed on an "AS IS" BASIS, WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied. See the License for the specific language governing permissions and limitations under the License.

-->

<p class="sphinxhide" align="center">Copyright&copy; 2023 Advanced Micro Devices, Inc.</p>
