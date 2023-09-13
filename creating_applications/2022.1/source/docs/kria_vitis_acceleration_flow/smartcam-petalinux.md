# Petalinux Firmware

In this step, we will use the fpgamanager class to include the Smarcam hardware FPGA binaries in the Petalinux image. The rest of the recipes and directory structure can be copied from the [Image resizing petalinux step](./petalinux-firmware.md).

## Platform outputs 

Before creating the smartcam petalinux firmware, lets bring all the platform outputs inside a smartcam platform_outputs directory. 

```
cd image_resize/ 
mkdir smartcam_platform_outputs 
cp platform/kria-vitis-platforms/kv260/overlays/examples/smartcam/binary_container_1/link/int/system.bit smartcam_platform_outputs
cp platform/kria-vitis-platforms/kv260/overlays/examples/smartcam/binary_container_1/dpu.xclbin smartcam_platform_outputs/

cp ../platform_outputs/tut_1.dtsi .


```

Rename the files to the following 

```

mv system.bit kv260-smartcam.bit
mv tut_1.dtsi  kv260-smartcam.dtsi
mv dpu.xclbnin kv260-smartcam.xclbin

```
Modify Line-17 of kv260-smartcam.dtsi to point to the correct binary 

```
firmware-name = "kv260-smartcam.bit.bin";
```


# Create PetaLinux Project
Create a PetaLinux project with the Starter Kit SOM BSP using the following commands. 

```
cd image_resize/
mkdir smartcam_firmware
cd smartcam_firmware
// copy the Downloaded BSP into the smartcam firmware folder
petalinux-create -t project -s xilinx-kv260-starterkit-v2022.1-05140151.bsp 
cd xilinx-kv260-starterkit-2022.1/
petalinux-build
```

## FPGA firmware
Generate the FPGA firmware recipe using the following command. Copy the shell.json  and dtsi files from the previous one and change the name of the binaries to the following.

Run the following command to generate the firmware recipe. 

```
petalinux-create -t apps --template fpgamanager -n kv260-smartcam --enable --srcuri " ../../smartcam_platform_outputs/kv260-smartcam.bit  ../../smartcam_platform_outputs/shell.json   ../../smartcam_platform_outputs/kv260-smartcam.dtsi ../../smartcam_platform_outputs/kv260-smartcam.xclbin" --force

```

## Add Recipe for AP1302 Firmware


Smartcam uses an AR1335 MIPI sensor, which requires AP1302 firmware. AP1302 is released on GitHub. We will first create a folder called "ap1302-firmware" to keep the AP1302 recipes ap1302-firmware.inc and ap1302-ar1335-single-firmware.bb. 

```
$> pwd 

mkdir -p project-spec/meta-user/recipes-firmware/ap1302-firmware/

```
Create a new file."ap1302-ar1335-single-firmware.bb" and Add the below  content for project-spec/meta-user/recipes-firmware/ap1302-firmware/ap1302-ar1335-single-firmware.bb:

```
SUMMARY = "ap1302 ar1335-single firmware binary"
 
include ap1302-firmware.inc
 
FW_NAME = "ap1302_ar1335_single_fw.bin"
```

Create a new file."ap1302-firmware.inc" and add the below content for project-spec/meta-user/recipes-firmware/ap1302-firmware/ap1302-firmware.inc.

```
LICENSE = "Proprietary"
LIC_FILES_CHKSUM = "file://LICENSE.txt;md5=9c13aad1aab42f76326f1beceafc40c4"
 
BRANCH ?= "xlnx_rel_v2022.1"
SRC_URI = "git://github.com/Xilinx/ap1302-firmware.git;protocol=https;branch=${BRANCH}"
SRCREV ?= "63e20752dc8b1e91fc6d6d518ebeb76f65e9f738"
 
S = "${WORKDIR}/git"
 
FW_NAME ?= ""
 
do_configure[noexec] = "1"
do_compile[noexec] = "1"
 
do_install() {
    install -d ${D}/lib/firmware  # create /lib/firmware
    install -m 0644 ${FW_NAME} ${D}/lib/firmware/${FW_NAME} # copy firmware binary to /lib/firmware
}
 
FILES:${PN} = "/lib/firmware/${FW_NAME}"

```

