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

**Note** The design currently only supports **Vitis AI 2.5.0**

**Note** As described in the Hardware Accelerator section, the DPU integrated in the platform uses the **B3136** configuration.

The arch.json used to compile the xmodel for B3136 DPU can be obtained by build the accelerator, but if you won't build all from the start, you can obtain the DPU fingerprint by using the following commands on target SOM:

```bash
    xdputil query
```

You will get some output like this:

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

Save the fingerprint as arch.json.

```json
{
    "fingerprint":"0x101000016010406"
}
```

For detailed instructions on obtaining an alternative model from the Xilinx model zoo or training, pruning, quantizing, and compiling a new model, please refer to the [Vitis AI documentation](https://docs.xilinx.com/r/en-US/ug1414-vitis-ai).

### Configuration files

To integrate a different .xmodel into the smartcam application, the following configuration files must be updated accordingly:

* AI Inference Config:

    Take the refinedet aiinference.json `/opt/xilinx/kv260-smartcam/share/vvas/refinedet/aiinference.json` as an example,

```json
    {
        "vvas-library-repo": "/usr/lib/",
            "element-mode":"inplace",
            "kernels" :[
            {
                "library-name":"libvvas_xdpuinfer.so",
                "config": {
                    "model-name" : "refinedet_pruned_0_96",
                    "model-class" : "REFINEDET",
                    "model-path" : "/opt/xilinx/kv260-smartcam/share/vitis_ai_library/models",
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
        "scale_r": 0.5,
        "scale_g": 0.5,
        "scale_b": 0.5
    }
```

The configuration value of mean for r/g/b channels should be the same as the ones specified in Vitis AI Model prototxt file.

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

The configuration value of scale is determined by both prototxt and input tensor's fixpos info contained in compiled xmodel file.

First use the following command to get input tensor's fixpos.

```bash
    xdputil xmodel Path-to-xmodelfile -l
```

You will get some output like this: 
```bash
{
 "subgraphs":[
     {
         "index":0,
         "name":"subgraph_data",
         "device":"USER"
     },
     {
         "index":0,
         "name":"subgraph_Elt3",
         "device":"DPU",
         "fingerprint":"0x101000016010406",
         "DPU Arch":"DPUCZDX8G_ISA1_B3136",
         "input_tensor":[
             {
                 "name":"data_fixed",
                 "shape":"[1, 360, 480, 3]",
                 "fixpos":-1
             }
         ],
     }
 ]
}
```

So the input tensor's fixpos is "-1" here.

The configured scale = prototxt_scale \* (2 ^ fixpos) = 1 \* (2^-1) = 0.5.


## Example

Take Vitis AI model yolov3_coco_416_tf2 as example, we provide the detailed steps to add an AI task for smartcam application.

1. Create folder `yolov3_coco` under `/opt/xilinx/kv260-smartcam/share/vvas/`, so that `yolov3_coco` can be used as the value for argument --AItask.

2. <a name="download-model"></a> Download model file for `GPU` and `zcu102 & zcu104 & kv260` from the link provided by <https://github.com/Xilinx/Vitis-AI/blob/master/model_zoo/model-list/tf2_yolov3_coco_416_416_65.9G_2.5/model.yaml> 

After extraction, we get such file structure:
    
<details>

```
	│   README.md
	│   requirements.txt
	│
	├───code
	│   └───test
	│       │   cocoval.py
	│       │   convert_data.sh
	│       │   Dockerfile
	│       │   download_data.sh
	│       │   eval.py
	│       │   LICENSE
	│       │   README.md
	│       │   requirements.txt
	│       │   run_eval.sh
	│       │   train.py
	│       │   yolo.py
	│       │
	│       ├───cfg
	│       │       csdarknet53-omega.cfg
	│       │       darknet19_448_body.cfg
	│       │       darknet53.cfg
	│       │       yolo-fastest-xl.cfg
	│       │       yolo-fastest.cfg
	│       │       yolov2-tiny-voc.cfg
	│       │       yolov2-tiny.cfg
	│       │       yolov2-voc.cfg
	│       │       yolov2.cfg
	│       │       yolov3-spp.cfg
	│       │       yolov3-tiny.cfg
	│       │       yolov3.cfg
	│       │       yolov4-csp.cfg
	│       │       yolov4-csp_fixed.cfg
	│       │       yolov4-sam-mish.cfg
	│       │       yolov4-tiny.cfg
	│       │       yolov4.cfg
	│       │
	│       ├───common
	│       │   │   callbacks.py
	│       │   │   data_utils.py
	│       │   │   model_utils.py
	│       │   │   utils.py
	│       │   │   wbf_postprocess.py
	│       │   │   yolo_postprocess_np.py
	│       │   │
	│       │   └───backbones
	│       │       │   efficientnet.py
	│       │       │   ghostnet.py
	│       │       │   layers.py
	│       │       │   mobilenet.py
	│       │       │   mobilenet_v2.py
	│       │       │   mobilenet_v3.py
	│       │       │   mobilevit.py
	│       │       │   peleenet.py
	│       │       │   shufflenet.py
	│       │       │   shufflenet_v2.py
	│       │       │   squeezenet.py
	│       │       │
	│       │       └───imagenet_training
	│       │           │   data_utils.py
	│       │           │   heatmap_check.py
	│       │           │   README.md
	│       │           │   train_imagenet.py
	│       │           │
	│       │           └───imagenet_preprocess
	│       │                   imagenet_2012_label_map.txt
	│       │                   imagenet_2012_validation_synset_labels.txt
	│       │                   preprocess_imagenet_train_data.py
	│       │                   preprocess_imagenet_validation_data.py
	│       │
	│       ├───configs
	│       │       coco2017_origin_classes.txt
	│       │       coco_classes.txt
	│       │       objects365_classes.txt
	│       │       scaled-yolo4-csp_anchors.txt
	│       │       tiny_yolo3_anchors.txt
	│       │       VOC2012_person_test.txt
	│       │       voc_classes.txt
	│       │       yolo2-tiny-voc_anchors.txt
	│       │       yolo2-tiny_anchors.txt
	│       │       yolo2-voc_anchors.txt
	│       │       yolo2_anchors.txt
	│       │       yolo3_anchors.txt
	│       │       yolo4_anchors.txt
	│       │       yolo5_anchors.txt
	│       │       yolo_fastest_anchors.txt
	│       │
	│       ├───inference
	│       │   │   eval_inference.sh
	│       │   │   README.md
	│       │   │
	│       │   ├───MNN
	│       │   │   │   CMakeLists.txt
	│       │   │   │   yoloDetection.cpp
	│       │   │   │
	│       │   │   └───configs
	│       │   │           quantizeConfig.json
	│       │   │
	│       │   └───tflite
	│       │           CMakeLists.txt
	│       │           stb_image.h
	│       │           stb_image_resize.h
	│       │           yoloDetection.cpp
	│       │           yoloDetection.h
	│       │
	│       ├───scaled_yolo4
	│       │   └───models
	│       │           layers.py
	│       │           scaled_yolo4_csp_darknet.py
	│       │
	│       ├───tools
	│       │   ├───dataset_converter
	│       │   │       coco_annotation.py
	│       │   │       coco_annotation_val.py
	│       │   │       coco_dataset_to_voc.py
	│       │   │       coco_to_pascal_voc.py
	│       │   │       dataset_visualize.py
	│       │   │       openimage_annotation.py
	│       │   │       pascal_voc_to_coco.py
	│       │   │       voc_annotation.py
	│       │   │       voc_obj_similarity.py
	│       │   │       voc_to_darknet.py
	│       │   │       yolo_annotation.py
	│       │   │
	│       │   ├───evaluation
	│       │   │       model_statistics.py
	│       │   │       pycoco_eval.py
	│       │   │       tide_eval.py
	│       │   │       validate_yolo.py
	│       │   │
	│       │   ├───misc
	│       │   │       augment_test.py
	│       │   │       gif_create.py
	│       │   │       kmeans.py
	│       │   │       rotate_gridmask_test.py
	│       │   │       tensor_compare.py
	│       │   │       yuv_convert.py
	│       │   │
	│       │   └───model_converter
	│       │       │   convert.py
	│       │       │   custom_tflite_convert.py
	│       │       │   keras_to_onnx.py
	│       │       │   keras_to_tensorflow.py
	│       │       │   keras_to_tensorflow_bk.py
	│       │       │   post_train_quant_convert.py
	│       │       │   tensorflow_to_coreml.py
	│       │       │   tensorflow_to_rknn.py
	│       │       │
	│       │       └───ghostnet_convertor
	│       │               convertor.py
	│       │               ghostnet_pytorch.py
	│       │
	│       ├───tracking
	│       │   │   mot_tracker.py
	│       │   │   README.md
	│       │   │   requirements.txt
	│       │   │
	│       │   ├───cpp_inference
	│       │   │   │   README.md
	│       │   │   │
	│       │   │   └───yoloSort
	│       │   │       │   CMakeLists.txt
	│       │   │       │   Hungarian.cpp
	│       │   │       │   Hungarian.h
	│       │   │       │   KalmanTracker.cpp
	│       │   │       │   KalmanTracker.h
	│       │   │       │   Sort.cpp
	│       │   │       │   Sort.h
	│       │   │       │   yoloSort.cpp
	│       │   │       │
	│       │   │       └───kalman_demo
	│       │   │               CMakeLists.txt
	│       │   │               kalman_demo.cpp
	│       │   │               kalman_demo.py
	│       │   │               README.md
	│       │   │
	│       │   ├───eval
	│       │   │   │   formatchecker.py
	│       │   │   │   importers.py
	│       │   │   │   pymot.py
	│       │   │   │   README.md
	│       │   │   │   rect.py
	│       │   │   │   utilities.py
	│       │   │   │
	│       │   │   ├───example
	│       │   │   │       groundtruth.json
	│       │   │   │       hypotheses.json
	│       │   │   │
	│       │   │   └───tools
	│       │   │           mot16_annotation.py
	│       │   │
	│       │   └───model
	│       │       ├───deep_sort
	│       │       │       detection.py
	│       │       │       generate_detections.py
	│       │       │       iou_matching.py
	│       │       │       kalman_filter.py
	│       │       │       linear_assignment.py
	│       │       │       nn_matching.py
	│       │       │       preprocessing.py
	│       │       │       track.py
	│       │       │       tracker.py
	│       │       │       __init__.py
	│       │       │
	│       │       └───sort
	│       │               sort.py
	│       │
	│       ├───weights
	│       │       .gitignore
	│       │
	│       ├───yolo2
	│       │   │   data.py
	│       │   │   loss.py
	│       │   │   model.py
	│       │   │   postprocess.py
	│       │   │   postprocess_np.py
	│       │   │   __init__.py
	│       │   │
	│       │   └───models
	│       │           layers.py
	│       │           yolo2_darknet.py
	│       │           yolo2_efficientnet.py
	│       │           yolo2_mobilenet.py
	│       │           yolo2_mobilenetv2.py
	│       │           yolo2_mobilenetv3_large.py
	│       │           yolo2_mobilenetv3_small.py
	│       │           yolo2_xception.py
	│       │
	│       ├───yolo3
	│       │   │   data.py
	│       │   │   loss.py
	│       │   │   model.py
	│       │   │   postprocess.py
	│       │   │   postprocess_np.py
	│       │   │   __init__.py
	│       │   │
	│       │   └───models
	│       │           layers.py
	│       │           ultralite_layers.py
	│       │           yolo3_darknet.py
	│       │           yolo3_efficientnet.py
	│       │           yolo3_ghostnet.py
	│       │           yolo3_mobilenet.py
	│       │           yolo3_mobilenetv2.py
	│       │           yolo3_mobilenetv3_large.py
	│       │           yolo3_mobilenetv3_small.py
	│       │           yolo3_nano.py
	│       │           yolo3_peleenet.py
	│       │           yolo3_resnet50.py
	│       │           yolo3_resnet50v2.py
	│       │           yolo3_shufflenetv2.py
	│       │           yolo3_vgg16.py
	│       │           yolo3_xception.py
	│       │
	│       ├───yolo4
	│       │   └───models
	│       │           layers.py
	│       │           yolo4_darknet.py
	│       │           yolo4_efficientnet.py
	│       │           yolo4_mobilenet.py
	│       │           yolo4_mobilenetv2.py
	│       │           yolo4_mobilenetv3_large.py
	│       │           yolo4_mobilenetv3_small.py
	│       │           yolo4_resnet50.py
	│       │           yolo4_resnet50v2.py
	│       │
	│       └───yolo5
	│           │   data.py
	│           │   loss.py
	│           │   model.py
	│           │   postprocess.py
	│           │   postprocess_np.py
	│           │
	│           └───models
	│                   layers.py
	│                   yolo5_darknet.py
	│                   yolo5_mobilenet.py
	│                   yolo5_mobilenetv2.py
	│
	├───data
	│       .gitignore
	│       demo_list.txt
	├───float
	│       yolov3.h5
	└───quantized
	        quantized.h5
```
	
</details>

3. Prepare `yolov3_coco_416_tf2.xmodel` file for DPU 3136.

The file `quantized.h5` is the quantized model generated by quantizer. It can be used to generate xmodel file.

Start the vitis-ai model compile docker and copy `quantized.h5` and `arch.json` into it. Using the following command to compile .xmodel file.

```bash
    conda activate vitis-ai-tensorflow2
    vai_c_tensorflow2 -m /PATH/TO/quantized.h5 -a /PATH/TO/arch.json -o /OUTPUTPATH -n yolov3_coco_416_tf2
```
The yolov3_coco_416_tf2.prototxt can be found in existing file from [`zcu102 & zcu104 & kv260`](#download-model). 

The YOLOv3 object detection model provides prediction of multiple classes in the [label file](https://github.com/iArunava/YOLOv3-Object-Detection-with-OpenCV/blob/master/yolov3-coco/coco-labels).

```
    person
    bicycle
    car
    motorbike
    aeroplane
    bus
    ...
```

We need to convert the above label info to json file as requested by VVAS framework as bellow and named it 'label.json'.

<details>
	
```json
    {
    	"model-name": "yolov3_coco_416_tf2",
    	"num-labels": 80,
    	"labels": [
    		{
    			"label": 0,
    			"name": "person",
    			"display_name": "person"
    		},
    		{
    			"label": 1,
    			"name": "bicycle",
    			"display_name": "bicycle"
    		},
    		{
    			"label": 2,
    			"name": "car",
    			"display_name": "car"
    		},
    		{
    			"label": 3,
    			"name": "motorbike",
    			"display_name": "motorbike"
    		},
    		{
    			"label": 4,
    			"name": "aeroplane",
    			"display_name": "aeroplane"
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
    			"name": "truck",
    			"display_name": "truck"
    		},
    		{
    			"label": 8,
    			"name": "boat",
    			"display_name": "boat"
    		},
    		{
    			"label": 9,
    			"name": "traffic light",
    			"display_name": "traffic light"
    		},
    		{
    			"label": 10,
    			"name": "fire hydrant",
    			"display_name": "fire hydrant"
    		},
    		{
    			"label": 11,
    			"name": "stop sign",
    			"display_name": "stop sign"
    		},
    		{
    			"label": 12,
    			"name": "parking meter",
    			"display_name": "parking meter"
    		},
    		{
    			"label": 13,
    			"name": "bench",
    			"display_name": "bench"
    		},
    		{
    			"label": 14,
    			"name": "bird",
    			"display_name": "bird"
    		},
    		{
    			"label": 15,
    			"name": "cat",
    			"display_name": "cat"
    		},
    		{
    			"label": 16,
    			"name": "dog",
    			"display_name": "dog"
    		},
    		{
    			"label": 17,
    			"name": "horse",
    			"display_name": "horse"
    		},
    		{
    			"label": 18,
    			"name": "sheep",
    			"display_name": "sheep"
    		},
    		{
    			"label": 19,
    			"name": "cow",
    			"display_name": "cow"
    		},
    		{
    			"label": 20,
    			"name": "elephant",
    			"display_name": "elephant"
    		},
    		{
    			"label": 21,
    			"name": "bear",
    			"display_name": "bear"
    		},
    		{
    			"label": 22,
    			"name": "zebra",
    			"display_name": "zebra"
    		},
    		{
    			"label": 23,
    			"name": "giraffe",
    			"display_name": "giraffe"
    		},
    		{
    			"label": 24,
    			"name": "backpack",
    			"display_name": "backpack"
    		},
    		{
    			"label": 25,
    			"name": "umbrella",
    			"display_name": "umbrella"
    		},
    		{
    			"label": 26,
    			"name": "handbag",
    			"display_name": "handbag"
    		},
    		{
    			"label": 27,
    			"name": "tie",
    			"display_name": "tie"
    		},
    		{
    			"label": 28,
    			"name": "suitcase",
    			"display_name": "suitcase"
    		},
    		{
    			"label": 29,
    			"name": "frisbee",
    			"display_name": "frisbee"
    		},
    		{
    			"label": 30,
    			"name": "skis",
    			"display_name": "skis"
    		},
    		{
    			"label": 31,
    			"name": "snowboard",
    			"display_name": "snowboard"
    		},
    		{
    			"label": 32,
    			"name": "sports ball",
    			"display_name": "sports ball"
    		},
    		{
    			"label": 33,
    			"name": "kite",
    			"display_name": "kite"
    		},
    		{
    			"label": 34,
    			"name": "baseball bat",
    			"display_name": "baseball bat"
    		},
    		{
    			"label": 35,
    			"name": "baseball glove",
    			"display_name": "baseball glove"
    		},
    		{
    			"label": 36,
    			"name": "skateboard",
    			"display_name": "skateboard"
    		},
    		{
    			"label": 37,
    			"name": "surfboard",
    			"display_name": "surfboard"
    		},
    		{
    			"label": 38,
    			"name": "tennis racket",
    			"display_name": "tennis racket"
    		},
    		{
    			"label": 39,
    			"name": "bottle",
    			"display_name": "bottle"
    		},
    		{
    			"label": 40,
    			"name": "wine glass",
    			"display_name": "wine glass"
    		},
    		{
    			"label": 41,
    			"name": "cup",
    			"display_name": "cup"
    		},
    		{
    			"label": 42,
    			"name": "fork",
    			"display_name": "fork"
    		},
    		{
    			"label": 43,
    			"name": "knife",
    			"display_name": "knife"
    		},
    		{
    			"label": 44,
    			"name": "spoon",
    			"display_name": "spoon"
    		},
    		{
    			"label": 45,
    			"name": "bowl",
    			"display_name": "bowl"
    		},
    		{
    			"label": 46,
    			"name": "banana",
    			"display_name": "banana"
    		},
    		{
    			"label": 47,
    			"name": "apple",
    			"display_name": "apple"
    		},
    		{
    			"label": 48,
    			"name": "sandwich",
    			"display_name": "sandwich"
    		},
    		{
    			"label": 49,
    			"name": "orange",
    			"display_name": "orange"
    		},
    		{
    			"label": 50,
    			"name": "broccoli",
    			"display_name": "broccoli"
    		},
    		{
    			"label": 51,
    			"name": "carrot",
    			"display_name": "carrot"
    		},
    		{
    			"label": 52,
    			"name": "hot dog",
    			"display_name": "hot dog"
    		},
    		{
    			"label": 53,
    			"name": "pizza",
    			"display_name": "pizza"
    		},
    		{
    			"label": 54,
    			"name": "donut",
    			"display_name": "donut"
    		},
    		{
    			"label": 55,
    			"name": "cake",
    			"display_name": "cake"
    		},
    		{
    			"label": 56,
    			"name": "chair",
    			"display_name": "chair"
    		},
    		{
    			"label": 57,
    			"name": "sofa",
    			"display_name": "sofa"
    		},
    		{
    			"label": 58,
    			"name": "pottedplant",
    			"display_name": "pottedplant"
    		},
    		{
    			"label": 59,
    			"name": "bed",
    			"display_name": "bed"
    		},
    		{
    			"label": 60,
    			"name": "diningtable",
    			"display_name": "diningtable"
    		},
    		{
    			"label": 61,
    			"name": "toilet",
    			"display_name": "toilet"
    		},
    		{
    			"label": 62,
    			"name": "tvmonitor",
    			"display_name": "tvmonitor"
    		},
    		{
    			"label": 63,
    			"name": "laptop",
    			"display_name": "laptop"
    		},
    		{
    			"label": 64,
    			"name": "mouse",
    			"display_name": "mouse"
    		},
    		{
    			"label": 65,
    			"name": "remote",
    			"display_name": "remote"
    		},
    		{
    			"label": 66,
    			"name": "keyboard",
    			"display_name": "keyboard"
    		},
    		{
    			"label": 67,
    			"name": "cell phone",
    			"display_name": "cell phone"
    		},
    		{
    			"label": 68,
    			"name": "microwave",
    			"display_name": "microwave"
    		},
    		{
    			"label": 69,
    			"name": "oven",
    			"display_name": "oven"
    		},
    		{
    			"label": 70,
    			"name": "toaster",
    			"display_name": "toaster"
    		},
    		{
    			"label": 71,
    			"name": "sink",
    			"display_name": "sink"
    		},
    		{
    			"label": 72,
    			"name": "refrigerator",
    			"display_name": "refrigerator"
    		},
    		{
    			"label": 73,
    			"name": "book",
    			"display_name": "book"
    		},
    		{
    			"label": 74,
    			"name": "clock",
    			"display_name": "clock"
    		},
    		{
    			"label": 75,
    			"name": "vase",
    			"display_name": "vase"
    		},
    		{
    			"label": 76,
    			"name": "scissors",
    			"display_name": "scissors"
    		},
    		{
    			"label": 77,
    			"name": "teddy bear",
    			"display_name": "teddy bear"
    		},
    		{
    			"label": 78,
    			"name": "hair drier",
    			"display_name": "hair drier"
    		},
    		{
    			"label": 79,
    			"name": "toothbrush",
    			"display_name": "toothbrush"
    		}
    	]
    }
```
	
</details>

Put the prototxt file together with xmodel and label.json file to `/opt/xilinx/kv260-smartcam/share/vitis_ai_library/models/yolov3_coco_416_tf2/`.

```
    opt
    └── xilinx
     └── kv260-smartcam
            └── share
                └── vitis_ai_library
                    └── models
                        └── yolov3_coco_416_tf2
                            ├── yolov3_coco_416_tf2.prototxt
                            ├── yolov3_coco_416_tf2.xmodel
                            └── label.json
```

4. Create configuration files for yolov3_coco_416_tf2.

* preprocess.json

    The mean and scale of B, G, R channel is taken from the prototxt of the model.

    ```prototxt
    model {
      kernel {
         mean: 0.0
         mean: 0.0
         mean: 0.0
         scale: 0.00390625
         scale: 0.00390625
         scale: 0.00390625
      }
      model_type : YOLOv3
      yolo_v3_param {
        num_classes: 80
        anchorCnt: 3
        layer_name: "58"
        layer_name: "66"
        layer_name: "74"
        conf_threshold: 0.3
        nms_threshold: 0.45
        biases: 10 
        biases: 13
        biases: 16
        biases: 30
        biases: 33
        biases: 23
        biases: 30
        biases: 61
        biases: 62
        biases: 45
        biases: 59
        biases: 119
        biases: 116
        biases: 90
        biases: 156
        biases: 198
        biases: 373
        biases: 326
        test_mAP: false
      }
    }
    ```
	
	Using the following command to get the fixpos.
	```bash
    xdputil xmodel ./yolov3_coco_416_tf2.xmodel -l
	
	...
	"input_tensor":[
                {
                    "index":0,
                    "name":"quant_image_input",
                    "shape":[
                        1,
                        416,
                        416,
                        3
                    ],
                    "fixpos":6
                }
            ],
	...
    ```
	
	The configured scale = prototxt_scale \* (2 ^ fixpos) = 0.00390625 \* (2^6) = 0.25.

    ```json
    {
      "xclbin-location":"/lib/firmware/xilinx/kv260-smartcam/kv260-smartcam.xclbin",
      "vvas-library-repo": "/opt/xilinx/kv260-smartcam/lib",
      "element-mode": "transform",
      "kernels": [
        {
          "kernel-name": "pp_pipeline_accel:{pp_pipeline_accel_1}",
          "library-name": "libvvas_xpp.so",
          "config": {
            "debug_level" : 1,
            "mean_r": 0,
            "mean_g": 0,
            "mean_b": 0,
            "scale_r": 0.25,
            "scale_g": 0.25,
            "scale_b": 0.25
          }
        }
      ]
    }

    ```

* aiinference.json:

   ```json
   {
    "xclbin-location":"/lib/firmware/xilinx/kv260-smartcam/kv260-smartcam.xclbin",
    "vvas-library-repo": "/usr/lib/aarch64-linux-gnu/",
    "element-mode":"inplace",
    "kernels" :[
      {
        "library-name":"libvvas_xdpuinfer.so",
        "config": {
          "model-name" : "yolov3_coco_416_tf2",
          "model-class" : "YOLOV3",
          "model-path" : "/opt/xilinx/kv260-smartcam/share/vitis_ai_library/models",
          "run_time_model" : false,
          "need_preprocess" : false,
          "performance_test" : false,
          "debug_level" : 0
        }
      }
    ]
  }
  ```
	
* drawresult.json

  Here we pick up 4 classes to be shown: car, person, truck, bicycle; and customize the color for each class as bellow.

    ```json
    {
      "xclbin-location":"/usr/lib/dpu.xclbin",
      "vvas-library-repo": "/opt/xilinx/kv260-smartcam/lib",
      "element-mode":"inplace",
      "kernels" :[
        {
          "library-name":"libvvas_airender.so",
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
                    "name" : "truck",
                    "blue" : 128,
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

* Vitis AI User Guide [UG1414](https://docs.xilinx.com/r/en-US/ug1414-vitis-ai)

### License

Licensed under the Apache License, Version 2.0 (the "License"); you may not use this file except in compliance with the License.

You may obtain a copy of the License at
[http://www.apache.org/licenses/LICENSE-2.0](http://www.apache.org/licenses/LICENSE-2.0)

Unless required by applicable law or agreed to in writing, software distributed under the License is distributed on an "AS IS" BASIS, WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied. See the License for the specific language governing permissions and limitations under the License.

<p align="center">Copyright&copy; 2022 Xilinx</p>
