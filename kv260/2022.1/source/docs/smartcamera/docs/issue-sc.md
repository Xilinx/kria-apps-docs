<table class="sphinxhide">
 <tr>
   <td align="center"><img src="../../media/xilinx-logo.png" width="30%"/><h1>Kria&trade; KV260 Vision AI Starter Kit <br>Smart Camera Tutorial</h1>
   </td>
 </tr>
 <tr>
 <td align="center"><h1>Known Issues & Limitations</h1>

 </td>
 </tr>
</table>

# Known Issues

Please first review the [FAQ](https://xilinx.github.io/kria-apps-docs/faq/build/html/docs/faq.html) for commonly encountered issues across Kria SOM applications.

* The "-R" option of smartcam application for reporting FPS doesn't print any info when the target "-t" is RTSP.

* When using VLC to play the RTSP stream sent out by the application, sometimes it doesn't work on some client machines, while the FFplay works well.

* The KR260 carrier card does not power the AR1335 sensor module auto-focus feature. This is due to cross-sensor pin compatibility allowing the board to support other IAS Sensor modules. The result is that the AR1335 sensor module will not have a dynamic focus and depending on positioning of the objects to the lens the images may appear blurry.

* The smartcam application is only supported in desktop_disabled mode (direct display). This is because desktop mode requires RGB16 format, while smartcam assumes optimized input format NV12. Desktop rendering would require SW based color conversion that severely reduces system performance. Thus, it is not supported.

* If Logitech Brio camera is only producing 5fps and is enumerated only as a USB2.0 device, ensure to upgrade its firmware to 1.0.423 or later. See Logitech support website for firmware update utilities. Frame rate is reported by the application using the -R option.

* When using the MIPI input to the application if the system presents a very low frame-rate (< 2 fps) please either reboot the platform and restart the application or stop the application and unload/load the kv260-smartcam firmware before restarting the application. Frame rate is reported by the application using the -R option.

* Jupyter notebook only supports MIPI/USB input, and DP/RTSP output.

* The latency of USB/MIPI camera to DP path varies depending on the source type and monitor type (DP monitor / HDMI monitor), because of different inherent latencies of the specific sources devices and display devices.
Following is a table of our testing results.
We measure the glass to glass latency, by putting a running stopwatch before the camera, and then take a screenshot containing both the original stopwatch and the image of the stopwatch in the monitor, so that we can calculate the latency with

  **Time_of_stopwatch_in_monitor - Time_physical_stopwatch**

|            |                | MIPI        | MIPI        | USB   | USB     |
|------------|----------------|-------------|-------------|-------|---------|
|            |                | No AI       | With AI     | No AI | With AI |
| Monitor A  | DP connector   | 60ms        | 90ms        | 90ms  | 120ms   |
| Monitor A  | HDMI connector | 60-70ms     | 90-100ms    | 140ms | 160ms   |
| Monitor B  | HDMI connector | 260ms-270ms | 280ms-290ms | 220ms | 260ms   |

**With AI** Run smartcam without option "-n"
**NO AI**  Run smartcam with option "-n", turning off AI detection.
**Monitor A** Dell PC monitor P2317H 1080p
**Monitor B** Skyworth 4K TV 50H9D


* After invoking the command `xmutil loadapp` to load firmware, it needs several seconds for the whole firmware to be ready. If you launch docker before the firmware is loaded, it will not be able to use DPU node properly and you may see the below error while launching application

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

* A known issue with I2S driver will cause a random kernel crash when loading and unloading the kv260-smartcam firmware with the following commands several times.

   ```bash
   xmutil unloadapp
   xmutil loadapp kv260-smartcam
   ```

  So the audio feature of the application is disabled by disabling the I2S subsystem in the dtsi file, which means the "-A"/"--audio" option with RTSP target will not stream the audio.

# Limitations

* The model we use for SSD AI task through the option "--aitask ssd" is ssd_adas_pruned_0_95 from Vitis-AI-Library, which is not a general SSD model, but only for the ADAS scenario as showing by the [BDD dataset](https://bdd-data.berkeley.edu/).

* The model we use for Refinedet AI task through the option "--aitask refinedet" is refinedet_pruned_0_96 from Vitis-AI-Library, which is not a general object detection model, but only for the detection of pedestrian such as the person object in [COCO dataset](https://cocodataset.org/#explore).

### License

Licensed under the Apache License, Version 2.0 (the "License"); you may not use this file except in compliance with the License.

You may obtain a copy of the License at
[http://www.apache.org/licenses/LICENSE-2.0](http://www.apache.org/licenses/LICENSE-2.0)


Unless required by applicable law or agreed to in writing, software distributed under the License is distributed on an "AS IS" BASIS, WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied. See the License for the specific language governing permissions and limitations under the License.

<p align="center">Copyright&copy; 2022 Xilinx</p>
