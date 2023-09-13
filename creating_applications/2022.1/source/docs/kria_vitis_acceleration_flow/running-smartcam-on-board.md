# Running on the KV260 Board

This tutorial assumes the user has followed the [Getting started with Kria SOM starter Kit](https://www.xilinx.com/products/som/kria/kv260-vision-starter-kit/kv260-getting-started/getting-started.html). This guide explains the setup required for running designs on the started Kit.

1. Log in as root user 

```
xilinx-kv260-starterkit-20222:~$ sudo su -l root
<password>
```

2. In the petalinux firmware step, we have used the fpgamanager class to store the binaries at /lib/firmware/xilinx/tutorial dir.  Perform the following steps to view the files.

```
root@xilinx-kv260-starterkit-20222:~# ls /lib/firmware/xilinx/kv260-smartcam/
kv260-smartcam.bit.bin  kv260-smartcam.dtbo  kv260-smartcam.xclbin  shell.json

```

3. Launching the application 

Before executing the newly installed application available at /opt/xilinx/bin, the FPGA firmware (PL bitstream + device tree overlay + PL drivers) needs to be loaded using xmutil utility commands. Follow the below steps to load Image resizing accelerated application firmware on the Vision AI Starter Kit.

Run the below command to list the existing application firmware on the Vision AI Starter Kit. Verify the kv260-smartcam app in the list of apps

```
xmutil listapps

```
Run the below command to unload the default “kv260-dp” application firmware.

```
xmutil unloadapp 

```

4. Run the below command to load Image resizing accelerated application firmware. Ignore the warning commands

```
 xmutil loadapp tutorial
```
Run the below command to load Image resizing accelerated application firmware.
> Note: Ignore the warning commands

```
xmutil loadapp kv260-smartcam
```


5. Run the Smartcam Application 

Navigate to the Jyupter-notebook directory. Place the AR1335 camera module pointing to the user's face and run the smartcam Application accelerated app. 

```
cd /opt/xilinx/kv260-smartcam/share/notebooks/ 
ifconfig // Get the ethernet address, which will used in the next step
jupyter-lab --allow-root --ip=10.0.0.63 // open the Jyupter link in the web-browser
```

## Next steps
This completes the Smartcam Application. The next step is [Building and Running a Model on the Fly](https://xilinx.github.io/kria-apps-docs/kv260/2022.1/build/html/docs/smartcamera/docs/customize_ai_models.html).


