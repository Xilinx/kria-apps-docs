<table class="sphinxhide">
 <tr>
   <td align="center"><img src="media/xilinx-logo.png" width="30%"/><h1> Kria&trade; KD240 Drives Starter Kit Tutorial</h1>
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

1. **AMD Vivado&trade; platform design**: The Vivado design is augmented with platform parameters that describe the metadata and physical interfaces available to the AMD Vitis&trade; compiler for stitching in programmable logic (PL) kernels.

2. **Platform creation**: The XSCT utility is used to create an extensible platform whose main component is the XSA created by Vivado in step 1.

3. **PL kernels**: The Vitis compiler is used to compile PL accelerator kernels from C/C++ using high-level synthesis (HLS) or to package register transfer level (RTL) kernels. The kernels are compiled into xo files and consumed by the Vitis linker in the next step.

    **Vitis linker and packager**: The Vitis linker integrates the PL kernels into the platform and implements the design. It generates a new device image (bitfile) as well as xclbin file containing metadata information about the PL kernels.

    >***NOTE:** Adding PL kernels to a platform is optional. If the system design needs certain acceleration or processing functions, this build step is needed.

4. **Firmware**: THe Vitis-created platform containing the PL kernel is a bitfile, and the metadata is an xclbin. On Ubuntu platform, the bitstream  header is stripped to obtain FPGA configuration data as a bin object (\*.bin), and the metadata xclbin is consumed as is from Vitis. A runtime devicetree blob corresponding to the PL bitstream is required (.dtbo) to be loaded as an overlay, which when loaded in kernel, invokes all the drivers corresponding to the PL bitstream. Hence, the FPGA configuration data ( *.bin), metadata (xclbin), and a device-tree overlay blob (*dtbo) together form the firmware binaries.

### Accessing the Tutorial Reference Files

1. To access the reference files, type the following into a terminal:

  ```shell
  git clone --branch xlnx_rel_v2023.1 --recursive https://github.com/Xilinx/kria-vitis-platforms.git
  ```

## Directory Structure

The directory structure of the repository is as follows:

```text
kria-vitis-platforms
├── common
│   └── Vitis_Libraries
├── Jenkinsfile
├── k26
├── kd240
│   ├── Makefile
│   └── platforms
│       ├── Makefile
│       ├── README
│       ├── scripts
│       │   └── pfm.tcl
│       └── vivado
│           ├── board_files
│           ├── ip
│           ├── kd240_bist
│           └── kd240_motor_ctrl_qei
├── kr260
├── kv260
├── LICENSE
└── README.md
```

To access firmware repos:

```shell
git clone https://github.com/Xilinx/kria-apps-firmware
```

## Next Steps

* [Building the Hardware Design Using Vivado](build_vivado_design.md)


<p class="sphinxhide" align="center">Copyright&copy; 2023 Advanced Micro Devices, Inc.</p>

