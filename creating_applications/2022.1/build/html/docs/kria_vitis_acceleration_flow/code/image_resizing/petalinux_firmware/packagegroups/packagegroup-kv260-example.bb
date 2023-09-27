DESCRIPTION = "Example Smartcam related Packages"

inherit packagegroup

EXAMPLE_PACKAGES = " \
    ap1302-ar1335-single-firmware \
    tutorial \
    resize \
    "

RDEPENDS:${PN} = "${EXAMPLE_PACKAGES}"

COMPATIBLE_MACHINE = "^$"
COMPATIBLE_MACHINE:k26-kv = "${MACHINE}"
PACKAGE_ARCH = "${MACHINE_ARCH}"
