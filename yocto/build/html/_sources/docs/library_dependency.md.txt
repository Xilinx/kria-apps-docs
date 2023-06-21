# Library Dependency

Some example applications are dependent on specific versions of Vitis libraries - specifically:

- [VVAS](https://www.xilinx.com/products/design-tools/vitis/vvas.html)  package name ```vvas-accel-libs``` in PetaLinux (renamed from ```ivas-accel-libs``` in 2021.1 and older tools) or ```vvas-essentials``` in Ubuntu, github page [here](https://github.com/Xilinx/vvas)
- [Vitis-AI or VAI](https://www.xilinx.com/products/design-tools/vitis/vitis-ai.html), package name ```vitis-ai-library```, github page [here](https://github.com/Xilinx/vitis-ai)
- [XRT](https://www.xilinx.com/products/design-tools/vitis/xrt.html) and [ZOCL](https://xilinx.github.io/XRT/master/html/zocl_ioctl.main.html), github page [here](https://github.com/Xilinx/xrt)

The libraries are not always backward compatible, to use the example applications, you will need to install a specific version of those libraries. When example applications are installed apps through package feed or docker (per deployment documentation), the appropriate library versions are installed by default. When the applications are installed manually (such as the flow in [Yocto port Example](./yocto_port_example.md)), you need to take care to install specific versions.

These are the specific library versions that was verified with released example applications:

| **BSP/App Version** | **XRT/ZOCL Version**   | **Vitis-AI Version** | **VVAS Version** |
| ------------------- | ---------------------- | -------------------- | ---------------- |
| 2022.1              | 202210.2.13.479        | 2.5.0                | 2.0              |
| 2021.1              | 202110.2.11.0          | 1.4.0                | 1.0(IVAS)        |
| 2020.2              | 202020.2.8.1           | 1.3.0                | 1.0(IVAS)        |

Note that ZOCL is a XRT dependency - always install ZOCL first, otherwise XRT installation will install the latest ZOCL as a dependency.
Similarly, Vitis-AI is a VVAS dependency, always install Vitis-AI first, otherwise VVAS installation may install the latest version of Vitis-AI as a dependency.

## License

Licensed under the Apache License, Version 2.0 (the "License"); you may not use this file except in compliance with the License.

You may obtain a copy of the License at
[http://www.apache.org/licenses/LICENSE-2.0](http://www.apache.org/licenses/LICENSE-2.0)

Unless required by applicable law or agreed to in writing, software distributed under the License is distributed on an "AS IS" BASIS, WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied. See the License for the specific language governing permissions and limitations under the License.

<p align="center">Copyright&copy; 2021 Xilinx</p>
