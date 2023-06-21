<table class="sphinxhide">
 <tr>
   <td align="center"><img src="media/xilinx-logo.png" width="30%"/><h1>Kria&trade; Booting Kria Starter Kit Linux</h1>
   </td>
 </tr>
</table>

# Booting Kria Starter Kit Linux on KR260

## Introduction

This document shows how to boot Kria Starter Kit Linux on KR260 and perform common one-time updates and installations required prior to running any Xilinx released KR260 application in Linux.

This guide is targeted for Ubuntu 22.04 and Xilinx 2022.1 toolchain.

## Boot Process

1. Flash the Kria Starter Kit Linux image into the SD Card (minimum 16GB)

      Refer to [KR260 Getting Started Page](https://www.xilinx.com/products/som/kria/kr260-robotics-starter-kit/kr260-getting-started/setting-up-the-sd-card-image.html) to flash SD card with a Ubuntu 22.04 image.

      You can re-use the same SD card to evaluate all the applications released for Ubuntu 22.04.

2. Set up the hardware. Each application will require a different set of peripherals, below lists the minimum required to boot Linux.

   ![KR260](./media/board_interfaces.png)
   ![KR260](./media/board_interfaces_back.png)

   * microSD:

      Insert the SD card into slot at J11.

   * Monitor:

      Connect the monitor to the board via either DP port on J6. Refer to each application documentation for monitor resolution requirement.

   * UART/JTAG interface:

      For interacting and seeing boot-time information, connect a USB debugger to J4. Some applications will only run through commands issued through UART interface.

   * Network connection:

      Connect the Ethernet cable from J10C or J10D to your local network with DHCP enabled to install Linux packages. Note that image recovery app and some applications (such as 10GigE Vision Camera) requires J10C.

3. Ensure the Starter Kit Boot firmware is up to date

    The SOM Starter Kits have factory pre-programmed boot firmware that is installed and maintained in the SOM QSPI device. Update the boot firmware in the SOM QSPI device to '2022.1 Boot FW' Image.

    See the [Kria Wiki](https://xilinx-wiki.atlassian.net/wiki/spaces/A/pages/1641152513/Kria+K26+SOM#Boot-Firmware-Updates) to obtain boot firmware binary and instructions to update QSPI image using xmutil, after Linux boot.  

    QSPI image update persists through power cycles or SD card changes.

4. Boot Linux on your Starter Kit (Ubuntu) following the instruction from [this page](https://www.xilinx.com/products/som/kria/kr260-robotics-starter-kit/kr260-getting-started/booting-your-starter-kit.html)

   * For some applications it is required to work with commandline instead of GNOME Desktop.

5. If not done so yet, perform system update to pull in the latest kernel and Xilinx packages. There can be some errors during install, refer to [known issues](#known-issues) if you encounter issues. There are two ways to do this.

   Through snap install, for more information refer to the [Xilinx config snap Wiki](https://xilinx-wiki.atlassian.net/wiki/spaces/A/pages/2057043969/Snaps+-+xlnx-config+Snap+for+Certified+Ubuntu+on+Xilinx+Devices):

      ```bash
      sudo snap install xlnx-config --classic --channel=2.x
      ```

      After xlnx-config snap has been installed, run the Xilinx platform setup script, and follow the prompts.

      ```bash
      sudo xlnx-config.sysinit
      ```

   Alternatively, the above can be achieved by manually adding the Xilinx specific Ubuntu PPAs, and then performing a system update and upgrade to pull in the latest Xilinx libraries. Note the apt upgrade step may take some time.

      ```bash
      sudo add-apt-repository ppa:xilinx-apps
      sudo add-apt-repository ppa:ubuntu-xilinx/sdk
      sudo apt update
      sudo apt upgrade
      ```

   Note: if the kernel was updated, make sure to follow the apt upgrade instruction (and command such as ```sudo reboot```) to reboot the platform in order to boot with latest kernel.

6. Some KR260 Ubuntu 22.04 applications are deployed as Docker containers. Follow instructions from [docker.com](https://docs.docker.com/engine/install/ubuntu/) to install Docker.

   Enable your user to properly use the Docker commands without using sudo for every docker command.

    ```bash
    sudo groupadd docker
    sudo usermod -a -G docker  $USER
    ```

   This will only need to be done once if re-using the same SD card for running multiple applications.

7. Install the latest xrt zocl driver:

      ```bash
      sudo apt install xrt-dkms
      ```

This flow will only need to be done once if re-using the same SD card for multiple applications. However, user can choose to update and upgrade again to install newly available updates thats made available later.

## Known issues

1. Sometimes Ubuntu has background process ongoing by the time it boots to command prompt and do not yet ask you to change your password. In those cases doing a snap install may result in a message like following:

   ```error: too early for operation, device not yet seeded or device model not acknowledged```

   Try again in a minute or two and you should be prompted to update password and above error should go away.

2. If a prompt like the following appears:

   ![kernel](./media/kernelflash.png)

   Choose "keep the local version currently installed". For more details refer to [this wiki page](https://xilinx-wiki.atlassian.net/wiki/spaces/A/pages/2116354051/Tips+Tricks+for+Certified+Ubuntu+AMD-Xilinx+Devices#Understanding-the-Configuring-flash-kernel-Prompts-When-Updating-the-Linux-Kernel).

3. During ```sudo xlnx-config.sysinit``` or ```sudo apt upgrade``` commands you may see the following errors and exit installation. Re-run the commands and installation should continue and complete.

   ``` text
   flash-kernel: deferring update (trigger activated)
   /etc/kernel/postinst.d/zz-flash-kernel:
   flash-kernel: deferring update (trigger activated)
   Errors were encountered while processing:
   flash-kernel
   need restart is being skipped since dpkg has failed
   E: Sub-process /usr/bin/dpkg returned an error code (1)
   ```

## Misc Information

The *ubuntu* user does not have root privileges. Most commands used in tutorials must be run using *sudo*, and it may be prompted to enter your password.

For security, by default, the root user is disabled. If user want to login as root user, perform the following steps. Use the *ubuntu* user's password on the first password prompt, then set a new password for the root user. User can now login as root user using the newly set root user password.

```bash
ubuntu@kria:\~\$ sudo -i
sudo\] password for ubuntu:
root@kria:\~#
```

If needed, the these are commands to set System Timezone and locale:

* Set timezone

```bash
sudo timedatectl set-ntp true
sudo timedatectl set-timezone America/Los_Angeles
timedatectl
```

* Set locale

```bash
sudo locale-gen en_US en_US.UTF-8
sudo update-locale LC_ALL=en_US.UTF-8 LANG=en_US.UTF-8
export LANG=en_US.UTF-8
locale
```

Below example command set the date and time.

`sudo date --set "11 January 2023 16:47:00"`

The storage volume on the SD card can be limited with multiple dockers. If there are space issues, use the following command to remove the existing container.

```bash
sudo docker rmi --force $INSTALLED_DOCKER_IMAGE
```

## License

Licensed under the Apache License, Version 2.0 (the "License"); you may not use this file except in compliance with the License.

You may obtain a copy of the License at
[http://www.apache.org/licenses/LICENSE-2.0](http://www.apache.org/licenses/LICENSE-2.0)

Unless required by applicable law or agreed to in writing, software distributed under the License is distributed on an "AS IS" BASIS, WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied. See the License for the specific language governing permissions and limitations under the License.

<p class="sphinxhide" align="center">Copyright&copy; 2022 Xilinx</p>