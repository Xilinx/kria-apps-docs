# Image Selector

## Introduction

The Image Selector (ImgSel) is a small baremetal application running out of OCM after a POR/SRST that implements boot firmware selection used for the full platform boot. ImgSel extends the native MPSoC CSU BootROM image search capability to have a more intelligent and flexible image selection including A/B boot firmware selection logic. In Kria Starter Kits, the ImgSel application is loaded by CSU from QSPI to OCM to be run. Image Selector reads the persistent registers and based on the values it chooses the system boot image (either "A" or "B") to be booted. ImgSel then updates the multiboot register with the corresponding image QSPI address and initiates a platform reset to boot the full system.

The Image Selector for Kria Starter Kits is pre-provisioned as part of the kit manufacturing loaded QSPI image. If you want to use the same feature in your production SOM, you need to build the Image Selector application with the XIS_UPDATE_A_B_MECHANISM build time flag enabled. Source code is provided in GitHub to customize further.

## Code Flow

The Image Selector has the following code flow:

1. Configure PLLs, clocks, MIOs, and resets.
  a. PLLs (APLL and IOPLL)
  b. QSPI if image selection based on QSPI A/B update data.
    i. MIOs - MIO0-6
    ii. Clocks - QSPI clock configured to 300 MHz.
    iii. Release QSPI reset
2. If the image selection is based on QSPI A/B update register data.
  a. Read QSPI registers and validate them.
  b. Update the multiboot register based on the requested image (Request image A/B or Recovery Image).
3. Do a system reset, so that the ROM loads the correct boot image.
4. Upon any error, increment the multiboot register by 1, and reset the system.

## Image Selector Usage Instructions

### Compilation Procedure (Vitis Flow)

* Provide the ZynqMP or Kria XSA file, or use a pre-built board description (on the welcome page, ```Create Platform``` to provide XSA file).
* Select the OS as standalone, processor as Cortex-A53_0, and architecture as 64-bit.
* Right-click `psu_cortexa53_0` -> New -> Application Project, select the platform just created, name the application project, select standalone_domain as domain, choose `Image Selector` application in embedded software development templates, and click **Finish**.
* By default, debug prints are disabled. If debug prints are required to debug, you need to enable the XIS_UART_ENABLE macro in the `xis_config.h` file.
* The following mentioned macros support two different mechanisms defined in the `xis_config.h` file. Only one mechanism is supported at a time:
  * XIS_UPDATE_A_B_MECHANISM (QSPI based 'A/B' Firmware Boot Mode)
    * `#define XIS_UPDATE_A_B_MECHANISM` needs to be uncommented for Kria SOM.
    * Image selection based on QSPI A/B update register data.
    * It reads the persistent registers from QSPI, and based on persistent registers data, it updates the multi-boot value.
  * XIS_GET_BOARD_PARAMS (SD boot mode), this is not supported for Kria SOM.
    * It reads the board name from EEPROM, and based on board name, it updates the multi-boot value.
    * SD has multiple board images with different file names in Partition 0.
    * `#define XIS_GET_BOARD_PARAMS` must be commented out for SOM.

### Compilation Procedure (Makefile Flow)

>**NOTE:** The following Makefile requires tools that are placed in the path by sourcing the PetaLinux, Vitis, or Vivado settings64.* file.

In a Linux terminal:

```shell
git clone --branch xlnx_rel_v<version> https://github.com/Xilinx/embeddedsw.git
cd embeddedsw/lib/sw_apps/imgsel/src
make clean all BOARD=som
```

### Source Code

The Image Selector source code can be found in [GitHub](https://github.com/Xilinx/embeddedsw/tree/master/lib/sw_apps/imgsel).
Image Selector configuration can be changed in the [xis_config.h](https://github.com/Xilinx/embeddedsw/blob/master/lib/sw_apps/imgsel/src/xis_config.h) to select selection mechanism, I2C parameters, and debug prints.
The Makefile Flow above automatically updates the correct parameters for SOM with BOARD=```som```.

<hr class="sphinxhide"></hr>

<p class="sphinxhide" align="center"><sub>Copyright © 2023-2025 Advanced Micro Devices, Inc.</sub></p>

<p class="sphinxhide" align="center"><sup><a href="https://www.amd.com/en/corporate/copyright">Terms and Conditions</a></sup></p>
