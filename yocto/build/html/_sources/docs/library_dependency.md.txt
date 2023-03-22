# Library Dependency

Some example applications are dependent on specific versions of Vitis libraries - specifically [VVAS](https://www.xilinx.com/products/design-tools/vitis/vvas.html) and [VAI](https://www.xilinx.com/products/design-tools/vitis/vitis-ai.html) libraries. The libraries are not backward compatible, to use the example applications, you will need to download a specific version.

In the Ubuntu example apps, we used docker container which specified required libraries.

In Yocto/PetaLinux, we need to take care to download the specific libraries.

In 2022.1, you must use:
- zocl-202210.2.13.479-r0.0
- xrt-202210.2.13.479-r0.0

In 2022.2, ???



## License

Licensed under the Apache License, Version 2.0 (the "License"); you may not use this file except in compliance with the License.

You may obtain a copy of the License at
[http://www.apache.org/licenses/LICENSE-2.0](http://www.apache.org/licenses/LICENSE-2.0)

Unless required by applicable law or agreed to in writing, software distributed under the License is distributed on an "AS IS" BASIS, WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied. See the License for the specific language governing permissions and limitations under the License.

<p align="center">Copyright&copy; 2021 Xilinx</p>
