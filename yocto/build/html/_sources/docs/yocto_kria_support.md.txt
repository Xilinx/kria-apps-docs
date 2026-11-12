# Yocto Kria Support   

Yocto contains support to generate AMD Kria&trade; artifacts starting in 2023.1. PetaLinux is an abstraction of Yocto; it is Yocto + Xilinx meta layers + extra tools such as XSCT, XSDB, and so on. The process and commands of generating artifacts from Yocto versus PetaLinux are different, but the backend is the same (that is, both are Yocto based).

The Yocto Project provides [extensive documentation](https://docs.yoctoproject.org/), and it is recommended that you familiarize yourself with some of the core concepts before continuing. Xilinx specific Yocto information can be found on the [wiki](https://xilinx-wiki.atlassian.net/wiki/spaces/A/pages/18841883/Yocto).

## Board Support Packages

AMD also release the Board Support Packages (BSPs) for each of the Kria platforms. More information are found in [the Kria Wiki](https://xilinx-wiki.atlassian.net/wiki/spaces/A/pages/1641152513/Kria+SOMs+Starter+Kits#PetaLinux-Board-Support-Packages).

## Machine Configurations for Kria

The [machine configurations](https://docs.yoctoproject.org/dev/dev-manual/new-machine.html) provided for Kria define the settings used for a given machine when building each recipe. Different artifacts would be built with each unique combination of machine name and bitbake recipe. Machine configuration files for Kria SOM and Starter Kits are found on [GitHub](https://github.com/Xilinx/meta-kria/tree/master/conf/machine) in release branches for the perspective tool version.


Machine names and recipes for QSPI/boot image generation are listed the following:

- Note that various support starts in different versions, so make sure to align Yocto release versions to the MACHINE + recipe desired.For supports in older tool version, refer to [older tool machine names and recipe section](#older-tool-machine-names-and-recipe).
- in the latest tool set, XSCT flow is depreciated, only [SDT flow](https://xilinx-wiki.atlassian.net/wiki/spaces/A/pages/2743468485/Porting+embeddedsw+components+to+system+device+tree+SDT+based+flow) is used. 
- in the latest tool set, Petalinux Distribution is depreciated, only [EDF distribution](https://edf.docs.amd.com/) is used. 

The 2026.1 release introduces several key updates: :
- deprecation of the k26-smk-sdt and k24-smk-sdt machines and addition of Kria-QSPI support for flat KV, KR, and KD machines. 
- Machine name for wic generation is now the generic amd-cortexa53-mali-common, which has dynamic support for all Kria hardware. It is aligned with EDF and does not use an initdamfs or boot.scr with a UEFI based bootflow.
The recipes supports includes Linux-only and platform categories. The platform recipe support multi domain booting with Linux, OpenAMP and Xen enabled. 

Below two tables list out Machine name + bitbake recipes for the latest tool versions. :

| Machine Name   | Bitbake Recipe | Availability       | Description                                                  |
| -------------- | -------------- | ------------------ | -------------------------------------------------------------|
| k26-smk-kv-sdt-multidomain | kria-qspi      | 2026.1 and newer   | QSPI image supporting K26 Starter Kit SOM on KV carrier card |
| k26-smk-kv-sdt | xilinx-bootbin | 2026.1 and newer   | boot.bin supporting K26 Starter Kit SOM on KV carrier card   |
| k26-smk-kr-sdt-multidomain | kria-qspi      | 2026.1 and newer   | QSPI image supporting K26 Starter Kit SOM on KR carrier card |
| k26-smk-kr-sdt | xilinx-bootbin | 2026.1 and newer   | boot.bin supporting K26 Starter Kit SOM on KR carrier card   |
| k24-smk-kd-sdt-multidomain | kria-qspi      | 2026.1 and newer   | QSPI image supporting K24 Starter Kit SOM on KD carrier card |
| k24-smk-kd-sdt | xilinx-bootbin | 2026.1 and newer   | boot.bin supporting K24 Starter Kit SOM on KD carrier card   |
| k26-sm-sdt     | xilinx-bootbin | 2026.1 and newer   | boot.bin supporting K26 production SOM                      |
| k24i-sm-sdt    | xilinx-bootbin | 2026.1 and newer   | boot.bin supporting K24i production SOM                      |
| k24c-sm-sdt    | xilinx-bootbin | 2026.1 and newer   | boot.bin supporting K24c production SOM                      |
| amd-cortexa53-mali-common | edf-linux-disk-image-kria | 2026.1 and newer | Linux wic image that dynamically support all Kria starter kits and production SOMs |
| amd-cortexa53-mali-common | platform-disk-image-kria  | 2026.1 and newer |  multidomain wic image (including Linux, OpenAMP, Xen) that dynamically support all Kria starter kits and production SOMs |


## Build Host Requirements and Build Environment setup

For detailed steps on setting up the EDF Yocto environment, including host requirements, layer configuration, and build instructions, refer to the [AMD EDF Documentation](https://edf.docs.amd.com/).

## Build the Artifacts

To build the artifacts, use the following command:

```shell
MACHINE=<machine name> bitbake <bitbake recipe> 
```

For example, to build the QSPI image and wic image for the K26 starter kits, use the following command for 2023.1:

```shell
MACHINE=k26-smk-kv-sdt bitbake kria-qspi
MACHINE=amd-cortexa53-mali-common bitbake platform-disk-image-kria 
```

The resulting QSPI image (`<recipe name><machine name>.bin`), .wic image (`<recipe name>-<machine name>.wic.xz`), and their artifacts are found in ```$TMPDIR/deploy/images/<machine name>```, and $TMPDIR is defined in ```build/conf/local.conf```, by default in ```tmp/```.

>**NOTE:** The username for the Yocto generated image is ```petalinux``` for 2024,2 and older, ```amd-edf``` for 2025.1 and newer, and you are immediately prompted to update the password.

## Minimum Linux Image
Image recovery for eMMC is limited by DDR size (2GB in K24, 4GB in K26). The default wic image generated for Kria SOM is more than 8GB from 2026.1 and onwards. To generate a smaller image that can be used by image recovery to load to eMMC in production SOM, user can use upstreamed recipe core-image-full-cmdline (not maintained by AMD):
```
## add this line to conf/local.conf:
IMAGE_FSTYPES += " wic wic.bmap"
MACHINE=amd-cortexa53-mali-common bitbake core-image-full-cmdline

## generate the image:
MACHINE=amd-cortexa53-mali-common bitbake core-image-full-cmdline
```


## QEMU

Yocto can boot each of the various MACHINEs using QEMU once a build completes using the following command:

```shell
MACHINE=<machine name> runqemu nographic slirp
```

Exit from QEMU with ```ctrl-a,x```.

During the build process, a QEMU configuration file is created in the output directory containing all of the configuration options set for the machine and used by the runqemu command. For example, for k26-smk, this file is found in ```$TMPDIR/deploy/images/k26-smk/kria-image-full-cmdline-k26-smk.qemuboot.conf```.

In 2023.1, the combined starterkit k26-smk supports QEMU, and the default hardware which it emulates is KV260. To change it to KR260, update ```sources/meta-kria/conf/machine/k26-smk.conf``` according to the comment in the file.




## Older tool machine names and recipe

This table list Machine names and corresponding recipe for older tool versions for QSPI/boot.bin generation.
- Note that in 2024.2, some artifacts are generated either using XSCT flow, or SDT flow. Refer to [this](https://xilinx-wiki.atlassian.net/wiki/spaces/A/pages/2743468485/Porting+embeddedsw+components+to+system+device+tree+SDT+based+flow) page for more details on the new SDT flow.
- in 2025.1 and onward, XSCT flow is depreciated
- Note that in 2024.2 and older, all images are generated with PetaLinux distribution. In 2025.1, the wic images are generated with [EDF](https://edf.docs.amd.com/) distribution, while the bootbin and QSPI images are still generated with PetaLinux distribution. In 2025.2 and newer, both the wic images and the bootbin/QSPI images are generated with EDF distribution. The repo init command below selects between the two distributions with the presence of a -m option.This changes Yocto repo commands. 


To setup for EDF distribution:
```shell
# repo init to the Xilinx yocto project
repo init -u https://github.com/Xilinx/yocto-manifests.git -b rel-v2025.1 -m default-edf.xml 
# Example: repo init -u https://github.com/Xilinx/yocto-manifests.git -b rel-v2025.1 -m default-edf.xml
# repo sync to get all sources
repo sync
# repo start a branch
repo start <release-branch> --all
# example:  repo start rel-v2025.1 --all
unset TEMPLATECONF
source edf-init-build-env 
```

To setup for PetaLinux distribution:
```shell
# repo init to the Xilinx yocto project
repo init -u https://github.com/Xilinx/yocto-manifests.git -b <release-branch> #PetaLinux Distribution
# Example: repo init -u https://github.com/Xilinx/yocto-manifests.git -b rel-v2025.1
# or for tags instead of branch: repo init -u https://github.com/Xilinx/yocto-manifests.git -b refs/tags/xlnx-rel-v2023.2_update1
# repo sync to get all sources
repo sync
# repo start a branch
repo start <release-branch> --all
# example:  repo start rel-v2025.1 --all
# or for tags instead of branch: repo start xlnx-rel-v2023.2_update1 --all
#source the environment to build using bitbake
source setupsdk  #PetaLinux Distribution only
```

| Machine Name | Bitbake Recipe    | Availability           | Description                                                         |
| ------------ | ----------------- | ---------------------- | --------------------------------------------------------------------|
| k26-smk      | kria-qspi         | 2023.1 through 2024.2  | QSPI image supporting K26 Starter Kit SOM on KV and KR carrier card, using the XSCT flow |
| k24-smk      | kria-qspi         | 2023.1 through 2024.2  | QSPI image supporting K24 Starter Kit SOM on KD carrier card, using the XSCT flow        |
| k26-sm       | xilinx-bootbin    | 2023.1 through 2024.2  | boot.bin that supports production SOM K26i and K26c, using the XSCT flow                 |
| k24i-sm      | xilinx-bootbin    | 2023.2* through 2024.2 | boot.bin that supports production SOM K24i, using the XSCT flow                          |
| k24c-sm      | xilinx-bootbin    | 2023.2* through 2024.2 | boot.bin that supports production SOM K24c, using the XSCT flow                          |
| k26-smk-sdt  | kria-qspi         | 2025.1** through 2025.2| QSPI image supporting K26 Starter Kit SOM on KV and KR carrier card, using the SDT flow  |
| k24-smk-sdt  | kria-qspi         | 2025.1** through 2025.2| QSPI image supporting K24 Starter Kit SOM on KD carrier card, using the SDT flow         |
| k26-sm-sdt   | xilinx-bootbin    | 2024.2 through 2025.2  | boot.bin that supports production SOM K26i and K26c, using the SDT flow                  |
| k24i-sm-sdt  | xilinx-bootbin    | 2024.2 through 2025.2  | boot.bin that supports production SOM K24i, using the SDT flow                           |
| k24c-sm-sdt  | xilinx-bootbin    | 2025.1 through 2025.2  | boot.bin that supports production SOM K24c, using the SDT flow                           |

```*``` 2023.2 support for production is on the [tag xlnx-rel-v2023.2_update1](https://github.com/Xilinx/yocto-manifests/releases/tag/xlnx-rel-v2023.2_update1) repository.
```**``` in 2025.1, image recovery cannot be generated in SDT flow. Therefore, the 2025.1 QSPI generation pulls image recovery prebuilt binary from an artifactory to build QSPI.

For .wic image generation, there are two groups of machines names: .wic images with dynamic support (they can be used with multiple types of Kria SOM boards) and .wic images with flat support (that is, they only support one type of Kria SOM board). This table list Machine names and corresponding recipe for older tool versions for wic image generation:

| Machine Name   | Bitbake Recipe          | Availability           | QEMU Support | Description                                                                                            |
| -------------- | ----------------------- | ---------------------- | ------------ | -------------------------------------------------------------------------------------------------------|
| k26-smk-kv     | kria-image-full-cmdline | 2023.1 through 2024.2  | yes          | Flat wic image that supports KV260, not fully validated on target and meant for development enablement, using the XSCT flow |
| k26-smk-kr     | kria-image-full-cmdline | 2023.1 through 2024.2  | yes          | Flat wic image that supports KR260, not fully validated on target and meant for development enablement, using the XSCT flow |
| k24-smk-kd     | kria-image-full-cmdline | 2023.1 through 2024.2  | yes          | Flat wic image that supports KD240, not fully validated on target and meant for development enablement, using the XSCT flow |
| k26-sm         | kria-image-full-cmdline | 2023.1 through 2024.2  | no           | Flat wic image that supports production SOM K26i and K26c, not fully validated on target and meant for development enablement, using XSCT flow|
| k24i-sm        | kria-image-full-cmdline | 2023.2* through 2024.2 | no           | Flat wic image that supports production SOM K24i, not fully validated on target and meant for development enablement, using the XSCT flow|
| k24c-sm        | kria-image-full-cmdline | 2023.2* through 2024.2 | no           | Flat wic image that supports production SOM K24c, not fully validated on target and meant for development enablement, using the XSCT flow|
| k26-smk-sdt    | kria-image-full-cmdline | 2024.2 through 2025.1  | yes          | wic image that dynamically supports both KV260 and KR260, using the SDT flow                                                |
| k24-smk-sdt    | kria-image-full-cmdline | 2024.2 through 2025.1  | yes          | wic image that dynamically supports KD240, using the SDT flow                                                               |
| k26-smk        | kria-image-full-cmdline | 2023.1 through 2024.2  | yes          | wic image that dynamically supports both KV260 and KR260, using the XSCT flow                                               |
| k24-smk        | kria-image-full-cmdline | 2023.1 through 2024.2  | yes          | wic image that dynamically supports KD240, using the XSCT flow                                                              |
| kria-zynqmp-generic*** | kria-image-full-cmdline | 2024.2 through 2025.2  | no    | wic image that dynamically supports KV260, KR260, and KD240 |
| k26-smk-kv-sdt | kria-image-full-cmdline | 2024.2 through 2025.2  | yes          | Flat wic image that supports KV260, not fully validated on target and meant for development enablement, using the SDT flow  |
| k26-smk-kr-sdt | kria-image-full-cmdline | 2024.2 through 2025.2  | yes          | Flat wic image that supports KR260, not fully validated on target and meant for development enablement, using the SDT flow  |
| k24-smk-kd-sdt | kria-image-full-cmdline | 2024.2 through 2025.2  | yes          | Flat wic image that supports KD240, not fully validated on target and meant for development enablement, using the SDT flow  |
| k26-sm-sdt     | kria-image-full-cmdline | 2024.2 through 2025.2  | no           | Flat wic image that supports production SOM K26i and K26c, not fully validated on target and meant for development enablement, using SDT flow |
| k24i-sm-sdt    | kria-image-full-cmdline | 2024.2 through 2025.2  | no           | Flat wic image that supports production SOM K24i, not fully validated on target and meant for development enablement, using the SDT flow |
| k24c-sm-sdt    | kria-image-full-cmdline | 2024.2 through 2025.2  | no           | Flat wic image that supports production SOM K24c, not fully validated on target and meant for development enablement, using the SDT flow |


```***``` For information on how to generate a .wic image with this MACHINE name, refer to [Build wic image for kria-zynqmp-generic](#build-wic-image-for-kria-zynqmp-generic).

>**NOTE:** The username for the Yocto generated image is ```petalinux``` for 2024,2 and older, ```amd-edf``` for 2025.1 and newer, and you are immediately prompted to update the password.


### Build wic image for kria-zynqmp-generic

From 2025.1 onward, you can generate a common wic image that dynamically supports all three Kria SOM starter kits with a single steo:

```shell
    MACHINE=kria-zynqmp-generic bitbake kria-image-full-cmdline
```

In 2024.2 , you can generate a common wic image that dynamically supports all three Kria SOM starter kits with a few extra steps to generate.

```shell
    # Build the DTB for K26 and K24 machines. You can also use -sdt machines if the SDT flow is desired.

    MACHINE=k26-smk bitbake virtual/dtb
    cp tmp/deploy/images/ k26-smk/devicetree/SMK-*.dtb <dtb_path>
    MACHINE=k24-smk bitbake virtual/dtb
    cp tmp/deploy/images/k24-smk/devicetree/SMK-zynqmp-sck-kd-g-revA.dtb  <dtb_path>
    
    # Add the prebuilt DTB build in above path to `conf/local.conf` in the .wic image builds `local.conf`.
    PRECOMPILED_DTB_FILES_DIR  = <DTB_PATH>
    
    #Build the common .wic image:
    MACHINE=kria-zynqmp-generic bitbake kria-image-full-cmdline
```

> **NOTE:** In kria-zynqmp-generic generated wic image in 2024.2, the SD card is “locked in” to the started kit when first booted. That is, once you have booted the common image on a KV260, you are not be able to reuse the same SD card with the shared common Linux image on a KR260 or a KD240. This is because on initial boot, the default bitstream is locked in based on the EEPROM reading on first boot, and this is not updated on subsequent boots.


### Importing a New XSA File (Aka SDT) in SDT Flow

In SDT flow, the system device tree that was generated from .xsa file is imported yocto flow, instead of directly use .xsa file.

To generate a system device tree from .xsa file, use these commands in sdtgen:

```
# Set output directory
set_dt_param -dir ./<new SDT directory>
# Configure XSA files (static and reconfigurable modules)
sdtgen set_dt_param -xsa <path to .xsa file> 
# Set board device tree
set_dt_param -board_dts <board dts>
# Generate the system device tree
generate_sdt
# Exit SDTGEN
exit
```

in Yocto, regenerate the conf file:
gen-machineconf --template ../sources/meta-amd-adaptive-socs/meta-amd-adaptive-socs-bsp/conf/machineyaml/<machine name>.yaml --hw-description <SDT path>

The <machine name> is now updated with the custom xsa file/SDT. 


### Importing a New XSA File

Note: this is applicable for none-SDT flow (XSCT)  only. 

By default, the Kria Yocto project downloads the .xsa files from artifactory to generate device trees for generating artifacts. To use a local .xsa file, modify the corresponding .conf file in ```sources/meta-kria/conf/machine/<MACHINE name>.conf``` for the target MACHINE. Comment out lines started with ```HDF_URI``` and add the following:

```text
HDF_BASE = "file://"
HDF_PATH = "/path/to/XSA/file.xsa"
```

sha256sum is not needed for local files.

The default values for the .conf files come from ```sources/meta-xilinx-tools/recipes-bsp/hdf/hdf-repository.inc```.

## Updating Default Bitstream

Note: this is for none-SDT flow (XSCT) only

In the Kria Starter Kits boot flow, the PL portion of the Zynq MPSoC is not programmed until during the Linux boot, DFX_manager loads the default bitstream in `/lib/firmware/xilinx/k26-starter-kits/ or /lib/firmware/xilinx/k24-starter-kits/`. If you need to change the PL design that is loaded by default, update the firmware folder, which is managed by the recipe located in `$yocto_project_folder/sources/meta-kria/recipes-firmware/kria-base-firmware/`. In that folder, the recipes can be updated to take the firmware from a local folder instead of from GitHub.

For example, to update the PL firmware for K26 only, comment out the the license and source lines in ```kria-base-firmware.inc```:

```python
#LICENSE = "Proprietary & GPL-2.0-only"
#LIC_FILES_CHKSUM = " \
#       file://${WORKDIR}/git/LICENSE-BINARIES;md5=09db6fa082215924b1374f4f02a49f72 \
#       file://${WORKDIR}/git/LICENSE-GPLv2;md5=9afdcd1be3f71bd3791fa5961075d776 \
#       "

#BRANCH = "xlnx_rel_v2023.1"
#SRC_URI = "git://github.com/Xilinx/kria-base-firmware.git;protocol=https;branch=${BRANCH}"
#SRCREV = "d512881ad56fcb8ad3bffea543280c5b357bb9ea"
```

Put the firmware files into a folder with the same name as the ```k26-starter-kits```.bb file :

```shell
ls /tmp/jues_yocto_2024.1_xen/sources/meta-kria/recipes-firmware/kria-base-firmware/k26-starter-kits/
k26_starter_kits.bit  k26_starter_kits.dtsi  shell.json
```

Add these lines in ```k26-starter-kits.bb``` to point to the local firmware:

```python
SRC_URI = " \
    file://k26_starter_kits.bit \
    file://k26_starter_kits.dtsi \
    file://shell.json \
    "
```

Then rebuild Yocto; the added firmware are loaded during the Linux boot by dfx-manager.



## Issues

1. If you see the error, ```error loading hsi package: couldn't load file "libxv_commontasks.so"```, it might be missing the libtinfo5 library which can be installed with ```sudo apt-get install -y libtinfo5```.


<hr class="sphinxhide"></hr>

<p class="sphinxhide" align="center"><sub>Copyright © 2023–2025 Advanced Micro Devices, Inc.</sub></p>

<p class="sphinxhide" align="center"><sup><a href="https://www.amd.com/en/corporate/copyright">Terms and Conditions</a></sup></p>