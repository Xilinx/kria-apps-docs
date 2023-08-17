<table class="sphinxhide">
 <tr>
   <td align="center"><img src="media/xilinx-logo.png" width="30%"/><h1> Kria&trade; KV260 Vision AI Starter Kit Tutorial</h1>
   </td>
 </tr>
 <tr>
 <td align="center"><h1>Generation of Firmware Binaries</h1>

 </td>
 </tr>
</table>

# Generation of Firmware Binaries

## Testing Custom Accelerator/Firmware Binaries

Customers required to test custom hardware/accelerator can do so by using the following steps on the Ubuntu&reg; platform.

It is assumed that a custom platform design has been generated using AMD
Vivado&trade;/Vitis&trade;, and the bitstream/xclbin is available. Similarly, a correct device-tree overlay for the custom hardware is created or generated; the AMD DTG could be used for device-tree generation. Refer to the [link](https://xilinx-wiki.atlassian.net/wiki/spaces/A/pages/18842279/Build+Device+Tree+Blob) for more info on DTG.

From previous steps, the following binaries are available:

* custom-hardware.bit     (obtained by Vivado or Vitis)
* custom-metadata.xclbin  (obtained by Vitis) (optional)
* custom-devicetree.dtsi  (obtained by DTG or handwritten)

On the Ubuntu platform, the bitstream header is stripped to obtain the FPGA configuration data as a bin object (*.bin). The metadata xclbin is consumed as is from Vitis. A runtime devicetree blob corresponding to the programmable (PL) bitstream is required (.dtbo) to be loaded as an overlay, which when loaded in kernel, invokes all the drivers corresponding to the PL bitstream.

A makefile is provided to generate the required firmware binaries and install.
This makefile takes the above binaries and provides the following outputs. The artifacts of the makefile are installed on the target device at `/lib/firmware/xilinx/< accelerator-dir`. The firmware is loaded at runtime using xmutil.

* custom-hardware.bit    -> custom-hardware.bin
* custom-devicetree.dtsi -> custom-devicetree.dtbo

The following example is illustrated for reference:

```shell
git clone --branch xlnx_rel_v2022.1 https://github.com/Xilinx/kria-apps-firmware.git
cd kria-apps-firmware
mkdir -p kv260/custom
mv custom-hardware.bit custom-metadata.xclbin custom-devicetree.dtsi kv260/custom
cp kv260/smartcam/shell.json kv260/custom
make
```

>**NOTE:** The above make command will build all the firmware artifacts available in the repository. The output products will be available in the `kv260/custom` folder. The `shell.json` file is copied form an existing example as is.

For more information, refer to the instructions provided in the README file [here](https://github.com/Xilinx/kria-apps-firmware/blob/xlnx_rel_v2022.1/README.md).

## Next Steps

* Go back to the [KV260 SOM Designs Start Page](../index)

<p class="sphinxhide" align="center">Copyright&copy; 2022-2023 Advanced Micro Devices, Inc</p>

<!---

Licensed under the Apache License, Version 2.0 (the "License"); you may not use this file except in compliance with the License.

You may obtain a copy of the License at http://www.apache.org/licenses/LICENSE-2.0.

Unless required by applicable law or agreed to in writing, software distributed under the License is distributed on an "AS IS" BASIS, WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied. See the License for the specific language governing permissions and limitations under the License.

-->
