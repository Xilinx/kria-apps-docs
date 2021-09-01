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

# Integrating the overlay into the Platform

## Introduction:
This document provides the steps to integrate the overlay consisting of accelerated functions into the platform. 

## Prerequisites:

* Vitis Unified Software Platform 2020.2.2

### Accessing the Tutorial Reference Files

>**Note**: Skip the following steps if the design files have already been cloned and extracted to a working repository

1. To access the reference files, type the following into a terminal: 

   ```
   git clone --recursive https://github.com/Xilinx/kv260-vitis.git
   ```

2. Navigate to the `kv260-vitis` which is the working directory.

## Integrating an overlay (accelerator functions) into a Vitis Extensible platform

1. Go to the working directory 

   ```
   cd $working_dir/
   ``` 

2. To compile and integrate the overlay into the platform, run the following command. The Makefile calls a lower level Makefile to run Vitis. If a platform is not already available it builds that as well. 

   ```
   make overlay OVERLAY=<application_name>
   ```

   Applications currently supported are listed below

   |Application name |Platform used|
   |----|----|
   |smartcam |kv260_ispMipiRx_vcu_DP|
   |aibox-reid |kv260_vcuDecode_vmixDP|
   |defect-detect |kv260_ispMipiRx_vmixDP|
   |nlp-smartvision |kv260_ispMipiRx_DP|

3. The generated bitfile and xclbin will be located at 

   ```
   $working_dir/overlays/examples/<application_name>/binary_container_1/link/int/system.bit   
   $working_dir/overlays/examples/<application_name>/binary_container_1/*.xclbin
   ```

   The xclbin and bitfile generation may take couple of hours depending on the system specification. They will be used to build the Petaliunx image

## Next Step

* [Building a Petalinux Image](build_petalinux.md)
* Go back to the [KV260 SOM designs start page](../index)

## References

For more information on how to integrate an accelerator into a platform refer to Xilinx Vitis Unified Software Platform Documentation [UG1393](https://www.xilinx.com/support/documentation/sw_manuals/xilinx2020_2/ug1393-vitis-application-acceleration.pdf).

### License

Licensed under the Apache License, Version 2.0 (the "License"); you may not use this file except in compliance with the License.

You may obtain a copy of the License at
[http://www.apache.org/licenses/LICENSE-2.0](http://www.apache.org/licenses/LICENSE-2.0)


Unless required by applicable law or agreed to in writing, software distributed under the License is distributed on an "AS IS" BASIS, WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied. See the License for the specific language governing permissions and limitations under the License.

<p align="center">Copyright&copy; 2021 Xilinx</p>
