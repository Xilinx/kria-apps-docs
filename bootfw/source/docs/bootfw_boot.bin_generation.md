
# Boot Firmware - Generating BOOT.bin

## Introduction

As outlined in [bootfw overview](./bootfw_overview.md), Kria SOM Starter Kit BOOT.BIN is part of QSPI image, and contains 4 components - FSBL, PMU_FW, TF-A, U-boot. This page outlines the process to re-create a BOOT.bin for Kria SOM Starter kits used in A/B image update. Both PetaLinux and Yocto supports BOOT.BIN Generation. [Yocto](https://xilinx-wiki.atlassian.net/wiki/spaces/A/pages/18841883/Yocto) support for generating Kria SOM Starter Kit BOOT.BIN image only starts in 2023.1, previous versions do not have support.

## Generate BOOT.BIN using Yocto

 [Yocto Kria Support](https://xilinx.github.io/kria-apps-docs/yocto/build/html/docs/yocto_kria_support.html) details how to use Yocto to generate Kria artifacts, go through this page from beginning to "[Build the Artifacts](kria-qspi-k24-smk-20230614093348)" section to setup Yocto.

 The bitbake recipe for BOOT.BIN in Yocto is ```xilinx-bootbin``` and command to build is:

 ``` shell
 MACHINE=k26-som bitbake xilinx-bootbin
 ```

## Generate BOOT.BIN using PetaLinux

Go through [Xilinx Wiki PetaLinux Build Instructions](https://xilinx-wiki.atlassian.net/wiki/spaces/A/pages/1641152513/Kria+K26+SOM#PetaLinux-Build-instructions) - there are instructions to generate BOOT.BIN from PetaLinux. To recap they are the following:

``` 
petalinux-create -t project -s <kria_starterkit>.bsp
cd <kria_starter_kit_petalinux_folder>
petalinux-build
petalinux-package --boot --u-boot --force
```

You will find new boot firmware at /image/linux/BOOT.BIN.

The new BOOT.BIN can be loaded to the Starter Kit using the xmutil bootfw_update utility described in [Kria Wiki's Boot FW Update Process section](https://xilinx-wiki.atlassian.net/wiki/spaces/A/pages/1641152513/Kria+K26+SOM#Boot-FW-Update-Process).

## License

Licensed under the Apache License, Version 2.0 (the "License"); you may not use this file except in compliance with the License.

You may obtain a copy of the License at
[http://www.apache.org/licenses/LICENSE-2.0](http://www.apache.org/licenses/LICENSE-2.0)

Unless required by applicable law or agreed to in writing, software distributed under the License is distributed on an "AS IS" BASIS, WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied. See the License for the specific language governing permissions and limitations under the License.

<p align="center">Copyright&copy; 2021 Xilinx</p>