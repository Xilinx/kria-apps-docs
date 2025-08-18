<table class="sphinxhide">
 <tr>
   <td align="center"><img src="media/xilinx-logo.png" width="30%"/><h1> Kria&trade; KR260 Robotics Starter Kit Tutorial</h1>
   </td>
 </tr>
 <tr>
 <td align="center"><h1>Generation of Firmware binaries</h1>

 </td>
 </tr>
</table>

# Generation of Firmware binaries

## Testing custom Accelerator/firmware binaries

Customers requiring to test custom hardware/accelerator can do so by following the below steps on the ubuntu platform.

It is assumed that a custom platform design has been generated using an AMD Vivado&trade;/AMD Vitis&trade; and bitstream/xclbin is available. Similarly, a correct device-tree overlay for the custom hardware is created or generated. AMD  DTG could be used for the device-tree generation. Refer to the [link](https://xilinx-wiki.atlassian.net/wiki/spaces/A/pages/18842279/Build+Device+Tree+Blob) for more information on DTG.

From previous steps, following binaries are available:

* custom-hardware.bit     (obtained by Vitis)
* custom-metadata.xclbin  (obtained by Vitis) (optional)
* custom-devicetree.dtsi  (obtained by DTG)

On the ubuntu platform, the bitstream header is stripped to obtain fpga configuration data as a bin object (`*.bin`).
The metadata xclbin is consumed as is from Vitis.
A runtime device-tree blob corresponding to the PL bitstream is required (`.dtbo`) to be loaded as an overlay, which when loaded in kernel, invokes all the drivers corresponding to the PL bitstream.

A makefile is provided to generate the required firmware binaries and install. This makefile takes the above binaries and provides the following outputs as shown below. The artifacts of the makefile are installed on the target device at `/lib/firmware/xilinx/< accelerator-dir >`. The firmware is loaded at runtime using xmutil.

* custom-hardware.bit    -> custom-hardware.bin
* custom-devicetree.dtsi -> custom-devicetree.dtbo

An example has been illustrated below as a reference:

```shell
git clone --branch xlnx_rel_v2022.1 https://github.com/Xilinx/kria-apps-firmware.git
mv custom-hardware.bit kria-apps-firmware/kr260/tsn-rs485pmod/kr260-tsn-rs485pmod.bit
mv custom-device-tree.dtsi kria-apps-firmware/kr260/tsn-rs485pmod/kr260-tsn-rs485pmod.dtsi
cd kria-apps-firmware
make 
```

For more information, refer to the instructions provided in the readme file [here](https://github.com/Xilinx/kria-apps-firmware/blob/xlnx_rel_v2022.1/README.md).



<p class="sphinxhide" align="center">Copyright&copy; 2023-2024 Advanced Micro Devices, Inc.</p>

