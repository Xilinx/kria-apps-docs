# Vitis PL Kernel Development Flow 

## Image Resizing Kernel 

In this step, we will build an Image resizing kernel using the Vitis vision library. The MIPI camera attached to the J7 pin on the KV260 board (if you are not sure which pin it is, go to the pre-requisite section) reads an input video of NV12 format and of size 1920x1080 pixels and stores it in the DDR. The resizing algorithm reads the camera data from the DDR, converts it to a BGR format, resizes it to a user-defined size, and stores it back in the DDR. The resizing algorithm is built using the Vitis Vision Library.


### Vitis Vision Library 

Vitis vision library functions implement similar functionality to OpenCV for performing computer vision functions. These libraries are designed in Vitis HLS, providing acceleration on an FPGA device. These libraries are written in C++, which follows the design principles and methodology described in the Vitis HLS User Guide for writing good synthesizable software that can be converted to efficient hardware. 

We will use the following functions to design the resizing application with the above-mentioned specification. 

1. Use the Array2xfMat to read the DDR data and store the information in a cv::Mat format.
2. The input data will be in NV12 format; use the "nv122bgr" function to convert it to a BGR format.
3. After conversion, we will use the "resize" function to downscale the image to a user-defined size.
4. After downscaling the image, we will use "xfMat2Array" to write it back to the DDR.

### Array2xfMat

- Array2xfMat function converts the input array to xf::cv::Mat. The Vitis Vision functions would require the input to be of the type xf::cv::Mat. This function would read from the array pointer and write into xf::cv::Mat. 

```
xf::cv::accel_utils obj_iny, obj_inuv;
obj_iny.Array2xfMat<INPUT_PTR_WIDTH, XF_8UC1, HEIGHT, WIDTH, NPC>(img_inp_y, imgInput_y, in_img_linestride);
obj_inuv.Array2xfMat<INPUT_PTR_WIDTH, XF_8UC2, HEIGHT/2, WIDTH/2, NPC> (img_inp_uv, imgInput_uv, in_img_linestride/2);

```
### xf::cv::Mat

- The Vitis Vision library functions are provided in templates with compile-time parameters to facilitate local memory allocation on FPGA devices. Data is explicitly copied from cv::Mat to xf::cv::Mat and is stored in physically contiguous memory to achieve the best possible performance. After processing, the output in xf::cv::Mat is copied back to cv::Mat to write it into the memory

```
xf::cv::Mat<XF_8UC1, HEIGHT, WIDTH, NPC> imgInput_y(in_img_height, in_img_width);
xf::cv::Mat<XF_8UC3, HEIGHT, WIDTH, NPC> rgb_mat(in_img_height, in_img_width);
xf::cv::Mat<XF_8UC2, HEIGHT/2, WIDTH/2, NPC> imgInput_uv(in_img_height/2, in_img_width/2);	
```

### NV12 to RGB/BGR 

- The "nv122bgr" converts NV12 image format to a 3-channel BGR image. The inputs to the function are separate Y and UV planes. NV12 holds sub-sampled data, and the Y plane is sampled at a unit rate and 1 U and 1 V value each for every 2x2 Y value. Each U and V value is duplicated (2x2) times to generate the RGB data. 

```
xf::cv::nv122bgr<XF_8UC1, XF_8UC2, XF_8UC3, HEIGHT, WIDTH, NPC, NPC>(imgInput_y, imgInput_uv, rgb_mat);
```

### Resolution Conversion( Resize)

- Resolution Conversion is the method used to resize the source image to the size of the destination image.  

```
xf::cv::resize<INTERPOLATION, IN_TYPE, HEIGHT, WIDTH, NEWHEIGHT, NEWWIDTH, NPC, MAXDOWNSCALE>(ch_swap_mat, resize_out_mat);
```

### xfMat2Array

- xfMat2Array function converts the input xf::cv::Mat to the output array. The output of the xf::kernel function will be xf::cv::Mat, and it will require converting that to an output pointer. 

```
xf::cv::xfMat2Array<OUTPUT_PTR_WIDTH, OUT_TYPE, NEWHEIGHT, NEWWIDTH, NPC>(resize_out_mat, img_out, out_img_linestride);
```

### Image resizing kernel 

The following combines all the functions which perform an Image resizing kernel.

```
obj_iny.Array2xfMat<INPUT_PTR_WIDTH, XF_8UC1, HEIGHT, WIDTH, NPC>(img_inp_y, imgInput_y, in_img_linestride);
obj_inuv.Array2xfMat<INPUT_PTR_WIDTH, XF_8UC2, HEIGHT/2, WIDTH/2, NPC> (img_inp_uv, imgInput_uv, in_img_linestride/2);
xf::cv::nv122bgr<XF_8UC1, XF_8UC2, XF_8UC3, HEIGHT, WIDTH, NPC, NPC>(imgInput_y, imgInput_uv, rgb_mat);
xf::cv::resize<INTERPOLATION, IN_TYPE, HEIGHT, WIDTH, NEWHEIGHT, NEWWIDTH, NPC, MAXDOWNSCALE>(rgb_mat,resize_out_mat);
xf::cv::xfMat2Array<OUTPUT_PTR_WIDTH, OUT_TYPE, NEWHEIGHT, NEWWIDTH, NPC>(resize_out_mat, img_out,out_img_linestride);

```

***Important: Replace the files***

The smart camera application uses pre-processing pipeline, which performs Color Space Convertion, resizing, and quantization. In this step, we don't need quantization. Navigate to smartcam folder and replace the xf_pp_pipeline_accel.cpp  with the [resizing kernel](./code/image_resizing/vitis_platform_files/xf_pp_pipeline_accel.cpp) which performs only ***color space convertion and resizing*** as shown above.

```
cd overlays/examples/smartcam
cp ../../../../../../code_repo_kria_vitis_acceleration_flow_2022.1/image_resizing/vitis_platform_files/xf_pp_pipeline_accel.cpp .

```

## Next steps

This completes the PL kernel development flow. The next step is [Vitis Compile and Link](./vitis-compile-link.md).

