# Running on the KV260 Board

This tutorial assumes you followed [Getting Started with Kria SOM starter Kit](https://www.xilinx.com/products/som/kria/kv260-vision-starter-kit/kv260-getting-started/getting-started.html). This tutorialS explains the setup required for running designs on the Starter Kit.

1. Log in as root user.

    ```bash
    xilinx-kv260-starterkit-20222:~$ sudo su -l root
    #<password>
    ```

2. In the PetaLinux firmware step, you used the fpgamanager class to store the binaries at `/lib/firmware/xilinx/tutorial dir`.  Perform the following steps to view the files:

    ```bash
    root@xilinx-kv260-starterkit-20222:~# ls /lib/firmware/xilinx/kv260-smartcam/
    kv260-smartcam.bit.bin  kv260-smartcam.dtbo  kv260-smartcam.xclbin  shell.json
    ```

3. Launch the application.

    Before executing the newly installed application available at `/opt/xilinx/bin`, the FPGA firmware (PL bitstream + device tree overlay + PL drivers) needs to be loaded using xmutil utility commands. Use the following steps to load the image resizing accelerated application firmware on the Vision AI Starter Kit.

    Run the following command to list the existing application firmware on the Vision AI Starter Kit. Verify the kv260-smartcam app in the list of apps:

    ```bash
    xmutil listapps
    ```

    Run the following command to unload the default “kv260-dp” application firmware:

    ```bash
    xmutil unloadapp 
    ```

4. Run the following command to load the image resizing accelerated application firmware. Ignore the warning commands:

    ```bash
    xmutil loadapp tutorial
    ```

    Run the following command to load the image resizing accelerated application firmware:
    > **NOTE:** Ignore the warning commands.

    ```bash
    xmutil loadapp kv260-smartcam
    ```

5. Run the SmartCam Application

    Navigate to the Jupyter-notebook directory. Place the AR1335 camera module pointing towards your face, and run the SmartCam Application accelerated app:

    ```bash
    cd /opt/xilinx/kv260-smartcam/share/notebooks/ 
    ifconfig // Get the ethernet address, which will used in the next step
    jupyter-lab --allow-root --ip=10.0.0.63 // open the Jyupter link in the web-browser
    ```

## Next Steps

This completes the Smartcam Application. The next step is [Building and Running a Model on the Fly](https://xilinx.github.io/kria-apps-docs/kv260/2022.1/build/html/docs/smartcamera/docs/customize_ai_models.html).

<hr class="sphinxhide"></hr>

<p class="sphinxhide" align="center"><sub>Copyright © 2023-2025 Advanced Micro Devices, Inc.</sub></p>

<p class="sphinxhide" align="center"><sup><a href="https://www.amd.com/en/corporate/copyright">Terms and Conditions</a></sup></p>