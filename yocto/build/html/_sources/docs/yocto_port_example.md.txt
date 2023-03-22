# Porting an Application to PetaLinux - Smartcam

This page documents a step by step example that ports Smartcam application to run on PetaLinux OS. Developers can use this as a guide to port their own applications onto PetaLinux. Note that starting from 2022.1 and newer, example applications are supported on Ubuntu and not PetaLinux, giving an opportunity to show porting process for one of the example applications.

The example here was tested using smartcam and tool version 2022.1. It assumes that you have already familiar with the smartcam application either using [Ubuntu with tool version 2022.1](https://xilinx.github.io/kria-apps-docs/kv260/2022.1/build/html/docs/smartcamera/docs/app_deployment.html#) or [PetaLinux 2021.1](https://xilinx.github.io/kria-apps-docs/kv260/2021.1/build/html/docs/smartcamera/docs/app_deployment.html).

There are 3 ways to port smartcam onto PetaLinux OS:

Without having to use PetaLinux toolchain:

    * Build on target

Using PetaLinux toolchain, the following two methods has some overlap steps with eachother, therefore they are documented under the [same section](#building-a-wic-image-or-rpm-packages):

    * Build a new PetaLinux wic image with smartcam baked in using recipes
    * Generate an RPM using PetaLinux and recipes, and move to target

## Build on Target

This section outlines how to build smartcam on KV260 target running released 2022.1 wic image. First, download and boot with [2022.1 PetaLinux Starter Kit Linux pre-built SD card image](https://xilinx-wiki.atlassian.net/wiki/spaces/A/pages/1641152513/Kria+K26+SOM#Kria-Starter-Kit-Linux). Once booted, download git, and repositories required for building smartcam - the FPGA firmware, AP1302 firmware, and smartcam application software:

```shell
sudo dnf install -y git
git clone --branch xlnx-rel-v2022.1_update4 https://github.com/Xilinx/kria-apps-firmware.git
git clone --branch xlnx_rel_v2022.1 https://github.com/Xilinx/ap1302-firmware.git
git clone --branch xlnx_rel_v2022.1 https://github.com/Xilinx/smartcam.git
```

Next, copy the smartcam FPGA Firmware and AP1302 firmware to the correct location:

```shell
cd kria-apps-firmware/boards/kv260/smartcam/
dtc -@ -O dtb -o kv260-smartcam.dtbo kv260-smartcam.dtsi # generate binary for device tree from .dtsi - errors can be ignored
cd /home/petalinux/
sudo cp kria-apps-firmware/boards/kv260/smartcam/ /lib/firmware/xilinx/kv260-smartcam -r
sudo cp ap1302-firmware/ap1302_ar1335_single_fw.bin /lib/firmware/
```

Next, install runtime and build dependencies. Note that 2022.1 smartcam is compatible only with specific versions of zcol and xrt. Therefore install them first with the compatible versions to prevent latest version to be installed when other dependencies are installed. (Tip: copy below section to a .sh file on target and source the .sh file to save time.)

```shell
# install specific versions of zocl and xrt:
sudo dnf install -y zocl-202210.2.13.479-r0.0
sudo dnf install -y xrt-202210.2.13.479-r0.0


# Install the runtime dependencies
sudo dnf install -y vvas-accel-libs
sudo dnf install -y glog
sudo dnf install -y gstreamer1.0-rtsp-server
sudo dnf install -y opencv

# Install the build time dependencies
sudo dnf install -y packagegroup-petalinux-self-hosted
sudo dnf install -y gst-perf-dev gstreamer1.0-omx-dev gstreamer1.0-python-dev
sudo dnf install -y gstreamer1.0-rtsp-server-dev vvas-accel-libs-dev v4l-utils-dev
sudo dnf install -y alsa-utils-dev opencv-dev
sudo dnf install -y gst-perf gstreamer1.0-omx gstreamer1.0-plugins-bad-faac
sudo dnf install -y gstreamer1.0-plugins-bad-mpegtsmux gstreamer1.0-plugins-good-rtp
sudo dnf install -y gstreamer1.0-plugins-bad-kms gstreamer1.0-plugins-bad-mediasrcbin
sudo dnf install -y gstreamer1.0-plugins-bad-videoparsersbad gstreamer1.0-plugins-good-multifile
sudo dnf install -y gstreamer1.0-plugins-good-rtpmanager gstreamer1.0-plugins-good-udp
sudo dnf install -y gstreamer1.0-plugins-good-video4linux2 gstreamer1.0-python
sudo dnf install -y libdrm-tests v4l-utils alsa-utils python3-core

```

Lastly, build the smartcam application:

``` shell
# build smartcam
cd smartcam
mkdir build
cd build
cmake -DCMAKE_INSTALL_PREFIX=/ ../
make -j
sudo make install
# smartcam binary will be available at  /opt/xilinx/kv260-smartcam/bin/smartcam
```

Finally, test the smartcam on target:

``` shell
sudo xmutil listapps                            # kv260-smartcam should show up in the list
sudo xmutil unloadapp                           # unload existing firmware
sudo xmutil loadapp kv260-smartcam              # Load smartcam firmware
sudo /opt/xilinx/kv260-smartcam/bin/smartcam -m
```

## Building a WIC image or RPM packages

You need PetaLinux 2022.1 with eSDK update 1 or later, as vvas library is released asynchronously and not included in the main 2022.1 petalinux tools release. Download PetaLinux Tools Installer 2022.1 from [PetaLinux Download page](https://www.xilinx.com/support/download/index.html/content/xilinx/en/downloadNav/embedded-design-tools.html).

To install PetaLinux, extract the petalinux installer, accept the license and source the tool's settings script.

```bash
petalinux-v2021.1-final-installer.run
source settings.sh
```

The eSDK can be used to update the petalinux tool for creating new images or SDKs. The eSDK updates are
published [here](http://petalinux.xilinx.com/sswreleases/rel-v2022/sdkupdate/2022.1_update1/)
Upgrade the tool with new eSDK for '2022.1 update1' release and source the tool's settings script.

```bash
petalinux-upgrade -u 'http://petalinux.xilinx.com/sswreleases/rel-v2022/sdkupdate/2022.1_update1/' -p 'aarch64'
source settings.sh
```

The petalinux tool is now updated with '2022.1 update1' Yocto eSDK.

### Step 1: Create PetaLinux Project

First, download the KV260 2022.1 BSP from [Kria SOM Wiki](https://xilinx-wiki.atlassian.net/wiki/spaces/A/pages/1641152513/Kria+K26+SOM#PetaLinux-Board-Support-Packages). Using PetaLinux tool version 2022.1, create a project:

```shell
petalinux-create -t project -s xilinx-kv260-starterkit-v2022.1-<timestamp>.bsp
cd xilinx-kv260-starterkit-2022.1/
```

Note that we will be now adding 4 recipes for smartcam FPGA firmware, AP1302 firmware, smartcam software, and a packagegroup to bring them together. The recipes will be added to the ```project-spec/meta-user``` folder, which is a meta-layer thats already included in the project, which you can confirm by looking at ```build/conf/bblayers.conf``` after a petalinux-build. If you choose to add the recipes to other meta-layer folders, be sure to [add the layer](https://docs.xilinx.com/r/en-US/ug1144-petalinux-tools-reference-guide/Adding-Layers) first.

### Step 2: Add Recipe for Smartcam FPGA firmware

FPGA Firmware for Smartcam 2022.1 is released on [github](https://github.com/Xilinx/kria-apps-firmware/tree/xlnx-rel-v2022.1_update4/boards/kv260/smartcam). It includes the bitstream, and its associated .xclbin, .dtsi and shell.json files. First make the folder example_firmware to keep the recipe file:

```shell
mkdir -p project-spec/meta-user/recipes-firmware/example_firmware
```

Below is the content for ```project-spec/meta-user/recipes-firmware/example_firmware/kv260-smartcam.bb```. Note the latest commit ID correspond to the tag xlnx-rel-v2022.1_update4 when creating the recipe.

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
SRCREV = "9d7d92d8a89f911ae8c1b0a25316c924c1a4ff3f" # this specifies the commit ID of the version of repo to use

inherit fpgamanager_custom

PACKAGE_ARCH = "${MACHINE_ARCH}"

FW_DIR = "boards/kv260/smartcam" #specifies which folder of the repo to use

COMPATIBLE_MACHINE:k26-kv = "${MACHINE}"
```

### Step 3: Add Recipe for AP1302 Firmware

Smartcam uses AR1335 MIPI sensor, which requires AP1302 firmware. AP1302 is released on [github](https://github.com/Xilinx/ap1302-firmware/tree/xlnx_rel_v2022.1).  We will first create a folder called "ap1302-firmware" to keep the AP1302 recipes ```ap1302-firmware.inc``` and ```ap1302-ar1335-single-firmware.bb```.

```shell
mkdir -p project-spec/meta-user/recipes-firmware/ap1302-firmware/
```

Below is the content for ```project-spec/meta-user/recipes-firmware/ap1302-firmware/ap1302-ar1335-single-firmware.bb```:

```python
SUMMARY = "ap1302 ar1335-single firmware binary"

include ap1302-firmware.inc

FW_NAME = "ap1302_ar1335_single_fw.bin"
```

Below is the content for ```project-spec/meta-user/recipes-firmware/ap1302-firmware/ap1302-firmware.inc```, which the above recipe included:

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
	install -d ${D}/lib/firmware  # create /lib/firmware
	install -m 0644 ${FW_NAME} ${D}/lib/firmware/${FW_NAME} # copy firmware binary to /lib/firmware
}

FILES:${PN} = "/lib/firmware/${FW_NAME}"
```

### Step 4: Add Recipe for Smartcam Software

Next, we add the recipe for smartcam software, which is released at [github](https://github.com/Xilinx/smartcam/tree/xlnx_rel_v2022.1) for 2022.1. We first create a folder for application recipe:

```shell
mkdir -p project-spec/meta-user/recipes-apps/smartcam/
```

Then we create the following content in file ```project-spec/meta-user/recipes-apps/smartcam/smartcam.bb```, Note the commit ID - move to the latest commit ID if needed.

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

### Step 5: Create Packagegroup

Next, we want to create the package group to include both the firmware and software, as well as the AR1335 driver that is needed for this application. [UG1144](https://docs.xilinx.com/r/en-US/ug1144-petalinux-tools-reference-guide/Adding-a-Package-Group) also details this step.

```shell
mkdir -p project-spec/meta-user/recipes-core/packagegroups/
```

Then create  ```project-spec/meta-user/recipes-core/packagegroups/packagegroup-kv260-smartcam.bb``` with the following content:

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

Add below line to ```project-spec/meta-user/conf/user-rootfsconfig```:

```text
CONFIG_packagegroup-kv260-smartcam
```

Enable the package group by using below command to get to configuration gui:

```shell
petalinux-config -c rootfs
```

Go to ```user packages``` to enable packagegroup-kv260-smartcam

### Step 6: Build

#### Option 1 - baking into WIC image

Now that all the meta layers are in place, build the image:

```shell
petalinux-build
petalinux-package --wic --bootfiles "ramdisk.cpio.gz.u-boot boot.scr Image system.dtb"
```

Flash the generated image in ``images/linux/petalinux-sdimage.wic``` onto SD card and boot on a KV260.

#### Option 2 - generate RPM and install on released wic image

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

Then move the .rpm files to target (that is booted in released 22.1 .wic image) and install using dnf, so they will install dependencies as well. However, note that for 2022.1 version of Smartcam, you need specific, compatible versions of zocl and xrt which is not the latest - therefore we need to first install the specific versions to prevent a later, incompatible version to be installed automatically.

```shell
sudo dnf install -y zocl-202210.2.13.479-r0.0 
sudo dnf install -y xrt-202210.2.13.479-r0.0
sudo dnf install -y kv260-smartcam-1.0-r0.0.xilinx_k26_kv.rpm
sudo dnf install -y smartcam-1.0-r0.0.cortexa72_cortexa53.rpm
sudo dnf install -y ap1302-ar1335-single-firmware-1.0-r0.0.cortexa72_cortexa53.rpm
```

### Step 7: Test

Test that firmware and applications have loaded correctly:

```shell
sudo xmutil listapps                            # kv260-smartcam should show up in the list
sudo xmutil unloadapp                           # unload existing firmware
sudo xmutil loadapp kv260-smartcam              # Load smartcam firmware
sudo /opt/xilinx/kv260-smartcam/bin/smartcam -m # Execute smartcam application using a MIPI sensor
```

You should see the application displaying image from MIPI sensor to the screen.

## License

Licensed under the Apache License, Version 2.0 (the "License"); you may not use this file except in compliance with the License.

You may obtain a copy of the License at
[http://www.apache.org/licenses/LICENSE-2.0](http://www.apache.org/licenses/LICENSE-2.0)

Unless required by applicable law or agreed to in writing, software distributed under the License is distributed on an "AS IS" BASIS, WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied. See the License for the specific language governing permissions and limitations under the License.

<p align="center">Copyright&copy; 2021 Xilinx</p>
