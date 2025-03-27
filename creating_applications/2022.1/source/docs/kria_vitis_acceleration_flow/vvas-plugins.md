# Overview of VVAS Plug-ins

GStreamer is a pipeline-based multimedia framework linking various media processing systems to create workflows. For example, GStreamer can build a system that reads files in one format, processes them, and exports them in another. The formats and processes can be changed in a plug-and-play fashion. Vitis Video Analytics SDK (VVAS) leverages the ease of use of the GStreamer framework to build seamless streaming pipelines for AI-based video and image analytics and several other solutions without needing any understanding of FPGA or other development environment complexities. VVAS provides several hardware accelerators for various functionalities and highly optimized GStreamer plug-ins meeting most of the requirements of video analytics and transcoding solutions. VVAS also provides an easy-to-use framework to integrate their own hardware accelerators/kernels into GStreamer framework-based applications.

## SmartCam VVAS Code

The SmartCam application VVAS code, uses the Video Capture, AI Pre-processing plug-in, AI Inference plug-in, AI Rendering plug-in, and DP output plug-in to perform the facedetect application. This step only performs the image-resizing kernel which can be performed using the AI pre-processing plug-in. It uses an xmultisrc infrastructure plug-in which is used to invoke the image-resizing kernel. The AI Inference plug-in, AI Rendering plug-in, and DP output plug-in are explained in the ML Inference step.

## Image Processing Application

The following graph shows the Image Resizing application from input video to output. All the individual blocks are various plug-ins that are used. At the bottom, are the different hardware engines that are utilized throughout the application. The GStreamer pipeline works as follows:

![image-resizing](./images/Images/image-resizing.png)

- ***Video Capture plug-in:*** Streaming data comes over the MIPI camera directly. The meadiasrc bin plug-in is a wrapper around GStreamer generic v4l2src plug-in. The mediasrcbin plug-in is designed to simplify using live video capture devices in this design.

- ***Image Pre-processing plug-in:*** The captured frames are sent to the image pre-processing step, where the input image can be pre-processed before inference. The pre-processing step is performed by the vvas_xmultisrc plug-in. The vvas_xmultisrc plug-in calls the PP kernel on the hardware. The pre-processor step converts the NV12 image to BGR format and resizes the image.

- ***File o/p plug-in:*** Finally, the filesink Gstreamer plug-in is used to output to the local disk, and so on.

## Video Capture plug-in

