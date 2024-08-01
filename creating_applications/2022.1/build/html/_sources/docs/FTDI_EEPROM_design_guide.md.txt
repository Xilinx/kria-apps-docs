# Kria SOM CC FTDI Design Guide

AMD designed carrier cards for Kria SOM use a FTDI chip for their USB-JTAG / UART implementation. The carrier card contains a dedicated EEPROM used by the FTDI chip to load its configuration at power-on.

The schematics for each of the AMD carrier cards can be found on their resources tab: [KV260](https://www.amd.com/en/products/system-on-modules/kria/k26/k26c-commercial.html#documentation), [KR260](https://www.amd.com/en/products/system-on-modules/kria/k26/kr260-robotics-starter-kit.html#documentation). [KD240](https://www.amd.com/en/products/system-on-modules/kria/k24/kd240-drives-starter-kit.html#documentation). A "FTDI JTAG/UART" or similiar section in the schematic will detail the FTDI device and its EEPROM implementation on the carrier card. 

The FTDI EEPROM user area guide can be found in [FT_000162](https://www.ftdichip.com/Documents/AppNotes/AN_121_FTDI_Device_EEPROM_User_Area_Usage.pdf). The FDTI EEPROM can be programmed such that Vivado hardware manager can recognize the board as a device. Refer to [UG908](https://docs.xilinx.com/r/en-US/ug908-vivado-programming-debugging/Programming-FTDI-Devices-for-Vivado-Hardware-Manager-Support) for more information.

## Example Script

We have provided an example FDTI programming script that programs the FTDI EEPROM chip on AMD Kria SOM Starter Kits. Download the scripts [ftdieeprom.tcl](../docs/ftdi_eeprom_example/ftdieeprom.tcl) and [ftd2xx.tcl](../docs/ftdi_eeprom_example/ftd2xx.tcl). Place them in the same folder on your PC. The PC should have an Vivado installation as that provides utilities required in the script.

In XSDB, cd to the folder containing the script:

```bash
source ftdieeprom.tcl
device_list
program_eeprom <Location> <boards> <SerialNumber>

#<Location> is the "Location" printed from the device_list command
#<boards> is from ftdieeprom.tcl list, in this case it can be MLCC, KRCC or KDCC
#<SerialNumber> must be 12 characters
```

After programming, you need to unplug and re-plug the USB cable for the device_list command to show the updated EEPROM reads.

## License

Licensed under the Apache License, Version 2.0 (the "License"); you may not use this file except in compliance with the License.

You may obtain a copy of the License at
[http://www.apache.org/licenses/LICENSE-2.0](http://www.apache.org/licenses/LICENSE-2.0)

Unless required by applicable law or agreed to in writing, software distributed under the License is distributed on an "AS IS" BASIS, WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied. See the License for the specific language governing permissions and limitations under the License.

<p class="sphinxhide" align="center">Copyright&copy; 2023 Advanced Micro Devices, Inc</p>
