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

This document records known issues or gives behavior that may be unexpected some explanations.

Please first review the [FAQ](https://xilinx.github.io/kria-apps-docs/faq/build/html/docs/faq.html) for commonly encountered issues across Kria SOM applications.

* Some monitors will display in non-desktop mode (running docker on serial port or SSH session) but not in Ubuntu GUI mode.

* Make sure that AR1335 sensor module is the only video device connected to board. The application may fail of other media devices are connected to board

* During application launch the following warning is seen. This is a bug from trying to use Gstreamer with OpenCV. User can ignore this warning as it wont effect the functionality

``` bash
[ WARN:0] global /usr/src/debug/opencv/4.4.0-r0/git/modules/videoio/src/cap_gstreamer.cpp (935) open OpenCV | GStreamer warning: Cannot query video position: status=0, value=-1, duration=-1
```

* While terminating the application with ```ctrl + C``` User might see the following error messages which can be safely ignored.

```bash
^C!!! Failed to read frame from mipi media node. Please make sure the design is loaded
```

## License

Licensed under the Apache License, Version 2.0 (the "License"); you may not use this file except in compliance with the License.

You may obtain a copy of the License at
[http://www.apache.org/licenses/LICENSE-2.0](http://www.apache.org/licenses/LICENSE-2.0)

Unless required by applicable law or agreed to in writing, software distributed under the License is distributed on an "AS IS" BASIS, WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied. See the License for the specific language governing permissions and limitations under the License.

<p align="center">Copyright&copy; 2021 Xilinx</p>
