<table class="sphinxhide">
 <tr>
   <td align="center"><img src="../../media/xilinx-logo.png" width="30%"/><h1>Kria&trade; KR260 Robotics Starter Kit <br>ROS Perception Tutorial</h1>
   </td>
 </tr>
 <tr>
 <td align="center"><h1>Setting up the Board and Application Deployment</h1>

 </td>
 </tr>
</table>

# Board Setup and Application Deployment

### Introduction

This document shows, how to setup the board and environment to execute Perception stack application.

## Pre-requisite

### Hardware Requirement

* KR260 Robotics Starter Kit
* KR260 Power Supply & Adapter (Included with KR260 Robotics Starter Kit)
* Cat 5e Ethernet Cable (Included with KR260 Robotics Starter Kit)
* USB-A to micro-B Cable (Included with KR260 Robotics Starter Kit)
* 16GB MicroSD Cards (Included with KR260 Robotics Starter Kit)
* Ubuntu 22.04 workstation(x86 Host) with ethernet port for settingup simulation on Gazebo and Visualizing the simulated nodes on RQT

<br>


### Environment Setup On Host(x86) Machine(Ubuntu 22.04)

1. Install ROS2 using debian package, see install guide [here](https://docs.ros.org/en/humble/Installation/Ubuntu-Install-Debians.html).
2. Install few more dependencies from ros-humble using the below command
```bash
$ sudo apt install ros-humble-gazebo-ros ros-humble-gazebo-plugins ros-humble-gazebo-msgs
```
3. Install Gazebo Classic 11.0, see install guide [here](https://classic.gazebosim.org/tutorials?tut=install_ubuntu)
4. Get files to setup and run simulation
```bash
$ git clone https://gitenterprise.xilinx.com/SOM/kria_ros_perception
$ cd kria_ros_perception
$ rm -rf src/image_proc src/tracetools_image_pipeline src/vitis_common src/tracing src/image_pipeline_examples
```
3. Install Simulation from the below steps
```bash
$ source /opt/ros/humble/setup.bash  # source ROS2 Humble
$ colcon build
```
4. Run simulation on workstation
```bash
$ source install/setup.bash  # source the workspace as an overlay
$ ros2 launch perception_2nodes simulation.launch.py
```

It opens gazebo window showing the simulation world of a pinhole camera capturing a black stationary cube and a small grey cube revolving ontop of a checkered plane as shown below

![](../media//gazebo_sim.png)

### Setting up RQT on Host(x86) Machine to view the demo

1. Open new terminal and launch [RQT](https://docs.ros.org/en/humble/Concepts/About-RQt.html) using rqt command as shown below for visualizing the perception graph. It will open a window which appears as shown below 
```bash
$ source /opt/ros/humble/setup.bash  # source ROS2 Humble
$ rqt
```

![](../media//rqt_inital_launch.png)

2. Click on Plugins -> Introspection -> Node Graph and set the configuration as shown below. Refresh the node graph using ![](../media//refresh_rqt.png) to update to latest graph while running the demo 

![](../media//node_graph_settings.png)

3. Similarly enable Visualization plugin from  Plugins -> Visualization -> Image View. You can open multiple windows of Image View windows to see multiple images at once. To swich to different image click on the dropdown as shown ![](../media//dropdown_rqt.png)

![](../media//image_view_rqt.png)

> **_NOTE:_**  User is expected to launch as many RQT plugins as required for visualizing the perception show as shown in the below gif animations.

<br>

### Initial Setup, Setting Up The KR260 Board

1. Setting up the SD Card Image (Ubuntu)

   * Follow the instruction from the page below to obtain Ubuntu image and flash SD card
   https://www.xilinx.com/products/som/kria/kr260-robotics-starter-kit/kr260-getting-started/setting-up-the-sd-card-image.html

2. KR260 Board and Interface:

    ![](../media/board_interfaces.png)

    ![](../media/usb_slot.png)

   * Connecting Everything: Follow the instruction from the page below for initial Board setup

	https://www.xilinx.com/products/som/kria/kr260-robotics-starter-kit/kr260-getting-started/connecting-everything.html

3. Booting your Starter Kit (Ubuntu):

   * Follow the instruction from the page below to boot linux

	https://www.xilinx.com/products/som/kria/kr260-robotics-starter-kit/kr260-getting-started/booting-your-starter-kit.html

> **Note:** Steps under the section "Set up the Xilinx Development & Demonstration Environment for Ubuntu 22.04 LTS" may not be needed for ROS-Perception demo.

4. Set System Timezone and locale:

    * Set timezone

       ```bash
		$ sudo timedatectl set-ntp true
		$ sudo timedatectl set-timezone America/Los_Angeles
		$ timedatectl
       ```

	* Set locale

       ```bash
		$ sudo locale-gen en_US en_US.UTF-8
		$ sudo update-locale LC_ALL=en_US.UTF-8 LANG=en_US.UTF-8
		$ export LANG=en_US.UTF-8
		$ locale
       ```
5. Update Bootfirmware

	The SOM Starter Kits have factory pre-programmed boot firmware that is installed and maintained in the SOM QSPI device. Update the Boot firmware in the SOM QSPI device to '2022.1 Boot FW' Image.
	follow the link below to obtain Boot firmware binary and instructions to update QSPI image using xmutil, after linux boot.

	https://xilinx-wiki.atlassian.net/wiki/spaces/A/pages/1641152513/Kria+K26+SOM#Boot-Firmware-Updates

6. Get the latest ROS perception application & firmware package:

	* Download the [attached zip](https://confluence.xilinx.com/download/attachments/672024701/image_proc_streamlined.zip?version=1&modificationDate=1665573645434&api=v2) and copy to board. Extract the contents to /lib/firmware/xilinx/ folder using the below command

      ```bash
      $ sudo apt install xlnx-firmware-kr260-perception
      ```

  	* Install ROS 2  humble and LTTng

        Refer [ROS 2 Documentation](https://docs.ros.org/en/humble/Installation/Ubuntu-Install-Debians.html) for the installation steps. Here is the snippet of what is needed for this application:

        ```bash
		$ sudo curl -sSL https://raw.githubusercontent.com/ros/rosdistro/master/ros.key -o /usr/share/keyrings/ros-archive-keyring.gpg
		$ echo "deb [arch=arm64 signed-by=/usr/share/keyrings/ros-archive-keyring.gpg] http://packages.ros.org/ros2-testing/ubuntu jammy main" | sudo tee /etc/apt/sources.list.d/ros2.list > /dev/null
		$ sudo apt update
		$ sudo apt upgrade
		$ sudo apt install -y ros-humble-desktop
      $ sudo apt install lttng-modules-dkms lttng-tools ros-humble-tracetools-launch
        ```
    
    * Install ROS 2 application

       ```bash
      $ mkdir -p ~/Downloads
      $ cd ~/Downloads
      $ wget https://github.com/Xilinx/kria_ros_perception/releases/download/xlnx-rel-v2022.1_update4/kria-ros-perception_1.0-1_arm64.deb 
      $ sudo apt install ./kria-ros-perception_1.0-1_arm64.deb
       ```

   * Disable Gnome desktop GUI 
      ```bash
      $ sudo xmutil desktop_disable
       ```
<br>

### Run The Application on KR260
This application has two flavours, which are developed in way that user can understand how he can tweek the application to achieve a desired performance during development. Below are versions and its details:

1) **CPU Baseline**
This is a very simplistic version, where nodes are not accelerated and are executed on CPU. This version should allow users get familier with working environment and understand easiness in working with KRS based applications. Use below steps to execute:

```bash
$ source /opt/ros/humble/setup.bash # enable ROS 2 overlays
$ ros2 launch perception_2nodes trace_rectify_resize.launch.py # launch rectify and resize Nodes on ARM cores
```
Below is the gif showing the gazebo simulation window(left half) along with RQt window(right half) with node graph and /camera/image_raw, /image_rect and /resize/resize image views. You may need to reload the plugin windows to update the node graph and image views.

![](../media//perception_graph.gif)

2) **FPGA streamline accelerated**: In this application ROS *Components* `RectifyNodeFPGAStreamlined` and `ResizeNodeFPGAStreamlined` are redesigned to leverage hardware acceleration, however, besides offloading perception tasks to the FPGA, each <ins>leverages an AXI4-Stream interface to **create an intra-FPGA ROS 2 communication queue** which is then used to pass data across nodes through the FPGA</ins>. This allows to avoid completely the ROS 2 message-passing system and optimizes dataflow achieving a **24.42% total speedup**. Steps to launch streamlined accelerated version are:

```bash
# streamlined
$ sudo xmutil unloadapp
$ sudo xmutil loadapp kr260-perception  # load the accelerator
$ source /opt/ros/humble/setup.bash  # enable ROS 2 overlays
$ ros2 launch perception_2nodes trace_rectify_resize_fpga_streamlined.launch.py  # launch rectify and resize FPGA accelerated Nodes
```
Below is the gif showing the gazebo simulation window(top half) along with RQt window(bottom half) with node graph and /camera/image_raw, /image_rect and /resize image views. Since the data is transfer via streaming interface from rectify to resize, we dont see any image in rectify image view. You may need to reload the plugin windows to update the node graph and image views.

![](../media/perception_graph_streamlined.gif)

<br>

> **_NOTE:_** For benchmark results using Tracetools and other ROS2 acceleration examples please refer to [Kria Robotics Stack](https://xilinx.github.io/KRS/sphinx/build/html/index.html) (KRS)

## Next Steps

- [Kria Robotics Stack (KRS)](https://xilinx.github.io/KRS/sphinx/build/html/docs/intro.html)
- [Known Issues](issue-perception.md)

<!---

Licensed under the Apache License, Version 2.0 (the "License"); you may not use this file except in compliance with the License.

You may obtain a copy of the License at http://www.apache.org/licenses/LICENSE-2.0.


Unless required by applicable law or agreed to in writing, software distributed under the License is distributed on an "AS IS" BASIS, WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied. See the License for the specific language governing permissions and limitations under the License.

-->

<p class="sphinxhide" align="center">Copyright&copy; 2022 Xilinx</p>
