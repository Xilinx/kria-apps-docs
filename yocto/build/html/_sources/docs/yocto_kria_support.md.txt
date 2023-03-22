# Yocto Kria Support

Yocto contains support to generate Kria artifacts starting in 2022.2. Note that PetaLinux is an abstraction of Yocto - it is Yocto + Xilinx meta layers + extra tools such as XSCT, XSDB, etc. The process and commands of generating artifacts from Yocto vs PetaLinux are different, but the backend is the same (e.g. both are Yocto based).

The Yocto Project provides [extensive documentation](https://docs.yoctoproject.org/) and it is recommended to familiarize yourself with some of the core concepts before continuing. Xilinx specific Yocto information can be found on the [wiki](https://xilinx-wiki.atlassian.net/wiki/spaces/A/pages/18841883/Yocto).

## Machine Configurations for Kria

The [machine configurations](https://docs.yoctoproject.org/dev/dev-manual/new-machine.html) provided for Kria define the settings used for a given machine when building each recipe. For example, when building bitbake recipe ```kria-image-full-cmdline``` using ```MACHINE=k26-kv``` vs ```MACHINE=k26-smk```, different output will be produced. Machine configuration files for Kria SOM and starter kits can be found in [github](https://gitenterprise.xilinx.com/Yocto/meta-kria/tree/HEAD/conf/machine) in release branches for the perspective tool version.

Please note that the names of machine names and recipes have changed between 2022.2 and 2023.1.

| Machine Name      |                  | Bitbake Recipe          | QEMU Support | Description                                                           |
| ----------------- | ---------------- | ----------------------- | ------------ | --------------------------------------------------------------------- |
| 2022.2            | 2023.1 and later |                         |     |                                                                       |
| k26-starter-kit   | k26-smk          | som-qspi                |  NA |QSPI image supporting K26 production SOM and Starter Kit SOM |
| k26-starter-kit   | k26-smk          | kria-image-full-cmdline | Supported only in 2023.1 | wic image that dynamically support both KV260 and KR260      |
| kv260-starter-kit | *           | kria-image-full-cmdline | Supported only in 2022.2 | wic image that support KV260 Starter Kit only                |
| kr260-starter-kit | *           | kria-image-full-cmdline | Supported only in 2022.2 | wic image that support KR260 Starter Kit only                |

*k26-kr and k26-kv flat wic image generation are not supported in 2023.1.

## Build Host Requirements

Before starting, make sure the build host PC meets [these requirements](https://docs.yoctoproject.org/brief-yoctoprojectqs/index.html#compatible-linux-distribution).

Note that building using an NFS mount is not supported - use a local or scratch disk.

Besides installing the packages/tools specified by the requirement page, look in [issues](#issues) section for possible additional requirements.

## Prepare the Build Environment

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
#example:  repo start rel-v2022.2 --all
```

Source environment:

```shell
#source the environment to build using bitbake
source setupsdk
```

## Build the Artifacts

To build the artifacts, use below command:

```shell
MACHINE=<machine name> bitbake <bitbake recipe> 
```

For an example, to build QSPI image and wic image for K26 starter kits use below command for 2022.2:

```shell
MACHINE=k26-starter-kit bitbake som-qspi
MACHINE=k26-starter-kit bitbake kria-image-full-cmdline 
```

The resulting QSPI image, wic image and their artifacts can be found in ```$TMPDIR/deploy/images/k26-starter-kit```, and $TMPDIR is defined in ```build/conf/local.conf```, by default in ```tmp/```.

## QEMU

Yocto can boot each of the various MACHINEs using QEMU once a build completed. This is the command:

```shell
MACHINE=<machine name> runqemu nographic slirp
```

Exit from QEMU with: ```ctrl-a,x```

Note that during the build process, a QEMU configuration file is created in the output dir containing all of the configuration options set for the machine and used by the runqemu command. For example, for k26-smk, this file can be found in ```$TMPDIR/deploy/images/k26-smk/kria-image-full-cmdline-k26-smk.qemuboot.conf```

In 2023.1, the combined starterkit k26-smk supports QEMU, and the default hardware which it emulates is KV260. To change it to KR260, update ```sources/meta-kria/conf/machine/k26-smk.conf``` according to the comment in the file.

## Variables, Overrides and the Environment

Most of the Yocto recipes and configuration files assign values to [variables](https://docs.yoctoproject.org/dev/dev-manual/new-recipe.html) in order to influence the build. Machine specific overrides can be used to replace default or previously defined values with ones that are specific to the machine you are building for. Each machine will have a series of overrides which defines, in order of priority, which overrides will be considered when parsing all of the recipes and config files. For example, here are a few assignments/overrides taken from a recipe in the codebase:

```shell
KRIA_ARCH_PACKAGES:k26-smk = "k26-starter-kits"
SRC_URI:append:k26-smk = " file://boot.cmd.${BOOTFILE_EXT}" # :append is used to add to an existing list for this MACHINE
```

It is possible to get a list of the MACHINEOVERRIDEs that are used for a given recipe as well as the log of how the system came to the final value of a variable by using the "-e" flag on a build:

```shell
MACHINE=k26-starter-kit bitbake kria-image-full-cmdline -e 
```

You can see if you redirect the output of bitbake -e to a file how each of the variables in the build got to its final value, for example here is how SERIAL_CONSOLES was set for a recipe:

```text
# $SERIAL_CONSOLES [5 operations]
#   set? /scratch/jtoomey/2023/sources/poky/../meta-xilinx/meta-xilinx-core/conf/machine/zynqmp-generic.conf:46
#     "115200;ttyPS0"
#   set /scratch/jtoomey/2023/sources/poky/../meta-kria/conf/machine/include/kria-common.inc:14
#     "115200;ttyPS1"
#   set /scratch/jtoomey/2023/sources/poky/meta/conf/documentation.conf:380
#     [doc] "Defines the serial consoles (TTYs) to enable using getty."
#   set /scratch/jtoomey/2023/sources/poky/meta/conf/bitbake.conf:918
#     [_defaultval] "${@d.getVar('SERIAL_CONSOLE').replace(' ', ';')}"
#   override[qemuarm64]:set? /scratch/jtoomey/2023/sources/poky/../meta-virtualization/conf/distro/include/meta-virt-xen.inc:15
#     "115200;ttyAMA0"
# pre-expansion value:
#   "115200;ttyPS1"
SERIAL_CONSOLES="115200;ttyPS1"
```

## Working with recipes

[note: ask john, where/how to find a list of relevant to krai recipes?]

It is possible to work with individual components for the purpose of integration, debugging or updates. For example if we want to build the xmutil utility we can bitbake that recipe:

```text
MACHINE=k26-smk bitbake xmutil
```

This will download and build the xmutil sources, as well as any other recipes it depends on. For the purpose of development or debugging, it might be necessary to point the recipe to a different repo, branch or commit by updating the SRC_URI or SRCREV. (example of local repo commented out below)

```shell
diff --git a/recipes-utils/xmutil/xmutil.inc b/recipes-utils/xmutil/xmutil.inc
index f83bcb3..2839b62 100644
--- a/recipes-utils/xmutil/xmutil.inc
+++ b/recipes-utils/xmutil/xmutil.inc
@@ -1,5 +1,5 @@
-REPO = "git://github.com/Xilinx/xmutil.git;protocol=https"
-SRCREV = "b5b1ad13bcc48d4cbd20476c97d05589bdfc7772"
+REPO = "git://gitenterprise.xilinx.com/jtoomey/xmutil.git;protocol=https"
+#REPO = "file:///path/to/xmutil;protocol=file"
+SRCREV = "0000000000000000000000000000000000000000"
 BRANCH = "master"
 LICENSE = "MIT"
 LIC_FILES_CHKSUM = "file://MIT;md5=0835ade698e0bcf8506ecda2f7b4f302"
```

Once this has been updated, the package can be rebuilt and bitbake will pick up the new code.

```shell
MACHINE=k26-smk bitbake xmutil
```

It is also possible to clean in between builds to force a clean build:

```shell
MACHINE=k26-smk bitbake xmutil -c clean
```






## Issues

1. If you see the error ```error loading hsi package: couldn't load file "libxv_commontasks.so" ```, it maybe missing libtinfo5 library which can be installed with ```sudo apt-get install -y libtinfo5```

## License

Licensed under the Apache License, Version 2.0 (the "License"); you may not use this file except in compliance with the License.

You may obtain a copy of the License at
[http://www.apache.org/licenses/LICENSE-2.0](http://www.apache.org/licenses/LICENSE-2.0)

Unless required by applicable law or agreed to in writing, software distributed under the License is distributed on an "AS IS" BASIS, WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied. See the License for the specific language governing permissions and limitations under the License.

<p align="center">Copyright&copy; 2021 Xilinx</p>
