# On-target Utilities and Firmware

After generating the PL design, you must move the required files to the target platform, using  scp or ftp (the required files to SOM), or load them into SD cards and find them in `/boot/`.

The SOM Starter Kit Linux includes a set of utilities to help manage dynamic deployment, loading, and configuration of accelerated applications. The xmutil application is a front-end wrapper that provides a common user experience for interacting with different platforms. The dfx-mgr utility is called by xmutil or can be called directly for identifying, loading, and unloading multiple PL application bitstreams on target.

## xmutil

[xmutil](https://github.com/Xilinx/xmutil) is a Python-based utility wrapper that provides a front-end to other standard Linux utilities (for example, dnf) or AMD platform specific sub-utilities (for example, platform stats). In the context of dynamic deployment, xmutil provides the functionality to read the package feeds defined by the on-target \*.repo file and down select the package-groups based on the hardware platform name read from the SOM and carrier card (CC) EEPROM contents. For example, when calling xmutil getpkgs on the KV260 Starter Kit, the utility queries the package feed and then only presents you with the package-groups that include the string, kv260, in them. This is intended to help you quickly identify the accelerated applications related packages for your platform. You can also use standard dnf calls to interact with the package-feed.

## dfx-mgr

The [dfx-mgr](https://github.com/Xilinx/dfx-mgr) is an AMD library that implements an on-target daemon for managing a data model of on-target applications, active PL configuration, and loading/unloading the corresponding bitstreams. The dfx-mgr daemon (dfx-mgrd) maintains a data model of relevant application bitstreams, bitstream types, and active bitstream. The xmutil application calls dfx-mgr when making the calls loadapp, unloadapp, and listapps. dfx-mgr is capable of supporting flat and hierarchical (DFX) PL designs.

The dfx-mgr requires that the application bitstreams be loaded in /`lib/firmware/<company_name>/<app_name>`. Up until 2021.2, `xilinx/` is the only folder supported. In 2022.1 and later, other folders are supported as long as they are added in `daemon.config`. For the latest details, visit its [GitHub](https://github.com/Xilinx/dfx-mgr) page.

The dfx-mgr uses i-notify to identify when new applications are brought into the system and requires that the files required for an application be loading in the same `<app_name>`. The `app_name` directory must contain:

* Application bitstream converted to `*.bit.bin` format
* Application bitstream device tree overlay *.dtbo
* If its a Vitis based PL design using XRT, a metadata file in .xclbin format
* `shell.json` with metadata about the PL design

The `.bit.bin`, .dtbo and .xclbin are required to have the same file name (for example, `example.bit.bin`, `example.dtbo` and e`xample.xclbin`).

>**NOTE:** In 2021.1, dfx-mgt expects a `.bit.bin` format bitstream. `.bit.bin` is .bit files with the description header trimmed. To convert a .bit file to `.bit.bin`, use the following bitgen:
>
>``` shell
>echo 'all:{system.bit}'>bootgen.bif
>bootgen -w -arch zynqmp -process_bitstream bin -image bootgen.bif
>```

Example files for dfx-mgr are found on [GitHub](https://github.com/Xilinx/kria-apps-firmware).

### `shell.json` File

The `shell.json` file is a metadata file for dfx-mgr. The current implementation (2021.1) only recognizes XRT_FLAT, but in future releases, support is expanding to XRT_FLAT, XRT_DFX, PL_FLAT, PL_DFX, and AIE types. For now, use XRT_FLAT. The `shell.json` requires the following content:

``` text
{
    "shell_type" : "XRT_FLAT",
    "num_slots" : "1"
}
```

### Debugging with dfx-mgr

As of 2022.1, dfx-mgr does not yet output a debug message with a flag for verbose mode. To see debug messages from dfx-mgr, stop the current dfx-mgr process and restart it manually:

```shell
sudo systemctl stop dfx-mgr.service
sudo /usr/bin/dfx-mgrd &
```

## resize-part

By default, the Linux file system partition is not expanded to expose the full SD card space. This is because for now, the rootfs is common across multiple platforms and cannot assume that all rootfs partitions are the last partition in the system. [Resize-part]( https://github.com/Xilinx/meta-petalinux/tree/master/recipes-apps/resize-part) is a script baked into the provided BSP that expands the partition to its full capacity:

1. First, run fdisk to see size of partitions:

    ``` shell
    sudo fdisk -l
    ```

    It show 4 GB for the Linux partition for KV260 in mmcblk1 p2:

    ``` shell
    Device         Boot   Start      End Sectors Size Id Type
    /dev/mmcblk1p1 *          8  4194311 4194304   2G  c W95 FAT32 (LBA)
    /dev/mmcblk1p2      4194312 12582919 8388608   4G 83 Linux
    ```

    It shows 4 GB for the Linux partition for KR260/KD240 in sda 2:

    ``` shell
    Device         Boot   Start      End Sectors Size Id Type
    /dev/sda1  *          8  4194311 4194304   2G  c W95 FAT32 (LBA)
    /dev/sda2       4194312 12582919 8388608   4G 83 Linux
    ```

2. Then, run the utility:

    * In 2021.1, use the following for KV260:

        ``` shell
        sudo resize-part /dev/mmcblk1p2
        ```

    * In 2022.1, use the following for KV260:

        ``` shell
        sudo resize-part "/dev/mmcblk1" "p2"
        ```

    * Use the following for KR260/KD240:

        ``` shell
        sudo resize-part "/dev/sda" "2"
        ```

3. To verify, run fdisk again to see the updated size of the partitions:

    ```shell
    sudo fdisk -l
    ```

    In this example, it shows the expanded 12.4 GB for the Linux partition:

    ```shell
    Device         Boot   Start      End  Sectors  Size Id Type
    /dev/mmcblk1p1 *          8  4194311  4194304    2G  c W95 FAT32 (LBA)
    /dev/mmcblk1p2      4194312 30244863 26050552 12.4G 83 Linux
    ```

<hr class="sphinxhide"></hr>

<p class="sphinxhide" align="center"><sub>Copyright © 2023-2025 Advanced Micro Devices, Inc.</sub></p>

<p class="sphinxhide" align="center"><sup><a href="https://www.amd.com/en/corporate/copyright">Terms and Conditions</a></sup></p>