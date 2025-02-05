# Step 1: Set up the SD Card Image

The Starter Kit has a primary and secondary boot device, isolating the boot firmware from the run-time OS and application. This allows you to focus on developing and updating your application code within the application image on the secondary boot device, without having to develop the boot firmware. The primary boot device is a QSPI memory located on the SOM, which is pre-programmed (pre-loaded QSPI image) at the factory.  The secondary boot device is a microSD card interface on the carrier card.

For setting up the microSD card, you’ll need to download the latest SD card image and then write it using an Image Flashing tool.

1. Download the [Kria PetaLinux Starter Kit Linux pre-built SD card image](https://xilinx-wiki.atlassian.net/wiki/spaces/A/pages/1641152513/Kria+SOMs+Starter+Kits#K26-PetaLinux)  and save it on your computer. Note that there were three releases, 2021.1 is the latest release with the most examples supported. 2022.1 does not support any AMD released example applications. Choose the appropriate image based on the applications (and their version) targeted. Refer back to [Linux boot landing page](https://pages.gitenterprise.xilinx.com/techdocs/SOM/kv260/linux_boot.html) for compatible applications for each Linux version.
2. Download the [Raspberry Pi Imager](https://www.raspberrypi.com/software/)  (recommended; available for Window, Linux, and macOS). Find additional OS specific tool options below.
3. Follow the instructions in the tool and select the downloaded image to flash onto your microSD card.

Once your microSD card is flashed with the image, proceed to the next step.

## Next Step

Jump to [Step 2: Connect Everything](./connections.md).

<p class="sphinxhide" align="center">Copyright&copy; 2023 Advanced Micro Devices, Inc</p>
