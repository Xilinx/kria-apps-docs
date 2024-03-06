<table class="sphinxhide">
 <tr>
   <td align="center"><img src="../../media/xilinx-logo.png" width="30%"/><h1>Kria&trade; KV260 Vision AI Starter Kit<br>NLP SmartVision Tutorial</h1>
   </td>
 </tr>
 <tr>
 <td align="center"><h1>Customizing the AI Models Used in the Application</h1>
  </td>
 </tr>
</table>

# Customizing the AI Models Used in the Application

## Introduction

This document provide an overview of how to customize the NLP SmartVision application to use other AI models other than the default ones.

## Prerequisites

Other than the three models provided via the keywords "up" and "down" as documented [here](./app_deployment_nlp.md),

* facedetect (densebox_640_360)
* object Detect (yolov2_voc_pruned_0_77)
* plate Detect (plate_detect)

Customization can be made to use other AMD Vitis&trade; AI models or retrained model by the users of the same class.

### Model Preparation

>**NOTE:**
>
>* The design currently only supports **Vitis AI 2.5.0**.
>* As described in the Hardware Accelerator section, the DPU integrated in the platform uses the **B3136** configuration.

The `arch.json` used to compile the xmodel for B3136 DPU can be obtained by build the accelerator, but if you will not build all from the start, you can save the following code as `arch.json`:

```json
{
    "fingerprint":"0x1000020F6014405"
}
```

For detailed instructions on obtaining an alternative model from the model zoo or training, pruning, quantizing, and compiling a new model, refer to the *Vitis AI User Guide* ([UG1414](https://docs.xilinx.com/access/sources/dita/map?isLatest=true&ft:locale=en-US&url=ug1414-vitis-ai)).

## Next Steps

* Go back to the [KV260 SOM NLP SmartVision Design Start Page](../nlp_smartvision_landing)

## References

* *Vitis AI User Guide* ([UG1414](https://docs.xilinx.com/access/sources/dita/map?isLatest=true&ft:locale=en-US&url=ug1414-vitis-ai))

### License

Licensed under the Apache License, Version 2.0 (the "License"); you may not use this file except in compliance with the License.

You may obtain a copy of the License at
[http://www.apache.org/licenses/LICENSE-2.0](http://www.apache.org/licenses/LICENSE-2.0).

Unless required by applicable law or agreed to in writing, software distributed under the License is distributed on an "AS IS" BASIS, WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied. See the License for the specific language governing permissions and limitations under the License.

<p align="center">Copyright&copy; 2021-2023 Advanced Micro Devices, Inc</p>
