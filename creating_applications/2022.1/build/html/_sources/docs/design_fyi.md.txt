# Programmable Logic Design tips and FYI

This page collects and answers some of the questions  encountered while creating the PL firmware part of the application.

## Vitis Profiler Clock Tip

[//]: <> (* In Vitis flow, when using the profile flags in a Vitis generation, the system will crash during the unload process if dynamically loading/unloading the bitstream AND not using an existing platform clock. If it is desired to use dynamic loading/unloading, then ensure that design uses a clock that is already available in the targeted Vitis platform.    commented out until we have an explanation before publicly document)

## Vivado Board Files & Customization

Vivado board files are provided as a design guide to users and are generally aligned with corresponding example applications of Kria Starter Kits. Users may use board files as a starting point for their own designs and after running board file automation then customize the design for different use-cases. An example of this is KR260 board file assumes that the two PL connected Ethernet PHYs are to be connected to PL based controllers (e.g. TSN PL IP), but if user wants to make use of PS based GEM controllers mapped via EMIO to the same PHY, they can do so within their local project.

## License

Licensed under the Apache License, Version 2.0 (the "License"); you may not use this file except in compliance with the License.

You may obtain a copy of the License at
[http://www.apache.org/licenses/LICENSE-2.0](http://www.apache.org/licenses/LICENSE-2.0)

Unless required by applicable law or agreed to in writing, software distributed under the License is distributed on an "AS IS" BASIS, WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied. See the License for the specific language governing permissions and limitations under the License.

<p class="sphinxhide" align="center">Copyright&copy; 2023 Advanced Micro Devices, Inc</p>