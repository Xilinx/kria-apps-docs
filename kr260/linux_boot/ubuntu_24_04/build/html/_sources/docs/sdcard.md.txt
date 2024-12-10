# Step 1: Set up the SD Card Image

The Starter Kit has a primary and secondary boot device, isolating the boot firmware from the run-time OS and application. This allows you to focus on developing and updating your application code within the application image on the secondary boot device, without having to develop the boot firmware. The primary boot device is a QSPI memory located on the SOM, which is pre-programmed (pre-loaded QSPI image) at the factory.  The secondary boot device is a microSD card interface on the carrier card.

For setting up the microSD card, you’ll need to download the latest SD card image and then write it using an Image Flashing tool.

1. Download the [Kria Ubuntu 24.04 LTS Image](https://ubuntu.com/download/amd#kria-k26)  and save it on your computer. Note that there are two releases, Ubuntu 24.04 and Ubuntu 22.04. Choose the appropriate image based on the applications (and their version) targeted. Refer back to [Linux boot landing page](https://xilinx.github.io/kria-apps-docs/kr260/linux_boot.html) for compatible applications for each Ubuntu version.
2. Download the [Raspberry Pi Imager](https://www.raspberrypi.com/software/)  (recommended; available for Window, Linux, and macOS). Find additional OS specific tool options below.
3. Follow the instructions in the tool and select the downloaded image to flash onto your microSD card.

Once your microSD card is flashed with the image, proceed to the next step.

Looking for OS specific tools to write the image to the SD card?

<details>
<summary>Instructions for Windows Click to expand</summary>

For Windows users, you can also use the Win32 Disk Imager tool instead of [Raspberry Pi Imager](https://www.raspberrypi.com/software/). Ensure that your SD card is correctly formatted before using the tool.  Also, ensure that the compressed SD card image for the Kria Starter Kit has been extracted using an archive decompression tool.

![Win 32 disk image](./media/win32-disk-image.avif)

Browse to the location of the uncompressed image in the tool using the Blue folder icon.
From the device drop-down menu, select the correct microSD card.

Click on ‘Write’ and then ‘Yes’ at the prompt to continue the write process and wait till the process is completed.

</details>

<details>
<summary>Instructions for macOS Click to expand</summary>

For macOS users, visit the Ubuntu download page below to copy the image to the SD card:

https://ubuntu.com/download/iot/installation-media 

Once on the Ubuntu download page, as seen below, click on the macOS link to jump to the instructions.

![MAC OS imager](./media/ubunut-macos.avif)

</details>

<details>
<summary>Instructions for Linux Click to expand</summary>

For Linux OS users, visit the Ubuntu download page below to copy the image to the SD card:

https://ubuntu.com/download/iot/installation-media 

Once on the Ubuntu download page, as seen below, click on the Ubuntu link to jump to the instructions.

![Linux imager](./media/ubunut-linux.avif)

</details>

## Next Step

Jump to [Step 2: Connect Everything](./connections.md).

<p class="sphinxhide" align="center">Copyright&copy; 2023 Advanced Micro Devices, Inc</p>
