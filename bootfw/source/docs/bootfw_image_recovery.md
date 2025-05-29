# Boot Image Recovery Tool

## Introduction

The Kria Starter Kit solution stack includes an Ethernet based recovery tool called Boot Image Recovery Tool that can be used in conjunction with a standard web-browser on a host PC to provide direct update of the Kria user A/B boot firmware partitions and the corresponding persistent register information. The recovery tool is maintained in a reserved section of the QSPI memory and is intended as a platform recovery mechanism if there is an issue with the normal A/B boot FW update mechanism.  

Boot Image Recovery Tool is an application that runs a simplified Ethernet stack for interacting with your host machine (for example, laptop) to allow a manual update/overwrite of Image A and Image B on QSPI on SOM.  The recovery tool updates the corresponding A/B persistent registers to an appropriate state based on the user actions in the web UI. You can also override the QSPI persistent register states via the WebUI.

The Boot Image Recovery Tool requires no incremental tools on the customer PC besides a web-browser with a fixed IP address of 192.168.0.111. The user PC must have access to the new firmware binary file (BOOT.BIN). AMD distributes boot FW and “factory boot file” updates to the Kria Wiki. The Boot Image Recovery Tool writes the a given `BOOT.BIN` to QSPI physical address based on the image target selection made in the web UI.

The Boot Image Recovery Tool can read the sideband control EEPROMs to verify the make and model of the Kria target. The Boot Image Recovery Tool is initiated by holding the FWUEN button during power-on/reset or if both Image A and Image B becomes unbootable.

Because both Boot Image Recovery Tool and Image Update can update the Image A/B persistent register, this table explains their differences.

|                              | Boot Image Recovery Tool           | Image Update Utility                                 |
|------------------------------|------------------------------------|------------------------------------------------------|
| Updates Image A/B?           | Y                                  | Y                                                    |
| Updates Persistent Register? | Y                                  | Y                                                    |
| Reflash QSPI?                | N                                  | N                                                    |
| Launched by FWUpdate Button  | Y                                  | N                                                    |
| SW stack                     | A baremetal application            | A Linux application that  runs under xmutil FWUpdate |
| Usage                        | Used when board is in  a bad state | Used when board is in  functional state              |

## Boot Image Recovery Tool Compilation Procedure (Makefile Flow)

Note that the Makefile below requires tools that are placed in the path by sourcing PetaLinux, Vitis, or the Vivado settings64.* file.

Open a linux terminal

```shell
git clone --branch xlnx_rel_v<version> https://github.com/Xilinx/embeddedsw.git
cd embeddedsw/lib/sw_apps/img_rcvry/src
make clean all
```

Source code for Boot Image Recovery Tool is found on [GitHub](https://github.com/Xilinx/embeddedsw/tree/master/lib/sw_apps/img_rcvry/src).

<hr class="sphinxhide"></hr>

<p class="sphinxhide" align="center"><sub>Copyright © 2023-2025 Advanced Micro Devices, Inc.</sub></p>

<p class="sphinxhide" align="center"><sup><a href="https://www.amd.com/en/corporate/copyright">Terms and Conditions</a></sup></p>