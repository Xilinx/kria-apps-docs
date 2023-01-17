
# Boot Firmware - Stitching QSPI Image

## Introduction

This page outlines the process to re-create a QSPI image for Kria SOM Starter kits to help developers create their own QSPI image to use with their custom carrier cards. [Yocto](https://xilinx-wiki.atlassian.net/wiki/spaces/A/pages/18841883/Yocto) support for generating Kria SOM Starter Kit QSPI image only starts in 2022.2, previous versions do not have support.

## Requirements

As outlined in [bootfw overview](./bootfw_overview.md), Kria SOM Starter Kit QSPI image is stitched together from several components. The rest of the bootfw documentation also outlined process to individually generate each components.

This document details a Yocto Flow that automates the generation of those binary files and stitch them together. Before starting, make sure the build host PC meets [these requirements](https://docs.yoctoproject.org/brief-yoctoprojectqs/index.html#compatible-linux-distribution). Besides installing the packages/tools specified by the requirement page, look in [issues](#issues) section for possible additional requirements.

### Step 1: Preparing the Build Environment

Install Repo.

```shell
#download the Repo script:
curl https://storage.googleapis.com/git-repo-downloads/repo > repo
#Make it executable:
chmod a+x repo
#Move it on to your system path:
mv repo ~/bin/
#Add it to your path
PATH=$PATH:~/bin
#If it is correctly installed, you should see a Usage message when invoked with the help flag.
repo --help
```

Fetch all sources

```shell
#repo init to the Xilinx yocto project
repo init -u https://github.com/Xilinx/yocto-manifests.git -b <release-branch>
#repo sync to get all sources
repo sync
#repo start a branch
repo start <release-branch> --all
#where current-release is rel-v2022.2 [note: will need to update this to 2022.2_update]
```

Source environment:

```shell
#source the environment to build using bitbake
source setupsdk
```

### Step 2: Build the image

To build QSPI image use below command

```shell
MACHINE=k26-som bitbake som-qspi 
```

The resulting QSPI image ```som-qspi-k26-som.bin``` and its artifacts can be found in ```$TMPDIR/deploy/images/k26-som```, and $TMPDIR is defined in ```build/conf/local.conf```. Note that the fsbl file ```fsbl-k26-som.elf``` may also be needed in the QSPI programming steps. This image universally supports both KV260 and KR260, as well as both StarterKit SOM and Production SOM. [note: check with wes if hes okay with this statement]

To only build the boot.bin:

```shell
MACHINE=k26-som bitbake xilinx-bootbin
```

The resulting boot.bin image ```BOOT-k26-som.bin``` and its artifacts can be found in ```$TMPDIR/deploy/images/k26-som```, and $TMPDIR is defined in ```build/conf/local.conf```

## Issues

1. If you see the error ```error loading hsi package: couldn't load file "libxv_commontasks.so" ```, it maybe missing libtinfo5 library which can be installed with ```sudo apt-get install -y libtinfo5```

## License

Licensed under the Apache License, Version 2.0 (the "License"); you may not use this file except in compliance with the License.

You may obtain a copy of the License at
[http://www.apache.org/licenses/LICENSE-2.0](http://www.apache.org/licenses/LICENSE-2.0)

Unless required by applicable law or agreed to in writing, software distributed under the License is distributed on an "AS IS" BASIS, WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied. See the License for the specific language governing permissions and limitations under the License.

<p align="center">Copyright&copy; 2021 Xilinx</p>