
# SOM Digital Rights Management

## Introduction

Kria SOM has an [app store](https://www.xilinx.com/products/app-store/kria.html) where partners can provide pre-built applications and reference designs for end customers to browse, download, install, and deploy on Kria SOMs and Starter Kits. Kria SOMs and Starter Kits can be enabled with a digital rights management (DRM) solution for partners to protect and monetize their programmable logic (PL) IPs. The DRM can also be used for tracking application to specific users without the requirement of financial exchange. The Kria SOM DRM is implemented in partnership with Accelize. For more information visit the [protect](https://www.accelize.com/protect/) and [monetize](https://www.accelize.com/monetize/) pages on Accelize website.

## Trades space of HW-only vs Hybrid HW-SW DRM solution

The Accelize DRM solution consist of two major components, a DRM Controller function and a DRM Activator. The DRM Activator function is always integrated with the PL IP that is being licensed/protected. The DRM Controller has two options for implementation, a hardware-only DRM Controller and a software based DRM Controller. In the hardware-only DRM, the [DRM controller](https://tech.accelize.com/documentation/stable/drm_hardware_ip_controller.html) is fully implemented in PL. The software DRM implements the DRM controller as a trusted application(TA) in a secure trusted execution environment (TEE) called ProvenCore that runs alongside Linux using the MPSoC APU Arm TrustZone technology.

The trade space between these solutions is the hardware DRM requires ~13K LUTs of PL resources, but does not require any special secure boot or TEE coupled with secure boot of the platform. The software DRM saves 13K LUTs of PL resources but has a dependency on ensuring there is a secure SW environment and secure boot process implemented on the target. For details on the different implementations see Accelize [overview](https://tech.accelize.com/documentation/stable/drm_hardware_ip_controller.html).

 The DRM Activator is always a PL function and is required per protected IP at a resource count of ~3K LUTs each. Find details [here](https://tech.accelize.com/documentation/stable/drm_hardware_ip_activator.html#implementation-results).

## HW-only DRM solution

To integrate hardware DRM solution, to Accelize [getting started](https://tech.accelize.com/documentation/stable/drm_getting_started.html) documentation.

## Hybrid HW-SW DRM solution

For an example on how to integrate the Accelize software DRM solution with a Kria SOM Starter Kit and/or production SOM please refer to [drm_hybrid](../docs/drm_hybrid) page.

### License

Licensed under the Apache License, Version 2.0 (the "License"); you may not use this file except in compliance with the License.

You may obtain a copy of the License at
[http://www.apache.org/licenses/LICENSE-2.0](http://www.apache.org/licenses/LICENSE-2.0)

Unless required by applicable law or agreed to in writing, software distributed under the License is distributed on an "AS IS" BASIS, WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied. See the License for the specific language governing permissions and limitations under the License.

<p align="center">Copyright&copy; 2021 Xilinx</p>
