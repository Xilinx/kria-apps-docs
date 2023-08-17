<table class="sphinxhide">
 <tr>
   <td align="center"><img src="../../media/xilinx-logo.png" width="30%"/><h1>Kria&trade; KV260 Vision AI Starter Kit Defect Detection Tutorial</h1>
   </td>
 </tr>
 <tr>
 <td align="center"><h1>Hardware Architecture of the Accelerator</h1>

 </td>
 </tr>
</table>

# Hardware Architecture of the Accelerator

The AMD Vitis&trade; overlay includes the Pre-Process block and the Defect Detection blocks.

## Pre-Process

The Pre-Process pipeline reads a video frame from memory, processes it as required for the Defect Detection function, and writes it back to memory. The Pre-Process pipeline consists of the Gaussian + OTSU accelerator and the Threshold + Median accelerator.

The Gaussian + OTSU accelerator is as follows:

![Gaussian_OTSU Pipeline Hardware Accelerator](../../media/defect-detect/gaussian-otsu-pipeline-hardware-accel.png)

The Gaussian + OTSU accelerator consists of two Vitis Vision kernel functions whose parameters can be configured using AXI4-Lite-based register interface.  

* The grey scale image from the capture pipeline is fed to the Gaussian_OTSU accelerator. The Gaussian filter smoothens the image and affects the edges of the image.

* The OTSU threshold is used to automatically perform clustering-based image thresholding or the reduction of a gray-level image to a binary image.

The Threshold and Median functions are as follows:

![Threshold_Median Pipeline Hardware Accelerator](../../media/defect-detect/threshold-median-pipeline-hardware-accel.png)

This Threshold + Median accelerator also consists of two Vitis Vision kernel functions whose parameters can be configured using AXI4-Lite-based register interface.

* The grey-scale image from the Gaussian/OTSU pipeline should be converted to a binary image with a specific threshold value. The Threshold function in the Vitis Vision library is used to perform this operation and yields an image that has a black background and a mango area that is white.

* The Median filter acts as a non-linear digital filter that improves noise reduction. A filter size of N would output the median value of the NxN neighborhood pixel values, for each pixel. In this design, N is set to 3.

An example output image after passing through the Pre-Process pipeline is as follows:

![Pre-Process Pipeline Hardware Accelerator Example](../../media/defect-detect/pre-process-pipeline-hardware-accel-example.png)

> **NOTE:** This proprietary image is from [Cofilab site](http://www.cofilab.com/wp-content/downloads/DB_Mango.rar).

## Defect Detection

The block in the Defect Detection pipeline reads a video frame from memory, processes it, and writes it back to memory. The Defect Detection pipeline is as follows:

![Passes and Computations](../../media/defect-detect/defect-detection-computations.png)

In hardware, the processing is done in two passes. In Pass 1, the forward and reverse passes are computed in parallel. Two input pointers are used, which point to the same data in the double-data rate (DDR), one for forward and other for reverse (two parallel ports are required because the forward and reverse computations are done in parallel).

The output from the forward and the reverse passes are written to the DDR buffers, using two 8-bit ports.

Pass 2 reads the data from the same ports once the write into the DDR buffer is complete. The output defect pixels are then written to the DDR.

An example output image after CCA Acceleration is done is as follows:

![Defect Detection Pipeline Hardware Accelerator Example](../../media/defect-detect/defect-detection-pipeline-hardware-accel-example.png)

> **NOTE:** This proprietary image is from [Cofilab site](http://www.cofilab.com/wp-content/downloads/DB_Mango.rar).

## Resource Utilization

Vitis integrates the pre-processing function and Defect detection function into the platform. The following table shows utilization numbers post implementation.

|K26|CLB LUTs|BRAM|DSP|URAM|
|----|----|---|----|--|
|Available|117120|144|1248|64|
|Platform|22646|18|30|1|
|Gaussian_OTSU|13633|6|71|0|
|Pre-processing|5244|3.5|9|0|
|CCA|13756|5|10|0|
|Other*|6062|39|0|0|
|Total|61341|71.5|120|1|
|Total %|52.37%|49.65%|9.05%|1.56%|  

Other*: AXI interconnects and Interrupt concat block added by Vitis
<br />

## Next Steps

* Go back to the [KV260 SOM Defect Detect Design Start Page](../defectdetect_landing).

## References

* <https://github.com/Xilinx/Vitis_Libraries/tree/master/vision>
* <https://xilinx.github.io/Vitis_Libraries/vision/2020.2/index.html>

### License

Licensed under the Apache License, Version 2.0 (the "License"); you may not use this file except in compliance with the License.

You may obtain a copy of the License at
[http://www.apache.org/licenses/LICENSE-2.0](http://www.apache.org/licenses/LICENSE-2.0).

Unless required by applicable law or agreed to in writing, software distributed under the License is distributed on an "AS IS" BASIS, WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied. See the License for the specific language governing permissions and limitations under the License.

<p align="center">Copyright&copy; 2021-2023 Advanced Micro Devices, Inc</p>
