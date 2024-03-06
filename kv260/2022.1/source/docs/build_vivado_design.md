<table class="sphinxhide">
 <tr>
   <td align="center"><img src="media/xilinx-logo.png" width="30%"/><h1> Kria&trade; KV260 Vision AI Starter Kit Tutorial</h1>
   </td>
 </tr>
 <tr>
 <td align="center"><h1>Using Vivado to Build the Hardware Design</h1>

 </td>
 </tr>
</table>

# Build the Vivado Design

## Introduction

This tutorial shows how to build the hardware design for applications running on the KV260 Vision AI Starter Kit.

## Prerequisites

* AMD Vivado&trade; Design Suite of the appropiate version

### Accessing the Tutorial Reference Files

>**NOTE:** Skip the following steps if the design files have already been cloned and extracted to a working repository.

1. To access the reference files, type the following into a terminal:

   ```
   git clone --branch xlnx_rel_v2022.1 --recursive https://github.com/Xilinx/kria-vitis-platforms.git
   ```

2. Navigate to the `kria-vitis-platforms/kv260`, which is the working directory.

## Generating an Extensible XSA

1. Go to the platform directory specific to the application.

   ```
   cd $working_dir/platforms/vivado/<platform_name>
   ```

   Applications and their corresponding platform names are listed in the following table.

   |Application |Platform name|
   |----|----|
   |smartcam |kv260_ispMipiRx_vcu_DP|
   |aibox-reid |kv260_vcuDecode_vmixDP|
   |defect-detect |kv260_ispMipiRx_vmixDP|
   |nlp-smartvision |kv260_ispMipiRx_rpiMipiRx_DP|

2. To build the XSA, source Vivado, and run the following command. The Makefile uses the scripts/`main.tcl` file to create a Vivado project, populate the block design, and finally, build a XSA. The XSA generation can take couple of hours depending on the system specification.

   ```
   make xsa
   ```

3. The generated XSA will be located at:

   ```
   $working_dir/platforms/vivado/<platform_name>/project/<platform_name>.xsa
   ```

   >**NOTE:** The steps under *Modifying the Vivado Design and Creating a New XSA* are optional and are required only if you need to change the platform design.

## Modifying the Vivado Design and Creating a New XSA

1. Go to the directory specific to the platform design.

   ```
   cd $working_dir/platforms/vivado/<platform_name>
   ```

2. To open the Vivado project, open the Vivado GUI, and then run the following command from the Vivado Tcl console:

   ```
   open_project ./project/<platform_name>.xpr
   ```

3. In the Flow Navigator pane on the left-hand side under IP integrator, click **Open Block Design**. An IP integrator block design becomes visible that contains the processing system (PS) IP and other programmable logic (PL) IPs.

4. To view the platform interfaces that are enabled for the Vitis compiler to stitch in accelerators, on the tool bar at the top, click **Window** > **Platform Setup**. The platform interfaces that are enabled are:

   * Clocks: To drive clock inputs on the accelerator.
   * Master AXI: AXI memory-mapped master ports on the Interconnect IP to drive the accelerator's control port.
   * Slave AXI: AXI memory-mapped slave ports driven by the accelerator's read/write data ports.
   * Interrupts: pl_ps_irq0[7:0] for the accelerator to drive interrupt signals (Not seen on the Platform setup).

5. You can now modify the block design and validate it (toolbar at the top: **Tools** → **Validate design**). Then, click **Run Synthesis** to complete synthesis.

6. To write out a new extensible platform XSA file, run the following command from the Vivado Tcl console:

   ```
   write_hw_platform -force -file <platform_name>.xsa
   ```

   The generated XSA or the modified XSA file can now be used to create a Vitis platform.

## Next Steps

* [Creating a Vitis Platform](build_vitis_platform.md)
* Go back to the [KV260 SOM Designs Start Page](../index)

## References

For more information on how to set up platform interfaces, refer to the *Vitis Unified Software Platform Documentation: Application Acceleration Development* ([UG1393](https://docs.xilinx.com/access/sources/dita/map?isLatest=true&ft:locale=en-US&url=ug1393-vitis-application-acceleration)).

### License

Licensed under the Apache License, Version 2.0 (the "License"); you may not use this file except in compliance with the License.

You may obtain a copy of the License at
[http://www.apache.org/licenses/LICENSE-2.0](http://www.apache.org/licenses/LICENSE-2.0).

Unless required by applicable law or agreed to in writing, software distributed under the License is distributed on an "AS IS" BASIS, WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied. See the License for the specific language governing permissions and limitations under the License.

<p align="center">Copyright&copy; 2021-2023 Advanced Micro Devices, Inc</p>
