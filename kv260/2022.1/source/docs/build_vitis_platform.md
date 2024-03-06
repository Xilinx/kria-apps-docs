<table class="sphinxhide">
 <tr>
   <td align="center"><img src="/docs/media/xilinx-logo.png" width="30%"/><h1> Kria&trade; KV260 Vision AI Starter Kit Tutorial</h1>
   </td>
 </tr>
 <tr>
 <td align="center"><h1>Creating a Vitis Platform</h1>

 </td>
 </tr>
</table>

# Build Vitis Platform

## Introduction

This tutorial shows how to build a platform for applications running on the KV260 Vision AI Starter Kit.

## Prerequisites

* AMD Vitis&trade; Unified Software Platform of the appropiate version

### Accessing the Tutorial Reference Files

> **NOTE:** Skip the following steps if the design files have already been cloned and extracted to a working repository.

1. To access the reference files, type the following into a terminal:

   ```
   git clone --branch xlnx_rel_v2022.1 --recursive https://github.com/Xilinx/kria-vitis-platforms.git
   ```
  
2. Navigate to the `kria-vitis-platforms/kv260`, which is the working directory.

## Generating an Vitis Extensible Platform

1. Go to the working directory.

   ```
   cd $working_dir
   ```

2. To build the platform, run the following command. The Makefile calls a lower-level Makefile to generate a platform. If an XSA is not already available, it builds that as well.

   ```
   make platform PFM=<platform_name>
   ```

   Applications and their corresponding platforms are listed in the following table.

   |Application |Platform|
   |----|----|
   |smartcam |kv260_ispMipiRx_vcu_DP|
   |aibox-reid |kv260_vcuDecode_vmixDP|
   |defect-detect |kv260_ispMipiRx_vmixDP|
   |nlp-smartvision |kv260_ispMipiRx_rpiMipiRx_DP|

3. The generated platform will be located at:

   ```
   $working_dir/platforms/xilinx_<platform_name>_<version_number>
   ```

   The xpfm file in the above directory will be used as the input when building the Vitis accelerator projects. It exposes all the essential platform interfaces like Clock, Interrupts, Master AXI4 interfaces and Slave AXI4 interfaces for the accelerator to connect to.

> **NOTE:** The software components (boot, smp_linux etc) in this platform are empty. The software components will be generated later when building PetaLinux.

## Next Step

* [Integrating an Overlay into the Platform](build_accel.md)
* Go back to the [KV260 SOM Designs Start Page](../index)

## References

For more information on how to generate a platform, refer to the *Vitis Unified Software Platform Documentation: Application Acceleration Development* ([UG1393](https://docs.xilinx.com/access/sources/dita/map?isLatest=true&ft:locale=en-US&url=ug1393-vitis-application-acceleration)).

### License

Licensed under the Apache License, Version 2.0 (the "License"); you may not use this file except in compliance with the License.

You may obtain a copy of the License at
[http://www.apache.org/licenses/LICENSE-2.0](http://www.apache.org/licenses/LICENSE-2.0).

Unless required by applicable law or agreed to in writing, software distributed under the License is distributed on an "AS IS" BASIS, WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied. See the License for the specific language governing permissions and limitations under the License.

<p align="center">Copyright&copy; 2021-2023 Advanced Micro Devices, Inc</p>
