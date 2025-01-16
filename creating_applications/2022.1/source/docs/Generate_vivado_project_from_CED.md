# Generate a Vivado Project from Example Project

This tutorial details how to generate an example Vivado Project for your StarterKit from Vivado Example Projects. The example Vivado projects are used to generate .xsa file in AMD's Yocto flow for Kria SOM.

* Assumption: Vivado 2024.2 and later
* Input: Vivado Example project
* Output: .bit or .xsa files

## Prerequisites and Assumptions

Tool requirement:

* Vivado tools installation that is 2024.2 and later

## Create Vivado project from Vivado Example Projects

This flows starts with Vivado example projects containing information on K26, K24, KV260 CC, KR260 CC or KD240 CC. The example projects are also used to generate .xsa files for default Yocto flow.

The K26/K24 SOM is supported in Vivado with example designs that configure SOM based peripherals, such as DDR, eMMC (for production SOM), etc.

The KV260/KR260/KD240 StarterKit is supported in Vivado with example designs that configure both StarterKit SOM and CC based peripherals, such as DDR, USB, Ethernet, fan control, etc. It does not contain peripheral such as eMMC by default, as thats available on Production SOM only.

Open Vivado, click on ```Open Example Project```:

![CED 1](./media/CED1.PNG)

click through ```next```, search for ```kria``` in template, and select ```Kria Starter Kit Example Design``` and click on ```next```.

![CED 2](./media/CED2.PNG)

Provide the desired project name and location and click on ```next```. Then select the designed hardware configuration and click on ```next```. 

![CED 3](./media/CED3.PNG)

Then select ```Default bitstream``` and click on ```Next```:

![CED 4](./media/CED4.PNG)

click ```Finish```. A vivado base project for the desired Kria Starter Kit is created.

## Optional: Make the Platform an Extensible Platform

If the project is meant for a Vitis platform, developers can now indicate that the platform is an Extensible Vitis Platform. More details on how to create Extensible Platform can be found in [UG1393](https://docs.xilinx.com/r/en-US/ug1393-vitis-application-acceleration/Adding-Hardware-Interfaces)
Project Manager -> Settings -> General -> check "Project is an extensible Vitis Platform"
![Extensible Platform](./media/extensible_check.PNG)

Then check window -> platform setup to select interfaces to be exposed as a platform. Below is an example snapshot indicating Vivado is reserving pl_ps_irq0 for the platform to interface with Vitis accelerators.
![Platform setup](./media/tool_flow_vivado_platform_setup.PNG)

### Generate Wrapper

We need to now generate a wrapper or top module for the block design:

```Block Design window -> sources window -> Design Sources -> right click on design_1``` and select ```Generate HDL wrapper```:

![wrapper](./media/create_HDL_wrapper.PNG)

In the pop-up, select "Let Vivado manage wrapper and auto-update" and press OK.

## Generate bitstream

Now we are ready to generate bitstream. To generate bitstream, click on Program and Debug -> Generate Bitstream. This process will take some time.


## Generate .xsa file

After generating bitstream, we can generate a .xsa file for either Yocto, PetaLinux, or Vitis to import. Go to ```File -> Export -> Export Hardware``` to launch the Export Hardware Platform wizard. This wizard can also be launched by Export Platform button in Flow Navigator or Platform Setup window.

Click through ```next```, leaving most in default except in ```Select Platform State``` select ```Pre-synthesis, enable Include Bitstream```
Click Finish.

A .xsa file is generated. The export path is reported in the Tcl console.

## License

Licensed under the Apache License, Version 2.0 (the "License"); you may not use this file except in compliance with the License.

You may obtain a copy of the License at
[http://www.apache.org/licenses/LICENSE-2.0](http://www.apache.org/licenses/LICENSE-2.0)

Unless required by applicable law or agreed to in writing, software distributed under the License is distributed on an "AS IS" BASIS, WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied. See the License for the specific language governing permissions and limitations under the License.

<p class="sphinxhide" align="center">Copyright&copy; 2023 Advanced Micro Devices, Inc</p>