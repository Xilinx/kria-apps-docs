# Kria SOM CC FTDI Design Guide

AMD designed Kria SOM carrier cards use a FTDI chip for their USB-JTAG/UART implementation. The carrier card contains a dedicated EEPROM used by the FTDI chip to load its configuration at power-on.

The schematics for each of the AMD carrier cards can be found on their resources tab: [KV260](https://www.amd.com/en/products/system-on-modules/kria/k26/k26c-commercial.html#documentation), [KR260](https://www.amd.com/en/products/system-on-modules/kria/k26/kr260-robotics-starter-kit.html#documentation), and [KD240](https://www.amd.com/en/products/system-on-modules/kria/k24/kd240-drives-starter-kit.html#documentation). A "FTDI JTAG/UART" or similar section in the schematic details the FTDI device and its EEPROM implementation on the carrier card.

The FTDI EEPROM user area guide can be found in [FT_000162](https://www.ftdichip.com/Documents/AppNotes/AN_121_FTDI_Device_EEPROM_User_Area_Usage.pdf). The FDTI EEPROM can be programmed such that Vivado hardware manager can recognize the board as a device by using program_ftdi utility in XSDB. For more information, refer to the *Vivado Design Suite User Guide: Programming and Debugging* ([UG908](https://docs.amd.com/go/en-US/ug908-vivado-programming-debugging/Programming-FTDI-Devices-for-Vivado-Hardware-Manager-Support)).

## Example Script

An example FDTI programming script is provided that programs the FTDI EEPROM chip on AMD Kria SOM Starter Kits. Download the scripts [ftdieeprom.tcl](../docs/ftdi_eeprom_example/ftdieeprom.tcl) and [ftd2xx.tcl](../docs/ftdi_eeprom_example/ftd2xx.tcl). Place them in the same folder on your PC. The PC should have an Vivado installation (Vivado_lab and HW_server are okay as well) as that provides utilities (XSDB) required in the script. Update the VNAME in `ftdieeprom.tcl` to the appropriate board vendor name (maker for the custom carrier card). Manufacturer name has to be "Xilinx" for AMD tool chain to detect the board.

In XSDB, change directory to the folder containing the script:

```bash
source ftdieeprom.tcl
device_list
program_eeprom <Location> <boards> <SerialNumber>

#<Location> is the "Location" printed from the device_list command
#<boards> is from ftdieeprom.tcl list, in this case it can be MLCC, KRCC or KDCC
#<SerialNumber> must be 12 characters
```

After programming, you need to unplug and replug the USB cable for the `device_list` command to show the updated EEPROM reads.

## Known Issues

1. [Libraries are missing in 2024.1 xsdb](https://adaptivesupport.amd.com/s/article/000036977?language=en_US) for programming either using program_ftdi or the example script. Use other versions of the tool (that is, 2023.2, 2024.2, or others)
2. Currently, Linux's hw_server does not recognize the Zynq MPSoC device if the FTDI programs a different manufacturer name than "Xilinx" in FTDI EEPROM; Linux does not see any target from XSDB. Windows's hw_server/xsdb does not have this issue. Until this is fixed, use Windows to access the FPGA in XSDB.

<hr class="sphinxhide"></hr>

<p class="sphinxhide" align="center"><sub>Copyright © 2023-2025 Advanced Micro Devices, Inc.</sub></p>

<p class="sphinxhide" align="center"><sup><a href="https://www.amd.com/en/corporate/copyright">Terms and Conditions</a></sup></p>