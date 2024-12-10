# Step 4: Firmware Update

The SOM Starter Kits have factory preprogrammed boot firmware that is installed and maintained in the SOM QSPI device. To enable complete board functionality, compatibility with the latest operating systems, and best performance, be sure to install the latest AMD-provided boot firmware following the firmware update instructions available on the [Kria Wiki](https://xilinx-wiki.atlassian.net/wiki/spaces/A/pages/3020685316/Kria+SOM+Boot+Firmware+Update).

For compatibility with Ubuntu 24.04, download the latest bootfw from [K26 Firmware Updates table](https://xilinx-wiki.atlassian.net/wiki/spaces/A/pages/3020685316/Kria+SOM+Boot+Firmware+Update#K26-Boot-Firmware-Updates) and follow [instructions](https://xilinx-wiki.atlassian.net/wiki/spaces/A/pages/3020685316/Kria+SOM+Boot+Firmware+Update#Boot-FW-Update-Process) to update firmware.

If Linux boots without this step (this would be the case majority of the time), you can boot Linux first (using instructions in [step 5: Boot Linux](./boot.md)) and then use xmutil utility to update boot firmware. If Linux does not boot without this step, you can use Boot Image Recovery Tool to update boot firmware.

The QSPI boot firmware image update persists through power cycles or SD card changes.

## Next Step

Jump to [Step 5: Boot Linux](./boot.md).


<p class="sphinxhide" align="center">Copyright&copy; 2023 Advanced Micro Devices, Inc</p>
