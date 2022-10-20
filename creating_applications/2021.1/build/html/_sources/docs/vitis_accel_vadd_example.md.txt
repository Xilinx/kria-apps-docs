# Vitis Accelerator Flow Example - Adding VADD Accelerator using Vitis GUI

This example provide an example for developers who want to add an acceleration application into existing released SOM platforms using Vitis GUI. By default, the released platforms and applications uses a Makefile flow (example [here](./vitis_accel_flow_smartcam_filter2d_example.md)). However, this example shows an alternative way to add accelerator applications using Vitis IDE. We will import a Vitis Platform into Vitis and insert an acceleration application there. Xilinx prebuilt KV260 platform examples and their associated applications are:

   |Application |Platform|
   |----|----|
   |smartcam |kv260_ispMipiRx_vcu_DP|
   |aibox-reid |kv260_vcuDecode_vmixDP|
   |defect-detect |kv260_ispMipiRx_vmixDP|
   |nlp-smartvision |kv260_ispMipiRx_DP|

This example adds a VADD acceleration application into kv260_ispMipiRx_DP used by nlp-smartvision and uses 2021.1 tools. You can use any of the released platforms to try out the example. Note an overlay and its application needs to be both present for an acceleration application to execute. Since we are inserting the VADD accelerator without the original NLP-smartvision overlay,  the original smartvision applications will not work on this newly generated overlay.

## Obtaining Platform

