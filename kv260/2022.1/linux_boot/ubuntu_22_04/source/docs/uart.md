# Step 3: Connect to UART Serial Port

When using the Kria Starter Kit Ubuntu server image you will primarily log in over the USB-UART serial port to access the command line interface. This is required to launch some Kria™ SOM apps. To login and access the command line interface over the USB-UART serial port, please choose the appropriate host OS section below:

<details>
<summary>COM Port Setup Instructions for Windows Click to expand</summary>
For Windows, use the Device Manager to observe which COM ports appear when you plug the USB cable attached to the Starter Kit into your computer.

The starter kit uses an FTDI USB-to-COM port device that requires the FTDI virtual COM port driver to be installed on your machine. If the driver is not already installed on your host machine or Windows has not automatically installed it, go to the following link:

https://ftdichip.com/drivers/vcp-drivers/ 

Four COM ports are enumerated, where the second numbered COM port corresponds to the UART.

Configure your terminal program (e.g., TeraTerm, PuTTy) with the settings shown below. If not already available, refer to the Tera Term Terminal Emulator Installation Guide (UG1036) for instructions on installing a terminal program on your computer:

* Baud rate = 115200
* Data bits = 8
* Stop bits = 1
* Flow control = None
* Parity = None

</details>

<details>

<summary>COM Port Setup Instructions for MacOS Click to expand</summary>
For macOS, open a terminal by searching for the “Terminal” in your Applications folder. Enter the following command to observe which COM ports appear when you plug in the USB cable attached to the Kria Starter Kit into your computer:

```bash
$ ls /dev/tty.*
```

Four COM ports are enumerated, where the second numbered COM port corresponds to the UART.

Configure your UART within the same terminal. You can also configure your terminal program with the same settings below. These settings are the same as defined in the Windows setup.

``` bash
screen /dev/tty.usbserial-<board serial>1 115200,cs8
```

</details>

<details>
<summary>COM Port Setup Instructions for Linux</summary>

For Linux, open a terminal by right-clicking on the desktop and selecting Open In Terminal, and enter the following command to observe which COM ports appear when you plug in the USB cable attached to the Kria Starter Kit into your computer:

```bash
dmesg | grep tty
```

Two COM ports should be enumerated. The second numbered COM port corresponds to the UART.​

Configure your UART within the same terminal. You can also configure your terminal program with the same settings below. These settings are the same as defined in the Windows setup.

```bash
sudo putty /dev/ttyUSB2 -serial -sercfg 115200,8,n,1,N
```

The starter kit uses an FTDI USB-to-COM port device that requires the FTDI virtual COM port driver to be installed on your machine. If the driver is not already installed on your host machine or Linux does not automatically detect it and load the appropriate driver, go to the [this link](https://ftdichip.com/drivers/vcp-drivers/) for additional guidance.

</details>

## Gnome Desktop
When using the 22.04 Ubuntu image on KV260, in addition to logging in using the traditional way over the serial port, there is also a full GNOME Desktop available. To take advantage of the GNOME Desktop, use the “Instructions for GNOME Desktop” section below.  This will require a keyboard, mouse, and monitor to be connected.

Note that in order to launch some Kria Apps, the use of the USB-UART serial port to access the command line interface is required, rather than using the GNOME Desktop to start the applications.  Some applications, such as the Smart Camera Application, will occupy the entire display output area while they are running, but you will regain access to the GNOME Desktop once the application exits.

<details>
<summary> Instructions for GNOME Desktop</summary>

To login into the GNOME Desktop, you must connect a DisplayPort or HDMI monitor as well as a USB Keyboard and Mouse.

Power ON the Starter Kit by connecting the power supply to the AC plug. The power LEDs should illuminate, and after about 10-15 seconds, you should see console output on the connected display.  After about a minute, the desktop login screen should appear as pictured below:

![gmome](./media/gnome-desktop.avif)

Please note that the Starter Kit powers up immediately as you connect the AC plug to a wall. (There’s no ON/OFF switch on the board.)

If you see the heartbeat LED is active but there's no output on the monitor, check your monitor to ensure that it’s powered on and the correct input is selected.

The default login credentials are:
username: ubuntu
password: ubuntu

The standard system policy requires you to change the password after the first time you log in with the default credentials.

Note: If you login very quickly the first boot, you may find that the password does not have to be changed. In this case, you will be required to update it the next time you login or use sudo.

Once logged in, you should see the default Ubuntu 22.04 LTS GNOME 3 desktop.

![gmome](./media/gnome-desktop2.avif)

Open a terminal and verify internet connectivity via “ping” or “DNS lookup".

```
ping 8.8.8.8
```

If you can observe that packet transmit/receive worked and there is no packet loss with the above ping command, this means your Internet connectivity is working and active.

Please note: internet connectivity is required for Ubuntu update in later steps and to download and run applications.

</details>

## Next Step

Jump to [Step 4: Firmware Update](./fwupdate.md).

<p class="sphinxhide" align="center">Copyright&copy; 2023 Advanced Micro Devices, Inc</p>
