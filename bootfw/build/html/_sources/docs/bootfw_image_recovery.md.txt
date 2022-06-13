# Boot Firmware Image Recovery

## Introduction

The Kria Starter Kit solution stack includes an Ethernet based recovery tool called Image Recovery that can be used in conjunction with a standard web-browser on a Host PC to provide direct update of the Kria user A/B boot firmware partitions and the corresponding persistent register information. The recovery tool is maintained in a reserved section of the QSPI memory and is intended as a platform recovery mechanism is there is an issue with the normal A/B boot FW update mechanism.  

Image Recovery is an application that runs a simplified Ethernet stack for interacting with a user's host machine (e.g. laptop) to allow a manual update/overwrite of Image A and Image B on QSPI on SOM.  The recovery tool updates the corresponding A/B persistent registers to an appropriate state based on the user actions in the web UI. A user can also override the QSPI persistent register states via the WebUI.

The Image Recovery tool requires no incremental tools on the customer PC besides a web-browser with a fixed IP address of 192.168.0.111. The user PC must have access to the new firmware binary file (BOOT.BIN). Xilinx distributes boot FW and “factory boot file” updates to the Kria Wiki. The Image Recovery writes the a given BOOT.BIN to QSPI physical address based on the image target selection made in the web UI.

The Image Recovery tool can read the sideband control EEPROMs to verify the make and model of the Kria target. The Image Recovery application is initiated by holding the FWUEN button during power-on/reset or if both Image A and Image B becomes unbootable.

Because both Image Recovery and Image Update can update Image A/B persistent register, here's a table explaining their differences.

|                              | Image Recovery App                 | Image Update Utility                                 |
|------------------------------|------------------------------------|------------------------------------------------------|
| Updates Image A/B?           | Y                                  | Y                                                    |
| Updates Persistent Register? | Y                                  | Y                                                    |
| Reflash QSPI?                | N                                  | N                                                    |
| Launched by FWUpdate Button  | Y                                  | N                                                    |
| SW stack                     | A baremetal application            | A Linux application that  runs under xmutil FWUpdate |
| Usage                        | Used when board is in  a bad state | Used when board is in  functional state              |

## Image Recovery Compilation Procedure (Makefile Flow)

Note that the Makefile below requires tools that are placed in the path by sourcing PetaLinux, or Vitis, or Vivado settings64.* file.

Open a linux terminal

``` shell
git clone https://github.com/Xilinx/embeddedsw.git
cd embeddedsw/lib/sw_apps/img_rcvry/src
make clean all
```

Source code for Image Recovery can be browsed at [github](https://github.com/Xilinx/embeddedsw/tree/master/lib/sw_apps/img_rcvry/src).

### License

Licensed under the Apache License, Version 2.0 (the "License"); you may not use this file except in compliance with the License.

You may obtain a copy of the License at
[http://www.apache.org/licenses/LICENSE-2.0](http://www.apache.org/licenses/LICENSE-2.0)

Unless required by applicable law or agreed to in writing, software distributed under the License is distributed on an "AS IS" BASIS, WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied. See the License for the specific language governing permissions and limitations under the License.

<p align="center">Copyright&copy; 2021 Xilinx</p>
