# FreeRTOS Kria SOM Starter Kits Support

[FreeRTOS](https://xilinx-wiki.atlassian.net/wiki/spaces/A/pages/18842141/FreeRTOS) is a real-time operating system (RTOS) kernel designed for embedded systems. It provides scheduling, multitasking, and various other services for applications running on microcontrollers and small microprocessors. FreeRTOS is open-source, allowing developers to use, modify, and distribute it freely under the MIT license.

Booting FreeRTOS on Kria Starter Kits mirrors the process on a standard AMD Zynq MPSoC platform. This document offers a detailed, step-by-step procedure for running FreeRTOS on a Kria SOM APU processor.

To boot FreeRTOS, the initial step involves acquiring or generating a .xsa file. Next, the .xsa file is imported into AMD Vitis to establish a FreeRTOS platform and application, and to create artifacts required to boot on target. Finally, various methods for booting FreeRTOS on Kria SOM are outlined.

In this tutorial, the KV260 is used as a demonstration and utilizes tool version 2023.2.

## Prerequisites

1. Vitis installation
2. (Optional) Vivado installation

### Obtain or Generate .xsa file

A .xsa file corresponding to target the Kria Starter Kit can be found in [petalinux.xilinc.com](https://petalinux.xilinx.com/sswreleases) in the ```hdf-examples/``` folder, or from PetaLinux BSP's hardware/ folder.These are base .xsa files containing support for various PS peripherals and has minimal PL contents.

Alternatively, you can generate a .xsa file by utilizing the  board files as outlined in the tutorial provided [here](https://xilinx.github.io/kria-apps-docs/creating_applications/2022.1/build/html/docs/Generate_vivado_project_from_boardfile.html).

### Create FreeRTOS platform Application in Vitis

> **NOTE:** This tutorial uses the 2023.2 version of Vitis, featuring the newly introduced interface GUI.

1. On the Vitis welcome page, under Embedded Development, select **Create Platform Component**.
![image](./media/freertos_vitis1.PNG)

2. Follow the prompt to enter the Vitis Workspace location and platform component name. In this case, use ```freertos_platform``` as the platform name.
![image](./media/freertos_vitis2.PNG)

3. Select the .xsa generated in the [previous step](#generate-xsa-file-using-vivado-and-board-file).

4. Select **freertos** as the operating system, and **psu_cortex53_0** as the processor. Also make sure to select **Generate Boot artifacts** and **Generate PMU Firmware**:
![image](./media/freertos_vitis3.PNG)

5. Click **Next** then **Finish**, and Vitis will create a FreeRTOS platform project (it might take a few minutes). In the created project, in the FLOW tab, click **Build** to build the platform:
![image](./media/freertos_vitis4.PNG)

6. Now navigate to the example applications with the icons on the left, select **Embedded Software Examples** -> **FREERTOS Hello World**, and click  **Create Application Component from Template**:
![image](./media/freertos_vitis5.PNG)

7. Select the component name and location, in this case, you used ```freertos_hello_world``` as the component name. Then select the ```freertos_platform``` that you created:
![image](./media/freertos_vitis6.PNG)

8. Click **Next** and **Finish**. Now Vitis will generate an application component. In the FLOW tab, select the application. In the Component drop down menu, select **Build**.
![image](./media/freertos_vitis7.PNG)

9. You can find the generated artifacts in ```<vitis workspace>/freertos_hello_world/build/freertos_hello_world.elf```,  ```<vitis workspace>/freertos_platform/zynqmp_fsbl/build/fsbl.elf``` and ```<vitis workspace>freertos_platform/zynqmp_pmufw/build/pmufw.elf```.

10. Finally, for the QSPI booting options in later sections, click **Create Boot Image**.
![image](./media/freertos_vitis8.PNG)

11. In the window that displays, leave everything on default and click **Create Image**. You will find the generated artifact in ```freertos_hello_world/_ide/bootimage/boot.bin```.

### Boot FreeRTOS on the Platform

There are many ways to boot FreeRTOS with the artifacts created. There are more ways, such as USB, eMMC, and ethernet, all of which are not specific to the Kria implementation.

#### Boot FreeRTOS via JTAG

To boot FreeRTOS via JTAG, use XSDB. Create a folder with ```freertos_hello_world.elf```, ```fsbl.elf```, and ```pmufw.elf``` in the folder. Create a ``boot.sh`` in the same folder with the following content:

``` bash
puts stderr "Starting the script..."
connect
targets -set -nocase -filter {name =~ "PSU"}
# update multiboot to ZERO
mwr 0xffca0010 0x0
# change boot mode to JTAG
mwr 0xff5e0200 0x0100
# reset
rst -system
after 2000

targets -set -nocase -filter {name =~ "PSU"}
mwr  0xffca0038 0x1ff
targets -set -nocase -filter {name =~ "MicroBlaze PMU"}
catch {stop}; after 1000
puts stderr "INFO: Downloading zynqmp_pmufw ELF file to the target."
dow -force "pmufw.elf"
after 2000
con

after 5000
targets -set -nocase -filter {name =~ "Cortex-A53*#0"}
rst -proc -clear-registers
after 2000
puts stderr "INFO: Downloading zynqmp_fsbl ELF file to the target."
dow -force "fsbl.elf"
after 2000
con
after 4000; stop; catch {stop};

targets -set -nocase -filter {name =~ "*A53*#0"}
puts stderr "INFO: Downloading u-boot ELF file to the target."
after 2000
dow -force "freertos_hello_world.elf"
after 2000
con
```

In XSDB, source `boot.sh`; this will execute the three elfs and execute the example FreeRTOS hello world application. TheFreeRTOS Hello World application prints on UART.

#### Boot FreeRTOS Using QSPI in A/B Update

If your Starter Kit has the locked QSPI image with A/B boot sections, you can also test the generated `boot.bin` (renamed to `freertos_boot.bin` here) by loading it to A or B boot partition and test.

For an example, you can boot to Ubuntu/PetaLinux, and load the `freertos_boot.bin` into one of the image partition using xmutil:

``` shell
ubuntu@kria:~$ sudo xmutil bootfw_update -i freertos_boot.bin
Marking last booted image as bootable
Reading Image file
Updating Image B
Marking target image as non bootable
Writing Image to Image B partition
Marking target image as non bootable and requested image
Clearing multiboot register value
freertos_boot.bin successfully updated to Image B partition
```

Perform a power cycle. On the first power cycle, the image selector will choose the newly updated partition. You will see the hello FreeRTOS program printouts on UART. However, in this state, on every other power cycle, the image selector will choose the other partition and try to boot Linux. For detailed logics on how image selector chooses which partition to use, see the [A/B Boot Voncept](https://xilinx.github.io/kria-apps-docs/bootfw/build/html/docs/bootfw_overview.html#a-b-boot-concept) section.

## Next Step

Try the lwIP TCP Performance Server application in [this tutorial](./freertos_kria_lwip_tcpperfserver.md).

<hr class="sphinxhide"></hr>

<p class="sphinxhide" align="center"><sub>Copyright © 2024 Advanced Micro Devices, Inc.</sub></p>

<p class="sphinxhide" align="center"><sup><a href="https://www.amd.com/en/corporate/copyright">Terms and Conditions</a></sup></p>
