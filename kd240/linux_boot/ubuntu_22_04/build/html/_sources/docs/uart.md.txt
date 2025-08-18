# Booting Linux on KD240 Step 3: Connect to UART Serial Port

When using the KD240 Ubuntu server image you will primarily log in over the USB-UART serial port to access the command line interface. This is required to launch some Kria™ SOM apps. To login and access the command line interface over the USB-UART serial port, please choose the appropriate host OS section below:

<details>
<summary>COM Port Setup Instructions for Windows Click to expand</summary>
For Windows, use the Device Manager to observe which COM ports appear when you plug the USB cable attached to the KD240 Starter Kit into your computer.

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
For macOS, open a terminal by searching for the “Terminal” in your Applications folder. Enter the following command to observe which COM ports appear when you plug in the USB cable attached to the KD240 into your computer:

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

For Linux, open a terminal by right-clicking on the desktop and selecting Open In Terminal, and enter the following command to observe which COM ports appear when you plug in the USB cable attached to the KD240 into your computer:

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

## Next Step

Jump to [Step 4: Firmware Update](./fwupdate.md).

<p class="sphinxhide" align="center">Copyright&copy; 2023 Advanced Micro Devices, Inc</p>
