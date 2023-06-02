# Xen Kria SOM Starter Kits Support

[Xen](https://xenproject.org/) is a free and open-source hypervisor, providing services that allow multiple computer operating systems to execute on the same computer hardware concurrently. The 2023.1 Kria Starter Kit Petalinux BSP contains support for XEN. Xilinx specific details about XEN hypervisor can be found on its [wiki page](https://xilinx-wiki.atlassian.net/wiki/spaces/A/pages/18842530/XEN+Hypervisor).

This page documents where to get XEN artifacts for Kria, and gives an example on how to boot Ubuntu as guest OS (a DOMU) on a XEN DOM0. This particular combination requires about 4GB of memory, which K26 has. Therefore this can be done on either KV260 or KR260.

## Prerequisites

1. Experience and equipments booting a regular PetaLinux on Kria SOM Starter Kit (you can follow [getting started with PetaLinux on KV260](https://www.xilinx.com/products/som/kria/kv260-vision-starter-kit/kv260-getting-started/setting-up-the-sd-card-image.html), but use a wic image from 2023.1 BSP on a minimum 16GB SD Card)
2. A Linux Desktop to create and program partitions
3. PetaLinux tool

## Prepare SD Card

First, download a 2023.1 or later [Kria SOM Starter Kit BSP](https://xilinx-wiki.atlassian.net/wiki/spaces/A/pages/1641152513/Kria+K26+SOM#PetaLinux-Board-Support-Packages). Extract the PetaLinux project:

```bash
petalinux-create -t project -s xilinx-<hardware>-<version>-<timestamp>.bsp
cd xilinx-<hardware>-<version>
```

Flash the wic image in ```pre-built/linux/images/petalinux-sdimage.wic.xz``` to an SD card using Balena Etcher. This will set up the SD card to contain 2 partitions - partition 1 with boot images (accessible by Windows and Linux) that we will discard and partition 2 with PetaLinux rootfs (not accessible by Windows) that will also be used for XEN DOM0.

### Partition 1

Artifacts required to boot XEN can be found in ```pre-built/linux/xen/``` in the PetaLinux project. Open the SD card on a host computer (can be Windows or Linux), go to partition 1, remove the boot images on that partition and copy all the files under ```pre-built/linux/xen/``` into partition 1.

We also need to copy over the Ubuntu image that we want to boot as DOMU. Download the [iot-limerick-kria-classic-desktop-2204-x07-20230302-63-system-boot.tar.gz](https://people.canonical.com/~platform/images/xilinx/kria-ubuntu-22.04/iot-limerick-kria-classic-desktop-2204-x07-20230302-63-system-boot.tar.gz?_ga=2.93916574.2043050383.1684286640-1062417632.1681766747) file from [Kria Ubuntu download site](https://ubuntu.com/download/amd-xilinx), un-compress it, and copy ```image.fit``` file into partition 1 for DOMU later. This file is not being used in XEN booting, but we use SD partition 1 as a place to transfer the file onto target.

### Partition 2

Partition 2 was programmed with a PetaLinux rootfs from setting SD card image with a regular (non-XEN) PetaLinux .wic image. This can be re-used for XEN.

### Partition 3

This step needs to be done a Linux host.

Download the Ubuntu rootfs for DomU. Ubuntu image can be downloaded from [Kria Ubuntu download site](https://ubuntu.com/download/amd-xilinx). For this example, we will be using [iot-limerick-kria-classic-desktop-2204-x07-20230302-63-rootfs.ext4.xz](https://people.canonical.com/~platform/images/xilinx/kria-ubuntu-22.04/iot-limerick-kria-classic-desktop-2204-x07-20230302-63-rootfs.ext4.xz?_ga=2.22151480.2043050383.1684286640-1062417632.1681766747) file.

Unzip the downloaded rootfs file to .ext4 using following:

```bash
xz -d iot-kria-classic-desktop-2004-x03-20211110-98-roofts.ext4.xz
```

Plug the SD card into a Linux host machine, in this example we assume the sd card is found in ```/dev/sda``` but you may find it in different file path dependent on your machine. Observe the 2 partitions with ```sudo fdisk -l /dev/sda```, it should look like the following with two partitions:

```bash
Device     Boot   Start      End Sectors Size Id Type
/dev/sda1  *          8  4194311 4194304   2G  c W95 FAT32 (LBA)
/dev/sda2       4194312 12582919 8388608   4G 83 Linux
```

Enter command ```sudo fdisk /dev/sda```, Enter ```n``` to create a new partition. It will ask about partition type, enter ```p```, next it will ask about Partition number, please hit enter or enter the number ```3```. Finally, it will ask for First and Last Sector - hit enter to automatically create partition with all remaining storage on sd card.

Now it should look like this:

```bash
Command (m for help): n
Partition type
p primary (2 primary, 0 extended, 2 free)
e extended (container for logical partitions)
Select (default p): p
Partition number (3,4, default 3): 3
 
First sector (12582920-31116287, default 12584960):
Last sector, +sectors or +size{K,M,G,T,P} (12584960-31116287, default 31116287):
 
Created a new partition 3 of type 'Linux' and of size 8.9 GiB.
```

Next, enter ```w``` to write the partition table and exit.

Next, format the newly created partition to support ext4 rootfs. Use following command to format it to a .ext4 format:

```bash
sudo mkfs.ext4 -L root /dev/sda3
```

```/dev/sda3``` is the path for new partition that we will use for rootfs for DOMU. Run "sudo fdisk -l" again to verify all the partition. It should look similar to what is shown below with 3 partitions:

```
Device     Boot    Start      End  Sectors  Size Id Type
/dev/sda1  *           8  4194311  4194304    2G  c W95 FAT32 (LBA)
/dev/sda2        4194312 12582919  8388608    4G 83 Linux
/dev/sda3       12584960 31116287 18531328  8.9G 83 Linux
```

lastly,  copy Ubuntu rootfs that we download and extracted earlier to partition ```/dev/sda3```:

```bash
sudo dd if=iot-kria-classic-desktop-2004-x03-20211110-98-roofts.ext4  of=/dev/sda3
```

Now partition 3 is ready as well.

## Boot XEN On Target

Plug the SD card into Starter Kit and turn on the power. You should automatically get to u-boot command prompt. Enter this to load xen_boot_sd.scr to 0xc00000 and source the script to boot xen:

For KV260, SD card is on mmc, therefore use the following commands to boot:

```bash
load mmc 1:1 0xc00000 xen_boot_sd.scr #KV260 only!
source 0xc00000
```

for KR260, SD Card is on USB, therefore use the following commands to boot:

``` bash
load usb 0 0xc00000 xen_boot_sd.scr #KR260 only!
source 0xc00000
```

This will boot PetaLinux XEN/DOM0.

### Boot UBuntu as DOMU

First, change to root:

```bash
sudo -s
```

Locate ```image.fit``` file, it should be in ```/run/media/boot-mmcblk1p1/image.fit``` for 2023.1 KV260 and ```/run/media/boot-sda1/image.fit``` for 2023.1 KR260. If its not there, one can search for it using ```find / -iname "image.fit"```.

extract the Ubuntu kernel image:

```bash
dumpimage -T flat_dt -p 0 /run/media/boot-mmcblk1p1/image.fit -o /home/petalinux/ubuntu_Image # for KV260
dumpimage -T flat_dt -p 0 /run/media/boot-sda1/image.fit -o /home/petalinux/ubuntu_Image # for KR260
```

Next, check how much memory is dom0 consuming and available memory using ```xl info```. In our example we should have a little more than 1.9G left to use for DOMU and therefore we will allocate 1900MB for DOMU in next step.

Create a ```guest0.cfg``` file with the following content:

If runnign Xen on KV260:

```bash
name = "guest0"
kernel = "/home/petalinux/ubuntu_Image" # Ubuntu Kernel extracted
disk = ['/dev/mmcblk1p3,,xvda'] # Ubuntu Rootfs in partition 3
extra = "console=hvc0 root=/dev/xvda"
memory = 1900 # This can be increased if there is more free memory.
vcpus = 2
```

If runnign Xen on KR260:

```bash
name = "guest0"
kernel = "/home/petalinux/ubuntu_Image" # Ubuntu Kernel extracted
disk = ['/dev/sda3,,xvda'] # Ubuntu Rootfs in partition 3
extra = "console=hvc0 root=/dev/xvda"
memory = 1900 # This can be increased if there is more free memory.
vcpus = 2
```

Next, check if /dev/mmcblk1p3 or /dev/sda3 is mounted automatically by dom0 using ```df -h```, if its mounted, unmount it so that DOMU can use it:

```bash
umount /dev/mmcblk1p3 # KV260 only
umount /dev/sda3 # KR260 only
```

Start guest0/DOMU using:

```bash
xl create -c guest0.cfg
```

This will boot to ```root@ubuntu```.

To get out of DOMU, press ```ctrl-]```.

Enter ```xl list``` to see a list of OSes running, you should see something like this:

``` bash
xilinx-kv260-starterkit-20231:/home/petalinux# xl list
Name                                        ID   Mem VCPUs      State   Time(s)
Domain-0                                     0  2048     1     r-----   17916.8
guest0                                       1  1899     2     r-----   28894.7
```

To access the guest0 DOMU again, do ```xl console <ID>```

To kill the guest0 DOMU, identify the <ID> from the prints, and then execute ```xl destroy <ID>``` to kill the session.

Another DOMU session can be started without having to re-boot XEN.

## License

Licensed under the Apache License, Version 2.0 (the "License"); you may not use this file except in compliance with the License.

You may obtain a copy of the License at
[http://www.apache.org/licenses/LICENSE-2.0](http://www.apache.org/licenses/LICENSE-2.0)

Unless required by applicable law or agreed to in writing, software distributed under the License is distributed on an "AS IS" BASIS, WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied. See the License for the specific language governing permissions and limitations under the License.

<p align="center">Copyright&copy; 2021 Xilinx</p>