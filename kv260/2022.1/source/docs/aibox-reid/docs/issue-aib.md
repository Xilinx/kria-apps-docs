<table class="sphinxhide">
 <tr>
   <td align="center"><img src="../../media/xilinx-logo.png" width="30%"/><h1>Kria&trade; KV260 Vision AI Starter Kit <br>AI Box Tutorial</h1>
   </td>
 </tr>
 <tr>
 <td align="center"><h1>Known Issues</h1>

 </td>
 </tr>
</table>

# Known Issues

First review the [FAQ](https://xilinx.github.io/kria-apps-docs/faq/build/html/docs/faq.html) for commonly encountered issues across the Kria SOM applications.

* With a few non-standard 4k monitors, the display will show additional strips around the 2x2 grids.
* With all four channels enabled, the output displayed will look laggy.
* When calling the apps for the first time, you might see a critical error "Couldn't g_module_open libpython"—it is benign and can be ignored.
* <a name="notebook-one-channel"></a>For security reasons, the Jupyter Lab server should not be started as root user, but because of Linux kernel constraints, this restriction causes the Jupyter notebook of the AIBox-ReID application can only display one channel video.
* When using VLC player as RTSP server, aibox_reid app will exit at end of video when receiving end-of-stream from VLC player—this is expected.
* Each RTSP stream should be 1080p H264/H265—other resolution/format might have unexpected behavior such as freezed stream after a few hours of running.
* Jupyter lab does not have permission to write checkpoints into `/opt/xilinx/kv260-aibox-reid/share/notebooks`.

  ``` text
  [W 11:59:21.864 LabApp] 403 GET /api/contents/aibox-reid/aibox-reid.ipynb/checkpoints?1618514139945 (172.19.166.240): Permission denied: aibox-reid/.ipynb_checkpoints
  [W 11:59:21.865 LabApp] Permission denied: aibox-reid/.ipynb_checkpoints
  ```

* With some monitors, the application `-p` option for selecting which position/quadrant to display the requested video does not function properly. Instead, the video will always be displayed in zero position (upper left) irrespective of the `-p` requested position.

## License

Licensed under the Apache License, Version 2.0 (the "License"); you may not use this file except in compliance with the License.

You may obtain a copy of the License at
[http://www.apache.org/licenses/LICENSE-2.0](http://www.apache.org/licenses/LICENSE-2.0).

Unless required by applicable law or agreed to in writing, software distributed under the License is distributed on an "AS IS" BASIS, WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied. See the License for the specific language governing permissions and limitations under the License.

<p align="center">Copyright&copy; 2021-2023 Advanced Micro Devices, Inc</p>
