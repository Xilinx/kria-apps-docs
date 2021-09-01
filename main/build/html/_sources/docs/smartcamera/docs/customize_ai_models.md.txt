<table class="sphinxhide">
 <tr>
   <td align="center"><img src="../../media/xilinx-logo.png" width="30%"/><h1>Kria&trade; KV260 Vision AI Starter Kit<br>Smart Camera Tutorial</h1>
   </td>
 </tr>
 <tr>
 <td align="center"><h1>Customizing the AI Models used in the application</h1>

 </td>
 </tr>
</table>

# Customizing the AI Models used in the application

## Introduction

This document provides an overview of how to customize the default smartcam application to use other AI models.

## Prerequisites

Other than the 3 models provided via command line option `--aitask` as documented [here](app_deployment.md),

* facedetect (densebox_320_320)
* refinedet (refinedet_pruned_0_96)
* ssd (ssd_adas_pruned_0_95)

customization can be made to use other Vitis AI models or retrained model by the users of the same class.

### Model Preparation

**Note** The design currently only supports **Vitis AI 1.4.0**

**Note** As described in the Hardware Accelerator section, the DPU integrated in the platform uses the **B3136** configuration.

The arch.json used to compile the xmodel for B3136 DPU can be obtained by build the accelerator, but if you won't build all from the start, you can save following code as arch.json

```json
{
    "fingerprint":"0x1000020F6014406"
}
```

For detailed instructions on obtaining an alternative model from the Xilinx model zoo or training, pruning, quantizing, and compiling a new model, please refer to the [Vitis AI documentation](https://www.xilinx.com/support/documentation/sw_manuals/vitis_ai/1_3/ug1414-vitis-ai.pdf).

### Configuration files

To integrate a different .xmodel into the SmartCam application, the following configuration files must be updated accordingly:

* AI Inference Config:

    Take the refinedet aiinference.json `/opt/xilinx/share/ivas/smartcam/refinedet/aiinference.json` as an example,
```json
    {
        "ivas-library-repo": "/usr/lib/",
            "element-mode":"inplace",
            "kernels" :[
            {
                "library-name":"libivas_xdpuinfer.so",
                "config": {
                    "model-name" : "refinedet_pruned_0_96",
                    "model-class" : "REFINEDET",
                    "model-path" : "/opt/xilinx/share/vitis_ai_library/models/kv260-smartcam",
                    "run_time_model" : false,
                    "need_preprocess" : false,
                    "performance_test" : false,
                    "debug_level" : 0
                }
            }
            ]
    }
```
   You can change the "model-name" and "model-path" fields to use the customized xmdel file at `${model-path}/${model-name}/${model-name}.xmodel`.

   Pay attention to the field "need_preprocess", which is now "false", tells Vitis AI Library the input buffer is already the resized and quantized BGR image as required by the model. And the preprocess is done by the preprocess plugin with the proper configuration which will be detailed in next section.

   When you set the "need_preprocess" here to "true" for some reason, you should also make change to the process configuration to ask the preprocess IP works just as colour conversion and resizing.

* Preprocess Config:

```json
    "config": {
        "debug_level" : 1,
        "mean_r": 123,
        "mean_g": 117,
        "mean_b": 104,
        "scale_r": 1,
        "scale_g": 1,
        "scale_b": 1
    }
```

The configuration value of mean/scale for r/g/b channels should be the same as the ones specified in Vitis AI Model prototxt file. For example, following  is taken from /opt/xilinx/share/ivas/smartcam/refinedet/preprocess.json.

```prototxt
model {
name : "refinedet_480x360_5G"
    kernel {
    name: "refinedet_480x360_5G"
    mean: 104.0
    mean: 117.0
    mean: 123.0
    scale: 1.0
    scale: 1.0
    scale: 1.0
    }
}
```

**Notice** the channels sequence in the Vitis AI model prototxt file is B, G, R, not R, G, B, as the above samples show.

## Next Steps

* Go back to the [KV260 SOM Smart camera design start page](../smartcamera_landing)

## References

* Vitis AI User Guide [UG1414](https://www.xilinx.com/support/documentation/sw_manuals/vitis_ai/1_4/ug1414-vitis-ai.pdf)

### License

Licensed under the Apache License, Version 2.0 (the "License"); you may not use this file except in compliance with the License.

You may obtain a copy of the License at
[http://www.apache.org/licenses/LICENSE-2.0](http://www.apache.org/licenses/LICENSE-2.0)


Unless required by applicable law or agreed to in writing, software distributed under the License is distributed on an "AS IS" BASIS, WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied. See the License for the specific language governing permissions and limitations under the License.

<p align="center">Copyright&copy; 2021 Xilinx</p>
