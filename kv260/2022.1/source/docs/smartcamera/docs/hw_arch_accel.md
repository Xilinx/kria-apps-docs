<table class="sphinxhide">
 <tr>
   <td align="center"><img src="../../media/xilinx-logo.png" width="30%"/><h1> Kria&trade; KV260 Vision AI Starter Kit <br> Smart Camera Tutorial</h1>
   </td>
 </tr>
 <tr>
 <td align="center"><h1> Hardware Architecture of the Accelerator </h1>

 </td>
 </tr>
</table>

# Hardware Architecture of the Accelerator

## Preprocessing IPs and DPU

The AMD Vitis&trade; software platform overlay includes the preprocessing IPs and DPU.

The preprocessing block as shown in the following figure includes the following functions:

![preprocessing block](../../media/preprocess_sc.png)

* Cvtcolor: Reads an NV12 video frame, and converts the color format to BGR.
* Resizing: Scales down the original 4K/1080p frame to at most 720x720.
* Quantizing: Performs linear transformation (scaling and shifting) to each pixel of the BGR frame to satisfy the DPU input requirement

The desgin uses Vitis Vision Library functions to build the pre-processing block. The Vitis functions used are, cvtcolor, resize, and blobfromimage.

The DPU IP as shown in the following figure can be configured.

![dpu ip](../../media/dpu_sc.png)

For this design, the following features should be enabled:

* Channel augmentation
* Depth-wise convolution
* Average pooling
* Relu, LeakyRelu and Relu6
* UltraRAM enable

To learn more about the DPU, refer to DPUCZDX8G for *Zynq UltraScale+ MPSoCs Product Guide* ([PG338](https://www.xilinx.com/support/documentation/ip_documentation/dpu/v3_2/pg338-dpu.pdf)).

Vitis integrates the preprocessing IP and DPU IP in the platform. The following table shows the utilization numbers after optimization of the hardware design.

**Resource Usage of the Current Design**

|K26|CLB LUTs|BRAM|DSP|URAM|
|----|----|---|----|--|
|Available|117120|144|1248|64|
|Platform|18634|19.5|1|8
|Pre-processing|11133|15|37|0|
|DPU B3136|45433|67|548|44|
|Other*|2700|0|0|0|
|Total|77884|101.2|586|52|
|Total %|66.50%|70.49%|46.96%|81.25%|

Other*: AXI interconnects and Interrupt concat block added by Vitis.

The following table shows the estimated DPU performance and overall power on the K26 chip (including 4K based pre-processing and other IPs). The DPU runs at 300 MHz/600 MHz.

**DPU Performance and Power (Estimated)**

||TOPS (Peak)|TOPS (DenseBox)1|Power (Overall)2
|-|-|-|-|
|B3136|0.92|0.25|7.9W

>**NOTE:**
>
>1. You use the DenseBox_640x360 model to estimate the real performance of DPU, and this model has 1.1 GOPs.
>2. You can only estimate the overall power of the K26 chip (including DPU and other IPs).

DPU B3136 bandwidth estimates are shown in the following table.

**DPU B3136 Bandwidth Estimates**

|Operation|Peak|Average|
|-|-|-|
|Write (MB/s)|1300|440
|Read (MB/s)|6200|2600

## Next Steps

* [Software Architecture of the Platform](sw_arch_platform.md)
* Go back to the [KV260 AI Box Design Start Page](../smartcamera_landing)

## References

Vitis Vision Functions:

* [https://github.com/Xilinx/Vitis_Libraries/tree/master/vision/L2/examples/cvtcolor](https://github.com/Xilinx/Vitis_Libraries/tree/master/vision/L2/examples/cvtcolor)
* [https://github.com/Xilinx/Vitis_Libraries/tree/master/vision/L2/examples/resize](https://github.com/Xilinx/Vitis_Libraries/tree/master/vision/L2/examples/resize)
* [https://github.com/Xilinx/Vitis_Libraries/tree/master/vision/L3/benchmarks/blobfromimage](https://github.com/Xilinx/Vitis_Libraries/tree/master/vision/L3/benchmarks/blobfromimage)

DPU:

* [https://github.com/Xilinx/Vitis-AI/tree/master/dsa/DPU-TRD](https://github.com/Xilinx/Vitis-AI/tree/master/dsa/DPU-TRD)
* *DPUCZDX8G for Zynq UltraScale+ MPSoCs Product Guide* ([PG338](https://docs.xilinx.com/access/sources/dita/map?url=pg338-dpu&ft:locale=en-US))

### License

Licensed under the Apache License, Version 2.0 (the "License"); you may not use this file except in compliance with the License.

You may obtain a copy of the License at
[http://www.apache.org/licenses/LICENSE-2.0](http://www.apache.org/licenses/LICENSE-2.0).

Unless required by applicable law or agreed to in writing, software distributed under the License is distributed on an "AS IS" BASIS, WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied. See the License for the specific language governing permissions and limitations under the License.

<p align="center">Copyright&copy; 2022-2023 Advanced Micro Devices, Inc</p>
