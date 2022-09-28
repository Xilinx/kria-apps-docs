<table class="sphinxhide">
 <tr>
   <td align="center"><img src="../../media/xilinx-logo.png" width="30%"/><h1>Kria&trade; KV260 Vision AI Starter Kit Defect Detection Tutorial</h1>
   </td>
 </tr>
 <tr>
 <td align="center"><h1>Setting up the Board and Application Deployment</h1>

 </td>
 </tr>
</table>

# Setting up the Board and Application Deployment

## Introduction

This document shows how to set up the board and run the defect-detect application.

This guide and its prebuilt are targeted for Ubuntu 22.04 and Xilinx 2022.1 toolchain. The previous version of this application (on Xilinx 2021.1 toolchain) targeted to Petalinux is still available [online](https://xilinx.github.io/kria-apps-docs/2021.1/build/html/index.html).

## Booting up Linux

Before continuing with defect-detect application specific instructions, if not yet done so, boot Linux with instructions from [Kria Starter Kit Linux boot](../../kria_starterkit_linux_boot.md) page. Note that Defect Detect application requires starting the application using commandline through uart instead of GNOME Desktop.

Defect Detect requires kernel version 5.15.0-1013 or newer.

## Introduction to the Test Environment

### Setting Up the Live Source

When setting up the SOM Board for the live camera source capturing mango image displayed on a monitor, adhere to the following guidelines:

* Keep the board firmly held in a static position.
* The board should be directly opposite to the monitor (180 deg).
* In the test environment, keep the board at an appropriate distance (31 cm) from the monitor.
* According to the model of the monitor, set brightness and contrast to 45 and 17 respectively.
* Ensure that the room is closed. Only natural light should pass through the glass windows at daytime. At night, use artificial lights but that should not be opposite to the monitor.
* To avoid over exposure of light, do NOT place the monitor opposite to open door or window.
* Ensure that live source should be able to capture the mango completely.
* The camera should be focused ONLY on the mango image that is displayed.
* In the test environment, the light intensity is to be ~08 LUX.

   **Note**: If the preview image is not satisfactory, adjust the above mentioned parameters.

### Setting Up the Test Environment

**Note:** Ensure that the [Gstreamer packages](https://gstreamer.freedesktop.org/documentation/installing/on-linux.html?gi-language=c) installed on Linux PC. If Linux distribution is on Ubuntu, make sure its version is at least **16.04**.

Download all the sample mango images from the [Cofilab site](http://www.cofilab.com/wp-content/downloads/DB_Mango.rar) to the Linux PC.

**Note:** If the file fails to download, copy the link and open in a new browser tab to download the file.

As the downloaded images are in JPG format, convert them to GRAY 8 (Y8) format using the following steps.

1. Unzip the downloaded rar file.

2. In the Linux PC, go to `DB_mango`.

3. Copy and save the following script as **convert_jpeg_y8.sh**:

   ```shell
   for file in ./*; do       
   f=$(echo "${file##*/}");
     filename=$(echo $f| cut  -d'.' -f 1); #file has extension, it return only filename
       echo $filename
         gst-launch-1.0 filesrc location=$file ! jpegdec  ! videoconvert  ! videoscale ! video/x-raw, width=1280, height=800, format=GRAY8 ! filesink location=$filename.y8
   done
   cat Mango_*.y8 > input_video.y8
   ```

4. Make the script executable: `chmod +x convert_jpeg_y8.sh`

5. Run the script `convert_jpeg_y8.sh` as follows:

   ```shell
   ./convert_jpeg_y8.sh >& file.txt
   ```

   Once the above command is completed, the script produces `input_video.y8` as input to the Defect Detect application.

6. Copy `input_video.y8` from the Linux PC to the SOM board. if copied to SD card, it can be found in `/boot/firmware/input_video.y8`. In order for containers to access the file, copy it to `/tmp/` and containers can then also access it from its /tmp/ folder. then copy it to `/home/` directory in container.

   > **NOTE**: Delete all files *except* `input_video.y8`.

The Defect Detection application's design- takes, processes, and displays images on to the monitor.

See [Known Issues](known_issues_dd.md) with the Defect Detect application.

## Application Specific Hardware Setup

Besides the hardware configurations required in [Kria Starter Kit Linux boot](../../kria_starterkit_linux_boot.md) for booting Linux, Defect Detect Application requires the following:

![GitHub Logo](../../media/som-board.png)

* **Monitor:** Defect detect requires a 4k monitor, so before booting, connect a 4k monitor to the board using either DP or HDMI port.

* **Camera Connection:** Ensure that the board is powered off, and then connect AR0144 to IAS connector J7.

## Downloading and Loading Application Firmware

1. Search package feed for packages compatible with KR260

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

2. Install firmware binaries

      ```bash
       sudo apt install xlnx-firmware-kv260-defect-detect
      ```

3. Dynamically load the application firmware:

    The firmware consist of bitstream, and device tree overlay (dtbo) file. The firmware is loaded dynamically on user request once Linux is fully booted. The xmutil utility can be used for that purpose.

    * Disable the desktop environment:

       ```bash
       sudo xmutil desktop_disable
        ```

    **Note:** Executing "xmutil desktop_disable" will cause the desktop on the monitor to be disabled. Please use any serial terminal to continue issuing Linux commands via port J4 and not rely completely on the desktop environment.

    After running the application, the desktop environment can be enabled again with:

      ```bash
       sudo xmutil desktop_enable
      ```

    * After installing the FW, execute xmutil listapps to verify that it is captured under the listapps function, and to have dfx-mgrd re-scan and register all accelerators in the FW directory tree.

      ```bash
      sudo xmutil listapps
      ```

    * Switch to a different platform for different Application:

       When there is already another accelerator/firmware being activated, unload it first, then switch to xlnx-app-kv260-defect-detect.

       ```bash
      sudo xmutil unloadapp
      sudo xmutil dp_unbind
      sudo xmutil loadapp kv260-defect-detect
      sudo xmutil dp_bind
      modetest -M xlnx -D B0010000.v_mix -s 52@40:3840x2160@NV16
        ```
  
        **Note:** 4K Monitor should always be connected.

## Docker based application preparation

4. Pull the latest docker image for defect-detect using the below command.

    ```bash
    docker pull xilinx/defect-detect:2022.1
    ```

    * The storage volume on the SD card can be limited with multiple dockers. If there are space issues, you can use following command to remove the existing container.

      ```bash
      docker rmi --force $INSTALLED_DOCKER_IMAGE
      ```

    * You can find the images installed with command:

      ```bash
      docker images
      ```

5. Launch the docker using the below command. The firmware must be loaded before launching docker container.

    ```bash
    docker run \
    --env="DISPLAY" \
        --env="XDG_SESSION_TYPE" \
        --net=host \
        --privileged \
        --volume /tmp:/tmp \
        --volume="$HOME/.Xauthority:/root/.Xauthority:rw" \
        -v /dev:/dev \
        -v /sys:/sys \
        -v /etc/vart.conf:/etc/vart.conf \
        -v /lib/firmware/xilinx:/lib/firmware/xilinx \
        -v /run:/run \
        -it xilinx/defect-detect:2022.1 bash
    ```

    It launches the defect-detect docker image container

    ```bash
    root@xlnx-docker/#
    ```

## Running the Defect Detect Application

There are two ways to invoke the Defect Detection application: Jupyter Notebook or command line.

### Jupyter Notebook

Jupyter notebook works as an example to show the capability of the **defect-detect** application for specific configurations.

Jupyter Notebook Defect Detect application supports the following modes:

* 0 ==> File Input and File Sink
* 1 ==> Live Normal Mode. Live Source and Display Out Normal Mode
* 2 ==> Live Demo Mode. Live Source and Display Out
* 3 ==> File In Display Out
* 4 ==> Live In and File Out
* 5 ==> File In Display Out Demo Mode

The default mode is Live source and display out (mode 1). Use the playback variable to change the mode.

**Note**:
The defect-detection Jupyter notebook application is launched under the `ubuntu` user.

To start the defect-detection Jupyter notebook application, perform the following steps:

1. Get the list of running Jupyter servers, with the following command:

   ```bash
   jupyter-notebook list
   ```

2. Stop the default Jupyter notebook using the following command, If jupyter server is already running:

   ```bash
   jupyter-notebook stop 8888
   ```

3. Launch the Jupyter notebook using the following command:

   ```bash
   jupyter-notebook  --notebook-dir=/opt/xilinx/kv260-defect-detect/share/notebooks/ --ip=<IP Address> --allow-root

   // fill in ip-address from ifconfig, eth0
   ```

Jupyter Notebook requires an IP address. Perform the below steps if the IP address is not assigned by default.

1. If using a direct connection (no DHCP), see public documentation on how to configure PC with a static IP on the same subnet.

2. For the SOM target, set the desired IP address within the same subnet using `ifconfig`, like the following example:

   ```bash
   ifconfig eth0 <user defined IP> netmask <user defined netmask>
   ```

Output example:

  ```bash
  [I 17:08:04.080 NotebookApp] Serving notebooks from local directory: /tmp/notebooks
  [I 17:08:04.081 NotebookApp] Jupyter Notebook 6.4.12 is running at:
  [I 17:08:04.081 NotebookApp] http://xxx.yyy.zzz.ttt:8888/?token=545e6a8950269d86c30e7c271b04cc0e6d0fe4df4ffefe0a
  [I 17:08:04.081 NotebookApp]  or http://127.0.0.1:8888/?token=545e6a8950269d86c30e7c271b04cc0e6d0fe4df4ffefe0a
  [I 17:08:04.081 NotebookApp] Use Control-C to stop this server and shut down all kernels (twice to skip confirmation).
  ```

To access the Defect Detection Jupyter Notebook, use the path returned by the ```jupyter-notebook list``` command.
  
A Jupyter notebook user can run cell by cell or run the defect detection full pipeline in Jupyter Notebook. To do this, go to defect-detect.ipynb, then from the menu bar, select **Kernel**, and then select **Restart Kernel & Run All Cells**. The notebook by default expects file source location to be `/home/input_video.y8` - make changes in the notebook if needed.
  
When using a file sink, data is dumped in the **rootfs (/home/)**. Offload the output files to PC and play using a YUV player. In the YUV player select the color as **Y** and the custom size as **1280x800**.

### Command Examples

**Examples:**

**Note**: Only one instance of the application can run at a time.

* For File-In and Display-Out playback in demo mode, run the following command.

  ```bash
  defect-detect -i input_video.y8 -d 1
  ```

  **Note**: The 3-stage outputs display on DP/HDMI with 4 fps rate. This mode is enabled to run the pipeline with a slower rate for the user to analyze the different outputs.

* For File-In and File-Out playback, run the following command.

  ```bash
  defect-detect -i input_video.y8 -x raw.y8 -y pre_pros.y8 -z final.y8
  ```

  **Note**: The 3-stage outputs dump into the files. It is mandatory to specify all the three output file names.

* For File-In and Display-Out playback, run the following command.

  ```bash
  defect-detect -i input_video.y8
  ```

  **Note**: The 3-stage outputs display on DP/HDMI. Change the input file path as appropriate.

* For Live-In and File-Out playback, run the following command.

  ```bash
  defect-detect -x raw.y8 -y pre_pros.y8 -z final.y8
  ```

  **Note**: The 3-stage outputs dump into the files. It is mandatory to specify all the three output file names.

* For Live-In and Display-Out playback, run the following command.

  `defect-detect`

  **Note**: The 3-stage outputs display on DP/HDMI.

* For Live-In and Display-Out playback in demo mode, run the following command.

  ```bash
  defect-detect -d 1
  ```

The 3-stage outputs display on DP/HDMI with 4 fps rate. This mode is enabled to run the pipeline with a slower rate for the user to analyze the different outputs.

### Command Line

Use the command line to set the resolution, configuration file path and more, using the **defect-detect** application.

More combinations could be made based on the options provided by the **defect-detect** application.

Defect Detection Application Usage

```bash
defect-detect --help
```

Usage:

```bash
defect-detect [OPTION?] - Application to detect the defect of Mango on Xilinx board.
```

Help Options:

```bash
  -?, --help                        Show help options

  --help-all                        Show all help options

  --help-gst                        Show GStreamer Options
```

Application Options:

```bash
-i, --infile=file path                                       Location of input file
-x, --rawout=file path                                       Location of capture raw output file
-y, --preprocessout=file path                                Location of pre-processed output file
-z, --finalout=file path                                     Location of final output file
-w, --width=1280                                             Resolution width of the input
-h, --height=800                                             Resolution height of the input
-r, --framerate=60                                           Framerate of the input source
-d, --demomode=0                                             For Demo mode value must be 1
-c, --cfgpath=/opt/xilinx/kv260-defect-detect/share/vvas/    JSON config file path
```

The application is targeted to run an input source that supports GRAY8 (Y8) format with a resolution of **1280x800**.

Once done with the Defect Detection application, To switch to another accelerator application after defect detection application, first exit out of the container using ```exit```, then unload it by running the below command:

```bash
sudo xmutil unloadapp kv260-defect-detect
```

### Sensor Calibration for the Live Source

While running the Defect Detection application through the command line or in the Jupyter Notebook, `ar0144-sensor-calib.sh` script file being called from the application code to perform the sensor calibration.

If the preview image is not properly displayed, use the `ar0144-sensor-calib.sh` script (present in `/opt/xilinx/kv260-defect-detect/bin`) to change various sensor calibration parameter values such as:

* Brightness
* Contrast
* Saturation
* Exposure Metering
* GAIN
* Exposure
* GAMMA

Make sure that the Defect Detection application is running in the background when calibrating the sensor.

Save the values in the script and run the script to apply the new values. For example:

```
ar0144-sensor-calib.sh /dev/mediaX (where X is the corresponding media node for the AR0144 sensor)
```

### File Structure of the Application

<details>
<summary><b>To view details, click here.</b></summary>

The application is comprised of the following files:

* Binary File: => `/opt/xilinx/kv260-defect-detect/bin`

   | filename | description |
   |----------|-------------|
   |defect-detect| main app|

* Script File: => `/opt/xilinx/kv260-defect-detect/bin`

   | filename | description |
   |----------|-------------|
   |defect-detect-install.py| Script to copy Jupyter notebook to user directory|
   |ar0144-sensor-calib.sh|Script to calibrate sensor for user test environment|

* Configuration Files: => `/opt/xilinx/kv260-defect-detect/share/vvas/`

   | filename | description |
   |----------|-------------|
   |`otsu-accelarator.json`|Configuration of OTSU accelerator|
   |`cca-accelerator.json`|Configuration of CCA accelerator|
   |`preprocess-accelarator.json`| Configuration of pre-process accelerator|
   |`text2overlay.json`|Configuration of text2overlay software accelerator|

* Jupyter notebook file: => `/opt/xilinx/kv260-defect-detect/share/notebooks/`

   | filename | description |
   |----------|-------------|
   |`defect-detect.ipynb`| Jupyter notebook file to run the Defect Defection pipeline|

</details>

## Next Steps

* [Software Architecture](sw_arch_platform_dd.md)
* Go back to the [KV260 SOM Defect detect design start page](../defectdetect_landing)

### License

Licensed under the Apache License, Version 2.0 (the "License"); you may not use this file except in compliance with the License.

You may obtain a copy of the License at
[http://www.apache.org/licenses/LICENSE-2.0](http://www.apache.org/licenses/LICENSE-2.0)


Unless required by applicable law or agreed to in writing, software distributed under the License is distributed on an "AS IS" BASIS, WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied. See the License for the specific language governing permissions and limitations under the License.

<p class="sphinxhide" align="center">Copyright&copy; 2021 Xilinx</p>
