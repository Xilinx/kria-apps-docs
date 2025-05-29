
# Stitching the QSPI Image

## Introduction

This page outlines the process to recreate a QSPI image for Kria SOM Starter kits to help create your own QSPI image to use with your custom carrier cards. [Yocto](https://xilinx-wiki.atlassian.net/wiki/spaces/A/pages/18841883/Yocto) support for generating Kria SOM Starter Kit QSPI image only starts in 2023.1; previous versions do not have support.

## Requirements

As outlined in the [Boot Firmware Overview](./bootfw_overview.md), the Kria SOM Starter Kit QSPI image is stitched together from several components. The overview also provides the QSPI memory map that Kria Starter Kit QSPI binaries follow. The rest of the Boot Firmware documentation is also an outlined process to individually generate each component.

This document details a Yocto Flow that automates the generation of those binary files and stitches them together.

### Step 1: Preparing the Build Environment

Before continuing, go through [Yocto Support on Kria](https://xilinx.github.io/kria-apps-docs/yocto.html) and finish the [Prepare the Build Environment section](https://xilinx.github.io/kria-apps-docs/yocto/build/html/docs/yocto_kria_support.html#prepare-the-build-environment).

### Step 2: Build the Image

To build the QSPI image, use the following command for 2023.1 and later:

```shell
MACHINE=k26-smk bitbake kria-qspi #for K26
MACHINE=k24-smk bitbake kria-qspi #for K24
```

The resulting QSPI image ```kria-qspi-k2*-smk.bin``` and its artifacts can be found in ```$TMPDIR/deploy/images/k2*-smk```, and $TMPDIR is defined in ```build/conf/local.conf```.
>**NOTE:** The fsbl file ```fsbl-k2*-smk.elf``` might also be needed in the QSPI programming steps. This image universally supports all the Starter Kits based on the SOM, as well as both the Starter Kit SOM and Production SOM.

To only build the `boot.bin`:

```shell
MACHINE=k26-smk bitbake xilinx-bootbin #for K26
MACHINE=k24-smk bitbake xilinx-bootbin #for K24
```

The resulting `boot.bin` image, ```BOOT-k2*-smk.bin```, and its artifacts can be found in ```$TMPDIR/deploy/images/k2*-smk```, and $TMPDIR is defined in ```build/conf/local.conf```.

## Issues

1. If you see the error, ```error loading hsi package: couldn't load file "libxv_commontasks.so"```, it might be missing libtinfo5 library which can be installed with ```sudo apt-get install -y libtinfo5```.

<hr class="sphinxhide"></hr>

<p class="sphinxhide" align="center"><sub>Copyright © 2023-2025 Advanced Micro Devices, Inc.</sub></p>

<p class="sphinxhide" align="center"><sup><a href="https://www.amd.com/en/corporate/copyright">Terms and Conditions</a></sup></p>