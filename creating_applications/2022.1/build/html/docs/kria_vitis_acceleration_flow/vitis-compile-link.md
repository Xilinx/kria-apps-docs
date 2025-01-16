# Vitis Compile and Link

In this step, you will use the Vitis to compile and link the resize kernel. The Vitis compile and the link is outlined below:

1. Compile the kernel source code into Xilinx object files. 
2. Define the system configuration.
3. After compilation, the v++ -l command links kernel objects (XO), together with the hardware platform XPFM file, to produce the Xilinx binary *.xclbin* file.

## Compilation of HLS kernels

PL kernels written in C++ can be compiled into Xilinx object files (.xo) using the v++ --compile command described in [compiling C/C++ PL Kernels](https://docs.xilinx.com/r/en-US/ug1393-vitis-application-acceleration/Compiling-C/C-PL-Kernels). The synthesized kernel object (.xo) will be used in linking with System as described in Linking the Kernels section. Multiple options need to be used to compile the PL kernel code using the Vitis compiler. The *v++ -c -k kernel_name* compiles a kernel


## System configuration

As described in [Linking the Kernels](https://docs.xilinx.com/r/en-US/ug1393-vitis-application-acceleration/Linking-the-System), the process of linking kernels (.xo)  and the extensible platform (.xpfm) starts with a description of the architecture of the system using a configuration file. This file defines the number of kernel instances, or CUs, the memory layout of kernels, and the connection of streaming interfaces.

In this step, we will define the system configurations for the resizing application smartcam/prj_conf replace the prj_config_1dpu with prj_config_1dpu file; it contains a clock, connectivity, and vivado implementation strategies for the resize kernel. 


``` 
cd prj_conf 
cp ../../../../../../../code_repo_kria_vitis_acceleration_flow_2022.1/image_resizing/vitis_platform_files/prj_config_1dpu .
``` 

The contents of the file are described in the [Vitis-compiler-configuration section](https://docs.xilinx.com/r/en-US/ug1393-vitis-application-acceleration/connectivity-Options).

```
[clock]

freqHz=300000000:pp_pipeline_accel_1.ap_clk

[connectivity]

sp=pp_pipeline_accel_1.m_axi_gmem1:HP3
sp=pp_pipeline_accel_1.m_axi_gmem2:HP3
sp=pp_pipeline_accel_1.m_axi_gmem3:HP3

[advanced]
misc=:solution_name=link
param=compiler.addOutputTypes=hw_export

[vivado]
prop=run.impl_1.strategy=Performance_ExploreWithRemap

```

## Linking

After the resize kernel xo and system configuration are available, the system can be built using the *v++ --link* command. The Vitis compiler links the kernel .xo files to create a device executable (.xclbin) for Kria™ SOM devices. 

# Build the resize kernel. 

***Important: Replace the files*** 

- Replace the smartcamera kv260/overlays/examples/smartcam/Makefile with resizing kernel Makefile.  The default makefile contains sources to the DPU and the image pre-processing kernel. Replacing the makefile and system configuration builds only the Image resize kernel.  Run the below command to compile and build the resize application.

```
cd ..
cp ../../../../../../code_repo_kria_vitis_acceleration_flow_2022.1/image_resizing/vitis_platform_files/Makefile .
cd ../../../
make overlay OVERLAY=smartcam
```

The above makefile use the following command to ***compile*** the resize kernel

    v++ -t hw --platform kv260_ispMipiRx_vcu_DP -c -k pp_pipeline_accel -I $(XFOPENCV_INCDIR) -o'pp_pipeline_accel.xo' ./xf_pp_pipeline_accel.cpp

The above makefile use the following command to ***link*** the resize kernel to create a device executable (.xclbin):

    v++ -t hw --platform kv260_ispMipiRx_vcu_DP --save-temps --config ${DIR_PRJ}/prj_conf/prj_config_1 -l --temp_dir binary_container_1 --log_dir binary_container_1/logs --remote_ip_cache binary_container_1/ip_cache 

The generated ***bitfile*** and  ***dpu.xclbin*** will be located at the following location

```
ls overlays/examples/smartcam/binary_container_1/link/int/system.bit   
ls overlays/examples/smartcam/binary_container_1/dpu.xclbin
``` 

The generated Vivado project will be located at. You can open the Vivado project to see how to resize the kernel that is connected to the system.

```
cd overlays/examples/smartcam/binary_container_1/link/vivado/vpl/prj

vivado prj.xpr
```



## Next steps

This completes the Vitis Compile and Link. The next step is the Overview of [VVAS plugins](./vvas-plugins.md).
