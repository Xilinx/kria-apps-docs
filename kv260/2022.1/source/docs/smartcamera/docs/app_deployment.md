<table class="sphinxhide">
 <tr>
   <td align="center"><img src="../../media/xilinx-logo.png" width="30%"/><h1> Kria&trade; KV260 Vision AI Starter Kit Smart Camera Tutorial</h1>
   </td>
 </tr>
 <tr>
 <td align="center"><h1>Setting up the Board and Application Deployment</h1>

 </td>
 </tr>
</table>

# Setting up the Board and Application Deployment

## Introduction

This document shows how to set up the board and run the smartcam application.

This guide and its prebuilt are targeted for Ubuntu 22.04 and Xilinx 2022.1 toolchain. The previous version of this application (on Xilinx 2021.1 toolchain) targeted to Petalinux is still available [online](https://xilinx.github.io/kria-apps-docs/2021.1/build/html/index.html).

## Booting up Linux

Before continuing with smartcam application specific instructions, if not yet done so, boot Linux with instructions from [Kria Starterkit Linux boot](../../kria_starterkit_linux_boot.md) page. Note that smartcam application recommend starting the application using commandline through uart instead of GNOME Desktop.

## Application Specific Hardware Setup

Besides the hardware configurations required in [Kria Starterkit Linux boot](../../kria_starterkit_linux_boot.md) for booting Linux, smartcam application requires the following hardware setup:

![GitHub Logo](../../media/som-board.png)

   * Monitor:

    Before booting, connect a 1080P/4K monitor to the board via either DP or HDMI port.

    4K monitor is preferred to demonstrate at the maximum supported resolution.

   * IAS sensor:

    Before power on, install an AR1335 sensor module in J7.

   * You may also use a USB webcam as an input device.

    The webcam is optional video input device supported in the application.

    Recommended webcam is the [Logitech BRIO](https://www.logitech.com/en-in/products/webcams/brio-4k-hdr-webcam.960-001105.html).


   * Audio Pmod setup as RTSP audio input:

    Audio Pmod is optional audio input and output device. In the current release (22.1 update3), audio is not supported, please see [known issues](./issue-sc.md) for details.

    In the Smart camera application only RTSP mode [uses the audio input function](#rtsp-audio) to capture audio. Audio is then sent together with the images as RTSP stream and can be received at the client side.

    To set it up, first install the Pmod to J2, then connect a microphone or any other sound input device to the [line input port](https://store.digilentinc.com/pmod-i2s2-stereo-audio-input-and-output/). A headphone with a microphone will not work - device needs to be a dedicated input.

    Smartcam application does not yet support speakers.

### Software Preparation

    You will use a PC having network access to the board as the RTSP client machine.

    Make sure that the PC and the KV260 Vision AI Starter Kit are on the same subnet mask.

    On the client machine, to receive and play the RTSP stream, we recommend to install FFplay which is part of FFmpeg package.

    For Linux, you can install FFmpeg with the package manager of your distribution.

    For Windows, you can find install instructions on https://ffmpeg.org/download.html

    Other than FFplay, VLC can also be used to play RTSP stream, but sometimes it doesn't work on some client machines, while the FFplay works well.

## Downloading and Loading Application Firmware

1.. Get the latest kv260-smartcam firmware package:

   * Add archive for the Xilinx Apps demo, this will take some time.

    ```bash
    sudo add-apt-repository ppa:xilinx-apps
    sudo add-apt-repository ppa:ubuntu-xilinx/sdk
    sudo apt update
    sudo apt upgrade
    ```

   * Search package feed for packages compatible with Kv260

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

    xlnx-firmware-kv260-nlp-smartvision/jammy,now 0.1-0xlnx1 arm64 
    FPGA firmware for Xilinx boards - kv260 nlp-smartvision application

    xlnx-firmware-kv260-smartcam/jammy 0.1-0xlnx1 arm64 [installed]
    FPGA firmware for Xilinx boards - kv260 smartcam application
    ```

   * Install firmware binaries

    ```bash
    sudo apt install xlnx-firmware-kv260-smartcam
    ```

2. Dynamically load the application package:

    The firmware consist of bitstream, device tree overlay (dtbo) file. The firmware is loaded dynamically on user request once Linux is fully booted. The xmutil utility can be used for that purpose.

    * Disable the desktop environment:

       ```bash
       sudo xmutil      desktop_disable
       ```

       **Note:** Executing "xmutil desktop_disable" will cause the monitor to go blank. Please use any serial terminal to continue issuing Linux commands via port J4 and not rely completely on the desktop environment.

       After running the application, the desktop environment can be enabled again with:

      ```bash
      sudo xmutil      desktop_enable
      ```

    * Show the list and status of available acceleration platforms:

      ```bash
      sudo xmutil listapps
      ```

    * Switch to a different platform for different Application:

       When there's already another accelerator/firmware being activated, unload it first, then switch to kv260-smartcam.

      ```bash
      sudo xmutil unloadapp
      sudo xmutil loadapp kv260-smartcam
      ```

## Docker based application preparation

* Pull the latest docker image for smartcam using the below command.

    ```bash
    docker pull xilinx/smartcam:latest
    ```

  * The storage volume on the SD card can be limited with multiple dockers. If there are space issues, you can use following command to remove the existing container.

      ```bash
      docker rmi --force <other containers>
      ```

  * You can find the images installed with command:

      ```bash
      docker images
      ```

* Launch the docker using the below command

    ```bash
    docker run \
    --env="DISPLAY" \
    -h "xlnx-docker" \
    --env="XDG_SESSION_TYPE" \
    --net=host \
    --privileged \
    --volume="$HOME/.Xauthority:/root/.Xauthority:rw" \
    -v /tmp:/tmp \
    -v /dev:/dev \
    -v /sys:/sys \
    -v /etc/vart.conf:/etc/vart.conf \
    -v /lib/firmware/xilinx:/lib/firmware/xilinx \
    -v /run:/run \
    -it xilinx/smartcam:latest bash
    ```

    It will launch the smartcam image in a new container

    ```bash
    root@xlnx-docker/#
    ```

* Getting demo video files suitable for the application:

   To be able to demonstrate the function of the application in case you have no MIPI and USB camera in hand, we support the file video source too.

   You can download video files from the following links, which is of MP4 format.

  * [Facedet / RefineDet AI Task](https://pixabay.com/videos/alley-people-walk-street-ukraine-39837/)

  * [ADAS SSD AI Task](https://pixabay.com/videos/freeway-traffic-cars-rainy-truck-8358/)

   Then, you need to transcode it to H264 file which is one supported input format.
  
    ```bash
    ffmpeg -i input-video.mp4 -c:v libx264 -pix_fmt nv12 -vf scale=1920:1080 -r 30 output.nv12.h264
    ```

   Finally, please upload or copy these transcoded H264 files to the board (by using scp, ftp, or copy onto SD card and finding them in /boot/firmware/), place it to somewhere under /tmp, which will mapped to /tmp in the docker container too.

## Run the Application

There are two ways to interact with the application.

### Jupyter notebook

* User need to run following command to install the package shipped notebooks which reside in `/opt/xilinx/kv260-smartcam/share/notebooks` to the folder `/root/notebooks/smartcam`.

  ``` $ smartcam-install.py ```

  This script also provides more options to install the notebook of current application to specified location.

```text
    usage: smartcam-install [-h] [-d DIR] [-f]

    Script to copy smartcam Jupyter notebook to user directory

    optional arguments:
      -h, --help         show this help message and exit
      -d DIR, --dir DIR  Install the Jupyter notebook to the specified directory.
      -f, --force        Force to install the Jupyter notebook even if the destination directory exists.
```

* To launch Jupyter notebook on the target, run below command.

    ``` bash
    jupyter-lab --notebook-dir=/root/notebooks/smartcam --allow-root --ip=ip-address & 
    // fill in ip-address from ifconfig 
    ```

Output example:

``` bash
[I 2022-09-05 10:26:26.644 LabApp] JupyterLab extension loaded from /usr/local/lib/python3.10/dist-packages/jupyterlab
[I 2022-09-05 10:26:26.644 LabApp] JupyterLab application directory is /usr/local/share/jupyter/lab
[I 2022-09-05 10:26:26.664 ServerApp] jupyterlab | extension was successfully loaded.
[I 2022-09-05 10:26:26.683 ServerApp] nbclassic | extension was successfully loaded.
[I 2022-09-05 10:26:26.685 ServerApp] Serving notebooks from local directory: /root/notebooks/smartcam
[I 2022-09-05 10:26:26.685 ServerApp] Jupyter Server 1.18.1 is running at:
[I 2022-09-05 10:26:26.685 ServerApp] http://192.168.1.233:8888/lab?token=385858bbf1e5541dbba08d811bcac67d805b051ef37c6211
[I 2022-09-05 10:26:26.686 ServerApp]  or http://127.0.0.1:8888/lab?token=385858bbf1e5541dbba08d811bcac67d805b051ef37c6211
[I 2022-09-05 10:26:26.686 ServerApp] Use Control-C to stop this server and shut down all kernels (twice to skip confirmation).
[W 2022-09-05 10:26:26.702 ServerApp] No web browser found: could not locate runnable browser.
[C 2022-09-05 10:26:26.703 ServerApp]

    To access the server, open this file in a browser:
        file:///root/.local/share/jupyter/runtime/jpserver-40-open.html
    Or copy and paste one of these URLs:
        http://192.168.1.233:8888/lab?token=385858bbf1e5541dbba08d811bcac67d805b051ef37c6211
     or http://127.0.0.1:8888/lab?token=385858bbf1e5541dbba08d811bcac67d805b051ef37c6211
```

* User can access the server by opening the server URL from previous steps with the Chrome browser.

  In the notebook, we will construct the GStreamer pipeline string, you can get it by adding simple python code to print it out, and played with gst-launch-1.0 command in the console, and there are some user options variables that can be changed and run with. For other parts of the pipeline, you can also change and play to see the effect easily.

### Command line

These allow the user to define different video input and output device targets using the "smartcam" application. These are to be executed using the UART/debug interface.

#### Example scripts

Example scripts and options definitions are provided below.

Refer to [File Structure](#script-loc) to find the files location.

<details>
<summary><b>Click here to view the example script usage</b></summary>

* MIPI RTSP server:

    1. Invoking `"bash 01.mipi-rtsp.sh"` will start rtsp server for mipi captured images.

    2. Script accepts ${width} ${height} as the 1st and 2nd parameter, the default is 1920 x 1080.

    3. Running the script will give message in the form:

>    stream ready at:
>
>    rtsp://boardip:port/test

      Run "ffplay rtsp://boardip:port/test" on the client PC to receive the rtsp stream.

    4. Checking:

      You should be able to see the images the camera is capturing on the ffplay window, and when there's face captured by camera, there should be blue box drawn around the face, and the box should follow the movement of the face.

* MIPI DP display:

    1. Make sure the monitor is connected as [here](#Setting-up-the-Board).

    2. Invoking `"bash 02.mipi-dp.sh"` will play the captured video with detection results on monitor.

    3. Script accepts ${width} ${height} as the 1st and 2nd parameter, the default is 1920 x 1080.

    4. Checking:

        You should be able to see the images the camera is capturing on the monitor connected to the board, and when there's face captured by the camera, there should be blue box drawn around the face, and the box should follow the movement of the face.

* File to File

    1. Invoking `"bash 03.file-file.sh"`

        Take the first argument passed to this script as the path to the H264 video file (you can use the demo video for face detection, or similar videos), perform face detection and generate video with detection bbox, save as `./out.h264`

    2. Checking:

        Play the input video file and generated video file "./out.h264" with any media player you prefer, e.g. VLC, FFPlay. You should be able to see in the output video file, there are blue boxes around the faces of people, and the boxes should follow the movement of the faces, while there're no such boxes with the input video file.

* File to DP

    1. Invoking `"bash 04.file-ssd-dp.sh"`

        Take the first argument passed to this script as the path to the H264 video file (you can use the demo video for ADAS SSD, or similar videos), perform vehicles detection and generate video with detection bbox, and display onto monitor

    2. Checking:

        You should be able to see a video of highway driving, with the detection of vehicles in a bounding box.

</details>

#### Additional configuration options for `smartcam` invocation

The example scripts and Jupyter notebook work as examples to show the capability of the smartcam for specific configurations. More combinations could be made based on the options provided by smartcam. User can get detailed application options as following by invoking `smartcam --help`.

##### Usage

```text
 smartcam [OPTION?] - Application for face detection on SOM board of Xilinx.

 Help Options:

 -h, --help             Show help options

 --help-all             Show all help options

 --help-gst             Show GStreamer Options


 Application Options:

 -m, --mipi=                use MIPI camera as input source, auto detect, fail if no mipi available.

 -u, --usb=media_ID         usb camera video device id, e.g. 2 for /dev/video2

 -f, --file=file            path location of h26x file as input

 -i, --infile-type=h264     input file type: [h264 | h265]

 -W, --width=1920           resolution w of the input

 -H, --height=1080          resolution h of the input

 -r, --framerate=30         framerate of the input

 -t, --target=dp            [dp|rtsp|file]

 -o, --outmedia-type=h264   output file type: [h264 | h265]

 -p, --port=5000            Port to listen on (default: 5000)

 -a, --aitask               select AI task to be run: [facedetect|ssd|refinedet]

 -n, --nodet                no AI inference

 -A, --audio                RTSP with I2S audio input

 -R, --report               report fps

 -s, --screenfps            display fps on screen, notic this will cause perfermance degradation.

 --ROI-off                  turn off ROI (Region-of-Interest)

--control-rate=low-latency  Encoder parameter control-rate
                            Supported value:
                            ((0): disable (1): variable (2): constant
                            (2130706434): capped-variable
                            (2130706433): low-latency)

--target-bitrate=3000       Encoder parameter target-bitrate

--gop-length=60             Encoder parameter gop-length

--profile                   Encoder parameter profile.
                            Default: h264: constrained-baseline; h264: main
                            Supported value:
                            (H264: constrained-baseline, baseline, main, high, high-10, high-4:2:2, high-10-intra, high-4:2:2-intra
                             H265: main, main-intra, main-10, main-10-intra, main-422-10, main-422-10-intra)

--level                     Encoder parameter level
                            Default: 4
                            Supported value:
                            (4, 4.1, 5, 5.1, 5.2)

--tier                      Encoder parameter tier
                            Default: main
                            Supported value:
                            (main, high)

--encodeEnhancedParam       String for fully customizing the encoder in the form "param1=val1, param2=val2,...", where paramn is the name of the encoder parameter
                            For detailed info about the parameter name and value range, just run gst-inspect-1.0 omxh264enc / gst-inspect-1.0 omxh265enc based on encoding type selected by option "--outmedia-type", the parameter could be any of the listed parameters except "control-rate, target-bitrate, gop-length" which have dedicated options as above.

```

##### Examples of supported combinations sorted by input are outlined below

If using the command line to invoke the smartcam, stop the process via CTRL-C prior to starting the next instance.

* MIPI Input (IAS sensor input):

  * output: RTSP

    ```bash
    smartcam --mipi -W 1920 -H 1080 --target rtsp
    ```

  * output: RTSP with audio <a name="rtsp-audio"> </a>
  
    ```bash
    smartcam --mipi -W 1920 -H 1080 --target rtsp --audio
    ```

  * output: DP

    ```bash
    smartcam --mipi -W 1920 -H 1080 --target dp
    ```

  * output: file

    ```bash
    smartcam --mipi -W 1920 -H 1080 --target file
    ```

    **Note:** Output file is "./out.h264"

* input file (file on file system):

    **Note:** You must update the command to the specific file desired as the input source.

  * output: RTSP

     ```bash
     smartcam --file ./test.h264 -i h264 -W 1920 -H 1080 -r 30 --target rtsp
     ```

  * output: DP

     ```bash
     smartcam --file ./test.h264 -i h264 -W 1920 -H 1080 -r 30 --target dp
     ```

  * output: file

     ```bash
     smartcam --file ./test.h264 -i h264 -W 1920 -H 1080 -r 30 --target file
     ```

    **Note:** Output file is "./out.h264"

* input USB (USB webcam):

    **Note:** You must ensure the width/height/framerate defined are supported by your USB camera.

  * output: RTSP

    ```bash
    smartcam --usb 1 -W 1920 -H 1080 -r 30 --target rtsp
    ```

  * output: DP

    ```bash
     smartcam --usb 1 -W 1920 -H 1080 -r 30 --target dp
    ```

  * output: file

    ```bash
     smartcam --usb 1 -W 1920 -H 1080 -r 30 --target file
    ```

    **Note:** Output file is "./out.h264"

## Files structure of the application

The application is installed as:

* Binary File Directory: /opt/xilinx/kv260-smartcam/bin

  | filename | description |
  |----------|-------------|
  |smartcam| main app|

* Script File Directory: /opt/xilinx/kv260-smartcam/bin/ <a name="script-loc"></a>

  | filename | description |
  |------------------|-------------|
  |01.mipi-rtsp.sh | call smartcam to run facedetction and send out rtsp stream.|
  |02.mipi-dp.sh   | call smartcam to run facedetction and display on DP display.|
  |03.file-file.sh | call smartcam to run facedetction and display on input h264/5 file and generate output h264/5 with detection boxes.|
  |04.file-ssd-dp.sh| call smartcam to run ssd, process the input h264/5 file and display the results with detection boxes DP display.|

* Configuration File Directory: /opt/xilinx/kv260-smartcam/share/vvas/${AITASK}

  AITASK = "facedetect" | "refinedet" | "ssd"

  | filename | description |
  |----------|-------------|
  |preprocess.json|  Config of preprocess for AI inference|
  |aiinference.json| Config of AI inference (facedetect\|refinedet\|ssd) |
  |drawresult.json| Config of boundbox drawing |

  *  Model files: => /opt/xilinx/kv260-smartcam/share/vitis_ai_library/models

  The model files integrated in the application use the B3136 DPU configuration.

  | foldername | description |
  |----------|-------------|
  |densebox_640_360 | Model files for facedetcet|
  |refinedet_pruned_0_96| Model files for refinedet|
  |ssd_adas_pruned_0_95| Model files for ssd|

* Jupyter notebook file: => /opt/xilinx/kv260-smartcam/share/notebooks/

  | filename | description |
  |----------|-------------|
  |smartcam.ipynb | Jupyter notebook file for MIPI/USB --> DP/RTSP demo.|

## Next Steps

* Go back to the [KV260 SOM Smart camera design start page](../smartcamera_landing)

### License

Licensed under the Apache License, Version 2.0 (the "License"); you may not use this file except in compliance with the License.

You may obtain a copy of the License at
[http://www.apache.org/licenses/LICENSE-2.0](http://www.apache.org/licenses/LICENSE-2.0)

Unless required by applicable law or agreed to in writing, software distributed under the License is distributed on an "AS IS" BASIS, WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied. See the License for the specific language governing permissions and limitations under the License.

<p align="center">Copyright&copy; 2022 Xilinx</p>
