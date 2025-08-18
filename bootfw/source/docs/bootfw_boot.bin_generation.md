
# Generating `BOOT.bin`

## Introduction

As outlined in the [Boot Firmware Overview](./bootfw_overview.md), the Kria SOM Starter Kit BOOT.BIN is part of the quad SPI (QSPI) image, and contains four components: FSBL, PMU_FW, TF-A, and U-Boot. This page outlines the process to recreate a BOOT.bin for Kria SOM Starter kits used in A/B image update. Both PetaLinux and Yocto supports BOOT.BIN generation. [Yocto](https://xilinx-wiki.atlassian.net/wiki/spaces/A/pages/18841883/Yocto) support for generating the Kria SOM Starter Kit BOOT.BIN image only starts in 2023.1, previous versions do not have support.

## Generate BOOT.BIN Using Yocto

 [Yocto Kria Support](https://xilinx.github.io/kria-apps-docs/yocto.html) details how to use Yocto to generate Kria artifacts; go through this page from beginning to "Build the Artifacts" section to set up Yocto.

 The bitbake recipe for `BOOT.BIN` in Yocto is ```xilinx-bootbin``` and the command to build is:

 ``` shell
 MACHINE=k26-smk bitbake xilinx-bootbin # for K26
 MACHINE=k24-smk bitbake xilinx-bootbin # for K24
 ```

 To set U-Boot configuration, use this command before building:

 ```shell
 MACHINE=k26-smk bitbake virtual/bootloader -c menuconfig
 ```

## Generate BOOT.BIN Using PetaLinux

Go through the [PetaLinux Build Instructions](https://xilinx-wiki.atlassian.net/wiki/spaces/A/pages/1641152513/Kria+K26+SOM#PetaLinux-Build-instructions). There are instructions to generate BOOT.BIN from PetaLinux. To recap, they are the following:

```shell
petalinux-create -t project -s <kria_starterkit>.bsp
cd <kria_starter_kit_petalinux_folder>
petalinux-build
petalinux-package --boot --u-boot --force
```

The new boot firmware is found in `/image/linux/BOOT.BIN`.

To set the configuration for U-Boot, use this command before `petalinux-build`:

```shell
petalinux-config –c u-boot
```

The new `BOOT.BIN` can be loaded to the Starter Kit using the xmutil bootfw_update utility described in [Kria Wiki's Boot FW Update Process section](https://xilinx-wiki.atlassian.net/wiki/spaces/A/pages/1641152513/Kria+K26+SOM#Boot-FW-Update-Process).

<hr class="sphinxhide"></hr>

<p class="sphinxhide" align="center"><sub>Copyright © 2023-2025 Advanced Micro Devices, Inc.</sub></p>

<p class="sphinxhide" align="center"><sup><a href="https://www.amd.com/en/corporate/copyright">Terms and Conditions</a></sup></p>