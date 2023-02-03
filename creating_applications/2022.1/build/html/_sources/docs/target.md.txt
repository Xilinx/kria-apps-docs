# On-target Utilities and Firmware

After generating the PL design, developers will need to move the required files to target platform. Developers can either scp or ftp the required files to SOM, or load them into SD cards and find them in /boot/. Below file structures are some of the files on target developers may need to touch to test and deploy their applications.

``` text
|-- etc           
|   |-- dfx-mgrd                     dfx-manager daemon configuration files, including daemon.config
|   |   |-- daemon.config            Configuration file to indicate locations of firmware for dfx-mgr
|   |-- vart.conf                    Vitis AI configuration file links 
|-- lib                              Libraries
|   |-- firmware                     Misc firmware
|   |   |-- xilinx                   Location to put user application accelerator firmware
|   |   |-- <other>                  User defined location to put user application accelerator firmware, need to modify daemon.config to include new location
|   |-- modules                      Contains loadable kernel modules(.ko files) for drivers
|-- opt
|   |-- xilinx                       Folder only exist after a dnf install of a package
|   |   |-- bin                      Application specific binaries
|   |   |-- lib                      Libraries for applications
|   |   |-- share
|   |   |   |-- ivas                 IVAS.json files for applications
|   |   |   |-- notebooks            Notebooks for applications
|   |   |   |-- vitis_ai_library     VAI model files for applications
```

The SOM Starter Kit Linux includes a set of utilities to help manage dynamic deployment, loading, and configuration of accelerated applications. The xmutil application is a front-end wrapper that provides a common user experience for interacting with different platforms. The dfx-mgr utility is called by xmutil, or can be called directly for identifying, loading, and unloading multiple PL application bitstreams on target.

## xmutil

[xmutil](https://github.com/Xilinx/xmutil) is a Python-based utility wrapper that provides a front-end to other standard Linux utilities (e.g., dnf) or Xilinx platform specific sub-utilities (e.g., platform stats). In the context of dynamic deployment xmutil provides the functionality to read the package feeds defined by the on-target \*.repo file and down select the package-groups based on the hardware platform name read from the SOM and carrier card (CC) EEPROM contents. For example, when calling xmutil getpkgs on the KV260 starter kit, the utility will query the package feed and then only present to you the package-groups that include the string kv260 in them. This is intended to help you quickly identify the accelerated applications related packages for your platform. You can also use standard dnf calls to interact with the package-feed.

## dfx-mgr

The [dfx-mgr](https://github.com/Xilinx/dfx-mgr) is a Xilinx library that implements an on-target daemon for managing a data model of on-target applications, active PL configuration, and loading/unloading the corresponding bitstreams. The dfx-mgr daemon(dfx-mgrd) maintains a data model of relevant application bitstreams, bitstream types, and active bitstream. The xmutil application is calling dfx-mgr when making the calls loadapp, unloadapp, and listapps. dfx-mgr is capable of supporting flat and hierarchical (DFX) PL designs.

The dfx-mgr requires that the application bitstreams be loaded in /lib/firmware/<company_name>/<app_name>. Up until 2021.2, xilinx is the only folder supported. In 2022.1 and later, other folders are supported as long as they have been added in daemon.config. For latest details, visit its [github](https://github.com/Xilinx/dfx-mgr) page.

The dfx-mgr uses i-notify to identify when new applications are brought into the system, and requires that the files required for an application be loading in the same <app_name>. The app_name directory must contain:

* Application bitstream converted to *.bit.bin format
* Application bitstream device tree overlay *.dtbo
* If its a Vitis based PL design using XRT - metadata file in .xclbin format
* shell.json with metadata about the PL design

The .bit.bin, .dtbo and .xclbin are required to have the same file name. etc - example.bit.bin, example.dtbo and example.xclbin

Note that in 21.1, dfx-mgt expects a .bit.bin format bitstream. .bit.bin is .bit files with the description header trimmed. To convert a .bit file to .bit.bin, use bitgen as below:

``` shell
echo 'all:{system.bit}'>bootgen.bif
bootgen -w -arch zynqmp -process_bitstream bin -image bootgen.bif
```

Example files for dfx-mgr can be found in [github](https://github.com/Xilinx/kria-apps-firmware).

### shell.json file

The shell.json file is a metadata file for dfx-mgr. Current implementation (2021.1) only recognizes XRT_FLAT but it is being expanded to support: XRT_FLAT, XRT_DFX, PL_FLAT, PL_DFX, and AIE types in future release. For now, use XRT_FLAT. The shell.json only needs following content:

``` text
{
    "shell_type" : "XRT_FLAT",
    "num_slots" : "1"
}
```

### Debugging with dfx-mgr

As of 2022.1, dfx-mgr do not yet output debug message with a flag for verbose mode. To see debug messages from dfx-mgr, stop the current dfx-mgr process and restart it manually:

```shell
sudo systemctl stop dfx-mgr.service
sudo /usr/bin/dfx-mgrd &
```

## resize-part

By default, Linux's file system partition is not  expanded to expose full SD card space. This is because for now, the rootfs is common across multiple platforms, and cannot assume that all rootfs partition is the last partition in the system. [Resize-part]( https://github.com/Xilinx/meta-petalinux/tree/master/recipes-apps/resize-part) is a script baked into provided BSP that expand the partition to its full capacity:

First, run fdisk to see size of partitions:

``` shell
sudo fdisk -l
```

It will show 4GB for the Linux partition for KV260 in mmcblk1 p2:

``` shell
Device         Boot   Start      End Sectors Size Id Type
/dev/mmcblk1p1 *          8  4194311 4194304   2G  c W95 FAT32 (LBA)
/dev/mmcblk1p2      4194312 12582919 8388608   4G 83 Linux
```

It will show 4GB for the Linux partition for KR260 in sda 2:

``` shell
Device         Boot   Start      End Sectors Size Id Type
/dev/sda1  *          8  4194311 4194304   2G  c W95 FAT32 (LBA)
/dev/sda2       4194312 12582919 8388608   4G 83 Linux
```

Then run the utility:

* in 21.1, use below for KV260:

    ``` shell
    sudo resize-part /dev/mmcblk1p2
    ```

* in 22.1:
  * use below for KV260:

    ``` shell
    sudo resize-part "/dev/mmcblk1" "p2"
    ```

  * use below for KR260:

    ``` shell
    sudo resize-part "/dev/sda" "2"
    ```

To verify, run fdisk again to see updated size of partitions:

```shell
sudo fdisk -l
```

In this example, it will show expanded 12.4GB for the Linux partition:

```shell
Device         Boot   Start      End  Sectors  Size Id Type
/dev/mmcblk1p1 *          8  4194311  4194304    2G  c W95 FAT32 (LBA)
/dev/mmcblk1p2      4194312 30244863 26050552 12.4G 83 Linux
```

## License

Licensed under the Apache License, Version 2.0 (the "License"); you may not use this file except in compliance with the License.

You may obtain a copy of the License at
[http://www.apache.org/licenses/LICENSE-2.0](http://www.apache.org/licenses/LICENSE-2.0)

Unless required by applicable law or agreed to in writing, software distributed under the License is distributed on an "AS IS" BASIS, WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied. See the License for the specific language governing permissions and limitations under the License.

<p align="center">Copyright&copy; 2021 Xilinx</p>
