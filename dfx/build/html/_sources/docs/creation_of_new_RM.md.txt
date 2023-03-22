# Create a new accelerator RM

The target audience for this guide is developers who wish to add a new Reconfigurable Module(RM) to the publicly available DFX reference design on Kria K26 SOM.

## Prerequisites and assumptions

* Use the pre-built abstract shell DCPs available [here](https://github.com/Xilinx/kria-dfx-hw/tree/xlnx_rel_v2022.1/k26/2rp_design/create_new_rm/abstract_shells) to build the RM partial bit files.
* Use the base bit file, [opendfx_shell_wrapper.bit](https://github.com/Xilinx/kria-apps-firmware/tree/xlnx_rel_v2022.1/k26-dfx/2rp), to run the RM partial bit files. The base bit file and abstract shell DCPs are generated from a single Vivado implementation run. If the base bitstream and abstract shells are generated from different Vivado runs, this flow is not guaranteed to work as the place and route results between the bit file and dcp might not match.
* Vivado version - 2022.1_released.
* Linux environment to build the design.

## Introduction

The DFX design for the Kria SOM has two Reconfigurable Partitions, which have the same IO interface and similar footprint. So, when a new RM design is developed for one DFX partition, it can be targeted to the other DFX partitions as well with addressing changes. Using this document, RM partial bit files and the required firmware files can be generated, to target the DFX design for the Kria SOM.

Accelerators with AXIS interface can be part of the RM for DFX example design. RM template for AXIS accelerators is provided as a reference to create the new RMs. Using the template ensures that RMs being created have the required IO interface and address. Any deviation from the IO interface or addressing provided in the templates will cause errors during RM generation.

## RP Interface

The IO interface for both the RPs is identical. The below table lists the RP interface signals.

  | Port | Description |
  |------|-------------|
  | clk  | Clock input to the RM from Static|
  | resetn| active low reset input|
  | S_AXI_CTRL | AXI4-Lite slave interface|
  | M_AXI_GMEM| AXI4-MM master interface|
  |Interrupt | 4-bit interrupt output|
  
## RP addressing

Each RP has fixed address apertures. Based on the RP being targeted, the RM should use the addresses listed below. This is already taken care of in the template.

### RP_0 Addressing

| Port| Addresses| Range| Description|
|-----|----------|------|------------|
| S_AXI_CTRL | 0x8000_0000-0x81FF_FFFF| 32MB| AXI_lite slave interface|
| M_AXI_GMEM | 0x0000_0000-0x7FFF_FFFF <br> 0xC000_0000-0xDFFF_FFFF <br> 0xFF00_0000-0xFFFF_FFFF <br> 0x2_0000_0000-0x2_3FFF_FFFF <br> 0x2_8000_0000-0x2_BFFF_FFFF <br> 0x8_0000_0000-0xF_FFFF_FFFF | 2GB <br> 512MB <br> 16MB <br> 1G <br> 1G <br> 32G| AXI4-MM master interface|
  
### RP_1 Addressing

| Port| Addresses| Range| Description|
|-----|----------|------|------------|
| S_AXI_CTRL | 0x82000000-0x83FFFFFF | 32MB| AXI_lite slave interface|
| M_AXI_GMEM | 0x0000_0000-0x7FFF_FFFF <br> 0xC000_0000-0xDFFF_FFFF <br> 0xFF00_0000-0xFFFF_FFFF <br> 0x2_0000_0000-0x2_3FFF_FFFF <br> 0x2_8000_0000-0x2_BFFF_FFFF <br> 0x8_0000_0000-0xF_FFFF_FFFF | 2GB <br> 512MB <br> 16MB <br> 1G <br> 1G <br> 32G| AXI4-MM master interface|

## Creation of new RM

The DFX example design uses abstract shells to create new RMs for the platform. For more information on abstract shells refer [here](https://docs.xilinx.com/r/en-US/ug909-vivado-partial-reconfiguration/Abstract-Shell-for-Dynamic-Function-eXchange). Using the abstract shell flow enables creation of new RMs independent of the Vivado DFX example design. Synthesis and implementation are performed at the RM level instead of at the system level. So, the RM builds using abstract shells complete faster when compared to building RMs with pre-built DFX example design. In this example design, two target RPs are supported - RP_0 and RP_1. RM for desired target RP can be built by passing the RP# as argument.

### Steps to create new RM

* Add the following line to Vivado_init.tcl before launching Vivado. Refer to UG894 for more information on Vivado_init.tcl.

```shell
vim ~/.Xilinx/Vivado/Vivado_init.tcl
set_param bd.gen_bda_file 1
```

* Clone kria-dfx-hw repository.

```shell
git clone --branch xlnx_rel_v2022.1 --recursive https://github.com/Xilinx/kria-dfx-hw.git
```

* Navigate to the create_new_rm directory

```shell
cd kria-dfx-hw/k26/2rp_design/create_new_rm
```
  
* Launch Vivado. In the Vivado Tcl console, run the following Tcl command.
  If a vivado project with the name project_1 already exists, it will be opened. Else, a vivado project with the name project_1 will be created and opened.

```shell
source ./hw_prj.tcl
```

#### RM BD creation

This section provides details about the creation of a BD file for the RM. Accelerators with AXIS interface are supported inside the RM.
Follow the below steps to create RM BD using the provided RM template file.

* Source the Tcl template for AXIS RM and create a BD. In the Vivado Tcl console, run the following command.

  axis_rm_template.tcl has the required Tcl procedures to create an RM with AXIS accelerators. After sourcing the Tcl template, create an RM BD using the cr_bd_axis_rm command by specifying the RM name and target RP. targetRP can be RP_0 or RP_1.

```shell
source ../rm_tcl/axis_rm_template.tcl
cr_bd_axis_rm "" <RMName> <targetRP>
```

This creates a BD file with the name RMName_targetRP.bd and validates it.

**BD location** - `/project_1/project_1.srcs/sources_1/bd/<RMName>_<targetRP>/<RMName>_<targetRP>.bd`
  
#### Inspect the RM BD

* Open the BD created in the step above by double-clicking on the RM BD in the Vivado sources pane.
* Verify the address editor has valid address ranges for the RP being targeted.
* AXIS RMs have 2 custom IPs as part of the RM template.
  
  **rm_comm_box** - More information about this IP is available [here](./Kria_DFX_K26.html#rm_comm_box)
  
  **AccelConfig** - More information about this IP is available [here](./Kria_DFX_K26.html#accelconfig)
  
* Details about how to connect the accelerator to rm_comm_box and Accelconfig is provided [here](./Kria_DFX_K26.html#rm-accelerator)

#### Update the RM BD

* Replace the place-holder accelerator instance, named accel_0, with the new custom accelerator. Optionally, proceed with the default accelerator provided in the template to understand the flow to create a new custom RM.
* Inside the RM BD, the rm_comm_box fetches data from DDR over the M_AXI_GMEM interface and provides it to the AccelConfig module over the mm2s_axis interface. The AccelConfig module parses the data from rm_comm_box based on TID values.
* Configure AccelConfig IP to parse the data from rm_comm_box based on the interface requirements of the new accelerator.
* If the accelerator does not have an AXI-lite control port, enable the ap_ctrl_hs interface on the Accelconfig IP.
* Connect the AXIS output of the accelerator to the s2mm_axis port of rm_comm_box IP.
* Open the address editor and check that addressing is valid after your changes.
* Save the bd after the required changes.
* Validate the BD design.

Run the following command in the Vivado Tcl console.

```shell
validate_bd_design  
```
  
#### Generate RM DCP

* This step will create a synthesis DCP for the RM BD created above.
  Run the following command in the Vivado Tcl console. 

```shell
export_bd_synth -force [get_files ./project_1/project_1.srcs/sources_1/bd/<RMName>_<targetRP>/<RMName>_<targetRP>.bd]
```

This creates a dcp of the BD at the same location where the .bd file is located.

#### Generation of RM partial bit files

This section will cover the generation of an RM partial bit file using the RM DCP created in the last step.

* Navigate to the create_new_rm directory. Launch another instance of Vivado as these steps do not need Vivado project mode.

```shell
cd kria-dfx-hw/k26/2rp_design/create_new_rm
```

* Source the Tcl script that generates RM partial bit file. This script reads RM synthesis DCP and abstract shells of the DFX example design, generates partial bit files and firmware files for the RM. After sourcing the script, run the generate_rm command by using the same RM name and target RP used in the above steps.
* Run the following command in the vivado tcl console.

```shell
source ./generate_rm.tcl
generate_rm RMName targetRP
```
 
#### New RM output files

The output files are created in a directory named output_files. Inside output_files, a directory named RMName will be created. Inside RMName, a directory named RMName_slot0 or RMName_slot1 will be created based on the targetRP. The following files should be created inside RMName_slot0/1.

    * opendfx_shell_i_$targetRP_$RMName_partial.bit
    * accel.json
    * opendfx_shell_i_$targetRP_$RMName_partial.dtsi

**Note:** The directory named RMName is the new RM firmware directory and it should be copied over to the target.

## References

* [Vivado Design Suite Tutorial: Dynamic Function eXchange (UG947)](https://docs.xilinx.com/r/en-US/ug947-vivado-partial-reconfiguration-tutorial/Introduction)
* [Vivado Design Suite User Guide: Dynamic Function eXchange (UG909)](https://docs.xilinx.com/r/en-US/ug909-vivado-partial-reconfiguration/Introduction)

## License

Licensed under the Apache License, Version 2.0 (the "License"); you may not use this file except in compliance with the License.

You may obtain a copy of the License at
[http://www.apache.org/licenses/LICENSE-2.0](http://www.apache.org/licenses/LICENSE-2.0)

Unless required by applicable law or agreed to in writing, software distributed under the License is distributed on an "AS IS" BASIS, WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied. See the License for the specific language governing permissions and limitations under the License.

<p align="center">Copyright&copy; 2021 Xilinx</p>