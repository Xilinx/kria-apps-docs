<!--
Copyright (C) 2026 Advanced Micro Devices, Inc. All rights reserved.
SPDX-License-Identifier: MIT
-->

<table class="sphinxhide" width="100%">
 <tr width="100%">
    <td align="center"><img src="https://github.com/Xilinx/Image-Collateral/blob/main/xilinx-logo.png?raw=true" width="30%"/><h1>ROS 2 Multi-Node Communications via TSN Tutorial</h1>
    </td>
 </tr>
</table>

# Building the Hardware Design and Firmware

## Overview

The TSN application runs on prebuilt PL firmware, so most users do not need to
build anything - see
[Setting up the Board and Application Deployment](app_deployment.md). This page
is for users who want to rebuild the firmware or modify the hardware design.

| Board | Firmware | Vivado design |
| --- | --- | --- |
| KR260 | `kr260-tsn-rs485pmod` | `kr260_tsn_rs485pmod` |
| KD240 | `kd240-motor-ctrl-qei` | `kd240_motor_ctrl_qei` |

Both firmware packages are the prebuilt release artifacts of the
kria-vitis-platforms release listed below. The meta-kria-apps firmware recipes
fetch these artifacts unmodified.

For a description of the hardware design, see
[Hardware Architecture - Platform](hw_arch_platform.md).

## Release Information

The rest of this page does not name a release. Use the versions in this table.

| Item | Version |
| ------ | --------- |
| AMD EDF release | 26.06 |
| AMD Vivado&trade; and AMD Vitis&trade; tools | 2026.1 |
| kria-vitis-platforms release | [v1.2](https://github.com/Xilinx/kria-vitis-platforms/releases/tag/v1.2) |
| meta-kria-apps firmware recipes | [rel-v2026.1](https://github.com/Xilinx/meta-kria-apps/tree/rel-v2026.1/recipes-firmware) |

## Prerequisites

* AMD Vivado&trade; Design Suite, with `bootgen` and `dtc` on the `PATH`
* AMD Vitis&trade;, needed to build the KD240 firmware (its HLS IP is
  synthesized with Vitis)

Use the tool version listed in [Release Information](#release-information).

* A TSN Subsystem IP license. To request an evaluation license, email
  [1gtsn_eval_request@amd.com](mailto:1gtsn_eval_request@amd.com).

## Getting the Sources

Set `KVP_TAG` to the kria-vitis-platforms release listed in
[Release Information](#release-information), then clone:

```bash
KVP_TAG=v1.2
git clone --branch ${KVP_TAG} --recursive https://github.com/Xilinx/kria-vitis-platforms.git
cd kria-vitis-platforms
```

The design sources are in `kr260/platforms/kr260_tsn_rs485pmod` (KR260) and
`kd240/platforms/kd240_motor_ctrl_qei` (KD240):

* `scripts/` - Tcl scripts that create the Vivado project and block design
* `dtsi/` - device tree overlay source for the firmware
* `ip/` - custom IP. On KR260, this includes the AXI UART Lite RS485 patch. On
  KD240, it links to the shared `kd240/platforms/ip` directory, which holds the
  motor control HLS IP.
* `xdc/` - constraints

## Building the Firmware

Run the following from the repository root after sourcing the Vivado settings
script. For KD240, also source the Vitis settings script. The KD240 build first
synthesizes the `qei`, `foc`, `svpwm_duty`, and `pwm_gen` HLS IP with Vitis.

```bash
make firmware FW=kr260-tsn-rs485pmod      # KR260
make firmware FW=kd240-motor-ctrl-qei     # KD240
```

This builds the Vivado project and bitstream, converts the bitstream to a
`.bin` with `bootgen`, compiles the `.dtsi` into a `.dtbo`, and packages them
with `shell.json` into `<board>/firmware/<FW>.tar.gz`. This is the same layout as
the release artifact:

```text
<FW>/
+-- LICENSE
+-- checksum.md5
+-- lib/firmware/xilinx/<FW>/
    +-- <FW>.bin
    +-- <FW>.dtbo
    +-- shell.json
```

Use `JOBS=<n>` to change the number of synthesis jobs (default 8). Run
`make help` to list all valid `FW` values.

## Modifying the Hardware Design

1. Generate the Vivado project, which is also the first step of the firmware
   build:

    ```bash
    make -C kr260/platforms/kr260_tsn_rs485pmod xsa
    ```

2. Open `kr260/platforms/kr260_tsn_rs485pmod/project/kr260_tsn_rs485pmod.xpr`
   in Vivado, then edit and validate the block design.

3. If the change affects the PL address map or interrupts, update the overlay
   source in `dtsi/` to match.

4. In Vivado, run **Generate Bitstream**, then run `make firmware FW=...`.
   The build does not rerun Vivado when `project/kr260_tsn_rs485pmod.xsa`
   already exists. It packages the bitstream at
   `project/kr260_tsn_rs485pmod.runs/impl_1/kr260_tsn_rs485pmod_wrapper.bit`.

> _**Note:**_ `make clean` deletes the `project/` directory, including any
> changes made in the Vivado GUI. To make a change permanent, update
> `scripts/config_bd.tcl`.

## Deploying Custom Firmware

Copy the contents of `lib/firmware/xilinx/<FW>/` from the tarball to
`/lib/firmware/xilinx/<FW>/` on the target, in place of the step that installs
firmware from the container. Then load the firmware with `dfx-mgr-client` as
described in
[Setting up the Board and Application Deployment](app_deployment.md).

## Next Steps

* [Software Build Instructions](sw_build_instructions.md)
* Go back to the [SOM ROS 2 Multi-Node Communications via TSN start page](../ros2_multinode_communication_via_tsn_landing)
