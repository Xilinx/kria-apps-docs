<table class="sphinxhide">
 <tr>
   <td align="center"><img src="../../media/xilinx-logo.png" width="30%"/><h1>Kria&trade; KV260 Vision AI Starter Kit<br>NLP SmartVision Tutorial</h1>
   </td>
 </tr>
 <tr>
 <td align="center"><h1>Customizing the AI Models used in the application</h1>
  </td>
 </tr>
</table>

# Customizing the AI Models used in the application

## Introduction

This document provide an overview of how to customize the NLP SmartVision application to use other AI models other than the default ones.

## Prerequisites

Other than the 3 models provided via keywords "up" & "down" as documented [here](./app_deployment_nlp.md),

* facedetect (densebox_640_360)
* object Detect (yolov2_voc_pruned_0_77)
* plate Detect (plate_detect)

customization can be made to use other Vitis AI models or retrained model by the users of the same class.

### Model Preparation

**Note** The design currently only supports **Vitis AI 2.5.0**

**Note** As described in the Hardware Accelerator section, the DPU integrated in the platform uses the **B3136** configuration.

The arch.json used to compile the xmodel for B3136 DPU can be obtained by build the accelerator, but if you won't build all from the start, you can save following code as arch.json

```json
{
    "fingerprint":"0x1000020F6014405"
}
```

For detailed instructions on obtaining an alternative model from the Xilinx model zoo or training, pruning, quantizing, and compiling a new model, please refer to the [Vitis AI documentation](https://www.xilinx.com/support/documentation/sw_manuals/vitis_ai/1_4/ug1414-vitis-ai.pdf).

## Next Steps

* Go back to the [KV260 SOM NLP SmartVision design start page](../nlp_smartvision_landing)

## References

* Vitis AI User Guide [UG1414](https://www.xilinx.com/support/documentation/sw_manuals/vitis_ai/2_5/ug1414-vitis-ai.pdf)

### License

Licensed under the Apache License, Version 2.0 (the "License"); you may not use this file except in compliance with the License.

You may obtain a copy of the License at
[http://www.apache.org/licenses/LICENSE-2.0](http://www.apache.org/licenses/LICENSE-2.0)

Unless required by applicable law or agreed to in writing, software distributed under the License is distributed on an "AS IS" BASIS, WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied. See the License for the specific language governing permissions and limitations under the License.

<p align="center">Copyright&copy; 2021 Xilinx</p>
