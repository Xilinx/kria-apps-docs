# Introduction

This document covers how to run the Kria DFX pre-built applications and accelerators. To run the application on target, install the firmware, applications on target, load the required RM partial to the target, and then run the corresponding RM application.

## Prerequisites

The Kria DFX example designs presented here assume that the user has already followed the application-agnostic steps of setting up their board and completing the initial boot of the Ubuntu 22.04 OS. The Kria example designs are agnostic to the specific carrier card meaning they work both on KV260 and KR260 Starter Kits. Steps for getting a Kria Starter Kit booted with Ubuntu 22.04 and the Xilinx-specific support packages installed are outlined [here](https://xilinx.github.io/kria-apps-docs/kv260/2022.1/build/html/docs/kria_starterkit_linux_boot.html).

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
ubuntu@kria:~$ sudo git clone https://github.com/Xilinx/kria-dfx-apps
cd kria-dfx-apps/notebook
```

### Connect to Jupyter Lab

Run the following command on target to obtain it's IP address.

```text
ubuntu@kria:~/kria-dfx-apps/notebook$ ifconfig
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

#### Prerequisites

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

#### Prerequisites

Unload all accelerators and load AES192 accelerator to slot 0 by running the following commands on the terminal opened in Jupyter notebook.
 
```shell
sudo xmutil unloadapp 0
sudo xmutil unloadapp 1
sudo xmutil loadapp AES192
```

#### Steps to run the notebook

- Open AES192.ipynb
- From the menu options, click Run -> Run All Cells.
 
###  3. Notebook to demonstrate data exchange between accelerators

This notebook demonstrates data transfer between AES128 and FFT accelerators using DDR buffer.

In this notebook,

- AES128 accelerator is configured as a decryption engine.
- An encrypted data file is read and plotted as a time series signal.
- The encrypted file is passed to AES128 accelerator for decryption.
- The decrypted data file is plotted again as a time series signal.
- The decrypted data is passed as an input to FFT accelerator to perform fast fourier transform the time series data.
- The output of FFT accelerator is plotted to show the frequency components present in the data.

#### Prerequisites

Unload all accelerators and load AES128 accelerator to slot 0 and FFT to slot 1 by running the following commands on the terminal opened in Jupyter notebook.

```shell
sudo xmutil unloadapp 0
sudo xmutil unloadapp 1
sudo xmutil loadapp AES128
sudo xmutil loadapp FFT
```

#### Steps to run the notebook

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

#### Prerequisites

Unload all accelerators and load AES128 accelerator to slot 0 and FFT to slot 1 by running the following commands on the terminal opened in Jupyter notebook.

```shell
sudo xmutil unloadapp 0
sudo xmutil unloadapp 1
sudo xmutil loadapp AES128
sudo xmutil loadapp FFT
```

#### Steps to run the notebook

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

#### Prerequisites

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

#### Steps to run the notebook

- Open AES_On_HW_vs_SW.ipynb
- From the menu options, click Run -> Run All Cells.

#### Results

- The performance metrics for running the application using the hardware accelerator is displayed after the cell - AES128 running on PL
- The performance metrics for running the application using the hardware accelerator is displayed after the cell - AES128 running on PS

## Command line test applications for pre-built accelerators

Each of the example DFX bitstreams also has a simple command line test application if the user does not want to make use of Jupyter notebooks. These are executed by running the pre-built test application name and referencing the corresponding active DFX slot number after installing the pre-built accelerators as mentioned above.

The following example demonstrates loading AES128 to slot 0 and AES192 to slot 1 and running corresponding applications by passing slot number as argument to the application.

 Unload accelerators from both the slots to have a clean start

```text
ubuntu@kria:~$ sudo xmutil unloadapp 0
ubuntu@kria:~$ sudo xmutil unloadapp 1
```

Load AES128 to slot 0

```text
ubuntu@kria:~$ sudo xmutil loadapp AES128
```

Run AES128 application

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

Load AES128 to slot 1

```text
ubuntu@kria:~$ sudo xmutil loadapp AES192
```

Run AES192 application

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

## Limitations / Known Issues

- Multi-slot accelerator unloading/reloading using (xmutil loadapp/unloadapp commands) stress test will fail after 30 cycles. Reboot the platform or Restart dfx-mgr to recover from the state.
- DPU and PP_PIPELINE (Video Pre Processing) firmware are included for reference but are not fully functional in this release.

## License

Licensed under the Apache License, Version 2.0 (the "License"); you may not use this file except in compliance with the License.

You may obtain a copy of the License at
[http://www.apache.org/licenses/LICENSE-2.0](http://www.apache.org/licenses/LICENSE-2.0)

Unless required by applicable law or agreed to in writing, software distributed under the License is distributed on an "AS IS" BASIS, WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied. See the License for the specific language governing permissions and limitations under the License.

<p align="center">Copyright&copy; 2021 Xilinx</p>