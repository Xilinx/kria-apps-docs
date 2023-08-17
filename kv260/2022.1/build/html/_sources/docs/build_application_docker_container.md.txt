<table class="sphinxhide">
 <tr>
   <td align="center"><img src="media/xilinx-logo.png" width="30%"/><h1> Kria&trade; Rebuilding Application Docker Containers Tutorial</h1>
   </td>
 </tr>
 <tr>
 <td align="center"><h1>Rebuilding Application Docker Containers Tutorial</h1>

 </td>
 </tr>
</table>

# Rebuilding Application Docker Containers Tutorial

## Introduction

This tutorial provides the steps required to rebuild Docker containers for the Kria SOM. You can build the individual application images, but a full set of Docker files are provided to build the example Docker images in the [Kria Docker git repo](https://github.com/Xilinx/kria-docker.git).

There are two Docker images used to rebuild Docker containers. They make use of a Docker incremental build approach to reduce final image size.

1. The kria-developer Docker image can be found on [Docker hub](https://hub.docker.com/r/xilinx/kria-developer). It contains all the development libraries you needs to build against.

2. The kria-runtime Docker image is a subset of the kria-developer Docker image; it can also be found on [Docker hub](https://hub.docker.com/r/xilinx/kria-runtime). It contains only the runtime library dependencies, thus is a smaller footprint base image to install a pre-built app.

## Requirement

The Docker container can be rebuilt on target (the Kria SOM) or on a host machine. If rebuilding on a host machine, it must be a Arm&reg;-based processor.

## Steps to Build

1. Clone the kria-docker git repo:

   ```shell
   git clone --branch xlnx_rel_v2022.1 https://github.com/Xilinx/kria-docker.git
   cd kria-docker/dockerfiles
   ```

2. Build the application of interest.

   Command: ```docker build -f <dockerfile name> . -t <Name of the image>```

   Example commands:
  
   ```shell
   docker build -f aibox-reid . -t aibox-reid 
   docker build -f nlp-smartvision . -t nlp-smartvision
   docker build -f smartcam . -t smartcam
   docker build -f defect-detect . -t defect-detect
   ```

  The Docker script will pull in the kria-developer and kria-runtime Docker image on the build machine and the appropiate git repos to build the application images.

## Steps to Load

### Built on Target

If the Docker image was built on target, issue the following command to see that it is present:

```shell
docker images
```

The image can be then run using the `docker run` command.

### Built on Host

If the Docker image was built on host, it needs to be moved over to the target.

1. Once the Docker image is created, save the image to tar ball with:

    ```shell
    docker save -o <filename.tar> <image_name>:<tag_name>
    ```

2. Copy the tar ball to target, then load the Docker image:

    ```shell
    docker load -i <filename.tar>
    ```

3. Issue the following command to see that it is present:

    ```shell
    docker images
    ```

The image can be then run using the `docker run` command.

### License

Licensed under the Apache License, Version 2.0 (the "License"); you may not use this file except in compliance with the License.

You may obtain a copy of the License at
[http://www.apache.org/licenses/LICENSE-2.0](http://www.apache.org/licenses/LICENSE-2.0).

Unless required by applicable law or agreed to in writing, software distributed under the License is distributed on an "AS IS" BASIS, WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied. See the License for the specific language governing permissions and limitations under the License.

<p align="center">Copyright&copy; 2021-2023 Advanced Micro Devices, Inc</p>
