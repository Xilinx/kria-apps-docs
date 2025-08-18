<table class="sphinxhide">
 <tr>
   <td align="center"><img src="https://raw.githubusercontent.com/Xilinx/Image-Collateral/main/xilinx-logo.png" width="30%"/><h1>Kria&trade; KR260 Robotics Starter Kit</h1>
   </td>
 </tr>
 <tr>
 <td align="center"><h1>Machine Vision Camera Tutorial</h1>
 
 </td>
 </tr>
</table>

# Debug

First review the [FAQ](https://xilinx.github.io/kria-apps-docs/faq.html) for commonly encountered issues across AMD Kria&trade; SOM applications.

1. To get the maximum fps in the sphinx GEV viewer, you can change the draw value in sphinx --> options based on the host type (windows or ubuntu)

   - On ubuntu host

     For 60 fps, set the draw value to `10`.

     For 120 fps, set the draw value to `50`.

   - On windows host

      For 60/120 fps, set the draw value to `10`.

      ![Sphinx GE Viewer](media/Sphinx_GE_Viewer.png)

2. To cross check the connection between KR260 target and host, use ping functionality. For Example:

   ```
   ping -I <10G_interface_name> <ip address>
   ```

3. To identify whether NIC card is inserted properly or not in ubuntu host machine PCIe slot, run this command:

   ```
   lspci -vvv | grep -i "82599 10 Gigabit Network"
   ```

4. After inserting the 10G NIC card in windows host machine PCIe slot, check device manager for device detection and driver installation. If the driver is not installed for this device, install the driver from the given link: [NIC Card driver](https://www.intel.com/content/www/us/en/download/15084/intel-ethernet-adapter-complete-driver-pack.html).

5. If you get -1 for `xmutil loadapp <app name>`, try to unload the existing app firmware using `xmutil unloadapp` and then load the preferred app firmware.

6. To trigger the sensor stream-on, run the Gstreamer capture pipeline in the background using gst-launch-1.0 utility before starting the 10GigE application.

7. To install the mv-camera firmware manually, use the following command.

    ```bash
   apt install xlnx-firmware-kr260-mv-camera-mono  // mono variant
   apt install xlnx-firmware-kr260-mv-camera-color // color variant
   ```

   ***Note***: Ensure to run the apt update to get the latest firmware.

8. Make sure to use the following command:

   ```bash
   sudo xmutil loadapp kr260-mv-camera-mono  // mono variant
   sudo xmutil loadapp kr260-mv-camera-color // color variant
   ```
   to load the **mv-defect-detect** firmware properly. Otherwise, necessary drivers are not loaded. There might be some errors that popup when you run the **mv-defect-detect** application.

9. Always unload existing firmware before loading the mv-defect-detect firmware.

10. The Framerate displayed is only for Live Playback. To get the framerate on console, prepend the GStreamer application as follows:

    ```
    GST_DEBUG="*defect*:4" mv-defect-detect
    ```

### Gst-launch Examples for Live Input and Raw Output

* Live In - Live Out - Mono

  ```
  gst-launch-1.0 v4l2src device=/dev/video0 io-mode=5 ! video/x-raw, width=1920, height=1080, format=GRAY8, framerate=60/1 ! perf ! kmssink bus-id=fd4a0000.display fullscreen-overlay=true -v
  ```

* Live In - Live Out - Color

  ```
  gst-launch-1.0 v4l2src device=/dev/video0 io-mode=5 ! video/x-raw, width=1920, height=1080, format=RGB, framerate=60/1 ! perf ! kmssink bus-id=fd4a0000.display fullscreen-overlay=true -v
  ```

* Live In - File Out - Mono

  ```
  gst-launch-1.0 v4l2src device=/dev/video0 ! video/x-raw, width=1920, height=1080, format=GRAY8, framerate=60/1 ! perf ! filesink location=out.y8 -v
  ```
* Live In - File Out - Color

  ```
  gst-launch-1.0 v4l2src device=/dev/video0 ! video/x-raw, width=1920, height=1080, format=RGB, framerate=60/1 ! perf ! filesink location=out.rgb -v
  ```

### Gst-launch Examples for Live Input and Pre-process Output

* Live In - Live Out - Mono

  ```
  gst-launch-1.0 v4l2src device=/dev/video0 io-mode=4 ! video/x-raw, width=1920, height=1080, format=GRAY8, framerate=60/1 ! vvas_xfilter kernels-config=/opt/xilinx/xlnx-app-kr260-mv-defect-detect/share/vvas/mono/otsu-accelarator.json ! queue ! video/x-raw, width=1920, height=1080, format=GRAY8 ! vvas_xfilter kernels-config=/opt/xilinx/xlnx-app-kr260-mv-defect-detect/share/vvas/mono/preprocess-accelarator-stride.json ! video/x-raw, width=1920, height=1080, format=GRAY8 ! perf ! kmssink bus-id=fd4a0000.display fullscreen-overlay=true -v
  ```

* Live In - File Out - Color

  ```
  gst-launch-1.0 v4l2src device=/dev/video0 io-mode=4 ! video/x-raw, width=1920, height=1080, format=GRAY8, framerate=60/1 ! vvas_xfilter kernels-config=/opt/xilinx/xlnx-app-kr260-mv-defect-detect/share/vvas/color/otsu-accelarator.json ! queue ! video/x-raw, width=1920, height=1080, format=GRAY8 ! vvas_xfilter kernels-config=/opt/xilinx/xlnx-app-kr260-mv-defect-detect/share/vvas/color/preprocess-accelarator.json ! video/x-raw, width=1920, height=1080, format=GRAY8 ! perf ! filesink location=out.rgb -v
  ```

### Gst-launch Examples for Live Input and CCA with Text Overlay Output

* Live In - Live Out - Color

   ```
   gst-launch-1.0 v4l2src device=/dev/video0 io-mode=4 ! video/x-raw, width=1920, height=1080, format=GRAY8, framerate=60/1 ! vvas_xfilter kernels-config=/opt/xilinx/xlnx-app-kr260-mv-defect-detect/share/vvas/color/otsu-accelarator.json ! queue ! video/x-raw, width=1920, height=1080, format=GRAY8 ! vvas_xfilter kernels-config=/opt/xilinx/xlnx-app-kr260-mv-defect-detect/share/vvas/color/preprocess-accelarator.json ! queue ! video/x-raw, width=1920, height=1080, format=NV16 ! vvas_xfilter kernels-config=/opt/xilinx/xlnx-app-kr260-mv-defect-detect/share/vvas/color/cca-accelarator-stride.json ! queue ! video/x-raw, width=1920, height=1080, format=GRAY8 ! vvas_xfilter kernels-config=/opt/xilinx/xlnx-app-kr260-mv-defect-detect/share/vvas/color/text2overlay.json ! video/x-raw, width=1920, height=1080, format=GRAY8 ! perf ! kmssink bus-id=fd4a0000.display fullscreen-overlay=true sync=false -v
   ```

* Live In - File Out - Mono

  ```
  gst-launch-1.0 v4l2src device=/dev/video0 io-mode=4 ! video/x-raw, width=1920, height=1080, format=GRAY8, framerate=60/1 ! vvas_xfilter kernels-config=/opt/xilinx/xlnx-app-kr260-mv-defect-detect/share/vvas/mono/otsu-accelarator.json ! queue ! video/x-raw, width=1920, height=1080, format=GRAY8 ! vvas_xfilter kernels-config=/opt/xilinx/xlnx-app-kr260-mv-defect-detect/share/vvas/mono/preprocess-accelarator.json ! queue ! video/x-raw, width=1920, height=1080, format=NV16 ! vvas_xfilter kernels-config=/opt/xilinx/xlnx-app-kr260-mv-defect-detect/share/vvas/mono/cca-accelarator.json ! queue ! video/x-raw, width=1920, height=1080, format=GRAY8 ! vvas_xfilter kernels-config=/opt/xilinx/xlnx-app-kr260-mv-defect-detect/share/vvas/mono/text2overlay.json ! video/x-raw, width=1920, height=1080, format=GRAY8 ! perf ! filesink location=out.y8 -v
  ```

### Gst-launch Examples for File Input and Raw Output

* File In - Live Out - Mono

  ```
  gst-launch-1.0 filesrc location=./input.y8 blocksize=2073600 ! rawvideoparse use-sink-caps=false width=1920 height=1080 format=gray8 framerate=2/1 ! perf ! kmssink bus-id=fd4a0000.display fullscreen-overlay=true sync=true -v
  ```

* File In - File Out - Color

  ```
  gst-launch-1.0 filesrc location=./input.rgb blocksize=6220800 ! rawvideoparse use-sink-caps=false width=1920 height=1080 format=rgb framerate=2/1 ! perf ! filesink location=out.rgb -v
  ```

### Gst-launch Examples for File Input and Pre-process Output

* File In - Live Out - Color

  ```
  gst-launch-1.0 filesrc location=./input.rgb blocksize=6220800 ! rawvideoparse use-sink-caps=false width=1920 height=1080 format=rgb framerate=2/1 ! vvas_xfilter kernels-config=/opt/xilinx/xlnx-app-kr260-mv-defect-detect/share/vvas/color/otsu-accelarator.json ! queue ! video/x-raw, width=1920, height=1080, format=GRAY8 ! vvas_xfilter kernels-config=/opt/xilinx/xlnx-app-kr260-mv-defect-detect/share/vvas/color/preprocess-accelarator-stride.json ! queue ! video/x-raw, width=1920, height=1080, format=GRAY8 ! perf ! kmssink bus-id=fd4a0000.display fullscreen-overlay=true sync=true -v
  ```

* File In - File Out - Mono

  ```
  gst-launch-1.0 filesrc location=./input.y8 blocksize=2073600 ! rawvideoparse use-sink-caps=false width=1920 height=1080 format=gray8 framerate=2/1 ! vvas_xfilter kernels-config=/opt/xilinx/xlnx-app-kr260-mv-defect-detect/share/vvas/mono/otsu-accelarator.json ! queue ! video/x-raw, width=1920, height=1080, format=GRAY8 ! vvas_xfilter kernels-config=/opt/xilinx/xlnx-app-kr260-mv-defect-detect/share/vvas/mono/preprocess-accelarator.json ! video/x-raw, width=1920, height=1080, format=GRAY8 ! perf ! filesink location=out.y8 -v
  ```

### Gst-launch Examples for File Input and CCA with Text Overlay Output

* File In - Live Out - Mono

  ```
  gst-launch-1.0 filesrc location=./input.y8 blocksize=2073600 ! rawvideoparse use-sink-caps=false width=1920 height=1080 format=gray8 framerate=2/1 ! vvas_xfilter kernels-config=/opt/xilinx/xlnx-app-kr260-mv-defect-detect/share/vvas/mono/otsu-accelarator.json ! queue ! video/x-raw, width=1920, height=1080, format=GRAY8 ! vvas_xfilter kernels-config=/opt/xilinx/xlnx-app-kr260-mv-defect-detect/share/vvas/mono/preprocess-accelarator.json ! queue ! video/x-raw, width=1920, height=1080, format=NV16 ! vvas_xfilter kernels-config=/opt/xilinx/xlnx-app-kr260-mv-defect-detect/share/vvas/mono/cca-accelarator-stride.json ! queue ! video/x-raw, width=1920, height=1080, format=GRAY8 ! vvas_xfilter kernels-config=/opt/xilinx/xlnx-app-kr260-mv-defect-detect/share/vvas/mono/text2overlay.json ! video/x-raw, width=1920, height=1080, format=GRAY8 ! perf ! kmssink bus-id=fd4a0000.display fullscreen-overlay=true sync=true -v
  ```

* File In - File Out - Color

  ```
  gst-launch-1.0 filesrc location=./input.rgb blocksize=6220800 ! rawvideoparse use-sink-caps=false width=1920 height=1080 format=rgb framerate=2/1 ! vvas_xfilter kernels-config=/opt/xilinx/xlnx-app-kr260-mv-defect-detect/share/vvas/color/otsu-accelarator.json ! queue ! video/x-raw, width=1920, height=1080, format=GRAY8 ! vvas_xfilter kernels-config=/opt/xilinx/xlnx-app-kr260-mv-defect-detect/share/vvas/color/preprocess-accelarator.json ! queue ! video/x-raw, width=1920, height=1080, format=NV16 ! vvas_xfilter kernels-config=/opt/xilinx/xlnx-app-kr260-mv-defect-detect/share/vvas/color/cca-accelarator.json ! queue ! video/x-raw, width=1920, height=1080, format=GRAY8 ! vvas_xfilter kernels-config=/opt/xilinx/xlnx-app-kr260-mv-defect-detect/share/vvas/color/text2overlay.json ! video/x-raw, width=1920, height=1080, format=GRAY8 ! perf ! filesink location=out.rgb -v
  ```

## Next Steps

* [Known Issues and Limitations](known_issues.md)
* Go back to the [MV Camera Application Deployment](app_deployment.md)


<hr class="sphinxhide"></hr>

<p class="sphinxhide" align="center"><sub>Copyright © 2023–2024 Advanced Micro Devices, Inc.</sub></p>

<p class="sphinxhide" align="center"><sup><a href="https://www.amd.com/en/corporate/copyright">Terms and Conditions</a></sup></p>
