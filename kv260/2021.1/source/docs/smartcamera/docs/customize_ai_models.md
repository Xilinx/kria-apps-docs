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

## Example

Take Vitis AI model ssd_mobilenet_v2 as example, we provide the detailed steps to add an AI task for smartcam application.

1. Create folder `ssd_mobilenet_v2` under `/opt/xilinx/share/ivas/smartcam/`, so that `ssd_mobilenet_v2` can be used as the value for argument --AItask.

2. Download model file for GPU from the link provided by <https://github.com/Xilinx/Vitis-AI/blob/master/models/AI-Model-Zoo/model-list/cf_ssdmobilenetv2_bdd_360_480_6.57G_1.4/model.yaml>

    After extraction, we get such file sturcture:

    ```
    ├── README.md
    ├── code
    │   ├── gen_data
    │   │   └── gen_quantize_data_list.py
    │   ├── test
    │   │   ├── demo.sh
    │   │   ├── demo_list.txt
    │   │   ├── demo_quantized.sh
    │   │   ├── evaluation.py
    │   │   ├── gt_labels.txt
    │   │   ├── images.txt
    │   │   ├── quantize.sh
    │   │   └── result.txt
    │   └── train
    │       ├── solver.prototxt
    │       └── trainval.sh
    ├── data
    │   ├── convert_jsonTotxt.py
    │   └── data_preprocess.sh
    ├── float
    │   ├── quantize.prototxt
    │   ├── test.prototxt
    │   ├── trainval.caffemodel
    │   └── trainval.prototxt
    ├── labelmap_voc.prototxt
    └── quantized
        ├── deploy.caffemodel
        ├── deploy.prototxt
        ├── quantized_test.prototxt
        ├── quantized_train_test.caffemodel
        └── quantized_train_test.protot
    ```

3. Prepare ssd_mobilenet_v2 Model `ssd_mobilenet_v2.xmodel` for DPU 3136 and put generated xmodel files together with the prototxt file to:

    `/opt/xilinx/share/vitis_ai_library/models/kv260-smartcam/ssd_mobilenet_v2/`
     ssd_mobilenet_v2.prototxt

    ```
      opt
      └── xilinx
          └── share
              └── vitis_ai_library
                  └── models
                      └── kv260-smartcam
                          └── ssd_mobilenet_v2
                              ├── ssd_mobilenet_v2.prototxt
                              └── ssd_mobilenet_v2.xmodel
    ```

4. Create configuration files for ssd_mobilenet_v2.

* preprocess.json

    The mean and scale of B, G, R channel is taken from the deploy.protxt of the model.

    ```prototxt
    layer {
      name: "data"
      type: "Input"
      top: "data"
      transform_param {
        mean_value: 104
        mean_value: 117
        mean_value: 123
        resize_param {
          prob: 1
          resize_mode: WARP
          height: 360
          width: 480
          interp_mode: LINEAR
        }
      }
      input_param {
        shape {
          dim: 1
          dim: 3
          dim: 360
          dim: 480
        }
      }
    }
    ```

     ```json
     {
      "xclbin-location":"/lib/firmware/xilinx/kv260-smartcam/kv260-smartcam.xclbin",
      "ivas-library-repo": "/opt/xilinx/lib",
      "kernels": [
        {
          "kernel-name": "pp_pipeline_accel:pp_pipeline_accel_1",
          "library-name": "libivas_xpp.so",
          "config": {
            "debug_level" : 0,
            "mean_r": 123,
            "mean_g": 117,
            "mean_b": 104,
            "scale_r": 1,
            "scale_g": 1,
            "scale_b": 1
          }
        }
      ]
    }
     ```

* aiinference.json:

   ```json
   {
    "xclbin-location":"/lib/firmware/xilinx/kv260-smartcam/kv260-smartcam.xclbin",
    "ivas-library-repo": "/usr/lib/",
    "element-mode":"inplace",
    "kernels" :[
      {
        "library-name":"libivas_xdpuinfer.so",
        "config": {
          "model-name" : "ssd_mobilenet_v2",
          "model-class" : "SSD",
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

* lable.json:

  SSD model privdes predictation of multiple classes in file `labelmap_voc.prototxt`.

    ```bash
    item {
      name: "none_of_the_above"
      label: 0
      display_name: "background"
    }
    item {
      name: "person"
      label: 1
      display_name: "person"
    }
    item {
      name: "rider"
      label: 2
      display_name: "rider"
    }
    item {
      name: "car"
      label: 3
      display_name: "car"
    }
    item {
      name: "truck"
      label: 4
      display_name: "truck"
    }
    item {
      name: "bus"
      label: 5
      display_name: "bus"
    }
    item {
      name: "train"
      label: 6
      display_name: "train"
    }
    item {
      name: "motor"
      label: 7
      display_name: "motor"
    }
    item {
      name: "bike"
      label: 8
      display_name: "bike"
    }
    item {
      name: "sign"
      label: 9
      display_name: "sign"
    }
    item {
      name: "light"
      label: 10
      display_name: "light"
    }
    ```

    We need to convert the above lable info to json file as requested by VVAS framework as bellow.

    ```json
    {
        "model-name":"ssd_mobilenet_v2",
        "num-labels": 11,
        "labels": [
            {
                "label": 0,
                "name": "background",
                "display_name": "background"
            },
            {
                "label": 1,
                "name": "person",
                "display_name": "person"
            },
            {
                "label": 2,
                "name": "rider",
                "display_name": "rider"
            },
            {
                "label": 3,
                "name": "car",
                "display_name": "car"
            },
            {
                "label": 4,
                "name": "truck",
                "display_name": "tr"
            },
            {
                "label": 5,
                "name": "bus",
                "display_name": "bus"
            },
            {
                "label": 6,
                "name": "train",
                "display_name": "train"
            },
            {
                "label": 7,
                "name": "motor",
                "display_name": "motor"
            },
            {
                "label": 8,
                "name": "bike",
                "display_name": "bike"
            },
            {
                "label": 9,
                "name": "sign",
                "display_name": "sign"
            },
            {
                "label": 10,
                "name": "light",
                "display_name": "light"
            }
        ]
    }
    ```

* drawresult.json

  Here we pick up 3 classes to be shown: car, person, bicycle; and also customize the color for each class as bellow.

    ```json
    {
      "xclbin-location":"/usr/lib/dpu.xclbin",
      "ivas-library-repo": "/opt/xilinx/lib",
      "element-mode":"inplace",
      "kernels" :[
        {
          "library-name":"libivas_airender.so",
          "config": {
            "fps_interval" : 10,
            "font_size" : 2,
            "font" : 3,
            "thickness" : 2,
            "debug_level" : 0,
            "label_color" : { "blue" : 0, "green" : 0, "red" : 255 },
            "label_filter" : [ "class", "probability" ],
            "classes" : [
                    {
                    "name" : "car",
                    "blue" : 255,
                    "green" : 0,
                    "red" : 0
                    },
                    {
                    "name" : "person",
                    "blue" : 0,
                    "green" : 255,
                    "red" : 0
                    },
                    {
                    "name" : "bicycle",
                    "blue" : 0,
                    "green" : 0,
                    "red" : 255
                    }]
          }
        }
      ]
    }
    ```

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
