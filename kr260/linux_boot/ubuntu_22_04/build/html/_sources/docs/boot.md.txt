# Step 5: Boot Linux

## First Boot

Power ON the starter kit by connecting the power supply to the AC plug. The power LEDs should illuminate and a Linux UART response can be seen on the terminal program interface.

Please note that the Starter Kit powers up immediately as you connect the AC plug to the wall power (There’s no ON/OFF switch on the board.)

If you see the heartbeat LED is active but there is no UART response, verify that your machine has the FTDI driver installed and that the terminal program is connected to the correct COM port.

The starter kit QSPI boots the board using SD boot mode and loads the SD contents to boot into Linux. At initial login, the platform requires you to set a new password.

The default login credentials are:

```
username: ubuntu
password: ubuntu
```

The standard system policy requires you to change the password the first time you log in with the default credentials.

Note: If you login very quickly during the first boot, you may find that the password does not have to be changed. In this case, you will be required to update it the next time you login or use the sudo command to initiate the password change.

```bash
ping 8.8.8.8
```

If you can observe that packet transmit/receive worked and there is no packet loss with the above ping command, this means your internet connectivity is working and active.

Note: Without internet connectivity, you will not be able to perform all of the application steps or install the necessary tools & packages.

## Upgrade packages on the system

Install the application specific repositories, Ubuntu updates, and upgrade the system (which may take 10-20 minutes to complete):

```bash
sudo add-apt-repository ppa:xilinx-apps --yes &&
sudo add-apt-repository ppa:ubuntu-xilinx/default --yes &&
sudo add-apt-repository ppa:xilinx-apps/xilinx-drivers --yes &&
sudo add-apt-repository ppa:lely/ppa --yes &&
sudo apt update --yes &&
sudo apt upgrade --yes
```

For more detailed information regarding setting up the environment, refer to: [Getting Started with Ubuntu](https://xilinx-wiki.atlassian.net/wiki/spaces/A/pages/2363129857/Getting+Started+with+Certified+Ubuntu+22.04+LTS+for+Xilinx+Devices).

Some Ubuntu applications are deployed as Docker containers. Follow the instructions from [docker.com](https://docs.docker.com/engine/install/ubuntu/) to install Docker.

Enable the user to properly use the Docker commands without using sudo for every Docker command.

```bash
sudo groupadd docker
sudo usermod -a -G docker  $USER
```

This is only needed to be done once if reusing the same SD card for running multiple applications.

Lastly, on K26 based Kria Starter Kits, it is possible to enable ubuntu-desktop on top of the server image:

``` bash
sudo apt update
sudo apt install ubuntu-desktop-kria
sudo reboot
```

This flow is only needed to be done once if reusing the same SD card for multiple applications. However, you can choose to update and upgrade again to install newly available updates that are made available later.

## Next Steps

Refer to [Boot Linux Known Issues](./known_issues.md) for tips to debug boot issues

Try out one of the applications! Check the [Ubuntu 22.04 row](https://pages.gitenterprise.xilinx.com/techdocs/SOM/kr260/linux_boot.html) for supported application in Ubuntu 22.04.

Refer to [Kria Adventure map](https://xilinx.github.io/kria-apps-docs/Kria_doc_map/map.htm) for an organized view of different documentations available for Kria SOM.


<p class="sphinxhide" align="center">Copyright&copy; 2023 Advanced Micro Devices, Inc</p>
