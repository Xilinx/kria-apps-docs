<table class="sphinxhide">
 <tr>
   <td align="center"><img src="../../media/xilinx-logo.png" width="30%"/><h1>Kria&trade; KR260 Robotics Starter Kit <br>TSN ROS Pub Sub Tutorial</h1>
   </td>
 </tr>
 <tr>
 <td align="center"><h1>Known Issues & Limitations</h1>

 </td>
 </tr>
</table>

# Known Issues

This document records known issues or gives behavior that may be unexpected.

Please first review the [FAQ](https://xilinx.github.io/kria-apps-docs/faq.html) for commonly encountered issues across Kria SOM applications.

* Continues RTPS DDS (ROS Middleware) messages popup while running CPU varient as shown below. This is a known behaviour with RTPS middleware as mentioned [here](https://github.com/eProsima/Fast-DDS/issues/2799)
  ```bash
  [component_container-1] 2022-10-13 16:30:56.972 [RTPS_MSG_IN Error] (ID:281473539668192) Problem reserving CacheChange in reader: 01.0f.da.c1.9f.f4.74.8f.01.00.00.00|0.0.2f.4 -> Function processDataMsg

  ```

* Unsynchronized messages popup randomly on Streamlined app
  ```bash
  [rectify_resize_fpga_streamlined_node-1] [WARN] [1662749510.825170570] [ResizeNodeFPGAStreamlined]: [image_transport] Topics '/camera/image_raw' and '/camera_info' do not appear to be synchronized. In the last 10s:
  [rectify_resize_fpga_streamlined_node-1]        Image messages received:      29
  [rectify_resize_fpga_streamlined_node-1]        CameraInfo messages received: 24
  [rectify_resize_fpga_streamlined_node-1]        Synchronized pairs:           9

  ```

* Sometimes application exits with the following xclExecBuf error
  ```bash
  [rectify_resize_fpga_streamlined_node-1] [XRT] ERROR: unable to issue xclExecBuf
  [rectify_resize_fpga_streamlined_node-1] [XRT] ERROR: failed to load xclbin: Operation not permitted
  [rectify_resize_fpga_streamlined_node-1] /home/ubuntu/perception_modified/src/image_proc/src/rectify_fpga_streamlined.cpp:86 Error calling cl::Program program(*context_, devices, bins, NULL, &err), error code is: -6
  [ERROR] [rectify_resize_fpga_streamlined_node-1]: process has died [pid 84833, exit code -11, cmd '/home/ubuntu/perception_modified/install/image_pipeline_examples/lib/image_pipeline_examples/rectify_resize_fpga_streamlined_node --ros-args --params-file /tmp/launch_params_jmy31ybn -r image:=/camera/image_raw -r camera_info:=/camera/camera_info -r resize:=resize'].
  ```
  Reloading the firmware with xmutil fixes this issues as shown below
  ```bash
  ubuntu@kria:~/ sudo xmutil unloadapp
  ubuntu@kria:~/ sudo xmutil loadapp kr260-perception 
  ubuntu@kria:~/ ros2 launch perception_2nodes trace_rectify_resize_fpga_streamlined.launch.py
  ```



<!---

Licensed under the Apache License, Version 2.0 (the "License"); you may not use this file except in compliance with the License.

You may obtain a copy of the License at http://www.apache.org/licenses/LICENSE-2.0.


Unless required by applicable law or agreed to in writing, software distributed under the License is distributed on an "AS IS" BASIS, WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied. See the License for the specific language governing permissions and limitations under the License.

-->

<p class="sphinxhide" align="center">Copyright&copy; 2022 Xilinx</p>
