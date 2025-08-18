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

First review the [FAQ](https://xilinx.github.io/kria-apps-docs/faq/build/html/docs/faq.html) for commonly encountered issues across the Kria SOM applications.

* The `-R` option of the smartcam application for reporting FPS does not print any information when the target `-t` is RTSP.

* When using VLC to play the RTSP stream sent out by the application, sometimes it does not work on some client machines, while the FFplay works well.

* The KR260 carrier card does not power the AR1335 sensor module auto-focus feature. This is due to cross-sensor pin compatibility allowing the board to support other IAS Sensor modules. The result is that the AR1335 sensor module will not have a dynamic focus and depending on positioning of the objects to the lens, the images might appear blurry.

* The smartcam application is only supported in desktop_disabled mode (direct display). This is because desktop mode requires RGB16 format, while smartcam assumes the optimized input format NV12. Desktop rendering would require software-based color conversion that severely reduces system performance. Thus, it is not supported.

* If Logitech Brio camera is only producing 5 fps and is enumerated only as a USB2.0 device, ensure to upgrade its firmware to 1.0.423 or later. See the Logitech support website for firmware update utilities. Frame rate is reported by the application using the `-R` option.

* When using the MIPI input to the application, if the system presents a very low frame-rate (< 2 fps), either reboot the platform and restart the application, or stop the application and unload/load the kv260-smartcam firmware before restarting the application. The frame rate is reported by the application using the `-R` option.

* Jupyter notebook only supports MIPI/USB input and DP/RTSP output.

* The latency of the USB/MIPI camera to DP path varies depending on the source type and monitor type (DP monitor/HDMI monitor), because of different inherent latencies of the specific sources devices and display devices.
The following table shows testing results. The glass to glass latency is measured by putting a running stopwatch before the camera, and then take a screenshot containing both the original stopwatch and the image of the stopwatch in the monitor, so that you can calculate the latency with

  **Time_of_stopwatch_in_monitor - Time_physical_stopwatch**

|            |                | MIPI        | MIPI        | USB   | USB     |
|------------|----------------|-------------|-------------|-------|---------|
|            |                | No AI       | With AI     | No AI | With AI |
| Monitor A  | DP connector   | 60ms        | 90ms        | 90ms  | 120ms   |
| Monitor A  | HDMI connector | 60-70ms     | 90-100ms    | 140ms | 160ms   |
| Monitor B  | HDMI connector | 260ms-270ms | 280ms-290ms | 220ms | 260ms   |

**With AI** Run smartcam without option `-n`
**NO AI**  Run smartcam with option `-n`, turning off AI detection.
**Monitor A** Dell PC monitor P2317H 1080p
**Monitor B** Skyworth 4K TV 50H9D

* After invoking the command `xmutil loadapp` to load firmware, it needs several seconds for the whole firmware to be ready. If you launch docker before the firmware is loaded, it will not be able to use DPU node properly, and you might see the following error while launching application:

    ```bash
    WARNING: Logging before InitGoogleLogging() is written to STDERR
    F0830 10:01:34.758910 22 xrt_bin_stream.cpp:60] Check failed: fd_ > 0 (-1 vs. 0) , open(/usr/lib/dpu.xclbin) failed.
      Check failure stack trace: ***
    Aborted by signal Aborted...
    ```

    To resolve this issue, exit the Docker container, and unload the firmware using xmutil. Then delete the folder, `/etc/vart.conf/`, using ```rm -rf /etc/vart.conf/```.

    ```bash
    root@xlnx-docker/# exit
    ubuntu@kria:~$ sudo xmutil unloadapp
    ubuntu@kria:~$ sudo rm -rf /etc/vart.conf/
    ```

    Now you can start with the app deployment steps from loading the firmware and launching the Docker.

* A known issue with the I2S driver will cause a random kernel crash when loading and unloading the kv260-smartcam firmware with the following commands several times:

   ```bash
   xmutil unloadapp
   xmutil loadapp kv260-smartcam
   ```

  So the audio feature of the application is disabled by disabling the I2S subsystem in the dtsi file, which means the `-A"/"--audio` option with RTSP target will not stream the audio.

## Limitations

* The model used for the solid-state disk (SSD) AI task through the option, `--aitask ssd`, is ssd_adas_pruned_0_95 from the Vitis-AI-Library, which is not a general SSD model, but only for the ADAS scenario as showed by the [BDD dataset](https://bdd-data.berkeley.edu/).

* The model used for the Refinedet AI task through the option `--aitask refinedet` is refinedet_pruned_0_96 from the Vitis-AI-Library, which is not a general object detection model, but only for the detection of pedestrian, such as the person object in [COCO dataset](https://cocodataset.org/#explore).


<p class="sphinxhide" align="center"><sub>Copyright © 2021-2024 Advanced Micro Devices, Inc</sub></p>

<p class="sphinxhide" align="center"><sup><a href="https://www.amd.com/en/corporate/copyright">Terms and Conditions</a></sup></p>