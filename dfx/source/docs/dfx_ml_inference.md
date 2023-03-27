# Try ML Accelerator Example on K26

## Introduction

This document covers how to run the DFX pre-built application dfx-ml-inference for the Kria K26 SOM. To run the application on target, install the firmware, application on target, load the required RM partial to the target, and then run the corresponding RM application.

## Prerequisites

The Kria SOM DFX example designs presented here assume that the user has already followed the application-agnostic steps of setting up their board and completing the initial boot of the Ubuntu 22.04 OS. Steps for getting a Kria SOM Starter Kit booted with Ubuntu 22.04 and the Xilinx-specific support packages installed are outlined [here](https://xilinx.github.io/kria-apps-docs/kv260/2022.1/build/html/docs/kria_starterkit_linux_boot.html).

Hardware Setup:

- Monitor:
  Before booting, connect a 1080P/4K monitor to the board via either DP or HDMI port.

- UART/JTAG interface:
  For interacting and seeing boot-time information, connect a USB debugger to the J4.

- Webcam:
  The webcam is an optional video input device supported in the application. Recommended webcam is the Logitech BRIO.
  
- Network connection:
  Connect the Ethernet cable to your local network with DHCP enabled to install packages and run Jupyter Notebook.

To get started, install the pre-built firmware provided as part of the DFX example design.

- The accelerators AES128, AES192, FFT, FIR, DPU, and PP_PIPELINE are provided as part of the pre-built firmware.

1. On target, run xmutil listapps to look at the installed firmware. Default k26-starter-kits firmware will be shown.

  ```text
  ubuntu@kria:~$ sudo xmutil listapps
                  k26-starter-kits            XRT_FLAT                k26-starter-kits            XRT_FLAT               (0+0)                  0,
  ```

2.Install the DFX firmware and applications package. This installs the firmware on the target at the location /lib/firmware/xilinx.

  ```shell
  ubuntu@kria:~$ sudo apt update
  ubuntu@kria:~$ sudo apt install xlnx-firmware-k26-dfx-2rp
  ubuntu@kria:~$ sudo apt install kria-dfx-apps
  ```

3.Verify that pre-built firmware is installed on target by running the xmutil listapps command. It will show the newly installed firmware with Base_type PL_DFX.

  ```text
  ubuntu@kria:~$ sudo xmutil listapps
                     Accelerator          Accel_type                            Base           Base_type      #slots(PL+AIE)         Active_slot
                     PP_PIPELINE         SIHA_PL_DFX                         k26_2rp              PL_DFX               (2+0)                  -1
                             DPU         SIHA_PL_DFX                         k26_2rp              PL_DFX               (2+0)                  -1                           
                          AES128         SIHA_PL_DFX                         k26_2rp              PL_DFX               (2+0)                  -1
                             FIR         SIHA_PL_DFX                         k26_2rp              PL_DFX               (2+0)                  -1
                          AES192         SIHA_PL_DFX                         k26_2rp              PL_DFX               (2+0)                  -1
                             FFT         SIHA_PL_DFX                         k26_2rp              PL_DFX               (2+0)                  -1
                k26-starter-kits            XRT_FLAT                k26-starter-kits            XRT_FLAT               (0+0)                  0,
  ```

## Load pre-built accelerators on the target

4.On boot, the k26-starter-kits accelerator is loaded. Unload the default app using "sudo xmutil unloadapp" to later load the desired DFX accelerator.

  ```text
  ubuntu@kria:~$ sudo xmutil unloadapp
  remove from slot 0 returns: 0 (Ok)
  ubuntu@kria:~$ sudo xmutil listapps
                     Accelerator          Accel_type                            Base           Base_type      #slots(PL+AIE)         Active_slot
                     PP_PIPELINE         SIHA_PL_DFX                         k26_2rp              PL_DFX               (2+0)                  -1
                             DPU         SIHA_PL_DFX                         k26_2rp              PL_DFX               (2+0)                  -1 
                          AES128         SIHA_PL_DFX                         k26_2rp              PL_DFX               (2+0)                  -1
                             FIR         SIHA_PL_DFX                         k26_2rp              PL_DFX               (2+0)                  -1
                          AES192         SIHA_PL_DFX                         k26_2rp              PL_DFX               (2+0)                  -1
                             FFT         SIHA_PL_DFX                         k26_2rp              PL_DFX               (2+0)                  -1
                k26-starter-kits            XRT_FLAT                k26-starter-kits            XRT_FLAT               (0+0)                  -1
  ```

5.The required accelerator can be loaded using the command "sudo xmutil loadapp". By default, running loadapp the first time will load the accelerator to slot 0, and running loadapp the second time will load it to slot 1.

  ```text
  ubuntu@kria:~$ sudo xmutil loadapp DPU
  ubuntu@kria:~$ sudo xmutil loadapp PP_PIPELINE
  ```

6.Verify that the accelerator is loaded using "sudo xmutil listapps" and observe which "Active_slot" it is loaded to.

  ```text
  ubuntu@kria:~$ sudo xmutil listapps
                     Accelerator          Accel_type                            Base           Base_type      #slots(PL+AIE)         Active_slot
                     PP_PIPELINE         SIHA_PL_DFX                         k26_2rp              PL_DFX               (2+0)                   1
                             DPU         SIHA_PL_DFX                         k26_2rp              PL_DFX               (2+0)                   0 
                          AES128         SIHA_PL_DFX                         k26_2rp              PL_DFX               (2+0)                  -1
                             FIR         SIHA_PL_DFX                         k26_2rp              PL_DFX               (2+0)                  -1
                          AES192         SIHA_PL_DFX                         k26_2rp              PL_DFX               (2+0)                  -1
                             FFT         SIHA_PL_DFX                         k26_2rp              PL_DFX               (2+0)                  -1
                k26-starter-kits            XRT_FLAT                k26-starter-kits            XRT_FLAT               (0+0)                  -1
  ```

**Note**: After the DFX shell is loaded, the accelerator in each slot can be unloaded by running the unloadapp command along with the slot number.

Example:

- Unload accelerator from slot 0 using "sudo xmutil unloadapp 0"
- Unload accelerator from slot 1 using "sudo xmutil unloadapp 1"

### Copy jupyter notebook

7.Run the following commands on target to copy the Jupyter notebook.

  ```text
  ubuntu@kria:~$ sudo git clone https://github.com/Xilinx/kria-dfx-apps -b xlnx_rel_v2022.1
  ubuntu@kria:~$ sudo cp -r kria-dfx-apps/notebook /lib/firmware/xilinx/
  ```

8.Getting demo video files suitable for the application:

To be able to demonstrate the function of the application in case you have no USB camera in hand, we support the video file source too.
You can download video files from the following links, which are in MP4 format.

Download 1920x1080 or more resolution for the KV260 board and 1024x768 or more resolution file for the KR260 board.
This information can be seen by using the command - modetest -D fd4a0000.display.

  ```text
    * [For Facedet / RefineDet AI Task](https://pixabay.com/videos/alley-people-walk-street-ukraine-39837/)

    * [For ADAS(Advanced Driver Assistance Systems) SSD(Single Shot detection) AI Task](https://pixabay.com/videos/freeway-traffic-cars-rainy-truck-8358/)
  ```

9.Copy these mp4 files to the board (by using scp, ftp, or copy onto the SD card and finding them in /boot/firmware/). Then, you need to transcode it to H264 file which is one supported input format.

  ```text
  ubuntu@kria:~$ sudo apt install ffmpeg
  Press ENTER for the prompt
  ```

For KV260 - the DP port supports up to 1920x1080 resolution. Convert the mp4 file to 1920x1080 scale.

  ```text
  ubuntu@kria:~$ ffmpeg -i alley-39837.mp4 -c:v libx264 -pix_fmt nv12 -vf scale=1920:1080 -r 30 walking-people.nv12.h264
  ubuntu@kria:~$ ffmpeg -i freeway-8358.mp4 -c:v libx264 -pix_fmt nv12 -vf scale=1920:1080 -r 30 Road-Adas.nv12.h264
  ```

For KR260 - the DP port supports up to 1024x768 resolution. Convert the mp4 file to 1024x768 scale.

  ```text
  ubuntu@kria:~$ ffmpeg -i alley-39837.mp4 -c:v libx264 -pix_fmt nv12 -vf scale=1024:768 -r 30 walking-people.nv12.h264
  ubuntu@kria:~$ ffmpeg -i freeway-8358.mp4 -c:v libx264 -pix_fmt nv12 -vf scale=1024:768 -r 30 Road-Adas.nv12.h264
  ```

Finally, place these in the directory /lib/firmware/xilinx/notebook, which will be mapped to /lib/firmware/xilinx/notebook in the docker container too.

  ```text
  ubuntu@kria:~$ sudo cp -r ./walking-people.nv12.h264 /lib/firmware/xilinx/notebook/
  ubuntu@kria:~$ sudo cp -r ./Road-Adas.nv12.h264 /lib/firmware/xilinx/notebook/
  ```

## Launch docker image 

10.Pull the latest docker image for dfx-ml-inference using the below command.

  ```text
  ubuntu@kria:~$ sudo docker pull xilinx/dfx-ml-inference:2022.1
  ```

11.Launch the docker using the below command.

  ```text
  ubuntu@kria:~$ sudo docker run --env="DISPLAY" -h "xlnx-docker" --env="XDG_SESSION_TYPE" --net=host --privileged --volume="$HOME/.Xauthority:/root/.Xauthority:rw" -v /tmp:/tmp -v /dev:/dev -v /sys:/sys -v /etc/vart.conf:/etc/vart.conf -v /lib/firmware/xilinx:/lib/firmware/xilinx -v /run:/run -it xilinx/dfx-ml-inference:2022.1 /bin/bash
  ```

It will launch the dfx-ml-inference image in a new container.

Install the ipywidgets library.

  ```text
  root@xlnx-docker:/# pip install ipywidgets
  ```

## Jupyter Notebook with pre-built accelerators

This section provides information on how to install Jupyter Lab on target and connect to it.
Example notebooks are provided to demonstrate working with pre-built accelerators and their corresponding applications.

### Connect to Jupyter Lab

12.Run the following command on the target to obtain its IP address.

  ```text
  root@xlnx-docker:/# ifconfig
  docker0: flags=4099<UP,BROADCAST,MULTICAST>  mtu 1500
        inet 172.17.0.1  netmask 255.255.0.0  broadcast 172.17.255.255
        ether 02:42:57:d1:80:4b  txqueuelen 0  (Ethernet)
        RX packets 0  bytes 0 (0.0 B)
        RX errors 0  dropped 0  overruns 0  frame 0
        TX packets 0  bytes 0 (0.0 B)
        TX errors 0  dropped 0 overruns 0  carrier 0  collisions 0 
  eth0: flags=4163<UP,BROADCAST,RUNNING,MULTICAST>  mtu 1500
        inet 10.140.36.156  netmask 255.255.252.0  broadcast 10.140.39.255                       <---------   ip address = 10.140.36.156
        inet6 fe80::fc7b:1dd4:d124:e0fc  prefixlen 64  scopeid 0x20<link>
        ether 00:0a:35:0f:26:dc  txqueuelen 1000  (Ethernet)
        RX packets 4569  bytes 722519 (722.5 KB)
        RX errors 0  dropped 3  overruns 0  frame 0
        TX packets 3645  bytes 1369608 (1.3 MB)
        TX errors 0  dropped 0 overruns 0  carrier 0  collisions 0
        device interrupt 37   
  lo: flags=73<UP,LOOPBACK,RUNNING>  mtu 65536
        inet 127.0.0.1  netmask 255.0.0.0
        inet6 ::1  prefixlen 128  scopeid 0x10<host>
        loop  txqueuelen 1000  (Local Loopback)
        RX packets 4526  bytes 1691246 (1.6 MB)
        RX errors 0  dropped 0  overruns 0  frame 0
        TX packets 4526  bytes 1691246 (1.6 MB)
        TX errors 0  dropped 0 overruns 0  carrier 0  collisions 0
  ```

13.Launch Jupyter Lab using the IP address obtained in the above step.

  ```text
  root@xlnx-docker:/# python3 /usr/local/bin/jupyter-lab --notebook-dir=/lib/firmware/xilinx/notebook --allow-root --ip=ip-address & 
  ```

14.After running the above command, the URL to connect to the Jupyter Lab server is displayed. In a browser, use the link having the target's IP address to connect to Jupyter Lab.
An example is:

  ```text
  http://10.140.38.140:8888/lab?<token=####>
  ```

### Notebook to demonstrate dfx_ml_inference using DPU and PP_PIPELINE

This notebook demonstrates the working of DPU and PP_PIPELINE accelerators.

#### Steps to run the notebook

- Open dfx-ml-inference.ipynb. This notebook supports video file input.
- Open dfx-ml-inference_usb.ipynb. This notebook supports usb webcam input.

#### Files structure of the application

The application file uses the following files.

- Configuration File Directory: /opt/xilinx/dfx-ml-inference/config/${AITASK}

AITASK = "facedetect" | "refinedet" | "ssd"

- Model files: => /opt/xilinx/dfx-ml-inference/vitis-ai-library/models
  
The model files integrated into the application use the B512 DPU configuration.

- Jupyter notebook file: => /opt/xilinx/dfx-ml-inference/notebook/

#### License

Licensed under the Apache License, Version 2.0 (the "License"); you may not use this file except in compliance with the License.

You may obtain a copy of the License at
[http://www.apache.org/licenses/LICENSE-2.0](http://www.apache.org/licenses/LICENSE-2.0)

Unless required by applicable law or agreed to in writing, software distributed under the License is distributed on an "AS IS" BASIS, WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied. See the License for the specific language governing permissions and limitations under the License.

<p class="sphinxhide" align="center">Copyright&copy; 2022-2023 Xilinx</p>
