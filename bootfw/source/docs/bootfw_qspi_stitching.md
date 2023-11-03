
# Stitching QSPI Image

## Introduction

This page outlines the process to re-create a QSPI image for Kria SOM Starter kits to help developers create their own QSPI image to use with their custom carrier cards. [Yocto](https://xilinx-wiki.atlassian.net/wiki/spaces/A/pages/18841883/Yocto) support for generating Kria SOM Starter Kit QSPI image only starts in 2023.1, previous versions do not have support.

## Requirements

As outlined in [bootfw overview](./bootfw_overview.md), Kria SOM Starter Kit QSPI image is stitched together from several components. The overview also provides the QSPI memory map that Kria Starter Kit QSPI binaries follow. The rest of the bootfw documentation also outlined process to individually generate each components.

This document details a Yocto Flow that automates the generation of those binary files and stitch them together.

### Step 1: Preparing the Build Environment

Before continuing, go through the  [Yocto support on Kria](https://xilinx.github.io/kria-apps-docs/yocto.html) and finish [prepare the build environment section](https://xilinx.github.io/kria-apps-docs/yocto/build/html/docs/yocto_kria_support.html#prepare-the-build-environment).

### Step 2: Build the image

To build QSPI image use below command for 2023.1 and later:

```shell
MACHINE=k26-smk bitbake kria-qspi #for K26
MACHINE=k24-smk bitbake kria-qspi #for K24
```

The resulting QSPI image ```kria-qspi-k2*-smk.bin``` and its artifacts can be found in ```$TMPDIR/deploy/images/k2*-smk```, and $TMPDIR is defined in ```build/conf/local.conf```. Note that the fsbl file ```fsbl-k2*-smk.elf``` may also be needed in the QSPI programming steps. This image universally supports all the Starter Kits based on the SOM, as well as both StarterKit SOM and Production SOM.

To only build the boot.bin:

```shell
MACHINE=k26-smk bitbake xilinx-bootbin #for K26
MACHINE=k24-smk bitbake xilinx-bootbin #for K24
```

The resulting boot.bin image ```BOOT-k2*-smk.bin``` and its artifacts can be found in ```$TMPDIR/deploy/images/k2*-smk```, and $TMPDIR is defined in ```build/conf/local.conf```

## Issues

1. If you see the error ```error loading hsi package: couldn't load file "libxv_commontasks.so" ```, it maybe missing libtinfo5 library which can be installed with ```sudo apt-get install -y libtinfo5```

## License

Licensed under the Apache License, Version 2.0 (the "License"); you may not use this file except in compliance with the License.

You may obtain a copy of the License at
[http://www.apache.org/licenses/LICENSE-2.0](http://www.apache.org/licenses/LICENSE-2.0)

Unless required by applicable law or agreed to in writing, software distributed under the License is distributed on an "AS IS" BASIS, WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied. See the License for the specific language governing permissions and limitations under the License.

<p class="sphinxhide" align="center">Copyright&copy; 2023 Advanced Micro Devices, Inc</p>