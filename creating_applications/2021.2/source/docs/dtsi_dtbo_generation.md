# Generating DTSI and DTBO Overlay Files

In this step the Xilinx HW description captured in the custom PL design must be translated into a Linux understandable format. In Linux HW is described using a concept called device trees (DT). The human readable form of these are dts and dtsi files. The PL design is loaded post Linux boot, therefore this step generates a DT overlay. The overlay DT is slightly different than the Linux boot DT - it must define "fragments" that are added dynamically by Linux at runtime. 

For reference, the .dtsi files associated with each platform (but organized by application) can be found in [kv260_firmware](https://github.com/Xilinx/kv260-firmware)

The dts/dtsi files can be generated in a number of ways, all of which require the HW description data captured in the XSA or bit file. After a .dtsi file is generated, it is then compiled into a binary .dtbo file. The .dtbo file is expected in firmware folder for each applications. 

Here are the three recommended ways:

1. In Xilinx Software Command-Line Tools (XSCT), use Device Tree Generator (DTG) and .xsa file to generate .dtsi, and Device Tree Compiler (DTC) to compile a .dtbo file
2. Manually create .dtsi file, and in PetaLinux, use fpgamanger_custom bbclass to create .dtbo
3. In PetaLinux, use fpgamanger_dtg bbclass tools and petalinux-build to generate .dtsi file from .xsa file, and compiling it into .dtbo.


### Using XSTC, DTG and DTC
##### Tools and Input Required:
1. XSTC (should be part of Vivado or Vitis installation)
2. DTG, make sure to check out the version that is aligned to rest of tool chain and BSP used:
```
git clone https://github.com/Xilinx/device-tree-xlnx
cd device-tree-xlnx
git checkout xlnx_rel_v2021.1
```
3. DTC (should be part of Vitis installation, can also be obtained below:)
```
git clone https://git.kernel.org/pub/scm/utils/dtc/dtc.git
cd dtc
make
export PATH=$PATH:/<path-to-dtc>/dtc
```
More information about using Xilinx's Device Tree Generator (DTG) and open source Device Tree Compiler (DTC) can be found in [wiki page](https://xilinx-wiki.atlassian.net/wiki/spaces/A/pages/18842279/Build+Device+Tree+Blob). 

The following hardware design hand-off artifacts are required:
1. XSA file - applies to Vivado or Vitis designs

##### Generate .dtsi from .xsa using DTG
Use XSCT to call HSI & generate DTSI.
```
hsi open_hw_design <design_name.xsa>
hsi set_repo_path <path to device-tree-xlnx repository>
hsi create_sw_design device-tree -os device_tree -proc psu_cortexa53_0
hsi set_property CONFIG.dt_overlay true [hsi::get_os]
hsi generate_target -dir <desired_dts_filename>
hsi close_hw_design [current_hw_design]
```
[current_hw_design] name can be found in output of hsi open_hw_design <design_name.xsa>. An example script for above can be found in the linked example from Vitis Platform Flow [here](https://github.com/Xilinx/Vitis-Tutorials/blob/2021.1/Vitis_Platform_Creation/Design_Tutorials/01-Edge-KV260/ref_files/step2_petalinux/gen_dt.tcl).

A folder <desired_dts_filename> will be created, pl.dtsi is the overlay .dtsi file to be used to compile into .dtbo file. The .dtsi file will require some user modification before it is ready to be compiled. 

##### Compile the .dtsi to .dtbo using DTC
This step takes the human readable defined Linux HW description (dtsi file) generated (.pl.dtsi)and compiles it into a binary form that Linux can directly use. This is completed using the Linux Device Tree Compiler (DTC) which is an opensource tool. The actual command used to generate the desired dtbo from the dtsi file is shown below.
```
dtc -@ -O dtb -o pl.dtbo pl.dtsi
```
Rename the pl.dtbo to the appropriate name. 


### Using fpgamanger_custom bbclass in PetaLinux
The `fpgamanager_custom` bitbake class is a helper class to generate a set of FPGA firmware binaries. This method requires that user hand write their own .dtsi file. 
##### Tools and Input required
1. Petalinux of the appropriate version
2. SOM BSP of the appropriate release

The following hardware design hand-off artifacts are required:
1. PL bitstream - applies to Vivado or Vitis designs
2. Device tree overlay source file - the user needs to create this file based on the PL hardware design
3. json file - specifies if the overlay is slotted or flat and required by dfx-mgr. More information can be found [here](./target.md)
4. Xclbin file - only applies to Vitis designs


##### Generate .dtbo file

Please refer to [kv260-firmware](https://github.com/Xilinx/kv260-firmware) for example dtsi files
based on the `fpgamanager_custom` class used in the Xilinx accelerated
applications.

First, run the following command to create a new Petalinux project from the provided K26 SOM bsp file:
```
petalinux-create -t project -s xilinx-k26-starterkit-2021.1-final.bsp
cd xilinx-k26-starterkit-2021.1
```

The following steps assume you have created a petalinux project and built it. If the project has not been build, run this command to configure the project:

```
petalinux-config --silentconfig 
```

Run the following command to generate a new firmware recipe:

```
petalinux-create -t apps --template fpgamanager -n user-firmware --enable --srcuri "user.bit user.dtsi user.xclbin shell.json"
```

The generated recipe will be located at
`project-spec/meta-user/recipes-apps/user-firmware/user-firmware.bb`

The recipe contains the minimum required elements but can be further customized
by the user for their needs.

Then the .dtbo file will be generated when building petalinux again. 
```
petalinux-build
```
The newly generated .dtbo file can be found at ```$tmp_folder/sysroots-components/zynqmp_generic/user-firmware/lib/firmware/xilinx/user-firmware/user-firmware.dtbo```
$tmp_folder location can be found at ```project-spec/configs/config CONFIG_TMP_DIR_LOCATION=$tmp_folder```

### Using fpgamanger_dtg bbclass in PetaLinux

Alternatively, you can use the `fpgamanager_dtg` bitbake class which uses the Xilinx device tree generator (dtg) to generate a device tree overlay from a Vivado or Vitis-generated XSA file. 

##### Tools and Input required
1. Petalinux of the appropriate version
2. SOM BSP of the appropriate release

The following hardware design hand-off artifacts are required:

1. XSA file (must include bitstream) - applies to Vivado or Vitis designs
2. json file - specifies if the overlay is slotted or flat and required by dfx-mgr. More information can be found [here](./target.md)
3. Xclbin file - only applies to Vitis designs
4. dtsi file is not required and will be generated, but the user can optionally add a device tree source
   file that will be appended to the dtg-generated device tree file

##### Generate .dtbo file 
First, run the following command to create a new PetaLinux project from the provided K26 SOM bsp file:
```
petalinux-create -t project -s xilinx-k26-starterkit-2021.1-final.bsp
cd xilinx-k26-starterkit-2021.1
```

The following steps assume you have created a petalinux project and built it. If the project has not been build, run this command to configure the project:

```
petalinux-config --silentconfig 
```

Run the following command to generate a new firmware recipe:

```
petalinux-create -t apps --template fpgamanager_dtg -n user-firmware --enable --srcuri "user.xsa user.xclbin shell.json"
```

The generated recipe will be located at
`project-spec/meta-user/recipes-apps/user-firmware/user-firmware.bb`

The recipe contains the minimum required elements but can be further customized by the user for their needs. If you want to inspect the generated .dtsi file without petalinux/yocto cleaning things up after a successful build, add this variable into your recipe:
```RM_WORK_EXCLUDE += "${PN}"```
The .dtsi file can be found in ```<tmpworkspace>/work/zynqmp_generic-xilinx-linux/user-firmware/1.0-r0/build/user-firmware/pl.dtsi```


Then the .dtbo file will be generated when building PetaLinux again. 
```
petalinux-build
```
The newly generated .dtbo file can be found at ```$tmp_folder/sysroots-components/zynqmp_generic/user-firmware/lib/firmware/xilinx/user-firmware/user-firmware.dtbo```
$tmp_folder location can be found at ```project-spec/configs/config CONFIG_TMP_DIR_LOCATION=$tmp_folder```



### License

Licensed under the Apache License, Version 2.0 (the "License"); you may not use this file except in compliance with the License.

You may obtain a copy of the License at
[http://www.apache.org/licenses/LICENSE-2.0](http://www.apache.org/licenses/LICENSE-2.0)

Unless required by applicable law or agreed to in writing, software distributed under the License is distributed on an "AS IS" BASIS, WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied. See the License for the specific language governing permissions and limitations under the License.

<p align="center">Copyright&copy; 2021 Xilinx</p>