[Video Capture](https://xilinx.github.io/kria-apps-docs/kv260/2022.1/build/html/docs/smartcamera/docs/sw_arch_platform.html#video-capture) at the user-space level uses a Media source bin plug-in. The [mediasrcbin](https://xilinx.github.io/kria-apps-docs/kv260/2022.1/build/html/docs/smartcamera/docs/sw_arch_platform.html#media-source-bin-gstreamer-plugin) plug-in is designed to simplify the usage of live video capture devices in this design. The plug-in is a bin element that includes the standard v4l2src GStreamer element. It allows you to configure the media pipeline and its sub-devices. It uses the libmediactl and libv4l2subdev libraries which provide the following functionality:

```text
- Enumerate entities, pads and links
- Configure sub-devices
  - Set media bus format
  - Set dimensions (width/height)
  - Set frame rate
  - Export sub-device controls
```

## Image Pre-processing plug-in

SmartCam VVAS code uses the xmultisrc plug-in to perform the [Image pre-processing step](https://github.com/Xilinx/smartcam/blob/xlnx_rel_v2022.1/src/vvas_xpp_pipeline.c). The [xmultisrc](https://xilinx.github.io/VVAS/2.0/build/html/docs/common/common_plug-ins.html#vvas-xmultisrc) is a generic infrastructure plug-in that is used to build custom accelerations. The plug-in abstracts the GStreamer framework's core/common functionality, such as caps negotiations, buffer management, etc.  The plug-in can have one input pad and multiple-output pads. The xmultisrc plug-in takes the configuration file as one of the input properties, kernels-config. This configuration file is in JSON format and contains the information the kernel requires. During the initialization step, the xmultisrc parses the JSON file and performs the following tasks:

1. Finds the VVAS acceleration software library in the path and loads the shared library.
2. Understands the acceleration software library type and prepares the acceleration software library handle (VVASKernel) to be passed to the core APIs

![xmultisrc](./images/Images/xmultisrc.png)

## Image Resizing the JSON File

The SmartCam VVAS xmultisrc plug-in uses the following JSON file which is used to control the image resizing kernel. The JSON file points to the xclbin, vvas library repo, kernel-name, and library-name.

In the [Vitis Compile and Link section](./vitis-compile-link.md), the Makefile outputs a **xclbin and system.bit** the binaries.  In the [PetaLinux firware step](./petalinux-firmware.md), you learn that the binary is loaded in `/opt/xilinx location`.

```text
{  
  xclbin-location":"/opt/xilinx/kv260-smartcam/kv260-smartcam.xclbin",
  "vvas-library-repo": "/opt/xilinx/kv260-smartcam/lib",
  "element-mode": "transform",
  "kernels": [
    {
      "kernel-name": "pp_pipeline_accel:{pp_pipeline_accel_1}",
      "library-name": "libvvas_xpp.so",       
      "config": {


      }
    }
  ]
}
```

| Property Name         | Type          |  Default              | Description                                   |
| :---                  |    :----:     | :----:                |   :----:                                            |
| xclbin-location       | String        |   NULL                | The path of xclbin, including the xclbin name. The plug-in downloads this xclbin and creates an XRT handle for memory allocation and programming kernels.                                              |
| vvas-library-repo     | String        |   /usr/lib            | The library path for the VVAS repository for all the acceleration software libraries.                                               |
| kernels               | N/A           |    N/A                | The JSON tag for starting the kernel-specific configurations.                                              |
| kernel-name           | String        |   NULL                | Name and instance of a kernel separated by “:” as mentioned in the xclbin.                                              |
| library-name          | String        |  NULL                 | The acceleration software library name for the kernel. This is appended to vvas-library-repo for an absolute path.                                             |
| config                | N/A           |    N/A                | The JSON tag for kernel-specific configurations depends on the acceleration software library.                                              |

## Acceleration Development guide for XMULTISRC

The [xmultisrc](https://xilinx.github.io/VVAS/2.0/build/html/docs/common/common_plugins.html#vvas-xmultisrc) plug-in interacts with the acceleration kernel through a set of core APIs and utility APIs exposed by an acceleration software library. The SmartCam VVAS code uses the xmultisrc plug-in to perform the [Image pre-processing step](https://github.com/Xilinx/smartcam/blob/xlnx_rel_v2022.1/src/vvas_xpp_pipeline.c). You use the same plug-in for the Image processing Application. In this tutorial, an overview of the plug-in development is provided.

### VVAS Core APIs

The GStreamer VVAS infrastructure plug-ins (vvas_xfilter and vvas_xmultisrc) call the core APIs to perform operations on the kernel. The core APIs invoke XRT, which sends the commands and manages the buffers to the kernel. The VVAS Core APIs have four API which are called by the GStreamer in sequence.

1. Plug-in initialization
2. Starting the kernel
3. Waiting for the kernel done
4. Deinitializing the plug-in

### Plug-in Initialization

- In this step, the xMultisrc plug-in invokes the xlnx_kernel_init function to perform a one-time initialization of any custom data structures. In this step, the smartcam xmultisrc plug-in reads the JSON file, allocates memory, and initializes the struct. This is performed at the Line-77 of the xmultisrc plug-in.

### Starting the Kernel

#### Kernel Properties

- Before starting the kernel, you should know about the Kernel mode and the type of kernels. This defines the set of APIs for starting the kernel.

#### Kernel Modes

- There are two types of kernel modes. These modes are documented in the [Execution Modes](https://docs.xilinx.com/r/en-US/ug1393-vitis-application-acceleration/Execution-Modes). In this tutorial, we will use the XRT Managed kernel, where XRT manages the kernel executions by hiding the implementation details from the user.
  - XRT Managed Kernel
  - User Managed Kernel.

#### Type of Kernel

- VVAS provides Hard and soft kernels. Embedded designs support only hard kernels written using HLS or RTL.

### Kernel Start

- The next step is to start the kernel, which is done using the xlnx_kernel_start function. xlnx_kernel_start is called by infrastructure plug-in for each input frame/buffer it has received. This will invoke the hardware kernel for each buffer. In this step, we will use the [vvas_kernel_start API](https://xilinx.github.io/VVAS/main/build/html/docs/common/Acceleration-Software-Library-Development.html#vvas-kernel-start) to invoke the image-resizing kernel. This is performed at the [Line-164](https://github.com/Xilinx/smartcam/blob/xlnx_rel_v2022.1/src/vvas_xpp_pipeline.c#L164) of the xmultisrc plug-in.

### Waiting for the kernel to finish

- The next step is to check whether the task is completed. The user needs to call. ***vvas_kernel_done API***. This API will return when the kernel finishes processing the current task. The developer can provide the “time-out” interval value indicating how long this API has to wait before it can return in case the kernel has not finished processing. The API can be called in the ***xlnx_kernel_start*** function or  ***xlnx_kernel_done*** function. This is performed at the [Line-182](https://github.com/Xilinx/smartcam/blob/xlnx_rel_v2022.1/src/vvas_xpp_pipeline.c#L182) of the xmultisrc plug-in.

### Denitilizating the plug-in

- ***xlnx_kernel_deinit API*** is called by the infrastructure plug-in when a plug-in is de-initializing, i.e., freeing the data structures allocated during the initialization step. This is performed at the [Line-68](https://github.com/Xilinx/smartcam/blob/xlnx_rel_v2022.1/src/vvas_xpp_pipeline.c#L68) of the xmultisrc plug-in.

### Conclusion

- This completes the overview of the vvas_xmultisrc plug-in, which is used to invoke the resizing accelerator on the FPGA device.

## File O/p plug-in

- The Filesink Gstreamer plug-in writes incoming data to a file in the local file system.

## Next Steps

This completes the VVAS overview. The next step is [PetaLinux firmware](./petalinux-firmware.md).

<hr class="sphinxhide"></hr>

<p class="sphinxhide" align="center"><sub>Copyright © 2023-2025 Advanced Micro Devices, Inc.</sub></p>

<p class="sphinxhide" align="center"><sup><a href="https://www.amd.com/en/corporate/copyright">Terms and Conditions</a></sup></p>