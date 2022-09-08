<table class="sphinxhide">
 <tr>
   <td align="center"><img src="../../media/xilinx-logo.png" width="30%"/><h1>Kria&trade; KV260 Vision AI Starter Kit<br>AIBox-Dist Tutorial</h1>
   </td>
 </tr>
 <tr>
 <td align="center"><h1>Customizing the AI Models used in the application</h1>

 </td>
 </tr>
</table>

# Customizing the AI Models used in the application

## Introduction

This document provides an overview of how to customize the AIBox-Dist application to use other AI models other than the default ones.

## Prerequisites

As the AIBox-Dist application is using two kinds of models listed below, customization can be made to use other models of the same class either from Vitis AI Library or retrained by the user.

 * Pedestrian detection (refinedet_pruned_0_96)
 * ReID (personreid-res18_pt)


### Model Preparation

**Note** The design currently only supports  **Vitis AI 2.5.0**

The arch.json used to compile the xmodel for B3136 DPU can be obtained by build the accelerator, but if you won't build all from the start, you can just save following code as arch.json file.

```json
{
    "fingerprint":"0x1000020F6014406"
}
```

For detailed instructions on obtaining an alternative model from the Xilinx model zoo or training, pruning, quantizing, and compiling a new model, please refer to the [Vitis AI 2.5.0 documentation](https://www.xilinx.com/support/documentation/sw_manuals/vitis_ai/1_4/ug1414-vitis-ai.pdf)

**Note** As described in the [Hardware Accelerator section](hw_arch_accel_aib.md), the DPU integrated in the platform uses the B3136 configuration.

### Configuration files:

To integrate a different .xmodel into the AIBox application, the following configuration files must be updated accordingly:

* Pedestrian Detection Config

   The "model-name" and "model-path" in `/opt/xilinx/share/ivas/aibox-dist/refinedet.json` can be customized to use different pedestrian models xmdel file at `${model-path}/${model-name}/${model-name}.xmodel `

```json
    "config": {
        "model-name" : "refinedet_pruned_0_96",
        "model-class" : "REFINEDET",
        "model-path" : "/opt/xilinx/share/vitis_ai_library/models/aibox-dist",
        "run_time_model" : false,
        "need_preprocess" : true,
        "performance_test" : false,
        "debug_level" : 0
    }
```

* ReID Config

   The "model-name" and "model-path" in `/opt/xilinx/share/ivas/aibox-dist/reid.json` can be customized to use different ReID models xmdel file at `${model-path}/${model-name}/${model-name}.xmodel `

```json
    "config": {
        "model-path": "/opt/xilinx/share/vitis_ai_library/models/kv260-aibox-dist/",
        "model-name": "personreid-res18_pt",
        "debug": 0
    }
```
## Next Steps
* Go back to the [KV260 SOM AIBox-Dist design start page](../aibox_landing)

## References
* *Vitis AI User Guide* ([UG1414](https://www.xilinx.com/support/documentation/sw_manuals/vitis_ai/2_5/ug1414-vitis-ai.pdf))

### License

Licensed under the Apache License, Version 2.0 (the "License"); you may not use this file except in compliance with the License.

You may obtain a copy of the License at
[http://www.apache.org/licenses/LICENSE-2.0](http://www.apache.org/licenses/LICENSE-2.0)

Unless required by applicable law or agreed to in writing, software distributed under the License is distributed on an "AS IS" BASIS, WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied. See the License for the specific language governing permissions and limitations under the License.

<p align="center">Copyright&copy; 2021 Xilinx</p>