Since we are altering an existing platform, we will first  get the platform - kv260_ispMipiRx_DP. Detailed tutorial is at [Creating Vitis Platform](https://xilinx.github.io/kria-apps-docs/main/build/html/docs/build_vitis_platform.html). Here are the specific commands to generate the platform:

```shell
git clone --recursive https://github.com/Xilinx/kv260-vitis.git
cd $workdir/kv260-vitis
git checkout release-2021.1
source <vitis path>/settings64.sh
make platform PFM=kv260_ispMipiRx_DP
```

The platform we will need in later steps will be available now in ```$workdir/kv260-vitis/platforms/xilinx_kv260_ispMipiRx_DP_202110_1/```.

## Create Sysroot

Vadd requires xrt library, therefore we need to generate sysroot with PetaLinux before starting Vitis.

1. Check [Kria K26 SOM wiki](https://xilinx-wiki.atlassian.net/wiki/spaces/A/pages/1641152513/Kria+K26+SOM). Download the **Starter Kit SOM BSP** that matches your tool version under **PetaLinux Board Support Package** section.

    For example, the [2021.1 KV260 Starter kit BSP](https://www.xilinx.com/member/forms/download/xef.html?filename=xilinx-k26-starterkit-v2021.1-final.bsp), save it to your working directory.

2. Setup PetaLinux environment

    ```bash
    source <petaLinux_tool_install_dir>/settings.sh
    ```

3. Update PetaLinux eSDK to enable the recipes needed by the Starter Kit SOM BSP.

    ```bash
    petalinux-upgrade -u 'http://petalinux.xilinx.com/sswreleases/rel-v2021/sdkupdate/2021.1_update1/' -p 'aarch64'
    ```

4. Create PetaLinux with the Starter Kit SOM BSP and the XSA export from step 1.

    ```bash
    cd $workdir
    petalinux-create --type project -s xilinx-k26-starterkit-v2021.1-final.bsp
    cd xilinx-k26-starterkit-v2021.1/
    ```

5. Add XRT to rootfs

    KV260 PetaLinux BSP doesn't enable XRT because it installs XRT with overlay. To create sysroot for application developer cross compiling, we enable XRT in the rootfs.

    - Run `petalinux-config -c rootfs` to launch rootfs configuration window.
    - Go to **Filesystem packages -> libs -> xrt**
    - Enable `xrt`
    - Press Exit to exit configuration. Press Save to save the configuration.

6. Build PetaLinux and generate SDK

    ```bash
    petalinux-build
    petalinux-build --sdk
    ```

    The PetaLinux image files and sysroot sdk.sh will be generated in < PetaLinux Project >/images/linux directory. We will use them in the next step.

7. Install sysroot:

   - Go to `$workdir/xilinx-k26-starterkit-v2021.1/images/linux` directory.
   - Type `./sdk.sh -d <Install sysroot Target Dir>` to install PetaLinux SDK. use the `-d` option to provide a full pathname to an output directory, an arbitrary path user can vhoose, and confirm.
   - Note: The environment variable **LD_LIBRARY_PATH** must not be set when running this command

8. Optional step:
   in 2021.1, Vitis still tries to generate sd_card.img even if .bif file is empty - resulting in an error ```ERROR:BootGen - syntax error``` when doing step 7 of "Generating overlay in Vitis". This error is harmless - all the needed files are still generated. However, to avoid the error, you can populate ```$workdir/kv260-vitis/platforms/xilinx_kv260_ispMipiRx_DP_202110_1/sw/kv260_ispMipiRx_DP/boot/linux.bif``` with below content, assuming that your kv260-vitis/ and xilinx-k26-starterkit-v2021.1/ are both top level in $workdir:

   ```text
   the_ROM_image:
   {
    [fsbl_config] a53_x64
    [bootloader] <../../../../xilinx-k26-starterkit-2021.1/images/linux/zynqmp_fsbl.elf>
    [pmufw_image] <../../../../xilinx-k26-starterkit-2021.1/images/linux/pmufw.elf>
    [destination_cpu=a53-0, exception_level=el-3, trustzone] <../../../../xilinx-k26-starterkit-2021.1/images/linux/bl31.elf>
    [load=0x00100000] <../../../../xilinx-k26-starterkit-2021.1/images/linux/system.dtb>
    [destination_cpu=a53-0, exception_level=el-2] <../../../../xilinx-k26-starterkit-2021.1/images/linux/u-boot.elf>
   }
   ```

## Generating Overlay in Vitis

1. Start Vitis, and select ```Create Application Projects```, skip the welcome page
2. In ```Select a platform from repository```, click ```+ Add``` and navigate to the folder containing ```.xpfm``` file in  ```$workdir/kv260-vitis/platforms/xilinx_kv260_ispMipiRx_DP_202110_1``` and click ```Open```. this will open the .xpfm file and its associated platform. click  ```Next```

   ![vadd1.png](./media/vitis_vadd_example/vadd1.PNG)

3. Name the project ```vadd```, click ```Next```.
4. In Domain page:
   - Set Domain to ```smp_linux```
   - Set ```Sys_root path``` to ```<Install sysroot Target Dir>/sysroots/cortexa72-cortexa53-xilinx-linux```(as you created by running ```sdk.sh```).
   - Leave ```Root FS``` empty
   - Leave ```Kernel Image```  empty
   - click Next

5. Select ```Acceleration templates with PL and AIE accelerators -> Vector Addition``` and click ```Finish``` to generate the application.
6. In the Explorer window double click the **vadd_system->vadd->vadd.prj** file to open it, change the **Active Build configuration** from **Emulation-SW** to **Hardware**.
7. Select ```vadd_system``` in Explorer window and Click **Build** icon in toolbar. The build task would take 10-30 minutes. When build completes, the build result is located in `vadd_system/Hardware/` directory. Note that if step 8 in section Create Sysroot was not performed, there will be an error and it can be ignored.

    - vadd_system/Hardware/package.build/package/system.bit: PL bitstream including vadd kernel and platform components.
    - vadd_system_hw_link/Hardware/binary_container_1.xclbin: Acceleration binary container for XRT configuration. It includes system.bit and metadata that describes the kernels.
    - vadd/Hardware/vadd: Compiled host application

8. The bitstream needs to be in bin format so that fpgamanager can load it. Convert `.bit` file to `.bit.bin` file with the following commands.

   ```bash
   cd vadd_system/Hardware/package.build/package/
   echo 'all:{system.bit}'>bootgen.bif
   bootgen -w -arch zynqmp -process_bitstream bin -image bootgen.bif
   mv system.bit.bin vadd.bit.bin    
   ```

## Obtaining .dtbo File

You can download the corresponding .dtsi file (in this case, nlp-smartvision from [kv260_firmware 2021.1 release](https://github.com/Xilinx/kria-apps-firmware/tree/xlnx_rel_v2021.1) and compile them using command below. For more information on dtc please refer to [dtsi_dtbo_generation](./dtsi_dtbo_generation.md):

```shell
dtc -@ -O dtb -o vadd.dtbo kv260-nlp-smartvision.dtsi
```

Output is vadd.dtbo.

## Create shell.json

   Prepare shell.json. You can copy it from other applications or create one with the following contents.

```json
{
  "shell_type" : "XRT_FLAT",
  "num_slots": "1"
}
```

## Test Application

1. Transferring the files to the board

    Make sure the Ethernet cable of SOM Starter Kit is connected. Use SCP or SFTP to upload the files from host to target board.

    ```shell
    # Running on host machine
    scp vadd.dtbo vadd.bit.bin shell.json vadd binary_container_1.xclbin petalinux@<SOM Starter Kit IP>:/home/petalinux/
    ```

    note that the vadd file above is a file generated in section "Generating Overlay in Vitis" step 7.

2. Load the hardware on target

    ```shell
    # Running on target board
    sudo mkdir /lib/firmware/xilinx/vadd
    cd /home/petalinux
    sudo mv vadd.dtbo vadd.bit.bin shell.json /lib/firmware/xilinx/vadd/
    sudo xmutil listapps
    sudo xmutil unloadapp
    sudo xmutil loadapp vadd
    ```

3. Run Vector Addition Application on the Board

   - Run vadd application

   ```shell
   chmod +x ./vadd
   ./vadd binary_container_1.xclbin
   ```

   - It should show program prints.

   ```shell
    xilinx-k26-starterkit-2021_1:~$ ./vadd binary_container_1.xclbin
    INFO: Reading binary_container_1.xclbin
    Loading: 'binary_container_1.xclbin'
    TEST PASSED
   ```
  
Congratulations, you have added an accelerator to an existing Platform!

This tutorial is based on Vitis GUI based [Vitis Platform flow example](https://github.com/Xilinx/Vitis-Tutorials/blob/2021.1/Vitis_Platform_Creation/Design_Tutorials/01-Edge-KV260/), but we do not follow many of the steps that create and set-up the platform in Vivado since we use prebuilt platform.

## License

Licensed under the Apache License, Version 2.0 (the "License"); you may not use this file except in compliance with the License.

You may obtain a copy of the License at
[http://www.apache.org/licenses/LICENSE-2.0](http://www.apache.org/licenses/LICENSE-2.0)

Unless required by applicable law or agreed to in writing, software distributed under the License is distributed on an "AS IS" BASIS, WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied. See the License for the specific language governing permissions and limitations under the License.

<p align="center">Copyright&copy; 2021 Xilinx</p>
