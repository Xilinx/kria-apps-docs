<table class="sphinxhide">
 <tr>
   <td align="center"><img src="../../media/xilinx-logo.png" width="30%"/><h1>Kria&trade; KV260 SOM Starter Kit Defect Detection Tutorial</h1>
   </td>
 </tr>
 <tr>
 <td align="center"><h1>Debugging</h1>

 </td>
 </tr>
</table>

This document lists some debugging tips for the Defect Detection application.

First review the [FAQ](https://xilinx.github.io/kria-apps-docs/faq/build/html/docs/faq.html) for commonly encountered issues across the Kria SOM applications.

* Make sure that you use:

  `sudo xmutil loadapp kv260-defect-detect`

  to load the **defect-detect** firmware properly. Otherwise, necessary drivers will not be loaded, and there will be many errors that pop up when you run the **defect-detect** application.

* Always unload existing firmware before loading the **defect-detect** firmware.

* You can list the media devices with the command:

  `ls /dev/media*`

* You must use AR0144 as the MIPI sensor; AR1335 will not work with the **defect-detect** application.

* Ensure that you pass in the appropriate width/height (1280x800) of the input to the application.

* The Framerate is displayed only for Live Playback. To get the framerate on console, you need to prepend the keywords `GST_DEBUG="*defect*:4"` in the GStreamer application/pipeline.

  For example:

    `GST_DEBUG="*defect*:4" defect-detect`

* For GStreamer pipeline changes, you can use the Jupyter Notebook.

The following are some example Gstreamer pipelines:

 >**NOTE:** Run `modetest -M xlnx -D B0010000.v_mix -s 52@40:3840x2160@NV16` command before running any of the following pipelines, including the ones in the Demo mode.
 
 >**NOTE:** Navigate to `/opt/xilinx/kv260-defect-detect/share/vvas/`, and then run the *gst-launch* commands.

  1. When the input is a file, and the output is a display:

      `gst-launch-1.0 filesrc location=./input_video.y8 blocksize=1024000 ! "video/x-raw, width=1280, height=800, format=GRAY8, framerate=60/1" ! tee name=t_src t_src. ! queue  ! vvas_xfilter kernels-config=otsu-accelarator.json ! vvas_xfilter kernels-config=preprocess-accelarator.json ! tee name=t_pre t_pre. ! queue  ! vvas_xfilter kernels-config=cca-accelarator.json ! vvas_xfilter kernels-config=text2overlay.json ! perf ! kmssink bus-id=B0010000.v_mix plane-id=34 render-rectangle="<2560,680,1280,800>" t_src. ! queue ! perf ! kmssink bus-id=B0010000.v_mix plane-id=35 render-rectangle="<0,680,1280,800>" t_pre. ! queue ! perf ! kmssink bus-id=B0010000.v_mix plane-id=36 render-rectangle="<1280,680,1280,800>"`

  2. When the input is a file, and the output is dumped to a file:

      `gst-launch-1.0 filesrc location=./input_video.y8 blocksize=1024000 ! "video/x-raw, width=1280, height=800, format=GRAY8, framerate=60/1" ! tee name=t_src t_src. ! queue ! vvas_xfilter kernels-config=otsu-accelarator.json ! vvas_xfilter kernels-config=preprocess-accelarator.json ! tee name=t_pre t_pre. ! queue  ! vvas_xfilter kernels-config=cca-accelarator.json ! vvas_xfilter kernels-config=text2overlay.json ! filesink location=final.y8 t_src. ! queue ! filesink location=raw.y8 t_pre. ! queue ! filesink location=pre.y8`

  3. When the input is a live source, and the output is a display:

      `gst-launch-1.0 mediasrcbin media-device=/dev/media0 ! "video/x-raw, width=1280, height=800, format=GRAY8, framerate=60/1" ! tee name=t_src t_src. ! queue ! vvas_xfilter kernels-config=otsu-accelarator.json ! vvas_xfilter kernels-config=preprocess-accelarator.json ! tee name=t_pre t_pre. ! queue ! vvas_xfilter kernels-config=cca-accelarator.json ! vvas_xfilter kernels-config=text2overlay.json ! perf ! kmssink bus-id=B0010000.v_mix plane-id=34 render-rectangle="<2560,680,1280,800>" t_src. ! queue ! perf ! kmssink bus-id=B0010000.v_mix plane-id=35 render-rectangle="<0,680,1280,800>" t_pre. ! queue ! perf ! kmssink bus-id=B0010000.v_mix plane-id=36 render-rectangle="<1280,680,1280,800>"`

  4. When the input is a live source, and the output is dumped to a file:

      `gst-launch-1.0 mediasrcbin media-device=/dev/media0 ! "video/x-raw, width=1280, height=800, format=GRAY8, framerate=60/1" ! tee name=t_src t_src. ! queue ! vvas_xfilter kernels-config=otsu-accelarator.json ! vvas_xfilter kernels-config=preprocess-accelarator.json ! tee name=t_pre t_pre. ! queue ! vvas_xfilter kernels-config=cca-accelarator.json ! vvas_xfilter kernels-config=text2overlay.json !  filesink location=final.y8 t_src. ! queue ! filesink location=raw.y8 t_pre. ! queue ! filesink location=pre.y8`

### Examples in Demo Mode

  1. When the input is a live source, and the output is a display:

      `gst-launch-1.0 mediasrcbin media-device=/dev/media0 ! "video/x-raw, width=1280, height=800, format=GRAY8, framerate=60/1" ! tee name=t_src t_src. ! queue ! vvas_xfilter kernels-config=otsu-accelarator.json ! vvas_xfilter kernels-config=preprocess-accelarator.json ! tee name=t_pre t_pre. ! queue ! vvas_xfilter kernels-config=cca-accelarator.json ! vvas_xfilter kernels-config=text2overlay.json ! videorate ! "video/x-raw, width=1280, height=800, format=GRAY8, framerate=4/1" ! perf ! kmssink bus-id=B0010000.v_mix plane-id=34 render-rectangle="<2560,680,1280,800>" t_src. ! queue ! videorate ! "video/x-raw, width=1280, height=800, format=GRAY8, framerate=4/1" ! perf ! kmssink bus-id=B0010000.v_mix plane-id=35 render-rectangle="<0,680,1280,800>" t_pre. ! queue  ! videorate ! "video/x-raw, width=1280, height=800, format=GRAY8, framerate=4/1" ! perf ! kmssink bus-id=B0010000.v_mix plane-id=36 render-rectangle="<1280,680,1280,800>"`

  2. When the input is a file, and the output is a display:

      `gst-launch-1.0 filesrc location=/run/media/sda1/input_video.y8 blocksize=1024000 ! rawvideoparse use-sink-caps=false width=1280 height=800 format=gray8 framerate=4/1 ! tee name=t_src t_src. ! queue ! vvas_xfilter kernels-config=otsu-accelarator.json ! vvas_xfilter kernels-config=preprocess-accelarator.json ! tee name=t_pre t_pre. ! queue ! vvas_xfilter kernels-config=cca-accelarator.json ! vvas_xfilter kernels-config=text2overlay.json ! perf ! kmssink bus-id=B0010000.v_mix plane-id=34 render-rectangle="<2560,680,1280,800>" t_src. ! queue ! perf ! kmssink bus-id=B0010000.v_mix plane-id=35 render-rectangle="<0,680,1280,800>" t_pre. ! queue ! perf ! kmssink bus-id=B0010000.v_mix plane-id=36 render-rectangle="<1280,680,1280,800>" async=false`  

## Obtaining Latency Measurements

To get the end-to-end pipeline latency, use the following command:

`GST_DEBUG="GST_TRACER:7" GST_TRACERS="latency" defect-detect >& ./latency.log`

Check the latency numbers in the `latency.log` (present in the current directory).

Check for the time (in nanosecond for latency) marked in bold in the following logs. The initial few readings might be high due to initialization time but become stable after initialization is complete.

GST_TRACER :0::[00m latency, src-element-id=(string)0xaaaaebffcd70, src-element=(string)v4l2src0, src=(string)src, sink-element-id=(string)0xaaaaebfb7400, sink-element=(string)**display-raw**, sink=(string)sink, **time=(guint64)36912068**, ts=(guint64)3681179762;

GST_TRACER :0::[00m latency, src-element-id=(string)0xaaaaebffcd70, src-element=(string)v4l2src0, src=(string)src, sink-element-id=(string)0xaaaaebfba200, sink-element=(string)**display-preprocess**, sink=(string)sink, **time=(guint64)36919081**, ts=(guint64)3681186775;

GST_TRACER :0::[00m latency, src-element-id=(string)0xaaaaebffcd70, src-element=(string)v4l2src0, src=(string)src, sink-element-id=(string)0xaaaaebfba990, sink-element=(string)**display-final**, sink=(string)sink, **time=(guint64)89479817**, ts=(guint64)3667429752;

> **NOTE:**
>
   > * Display-raw latency belongs to raw output.
    >* Display-preprocess latency belongs to pre-process output.
    >* Display-final latency belongs to final stage output.

If the preview image is not properly displayed, use the `ar0144-sensor-calib.sh` script (present in `/opt/xilinx/kv260-defect-detect/bin`)  to change various sensor calibration parameter values.

For each sensor calibration parameter, all possible values are present in `ar0144-sensor-calib.sh` comment lines. For example:

```
# *********************** Exposure Metering *****************************
# To set AE_Metering Mode as Average write 'exposure_metering=0'
# To set AE_Metering Mode as wide center write 'exposure_metering=0x1'
# To set AE_Metering Mode as narrow center write 'exposure_metering=0x2
# To set AE_Metering Mode as spot write 'exposure_metering=0x3
```

# Next Steps

* [Known Issues](known_issues_dd.md)

## License

Licensed under the Apache License, Version 2.0 (the "License"); you may not use this file except in compliance with the License.

You may obtain a copy of the License at
[http://www.apache.org/licenses/LICENSE-2.0](http://www.apache.org/licenses/LICENSE-2.0).

Unless required by applicable law or agreed to in writing, software distributed under the License is distributed on an "AS IS" BASIS, WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied. See the License for the specific language governing permissions and limitations under the License.

<p align="center"><sup>Copyright&copy; 2021-2023 Advanced Micro Devices, Inc</sup></p>
