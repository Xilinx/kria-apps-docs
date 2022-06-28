# Vitis Accelerator Flow Example - Replacing DPU with Filter2d Accelerator in Smartcam Application

This page will walk you through an example of replacing pre-processing and DPU in [Smart Camera application](https://xilinx.github.io/kria-apps-docs/main/build/html/docs/smartcamera/smartcamera_landing.html)
with a simple accelerator (in this case, filter2d) in the Vitis Accelerator Flow. This particular example make use of the Makefile environment provided with [kv260_vitis repository](https://github.com/Xilinx/kv260-vitis). Please first read [Vitis Accelerator Flow](./vitis_accel_flow.md) before trying this example.

This example was created with 21.1 tools and BSP. You will need Vitis. This application assumes that you are familiar with Smart Camera application, and have already booted Linux with a Smartcamera application running. If you have not yet done that, please go through [smartcam application deployment](https://xilinx.github.io/kria-apps-docs/main/build/html/docs/smartcamera/smartcamera_landing.html).

This example will generate 2 files - .bit.bin (PL bitstream) and .xclbin file for the specific accelerator. You will re-use .dtbo (device tree overlay), and shell.json file from smartcam platform because we are using the same platform.

## Obtaining Platform

Since we are altering smartcam application only and not the platform, we will first need to get the platform smartcam is based on - kv260_ispMipiRx_vcu_DP. Detailed tutorial is at [Creating Vitis Platform](https://xilinx.github.io/kria-apps-docs/main/build/html/docs/build_vitis_platform.html). Here are the specific commands to use to generate the platform:

```shell
git clone --recursive https://github.com/Xilinx/kv260-vitis.git
cd $workdir/kv260-vitis
make platform PFM=kv260_ispMipiRx_vcu_DP
```

The platform will be available now in ```kv260-vitis/platforms/xilinx_kv260_ispMipiRx_vcu_DP_202110_1/```.

## Obtaining filter2d

Filter2d RTL kernel can be found [here](https://gitenterprise.xilinx.com/PAEG/spa_accel/tree/2021.1/examples/filter2d_pl). in a seperate folder, please download and extract the filter2d_pl and copy it to smartcam folder:

```shell
cd $workdir
git clone https://gitenterprise.xilinx.com/PAEG/spa_accel
cp spa_accel/examples/filter2d_pl/ kv260-vitis/overlays/examples/smartcam/ -r
```

You may need to update ```$workdir/kv260-vitis/overlays/examples/smartcam/filter2d_pl/kernel/Makefile``` so that it is pointing to the right include directory:

```text
XFOPENCV_INCDIR = ../../../vitis_libraries/vision/L1/include
```

may need to be updated to:

```text
XFOPENCV_INCDIR = ../../../../Vitis_Libraries/vision/L1/include
```

## Altering Application/Overlay

The next step is to alter the smartcam overlay. This is the overlay folder:

```shell
cd $workdir/kv260-vitis/overlays/examples/smartcam/
```

You will now find a Makefile in that level - open it up and remove DPU and add filter2d. We will first want to remove generation of DPU and its pre-processing. This means removing packing of .xo files for those 2 RTL kernels.

remove the following lines for DPU (in 3 seperate places:

```text
dpu_HDLSRCS=kernel_xml/dpu/kernel.xml\
	     scripts/package_dpu_kernel.tcl\
	     scripts/gen_dpu_xo.tcl\
	     ../../dpu_ip/Vitis/dpu/hdl/DPUCZDX8G.v\
	     ../../dpu_ip/Vitis/dpu/inc/arch_def.vh\
	     ../../dpu_ip/Vitis/dpu/xdc/*.xdc\
	     ../../dpu_ip/DPUCZDX8G_*/hdl/DPUCZDX8G_*_dpu.sv\
	     ../../dpu_ip/DPUCZDX8G_*/inc/function.vh\
             ../../dpu_ip/DPUCZDX8G_*/inc/arch_para.vh

dpu_TCL=scripts/gen_dpu_xo.tcl
DPU_KERN_NAME = DPUCZDX8G
dpu_xo = binary_container_1/dpu.xo


binary_container_1/dpu.xo: $(dpu_HDLSRCS)
	@mkdir -p $(@D)
	-@$(RM) $@
	$(VIVADO) -mode batch -source $(dpu_TCL) -tclargs $@ $(DPU_KERN_NAME) ${TARGET} mpsoc


	cp ./binary_*/link/vivado/vpl/prj/prj.gen/sources_1/bd/*/ip/*_DPUCZDX8G_1_0/arch.json ./binary_*/sd_card

```
remove the following lines for preprocessing (PP):
```
KERNEL = pp_pipeline_accel
KERNEL_XO = $(KERNEL)/$(KERNEL).xo

KERNEL_XO_FLAGS = -k $(KERNEL) -I$(XFOPENCV_INCDIR) -D__SDSVHLS__ -DHLS_NO_XIL_FPO_LIB --advanced.prop kernel.pp_pipeline_accel.kernel_flags="-std=c++0x"

$(KERNEL_XO): xf_pp_pipeline_accel.cpp
	@mkdir -p $(@D)
	-@$(RM) $@
	$(VPP) $(VPP_XO_FLAGS) -o $@ $<
	-@$(RM) .Xil
```
 
Add filter2d .xo file generation and Makefile calls in 3 different places:
```
filter2d_xo = filter2d_pl/kernel/filter2d_pl_accel/filter2d_pl_accel.xo


$(BINARY_CONTAINER): $(filter2d_xo)
	$(VPP) $(VPP_LINK_FLAGS) -o $@ $(+)
	$(XBU) $(XBU_FLAGS) --input $(BINARY_CONTAINER) --output tmp.xclbin
	-@$(MV) tmp.xclbin $(BINARY_CONTAINER)
	-@$(RM) .Xil

$(filter2d_xo):
	$(MAKE) -C filter2d_pl/kernel
 
 
	$(MAKE) -C filter2d_pl/kernel clean

```

 Remove invocation for strip_interconnects.tcl as we wont need it:

 ```text
 --xp param:compiler.userPostSysLinkOverlayTcl=${DIR_PRJ}/prj_conf/strip_interconnects.tcl 
 ```

 Replace the 2 kernels with filter2d kernel:
 remove ```dpu_pp_xo = $(KERNEL_XO) $(dpu_xo)```
 add ```dpu_pp_xo =  $(filter2d_xo)```

The resulting Makefile can be found in [example Makefile](./example_src/vitis_accel_example_smartcam_filter2d_makefile) you can compare it with the original Makefile [here](https://github.com/Xilinx/kv260-vitis/blob/release-2021.1/overlays/examples/smartcam/Makefile)

Next, we need to connect the filter2d accelerator to the processor subsystem. Open ```prj_conf/prj_config_1dpu```, remove DPUCZDX8G and pp_pipeline_accel_1 clocks and connectivity, and connect filter2d to HP1:

```text
[clock]
#freqHz=300000000:DPUCZDX8G_1.aclk
#freqHz=600000000:DPUCZDX8G_1.ap_clk_2
#freqHz=300000000:pp_pipeline_accel_1.ap_clk
freqHz=200000000:filter2d_pl_accel_0.ap_clk
[connectivity]
#sp=DPUCZDX8G_1.M_AXI_GP0:HP1
#sp=DPUCZDX8G_1.M_AXI_HP0:HP1
#sp=DPUCZDX8G_1.M_AXI_HP2:HPC1
#sp=pp_pipeline_accel_1.m_axi_gmem1:HP3
#sp=pp_pipeline_accel_1.m_axi_gmem2:HP3
#sp=pp_pipeline_accel_1.m_axi_gmem3:HP3
#sp=pp_pipeline_accel_1.m_axi_gmem4:HP3

nk=filter2d_pl_accel:1:filter2d_pl_accel_0
sp=filter2d_pl_accel_0.frm_in:HP1
sp=filter2d_pl_accel_0.frm_out:HP1
sp=filter2d_pl_accel_0.kernel:HP1
```

Now you have finished all the modifications needed to replace preprocessor and DPU with filter2d.

## Generate bitstream and .xclbin

You can now call the top level Makefile to generate the files required:

```shell
cd ../../../
make overlay OVERLAY=smartcam
```

The generated vivado project will be located at:

```shell
$working_dir/kv260-vitis/overlays/examples/smartcam/binary_container_1/link/vivado/vpl/prj
```

You can open up the Vivado project to see how filter2d is connected into the system.

The generated bitfile and xclbin will be located at

```shell
$working_dir/kv260-vitis/overlays/examples/smartcam/binary_container_1/link/int/system.bit   
$working_dir/kv260-vitis/overlays/examples/smartcam/binary_container_1/*.xclbin
```

rename .xclbin file to ```filter2d.xclbin```

Now you will need to convert system.bit to a .bit.bin file:

```shell
cd overlays/examples/smartcam/binary_container_1/link/int/
echo 'all:{system.bit}'>bootgen.bif
bootgen -w -arch zynqmp -process_bitstream bin -image bootgen.bif
mv system.bit.bin filter2d.bit.bin
```

now you have a ```filter2d.xclbin``` and ```filter2d.bit.bin```

## Modify PetaLinux to include SW stack for filter2d

The base PetaLinux for SOM doesnt include the sw stack for filter2d. You will need to create a petalinux project from released bsp, clone the repo with software support for filter2d. You will then copy the notebook folder into recipes folder, add entry to rootfs config, and rebuild PetaLinux.

```shell
petalinux-create -t project -s xilinx-k26-starterkit-v2021.1-final.bsp
git clone --recursive https://github.com/Xilinx/vck190-base-trd.git
cp vck190-base-trd/overlays/filter2d/apps/filter2d-notebooks/ xilinx-k26-starterkit-2021.1/project-spec/meta-user/recipes-apps/ -rf
mkdir xilinx-k26-starterkit-2021.1/project-spec/meta-user/recipes-apps/bigbuckbunny-360p-vp9-webm/
cp vck190-base-trd/petalinux/xilinx-vck190-base-trd/project-spec/meta-base-trd/recipes-multimedia/sample-content/bigbuckbunny-360p-vp9-webm.bb xilinx-k26-starterkit-2021.1/project-spec/meta-user/recipes-apps/bigbuckbunny-360p-vp9-webm/
cd xilinx-k26-starterkit-2021.1
echo 'CONFIG_filter2d-notebooks' >> ./project-spec/meta-user/conf/user-rootfsconfig
echo 'CONFIG_filter2d-notebooks=y' >> ./project-spec/configs/rootfs_config
echo 'CONFIG_bigbuckbunny-360p-vp9-webm' >> ./project-spec/meta-user/conf/user-rootfsconfig
echo 'CONFIG_bigbuckbunny-360p-vp9-webm=y' >> ./project-spec/configs/rootfs_config
petalinux-build
petalinux-package --wic --bootfiles "ramdisk.cpio.gz.u-boot boot.scr Image system.dtb"
```

This generates a wic image, zip up the wic image if you need to move the image to another location before programming sd card

```shell
gzip images/linux/petalinux-sdimage.wic
```

Program the wic image into your SD card. Plug the SD card into KV260's SD card slot.

## Optional Steps to Generate shell.json and .dtbo file

Because we are re-using the same platform smartcam application is based on, we can re-use the smartcam shell.json and kv260-smartcam.dtbo file in the firmware folder as indicated in the following section. However, if you prefer, you can also generate them seperatedly. Note that you will still need to download and install smartcam for the software dependencies this example uses.

Shell.json can be generated using the instruction [here](target.md#shelljson-file).

filter2d.dtbo can be generated by using the same [.dtsi](https://github.com/Xilinx/kv260-firmware/blob/release-2021.1/smartcam/kv260-smartcam.dtsi) file and compile using [dtc](./dtsi_dtbo_generation.md#tools-and-input-required):

```shell
dtc -@ -O dtb -o filter2d.dtbo kv260-smartcam.dtsi
```

## Run Application on Target

This application assumes that you are familiar with Smart Camera application, and knows how to booted Linux with a Smartcamera application running. If you have not yet done that, please go through [smartcam application deployment](https://xilinx.github.io/kria-apps-docs/main/build/html/docs/smartcamera/smartcamera_landing.html).  The following commands in target (kv260) will download smartcam and their dependencies:

```shell
sudo dnf clean all
sudo dnf update -y
sudo xmutil getpkgs
sudo dnf install packagegroup-kv260-smartcam.noarch -y
```

With smartcam application downloaded, we have all the software dependencies needed to run gstreamer, as well as the .dtbo file and shell.json file. Note that because we reused the same platform from smartcam, we can re-use the .dtbo file from smartcam.

Transfer  ```filter2d.xclbin``` and ```filter2d.bit.bin``` to target kv260 using scp or your chosen method. On target, make a new filter2d directory and copy needed files into directory:

```shell
sudo mkdir /lib/firmware/xilinx/filter2d
sudo cp /lib/firmware/xilinx/kv260-smartcam/kv260-smartcam.dtbo /lib/firmware/xilinx/filter2d/filter2d.dtbo
sudo cp /lib/firmware/xilinx/kv260-smartcam/shell.json /lib/firmware/xilinx/filter2d/
sudo cp filter2d.bit.bin /lib/firmware/xilinx/filter2d/
sudo cp filter2d.xclbin /lib/firmware/xilinx/filter2d/
```

modify  ```/usr/share/ivas/base-trd/kernel_xfilter2d_pl.json``` so that ```xclbin-location``` points to ```filter2d.xclbin`` location.
Now load the new application:

```shell
sudo xmutil unloadapp
sudo xmutil loadapp filter2d
```

Now first try running gstreamer with the accelerator by-passed to make sure things work fine, you should expect to see the monitor displaying what it captured in MIPI. This command assumes that we use a MIPI camera mapped to media0, and that monitor supports 1920x1080p:

```shell
gst-launch-1.0 mediasrcbin media-device=/dev/media0 v4l2src0::io-mode=mmap ! "video/x-raw, width=1920, height=1080, format=NV12, framerate=30/1" ! perf ! kmssink plane-id=39 fullscreen-overlay=true -v
```

This confirms that the monitor is working as expected.

Next, try running using filter2d in the PL. The filter2d accelerator we included only takes YuY2 format, while our MIPI sensors are in NV12 format. Therefore, we need to find a compatible video to try the filter2d with. In this case we googled and downloaded bbb_sunflower_1080p_30fps_normal.mp4 from [online](https://mirror.clarkson.edu/blender/demo/movies/BBB/) and placed them in /home/petalinux/bbb_sunflower_1080p_30fps_normal.mp4. Then we can execute the following:

```shell
gst-launch-1.0 filesrc location="bbb_sunflower_1080p_30fps_normal.mp4" ! decodebin ! videoconvert ! video/x-raw, width=1920, height=1080, format=YUY2, framerate=30/1 ! ivas_xfilter kernels-config=/usr/share/ivas/base-trd/kernel_xfilter2d_pl.json dynamic-config='{ "filter_preset" : "edge" }' ! perf ! kmssink driver-name=xlnx plane-id=39 fullscreen-overlay=true sync=false -v
```

You should be able to see a the video being displayed with filter_preset set to "edge". You can try other presents as well, the list can be found [here](https://github.com/Xilinx/vck190-base-trd/blob/c18ebb34b7828e47a33bfb3c7a0899f3d7c77d13/overlays/filter2d/apps/filter2d-notebooks/filter2d-notebooks/ivas-accel-sw-libs/ivas_xfilter2d_pl/src/ivas_xfilter2d.h#L50). If there are spaces in preset, replease it with underscore. For an example, ```horizontal edge``` should be ```horizontal_edge``` in above command.  The framerate being displayed will be slow - we had to do format convertation in software, therefore each frame will take time.

## License

Licensed under the Apache License, Version 2.0 (the "License"); you may not use this file except in compliance with the License.

You may obtain a copy of the License at
[http://www.apache.org/licenses/LICENSE-2.0](http://www.apache.org/licenses/LICENSE-2.0)

Unless required by applicable law or agreed to in writing, software distributed under the License is distributed on an "AS IS" BASIS, WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied. See the License for the specific language governing permissions and limitations under the License.

<p align="center">Copyright&copy; 2021 Xilinx</p>