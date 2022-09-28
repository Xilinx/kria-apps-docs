<table class="sphinxhide">
 <tr>
   <td align="center"><img src="../../media/xilinx-logo.png" width="30%"/><h1> Kria&trade; KV260 Vision AI Starter Kit NLP SmartVision Tutorial</h1>
   </td>
 </tr>
 <tr>
 <td align="center"><h1>Setting up the Board and Application Deployment</h1>

 </td>
 </tr>
</table>

# Setting up the Board and Application Deployment

## Introduction

This document shows how to set up the board and run the nlp-smartvision application.

This guide and its prebuilt are targeted for Ubuntu 22.04 and Xilinx 2022.1 toolchain. The previous version of this application (on Xilinx 2021.1 toolchain) targeted to Petalinux is still available [online](https://xilinx.github.io/kria-apps-docs/2021.1/build/html/index.html).

## Booting up Linux

Before continuing with NLP application specific instructions, if not yet done so, boot Linux with instructions from [Kria Starter Kit Linux boot](../../kria_starterkit_linux_boot.md) page.

## Setting up the Board

## Application Specific Hardware Setup

Besides the hardware configurations required in [Kria Starter Kit Linux boot](../../kria_starterkit_linux_boot.md) for booting Linux, AIBox application requires a 4k  monitor to display up to 4 channels of 1080p video.

![GitHub Logo](../../media/som-board.png)

* Monitor:

  The monitor for this application must support 1024x768 resolution. Before booting, connect the monitor to the board via DP/HDMI port.

* Camera sensors:

  This application supports the below 3 camera modules
  * AR1335 sensor module in J7
  * Raspberry pi sensor module in J9
  * USB webcam in any of the available USB ports.

  Install the required sensor modules in respective locations.

* USB Microphone:

  Connect the microphone to any of the USB ports. If you USB webcam has a build-in microphone , it will also acts as the USB microphone

## Downloading and Loading Application Firmware

1. Download the firmware
    * Search package feed for packages compatible with KV260

       ```bash
      ubuntu@kria:~$ sudo apt search xlnx-firmware-kv260
      Sorting... Done
      Full Text Search... Done
      xlnx-firmware-kv260-aibox-reid/jammy 0.1-0xlnx1 arm64
        FPGA firmware for Xilinx boards - kv260 aibox-reid application

      xlnx-firmware-kv260-benchmark-b4096/jammy 0.1-0xlnx1 arm64
        FPGA firmware for Xilinx boards - kv260 benchmark-b4096 application

      xlnx-firmware-kv260-defect-detect/jammy 0.1-0xlnx1 arm64
        FPGA firmware for Xilinx boards - kv260 defect-detect application

      xlnx-firmware-kv260-nlp-smartvision/jammy,now 0.1-0xlnx1 arm64 [installed]
        FPGA firmware for Xilinx boards - kv260 nlp-smartvision application

      xlnx-firmware-kv260-smartcam/jammy 0.1-0xlnx1 arm64
        FPGA firmware for Xilinx boards - kv260 smartcam application
       ```

    * Install firmware binaries

      ```bash
      sudo apt install xlnx-firmware-kv260-nlp-smartvision
      ```

2. Dynamically load the application package:

    The firmware consists of bitstream, device tree overlay (dtbo) file. The firmware is loaded dynamically on user request once Linux is fully booted. The xmutil utility can be used for that purpose.

    * After installing the FW, execute xmutil listapps to verify that it is captured under the listapps function, and to have dfx-mgrd re-scan and register all accelerators in the FW directory tree.

       ```bash
      sudo xmutil listapps
      ```

    * Switch to a different platform for different Application:

       When there's already another accelerator/firmware being activated apart from xlnx-app-kv260-pmod-rs485-test, unload it first, then switch to xlnx-app-kv260-nlp-smartvision.

       ```bash
      sudo xmutil unloadapp
      sudo xmutil loadapp kv260-nlp-smartvision
      ```

## Docker based application preparation

1. Pull the 2022.1 docker image for nlp-smartvision using the below command.

    ```bash
    docker pull xilinx/nlp-smartvision:2022.1
    ```

    Once the above step is done, you can check for the available images as shown below

    ```bash
    ubuntu@kria:~$ docker images -a
    REPOSITORY                                                                  TAG        IMAGE ID       CREATED                  SIZE
    xilinx/nlp-smartvision                                                      2022.1     3c16ce65624a   Less than a second ago   1.41GB
    ```

    The storage volume on the SD card can be limited with multiple dockers. If there are space issues, use following command to remove the existing container.

      ```bash
      docker rmi --force <other containers>
      ```

2. This application features display output either on Ubuntu GUI or the entire monitor as mentioned in the below table

| S.No | Scenario   |      Display sink      |  Note | Required steps |
|:----:|:--------|:-------------:|:------|:-----|
| 1 | User runs docker on a terminal opened on Ubuntu GUI |  ximagesink | opens new window on Ubuntu GUI to display output | disable access control for local docker with ```xhost +local:docker``` |
| 2 | User runs docker on serial port or SSH session |    kmssink   |   Uses entire monitor to display the output | Disable Ubuntu GUI with ```sudo xmutil desktop_disable``` |

  > **_NOTE:_**	Once you are done with running the application, please enable the access control with ```xhost -local:docker```

3. Launch the docker using the below command. User should launch the NLP Docker container as user “ubuntu” and not as other user or “sudo”.

    ```bash
    docker run \
    --env="DISPLAY" \
    -h "xlnx-docker" \
    --env="XDG_SESSION_TYPE" \
    --net=host \
    --privileged \
    -v /tmp:/tmp \
    -v /dev:/dev \
    -v /sys:/sys \
    -v /etc/vart.conf:/etc/vart.conf \
    -v /lib/firmware/xilinx:/lib/firmware/xilinx \
    -v /run:/run \
    -it xilinx/nlp-smartvision:2022.1 bash
    ```

    It will launch the nlp-smartvision image in a new container

    ```bash
    root@xlnx-docker/#
    ```

## Run the Application

There are two ways to interact with application, via Jupyter notebook or Command line

### Jupyter notebook

* Launch the Jupyter notebook with `root` privilege using the following command:

``` bash
   jupyter lab --allow-root --notebook-dir=/opt/xilinx/kv260-nlp-smartvision/share/notebooks/ --ip=<ip address> &

    // fill in ip-address from ifconfig, eth0
```

Output example:

``` bash
[I 2021-08-02 15:54:31.141 LabApp] JupyterLab extension loaded from /usr/lib/python3.8/site-packages/jupyterlab
[I 2021-08-02 15:54:31.141 LabApp] JupyterLab application directory is /usr/share/jupyter/lab
[I 2021-08-02 15:54:31.164 ServerApp] jupyterlab | extension was successfully loaded.
[I 2021-08-02 15:54:31.166 ServerApp] Serving notebooks from local directory: /opt/xilinx/kv260-nlp-smartvision/share/notebooks/
[I 2021-08-02 15:54:31.166 ServerApp] Jupyter Server 1.2.1 is running at:
[I 2021-08-02 15:54:31.166 ServerApp] http://192.168.3.123:8888/lab?token=9f7a9cd1477e8f8226d62bc026c85df23868a1d9860eb5d5
[I 2021-08-02 15:54:31.166 ServerApp]  or http://127.0.0.1:8888/lab?token=9f7a9cd1477e8f8226d62bc026c85df23868a1d9860eb5d5
[I 2021-08-02 15:54:31.167 ServerApp] Use Control-C to stop this server and shut down all kernels (twice to skip confirmation).
[C 2021-08-02 15:54:31.186 ServerApp]

    To access the server, open this file in a browser:
        file:///root/.local/share/jupyter/runtime/jpserver-1119-open.html
    Or copy and paste one of these URLs:
        http://192.168.3.123:8888/lab?token=9f7a9cd1477e8f8226d62bc026c85df23868a1d9860eb5d5
     or http://127.0.0.1:8888/lab?token=9f7a9cd1477e8f8226d62bc026c85df23868a1d9860eb5d5
```

* User can access the server by opening the server URL from previous steps with the Chrome browser.

  In the notebook, we will explain the usage of app and the commands needed to run live usecase

### Command line

This allow the user to run "nlp-smartvision" application on CLI. These are to be executed using the UART/debug interface.

Run the following command to launch the application for live audio input via USB microphone.
The user needs to be silent for the first few seconds (2.5s apx.) for the application to dynamically decide the noise threshold value as per user's input device and environment. Once you see the following message "*Noise Threshold is set. You can start speaking the keywords now..*" you are ready to start pronouncing any of the ten keywords (Yes, No, Off, On, Up, Down, Left, Right, Stop, Go).

#### Application Usage

```bash
Usage: nlp-smartvision [OPTION] [arg1] [arg2]

-h (or) --help                                    help
-m (or) --mipi <isp/rpi>                          test the application with live video from mipi cameras rpi(default)/isp
-u (or) --usb                                     test the application with live video from USB camera
-f (or) --file-audio  <testing_list>.txt          test the keyword spotting with audio files listed in the .txt file
-t (or) --test <sample_image> <model>             test the DPU with sample images. Input is Model and sample jpeg. Supported models are densebox_640_360, yolov2_voc_pruned_0_77 & plate_detect
-v (or) --verbose  
```

#### Run the app with default mipi sensor(RPI)

```bash
nlp-smartvision -m
```

<p align="center"> (or) </p>

```bash
nlp-smartvision --mipi
```

The detected keyword will be displayed on the terminal and the corresponding action on the input video stream will be displayed on the monitor, which is connected to the board through DP/HDMI cable.

To print FPS along with the above application use -v or --verbose flag shown in the below command. The FPS is measured as average over 90 consecutive frames. Also the latency of keywords spotting + action is printed while the keyword is detected.

```bash
nlp-smartvision -m -v
```

> You should be able to see the video the camera is capturing on the monitor connected to the board
>
> * The application starts with facedetect. When there is a face captured by the camera, there should be a blue bounding box drawn around the face, and the box should follow the movement of the face.
> * Speak the desired keyword into the microphone, application will perform the following assigned tasks as mentioned below.

![Keyword action mapping](../../media/nlp_smartvision/keyword_mapping.png)

> Note: Google Command dataset has audio clips of 1 second duration. Thus, the expectation by KWS task is that one keyword is spoken within a duration of 1 second.
> Note: Stop command resets display setting, but does not change monitor on/off mode.

## File based Testing and Accuracy Measurement of KWS Only

NLP SmartVision provides a mode which is dedicated for testing the accuracy of keyword spotting (no vision task is running during this mode) on pre-recorded audio files. User needs to provide audio files along with a text file that consists of paths to the audio files which are to be tested. The application expects the audio files to be grouped under folders with keyword as the folder name. Thus, the text file will consist of lines with keyword/*.wav paths corresponding to each audio file (example: yes/audio1.wav). For more details please refer [Testing Accuracy on Google Command Dataset](#testing-accuracy-on-google-command-dataset) and [Testing Custom Input Audio Files](#testing-custom-input-audio-files).

The following command tests the audio files listed in the testing_list.txt file.

```bash
## Change your dircetory to the dircetory where you have the testing_list.txt file having proper paths to the audio files.
nlp-smartvision -f testing_list.txt
```

<p align="center"> (or) </p>

```bash
nlp-smartvision --file-audio testing_list.txt
```

### Testing Accuracy on Google Command Dataset

Users can download the open source Google’s speech command dataset for testing the application in file input mode. This dataset consists of pre-recorded audio files for 30 keywords and the audio files that are separated for testing are listed in the testing_list.txt file. Use the following commands to download and extract this dataset. These commands also create the datafiles that are required for testing the application with 10 keywords for which the model has been trained.

**Tip :** You can copy the below commands and create a single script. Then directly execute that script to do all the required steps one after the other.

```bash
mkdir Google_dataset
cd Google_dataset
wget http://download.tensorflow.org/data/speech_commands_v0.01.tar.gz
tar -xf speech_commands_v0.01.tar.gz
mkdir keywords
mv -t ./keywords/ on off up down left right yes no stop go
sed -n -e '/down\//p; /go\//p; /left\//p; /no\//p; /off\//p; /on\//p; /right\//p; /stop\//p; /yes\//p; /up\//p ' testing_list.txt > ./keywords/testing_list.txt
find . -maxdepth 1 ! -name keywords -print0|xargs -0 rm -r --
```

These commands will create a directory with the name ``Google_dataset/keywords`` inside the current working directory.
**Note :** The commands may take few minutes (depending on the internet speed) to download and process the dataset.

Output after running the command for file based testing will also report the accuracy. Sample output on Google Command Dataset is shown below:

```bash
Ground truth : yes            Predicted : yes
Ground truth : yes            Predicted : yes
Ground truth : yes            Predicted : yes
=========================================
Number of keywords tested = 2552
Number of keywords detected correctly = 2383
Accuracy = 93.3777%
```

### Testing Custom Input Audio Files

The application expects audio file names to be stored as ``keyword/audio_filename.wav`` format into the audio files list file. For example, a pre-recorded audio file of keyword ‘yes’ needs to be listed as ``yes/file_001.wav``. The application uses main directory name (‘yes’ in this example) as ground truth to compare against the detected keyword. New line character must be placed after every audio file name to differentiate multiple audio files (even after the last file name).  Moreover, audio file needs to be copied to the SD card into the directory from which the application will be invoked. For example, ``/keywords/yes/file_001.wav``.

The test audio files should have the following specifications:

* Sampling rate: 16 kHz
* Sample width: 16 bits per sample
* Sample encoding: Little endian
* Number of channels: 1 (mono)
* Supported format: S16_LE (PCM signed 16-bit little-endian)
* Audio Length: 1 second

## Image based Testing of DPU Only

NLP SmartVision provides a mode which is dedicated for testing the Vision models on DPU (no KWS task is running during this mode) on image files. User needs to provide image files along with the AI model that's under test

The following command tests the image files.

```bash
nlp-smartvision -t <image.jpg/image.png> <model>
```

The command returns the metadata along with a jpg file containing bounding box on the input image

## Files structure of the application

The application is installed as:

* Binary File: => /opt/xilinx/kv260-nlp-smartvision/bin

  | filename | description |
  |----------|-------------|
  | nlp-smartvision | Main application |

* Script File: => /opt/xilinx/kv260-nlp-smartvision/bin/

  | filename | description |
  |----------|-------------|
  | init-isp-smartvision.sh | Configures ISP media nodes to run 1024.768@RGB  |
  | init-imx-smartvision.sh | Configures RPI media nodes to run 1024.768@RGB  |
  | nlp-smartvision.app | Application executable  |

* Jupyter notebook file: => /opt/xilinx/kv260-nlp-smartvision/share/notebooks/nlp-smartvision

  | filename | description |
  |----------|-------------|
  | nlp-smartvision.ipynb | Jupyter notebook file for nlp-smartvision demo.|

## Next Steps

* Go back to the [KV260 SOM NLP Smartvision design start page](../nlp_smartvision_landing)
* [Building the Design Tutorial](../../building_the_design.md)

### License

Licensed under the Apache License, Version 2.0 (the "License"); you may not use this file except in compliance with the License.

You may obtain a copy of the License at
[http://www.apache.org/licenses/LICENSE-2.0](http://www.apache.org/licenses/LICENSE-2.0)

Unless required by applicable law or agreed to in writing, software distributed under the License is distributed on an "AS IS" BASIS, WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied. See the License for the specific language governing permissions and limitations under the License.

<p align="center">Copyright&copy; 2021 Xilinx</p>
