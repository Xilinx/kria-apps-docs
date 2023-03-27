# Introduction

This document covers how to run the DFX pre-built applications and accelerators for the Kria K26 SOM. To run the application on target, install the firmware, applications on target, load the required RM partial to the target, and then run the corresponding RM application.

## Prerequisites

The Kria SOM DFX example designs presented here assume that the user has already followed the application-agnostic steps of setting up their board and completing the initial boot of the Ubuntu 22.04 OS. These example designs are agnostic to the specific carrier card, meaning they work both on KV260 and KR260 Starter Kits. Steps for getting a Kria SOM Starter Kit booted with Ubuntu 22.04 and the Xilinx-specific support packages installed are outlined [here](https://xilinx.github.io/kria-apps-docs/kv260/2022.1/build/html/docs/kria_starterkit_linux_boot.html).

## Install pre-built firmware and applications on the target

To get started, install the pre-built firmware provided as part of the DFX example design.

- The accelerators AES128, AES192, FFT, FIR, DPU, and PP_PIPELINE are provided as part of the pre-built firmware.

- On target, run xmutil listapps to look at the installed firmware. Default k26-starter-kits firmware will be shown.

```text
ubuntu@kria:~$ sudo xmutil listapps
                k26-starter-kits            XRT_FLAT                k26-starter-kits            XRT_FLAT               (0+0)                  0,
```

- Install the DFX firmware and applications package. This installs the firmware on the target at the location /lib/firmware/xilinx and applications at /opt/xilinx/kria-dfx-2rp/bin/.

```shell
sudo apt update
sudo apt install xlnx-firmware-k26-dfx-2rp
sudo apt install kria-dfx-apps
```

- Verify that pre-built firmware is installed on target by running the xmutil listapps command. It will show the newly installed firmware with Base_type PL_DFX.

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

On boot, the k26-starter-kits accelerator is loaded. Unload the default app using "sudo xmutil unloadapp" to later load the desired DFX accelerator.

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

The required accelerator can be loaded using the command "sudo xmutil loadapp". By default, running loadapp the first time will load the accelerator to slot 0, and running loadapp the second time will load it to slot 1.

```text
ubuntu@kria:~$ sudo xmutil loadapp AES128
[  146.337693] OF: overlay: WARNING: memory leak will occur if overlay removed, property: /fpga-full/firmware-name
[  146.347829] OF: overlay: WARNING: memory leak will occur if overlay removed, property: /fpga-full/resets
[  146.357800] OF: overlay: WARNING: memory leak will occur if overlay removed, property: /__symbols__/overlay0
[  146.367687] OF: overlay: WARNING: memory leak will occur if overlay removed, property: /__symbols__/fpga_PR0
[  146.377538] OF: overlay: WARNING: memory leak will occur if overlay removed, property: /__symbols__/fpga_PR1
[  146.387408] OF: overlay: WARNING: memory leak will occur if overlay removed, property: /__symbols__/overlay1
[  146.397252] OF: overlay: WARNING: memory leak will occur if overlay removed, property: /__symbols__/afi0
[  146.406749] OF: overlay: WARNING: memory leak will occur if overlay removed, property: /__symbols__/clocking0
[  146.416684] OF: overlay: WARNING: memory leak will occur if overlay removed, property: /__symbols__/clocking1
[  146.426615] OF: overlay: WARNING: memory leak will occur if overlay removed, property: /__symbols__/clocking2
[  146.436544] OF: overlay: WARNING: memory leak will occur if overlay removed, property: /__symbols__/clocking3
[  146.446520] OF: overlay: WARNING: memory leak will occur if overlay removed, property: /__symbols__/overlay2
[  146.456394] OF: overlay: WARNING: memory leak will occur if overlay removed, property: /__symbols__/RP_0_AccelConfig_0
[  146.467119] OF: overlay: WARNING: memory leak will occur if overlay removed, property: /__symbols__/RP_0_rm_comm_box_0
[  146.477915] OF: overlay: WARNING: memory leak will occur if overlay removed, property: /__symbols__/RP_1_AccelConfig_0
[  146.488643] OF: overlay: WARNING: memory leak will occur if overlay removed, property: /__symbols__/RP_1_rm_comm_box_0
[  146.499358] OF: overlay: WARNING: memory leak will occur if overlay removed, property: /__symbols__/static_shell_VCU_vcu_0
[  146.510423] OF: overlay: WARNING: memory leak will occur if overlay removed, property: /__symbols__/encoder
[  146.520178] OF: overlay: WARNING: memory leak will occur if overlay removed, property: /__symbols__/decoder
[  146.529934] OF: overlay: WARNING: memory leak will occur if overlay removed, property: /__symbols__/static_shell_dfx_slot_manager_siha_manager_0
[  146.936778] zocl-drm axi:zyxclmm_drm: IRQ index 0 not found
AES128: loaded to slot 0
```

Verify that the accelerator is loaded using "sudo xmutil listapps" and observe which "Active_slot" it is loaded to.

```text
ubuntu@kria:~$ sudo xmutil listapps
                     Accelerator          Accel_type                            Base           Base_type      #slots(PL+AIE)         Active_slot
                     PP_PIPELINE         SIHA_PL_DFX                         k26_2rp              PL_DFX               (2+0)                  -1
                             DPU         SIHA_PL_DFX                         k26_2rp              PL_DFX               (2+0)                  -1 
                          AES128         SIHA_PL_DFX                         k26_2rp              PL_DFX               (2+0)                  0,
                             FIR         SIHA_PL_DFX                         k26_2rp              PL_DFX               (2+0)                  -1
                          AES192         SIHA_PL_DFX                         k26_2rp              PL_DFX               (2+0)                  -1
                             FFT         SIHA_PL_DFX                         k26_2rp              PL_DFX               (2+0)                  -1
                k26-starter-kits            XRT_FLAT                k26-starter-kits            XRT_FLAT               (0+0)                  -1
```

**Note**: After the DFX shell is loaded, the accelerator in each slot can be unloaded by running the unloadapp command along with the slot number.

Example:

- Unload accelerator from slot 0 using "sudo xmutil unloadapp 0"
- Unload accelerator from slot 1 using "sudo xmutil unloadapp 1"

## Jupyter Notebook with pre-built accelerators

This section provides information on how to install Jupyter Lab on target and connect to it.
Example notebooks are provided to demonstrate working with pre-built accelerators and their corresponding applications.

### Install Jupyter Lab on target

Run the following commands on target to install Jupyter notebook.

```text
ubuntu@kria:~$ sudo apt install jupyter
ubuntu@kria:~$ sudo pip install --trusted-host pypi.org --trusted-host pypi.python.org --trusted-host files.pythonhosted.org jupyterlab
ubuntu@kria:~$ sudo git clone https://github.com/Xilinx/kria-dfx-apps -b xlnx_rel_v2022.1
ubuntu@kria:~$ cd kria-dfx-apps/notebook
```

### Connect to Jupyter Lab

Run the following command on target to obtain it's IP address.

```text
ubuntu@kria:~/kria-dfx-apps/notebook$ ifconfig
docker0: flags=4099<UP,BROADCAST,MULTICAST>  mtu 1500
        inet 172.17.0.1  netmask 255.255.0.0  broadcast 172.17.255.255
        ether 02:42:57:d1:80:4b  txqueuelen 0  (Ethernet)
        RX packets 0  bytes 0 (0.0 B)
        RX errors 0  dropped 0  overruns 0  frame 0
        TX packets 0  bytes 0 (0.0 B)
        TX errors 0  dropped 0 overruns 0  carrier 0  collisions 0 
        
eth0: flags=4163<UP,BROADCAST,RUNNING,MULTICAST>  mtu 1500
        inet 10.140.37.119  netmask 255.255.252.0  broadcast 10.140.39.255                       <--------- ip address = 10.140.37.119
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

Launch Jupyter Lab using the IP address obtained in the above step.

```text
ubuntu@kria:~/kria-dfx-apps/notebook$ sudo -b su -c "jupyter-lab --no-browser --allow-root --ip=10.140.37.119"
```

After running the above command, the URL to connect to Jupyter Lab server is displayed. In a browser, use the link having the target's IP address to connect to Jupyter Lab.
An example is:

```text
http://10.140.38.140:8888/lab?<token=####>
```

### Steps for running Jupyter Notebooks in the browser

- Open a new terminal instance inside jupyter lab to be able to run xmutil commands mentioned below. From the menu options, click on File -> New -> Terminal.

- Available notebooks are displayed in the left side panel of the browser. Double-click to open a notebook.

- The notebooks are divided into cells. Use Shift+Enter to run individual cells in the notebook.

- Before running each notebook, corresponding accelerators need to be loaded from terminal. Refer to each notebook for specific commands.

### 1. Notebook to demonstrate image encryption and decryption using AES128

This notebook demonstrates the working of AES128 encryption and decryption accelerators.

In this notebook:

- An image file is read as an input and displayed.
- Encryption and decryption engines use the same key.
- AES128 IP is configured for encryption. The input image is passed to AES128 IP for encryption and the encrypted image is displayed.
- AES128 IP is configured for decryption. The encrypted image is passed to AES128 IP for decryption and the decrypted image is displayed.
- The decrypted image should match with the original input image.

#### Prerequisites for AES

Unload all accelerators and load AES128 accelerator to slot 0 by running the following commands on the terminal opened in Jupyter notebook.

```shell
sudo xmutil unloadapp 0
sudo xmutil unloadapp 1
sudo xmutil loadapp AES128
```

#### Steps to run the notebook

- Open AES128.ipynb
- From the menu options, click Run -> Run All Cells.

### 2. Notebook to demonstrate image encryption and decryption using AES192

This notebook demonstrates the working of AES192 encryption and decryption accelerators.

In this notebook:

- An image file is read as an input and displayed.
- Encryption and decryption engines use the same key.
- AES192 IP is configured for encryption. The input image is passed to AES192 IP for encryption and the encrypted image is displayed.
- AES192 IP is configured for decryption. The encrypted image is passed to AES192 IP for decryption and the decrypted image is displayed.
- The decrypted image should match with the original input image.

#### Prerequisites for AES192

Unload all accelerators and load AES192 accelerator to slot 0 by running the following commands on the terminal opened in Jupyter notebook.

```shell
sudo xmutil unloadapp 0
sudo xmutil unloadapp 1
sudo xmutil loadapp AES192
```

#### Steps to run the AES192 notebook

- Open AES192.ipynb
- From the menu options, click Run -> Run All Cells.

### 3. Notebook to demonstrate data exchange between accelerators

This notebook demonstrates data transfer between AES128 and FFT accelerators using DDR buffer.

In this notebook,

- AES128 accelerator is configured as a decryption engine.
- An encrypted data file is read and plotted as a time series signal.
- The encrypted file is passed to AES128 accelerator for decryption.
- The decrypted data file is plotted again as a time series signal.
- The decrypted data is passed as an input to FFT accelerator to perform fast fourier transform the time series data.
- The output of FFT accelerator is plotted to show the frequency components present in the data.

#### Prerequisites for AES-FFT

Unload all accelerators and load AES128 accelerator to slot 0 and FFT to slot 1 by running the following commands on the terminal opened in Jupyter notebook.

```shell
sudo xmutil unloadapp 0
sudo xmutil unloadapp 1
sudo xmutil loadapp AES128
sudo xmutil loadapp FFT
```

#### Steps to run the AES-FFT notebook

- Open AES-FFT.ipynb.
- From the menu options, click Run -> Run All Cells.

### 4. Notebook to demonstrate orchestration of accelerators

This notebook demonstrates

- [Orchestration](./Orchestration_of_accelerators.md) of three accelerators over two dfx slots using dfx-mgr.
- Sharing data between accelerators using DDR buffer.

In this notebook,

- AES128 accelerator is configured as a decryption engine.
- An encrypted data file is read and plotted as a time series signal.
- The encrypted file is passed to AES128 accelerator for decryption.
- The decrypted data file is plotted again as a time series signal.
- The decrypted data is passed as an input to FFT accelerator to perform fast fourier transform the time series data.
- The output of FFT accelerator is plotted to show the frequency components present in the signal.
- FIR accelerator is configured as a band pass filter.
- The decrypted data file i.e., the output of AES128 is passed as input to FIR to perform the filter operation.
- The output of FIR accelerator is passed as input to FFT accelerator in slot 1 to perform fast fourier transform.
- The output of FFT is plotted to show the frequency components present after the filter operation.

#### Prerequisites for AES-FIR-FFT

Unload all accelerators and load AES128 accelerator to slot 0 and FFT to slot 1 by running the following commands on the terminal opened in Jupyter notebook.

```shell
sudo xmutil unloadapp 0
sudo xmutil unloadapp 1
sudo xmutil loadapp AES128
sudo xmutil loadapp FFT
```

#### Steps to run the AES-FIR-FFT notebook

- Open AES-FIR-FFT.ipynb.
- Run a cell in the notebook by pressing shift + enter
- Run Initialization cell.
- Run the cell AES128 acceleration. The time series data before and after decryption operation is displayed.
- Run the cell FFT acceleration to perform FFT operation on AES128 accelerator output. The output of FFT is plotted.
- Switch to terminal in the Jupyter notebook and perform the following steps to unload AES128 accelerator and load FIR accelerator

```shell
sudo xmutil unloadapp 0
sudo xmutil loadapp FIR
```

- Run the cell FIR acceleration. Output of AES128 accelerator is passed as input to FIR accelerator. Time series plot of decrypted data before and after filter operation is plotted.
- Run the cell FFT acceleration. Output of FIR accelerator is passed as input to FFT accelerator. The frequency plot after FIR operation is performed.

### 5. Notebook to Benchmark Accelerator Performance against PS

This notebook demonstrates the performance benchmarks of running an application using the pre-built AES128 accelerator versus running the same operation on the PS.

#### Prerequisites for AES128

Unload all accelerators and load AES128 accelerator to slot 0 by running the following commands on the terminal opened in Jupyter notebook.

```shell
sudo xmutil unloadapp 0
sudo xmutil unloadapp 1
sudo xmutil loadapp AES128
```

Install the python library - pycryptodome

```text
ubuntu@kria:~$ sudo pip install pycryptodome
```

#### Steps to run the AES128 notebook

- Open AES_On_HW_vs_SW.ipynb
- From the menu options, click Run -> Run All Cells.

#### Results

- The performance metrics for running the application using the hardware accelerator is displayed after the cell - AES128 running on PL
- The performance metrics for running the application using the hardware accelerator is displayed after the cell - AES128 running on PS

## Applications for pre-built accelerators

Each of the example DFX bitstreams also has a simple command line application if the user does not want to make use of Jupyter notebooks. These applications run a test with pre-defined data when only the corresponding active DFX slot number is given as a command line argument. We can also feed data to the accelerators in the form of files using these applications. More information on the applications is mentioned below.

1. AES128 - an application for encrypting and decrypting data

Unload accelerators from both the slots to have a clean start.

```text
ubuntu@kria:~$ sudo xmutil unloadapp 0
ubuntu@kria:~$ sudo xmutil unloadapp 1
```

Load AES128 to slot 0

```text
ubuntu@kria:~$ sudo xmutil loadapp AES128
```

Usage of AES128 application

```text
ubuntu@kira:~$ sudo /opt/xilinx/kria-dfx-2rp/bin/aes128 -h
 Usage:
 aes128 (0|1) perform a quick internal test for slot 0 or 1
 aes128 [<options>] --key passphrase --out out_file --in in_file
 Options :
        -h, --help
        -d, --decrypt               Decrypt the file given on the command line. (Optional) Default operation is encryption if this flag is not provided
        -s, --slot rm_slot          Set slot to rm_slot: 0 or 1. (Optional) Default slot is 0 if this flag is not provided
        -i, --in in_file            Input file for the application (Required)
        -o, --out out_file          Write output to file (Required)
        -k, --key passphrase        Use passphrase or passphrase file (Required)
 Example : 
        sudo ./aes128 -s 0 -k encryption_key.bin -i input.bin -o output.bin (to encrypt a file)
        sudo ./aes128 -d -s 0 -k decryption_key.bin -i input.bin -o output.bin (to decrypt a file)
```

Application runs an internal test when only slot is passed as argument.

```text
ubuntu@kria:~$ sudo /opt/xilinx/kria-dfx-2rp/bin/aes128 0
AES128 TEST on Slot 0:
- AES128 DECRYPTION -
         Slot configured for DECRYPTION.
         AES128 DECRYPTION done.
         Success: DECRYPTED DATA MATCHED WITH REFERENCE DATA !
- AES128 ENCRYPTION -
         Slot configured for ENCRYPTION.
         AES128 ENCRYPTION done.
         Success: ENCRYPTED DATA MATCHED WITH REFERENCE DATA !
```

Using AES128 application to encrypt a file

```text
ubuntu@kria:~$ sudo /opt/xilinx/kria-dfx-2rp/bin/aes128 -s 0 -k <path to key/passphrase> -i <path to input file> -o <path to output file>
AES128 application running on Slot 0:
AES128 encryption done
```

Using AES128 application to decrypt an encrypted file

```text
ubuntu@kria:~$ sudo /opt/xilinx/kria-dfx-2rp/bin/aes128 -s 0 -k <path to key/passphrase> -i <path to input file> -o <path to output file> -d
AES128 application running on Slot 0:
AES128 decryption done
```

2.AES192 - an application for encrypting and decrypting data

Load AES192 to slot 1

```text
ubuntu@kria:~$ sudo xmutil loadapp AES192
```

Usage of AES192 application

```text
ubuntu@kira:~$ sudo /opt/xilinx/kria-dfx-2rp/bin/aes192 -h
 Usage:
 aes192 (0|1) perform a quick internal test for slot 0 or 1
 aes192 [<options>] --key passphrase --out out_file --in in_file
 Options :
        -h, --help
        -d, --decrypt               Decrypt the file given on the command line. (Optional) Default operation is encryption if this flag is not provided
        -s, --slot rm_slot          Set slot to rm_slot: 0 or 1. (Optional) Default slot is 0 if this flag is not provided
        -i, --in in_file            Input file for the application (Required)
        -o, --out out_file          Write output to file (Required)
        -k, --key passphrase        Use passphrase or passphrase file (Required)
 Example : 
        sudo ./aes192 -s 0 -k encryption_key.bin -i input.bin -o output.bin (to encrypt a file)
        sudo ./aes192 -d -s 0 -k decryption_key.bin -i input.bin -o output.bin (to decrypt a file)
```

Application runs an internal test when only slot is passed as argument.

```text
ubuntu@kria:~$ sudo /opt/xilinx/kria-dfx-2rp/bin/aes192 1
AES192 TEST on Slot 1:
- AES192 DECRYPTION -
         Slot configured for DECRYPTION.
         AES192 DECRYPTION done.
         Success: DECRYPTED DATA MATCHED WITH REFERENCE DATA !
- AES192 ENCRYPTION -
         Slot configured for ENCRYPTION.
         AES192 ENCRYPTION done.
         Success: ENCRYPTED DATA MATCHED WITH REFERENCE DATA !
```

Using AES192 application to encrypt a file

```text
ubuntu@kria:~$ sudo /opt/xilinx/kria-dfx-2rp/bin/aes192 -s 1 -k <path to key/passphrase> -i <path to input file> -o <path to output file>
AES192 application running on Slot 1:
AES192 encryption done
```

Using AES192 application to decrypt an encrypted file

```text
ubuntu@kria:~$ sudo /opt/xilinx/kria-dfx-2rp/bin/aes192 -s 1 -k <path to key/passphrase> -i <path to input file> -o <path to output file> -d
AES192 application running on Slot 1:
AES192 decryption done
```

3.FFT - an application for performing 4-channel Fast Fourier Transform

Unload previously loaded firmware and load FFT to slot 0

```text
ubuntu@kria:~$ sudo xmutil unloadapp 
ubuntu@kria:~$ sudo xmutil loadapp FFT
```

Usage of FFT application

```text
ubuntu@kira:~$ sudo /opt/xilinx/kria-dfx-2rp/bin/fft -h
 Usage:
 fft (0|1) perform a quick internal test for slot 0 or 1
 fft [<options>] --slot rm_slot --config filename --out filename --in filename
 Options :
  -h, --help
  -s, --slot rm_slot            Set slot to rm_slot: 0 or 1. (Optional) Default slot is 0 if this flag is not provided
  -c, --config filename         Use config file (Required)
  -i, --in filename             Input file to the program (Required)
  -o, --out filename            Write output to file (Required)
 Example : 
        fft -s 0 -c config.bin -o output.bin -i input.bin


```

Application runs an internal test when only slot is passed as argument.

```text
ubuntu@kria:~$ sudo /opt/xilinx/kria-dfx-2rp/bin/fft 0
FFT TEST on Slot 0:
         Configure FFT Ch0 done.
         Configure FFT Ch1 done.
         Configure FFT Ch2 done.
         Configure FFT Ch3 done.
         Configure FFT data done.
         Received Data From Accel.
         Success: FFT TEST PASSED !
```

Using FFT application

```text
ubuntu@kria:~$ sudo /opt/xilinx/kria-dfx-2rp/bin/fft -s 0 -c <path to config file> -i <path to input file> -o <path to output file>
FFT application running on Slot 0:
Configure FFT Ch1 done.
Configure FFT Ch2 done.
Configure FFT Ch3 done.
Configure FFT Ch4 done.
Configure FFT data done.
Data from Accel done.
FFT operation done
```

4.FIR - an application for filtering signals using FIR

Unload previously loaded firmware and load FIR to slot 1

```text
ubuntu@kria:~$ sudo xmutil unloadapp 1
ubuntu@kria:~$ sudo xmutil loadapp FIR
```

Usage of FIR application

```text
ubuntu@kira:~$ sudo /opt/xilinx/kria-dfx-2rp/bin/fir -h
 Usage:
 fir (0|1) perform a quick internal test for slot 0 or 1
 fir [<options>] --slot rm_slot --config filename --reload filename --out filename --in filename
 Options :
  -h, --help
  -s, --slot rm_slot        Set slot to rm_slot: 0 or 1. (Optional) Default slot is 0 if this flag is not provided
  -c, --config filename     Use config file (Required)
  -r, --reload filename     Use reload file (Required)
  -i, --in filename         Input file to the program (Required)
  -o, --out filename        Write output to file (Required)
 Example : 
        fir -s 0 -c config.bin -r reload.bin -o output.bin -i input.bin
```

Application runs an internal test when only slot is passed as argument.

```text
ubuntu@kria:~$ sudo /opt/xilinx/kria-dfx-2rp/bin/fir 1
FIR TEST on Slot 1:
         Configure Reload data done.
         Configure Data done.
         Configure FIR Input data done.
         Received Data From Accel.
         Success: FIR TEST PASSED !
```

Using FIR application

```text
ubuntu@kria:~$ sudo /opt/xilinx/kria-dfx-2rp/bin/fir -s 1 -c <path to config file> -r <path to reload file> -i <path to input file> -o <path to output file>
FIR application running on Slot 1:
Configure Reload data done.
Configure Config data done.
Configure FIR Input data done.
Data from Accel done.
FIR operation done
```

## Limitations / Known Issues

- Multi-slot accelerator unloading/reloading using (xmutil loadapp/unloadapp commands) stress test will fail after 30 cycles. Reboot the platform or Restart dfx-mgr to recover from the state.
- DPU and PP_PIPELINE (Video Pre Processing) firmware are included for reference but are not fully functional in this release.

## FAQ and Debug

- The pre-built applications depend on "uuid-dev", "libdfx-dev", "libdfx-mgr-dev" packages.
In case of building the applications by cloning a git, "cmake" package needs to be installed.
To build the firmware for the pre-built accelerators, "bootgen-xlnx" package needs to be installed.
Steps to install the dependencies manually

```text
sudo apt install uuid-dev libdfx-dev cmake libdfx-mgr-dev bootgen-xlnx
```

- Ensure to load the corresponding accelerator on the specific DFX slot while running an application targeting that slot. In case the accelerator loaded on the slot does not match the application requirement, the console hangs. Restart the target to continue.

## License

Licensed under the Apache License, Version 2.0 (the "License"); you may not use this file except in compliance with the License.

You may obtain a copy of the License at
[http://www.apache.org/licenses/LICENSE-2.0](http://www.apache.org/licenses/LICENSE-2.0)

Unless required by applicable law or agreed to in writing, software distributed under the License is distributed on an "AS IS" BASIS, WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied. See the License for the specific language governing permissions and limitations under the License.

<palign="center">Copyright&copy; 2021 Xilinx</p>
