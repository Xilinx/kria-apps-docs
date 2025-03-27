# Baremetal Flow Example

To use SOM without Linux, you create a baremetal (also called standalone) application. This example flow details the process of creating a simple programmable logic (PL) design with a block RAM connected to the processing system (PS), running on the Vision AI Starter Kit. The flow then creates a standalone software in AMD Vitis&trade; to read and write from block RAM. Finally, the flow suggests two ways to load and test the application on SOM.

* Assumption: AMD built carrier cards with a corresponding SOM Starter Kit board file
* Input: SOM Starter Kit board files (in AMD Vivado&trade;), your own accelerator designs in Vivado (in this case, block RAM)
* Output: ```<pl>.bit```, ```fsbl.elf```, ```pmufw.elf```, ```<application>.elf```, and ```boot.bin```

## Prerequisites and Assumptions

This document assumes that you use 2021.1 or later tools and SOM content releases. The tool versions should match, that is, use the same tool versions for Vivado, Vitis, Bootgen, and XSDB.

1. Vitis tools installation, which include Vivado, Bootgen, and XSDB.

### Vivado Board File

This flows starts with Vivado board files containing information on K26, K24, KV260 CC, KR260 CC, or KD240 CC. The K26/K24 SOM is supported in Vivado with board files that automate the configuration of the board peripherals. These board files are available in Vivado's board list in the Create Project wizard.

