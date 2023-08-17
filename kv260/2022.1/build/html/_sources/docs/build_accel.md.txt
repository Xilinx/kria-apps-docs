<table class="sphinxhide">
 <tr>
   <td align="center"><img src="media/xilinx-logo.png" width="30%"/><h1> Kria&trade; KV260 Vision AI Starter Kit Tutorial</h1>
   </td>
 </tr>
 <tr>
 <td align="center"><h1>Integrating the overlay into the Platform</h1>

 </td>
 </tr>
</table>

# Integrate Accelerator Overlay

## Introduction

This document provides the steps to integrate the overlay consisting of accelerated functions into the platform.

## Prerequisites

* AMD Vitis&trade; Unified Software Platform 2021.1

### Accessing the Tutorial Reference Files

>**NOTE:** Skip the following steps if the design files have already been cloned and extracted to a working repository.

1. To access the reference files, type the following into a terminal:

   ```
   git clone --branch xlnx_rel_v2022.1 --recursive https://github.com/Xilinx/kria-vitis-platforms.git
   ```

2. Navigate to the `kria-vitis-platforms/kv260-vitis` which is the working directory.

## Integrating an Overlay (Accelerator Functions) into a Vitis Extensible Platform

1. Go to the working directory.

   ```
   cd $working_dir/
   ``` 

2. To compile and integrate the overlay into the platform, run the following command. The Makefile calls a lower-level Makefile to run Vitis. If a platform is not already available, it builds that as well.

   ```
   make overlay OVERLAY=<application_name>
   ```

   Applications currently supported are listed as follows:

   |Application name |Platform used|
   |----|----|
   |smartcam |kv260_ispMipiRx_vcu_DP|
   |aibox-reid |kv260_vcuDecode_vmixDP|
   |defect-detect |kv260_ispMipiRx_vmixDP|
   |nlp-smartvision |kv260_ispMipiRx_rpiMipiRx_DP|

3. The generated bitfile and xclbin will be located at:

   ```
   $working_dir/overlays/examples/<application_name>/binary_container_1/link/int/system.bit   
   $working_dir/overlays/examples/<application_name>/binary_container_1/*.xclbin
   ```

   The xclbin and bitfile generation might take couple of hours depending on the system specification. They will be used to build the PetaLiunx image.

## Next Step

* [Generate Custom Firmware](generating_custom_firmware.md)
* Go back to the [KV260 SOM Designs Start Page](../index)

## References

For more information on how to integrate an accelerator into a platform, refer to the *Vitis Unified Software Platform Documentation: Application Acceleration Development* ([UG1393](https://docs.xilinx.com/access/sources/dita/map?isLatest=true&ft:locale=en-US&url=ug1393-vitis-application-acceleration)).

### License

Licensed under the Apache License, Version 2.0 (the "License"); you may not use this file except in compliance with the License.

You may obtain a copy of the License at
[http://www.apache.org/licenses/LICENSE-2.0](http://www.apache.org/licenses/LICENSE-2.0)

Unless required by applicable law or agreed to in writing, software distributed under the License is distributed on an "AS IS" BASIS, WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied. See the License for the specific language governing permissions and limitations under the License.

<p align="center">Copyright&copy; 2021-2023 Xilinx</p>
