<table class="sphinxhide">
 <tr>
   <td align="center"><img src="../../media/xilinx-logo.png" width="30%"/><h1>Kria&trade; KV260 Vision AI Starter Kit<br>NLP SmartVision Tutorial</h1>
   </td>
 </tr>
 <tr>
 <td align="center"><h1>Debugging</h1>

 </td>
 </tr>
</table>

# Debugging

## This section list some debugging tips for the application

* Make sure you use

    `sudo xmutil      loadapp kv260-nlp-smartvision`

    to load the firmware properly, otherwise many drivers including the MIPI will not loaded, so there will be many errors pops up when you run the application.

## This section list some debugging tips for platform peripherals

### Monitor

<details>
 <summary>Click here to view details</summary>

Ensure to use certified cables for DP and HDMI, recommended specs are HDMI 2.0 and DP 1.2 above.
If cables are faulty, they could cause distortions or disable display.

Modetest is a test tool which can be found as part of the libdrm suite of test tools.

 Note: Prints shown below is an example from a 4k monitor. Use for reference only.

### Ensure status of monitor is connected

`modetest -M xlnx`

The above command would read out the monitors EDID information.

```
Connectors:
id      encoder status          name            size (mm)       modes   encoders
43      42      connected       DP-1            610x350         43      42
```

#### Display mode 1024x768 needs to be supported by your display

`modetest -M xlnx`

 Below are the modes that are supported by your display.

```bash
  modes:
        name refresh (Hz) hdisp hss hse htot vdisp vss vse vtot)
  ...
  ...
  1024x768 75.03 1024 1040 1136 1312 768 769 772 800 78750 flags: phsync, pvsync; type: driver
  ...
  ...
```

Ensure display is capable of supporting user requested resolution and refresh rates to the application.

#### Current mode

`modetest -M xlnx`

 CRTC indicates the current mode that is set.

```bash
CRTCs:
id      fb      pos     size
41      47      (0,0)   (3840x2160)
  3840x2160 30.00 3840 4016 4104 4400 2160 2168 2178 2250 297000 flags: phsync, pvsync; type: driver
  props:
```

#### Test to determine if display is OK

`modetest -M xlnx -s 43:1024x768-60@AR24`

The  above command sets a mode, SMPTE Color Bars appears on the display.

![SMPTE color bars](../../media/SMPTE_Color_Bars.svg)

</details>

### Audio

<details>
 <summary>Click here to view details</summary>

#### Determine the enumeration for audio card

`cat /proc/asound/cards`

```bash
 2 [xlnxi2ssndcard0]: xlnx-i2s-snd-ca - xlnx-i2s-snd-card-0
                      xlnx-i2s-snd-card-0
```

In the above example, enumeration of audio card is 2.

#### Determine capture and playback device number

`cat /proc/asound/devices`

```bash
 80: [ 2- 0]: digital audio playback
 89: [ 2- 1]: digital audio capture
```

In the above example [2- X]: 2- is card, X is device.

#### Sample record and playback

1. `dnf install alsa-utils.aarch64`
2. ensure an active source is connected at the Pmod LINE IN.

</details>

### Detect USB 3.0

<details>
 <summary>Click here to view details</summary>

`lsusb`

```bash
Bus 002 Device 003: ID 046d:085e Logitech, Inc. USB5744
Bus 002 Device 002: ID 0424:5744 Standard Microsystems Corp. USB5744
Bus 002 Device 001: ID 1d6b:0003 Linux Foundation 3.0 root hub
```

</details>

### Obtain Media device information

<details>
 <summary>Click here to view details</summary>
`ls /dev/media*`

lists all media enumerations

`media-ctl -d /dev/mediaX -p`

where X in media is the enumerated value. the above command will print the Device topology and help user identify the media device.
Here is an example for capture path of 'ar1335 sensor'.

`media-ctl -d /dev/media0 -p`