## Add Recipe for VVAS Smartcam 
Next, we add the recipe for smartcam software, released on [GitHub](https://github.com/Xilinx/smartcam/tree/xlnx_rel_v2022.1) for 2022.1. We first create a folder for the application recipe. 


```
$> pwd
mkdir -p project-spec/meta-user/recipes-apps/resize/

```

Create a new file, [smartcam.bb](./code/kria_vitis_acceleration_flow/ml_inference/petalinux_firmware/smartcam/smartcam.bb) and add the following content in project-spec/meta-user/recipes-apps/smartcam/smartcam.bb

```
SUMMARY = "Example Smartcam application"
 
LICENSE = "Apache-2.0"
LIC_FILES_CHKSUM = "file://LICENSE;md5=a9c5ded2ac97b4ce01aa0ace8f3a1755"
 
BRANCH = "xlnx_rel_v2022.1"
SRC_URI = "git://github.com/Xilinx/smartcam.git;protocol=https;branch=${BRANCH}"
SRCREV = "ad9523ee5f002141334698eb6ddc9a14679ac8d2"
 
inherit cmake
 
DEPENDS = "vvas-accel-libs glog gstreamer1.0-rtsp-server opencv"
RDEPENDS:${PN} = " \
    gst-perf \
    gstreamer1.0-omx \
    gstreamer1.0-plugins-bad-faac \
    gstreamer1.0-plugins-bad-mpegtsmux \
    gstreamer1.0-plugins-good-rtp \
    gstreamer1.0-plugins-bad-kms \
    gstreamer1.0-plugins-bad-mediasrcbin \
    gstreamer1.0-plugins-bad-videoparsersbad \
    gstreamer1.0-plugins-good-multifile \
    gstreamer1.0-plugins-good-rtpmanager \
    gstreamer1.0-plugins-good-udp \
    gstreamer1.0-plugins-good-video4linux2 \
    gstreamer1.0-python \
    gstreamer1.0-rtsp-server \
    vvas-accel-libs \
    libdrm-tests \
    v4l-utils \
    alsa-utils \
    python3-core \
    "
 
SOMAPP_INSTALL_PATH = "/"
EXTRA_OECMAKE += "-DCMAKE_BUILD_TYPE=Release -DCMAKE_SYSROOT=${STAGING_DIR_HOST} -DCMAKE_INSTALL_PREFIX=${SOMAPP_INSTALL_PATH} "
 
S = "${WORKDIR}/git"
 
FILES:${PN} += " \
    /opt/xilinx \
    "
```

Next, we want to create the package group to include both the firmware and software, as well as the AR1335 driver that is needed for this application. [UG1144](https://docs.xilinx.com/r/en-US/ug1144-petalinux-tools-reference-guide/Adding-a-Package-Group) also details this step. 

```
$> pwd
mkdir -p project-spec/meta-user/recipes-core/packagegroups/
```

Create a new file."packagegroup-kv260-example.bb" and add the following content to file project-spec/meta-user/recipes-core/packagegroups/packagegroup-kv260-example.bb

```
DESCRIPTION = "Example Smartcam related Packages"
 
inherit packagegroup
 
EXAMPLE_PACKAGES = " \
    ap1302-ar1335-single-firmware \    
    kv260-smartcam \
    smartcam \
    "
 
RDEPENDS:${PN} = "${EXAMPLE_PACKAGES}"
 
COMPATIBLE_MACHINE = "^$"
COMPATIBLE_MACHINE:k26-kv = "${MACHINE}"
PACKAGE_ARCH = "${MACHINE_ARCH}"

```
Add the below line to project-spec/meta-user/conf/user-rootfsconfig:

```
CONFIG_packagegroup-kv260-example
```

Enable the package group by using the below command to get to the configuration GUI,

```
petalinux-config -c rootfs

```
Go to "user packages" to enable packagegroup-kv260-smartcam and select "packagegroup-kv260-example". Select Yes to save the configurations and Exit.

## Build the Petalinux WIC Image

```
petalinux-build
petalinux-package --wic --bootfiles "ramdisk.cpio.gz.u-boot boot.scr Image system.dtb"
```

## Image SD card 

Petalinux Image will be generated in the "xilinx-kv260-starterkit-2022.1/images/linux" folder. Navigate to the folder. Using a GUI like balenaEtcher, flash a microSD card with the "petalinux-sdimage.wic" image.


## Next steps
This completes the Petalinux WIC Image generation. The next step is [running smartcam the board](./running-smartcam-on-board.md).
