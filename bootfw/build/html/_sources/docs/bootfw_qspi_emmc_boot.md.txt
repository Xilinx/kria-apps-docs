
# Boot Firmware - QSPI to eMMC boot for Production SOM

## Introduction

The production SOM has an eMMC device populated, whereas the Starterkit SOMs do not. Therefore, instead of Starterkit's QSPI->SD two stage boot process, developer can do a QSPI -> eMMC two stage process on the production SOM. This page gives an example of how to boot from QSPI -> eMMC.

User can also use the traditional monolthic boot (from eMMC) for production SOMs by using eMMC bootmode and placing boot files in eMMC. This method is not covered by this document.

## Steps

### 1. Program boot.bin to QSPI

Unlike Starter Kit SOM, the production SOM is shipped without QSPI prepopulated. So developer first need to program QSPI with the appropiate boot firmware. the QSPI binary for Starter Kit SOM is not released, but instead developer can program boot.bin directly to address 0x0 of QSPI.

*list directions in Vivado to program*

### 2. Boot Linux through JTAG or other methods

To book from QSPI -> eMMC, we first need to boot Linux that has eMMC awareness.
We can either do petalinux-boot --jtag or boot from SD card for now assuming that there's a SD card on the CC.

To use Petalinux-boot, refer to [Petalinux Jtag Boot](https://docs.xilinx.com/r/en-US/ug1144-petalinux-tools-reference-guide/Steps-to-Boot-a-PetaLinux-Image-on-Hardware-with-JTAG). Developer should download the [Production K26 SOM BSP](https://xilinx-wiki.atlassian.net/wiki/spaces/A/pages/1641152513/Kria+K26+SOM#PetaLinux-Board-Support-Packages).

On the host connected to the board, start xsdb and put the board in JTAG bootmode:

```shell
connect 
targets -set -filter {name =~ "PSU"}
mwr -force 0xffca0010 0x0; mwr -force 0xff5e0200 0x0100
rst -system
```

On the host with K26 BSP:

```shell
petalinux-create -t project -s xilinx-k26-som-<version>.bsp
cd xilinx-k26-som-<version>
petalinux-boot --jtag --prebuilt 3 --hw_server-url <hostname:3121>
```

on the host connected to the board, in the uart console, stop at u-boot and enter the following:

```shell
booti 0x00200000 0x04000000 0x00100000
```

This will boot a Linux with tinyFS, and you can ignore the error `ERROR: There's no '/dev' on rootfs.` because tiny FS does not provide /dev folder.

### 3. Write to eMMC in Linux

Once booted to Linux, you should be able to see  /dev/mmcblk0-  the eMMC partition, and /dev/mmcblk1 - the SD partition on KV260 starter kit. to double check, you can use this command:

```shell
cat /sys/class/mmc_host/mmc0/*/uevent
cat /sys/class/mmc_host/mmc1/*/uevent
```

if ```MMC_TYPE=MMC```, it is an eMMC device, if ```MMC_TYPE=SD```, it is a SD device.

Next, delete the paritions on eMMC.

```shell
fdisk /dev/mmcblk0 #delete all partitions using "d" + "enter" followed by "partition number to be deleted"
```

Next, transfer the file over using your favorite method (such as scp, nfs, copying over SD card etc...). We are showing nfsroot method below:

On host computer:

```shell
nfsroot3 <path to be mounted where wic image is present>
```

On target:

```shel
        mkdir /nfsroot
        mount -t nfs -o nolock,proto=tcp,port=2049 10.10.70.101:/exports/root /nfsroot
        Use DD command to flash wic
        dd if=/nfsroot/petalinux-sdimage.wic of=/dev/mmcblk0
```

### 4. reboot in QSPI mode

Next, boot the board in QSPI - simply power cycle or do following in xsdb:

``` shell
targets -set -filter {name =~ "PSU"}
mwr -force 0xffca0010 0x0;mwr -force 0xff5e0200 0x2100
rst -system
targets -set -nocase -filter {name =~ cortex-A53*0}
con
con
```

refer to [u-boot handoff](./bootfw_uboot_handoff.md) "Prioritized Boot Order" section, on 22.1 or later, u-boot will prioritize handling off from QSPI to eMMC on production SOM, if images are available.

## License

Licensed under the Apache License, Version 2.0 (the "License"); you may not use this file except in compliance with the License.

You may obtain a copy of the License at
[http://www.apache.org/licenses/LICENSE-2.0](http://www.apache.org/licenses/LICENSE-2.0)

Unless required by applicable law or agreed to in writing, software distributed under the License is distributed on an "AS IS" BASIS, WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied. See the License for the specific language governing permissions and limitations under the License.

<p align="center">Copyright&copy; 2021 Xilinx</p>