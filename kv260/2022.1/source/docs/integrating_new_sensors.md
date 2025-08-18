<table class="sphinxhide">
 <tr>
   <td align="center"><img src="media/xilinx-logo.png" width="30%"/><h1>Kria&trade; Booting the Kria Starter Kit Linux</h1>
   </td>
 </tr>
</table>

# Integrating New IAS Sensor Modules

## Support for new sensors on KV260 J7

KV260 J7 is an IAS connector connected to a dedicated onsemi AP1302 Image Sensor Processor (ISP). Each sensor module (e.g. AR1335) requires its own firmware blob on target.

The KV260 example applications currently support two onsemi camera sensors on J7 IAS connector - AR1335 or AR0144 depending on the example application. If integrating a new onsemi sensor for use with the AP1302 ISP, obtain the required firmware blob via [onsemi sales support](https://www.onsemi.com/support/sales). The AP1302 Linux driver will load the new firmware blob from ```/usr/lib/firmware/``` on the target device.

## Support for new sensors on KV260 J8

KV260 J8 is an IAS connector interfaced directly to the FPGA. Integration of new sensor modules via this path requires a supporting PL implementation.

To bring support for new sensors on J8, contact [onsemi sales support](https://www.onsemi.com/support/sales) for details.

An example application featuring a direct sensor module interface (J8) with a custom PL implementation can be found [here](https://xfuse.ai/phoenix-isp-for-kria-som-3/).


<p class="sphinxhide" align="center"><sub>Copyright © 2021-2024 Advanced Micro Devices, Inc</sub></p>

<p class="sphinxhide" align="center"><sup><a href="https://www.amd.com/en/corporate/copyright">Terms and Conditions</a></sup></p>
