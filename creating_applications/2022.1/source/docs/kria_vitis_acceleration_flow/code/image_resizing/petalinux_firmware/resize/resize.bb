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