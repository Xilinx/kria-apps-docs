<table class="sphinxhide">
 <tr>
   <td align="center"><img src="../../media/xilinx-logo.png" width="30%"/><h1> Kria&trade; K260 SOM Starter Kit NLP SmartVision Tutorial</h1>
   </td>
 </tr>
 <tr>
 <td align="center"><h1> Hardware Architecture of the Accelerator </h1>

 </td>
 </tr>
</table>

# Hardware Architecture of the Accelerator

## Preprocessing IPs and DPU

The Vitis&trade; software platform overlay includes DPU, as shown in the following figure.

![IP_overlay_and_connection_block_diagram](../../media/nlp_smartvision/IP_overlay_and_connection_block_diagram.png)

The DPU IP can be configured, and for this design, the following features should be enabled:

* Channel augmentation
* Depth-wise convolution
* Average pooling
* Relu, LeakyRelu and Relu6
* UltraRAM enable

To learn more about the DPU, refer the *DPUCZDX8G for Zynq UltraScale+ MPSoCs Product Guide* ([PG338](https://docs.xilinx.com/access/sources/dita/map?url=pg338-dpu&ft:locale=en-US)).

As shown in the following table, the DPU is integrated in the nlp_smartvision platform. The utilization is analyzed, and some optimizations of the whole hardware design is done.

|Resource Usage of Current Design (Estimated)|
|-|

||LUTs|BRAM|DSP|URAM|
|----|----|---|----|--|
|K26 Resource|117120|144|1248|64|
|Platform(4K)|14410|43.5|47|1|
|DPU B3136|43366|67|548|44|
|Total used|44%|76.7%|47.6%|70.3%|

As shown in the following table, the DPU performance and overall power on the K26 chip (including all the other IPs) is estimated. The DPU is assumed to run at 300 MHz.

|DPU Performance and Power (Estimated)|
|-|

||TOPS (Peak)|TOPS (DenseBox)1|Power (Overall)2
|-|-|-|-|
|B3136|0.92|0.25|7.9W

>**NOTE:**
>
>1. The DenseBox_640x360 model is used to estimate the real performance of DPU, and this model has 1.1GO Ps.
>2. The overall power of K26 (including DPU and other IPs) is only estimated.

This is shown in Table 3, DPU B3136 Bandwidth Requirements.

|Table 3 – DPU B3136 Bandwidth Requirements|
|-|

|Operation|Peak|Average|
|-|-|-|
|Write (MB/s)|1300|440
|Read (MB/s)|6200|2600

## Next Steps

* [Software Architecture of the Platform](sw_arch_platform_nlp.md)
* Go back to the [KV260 NLP Smartvision Design Start Page](../nlp_smartvision_landing)

## References

DPU

* [https://github.com/Xilinx/Vitis-AI/tree/master/dsa/DPU-TRD](https://github.com/Xilinx/Vitis-AI/tree/master/dsa/DPU-TRD)
* *DPUCZDX8G for Zynq UltraScale+ MPSoCs Product Guide* ([PG338](https://docs.xilinx.com/access/sources/dita/map?url=pg338-dpu&ft:locale=en-US))

### License

Licensed under the Apache License, Version 2.0 (the "License"); you may not use this file except in compliance with the License.

You may obtain a copy of the License at
[http://www.apache.org/licenses/LICENSE-2.0](http://www.apache.org/licenses/LICENSE-2.0).

Unless required by applicable law or agreed to in writing, software distributed under the License is distributed on an "AS IS" BASIS, WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied. See the License for the specific language governing permissions and limitations under the License.

<p align="center">Copyright&copy; 2021-2023 Advanced Micro Devices, Inc</p>
