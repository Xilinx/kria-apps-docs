<table class="sphinxhide">
 <tr>
   <td align="center"><img src="media/xilinx-logo.png" width="30%"/><h1> Kria&trade; KV260 Vision AI Starter Kit Tutorial</h1>
   </td>
 </tr>
 <tr>
 <td align="center"><h1>Tool Flow Overview</h1>

 </td>
 </tr>
</table>

# Tool Flow Overview

## Introduction
 
This document provides an overview of how the hardware and software components are built for an application.

## Tool Flow

At a high level, the builds steps are as follows:

1. Vivado platform design: The Vivado design is augmented with platform parameters that describe the meta data and physical interfaces available to the Vitis compiler for stitching in PL kernels.

2. Platform creation: The XSCT utility is used to create an extensible platform whose main component is the XSA created by Vivado in step 1.

3. PL kernels: The Vitis compiler is used to compile PL accelerator kernels from C/C++ using high-level synthesis (HLS) or to package RTL kernels. The kernels are compiled into xo files and consumed by the Vitis linker in the next step.
  
    Vitis linker and packager: The Vitis linker integrates the PL kernels into the platform and implements the design. It generates a new device image (bitfile) as well as xclbin file containing meta data information about the PL kernels.

    Note: Adding PL kernels to a platform is optional. If the system design needs certain acceleration or processing functions then this build step is needed.

4. Firmware : Vitis created platform containing the PL kernel is a bitfile and the metadata is an xclbin. On ubuntu platform the bitstream  header is stripped to obtain fpga configuration data as a bin object (\*.bin), the metadata xclbin is consumed as is from Vitis. A runtime devicetree blob  corresponding to the PL bitstream is required (.dtbo) to be loaded as an overlay, which when loaded in kernel invokes all the drivers corresponding to the PL bitstream. Hence fpga configuration data ( *.bin), metadata (xclbin) and a device-tree overlay blob (*dtbo) together form the firmware binraries.

### Accessing the Tutorial Reference Files

1. To access the reference files, type the following into a terminal: 

  ```shell
  git clone --branch xlnx_rel_v2022.1 --recursive https://github.com/Xilinx/kria-vitis-platforms.git
  ```

## Directory Structure

The directory structure of the repository is shown below
```text
kria-vitis-platforms
+-- kv260
¦ +-- Makefile
¦ +-- overlays 
¦ ¦  +-- dpu_ip 
¦ ¦  +-- examples 
¦ ¦  ¦   +-- aibox-reid
¦ ¦  ¦   +-- defect-detect
¦ ¦  ¦   +-- nlp-smartvision
¦ ¦  ¦   +-- smartcam
¦ ¦  +-- README
¦ ¦  +-- Vitis_Libraries
¦ +-- platforms
¦ ¦  +-- Makefile
¦ ¦  +-- README
¦ ¦  +-- scripts
¦ ¦  +-- vivado
¦ ¦  ¦   +-- kv260_ispMipiRx_rpiMipiRx_DP
¦ ¦  ¦   +-- kv260_ispMipiRx_vcu_DP
¦ ¦  ¦   +-- kv260_ispMipiRx_vmixDP
¦ ¦  ¦   +-- kv260_vcuDecode_vmixDP
+-- README
```

## Next Steps

  * [Building the Hardware design using Vivado](build_vivado_design.md)
  * Go back to the [KV260 SOM designs start page](../index)


### License

Licensed under the Apache License, Version 2.0 (the "License"); you may not use this file except in compliance with the License.

You may obtain a copy of the License at
[http://www.apache.org/licenses/LICENSE-2.0](http://www.apache.org/licenses/LICENSE-2.0)

Unless required by applicable law or agreed to in writing, software distributed under the License is distributed on an "AS IS" BASIS, WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied. See the License for the specific language governing permissions and limitations under the License.

<p align="center">Copyright&copy; 2021 Xilinx</p>
