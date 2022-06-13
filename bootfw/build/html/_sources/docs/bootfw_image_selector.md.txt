# Boot Firmware - Image Selector

## Introduction

The Image Selector(ImgSel) is a small baremetal application running out of OCM after a POR/SRST that implements boot firmware selection used for the full platform boot. ImgSel extends native MPSoC CSU BootROM image search capability to have a more intelligent and flexible image selection including A/B boot firmware selection logic. In Kria Starter Kits the ImgSel application is loaded by CSU from QSPI to OCM to be run. Image Selector reads the persistent registers and based on the values it chooses the system boot image (either "A" or "B") to be booted. ImgSel then updates the multiboot register with the corresponding image QSPI address and initiates a platform reset to boot the full system.

The Image Selector for Kria Starter Kits is pre-provisioned as part of the kit manufacturing loaded QSPI image. If a user wants to use the same feature in their production SOM users' needs to build the Image Selector application with the XIS_UPDATE_A_B_MECHANISM build time flag enabled. Source code has been provided in GitHub for developers wishing to customize further.

## Code Flow

The Image Selector has the following code flow:

1. Configure PLLs, clocks, MIOs, resets
  a. PLLs (APLL and IOPLL)
  b. QSPI if image selection based on QSPI A/B update data
    i. MIOs - MIO0-6
    ii. Clocks - QSPI clock configured to 300MHz
    iii. Release QSPI reset
2. If image selection based on QSPI A/B update register data
  a. Read QSPI registers and validate them
  b. Update multiboot register based on the requested image (Request image A/B or Recovery Image)
3. Do a system reset, so that ROM loads the correct boot image
4. Upon any error, increment the multiboot register by 1 and reset the system

## Image Selector Usage Instructions

### Compilation Procedure (Vitis Flow)

* Provide ZynqMP or Kria XSA file or use a pre-built board description (In welcome page, ```Create Platform``` to provide XSA file)
* Select OS as standalone and processor as Cortex-A53_0, architecture as 64-bit
* right click ```psu_cortexa53_0``` -> New -> Application Project, select the platform just created, name the application project, select standalone_domain as domain, choose ```Image Selector``` application in embedded software development templates and click Finish
* By default debug prints will be disabled, If Debug prints required to debug need to enable XIS_UART_ENABLE macro in xis_config.h file
* Below mentioned macros support two different mechanisms defined in xis_config.h file only one mechanism is supported at a time:
  * XIS_UPDATE_A_B_MECHANISM (QSPI based 'A/B' Firmware Boot Mode)
    * ```#define XIS_UPDATE_A_B_MECHANISM``` needs to be uncommented for Kria SOM
    * Image selection based on QSPI A/B update register data
    * It will read the persistent registers from QSPI and based on persistent registers data it will update the multi-boot value
  * XIS_GET_BOARD_PARAMS (SD boot mode) - this is not supported for Kria SOM
    * It will read the board name from EEPROM and based on board name it will update the multi-boot value
    * SD shall have multiple board images with different file names in Partition 0
    * ```#define XIS_GET_BOARD_PARAMS``` needs to be commented out for SOM

### Compilation Procedure (Makefile Flow)

Note that the Makefile below requires tools that are placed in the path by sourcing PetaLinux, or Vitis, or Vivado settings64.* file.

In a linux terminal

``` shell
git clone https://github.com/Xilinx/embeddedsw.git
cd embeddedsw/lib/sw_apps/imgsel/src
make clean all BOARD=som
```

### Source Code

The Image Selector source code can be found in [github](https://github.com/Xilinx/embeddedsw/tree/master/lib/sw_apps/imgsel).
Image Selector configuration can be changed in the [xis_config.h](https://github.com/Xilinx/embeddedsw/blob/master/lib/sw_apps/imgsel/src/xis_config.h) to select selection mechanism, I2C parameters and debug prints.
The Makefile Flow above automatically updates the correct parameters for som with BOARD=```som```.

### License

Licensed under the Apache License, Version 2.0 (the "License"); you may not use this file except in compliance with the License.

You may obtain a copy of the License at
[http://www.apache.org/licenses/LICENSE-2.0](http://www.apache.org/licenses/LICENSE-2.0)

Unless required by applicable law or agreed to in writing, software distributed under the License is distributed on an "AS IS" BASIS, WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied. See the License for the specific language governing permissions and limitations under the License.

<p align="center">Copyright&copy; 2021 Xilinx</p>