# Porting an Application to PetaLinux - Smartcam

This page documents a step by step example that ports a SmartCam application to run on a PetaLinux operating system. Use this as a guide to port your own applications onto PetaLinux.

>**NOTE:** From the 2022.1 release and newer, example applications are supported on Ubuntu® and not PetaLinux, which provides an opportunity to show the porting process for one of the example applications.

The example here was tested using SmartCam and tool version 2022.1. It assumes that you are already familiar with the SmartCam application either using [Ubuntu with tool version 2022.1](https://xilinx.github.io/kria-apps-docs/kv260/2022.1/build/html/docs/smartcamera/docs/app_deployment.html#) or [PetaLinux 2021.1](https://xilinx.github.io/kria-apps-docs/kv260/2021.1/build/html/docs/smartcamera/docs/app_deployment.html).

There are three ways to port SmartCam onto the PetaLinux OS:

Without having to use the PetaLinux toolchain:

* Build on target

Using the PetaLinux toolchain, the following two methods have some overlap steps with each other; therefore, they are documented under the [same section](#building-a-wic-image-or-rpm-packages):

* Build a new PetaLinux wic image with SmartCam baked in using recipes.
* Generate a RPM using PetaLinux and recipes, and move to target.

## Build on Target

This section outlines how to build SmartCam on a KV260 target running the released 2022.1 wic image. First, download and boot with [2022.1 PetaLinux Starter Kit Linux pre-built SD card image](https://xilinx-wiki.atlassian.net/wiki/spaces/A/pages/1641152513/Kria+K26+SOM#PetaLinux). Once booted, download git and the repositories required for building SmartCam (the FPGA firmware, AP1302 firmware, and SmartCam application software):

``` shell
sudo dnf install -y git
git clone --branch xlnx-rel-v2022.1_update4 https://github.com/Xilinx/kria-apps-firmware.git
git clone --branch xlnx_rel_v2022.1 https://github.com/Xilinx/ap1302-firmware.git
git clone --branch xlnx_rel_v2022.1 https://github.com/Xilinx/smartcam.git
```

Next, copy the SmartCam FPGA firmware and AP1302 firmware to the correct location:

```shell
cd kria-apps-firmware/boards/kv260/smartcam/
dtc -@ -O dtb -o kv260-smartcam.dtbo kv260-smartcam.dtsi # generate binary for device tree from .dtsi - errors can be ignored
cd /home/petalinux/
sudo cp kria-apps-firmware/boards/kv260/smartcam/ /lib/firmware/xilinx/kv260-smartcam -r
sudo cp ap1302-firmware/ap1302_ar1335_single_fw.bin /lib/firmware/
```

Next, install runtime and build dependencies.

>**NOTE:** The 2022.1 SmartCam is compatible only with specific versions of ZCOL and XRT. Therefore, install them first with the compatible versions to prevent the latest version to be installed when other dependencies are installed. (Tip: Copy the following section to a .sh file on target, and source the .sh file to save time.)
>**NOTE:** The example applications are verified with specific versions of XRT, VVAS, and Vitis-AI libraries, which might not be backward compatible. You need to first install specific versions per the following instructions. For more information, refer to the [library dependency](./library_dependency.md) page.

```shell
# install specific versions of zocl, xrt, VVAS, and Vitis-AI:
# zocl needs to be installed before xrt - otherwise xrt will install latest zocl as dependency
sudo dnf install -y zocl-202210.2.13.479
sudo dnf install -y xrt-202210.2.13.479
sudo dnf install -y vitis-ai-library-2.5
sudo dnf install -y vvas-accel-libs-2.0
sudo dnf install -y vitis-ai-library-dev-2.5
sudo dnf install -y vvas-accel-libs-dev-2.0

# Install the rest of runtime dependencies
sudo dnf install -y glog
sudo dnf install -y gstreamer1.0-rtsp-server
sudo dnf install -y opencv

# Install the rest of build time dependencies
sudo dnf install -y packagegroup-petalinux-self-hosted
sudo dnf install -y gst-perf-dev gstreamer1.0-omx-dev gstreamer1.0-python-dev
sudo dnf install -y gstreamer1.0-rtsp-server-dev v4l-utils-dev
sudo dnf install -y alsa-utils-dev opencv-dev
sudo dnf install -y gst-perf gstreamer1.0-omx gstreamer1.0-plugins-bad-faac
sudo dnf install -y gstreamer1.0-plugins-bad-mpegtsmux gstreamer1.0-plugins-good-rtp
sudo dnf install -y gstreamer1.0-plugins-bad-kms gstreamer1.0-plugins-bad-mediasrcbin
sudo dnf install -y gstreamer1.0-plugins-bad-videoparsersbad gstreamer1.0-plugins-good-multifile
sudo dnf install -y gstreamer1.0-plugins-good-rtpmanager gstreamer1.0-plugins-good-udp
sudo dnf install -y gstreamer1.0-plugins-good-video4linux2 gstreamer1.0-python
sudo dnf install -y libdrm-tests v4l-utils alsa-utils python3-core
```

Build the SmartCam application:

```shell
# build smartcam
cd smartcam
mkdir build
cd build
cmake -DCMAKE_INSTALL_PREFIX=/ ../
make -j
sudo make install
# smartcam binary will be available at  /opt/xilinx/kv260-smartcam/bin/smartcam
```

Finally, test the SmartCam on target:

```shell
sudo xmutil listapps                            # kv260-smartcam should show up in the list
sudo xmutil unloadapp                           # unload existing firmware
sudo xmutil loadapp kv260-smartcam              # Load smartcam firmware
sudo /opt/xilinx/kv260-smartcam/bin/smartcam -m
```

## Building a .wic Image or RPM Packages

You need PetaLinux 2022.1 with eSDK update 3 or later because the VVAS library is released asynchronously and not included in the main 2022.1 PetaLinux tools release. Download the PetaLinux Tools Installer 2022.1 from the [PetaLinux Download page](https://www.xilinx.com/support/download/index.html/content/xilinx/en/downloadNav/embedded-design-tools.html).

To install PetaLinux, extract the PetaLinux installer, accept the license, and source the tool's settings script.

```bash
petalinux-v2021.1-final-installer.run
source settings.sh
```

The eSDK can be used to update the PetaLinux tool for creating new images or SDKs. The eSDK updates are published [here](http://petalinux.xilinx.com/sswreleases/rel-v2022/sdkupdate/2022.1_update3/). Upgrade the tool with the new eSDK for the '2022.1 update3' release and source the tool's settings script.

```bash
petalinux-upgrade -u 'http://petalinux.xilinx.com/sswreleases/rel-v2022/sdkupdate/2022.1_update3/' -p 'aarch64'
source settings.sh
```

The PetaLinux tool is now updated with '2022.1 update3' Yocto eSDK.

### Step 1: Create PetaLinux Project

First, download the KV260 2022.1 BSP from the [Kria SOM Wiki](https://xilinx-wiki.atlassian.net/wiki/spaces/A/pages/1641152513/Kria+K26+SOM#PetaLinux-Board-Support-Packages). Using the PetaLinux tool version 2022.1, create a project:

```shell
petalinux-create -t project -s xilinx-kv260-starterkit-v2022.1-<timestamp>.bsp
cd xilinx-kv260-starterkit-2022.1/
```

>**NOTE:** You are now adding four recipes for the SmartCam FPGA firmware, AP1302 firmware, SmartCam software, and a package group to bring them together. The recipes will be added to the ```project-spec/meta-user``` folder, which is a meta-layer that is already included in the project, which you can confirm by looking at ```build/conf/bblayers.conf``` after a petalinux-build. If you choose to add the recipes to other meta-layer folders, be sure to [add the layer](https://docs.xilinx.com/r/en-US/ug1144-petalinux-tools-reference-guide/Adding-Layers) first.

### Step 2: Add Recipe for the SmartCam FPGA Firmware

FPGA firmware for SmartCam 2022.1 is released on [GitHub](https://github.com/Xilinx/kria-apps-firmware/tree/xlnx-rel-v2022.1_update4/boards/kv260/smartcam). It includes the bitstream, and its associated .xclbin, .dtsi, and shell.json files. First, make the `example_firmware` folder to keep the recipe file:

```shell
mkdir -p project-spec/meta-user/recipes-firmware/example_firmware
```

The following is the content for ```project-spec/meta-user/recipes-firmware/example_firmware/kv260-smartcam.bb```. The latest commit ID corresponds to the xlnx-rel-v2022.1_update4 tag when creating the recipe.

```python

SUMMARY = "Firmware for Example design"

LICENSE = "Proprietary & GPL-2.0"
LIC_FILES_CHKSUM = " \
        file://${WORKDIR}/git/LICENSE-BINARIES;md5=fa9b03ada9ffccf51dd60899bf28c702 \
        file://${WORKDIR}/git/LICENSE-GPLv2;md5=9afdcd1be3f71bd3791fa5961075d776 \
        "

# Specify the source of firmware
BRANCH = "xlnx_rel_v2022.1"
SRC_URI = "git://github.com/Xilinx/kria-apps-firmware.git;protocol=https;branch=${BRANCH}"
# the following specifies the commit ID of the version of repo to use
SRCREV = "9d7d92d8a89f911ae8c1b0a25316c924c1a4ff3f" 


inherit fpgamanager_custom

PACKAGE_ARCH = "${MACHINE_ARCH}"

FW_DIR = "boards/kv260/smartcam" #specifies which folder of the repo to use

COMPATIBLE_MACHINE:k26-kv = "${MACHINE}"
```

### Step 3: Add Recipe for the AP1302 Firmware

SmartCam uses AR1335 MIPI sensor, which requires AP1302 firmware. AP1302 is released on [github](https://github.com/Xilinx/ap1302-firmware/tree/xlnx_rel_v2022.1).  We will first create a folder called "ap1302-firmware" to keep the AP1302 recipes ```ap1302-firmware.inc``` and ```ap1302-ar1335-single-firmware.bb```.

```shell
mkdir -p project-spec/meta-user/recipes-firmware/ap1302-firmware/
```

The following is the content for ```project-spec/meta-user/recipes-firmware/ap1302-firmware/ap1302-ar1335-single-firmware.bb```:

```python
SUMMARY = "ap1302 ar1335-single firmware binary"

include ap1302-firmware.inc

FW_NAME = "ap1302_ar1335_single_fw.bin"
```

The following is the content for ```project-spec/meta-user/recipes-firmware/ap1302-firmware/ap1302-firmware.inc```, which the above recipe included:

```python
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
	# create /lib/firmware
	install -d ${D}/lib/firmware
	# copy firmware binary to /lib/firmware
	install -m 0644 ${FW_NAME} ${D}/lib/firmware/${FW_NAME}
}

FILES:${PN} = "/lib/firmware/${FW_NAME}"
```

### Step 4: Add Recipe for the SmartCam Software

Next, add the recipe for the SmartCam software, which is released at [GitHub](https://github.com/Xilinx/smartcam/tree/xlnx_rel_v2022.1) for 2022.1. Create a folder for the application recipe:

```shell
mkdir -p project-spec/meta-user/recipes-apps/smartcam/
```

Then, create the following content in the ```project-spec/meta-user/recipes-apps/smartcam/smartcam.bb``` file. Note the commit ID, and move it to the latest commit ID if needed.

```python
SUMMARY = "Example Smartcam application"

LICENSE = "Apache-2.0"
LIC_FILES_CHKSUM = "file://LICENSE;md5=a9c5ded2ac97b4ce01aa0ace8f3a1755"

BRANCH = "xlnx_rel_v2022.1"
SRC_URI = "git://github.com/Xilinx/smartcam.git;protocol=https;branch=${BRANCH}"
SRCREV = "ad9523ee5f002141334698eb6ddc9a14679ac8d2"

inherit cmake

# DEPENDS specifies runtime dependencies
DEPENDS = "vvas-accel-libs glog gstreamer1.0-rtsp-server opencv"
#RDEPENDS specifies build-time dependencies
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

### Step 5: Create Package Group

Next, create the package group to include both the firmware and software, as well as the AR1335 driver that is needed for this application. For details, see the *PetaLinux Tools Documentation: Reference Guide* ([UG1144](https://docs.amd.com/go/en-US/ug1144-petalinux-tools-reference-guide/Adding-a-Package-Group)).

```shell
mkdir -p project-spec/meta-user/recipes-core/packagegroups/
```

Then create ```project-spec/meta-user/recipes-core/packagegroups/packagegroup-kv260-smartcam.bb``` with the following content:

```text
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

Add the following line to ```project-spec/meta-user/conf/user-rootfsconfig```:

```text
CONFIG_packagegroup-kv260-smartcam
```

Enable the package group by using the following command to get to the configuration GUI:

```shell
petalinux-config -c rootfs
```

Go to ```user packages``` to enable packagegroup-kv260-smartcam.

### Step 6: Build

#### Option 1 - Baking into the WIC Image

Now that all the meta layers are in place, build the image:

```shell
petalinux-build
petalinux-package --wic --bootfiles "ramdisk.cpio.gz.u-boot boot.scr Image system.dtb"
```

Flash the generated image in ``images/linux/petalinux-sdimage.wic`` onto the SD card and boot it on a KV260.

#### Option 2 - Generate RPM and Install on the Released wic Image

```text
petalinux-build -c smartcam
petalinux-build -c kv260-smartcam
petalinux-build -c ap1302-ar1335-single-firmware
```

resulting rmp can be found in:

```shell
$TMP/deploy/rpm/xilinx_k26_kv/kv260-smartcam-1.0-r0.0.xilinx_k26_kv.rpm
$TMP/deploy/rpm/cortexa72_cortexa53/smartcam-1.0-r0.0.cortexa72_cortexa53.rpm
$TMP/deploy/rpm/cortexa72_cortexa53/ap1302-ar1335-single-firmware-1.0-r0.0.cortexa72_cortexa53.rpm
```

 $TMP location can be found at ```project-spec/configs/config CONFIG_TMP_DIR_LOCATION=$TMP```

Then, move the .rpm files to the target (that is booted in released 22.1 .wic image) and install using dnf, so the dependencies are also installed. However, for 2022.1 version of SmartCam, you need specific, compatible versions of ZOCL and XRT which is not the latest; therefore, you need to first install the specific versions to prevent a later, incompatible version to be installed automatically.

```shell
sudo dnf install -y zocl-202210.2.13.479-r0.0 
sudo dnf install -y xrt-202210.2.13.479-r0.0
sudo dnf install -y kv260-smartcam-1.0-r0.0.xilinx_k26_kv.rpm
sudo dnf install -y smartcam-1.0-r0.0.cortexa72_cortexa53.rpm
sudo dnf install -y ap1302-ar1335-single-firmware-1.0-r0.0.cortexa72_cortexa53.rpm
```

### Step 7: Test

Test that the firmware and applications loaded correctly:

```shell
sudo xmutil listapps                            # kv260-smartcam should show up in the list
sudo xmutil unloadapp                           # unload existing firmware
sudo xmutil loadapp kv260-smartcam              # Load smartcam firmware
sudo /opt/xilinx/kv260-smartcam/bin/smartcam -m # Execute smartcam application using a MIPI sensor
```

You should see the application displaying the image from the MIPI sensor to the screen.

<hr class="sphinxhide"></hr>

<p class="sphinxhide" align="center"><sub>Copyright © 2023–2025 Advanced Micro Devices, Inc.</sub></p>

<p class="sphinxhide" align="center"><sup><a href="https://www.amd.com/en/corporate/copyright">Terms and Conditions</a></sup></p>