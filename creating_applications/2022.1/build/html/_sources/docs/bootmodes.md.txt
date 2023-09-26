# Setting Bootmodes

Once applications and custom HW designs are generated, developers need to move them to target. If using the Kria Starter Kit, developers can use various boot-modes to test monolithic boot to application software using the following TCL scripts to set the preferred development boot process. Developers will first put the functions in a ```<boot>.tcl``` script. Then, with the host machine connected with their SOM kit, they use the following commands in XSDB or XSCT:

```bash
connect
source <boot>.tcl
boot_<mode>
```

To set K26 to JTAG bootmode using XSDB/XSCT, add the following TCL scripts and call the function:

```bash
proc boot_jtag { } {
############################
# Switch to JTAG boot mode #
############################
targets -set -filter {name =~ "PSU"}
# update multiboot to ZERO
mwr 0xffca0010 0x0
# change boot mode to JTAG
mwr 0xff5e0200 0x0100
# reset
rst -system
}
```

To set K26 to SD bootmode using XSDB/XSCT, add the following TCL scripts and call the function:

```bash
proc boot_sd { } {
############################
# Switch to SD boot mode #
############################
targets -set -filter {name =~ "PSU"}
# update multiboot to ZERO
mwr 0xffca0010 0x0
# change boot mode to SD
mwr 0xff5e0200 0xE100
# reset
rst -system
#A53 may be held in reset catch, start it with "con"
after 2000
con
}
```

To set K26 to QSPI bootmode using XSDB/XSCT, add the following TCL scripts and call the function:

```bash
proc boot_qspi { } {
############################
# Switch to QSPI boot mode #
############################
targets -set -filter {name =~ "PSU"}
# update multiboot to ZERO
mwr 0xffca0010 0x0
# change boot mode to QSPI
mwr 0xff5e0200 0x2100
# reset
rst -system
#A53 may be held in reset catch, start it with "con"
after 2000
con
}
```

To set K26 to eMMC bootmode using XSDB/XSCT, add the following TCL scripts and call the function:

```bash
proc boot_emmc { } {
############################
# Switch to emmc boot mode #
############################
targets -set -nocase -filter {name =~ "PSU"}
stop
# update multiboot to ZERO
mwr 0xffca0010 0x0
# change boot mode to EMMC
mwr 0xff5e0200 0x6100
# reset
rst -system
#A53 may be held in reset catch, start it with "con"
after 2000
con
} 
```

To set K26 to USB bootmode using XSDB/XSCT, add the following TCL scripts and call the function:

```bash
proc boot_usb { } {
############################
# Switch to usb0 boot mode #
############################
targets -set -nocase -filter {name =~ "PSU"}
stop
# update multiboot to ZERO
mwr 0xffca0010 0x0
# change boot mode to EMMC
mwr 0xff5e0200 0x7100
# reset
rst -system
#A53 may be held in reset catch, start it with "con"
after 2000
con
} 
```

## License

Licensed under the Apache License, Version 2.0 (the "License"); you may not use this file except in compliance with the License.

You may obtain a copy of the License at
[http://www.apache.org/licenses/LICENSE-2.0](http://www.apache.org/licenses/LICENSE-2.0)

Unless required by applicable law or agreed to in writing, software distributed under the License is distributed on an "AS IS" BASIS, WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied. See the License for the specific language governing permissions and limitations under the License.

<p class="sphinxhide" align="center">Copyright&copy; 2023 Advanced Micro Devices, Inc</p>