For a list of board files required, the tool versions that support them, and how to download them from the XHUB store correctly, refer to the [Wiki](https://xilinx-wiki.atlassian.net/wiki/spaces/A/pages/1641152513#Vivado-Board-Support-Packages).

## Step 1: Generate the PL Design in Vivado

1. Start Vivado. Choose **File** -> **Project** -> **New**. Then choose the RTL project:
    ![Tool Flow](./media/baremetal_example/01_vivado.png)

2. Click **Next**, then in ```Default Part``` section, choose **boards**, choose the K26*/K24* card (in this case K26C), and then click **connections**:
![Tool Flow](./media/baremetal_example/02_vivado.png)

3. Choose the carrier card to connect the SOM to, which in this case, the Vision AI Starter Kit carrier card:
![Tool Flow](./media/baremetal_example/03_vivado.png)

4. Click through to finish creating the project. Now create a block design:
![Tool Flow](./media/baremetal_example/04_vivado.png)

5. In Block Design, click the **+** sign, and add the PS block:
![Tool Flow](./media/baremetal_example/05_vivado.png)

6. When the PS block is added, make sure to click **Run Block Automation**, and apply the board preset. This configures the PS block correctly for SOM + Carrier Card:
![Tool Flow](./media/baremetal_example/06_vivado.png)

7. Now add another block: the AXI BRAM controller:
![Tool Flow](./media/baremetal_example/07_vivado.png)

8. Click **Run Connection Automation** and connect the `S_AXI` port of the block RAM controller with the ```M_AXI_HPM0``` port of PS:
![Tool Flow](./media/baremetal_example/08_vivado.png)

9. Click **Run Connection Automation** again, and connect `BRAM_PORTA` to a block RAM:
![Tool Flow](./media/baremetal_example/09_vivado.png)

10. Double-click the block RAM controller, and configure it to only have one block RAM interface:
![Tool Flow](./media/baremetal_example/10_vivado.png)

11. Double-click the PS block, select **PS-PL Configuration**, and configure it to only enable HPM0 (deselect HPM1):
![Tool Flow](./media/baremetal_example/11_vivado.png)

12. Now connections are complete. Click **Generate Block Design**:
![Tool Flow](./media/baremetal_example/12_vivado.png)

13. After it done generating, right click the block design you have created, and select **Create HDL Wrapper**; this will set the created block design as top module:
![Tool Flow](./media/baremetal_example/13_vivado.png)

14. Check the address map of the BRAM slave memory so you can use the same address in the software later:
![Tool Flow](./media/baremetal_example/14_vivado.png)

15. Generate the bitstream:
![Tool Flow](./media/baremetal_example/15_vivado.png)

    This generates a bitstream at ```try_1/try_1.runs/impl_1/add_bram_wrapper.bit```.

16. Finally, export the .xsa file to work the next step in Vitis:
![Tool Flow](./media/baremetal_example/16_vivado.png)

17. Select **Include bitstream**:
![Tool Flow](./media/baremetal_example/17_vivado.png)

18. Launch Vitis by selecting **Tools** -> **Launch Vitis IDE**:
![Tool Flow](./media/baremetal_example/18_vivado.png)

## Step 2: Generate Standalone Software in Vitis

1. In Vitis, select **Project** -> **Create Application Project**:
![Tool Flow](./media/baremetal_example/19_vitis.png)

2. Select **Create a new platform from hardware (XSA)**, and point to the .xsa file that was just exported in step 1:
![Tool Flow](./media/baremetal_example/20_vitis.png)

3. Name the application and associate with PSU_cortexa53_0:
![Tool Flow](./media/baremetal_example/21_vitis.png)
![Tool Flow](./media/baremetal_example/22_vitis.png)

4. Use ```Hello World``` as a template:
![Tool Flow](./media/baremetal_example/23_vitis.png)

5. In ```helloworld.c```, alter the code to read and write from BRAM, and then right-click ```hello_world_system``` and select ```Build Project```:

    ![Tool Flow](./media/baremetal_example/24_vitis.png)

    You now have the following files:

    ```bash
    vitis_workspace/add_bram_wrapper/export/add_bram_wrapper/sw/add_bram_wrapper/boot/fsbl.elf
    vitis_workspace/add_bram_wrapper/export/add_bram_wrapper/sw/add_bram_wrapper/boot/pmufw.elf
    vitis_workspace/hello_world/Debug/hello_world.elf
    ```

## Step 3: Boot Baremetal Applications

There are two ways to boot baremetal applications: using JTAG to download files and start the application, and programming the boot files into the boot image sectors of QSPI so that the application boots up upon power up without needing XSDB. JTAG booting is ideal for development and debugging, while QSPI booting is ideal for deployment.

### Option 1: Boot Using JTAG

You can boot using JTAG using the four files generated: `fsbl.elf`, `pmufw.elf`, `hello_world.elf`, and `add_bram_wrapper.bit` using the following XSDB script:

```bash
proc boot_jtag { } {
############################
# Switch to JTAG boot mode #
############################
targets -set -filter {name =~ "PSU"}
# update multiboot to ZERO
mwr 0xffca0010 0x0
# change boot mode to JTAG
mwr 0xff5e0200 0x0100
# reset
rst -system
}

connect
boot_jtag

after 2000
targets -set -filter {name =~ "PSU"}
fpga "add_bram_wrapper.bit"
mwr 0xffca0038 0x1FF

# Download pmufw.elf
targets -set -filter {name =~ "MicroBlaze PMU"}
after 500
dow pmufw.elf
con
after 500

# Select A53 Core 0
targets -set -filter {name =~ "Cortex-A53 #0"}
rst -processor -clear-registers
dow fsbl.elf
con
after 10000
stop


dow hello_world.elf
after 500
con
```

### Option 2: Boot Using `boot.bin`

Alternatively, you can generate a `boot.bin` file to be programmed into the A/B image update section.

You first need to create a `<test>.bif` file containing the following:

```bash
the_ROM_image:
{
    [fsbl_config] a5x_x64
    [pmufw_image]pmufw.elf
    [bootloader]fsbl.elf    
    [destination_device=pl]add_bram_wrapper.bit
    [destination_cpu=a5x-0]hello_world.elf

}
```

Then run [bootgen](https://docs.xilinx.com/r/en-US/ug1283-bootgen-user-guide/Introduction) to create `boot.bin`:

```bash
bootgen -arch zynqmp -image test.bif -o boot.bin
```

Then, use the firmware update and recovery utility documented in the [Wiki](https://xilinx-wiki.atlassian.net/wiki/spaces/A/pages/1641152513/#Boot-FW-Update-Process)
to update the boot firmware. In this example, write `boot.bin` into Image A. Make sure to mark Image A as bootable, and as the requested Boot Image so that SOM boots Image A on every power cycle.

![Tool Flow](./media/baremetal_example/25_img_recovery.png)

## Step 4: Observe the UART Output

After step 3, `.bit` file and the `.elf` files are programmed. Observe printouts from UART indicating the ability to write and read from the block RAM.

### Optional: Restoring Linux Booting Image

You might want to restore a Starter Kit back to its default image and Linux boot firmware after one of the image sectors has been overwriten with the baremetal boot file. In that case,  download the released Linux booting `BOOT.bin` from the [SOM Wiki](https://xilinx-wiki.atlassian.net/wiki/spaces/A/pages/1641152513/#Boot-Firmware-Updates) and program it into one of the boot image sectors. Then mark that image sector as bootable and requested image.

<hr class="sphinxhide"></hr>

<p class="sphinxhide" align="center"><sub>Copyright © 2023-2025 Advanced Micro Devices, Inc.</sub></p>

<p class="sphinxhide" align="center"><sup><a href="https://www.amd.com/en/corporate/copyright">Terms and Conditions</a></sup></p>