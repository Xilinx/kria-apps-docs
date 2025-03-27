# Generating DTSI and DTBO Overlay Files

In this step, the AMD hardware description captured in the custom PL design must be translated into a Linux understandable format. In Linux hardware is described using a concept called device trees (DT). The human readable form of these are .dts and .dtsi files. The PL design is loaded post Linux boot, so this step generates a DT overlay. The overlay DT is slightly different than the Linux boot DT; it must define "fragments" that are added dynamically by Linux at runtime.

For reference, the .dtsi files associated with each platform (but organized by application) can be found in [Kria app firmware](https://github.com/Xilinx/kria-apps-firmware).

The .dts/.dtsi files can be generated in a number of ways, all of which require the hardware description data captured in the XSA or bit file. After a .dtsi file is generated, it is then compiled into a binary .dtbo file. The .dtbo file is expected in the firmware folder for each application.

There are three recommended methods:

1. In AMD Software Command-Line Tools (XSCT), use the Device Tree Generator (DTG) and `.xsa` file to generate the .dtsi file, and Device Tree Compiler (DTC) to compile the `.dtbo` file.
2. Manually create the .dtsi file, and in Yocto, use dfx_user_dts bbclass to create the .dtbo file.
3. Manually create the .dtsi file, and in PetaLinux, use fpgamanger_custom bbclass to create the .dtbo file.
4. In PetaLinux, use fpgamanger_dtg bbclass tools and petalinux-build to generate the .dtsi file from the .xsa file, and compiling it into `.dtbo`.

>**NOTE:** When using any method to generate .dtsi files. the generated file likely requires modifications before being fully functional.

## Using XSCT, DTG, and DTC

### Tools and Input Required

1. XSCT (part of Vivado or Vitis installation)
2. DTG, make sure to check out the version that is aligned to rest of tool chain and BSP used:

   ```bash
   git clone https://github.com/Xilinx/device-tree-xlnx
   cd device-tree-xlnx
   git checkout xlnx_rel_v<version>
   ```

3. DTC (part of Vitis installation, can also be obtained as follows:)

   ```bash
   git clone https://git.kernel.org/pub/scm/utils/dtc/dtc.git
   cd dtc
   make
   export PATH=$PATH:/<path-to-dtc>/dtc
   ```

More information about using Xilinx's Device Tree Generator (DTG) and open source Device Tree Compiler (DTC) is found on the [Wiki page](https://xilinx-wiki.atlassian.net/wiki/spaces/A/pages/18842279/Build+Device+Tree+Blob).

The following hardware design hand-off artifacts are required:

1. XSA file: Applies to Vivado or Vitis designs

### Generate .dtsi from .xsa Using DTG

Use XSCT to call HSI and generate the .dtsi file.

```bash
hsi open_hw_design <design_name.xsa>
hsi set_repo_path <path to device-tree-xlnx repository>
hsi create_sw_design device-tree -os device_tree -proc psu_cortexa53_0
hsi set_property CONFIG.dt_overlay true [hsi::get_os]
hsi set_property CONFIG.dt_zocl true [hsi get_os]          # if ZOCL is used
hsi generate_target -dir <desired_dts_filename>
hsi close_hw_design [current_hw_design]
```

The `[current_hw_design]` name is found in the output of `hsi open_hw_design <design_name.xsa>`. An example script for above id found in the linked example from the Vitis Platform Flow ([here](https://github.com/Xilinx/Vitis-Tutorials/blob/2022.1/Vitis_Platform_Creation/Design_Tutorials/01-Edge-KV260/ref_files/step2_pfm/gen_dt.tcl)).

A `<desired_dts_filename>` folder is created. `pl.dtsi` is the overlay .dtsi file to be used to compile into the .dtbo file. The .dtsi file requires some modifications before it is ready to be compiled.

### Compile the .dtsi to .dtbo Using DTC

This step takes the human readable defined Linux hardware description (.dtsi file) generated (`pl.dtsi`) and compiles it into a binary form that Linux can directly use. This is completed using the Linux Device Tree Compiler (DTC) which is an open-source tool. The actual command used to generate the desired .dtbo file from the .dtsi file is as follows:

```bash
dtc -@ -O dtb -o pl.dtbo pl.dtsi
```

Rename the `pl.dtbo` file to the appropriate name.

## Using dfx_user_dts bbclass in Yocto

The `dfx_user_dts` bitbake class is a helper class that can be used by Yocto to generate a set of FPGA firmware binaries. This method requires that you handwrite your own .dtsi file. This method is supported starting in 2024.1. The same bitbake class applies for PetaLinux, but this section aims to provide an example of how to use this bitbake class in Yocto.

### Tools and Input Required

1. Yocto of the appropriate version (but must be 2023.2 and later)
2. Yocto project for Kria SOM of the appropriate version, created by following instructions in [Prepare the Build Environment](https://xilinx.github.io/kria-apps-docs/yocto/build/html/docs/yocto_kria_support.html#prepare-the-build-environment)

The following hardware design hand-off artifacts are required:

1. PL bitstream: Applies to Vivado or Vitis designs
2. Device tree overlay source file: Create this file based on the PL hardware design
3. json file: Specifies if the overlay is slotted or flat and required by dfx-mgr. More information can be found [here](./target.md)
4. xclbin file: Only applies to Vitis designs

### Creating the .dtbo File

After following the [Prepare the Build Environment](https://xilinx.github.io/kria-apps-docs/yocto/build/html/docs/yocto_kria_support.html#prepare-the-build-environment) instructions, you should be in ```$yocto_workspace/build```.

1. Create a folder ```$yocto_workspace/sources/meta-kria/recipes-firmware/<firmware-name>/files```. Put the artifacts, ```<firmware-name>.dtsi```, ```<firmware-name>.bit```, ```<firmware-name>.xclbin```, and  ```<firmware-name>.dtsi``` in the folder you just created.

2. Create a file ```$yocto_workspace/sources/meta-kria/recipes-firmware/<firmware-name>/<firmware-name>.bb``` with the following content. You can find the appropriate ```<machine-name>``` in [Kria Yocto Support page](https://xilinx.github.io/kria-apps-docs/yocto/build/html/docs/yocto_kria_support.html).

   ```python
   LICENSE = "MIT"
   LIC_FILES_CHKSUM = "file://${COMMON_LICENSE_DIR}/MIT;md5=0835ade698e0bcf8506ecda2f7b4f302"

   inherit dfx_user_dts

   SRC_URI = "\
      file://<firmware-name>.bit \
      file://<firmware-name>.dtsi \
      file://shell.json \
      file://<firmware-name>.xclbin \
      "

   COMPATIBLE_MACHINE ?= "^$"
   COMPATIBLE_MACHINE:<machine-name> = "<machine-name>"
   ```

3. In ```$yocto_workspace/build/conf/local.conf```, add the following:

      ```python
      MACHINE_FEATURES += "fpga-overlay"
      IMAGE_INSTALL:append = " \
            <firmware-name> \
            fpga-manager-script \
            "
      ```

4. Bitbake the recipe with the following command:

      ```python
      MACHINE=<machine-name> bitbake <firmware-name> 
      ```

5. Find the compiled .dtbo files in various locations in ```$yocto_workspace/build``` using the command, ```find * -iname <firmware-name>.dtbo```.

6. If you build the .wic image using the following command, then find the firmware (.bit.bin, .dtbo, .xclbin, .json files) on target in ```/lib/firmware/xilinx/<firmware-name>```.

   ```python
   MACHINE=<machine-name> bitbake kria-image-full-cmdline 
   ```

## Using the fpgamanger_custom Bitbake Class in PetaLinux

The `fpgamanager_custom` bitbake class is a helper class to generate a set of FPGA firmware binaries. This method requires that you handwrite your own .dtsi file. This has been depreciated starting in 2024.1. The same bitbake class applies for Yocto, but this section aims to provide an example of how to use this bitbake class in PetaLinux.

### Tools and Input Required

1. PetaLinux of the appropriate version
2. SOM BSP of the appropriate release

The following hardware design hand-off artifacts are required:

1. PL bitstream: Applies to Vivado or Vitis designs
2. Device tree overlay source file: Create this file based on the PL hardware design
3. json file: Specifies if the overlay is slotted or flat and required by dfx-mgr. More information can be found [here](./target.md)
4. xclbin file: Only applies to Vitis designs

### Generate .dtbo file (Yocto)

For example .dtsi files based on the `fpgamanager_custom` class used in the AMD accelerated applications, refer to [Kria apps firmware](https://github.com/Xilinx/kria-apps-firmware).

First. create 

### Generate .dtbo file

For example .dtsi files based on the `fpgamanager_custom` class used in the AMD accelerated applications, refer to [Kria apps firmware](https://github.com/Xilinx/kria-apps-firmware).

1. First, run the following command to create a new PetaLinux project from the provided SOM BSP file:

   ```bash
   petalinux-create -t project -s xilinx-<board>-<version>.bsp
   cd xilinx-<board>-<version>
   ```

2. The following steps assume you have created a PetaLinux project and built it. If the project has not been built, run this command to configure the project:

   ```bash
   petalinux-config --silentconfig 
   ```

3. Run the following command to generate a new firmware recipe:

   ```bash
   petalinux-create -t apps --template fpgamanager -n user-firmware --enable --srcuri "user.bit user.dtsi user.xclbin shell.json"
   ```

   The generated recipe is located in
   `project-spec/meta-user/recipes-apps/user-firmware/user-firmware.bb`.

   The recipe contains the minimum required elements but can be further customized for your needs.

   Then the .dtbo file is generated when building PetaLinux again.

   ```bash
   petalinux-build
   ```

   The newly generated .dtbo file is found in ```$tmp_folder/sysroots-components/zynqmp_generic/user-firmware/lib/firmware/xilinx/user-firmware/user-firmware.dtbo```. The `$tmp_folder` location is found in ```project-spec/configs/config CONFIG_TMP_DIR_LOCATION=$tmp_folder```.

## Using the fpgamanger_dtg Bitbake Class in PetaLinux

Alternatively, you can use the `fpgamanager_dtg` bitbake class which uses the AMD device tree generator (dtg) to generate a device tree overlay from a Vivado or Vitis-generated XSA file.

### Tools and Input Required

1. PetaLinux of the appropriate version
2. SOM BSP of the appropriate release

The following hardware design hand-off artifacts are required:

1. XSA file (must include bitstream): Applies to Vivado or Vitis designs
2. json file: Specifies if the overlay is slotted or flat and required by dfx-mgr. More information can be found [here](./target.md)
3. xclbin file: Only applies to Vitis designs
4. The .dtsi file is not required and is generated, but optionally, you can add a device tree source file that is appended to the dtg-generated device tree file

### Generate the .dtbo File

1. First, run the following command to create a new PetaLinux project from the provided SOM BSP file:

   ```bash
   petalinux-create -t project -s xilinx-<board>-<version>.bsp
   cd xilinx-<board>-<version>
   ```

2. The following steps assume you already created a petalinux project and built it. If the project has not been built, run this command to configure the project:

   ```bash
   petalinux-config --silentconfig 
   ```

3. Run the following command to generate a new firmware recipe:

   ```bash
   petalinux-create -t apps --template fpgamanager_dtg -n user-firmware --enable --srcuri "user.xsa user.xclbin shell.json"
   ```

   The generated recipe is located in `project-spec/meta-user/recipes-apps/user-firmware/user-firmware.bb`.

   The recipe contains the minimum required elements but can be further customized for your needs. If you want to inspect the generated .dtsi file without petalinux/yocto cleaning things up after a successful build, add this variable into your recipe: ```RM_WORK_EXCLUDE += "${PN}"```
   The .dtsi file is found in ```<tmpworkspace>/work/zynqmp_generic-xilinx-linux/user-firmware/1.0-r0/build/user-firmware/pl.dtsi```.

   Then the .dtbo file is be generated when building PetaLinux again.

   ```bash
   petalinux-build
   ```

The newly generated .dtbo file is found at ```$tmp_folder/sysroots-components/zynqmp_generic/user-firmware/lib/firmware/xilinx/user-firmware/user-firmware.dtbo```.
The `$tmp_folder` location is found at ```project-spec/configs/config CONFIG_TMP_DIR_LOCATION=$tmp_folder```.

## Example

A step by step example for generating the .dtbo file for SmartCam from its platform .xsa file can be found [here](./dtsi_dtbo_generation_smartcam_example.md).

<hr class="sphinxhide"></hr>

<p class="sphinxhide" align="center"><sub>Copyright © 2023-2025 Advanced Micro Devices, Inc.</sub></p>

<p class="sphinxhide" align="center"><sup><a href="https://www.amd.com/en/corporate/copyright">Terms and Conditions</a></sup></p>
