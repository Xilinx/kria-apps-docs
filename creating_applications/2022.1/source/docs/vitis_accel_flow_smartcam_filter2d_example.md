# Vitis Accelerator Flow Example - Replacing DPU with Filter2d Accelerator in Smartcam Application

This page will walk you through an example of replacing pre-processing and DPU in [Smart Camera application](https://xilinx.github.io/kria-apps-docs/kv260/2022.1/build/html/docs/smartcamera/smartcamera_landing.html)
with a simple accelerator (in this case, filter2d) in the Vitis Accelerator Flow. This particular example make use of the Makefile environment provided with [KV260 Vitis Repository](https://github.com/Xilinx/kria-vitis-platforms). Please first read [Vitis Accelerator Flow](./vitis_accel_flow.md) before trying this example.

This example was created with 22.1 tools and BSP and is based on Ubuntu. You will need Vitis. This application assumes that you are familiar with smartcam application, and have already booted Linux with a smartcam application running. If you have not yet done that, please go through [smartcam application deployment](https://xilinx.github.io/kria-apps-docs/kv260/2022.1/build/html/docs/smartcamera/smartcamera_landing.html).

This example will generate 2 files - .bit.bin (PL bitstream) and .xclbin file for the specific accelerator. You will re-use .dtbo (device tree overlay), and shell.json file from smartcam platform because we are using the same platform.

## Obtaining Platform

Since we are altering smartcam application only and not the platform, we will first need to get the platform smartcam is based on - kv260_ispMipiRx_vcu_DP. Detailed tutorial is at [Creating Vitis Platform](https://xilinx.github.io/kria-apps-docs/kv260/2022.1/build/html/docs/build_vitis_platform.html). Here are the specific commands to use to generate the platform:

```shell
git clone --branch xlnx_rel_v2022.1 --recursive https://github.com/Xilinx/kria-vitis-platforms.git
cd $workdir/kria-vitis-platforms/kv260/platforms
source <vitis path>/settings64.sh
make platform PFM=kv260_ispMipiRx_vcu_DP
```

The platform will be available now in ```kria-vitis-platforms/kv260/platforms/xilinx_kv260_ispMipiRx_vcu_DP_202110_1/```.

## Obtaining filter2d

Filter2d RTL kernel can be found [here](https://github.com/Xilinx/vck190-base-trd/tree/2022.1/overlays/filter2d/kernels/filter2d_pl/). The repository was targeted for VCK190, a board containing a Versal device, but since it's a soft IP, it works for Zynq MPSoC as well. In a separate folder, please download and extract the filter2d_pl and copy it to smartcam folder:

```shell
cd $workdir
git clone --branch 2022.1 https://github.com/Xilinx/vck190-base-trd
cd vck190-base-trd
cp overlays/filter2d/kernels/filter2d_pl/ ../kria-vitis-platforms/kv260/overlays/examples/smartcam/ -r
```

In ```$workdir/kria-vitis-platforms/kv260/overlays/examples/smartcam//overlays/filter2d/kernels/filter2d_pl/Makefile update the LINK_CFG with a zynqmp.cfg instead of vck190.cfg:

```text
LINK_CFG ?= zynqmp.cfg
```

The zynqmp.cfg should be placed  in the same level as Makefile and vck190.cfg and has the following content:

```text
[advanced]
param=compiler.addOutputTypes=hw_export
[vivado]
prop=run.impl_1.strategy=Performance_ExploreWithRemap
```

This will help meeting timing on Zynqmp Soc instead of vck190(Versal based)

## Altering Application/Overlay

The next step is to alter the smartcam overlay. This is the overlay folder:

```shell
cd $workdir/kria-vitis-platforms/kv260/overlays/examples/smartcam/
```

You will now find a Makefile in that level - open it up and remove DPU and add filter2d. We will first want to remove generation of DPU and its pre-processing. This means removing packing of .xo files for those 2 RTL kernels.

remove the following lines for DPU (in 3 separate places:

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

 Remove invocation for strip_interconnects.tcl as we won't need it:

 ```text
 --xp param:compiler.userPostSysLinkOverlayTcl=${DIR_PRJ}/prj_conf/strip_interconnects.tcl 
 ```

 Replace the 2 kernels with filter2d kernel:
 remove ```dpu_pp_xo = $(KERNEL_XO) $(dpu_xo)```
 add ```dpu_pp_xo =  $(filter2d_xo)```

The resulting Makefile can be found in [example Makefile](./example_src/filter2d_example/vitis_accel_example_smartcam_filter2d_makefile) you can compare it with the original Makefile [here](https://github.com/Xilinx/kria-vitis-platforms/blob/xlnx_rel_v2022.1/kv260/overlays/examples/smartcam/Makefile)

Next, we need to connect the filter2d accelerator to the processor subsystem. Open ```prj_conf/prj_config_1dpu```, remove DPUCZDX8G and pp_pipeline_accel_1 clocks and connectivity, and connect filter2d to HP1, and set clock to 200Mhz:

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

The generated Vivado project will be located at:

```shell
$working_dir/kria-vitis-platforms/kv260/overlays/examples/smartcam/binary_container_1/link/vivado/vpl/prj
```

You can open up the Vivado project to see how filter2d is connected into the system.

The generated bitfile and xclbin will be located at

```shell
$working_dir/kria-vitis-platforms/kv260/overlays/examples/smartcam/binary_container_1/link/int/system.bit   
$working_dir/kria-vitis-platforms/kv260/overlays/examples/smartcam/binary_container_1/*.xclbin
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

## Optional Steps to Generate shell.json and .dtbo file

Because we are re-using the same platform smartcam application is based on, we can re-use the smartcam shell.json and kv260-smartcam.dtbo file in the firmware folder as indicated in the following section. However, if you prefer, you can also generate them separatedly. Note that you will still need to download and install smartcam for the software dependencies this example uses.

Shell.json can be generated using the instruction [here](target.md#shelljson-file).

filter2d.dtbo can be generated by using the same [.dtsi](https://github.com/Xilinx/kria-apps-firmware/blob/xlnx_rel_v2022.1/kv260/smartcam/kv260-smartcam.dtsi) file and compile using [dtc](./dtsi_dtbo_generation.md#tools-and-input-required):

```shell
dtc -@ -O dtb -o filter2d.dtbo kv260-smartcam.dtsi
```

## Compile software on Ubuntu Target

Next, we will need to boot Ubuntu, and compile the software on target. We want to download the kria-developer container because that contains the environment to compile our code:

```shell
docker pull xilinx/kria-developer:latest
```

Then load docker container:

    ```bash
    docker run \
    --env="DISPLAY" \
    -h "xlnx-docker" \
    --env="XDG_SESSION_TYPE" \
    --net=host \
    --privileged \
    --volume="$HOME/.Xauthority:/root/.Xauthority:rw" \
    -v /tmp:/tmp \
    -v /dev:/dev \
    -v /sys:/sys \
    -v /etc/vart.conf:/etc/vart.conf \
    -v /lib/firmware/xilinx:/lib/firmware/xilinx \
    -v /run:/run \
    -it xilinx/kria-developer:latest bash
    ```

in the docker container, cd to /tmp and clone the git repo and build the filder2d app. We want to use /tmp because that folder is accessible inside and outside containers. However, note that the files there may not persist through reboot.

```bash
cd /tmp/
git clone --branch 2022.1 https://github.com/Xilinx/vck190-base-trd.git
cd vck190-base-trd/overlays/filter2d/apps/filter2d-notebooks/filter2d-notebooks
mkdir build;
cd build;
cmake .. && make -j &&make install
```

This produces 2 files we will require and copy to /tmp/ folder

```bash
cp /usr/local/lib/vvas/libvvas_xfilter2d_pl.so /tmp/
cp /usr/local/share/vvas/base-trd/kernel_xfilter2d_pl.json /tmp/
```

## Run Application on Target

This application assumes that you are familiar with smartcam application and knows how to booted Linux with a smartcam application running. If you have not yet done that, please go through [smartcam application deployment](https://xilinx.github.io/kria-apps-docs/kv260/2022.1/build/html/docs/smartcamera/smartcamera_landing.html).  The following commands in target (KV260) will download smartcam and their dependencies:

```shell
docker pull xilinx/smartcam:2022.1
```

With smartcam application downloaded, we have most of the software dependencies needed to run gstreamer, as well as the .dtbo file and shell.json file. Note that because we reused the same platform from smartcam, we can re-use the .dtbo file from smartcam.

The filter2d accelerator we included only takes YuY2 format, while our MIPI sensors are in NV12 format. Therefore, we need to find a compatible video to try the filter2d with. In this case we googled and downloaded bbb_sunflower_1080p_30fps_normal.mp4 from [here](https://mirror.clarkson.edu/blender/demo/movies/BBB/) or [here](http://ftp.vim.org/ftp/ftp/pub/graphics/blender/demo/movies/BBB/) and placed them in /tmp/bbb_sunflower_1080p_30fps_normal.mp4. The /tmp folder is accessible by ubuntu or by containers.

Transfer  ```filter2d.xclbin``` and ```filter2d.bit.bin``` to target KV260 using scp or your chosen method. On target, make a new filter2d directory and copy needed files into directory:

```shell
sudo mkdir /lib/firmware/xilinx/filter2d
// sudo cp /lib/firmware/xilinx/kv260-smartcam/kv260-smartcam.dtbo /lib/firmware/xilinx/filter2d/filter2d.dtbo
sudo cp /lib/firmware/xilinx/kv260-smartcam/shell.json /lib/firmware/xilinx/filter2d/
sudo cp filter2d.dtbo /lib/firmware/xilinx/filter2d/filter2d.dtbo
sudo cp filter2d.bit.bin /lib/firmware/xilinx/filter2d/
sudo cp filter2d.xclbin /lib/firmware/xilinx/filter2d/
```

modify  ```/tmp/kernel_xfilter2d_pl.json``` so that ```xclbin-location``` points to ```/lib/firmware/xilinx/filter2d/filter2d.xclbin`` location.

Now load the new application with filter2d firmware and smartcam container:

```shell
sudo xmutil desktop_disable
sudo xmutil unloadapp
sudo xmutil loadapp filter2d

docker run \
--env="DISPLAY" \
-h "xlnx-docker" \
--env="XDG_SESSION_TYPE" \
--net=host \
--privileged \
--volume="$HOME/.Xauthority:/root/.Xauthority:rw" \
-v /tmp:/tmp \
-v /dev:/dev \
-v /sys:/sys \
-v /etc/vart.conf:/etc/vart.conf \
-v /lib/firmware/xilinx:/lib/firmware/xilinx \
-v /run:/run \
-it xilinx/smartcam:2022.1 bash
```

First try running gstreamer with the accelerator by-passed to make sure things work fine, you should expect to see the monitor displaying what it captured in MIPI. This command assumes that we use a MIPI camera mapped to media0, and that monitor supports 1920x1080p:

```shell
gst-launch-1.0 mediasrcbin media-device=/dev/media0 v4l2src0::io-mode=mmap ! "video/x-raw, width=1920, height=1080, format=NV12, framerate=30/1" ! perf ! kmssink plane-id=39 fullscreen-overlay=true -v
```

This confirms that the monitor is working as expected.

Next, try running using filter2d in the PL. Copy the software to the following folders:

```shell
mkdir /usr/lib/vvas/
cp /tmp/libvvas_xfilter2d_pl.so /usr/lib/vvas/

gst-launch-1.0 filesrc location="/tmp/bbb_sunflower_1080p_30fps_normal.mp4" ! decodebin ! videoconvert ! video/x-raw, width=1920, height=1080, format=YUY2, framerate=30/1 ! vvas_xfilter kernels-config=/tmp/kernel_xfilter2d_pl.json dynamic-config='{ "filter_preset" : "edge" }' ! perf ! kmssink driver-name=xlnx plane-id=39 fullscreen-overlay=true sync=false -v
```

You should be able to see the video being displayed with filter_preset set to "edge". You can try other presets as well. The list can be found [here](https://github.com/Xilinx/vck190-base-trd/blob/2022.1/overlays/filter2d/apps/filter2d-notebooks/filter2d-notebooks/vvas-accel-sw-libs/vvas_xfilter2d_pl/src/vvas_xfilter2d.h#L50). If there are spaces in preset, replease it with underscore. For an example, ```horizontal edge``` should be ```horizontal_edge``` in above command.  The framerate being displayed will be slow - we had to do format convertation in software, therefore each frame will take time.

## License

Licensed under the Apache License, Version 2.0 (the "License"); you may not use this file except in compliance with the License.

You may obtain a copy of the License at
[http://www.apache.org/licenses/LICENSE-2.0](http://www.apache.org/licenses/LICENSE-2.0)

Unless required by applicable law or agreed to in writing, software distributed under the License is distributed on an "AS IS" BASIS, WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied. See the License for the specific language governing permissions and limitations under the License.

<p class="sphinxhide" align="center">Copyright&copy; 2023 Advanced Micro Devices, Inc</p>