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

* Monitor should be connected properly to the board before power on, otherwise the resolution will not be recognized correctly.

* Make sure that AR1335 sensor module is the only video device connected to board. The application may fail of other media devices are connected to board

* With an older version of dfx-mgr, installing firmware binaries (xlnx-firmware-kv260-aibox-reid) causes dfx-mgr to crash and a restart is needed. To restart dfx, issue command ```sudo systemctl restart dfx-mgr.service```

* After invoking the command `xmutil loadapp` to load firmware, it needs several seconds for the whole firmware to be ready. If you launch docker before the firmware is loaded, it will not be able to use DPU node properly and you may see the below error while launching nlp-smartvision application

    ```bash
    WARNING: Logging before InitGoogleLogging() is written to STDERR
    F0830 10:01:34.758910 22 xrt_bin_stream.cpp:60] Check failed: fd_ > 0 (-1 vs. 0) , open(/usr/lib/dpu.xclbin) failed.
      Check failure stack trace: ***
    Aborted by signal Aborted...
    ```

    To resolve this issue, exit the docker container and unload the nlp-smartvision firmware using xmutil. Then delete folder /etc/vart.conf/ using ```rm -rf /etc/vart.conf/```

    ```bash
    root@xlnx-docker/# exit
    ubuntu@kria:~$ sudo xmutil unloadapp
    ubuntu@kria:~$ sudo rm -rf /etc/vart.conf/
    ```

    Now you can start with the app deployment steps from loading the firmware and launching docker.

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
