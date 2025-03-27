# Adding DPU IP

The AMD  Deep Learning Processor Unit (DPU) is a configurable computation engine dedicated to convolutional neural networks. The degree of parallelism utilized in the engine is a design parameter and application. It includes highly optimized instructions and supports most convolutional neural networks like VGG, ResNet, GoogleNet, YOLO, SSD, MobileNet, FPN, and others.

## Vitis AI Reference Design

[Vitis AI DPU IP and Reference Designs](https://xilinx.github.io/Vitis-AI/3.5/html/docs/workflow-system-integration#dpu-ip-details-and-system-integration) distribute the DPU IP and reference designs. This page has TRD designs and IP related to the Kria SOM target. [The Vitis DPU TRD tutorial](https://xilinx.github.io/Vitis-AI/3.5/html/docs/workflow-system-integration#vitis-ai-dpu-ip-and-reference-designs) explains the following:

- How to integrate a DPU in the Vitis and Vivado flow
- How to change the configuration of the DPU
- How to integrate the DPU in the customer platform in the Vitis 2022.1 environment

In this tutorial, you only look at the steps to integrate the DPU; for detailed information on the configuration, refer to [Vitis DPU TRD](https://xilinx.github.io/Vitis-AI/3.5/html/docs/workflow-system-integration#vitis-integration).

In summary, the Vitis DPU TRD mentions that to add a DPU to the project, you must have the following files in the repo:

- **DPU IP**: Found in the [Kria repo](https://github.com/Xilinx/kria-vitis-platforms/tree/xlnx_rel_v2022.1/kv260/overlays/dpu_ip) in the top-level directory.

- **Vitis DPU integration files**:  Found in the Kria repo in the [kernel-level directory](https://github.com/Xilinx/kria-vitis-platforms/tree/xlnx_rel_v2022.1/kv260/overlays/examples/smartcam/scripts).

- **`kernel_xml`**: Vitis XML files can be found in the Kria repo in the [kernel-level dir](https://github.com/Xilinx/kria-vitis-platforms/tree/xlnx_rel_v2022.1/kv260/overlays/examples/smartcam/kernel_xml).

- **`dpu_config.vh`**: [DPU configuration file](https://github.com/Xilinx/kria-vitis-platforms/blob/xlnx_rel_v2022.1/kv260/overlays/examples/smartcam/dpu_conf.vh)

- **scripts**: Scripts to compile the DPU. These can be found in the Kria repo in the [kernel-level dir](https://github.com/Xilinx/kria-vitis-platforms/tree/xlnx_rel_v2022.1/kv260/overlays/examples/smartcam/scripts).

- **prj_config**: System architecture specification. These can be found in the Kria repo in the [kernel-level dir](https://github.com/Xilinx/kria-vitis-platforms/blob/xlnx_rel_v2022.1/kv260/overlays/examples/smartcam/prj_conf/prj_config_1dpu).

>**IMPORTANT:** In this step, you add the DPU kernel and modify the system configuration files.

Navigate to `kv260/overlays/examples/smartcam`, and replace the Makefile with the following Makefile, which includes the DPU IP and DPU Vitis files:

```
//make sure you are in the smartcam directory 

cp ../../../../../../../code_repo_kria_vitis_acceleration_flow_2022.1/ml_inference/vitis_platform_files/Makefile .

```

Navigate to `kv260/overlays/examples/smartcam/prj_conf`, and replace the "prj_config_1dpu" with the prj_config_1dpu which includes the DPU System configuration

```
cd prj_conf 
cp ../../../../../../code_repo_kria_vitis_acceleration_flow_2022.1/ml_inference/vitis_platform_files/prj_config_1dpu .

```

## Configuration of the DPU

DPU configurations are mentioned in `dpu_config.vh`. This example uses a B3136 configuration.

## DPU Configuration

The DPU configuration file is used to specify clocks, system connectivity, and the number of DPUs. In this design, you use the following specifications. If you do not specify the number of DPUs using the `nk` option, it defaults to one.

```
freqHz=300000000:DPUCZDX8G_1.aclk
freqHz=600000000:DPUCZDX8G_1.ap_clk_2
sp=DPUCZDX8G_1.M_AXI_GP0:HP1
sp=DPUCZDX8G_1.M_AXI_HP0:HP1
sp=DPUCZDX8G_1.M_AXI_HP2:HPC1

```

## Next Steps

This completes the addition of the DPU IP. The next step is to compile and link the SmartCam hardware.

## Compile and Link Smartcam Hardware

Run the following command to generate the binaries. The Makefile invokes Vivado to compile the DPU and resize the kernel. Once the compilation finishes, it links it with the platform to generate a xclbin.

```
cd ../../../
make clean
make overlay OVERLAY=smartcam
```

## arch.json File

The arch.json file is an important file required by Vitis AI. Vitis generates the file during the compilation of the DPU. The Vitis-ai Model zoo has remade binaries for a fixed set of platforms. You can regenerate these models for the different targets using the JSON file. The Vitis AI compiler needs it to support model compilation with various DPU configurations. The `arch.json` file can be found in the `prj/Vitis/binary_container_1/sd_card` folder amd contains the following:

{
    "fingerprint":"0x101000016010406"
}

# Next Steps

This completes the DPU integration. The next step is to review the [Overview of SmartCam VVAS plugins](./smartcam-plugins-overview.md).

<hr class="sphinxhide"></hr>

<p class="sphinxhide" align="center"><sub>Copyright © 2023-2025 Advanced Micro Devices, Inc.</sub></p>

<p class="sphinxhide" align="center"><sup><a href="https://www.amd.com/en/corporate/copyright">Terms and Conditions</a></sup></p>