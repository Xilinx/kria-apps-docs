# Step 1: Set up the SD Card Image

The Starter Kit has a primary and secondary boot device, isolating the boot firmware from the run-time OS and application. This allows you to focus on developing and updating your application code within the application image on the secondary boot device, without having to develop the boot firmware. The primary boot device is a QSPI memory located on the SOM, which is pre-programmed (pre-loaded QSPI image) at the factory.  The secondary boot device is a microSD card interface on the carrier card.

For setting up the microSD card, you’ll need to download the latest SD card image and then write it using an Image Flashing tool.

1. Download the [Kria PetaLinux Starter Kit Linux pre-built SD card image](https://xilinx-wiki.atlassian.net/wiki/spaces/A/pages/1641152513/Kria+SOMs+Starter+Kits#K26-PetaLinux)  and save it on your computer. Note that there were three releases, 2021.1 is the latest release with the most examples supported. 2022.1 does not support any AMD released example applications. Choose the appropriate image based on the applications (and their version) targeted. Refer back to [Linux boot landing page](https://pages.gitenterprise.xilinx.com/techdocs/SOM/kv260/linux_boot.html) for compatible applications for each Linux version.
2. Download the [Raspberry Pi Imager](https://www.raspberrypi.com/software/)  (recommended; available for Window, Linux, and macOS). Find additional OS specific tool options below.
3. Follow the instructions in the tool and select the downloaded image to flash onto your microSD card.

Once your microSD card is flashed with the image, proceed to the next step.

<details>
<summary>Instructions for Raspberry Pi Imager  (any OS)</summary>

For any OS users, visit the page below for instructions to copy the image to the SD card:

https://documentation.ubuntu.com/core/how-to-guides/deploy-an-image/install-on-amd/#write-the-ubuntu-core-image-to-the-microsd-card 

</details>

<details>
<summary>Instructions for Win32 Disk Imager tool (Windows only)</summary>

For Windows users, you can also use the Win32 Disk Imager toolWin32 Disk Imager tool instead of [Raspberry Pi Imager](https://www.raspberrypi.com/software/). Ensure that your SD card is correctly formatted before using the tool.  Also, ensure that the compressed SD card image for the Kria Starter Kit has been extracted using an archive decompression tool.

![Win 32 disk image](./media/win32-disk-image.avif)

Browse to the location of the uncompressed image in the tool using the Blue folder icon.
From the device drop-down menu, select the correct microSD card.

Click on ‘Write’ and then ‘Yes’ at the prompt to continue the write process and wait till the process is completed.

</details>

## Next Step

Jump to [Step 2: Connect Everything](./connections.md).

<p class="sphinxhide" align="center">Copyright&copy; 2023-2026 Advanced Micro Devices, Inc</p>
