# Booting Kria Starter Kit Linux on KR260

## Introduction

The AMD Kria™ KR260 Robotics Starter Kit is the premier platform to evaluate applications targeted to robotics, machine vision, and industrial communications & control. Try all our accelerated applications and get started within minutes by following all the steps. Have fun!

![KR260](./media/starterkit-kria-callout-getting-started.avif)

## What's Inside the Box

* [Kria KR260 Robotics Starter Kit](https://www.amd.com/en/products/system-on-modules/kria/k26/kr260-robotics-starter-kit.html) (Kria SOM + Carrier Card + Thermal Solution)
KR260 Power supply and Adapter (12V, 3A)
* MicroSD Card 16 GB or Above
* USB-A to micro-B Cable
* Ethernet Cable
* Getting Started doc
* Developer stickers

## What You’ll Need to Provide

You will need to provide the following in order to be able to take full advantage of the fact that KR260 can provide a full desktop environment that will be very familiar to developers:

* USB Keyboard
* USB Mouse
* DisplayPort™ Cable (for connecting to a monitor)
* DisplayPort Display
* Use of a USB keyboard and mouse is optional. You can also use a USB camera / webcam or depth sensing camera for your robotics application.

To begin, a computer with internet connection and with the ability to write to a microSD card is needed.

## Important:  Perform Shutdown Command Before Removing Power

Running the shutdown command enables Ubuntu to bring the system down in a secure manner, ensuring that disk writes complete before storage devices are unmounted.
For best practice, this should be performed each time before removing power.

```sudo shutdown -h now```

### Ubuntu Server LTS

* Access to Kria SOM accelerated apps and hardware overlays designed specifically to run on the K26 SOM and KR260 Starter Kit. Each Ubuntu Version has a different set of supported applications. Refer to [Linux boot landing page](https://pages.gitenterprise.xilinx.com/techdocs/SOM/kr260/linux_boot.html) for compatible applications for each Ubuntu version.
* Access to a rich set of third-party software libraries in the Ubuntu community

[Access Booting Kria Starter Kit Linux on KR260 tutorial HERE](./sdcard.md)

### Additional Embedded Developer Assets and Resources

For embedded developers looking to directly use PetaLinux BSPs for application development and deployment rather than Ubuntu, the latest PetaLinux BSPs are available on the [Kria SOM Wiki](https://xilinx-wiki.atlassian.net/wiki/spaces/A/pages/1641152513/Kria+SOMs+Starter+Kits#K26-Embedded-Linux-(Yocto))

## Next Step

Jump to [Step 1: Set up the SD Card Image](./sdcard.md).


<p class="sphinxhide" align="center">Copyright&copy; 2023 Advanced Micro Devices, Inc</p>
