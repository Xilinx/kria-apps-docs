<table class="sphinxhide">
 <tr>
   <td align="center"><img src="../../media/xilinx-logo.png" width="30%"/><h1> Kria&trade; KV260 Vision AI Starter Kit NLP Smart Vision Tutorial</h1>
   </td>
 </tr>
 <tr>
 <td align="center"><h1> Known Issues</h1>

 </td>
 </tr>
</table>

# Known Issues

This document records known issues or gives behavior that might be unexpected some explanations.

First review the [FAQ](https://xilinx.github.io/kria-apps-docs/faq/build/html/docs/faq.html) for commonly encountered issues across the Kria SOM applications.

* Some monitors will display in non-desktop mode (running docker on serial port or SSH session) but not in Ubuntu&reg; GUI mode.

* Make sure that AR1335 sensor module is the only video device connected to board. The application might fail if other media devices are connected to board.

* During the application launch, the following warning is seen. This is a bug from trying to use Gstreamer with OpenCV. You can ignore this warning as it will not affect the functionality.

  ``` bash
  [ WARN:0] global /usr/src/debug/opencv/4.4.0-r0/git/modules/videoio/src/cap_gstreamer.cpp (935) open OpenCV | GStreamer warning: Cannot query video position: status=0, value=-1, duration=-1
  ```

* While terminating the application with ```ctrl + C```, you might see the following error messages which can be safely ignored:

  ```bash
  ^C!!! Failed to read frame from mipi media node. Please make sure the design is loaded
  ```


<p class="sphinxhide" align="center"><sub>Copyright © 2021-2024 Advanced Micro Devices, Inc</sub></p>

<p class="sphinxhide" align="center"><sup><a href="https://www.amd.com/en/corporate/copyright">Terms and Conditions</a></sup></p>