# Frequently Asked Questions / Common Debug Tips

This page documents common questions that developers may encounter while using Kria SOM.

## Released Linux Images Not Booting

All Xilinx released images are verified on their supported Starter Kit. If an [released image](https://xilinx-wiki.atlassian.net/wiki/spaces/A/pages/1641152513/Kria+K26+SOM#Kria-Starter-Kit-Linux) does not boot on the Starter Kit, for an example you may see errors like this while booting, for an example, Ubuntu:

```text
[   17.644316] emc: device handler registered
[   17.658214] rdac: device handler registered
[   20.374057] tpm tpm0: A TPM error (256) occurred attempting the self test
```

It is usually because the Starter Kit needs an updated boot firmware. Download the correct version of [boot firmware according to the wiki](https://xilinx-wiki.atlassian.net/wiki/spaces/A/pages/1641152513/Kria+K26+SOM#Boot-Firmware-Updates), and use [image recovery application](https://xilinx-wiki.atlassian.net/wiki/spaces/A/pages/1641152513/Kria+K

## Root Privileges

The *ubuntu* user does not have root privileges. Most commands used in tutorials must be run using *sudo*, and it may be prompted to enter your password.

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

1. If user get -1 for ```xmutil loadapp <app name>```, try to unload the existing app firmware using ```xmutil unloadapp``` and then load the preferred app firmware. Another possibility is that the application did not exist in the correct folder/have the correct file extensions, as detailed in [dfx-mgr doc for SOM](https://xilinx.github.io/kria-apps-docs/creating_applications/2022.1/build/html/docs/target.html#dfx-mgr)

2. Installing firmware binaries may cause dfx-mgr to crash and a restart is needed. Once this is fixed an newer updates are available for dfx-manager, restart may not be needed. If dfx-manager crashes, restart it with this command: ```sudo systemctl restart dfx-mgr.service```

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

Monitor should be connected properly to the board before power on, otherwise the resolution will not be recognized correctly.

Ensure to use certified cables for DP and HDMI, recommended specs are HDMI 2.0 and DP 1.2 above. If cables are faulty, they could cause distortions or disable display.

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

#### License

Licensed under the Apache License, Version 2.0 (the "License"); you may not use this file except in compliance with the License.

You may obtain a copy of the License at
[http://www.apache.org/licenses/LICENSE-2.0](http://www.apache.org/licenses/LICENSE-2.0)

Unless required by applicable law or agreed to in writing, software distributed under the License is distributed on an "AS IS" BASIS, WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied. See the License for the specific language governing permissions and limitations under the License.
