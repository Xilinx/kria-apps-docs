<table class="sphinxhide">
 <tr>
   <td align="center"><img src="media/xilinx-logo.png" width="30%"/><h1>Kria&trade; Booting Kria Starterkit Linux</h1>
   </td>
 </tr>
</table>

# Booting Kria Starterkit Linux

## Introduction

This document shows how to boot Kria Starterkit Linux and perform common one-time updates and installations required prior to running any Xilinx released KV260 application in Linux.

This guide is targeted for Ubuntu 22.04 and Xilinx 2022.1 toolchain.

## Boot Process

1. Flash the Linux image into the SD Card (minimum 16GB)

      Refer to [KV260 Getting Started Page](https://www.xilinx.com/products/som/kria/kv260-vision-starter-kit/kv260-getting-started/setting-up-the-sd-card-image.html) to flash SD card with a Ubuntu 22.04 image.

      You can re-use the same SD card to evaluate all the applications released for Ubuntu 22.04.

2. Set up the hardware. Each application will require a different set of peripherals, below list the minimum required to boot Linux.

   ![GitHub Logo](./media/som-board.png)

   * microSD:

      Insert the SD card into slot at J11.

   * Monitor:

      Connect the monitor to the board via either DP or HDMI port. Refer to each application documentation for monitor resolution requirement.

   * UART/JTAG interface:

      For interacting and seeing boot-time information, connect a USB debugger to the J4. Some applications will only run through commands issued through uart interface.

   * Network connection:

      Connect the Ethernet cable to your local network with DHCP enabled to install packages and run Jupyter Notebooks

3. Boot Linux on your Starter Kit (Ubuntu) following the instruction from [this page](https://www.xilinx.com/products/som/kria/kv260-vision-starter-kit/kv260-getting-started-ubuntu/booting-your-starter-kit.html)

   * For some applications it is required to work with commandline instead of GNOME Desktop.

4. Ensure the Starter Kit Boot firmware is up to date

    The SOM Starter Kits have factory pre-programmed boot firmware that is installed and maintained in the SOM QSPI device. Update the Boot firmware in the SOM QSPI device to '2022.1 Boot FW' Image.

    See the [Kria Wiki](https://xilinx-wiki.atlassian.net/wiki/spaces/A/pages/1641152513/Kria+K26+SOM#Boot-Firmware-Updates) to obtain Boot firmware binary and instructions to update QSPI image using xmutil, after Linux boot.  

    QSPI image update persists through power cycles or SD card changes.

5. KV260 Ubuntu 22.04 applications are deployed as Docker containers. Kria uses a standard Docker installation, follow instructions from [docker.com](https://docs.docker.com/engine/install/ubuntu/) to install Docker.

   Enable your user to properly use the Docker commands without using sudo for every command.

    ```bash
    sudo groupadd docker
    sudo usermod -a -G docker  $USER
    ```

   This will only need to be done once if re-using the same SD card for running multiple applications.

6. Add the Xilinx specific Ubuntu PPAs, and then perform system update and upgrade to pull in Xilinx specific libraries. Note the apt upgrade step may take some time.

      ```bash
      sudo add-apt-repository ppa:xilinx-apps
      sudo add-apt-repository ppa:ubuntu-xilinx/sdk
      sudo apt update
      sudo apt upgrade
      ```

      Optionally, the above can also be accomplished with the [Xilinx config snap](https://xilinx-wiki.atlassian.net/wiki/spaces/A/pages/2057043969/Snaps+-+xlnx-config+Snap+for+Certified+Ubuntu+on+Xilinx+Devices)

      Note: if the kernel was updated, make sure to follow apt upgrade command prompt to reboot the platform in order to boot with latest kernel.

7. Check the kernel version and build details using

      ```bash
      uname -a      
      ```

      **Note:-** The Output should be like as follow, different applications may have different version requirement.

      ```bash
      Linux kria 5.15.0-1013-xilinx-zynqmp #14-Ubuntu SMP
      ```

This flow will only need to be done once if re-using the same SD card for multiple applications. However, user can choose to update and upgrade again to install newly available updates thats made available later.

## License

Licensed under the Apache License, Version 2.0 (the "License"); you may not use this file except in compliance with the License.

You may obtain a copy of the License at
[http://www.apache.org/licenses/LICENSE-2.0](http://www.apache.org/licenses/LICENSE-2.0)

Unless required by applicable law or agreed to in writing, software distributed under the License is distributed on an "AS IS" BASIS, WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied. See the License for the specific language governing permissions and limitations under the License.

<p class="sphinxhide" align="center">Copyright&copy; 2021 Xilinx</p>