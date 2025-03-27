# Programmable Logic Design Tips and FYI

This page collects and answers some of the questions encountered while creating the PL firmware part of the application.

## Vitis Profiler Clock Tip

[//]: <> (* In Vitis flow, when using the profile flags in a Vitis generation, the system will crash during the unload process if dynamically loading/unloading the bitstream AND not using an existing platform clock. If it is desired to use dynamic loading/unloading, then ensure that design uses a clock that is already available in the targeted Vitis platform.    commented out until we have an explanation before publicly document)

## Vivado Board Files & Customization

Vivado board files are provided as a design guide and are generally aligned with the corresponding example applications of Kria Starter Kits. Use the board files as a starting point for your own designs and after running board file automation, customize the design for different use cases. An example of this is the KR260 board file, which assumes that the two PL connected Ethernet PHYs are to be connected to PL based controllers (for example, TSN PL IP), but if you want to make use of PS based GEM controllers mapped via EMIO to the same PHY, you can do so within your local project.

<hr class="sphinxhide"></hr>

<p class="sphinxhide" align="center"><sub>Copyright © 2023-2025 Advanced Micro Devices, Inc.</sub></p>

<p class="sphinxhide" align="center"><sup><a href="https://www.amd.com/en/corporate/copyright">Terms and Conditions</a></sup></p>