```bash
Media controller API version 5.4.0

Media device information
------------------------
driver          xilinx-video
model           Xilinx Video Composite Device
serial
bus info
hw revision     0x0
driver version  5.4.0

Device topology
- entity 1: isp_vcap_csi output 0 (1 pad, 1 link)
            type Node subtype V4L flags 0
            device node name /dev/video0
        pad0: Sink
                <- "b0100000.scaler":1 [ENABLED]

- entity 5: b0100000.scaler (2 pads, 2 links)
            type V4L2 subdev subtype Unknown flags 0
            device node name /dev/v4l-subdev0
        pad0: Sink
                [fmt:UYVY8_1X16/1024x768 field:none colorspace:srgb]
                <- "80000000.csiss":0 [ENABLED]
        pad1: Source
                [fmt:RBG888_1X24/1024x768 field:none colorspace:srgb]
                -> "isp_vcap_csi output 0":0 [ENABLED]

- entity 8: 80000000.csiss (2 pads, 2 links)
            type V4L2 subdev subtype Unknown flags 0
            device node name /dev/v4l-subdev1
        pad0: Source
                [fmt:UYVY8_1X16/1024x768 field:none colorspace:srgb]
                -> "b0100000.scaler":0 [ENABLED]
        pad1: Sink
                [fmt:UYVY8_1X16/1024x768 field:none colorspace:srgb]
                <- "ap1302.4-003c":2 [ENABLED]

- entity 11: ap1302.4-003c (3 pads, 2 links)
             type V4L2 subdev subtype Unknown flags 0
             device node name /dev/v4l-subdev3
        pad0: Sink
                [fmt:SGRBG10_1X10/4208x3120 field:none colorspace:srgb
                 crop.bounds:(0,0)/4208x3120
                 crop:(0,0)/4208x3120]
                <- "ar1335 0":0 [ENABLED,IMMUTABLE]
        pad1: Sink
                [fmt:SGRBG10_1X10/4208x3120 field:none colorspace:srgb
                 crop.bounds:(0,0)/4208x3120
                 crop:(0,0)/4208x3120]
        pad2: Source
                [fmt:UYVY8_1X16/1024x768 field:none colorspace:srgb
                 crop.bounds:(0,0)/4208x3120
                 crop:(0,0)/4208x3120]
                -> "80000000.csiss":1 [ENABLED]

- entity 15: ar1335 0 (1 pad, 1 link)
             type V4L2 subdev subtype Sensor flags 0
             device node name /dev/v4l-subdev2
        pad0: Source
                [fmt:SGRBG10_1X10/4208x3120 field:none colorspace:srgb]
                -> "ap1302.4-003c":0 [ENABLED,IMMUTABLE]

                -> "ap1302.4-003c":0 [ENABLED,IMMUTABLE]
```

</details>

## Known Benign Error messages

<details>

 <summary>Click here to view details</summary>

User does not have to worry about Errors logged by the linux kernel while executing the specified commands below, they are benign and can be ignored.

`sudo xmutil unloadapp`

```bash
[ 4125.507273] OF: ERROR: memory leak, expected refcount 1 instead of 2, ...... ... 
[ 4125.507293] OF: ERROR: memory leak, expected refcount 1 instead of 2, ...... ... 
```

`sudo xmutil loadapp kv260-nlp-smartvision`

```bash
[ 4183.694299] xlnx_snd_card xlnx_snd_card.1.auto: ASoC: failed to init link xilinx-i2s_playback: -517
[ 4183.703363] xlnx_snd_card xlnx_snd_card.1.auto: xlnx-i2s-snd-card-0 registration failed
```

</details>

### License

Licensed under the Apache License, Version 2.0 (the "License"); you may not use this file except in compliance with the License.

You may obtain a copy of the License at
[http://www.apache.org/licenses/LICENSE-2.0](http://www.apache.org/licenses/LICENSE-2.0)

Unless required by applicable law or agreed to in writing, software distributed under the License is distributed on an "AS IS" BASIS, WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied. See the License for the specific language governing permissions and limitations under the License.

<p align="center">Copyright&copy; 2021 Xilinx</p>
