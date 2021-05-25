<table class="sphinxhide">
 <tr>
   <td align="center"><img src="../../media/xilinx-logo.png" width="30%"/><h1>Kria&trade; KV260 Vision AI Starter Kit <br> AIBox ReID Tutorial</h1>
   </td>
 </tr>
 <tr>
 <td align="center"><h1>Debugging</h1>

 </td>
 </tr>
</table>

# Debugging

## This section list some debugging tips for the application.

* Make sure you use: 

    `xmutil      loadapp kv260-aibox-reid`

    to load the firmware properly, otherwise many drivers including will not be loaded and many errors will pop up when you run the application.

## This section list some debugging tips for platform peripherals.

### Monitor

<details>
 <summary>Click here to view details</summary>

Ensure to use certified cables for DP and HDMI, recommended specs are HDMI 2.0 and DP 1.2 above.
If cables are faulty, they could cause distortions or disable display.

Modetest is a test tool which can be found as part of the libdrm suite of test tools.

	Note: Prints shown below is an example from a 4k monitor. Use for reference only.

#### Ensure status of monitor is connected 

`modetest -M xlnx -D 80000000.v_mix`

The above command would read out the monitors EDID information. 


```
Connectors:
id      encoder status          name            size (mm)       modes   encoders
52      51      connected       DP-1            610x350         43      51
```

#### Display modes supported by your display

`modetest -M xlnx -D 80000000.v_mix`

 Below are the modes that are supported by your display. 

```
  modes:
        name refresh (Hz) hdisp hss hse htot vdisp vss vse vtot)
  3840x2160 30.00 3840 4016 4104 4400 2160 2168 2178 2250 297000 flags: phsync, pvsync; type: driver
  3840x2160 30.00 3840 4016 4104 4400 2160 2168 2178 2250 297000 flags: phsync, pvsync; type: driver
  ...
  ...
```

Ensure display is capable of supporting user requested resolution and refresh rates to the application.

#### Current mode 

`modetest -M xlnx -D 80000000.v_mix`

 CRTC indicates the current mode that is set.
```
CRTCs:
id      fb      pos     size
40      47      (0,0)   (3840x2160)
  3840x2160 30.00 3840 4016 4104 4400 2160 2168 2178 2250 297000 flags: phsync, pvsync; type: driver
  props:
```

#### Test to determine if display is OK

`modetest -M xlnx -D 80000000.v_mix -s 52@40:3840x2160@NV16`

The  above command sets a mode, blue screen appears on the display.

![Blue Screen](../../media/blue_screen.png)

</details>

## Known Benign Error messages

<details>
 <summary>Click here to view details</summary>

User does not have to worry about Errors logged by the linux kernl while excuting the specified commands below, they are benign and can be ignored.

`xmutil unloadapp`

```
[ 4125.507273] OF: ERROR: memory leak, expected refcount 1 instead of 2, ...... ... 
[ 4125.507293] OF: ERROR: memory leak, expected refcount 1 instead of 2, ...... ... 
```
</details>

### License

Licensed under the Apache License, Version 2.0 (the "License"); you may not use this file except in compliance with the License.

You may obtain a copy of the License at
[http://www.apache.org/licenses/LICENSE-2.0](http://www.apache.org/licenses/LICENSE-2.0)

Unless required by applicable law or agreed to in writing, software distributed under the License is distributed on an "AS IS" BASIS, WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied. See the License for the specific language governing permissions and limitations under the License.

<p align="center">Copyright&copy; 2021 Xilinx</p>
