# Vitis Accelerator Flow
This flow is for developers using Xilinx provided SOM Starter Kit Vitis Platforms as a basis for generating their own PL accelerators. Developers use a Vivado Extensible Platform (.xsa) file provided by Xilinx and import it into a Vitis Platform project. Developers then create their own overlay accelerator(s) within the bounds of the provided Vitis Platform, and generate a new bitstream (.bit file converted to .bit.bin) and metadata container file (.xclbin). Developers can use the existing device tree blob (.dtb) associated with the Xilinx provided Vitis platform. The resulting application accelerator files are then moved to the target SOM platform to be run. 


To access the .xsa files for different platforms released from Xilinx, refer to [Creating a Vitis Platform](https://xilinx.github.io/kria-apps-docs/main/build/html/docs/build_vitis_platform.html) tutorial to generate .xsa files from released reference design. 

* Constraints: developers must use the same carrier card and physical interface definition as Xilinx provided SOM starter kits and associated Vitis platforms.
* Input: Xilinx provided Vitis platform (.xsa), Xilinx provided Vitis platform device tree (.dtbo)
* Output: .bit, .xclbin


![Tool Flow](./media/tool_flow_vitis_accel.PNG)

## Prerequisites and Assumptions	
This document assume that developers will use 2021.1 or later for their tools and SOM releases. The tool versions should match - e.g. use the same tool versions for PetaLinux, Vivado, and the released BSP. 

1. Vitis tools installation	
2. PetaLinux tool (optional) [installation](https://www.xilinx.com/support/download/index.html/content/xilinx/en/downloadNav/embedded-design-tools.html)
3. PetaLinux [SOM StarterKit BSP download](https://xilinx-wiki.atlassian.net/wiki/spaces/A/pages/1641152513/Kria+K26+SOM#PetaLinux-Board-Support-Packages)

## Step 1 - Aligning Kria SOM boot & SOM Starter Linux infrastructure 
Xilinx built Kria SOM Starter Kit applications on a shared, application-agnostic infrastructure in the SOM Starter Linux including kernel version, Yocto project dependent libraries, and baseline BSP. When using this tutorial, make sure to align tools, git repositories, and BSP released versions.
### PetaLinux BSP Alignment	
The SOM Starter Linux image is generated using the corresponding SOM variant multi-carrier card PetaLinux board support package (BSP). Developers creating applications on the Starter Kit are recommended to use this BSP as a baseline for their application development as it ensures kernel, Yocto project libraries, and baseline configuration alignment. The multi-carrier card BSP defines a minimalistic BSP that has the primary function of providing an application-agnostic operating system, and can be updated and configured dynamically at runtime. 	

## Step 2 - Obtain Platform files and .dtbo files
Developers will need to first decide on which Kria Starter Kit Vitis platform to develop on. The list of platforms can be found in [Creating a Vitis Platform](https://xilinx.github.io/kria-apps-docs/main/build/html/docs/build_vitis_platform.html), which also contains a tutorial to generate Platform files (including .xpfm, .xsa files) from the released reference designs. Alternatively, they can generate their own platform through [Vitis Platform flow](./creating_applications_vitis_platform_flow.md). 

The Vitis Platform repository has the device tree(DT) source associated with the platform captured as a .dtsi file. User can generate the .dtbo from this source using PetaLinux or it can copy a compiled binary from a corresponding pre-built platform application. 

To obtain the corresponding .dtbo file, developers can copy the .dtbo files from target from applications sharing the same platform. They can be located on target, post dnf install in ```/lib/firmware/xilinx/<application name>/<application name>.dtbo```
An example <application name> is kv260-smartcam. 

Alternatively, developers can generate them in Petalinux. 
```
petalinux-create -t project -s xilinx-k26-starterkit-v2021.1-final.bsp
cd xilinx-k26-starterkit-2021.1
petalinux-build -c <application name>
```
The .dtbo file can be found in 
```
$temp_folder/sysroots-components/k26/<application name>/lib/firmware/xilinx/<application name>/<application name>.dtbo
```
location of $temp_folder can be found in ```xilinx-k26-starterkit-2021.1/project-spec/configs/config```

```CONFIG_TMP_DIR_LOCATION="$tmp_folder"```

## <a id="step3"></a>Step 3 - Create .xclbin and .bit.bin file from Vitis
Typically in this work flow, developers will use Makefiles to generate their design. Example Makefiles can be found [here in kv260-vitis repo](https://github.com/Xilinx/kv260-vitis/tree/release-2020.2.2_k26/overlays/examples) and [here in Vitis Library repo](https://github.com/Xilinx/Vitis_Libraries/tree/master/vision/L1/examples).

In the Makefile, developer should use ```PLATFORM``` to associate the application with Vitis Platform. 
```
PLATFORM = <path to Vitis Platform project>.xpfm
```

After a successful make, there should be a .xclbin and .bit file generated. 
To generate a .bit.bin file, create a ```<accelerator>.bif``` file with the following content:
```
all:
{
    <accelerator>.bit
}
```
And then run bitgen to create a binary bitstream ```<accelerator>.bit.bin``` file:
```
bootgen -arch zynqmp -process_bitstream bin -image <accelerator>.bif 

```


## Step 4 - Move user application to the target platform	
After generating the PL design, developers will need to move the required files (.bit.bin, .dtbo, shell.json, and .xclbin for Vitis flow) to target platform using standard tools (e.g. SCP, FTP). Please see [On-target Utilities and Firmware](./creating_applications_target.md) for where to place the application firmware files. 



## Step 5 - Run the user application	
Once the required files are in place, developers can run their applications using the following steps:
*	Use xmutil or dfx-mgr to load the application bitstream	
*	Start their application software

## Examples
* Vitis hardware acceleration tutorials can be found [here](https://github.com/Xilinx/Vitis-Tutorials/tree/2021.2/Hardware_Acceleration). They are not specific to SOM.


### License

Licensed under the Apache License, Version 2.0 (the "License"); you may not use this file except in compliance with the License.

You may obtain a copy of the License at
[http://www.apache.org/licenses/LICENSE-2.0](http://www.apache.org/licenses/LICENSE-2.0)

Unless required by applicable law or agreed to in writing, software distributed under the License is distributed on an "AS IS" BASIS, WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied. See the License for the specific language governing permissions and limitations under the License.

<p align="center">Copyright&copy; 2021 Xilinx</p>
