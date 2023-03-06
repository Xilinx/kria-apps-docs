<table class="sphinxhide">
 <tr>
   <td align="center"><img src="../../media/xilinx-logo.png" width="30%"/><h1>Kria&trade; KV260 Vision AI Starter Kit <br>Smart Camera Tutorial</h1>
   </td>
 </tr>
 <tr>
 <td align="center"><h1>Debugging</h1>

 </td>
 </tr>
</table>

# Debugging

Please first review the [FAQ](https://xilinx.github.io/kria-apps-docs/faq/build/html/docs/faq.html) for commonly encountered issues across Kria SOM applications.

## Debugging Tips

* Use the following command to load the firmware. If you do not, many drivers (including the MIPI and VCU) will not load, and when you run the application, you will have errors.

   ```cpp
   xmutil      loadapp kv260-smartcam
   ```

* The smartcam application has an option `--usb` to choose the USB media devices. You can list the media devices by

   ```cpp
   ls /dev/media*
   ```

* When you give the wrong media index, the application will give errors (for example):

  * > ERROR: Device x is not ready.
  * > ERROR: MIPI device x is not ready.
  * > ERROR: Device x is not USB cam.

* When you give a width/height not supported by the device, the application shows this error:

    >Error: USB camera doesn't support resolution xxx
    >
    >All supported resolution:

  Choose from the supported resolutions.

## Platform Peripheral Debug Tips

### Monitor

Please review the [Debug Displays](https://xilinx.github.io/kria-apps-docs/faq/build/html/docs/faq.html#debug-displays) for debugging the monitor.
### I2S Audio 

<details>
 <summary>Click here to view the details.</summary>
#### Determine the Enumeration for an I2S Audio Card

```cpp
cat /proc/asound/cards
```

```cpp
 2 [xlnxi2ssndcard0]: xlnx-i2s-snd-ca - xlnx-i2s-snd-card-0
                      xlnx-i2s-snd-card-0
```

In the previous example, the enumeration of I2S audio card is 2.

#### Determine Capture and Playback Device Number

```cpp
cat /proc/asound/devices
 80: [ 2- 0]: digital audio playback
 89: [ 2- 1]: digital audio capture
```

In this example, [2- X]: the 2- is the card and the X is the device.

#### Sample Record and Playback

1. `dnf install alsa-utils.aarch64`
2. Ensure an active source is connected at the Pmod LINE IN.

##### Sample Record  
`aplay -D hw:2,0 -fS24_LE -r 48000 -c 2  -d 30 -t raw file.raw`

##### Sample Playback 
`arecord -D hw:2,1  -fS24_LE -r 48000 -c 2  -d 30 -t raw file.raw`

##### Sample Pass-through 
`arecord -D hw:2,1 -f S24_LE -r 48000 -c 2 -t raw | aplay -D hw:2,0 -c 2 -f S24_LE -r 48000 -t raw`

</details>

### Detect USB 3.0

<details>
 <summary>Click here to view the details.</summary>

```cpp
lsusb
```

```cpp
Bus 002 Device 003: ID 046d:085e Logitech, Inc. USB5744
Bus 002 Device 002: ID 0424:5744 Standard Microsystems Corp. USB5744
Bus 002 Device 001: ID 1d6b:0003 Linux Foundation 3.0 root hub
```

</details>

### Obtain Media device information

<details>

 <summary>Click here to view the details.</summary>

```cpp
ls /dev/media*
```

Lists all media enumerations:

```cpp
media-ctl -d /dev/mediaX -p
```

Where the X in media is the enumerated value. This command prints the device topology and helps you identify the media device.

Example for capture path of `ar1335 sensor`.

```cpp
media-ctl -d /dev/media1 -p
```

```cpp
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
            device node name /dev/video2
        pad0: Sink
                <- "80000000.csiss":0 [ENABLED]

- entity 5: 80000000.csiss (2 pads, 2 links)
            type V4L2 subdev subtype Unknown flags 0
            device node name /dev/v4l-subdev0
        pad0: Source
                [fmt:VYYUYY8_1X24/1920x1080 field:none colorspace:srgb]
                -> "isp_vcap_csi output 0":0 [ENABLED]
        pad1: Sink
                [fmt:VYYUYY8_1X24/1920x1080 field:none colorspace:srgb]
                <- "ap1302.4-003c":2 [ENABLED]

- entity 8: ap1302.4-003c (3 pads, 2 links)
            type V4L2 subdev subtype Unknown flags 0
            device node name /dev/v4l-subdev2
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
                [fmt:UYVY8_1X16/4208x3120 field:none colorspace:srgb
                 crop.bounds:(0,0)/4208x3120
                 crop:(0,0)/4208x3120]
                -> "80000000.csiss":1 [ENABLED]

- entity 12: ar1335 0 (1 pad, 1 link)
             type V4L2 subdev subtype Sensor flags 0
             device node name /dev/v4l-subdev1
        pad0: Source
                [fmt:SGRBG10_1X10/4208x3120 field:none colorspace:srgb]
                -> "ap1302.4-003c":0 [ENABLED,IMMUTABLE]
```

</details>

## Known Benign Error Messages

<details>
 <summary>Click here to view details:</summary>

You do not have to worry about errors logged by the Linux kernel while executing the following specified commands, they are benign and can be ignored.

```cpp
xmutil unloadapp
```

```cpp
[ 4125.507273] OF: ERROR: memory leak, expected refcount 1 instead of 2, ...... ... 
[ 4125.507293] OF: ERROR: memory leak, expected refcount 1 instead of 2, ...... ... 
```

```cpp
xmutil loadapp kv260-smartcam
```

```cpp
[ 4183.694299] xlnx_snd_card xlnx_snd_card.1.auto: ASoC: failed to init link xilinx-i2s_playback: -517
[ 4183.703363] xlnx_snd_card xlnx_snd_card.1.auto: xlnx-i2s-snd-card-0 registration failed
```

</details>

### License

Licensed under the Apache License, Version 2.0 (the "License"); you may not use this file except in compliance with the License.

You may obtain a copy of the License at
[http://www.apache.org/licenses/LICENSE-2.0](http://www.apache.org/licenses/LICENSE-2.0)


Unless required by applicable law or agreed to in writing, software distributed under the License is distributed on an "AS IS" BASIS, WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied. See the License for the specific language governing permissions and limitations under the License.

<p align="center">Copyright&copy; 2022 Xilinx</p>
