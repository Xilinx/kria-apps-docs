# Library Dependency

Some example applications are dependent on specific versions of the AMD Vitis™ libraries, specifically:

- [VVAS](https://www.xilinx.com/products/design-tools/vitis/vvas.html) package name `vvas-accel-libs` in PetaLinux (renamed from `ivas-accel-libs` in 2021.1 and older tools) or `vvas-essentials` in Ubuntu® ([GitHub page](https://github.com/Xilinx/vvas))
- [Vitis-AI or VAI](https://www.xilinx.com/products/design-tools/vitis/vitis-ai.html), package name `vitis-ai-library` ([GitHub page](https://github.com/Xilinx/vitis-ai))
- [XRT](https://www.xilinx.com/products/design-tools/vitis/xrt.html) and [ZOCL](https://xilinx.github.io/XRT/master/html/zocl_ioctl.main.html) ([GitHub page](https://github.com/Xilinx/xrt))

The libraries are not always backward compatible; to use the example applications, you need to install a specific versions of those libraries. When example applications are installed apps through a package feed or docker (per the deployment documentation), the appropriate library versions are installed by default. When the applications are installed manually (such as the flow in [Yocto port Example](./yocto_port_example.md)), you need to take care to install specific versions.

These are the specific library versions verified with the released example applications:

| **BSP/App Version** | **XRT/ZOCL Version**   | **Vitis-AI Version** | **VVAS Version** |
| ------------------- | ---------------------- | -------------------- | ---------------- |
| 2022.1              | 202210.2.13.479        | 2.5.0                | 2.0              |
| 2021.1              | 202110.2.11.0          | 1.4.0                | 1.0(IVAS)        |
| 2020.2              | 202020.2.8.1           | 1.3.0                | 1.0(IVAS)        |

>**NOTE:** ZOCL is a XRT dependency; you must always install ZOCL first, otherwise the XRT installation will install the latest ZOCL as a dependency. Similarly, Vitis-AI is a VVAS dependency, always install Vitis-AI first; otherwise the VVAS installation might install the latest version of Vitis-AI as a dependency.

<hr class="sphinxhide"></hr>

<p class="sphinxhide" align="center"><sub>Copyright © 2023–2025 Advanced Micro Devices, Inc.</sub></p>

<p class="sphinxhide" align="center"><sup><a href="https://www.amd.com/en/corporate/copyright">Terms and Conditions</a></sup></p>