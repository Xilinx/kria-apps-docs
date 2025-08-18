# Setting Boot-modes

When the applications and custom hardware designs are generated, you need to move them to target. If using the AMD Kria&trade; Starter Kit, you can use various boot-modes to test the monolithic boot to the application software using the following Tcl scripts to set the preferred development boot process. You first put the functions in a `<boot>.tcl` script. Then, with the host machine connected with your SOM kit, use the following commands in XSDB or XSCT:

```bash
connect
source <boot>.tcl
boot_<mode>
```

To set K26 to the JTAG boot-mode using XSDB/XSCT, add the following Tcl scripts, and call the function:

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

To set K26 to the SD boot-mode using XSDB/XSCT, add the following Tcl scripts, and call the function:

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

To set K26 to QSPI boot-mode using XSDB/XSCT, add the following Tcl scripts, and call the function:

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

To set K26 to the eMMC boot-mode using XSDB/XSCT, add the following Tcl scripts, and call the function:

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

To set K26 to the USB boot-mode using XSDB/XSCT, add the following Tcl scripts, and call the function:

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

<hr class="sphinxhide"></hr>

<p class="sphinxhide" align="center"><sub>Copyright © 2023-2025 Advanced Micro Devices, Inc.</sub></p>

<p class="sphinxhide" align="center"><sup><a href="https://www.amd.com/en/corporate/copyright">Terms and Conditions</a></sup></p>