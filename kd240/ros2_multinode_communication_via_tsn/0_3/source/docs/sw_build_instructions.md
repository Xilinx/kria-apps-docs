## Overview

For the AMD EDF release the TSN application ships as a prebuilt OCI (Docker)
image. Most users do not need to build anything - see
[Setting up the Board and Application Deployment](app_deployment.md) to pull
`xilinx/kria-tsn-rs485pmod` from Docker Hub and run it.

This page is for developers who want to **rebuild the container image** from
source with Yocto/BitBake.

## Building the container

1. Set up an AMD EDF build environment by following the
   [Yocto Project build setup instructions for EDF](https://edf.docs.amd.com/en/latest/osdev/operating-system-integration-and-development.html#yocto-project-build-setup-instructions-for-edf).

2. Add the
   [meta-kria-apps](https://github.com/Xilinx/meta-kria-apps)
   layer, which provides the TSN container recipe
   ([recipes-containers/container-tsn/container-tsn-rs485pmod.bb](https://github.com/Xilinx/meta-kria-apps/blob/rel-v2026.1/recipes-containers/container-tsn/container-tsn-rs485pmod.bb)):
   ```
   bitbake-layers add-layer /path/to/meta-kria-apps
   ```

3. Build the container image:
   ```
   MACHINE=amd-cortexa53-mali-common bitbake container-tsn-rs485pmod
   ```

   The resulting OCI image is written under
   `tmp/deploy/images/${MACHINE}/`.

## Bundled components

The container recipe
[`container-tsn-rs485pmod.bb`](https://github.com/Xilinx/meta-kria-apps/blob/rel-v2026.1/recipes-containers/container-tsn/container-tsn-rs485pmod.bb)
is the source of truth for the full bundled set and the exact revision each
component is built from. The table below is a convenience index of where each
application component is built; it does not describe how to build the
components individually - each component builds via the recipe listed here (and
is documented in its own repository).

| Component | Built by recipe | Source repository |
|-----------|-----------------|-------------------|
| ROS TSN PubSub | [meta-kria-apps: recipes-apps/ros-tsn-pubsub](https://github.com/Xilinx/meta-kria-apps/tree/rel-v2026.1/recipes-apps/ros-tsn-pubsub) | [Xilinx/ros-tsn-pubsub](https://github.com/Xilinx/ros-tsn-pubsub) |
| PMOD RS485 Test | [meta-kria-apps: recipes-apps/pmod-rs485-test](https://github.com/Xilinx/meta-kria-apps/tree/rel-v2026.1/recipes-apps/pmod-rs485-test) | [Xilinx/pmod-rs485-test](https://github.com/Xilinx/pmod-rs485-test) |
| TSN Utilities | [meta-xilinx-tsn: recipes-apps/tsn-utils](https://github.com/Xilinx/meta-xilinx-tsn/tree/rel-v2026.1/recipes-apps/tsn-utils) | [Xilinx/tsn-utils](https://github.com/Xilinx/tsn-utils) |
| TSN Talker-Listener | [meta-xilinx-tsn: recipes-apps/tsn-examples](https://github.com/Xilinx/meta-xilinx-tsn/tree/rel-v2026.1/recipes-apps/tsn-examples) | [Xilinx/tsn-talker-listener](https://github.com/Xilinx/tsn-talker-listener) |

> ***Note***: For the 2026.1 release, meta-kria-apps carries temporary
> `.bbappend` SRCREV bumps for `tsn-utils` and `tsn-examples` (the
> meta-xilinx-tsn rel-v2026.1 recipes are pinned to earlier revisions). These
> bbappends are expected to fold into meta-xilinx-tsn in a later release.
