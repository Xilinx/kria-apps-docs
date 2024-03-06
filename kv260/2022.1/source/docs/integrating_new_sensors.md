<table class="sphinxhide">
 <tr>
   <td align="center"><img src="media/xilinx-logo.png" width="30%"/><h1>Kria&trade; Booting the Kria Starter Kit Linux</h1>
   </td>
 </tr>
</table>

# Integrating new Sensor Cameras

## Support for new sensors on J7

The KV260 example applications currently support for two onsemi camera sensors - AR1335 and AR0144 connected via J7 IAS connector. This connector links to a dedicated onsemi 13 MP AP1302 Image Sensor Processor (ISP). To integrate a new onsemi sensor for use with J7, obtain the required firmware blob via [onsemi sales support](https://www.onsemi.com/support/sales). Place the new firmware blob alongside  ```/usr/lib/firmware/ap1302_ar1335_single_fw.bin``` and ```/usr/lib/firmware/ap1302_ar0144_single_fw.bin``` in ```/usr/lib/firmware/``` on the target device.

## Support for new sensors on J8

J8 also features an IAS connector but lacks a dedicated ISP. Integration via this path requires different drivers. KV260 currently supports the AR1335 sensor on J8, with driver modules located at:

```
/usr/src/linux-headers-5.15.0-1025-xilinx-zynqmp/include/config/VIDEO_AR1335
/usr/lib/modules/5.15.0-1025-xilinx-zynqmp/kernel/drivers/media/i2c/ar1335.ko
```

To bring support of new sensors on J8, contact [onsemi sales support](https://www.onsemi.com/support/sales) for details.



## License

Licensed under the Apache License, Version 2.0 (the "License"); you may not use this file except in compliance with the License.

You may obtain a copy of the License at
[http://www.apache.org/licenses/LICENSE-2.0](http://www.apache.org/licenses/LICENSE-2.0).

Unless required by applicable law or agreed to in writing, software distributed under the License is distributed on an "AS IS" BASIS, WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied. See the License for the specific language governing permissions and limitations under the License.

<p class="sphinxhide" align="center">Copyright&copy; 2021-2023 Advanced Micro Devices, Inc</p>
