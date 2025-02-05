# Step 5: Boot Linux

## First Boot

Power ON the starter kit by connecting the power supply to the AC plug. The power LEDs should illuminate and a Linux UART response can be seen on the terminal program interface.

Please note that the Starter Kit powers up immediately as you connect the AC plug to the wall power (There’s no ON/OFF switch on the board.)

If you see the heartbeat LED is active but there is no UART response, verify that your machine has the FTDI driver installed and that the terminal program is connected to the correct COM port.

The starter kit QSPI boots the board using SD boot mode and loads the SD contents to boot into Linux. At initial login, the platform requires you to set a new password.

The default login credentials are:

```
username: petalinux
```

To enable the root user, use the command below because “petalinux” has limited privileges. Enter the same password that you created for “petalinux” in the above step.

```bash
sudo su -l root
```

The standard system policy requires you to set the password the first time you log in with the default credentials.


``` bash
ping 8.8.8.8
```

If you can observe that packet transmit/receive worked and there is no packet loss with the above ping command, this means your internet connectivity is working and active.

Note: Without internet connectivity, you will not be able to perform all of the application steps or install the necessary tools & packages.

## Next Steps

You may now select an application in the [PetaLinux 2021.1 row](https://pages.gitenterprise.xilinx.com/techdocs/SOM/kv260/linux_boot.html), to try an example application in 2021.1. Some steps listed in applications "Setting up the Board and Application deployment" may overlap with the steps to boot PetaLinux.

Refer to [Kria Adventure map](https://xilinx.github.io/kria-apps-docs/Kria_doc_map/map.htm) for an organized view of different documentations available for Kria SOM.


<p class="sphinxhide" align="center">Copyright&copy; 2023 Advanced Micro Devices, Inc</p>
