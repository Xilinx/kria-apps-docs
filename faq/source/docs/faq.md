# Frequently Asked Questions / Common Debug Tips

This page documents common questions that developers may encounter while using Kria SOM.

## Released Linux Images Not Booting

All images released by AMD are verified on their supported Starter Kit. If a [released image](https://xilinx-wiki.atlassian.net/wiki/spaces/A/pages/1641152513/Kria+K26+SOM#Kria-Starter-Kit-Linux) does not boot on the Starter Kit, It is usually because the Starter Kit needs an updated boot firmware. For example, you might see errors like this while booting (Ubuntu):

```text
[   17.644316] emc: device handler registered
[   17.658214] rdac: device handler registered
[   20.374057] tpm tpm0: A TPM error (256) occurred attempting the self test
```

Download the correct version of [boot firmware according to the wiki](https://xilinx-wiki.atlassian.net/wiki/spaces/A/pages/1641152513/Kria+K26+SOM#Boot-Firmware-Updates), and use the [image recovery application](https://xilinx-wiki.atlassian.net/wiki/spaces/A/pages/1641152513/Kria+SOMs+Starter+Kits#Boot-Image-Recovery-Tool).

## Root Privileges

The *ubuntu* user does not have root privileges. Most commands used in tutorials must be run using *sudo*, and it might be prompted to enter your password.

For security, by default, the root user is disabled. If user want to login as root user, perform the following steps. Use the *ubuntu* user's password on the first password prompt, then set a new password for the root user. User can now login as root user using the newly set root user password.

```bash
ubuntu@kria:\~\$ sudo -i
sudo\] password for ubuntu:
root@kria:\~#
```

## PPA Error Requiring Setting Timezone

If you receive a PPA error or no response when executing "apt update" command, it maybe due to wrong timezone/time on the system. The followings are commands to set System Timezone and locale:

* Set timezone

```bash
sudo timedatectl set-ntp true
sudo timedatectl set-timezone America/Los_Angeles
timedatectl
```

* Set locale

```bash
sudo locale-gen en_US en_US.UTF-8
sudo update-locale LC_ALL=en_US.UTF-8 LANG=en_US.UTF-8
export LANG=en_US.UTF-8
locale
```

* set the date and time.

```bash
sudo date --set "11 January 2023 16:47:00"
```

## xmutil / dfx-mgr related debug

1. If a user gets -1 for `xmutil loadapp <app name>`, try to unload the existing app firmware using `xmutil unloadapp` and then load the preferred app firmware. Another possibility is that the application did not exist in the correct folder/have the correct file extensions, as detailed in [dfx-mgr doc for SOM](https://xilinx.github.io/kria-apps-docs/creating_applications/2022.1/build/html/docs/target.html#dfx-mgr)

2. Installing firmware binaries may cause dfx-mgr to crash and a restart is needed. Once this is fixed an newer updates are available for dfx-manager, restart may not be needed. If dfx-manager crashes, restart it with this command: `sudo systemctl restart dfx-mgr.service`

3. xmutil or dfx-mgr runs only in base OS, they do not run in Docker containers. Therefore in order to load/unload firmware, you must first exit Docker container.

4. After invoking the command `xmutil loadapp` to load firmware, it needs several seconds for the whole firmware to be ready. If you launch docker before the firmware is loaded, it will not be able to use DPU node properly and you may see the below error while launching application

    ```bash
    WARNING: Logging before InitGoogleLogging() is written to STDERR
    F0830 10:01:34.758910 22 xrt_bin_stream.cpp:60] Check failed: fd_ > 0 (-1 vs. 0) , open(/usr/lib/dpu.xclbin) failed.
      Check failure stack trace: ***
    Aborted by signal Aborted...
    ```

    To resolve this issue, exit the docker container and unload the firmware using xmutil. Then delete folder /etc/vart.conf/ using ```rm -rf /etc/vart.conf/```

    ```bash
    root@xlnx-docker/# exit
    ubuntu@kria:~$ sudo xmutil unloadapp
    ubuntu@kria:~$ sudo rm -rf /etc/vart.conf/
    ```

    Now you can start with the app deployment steps from loading the firmware and launching docker.

5. You do not have to worry about errors logged by the Linux kernel while executing the following specified commands, they are benign and can be ignored. The "ERROR: memory leak" error is a result of upstream Linux device tree framework.

    ```text
    xmutil unloadapp
    ```

    ```text
    Nov 21 06:10:22 xilinx-kv260-starterkit-20221 kernel: OF: ERROR: memory leak, expected refcount 1 instead of 2, of_node_get()/of_node_put() unbalanced - destroy cset entry: attach overlay node /axi/fixedregulator@1
    Nov 21 06:10:22 xilinx-kv260-starterkit-20221 kernel: OF: ERROR: memory leak, expected refcount 1 instead of 2, of_node_get()/of_node_put() unbalanced - destroy cset entry: attach overlay node /axi/fixedregulator@0
    ```

    You can look for print out "remove from slot 0 returns: 0 (Ok)" to know that the firmware was unloaded correctly.

    ```text
    xmutil loadapp kv260-smartcam
    ```

    ```text
    Nov 21 06:10:58 xilinx-kv260-starterkit-20221 kernel: OF: overlay: WARNING: memory leak will occur if overlay removed, property: /__symbols__/al5d
    Nov 21 06:10:58 xilinx-kv260-starterkit-20221 kernel: OF: overlay: WARNING: memory leak will occur if overlay removed, property: /__symbols__/zocl
    Nov 21 06:10:58 xilinx-kv260-starterkit-20221 kernel: debugfs: Directory '4-003c' with parent 'regmap' already present!
    Nov 21 06:10:58 xilinx-kv260-starterkit-20221 kernel: zocl-drm axi:zyxclmm_drm: IRQ index 8 not found
    xilinx-kv260-starterkit-20221:~$ Nov 21 06:11:00 xilinx-kv260-starterkit-20221 kernel: xilinx-video axi:isp_vcap_csi: Entity type for entity 80000000.csiss was not initialized!
    ```

    You can look for print out ```kv260-smartcam: loaded to slot 0``` to know that the firmware was loaded.

6. As of 2022.1, dfx-mgr do not yet output debug message with a flag for verbose mode. To see debug messages from dfx-mgr, stop the current dfx-mgr process and restart it manually:

   ```shell
   sudo systemctl stop dfx-mgr.service
   sudo /usr/bin/dfx-mgrd &
   ```

## Docker Space Limitation

The storage volume on the SD card can be limited with multiple Docker images. If there are space issues, use the following command to remove the existing container.

```bash
sudo docker rmi --force $INSTALLED_DOCKER_IMAGE
```

## Debug Monitors

The AMD Kria K26 Starter Kits each have a different HW configuration for their display interfaces:

1. KV260 Carrier Card:
  * Supports both DP 1.2 and HDMI 1.4 interfaces.
  * The ports are driven by the DP controller in the ZynqMPSoC PS to a DP/HDMI video splitter on the KV carrier card.
  * The K26 + KV CC supports two PS-GTR data lanes from the ZynqMPSoC device which supports HBR and HBR2 data rates.

2. KR260 Carrier Card:
  * Supports only a DP 1.2 interface.
  * The K26 + KR CC supports one PS-GTR data lane from the ZynqMPSoC device which supports HBR and HBR2 data rates.

The maximum transmission bit rate between the carrier card and a monitor depends on the number of lanes connected and the maximum supported transmission mode data rate of both the Kria Starter Kit and the monitor connected. The combinatin of the DP subsystem of MPSoC + the monitor capabilities will determine the maximum resolution supported. For example, if a monitor that supports HBR2 and is connected to KR260, the maximum data rate is 1 data lane x 5.4 Gbit/s = 5.4 Gbit/s, allowing the configuration to support up to 1080p@60FPS.

Monitor should be connected properly to the board before power on, otherwise the resolution may not be recognized correctly.

Ensure to use certified cables for DP and HDMI, recommended specs are HDMI 1.4 and DP 1.2 or greater. If cables are faulty, they could cause distortions or disable display.

Modetest is a test tool which can be found as part of the libdrm suite of test tools.

Depending on if there is a video mixer in the PL or not, modetest would either directly test the DP, or go through video mixer using `-D 80000000.v_mix` argument.

Note that among examples using a monitor, AI Box and Defect Detect have video mixer; Smartcam and NLP SmartVision do not have video mixer.

### Ensure status of monitor is connected

`modetest -M xlnx [-D 80000000.v_mix]`

The above command would read out the monitors EDID information.

```text
Connectors:
id      encoder status          name            size (mm)       modes   encoders
52      51      connected       DP-1            610x350         43      51
```

### Display modes supported by your display

`modetest -M xlnx [-D 80000000.v_mix]`

 Below are the modes that are supported by your display.

```text
  modes:
        name refresh (Hz) hdisp hss hse htot vdisp vss vse vtot)
  3840x2160 30.00 3840 4016 4104 4400 2160 2168 2178 2250 297000 flags: phsync, pvsync; type: driver
  3840x2160 30.00 3840 4016 4104 4400 2160 2168 2178 2250 297000 flags: phsync, pvsync; type: driver
  ...
  ...
```

Ensure display is capable of supporting user requested resolution and refresh rates to the application.

### Current mode

`modetest -M xlnx [-D 80000000.v_mix]`

CRTC indicates the current mode that is set.

```text
CRTCs:
id      fb      pos     size
40      47      (0,0)   (3840x2160)
  3840x2160 30.00 3840 4016 4104 4400 2160 2168 2178 2250 297000 flags: phsync, pvsync; type: driver
  props:
```

### Test to determine if display is OK

Example for 4k and video mixer::

`modetest -M xlnx -D 80000000.v_mix -s 52@40:3840x2160@NV16`

The  above command sets a mode, blue screen appears on the display.

![Blue Screen](media/blue_screen.png)

Example for less resolution and without video mixer:

`modetest -M xlnx -s 43:1024x768-60@AR24`
`modetest -M xlnx -s 43:1920x1080-60@AR24`

The  above command sets a mode, SMPTE Color Bars appears on the display.

![SMPTE color bars](media/SMPTE_Color_Bars.svg)

## Ethernet Implementation for AMD Starter Kits

There are some aspects of an Ethernet HW implementation that needs to account for physical PHY interfaced to. The Kira Starter Kits use two different PHYs:
* KV260 and KR260 carrier cards are using the [Texas Instruments DP83867](https://www.ti.com/lit/ds/symlink/dp83867cs.pdf)
* KD240 Starter Kit is using the [Analog Devices ADIN1300](https://www.analog.com/media/en/technical-documentation/data-sheets/adin1300.pdf). 

One aspect of this HW configuration is PHY dual-purposed which influence the PHY reset latched PHY address. For PHYs connected to PS Ethernet controllers the MIO pull-up/pull-down and enable/disable must be aligned with the requirements of the PHY.
* TI PHY straps RX_D0 and RX_D2 to define the PHY address. The corresponding MIO pins needs to disable pull-up/pull-down to let the PHY set its address as defined in the schematic and as expected by reference SW.
* ADI PHY straps RXD_1, RXD_2, RXD_3, RXD_4 to define the PHY address. The corresponding MIO pins needs to disable pull-up/pull-down to let the PHY set its address as defined in the schematic and as expected by reference SW.

Note also that the main Ethernet (e.g. the PS Ethernet used for Image Recovery, u-boot and Linux) are implemented on different GEMs for different CC. Therefore the MIO register to write to are different. KV260 uses PS GEM3 while KR260 and KD240 uses GEM1. In order for ethernet based applications, such as LWIP echo server example to work with different CCs, the PHY init function for them needs to set MIOs differently.

For an example, for KV260, to set its MIO to work with PS GEM 3, MIO44-77, TI PHY, use following code:

  ```c
  Xbir_MaskWrite(IOU_SLCR_BANK2_CTRL5_OFFSET, 0x3FFFFFFU, 0x357FFFFU);
  ```

For KV260, to set its MIO to work with PS GEM 1, MIO38-51, TI PHY, use following code:

  ```c
  Xbir_MaskWrite(IOU_SLCR_BANK1_CTRL5_OFFSET, 0x00003FFFU, 0x0000357F);
  ```

For KD240, to set its MIO to work with PS GEM 1, MIO38-51, ADI PHY, use following code:

  ``` c
  Xbir_MaskWrite(IOU_SLCR_BANK1_CTRL5_OFFSET, 0x00003FFFU, 0x0000387F);
  ```

Note that [bank1_ctrl5-IOU_SLCR-Register](https://docs.amd.com/r/en-US/ug1087-zynq-ultrascale-registers/bank1_ctrl5-IOU_SLCR-Register) has an atypical register layout.

## Using PL SysMon / platformstats PL temperature print

Kria SOM Linux provides [xmutil](https://github.com/Xilinx/xmutil), which is a wrapper to the [xlnx_platformstats](https://github.com/Xilinx/xlnx_platformstats) utility to report platform telemetry information, including PL temperature. The Linux running on PS is able to access PL SyMon through the APB to DRP interface as indicated in the design block diagram of [UG1085 “PL SYSMON Register Access Arbitration”](https://docs.amd.com/r/en-US/ug1085-zynq-ultrascale-trm/PL-SYSMON-Register-Access-Arbitration). When the PL Sysmon (SYSMONE4) is not instantiated by PL fabric, the mux selects PS DRP interface by default and allows xlnx_platformstats running on the PS to access the PL SysMon including temperature data.

However, if user wishes to instantiate the SYSMONE4 in PL (for an example, with the System Management block), its interface mux will select PL fabric instead and PS based applications will no longer have access to the PL temperature data. When PS based applications cannot access PL SysMon it will report all zeros and in the case of xlnx_platforms stats it will report a PL temperature of -280C.

For users who want to leverage functionalities that comes with System Management block and platformstats, some options are but not limited to:

1. If user wants to implement features such as over temperature checks for PL, they can implement them in PMU or Linux instead of using System Management block and keep the correct PL temperature print outs from platformstats
2. User can also instantiate System Management block, but modify platformstats to leverage PL temperature information through a custom PL based secondary interface to the PL SysMon block.
