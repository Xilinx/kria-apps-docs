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

# Customizing the AI Models Used in the Application

## Introduction

This document provides an overview of how to customize the AIBox-Dist application to use other AI models other than the default ones.

## Prerequisites

As the AIBox-Dist application is using two kinds of the following models, customization can be made to use other models of the same class either from the AMD Vitis&trade; AI Library or retrained by the user.

* Pedestrian detection (refinedet_pruned_0_96)
* ReID (personreid-res18_pt)

### Model Preparation

>**NOTE:** 
>
>* The design currently only supports **Vitis AI 2.5.0**.
>* As described in the Hardware Accelerator section, the DPU-integrated in the platform uses the **B3136** configuration.

The `arch.json` used to compile the xmodel for the B3136 DPU can be obtained by building the accelerator, but if you will not build all from the start, you can obtain the DPU fingerprint by using the following commands on the target SOM:

```bash
    xdputil query
```

You will get output similar to the following:

```bash
...
"kernels":[
  {
...
     "fingerprint":"0x101000016010406",
...
  }
]
```

Save the fingerprint as `arch.json`.

```json
{
    "fingerprint":"0x101000016010406"
}
```

For detailed instructions on obtaining an alternative model from the AMD model zoo or training, pruning, quantizing, and compiling a new model, refer to the *Vitis AI User Guide* ([UG1414](https://docs.xilinx.com/access/sources/dita/map?isLatest=true&ft:locale=en-US&url=ug1414-vitis-ai)).

### Configuration Files

To integrate a different .xmodel into the AIBox application, the following configuration files must be updated accordingly:

* Pedestrian Detection Config

   The "model-name" and "model-path" in `/opt/xilinx/share/ivas/aibox-dist/refinedet.json` can be customized to use different pedestrian models xmdel file at `${model-path}/${model-name}/${model-name}.xmodel`.

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

   The "model-name" and "model-path" in `/opt/xilinx/share/ivas/aibox-dist/reid.json` can be customized to use different ReID models xmdel file at `${model-path}/${model-name}/${model-name}.xmodel`.

```json
    "config": {
        "model-path": "/opt/xilinx/share/vitis_ai_library/models/kv260-aibox-dist/",
        "model-name": "personreid-res18_pt",
        "debug": 0
    }
```

## Next Steps

* Go back to the [KV260 SOM AIBox-Dist Design Start Page](../aibox-dist_landing)

## References

* *Vitis AI User Guide* ([UG1414](https://docs.xilinx.com/access/sources/dita/map?isLatest=true&ft:locale=en-US&url=ug1414-vitis-ai))


<p class="sphinxhide" align="center"><sub>Copyright © 2021-2024 Advanced Micro Devices, Inc</sub></p>

<p class="sphinxhide" align="center"><sup><a href="https://www.amd.com/en/corporate/copyright">Terms and Conditions</a></sup></p>