<table class="sphinxhide">
 <tr>
   <td align="center"><img src="../../media/xilinx-logo.png" width="30%"/><h1>Kria&trade; KV260 Vision AI Starter Kit Defect Detection Tutorial</h1>
   </td>
 </tr>
 <tr>
 <td align="center"><h1>Software Architecture of the Accelerator</h1>

 </td>
 </tr>
</table>

# Software Architecture of the Accelerator


## Introduction


This document describes the software architecture of the Defect Detection accelerator application.


### Software Architecture

In the Defect Detection application, the Computer Vision Starter Kit can take video inputs from a file. As shown in the following figure, the video inputs will be in the Luma(Y) format, processed and displayed. Vitis overlay includes Vitis Vision libraries that process the frames and try to detect defects in mangoes.

In this reference design, the resolution on the input frames is 1280 x 800, and the outputs are 3x1280x800 on a 4K display.

---
**NOTE**

1280x800p is the resolution that the application supports.

---

![](../../media/defect-detect/defect-detection-process.png)

The parts before pre-process plugin and after mixer for data source and sink respectively, use purely official GStreamer plugins, such as *filesrc* for file input, and *Kmssink* for the display. Refer to the [GStreamer documentation](https://gstreamer.freedesktop.org/documentation/tutorials/index.html?gi-language=c) for detailed usage.

The core acceleration tasks are performed by the Pre-Process, CCA, and Defect Calculation plugins, which are developed by XILINX.

<details>
 <summary><b>The following table lists the GStreamer plugins used in the application.</b></summary>


| GStreamer Plugins| Definition|Note|
| ----------- | ----------- |------ |
| filesrc     | Image capturing from the file      |Upstream GStreamer |
| Kmssink  | For the display        |Upstream GStreamer|
|Queue | Simple data queue | Upstream GStreamer|
|Tee|1-to-N pipe fitting|Upstream GStreamer|
|IVAS xfilter|Kernel Library: *canny_edge*. Linking Vitis Vision library to the Gaussian + OTSU CCA detector is an edge detection operator that uses a multi-stage algorithm to detect a wide range of edges in images.|Xilinx Plugin|
|IVAS xfilter|Kernel Library: *pre-process*. Linking Vitis Vision library to do color space conversion and perform filtering to remove the salt and pepper noise for defect detection.|Xilinx Plugin|
|IVAS xfilter|Kernel Library: *edge_tracer*. Linking Vitis Vision library to trace the edge for defect calculation.|Xilinx Plugin|
|IVAS xfilter|Kernel Library: *defectcalc*. Linking *OpenCV* software library to find the contour, fill the contour, and embed text as result into output images.|Xilinx Plugin|
____

</details>

<details>
 <summary><b>The following table lists the Component types used in the application.</b></summary>


| Pipeline| Component|Component Type|
| ----------- | ----------- |------ |
| Pre-Process  | Gaussian + OTSU |PL|
|  |Threshold + Median Filter |PL |
|Defectdetection | CCA | PL
| |Text Overlay + Defect Detection|SW|

____

</details>


### In-House Plugins

The following are the in-house plugins:

#### Pre-process

<details>
 <summary><b>Click here to view details</b></summary>


The pre-process pipeline is shown in the following image:

![](../../media/defect-detect/preprocessing_pipeline.png)

##### Gaussian_OTSU Accelerator

This accelerator has two kernels - Gaussian & OTSU, stitched in streaming fashion.
In general, any smoothing filter smoothens the image and will affect the edges of the image. To
preserve the edges while smoothing, you can use a bilateral filter. In an analogous way as the
Gaussian filter, the bilateral filter also considers the neighboring pixels with weights assigned to each of them. 

These weights have two components, the first of which is the same weighing used
by the Gaussian filter. The second component takes into account the difference in the intensity
between the neighboring pixels and the evaluated one.

OTSU threshold is used to automatically perform clustering-based image thresholding or the
reduction of a gray-level image to a binary image. The algorithm assumes that the image contains
two classes of pixels following bi-modal histogram (foreground pixels and background pixels), it
then calculates the optimum threshold separating the two classes.

The following figure depicts the Gaussian + OSTSU plugin software stack.

![](../../media/defect-detect/gaussian-plugin-sw-stack.png)

The following figure depicts the Gaussian + OTSU plugin data flow.

![](../../media/defect-detect/gaussian-plugin-dataflow.png)

##### Threshold_Median Accelerator
The grey-scale image should be converted to a binary image with an appropriate threshold value. The threshold function in the Vitis Vision library can perform the thresholding operation on the input image. This should yield an image that has a black background with the mango area in white.

The median blur filter acts as a non-linear digital filter that reduces noise. A filter size of N outputs the median of the NxN neighborhood pixel values, for each pixel. In this design, N is 3.

This plugin accepts the 1280x800 Y8 image as input. The plugin applies the threshold binary algorithm to convert the Y8 image to binary image by using the threshold value of the pixel. Later, it applies the Median filter to remove salt and pepper noise.

The following figure depicts the Pre-Process plugin software stack.

![](../../media/defect-detect/preprocess-plugin-sw-stack.png)

The following figure depicts the Pre-Process plugin data flow.

![](../../media/defect-detect/preprocess-plugin-data-flow.png)

Threshold and Median Blur kernels are connected together using AXI Stream interface.

</details>


#### CCA

<details>
 <summary><b>Click here to view details</b></summary>

The implemented Connected Component Analysis (CCA), is a custom solution to find the defective pixels in the problem object. This algorithm considers few assumptions that the background must be easily separable from the foreground object.

The custom CCA effectively analyses the components that are connected to the background pixels, and removed the background from the object and defective pixels. The aim is to send the following output information from the function:

* defect image: image with only defect pixels marked as ‘255’ and both object pixels and background as ‘0’ 
* object_pixels: total non-defective pixels of the object
* defect_pixels: total defective pixels


The following figure depicts the CCA plugin software stack.

![](../../media/defect-detect/cca-plugin-sw-stack.png)

The following figure depicts the CCA plugin data flow.

![](../../media/defect-detect/cca-plugin-dataflow.png)

</details>



#### Defect Calculation

<details>
 <summary><b>Click here to view details</b></summary>


The output of the CCA plugin is fed into the Defect Calculation block which calculates the defect density and decides the quality of the mango. The block performs the following main operations:

* The contours delineate regions of the mango that are blemished. Blemished pixels are marked with white color in the binary image.

* The ratio of blemished pixels to total image pixels is calculated to determine how much of the mango's surface area is covered with blemishes.

* Defect Decision determines whether the ratio exceeds a user-defined threshold, to decide whether the mango is acceptable or not.

The following figure depicts the Defect Calculation plugin software stack.

![](../../media/defect-detect/defect-calculation-plugin-sw-stack.png)

The following figure depicts the Defect Calulation plugin data flow.

![](../../media/defect-detect/defect-calculation-plugin-dataflow.png)

</details>


## Configuration Files

<details>
 <summary><b>Click here to view details</b></summary>


The **defect-detect** application uses the following configuration files.

* CCA Accelerator

The *cca-accelarator.json* file is as follows:

```
{
  "xclbin-location": "/lib/firmware/xilinx/kv260-defect-detect/kv260-defect-detect.xclbin",
  "ivas-library-repo": "/opt/xilinx/lib",
  "element-mode": "transform",
  "kernels": [
    {
      "kernel-name": "cca_custom_accel:cca_custom_accel_1",
      "library-name": "libivas_cca.so",
      "config": {
        "debug_level" : 1
      }
    }
  ]
}


```
  
* OTSU Accelerator

The *otsu-accelerator.json* file is as follows:

```
{
  "xclbin-location": "/lib/firmware/xilinx/kv260-defect-detect/kv260-defect-detect.xclbin",
  "ivas-library-repo": "/opt/xilinx/lib",
  "element-mode": "transform",
  "kernels": [
    {
      "kernel-name": "gaussian_otsu_accel:gaussian_otsu_accel_1",
      "library-name": "libivas_otsu.so",
      "config": {
        "debug_level" : 1
      }
    }
  ]
}

```
  

* Preprocess Accelerator

The *preprocess-accelerator.json* file is as follows:

```
{
  "xclbin-location": "/lib/firmware/xilinx/kv260-defect-detect/kv260-defect-detect.xclbin",
  "ivas-library-repo": "/opt/xilinx/lib",
  "element-mode": "transform",
  "kernels": [
    {
      "kernel-name": "preprocess_accel:preprocess_accel_1",
      "library-name": "libivas_preprocess.so",
      "config": {
        "debug_level" : 1,
        "max_value": 255
      }
    }
  ]
}



```
  
* Text2Overlay

The *text2overlay.json* file is as follows:

```
{
  "xclbin-location": "/lib/firmware/xilinx/kv260-defect-detect/kv260-defect-detect.xclbin",
  "ivas-library-repo": "/opt/xilinx/lib",
  "element-mode":"inplace",
  "kernels" :[
    {
      "library-name":"libivas_text2overlay.so",
      "config": {
        "debug_level" : 1,
        "font_size" : 1.0,
        "font" : 3,
        "x_offset" : 750,
        "y_offset" : 50,
        "defect_threshold" : 0.16,
        "is_acc_result" : 1
      }
    }
  ]
}

```


</details>

## Next Steps

* ![right arrow](../../media/defect-detect/next.jpg) [Hardware Architecture](hw_arch_platform_dd.md)
* [Hardware Accelerator](hw_arch_accel_dd.md)

### License

Licensed under the Apache License, Version 2.0 (the "License"); you may not use this file except in compliance with the License.

You may obtain a copy of the License at
[http://www.apache.org/licenses/LICENSE-2.0](http://www.apache.org/licenses/LICENSE-2.0)


Unless required by applicable law or agreed to in writing, software distributed under the License is distributed on an "AS IS" BASIS, WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied. See the License for the specific language governing permissions and limitations under the License.

<p align="center">Copyright&copy; 2021 Xilinx</p>
