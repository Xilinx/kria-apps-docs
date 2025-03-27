# Soft IP for Kria Notes

This section contains notes on PL or "soft IP" selection guidance for use on Kria platforms. The Kria K24 and K26 SOMs are based on the AMD Zynq&trade; MPSoC, which has hardened processor subsystem (PS) as well as programmable logic (PL) which you select and instantiate a number of soft IPs. For some applications, like Ethernet, there are multiple IPs available in the Vivado IP catalog to cover different use cases and device families. This section provides guidance on specific application areas where there may be multiple IPs in the Vivado IP catalog, but for Zynq MPSoC devices, only a subset of them are supported for use in Kria MPSoC platforms.

## Ethernet

When choosing a PL based Ethernet implementation, you must consider the Zynq MPSoC device capabilities, the Kria SOM implementation, and the target carrier card capabilities (AMD carrier card or custom carrier card). For details on Zynq MPSoC capabilities, refer to the *Zynq UltraScale+ Device Technical Reference Manual* ([UG1085](https://docs.amd.com/go/en-US/ug1085-zynq-ultrascale-trm)).

K26:

- K26's Zynq MPSoC has single GTH quad of transceivers, so it can support PL multi-Gb Ethernet with soft PL Ethernet IPs requiring a high-speed SerDes interface.
- K26's Zynq MPSoC does not have a hardened PL 100G Ethernet.

KV260:

- KV260 implements a 1 Gb/s Ethernet interface from PS GEM0. It does not have hardware hooks, such as an Ethernet PHY, RJ45, or SFP for implementing PL based Ethernet.

KR260:

- KR260 provides the following Ethernet physical interfaces on its carrier card:
  - CC J10A (RJ45) 1 Gb/s Ethernet 3 (PL) RGMII interface on HPB
  - CC J10B (RJ45) 1 Gb/s Ethernet 2 (PL) RGMII interface on HPA
  - CC J10C (RJ45) 1 Gb/s Ethernet 1 (PS) RGMII interface
  - CC J10D (RJ45) 1 Gb/s Ethernet 0 (PS) SGMII interface
  - CC SFP+ that could be used to implement high speed ethernet from PL with GTH

K24:

- The K24's Zynq MPSoC does not have any PL GTH SerDes transceivers. Therefore, it supports only PHY interfaces that do not have a high-speed SerDes dependent physical interfaces.

KD240:

- KD240 implements the following Ethernet interfaces on its RJ45 connectors:
  - CC J24 1 Gb/s Ethernet 0 (PS) RGMII interface
  - CC J25A 1 Gb/s Ethernet 2 (PL) RGMII interface on HPA
  - CC J25B 1 Gb/s Ethernet 1 (PL) RGMII interface on HPA

As of 2023.2, the Ethernet IPs in AMD's soft IP offering that are compatible with KR260 and KD240 PL Ethernet PHY (RGMII) are:

- [axi_ethernet subsystem](https://docs.amd.com/go/en-US/pg138-axi-ethernet) demonstrated by [BIST design](https://xilinx.github.io/kria-apps-docs/kr260/build/html/docs/bist/docs/overview.html) (Vivado design [here as part of the kr260_tsn_rs485pmod platform](https://github.com/Xilinx/kria-vitis-platforms/tree/main/kr260/platforms))
- [Tri Mode Ethernet MAC]( https://docs.amd.com/go/en-US/pg051-tri-mode-eth-mac)
- [100M/1G TSN Subsystem](https://www.xilinx.com/products/intellectual-property/1gtsn.html) as demonstrated by [TSN app](https://xilinx.github.io/kria-apps-docs/kr260/build/html/docs/ros2_multinode_communication_via_tsn/ros2_multinode_communication_via_tsn_landing.html).

The following IPs are also supported on K26 and KR260 Starter Kits (no example designs available):

- [10G Ethernet PCS/PMA](https://docs.amd.com/go/en-US/pg068-ten-gig-eth-pcs-pma) soft IP
- [1G/2.5G Ethernet PCS/PMA](https://docs.amd.com/go/en-US/pg047-gig-eth-pcs-pma)
- [1G/10G/25G Switching Ethernet Subsystem](https://docs.amd.com/go/en-US/pg292-ethernet-1-10-25g) up to 10G. KR260 does not have enough GTH to support 25G.

### Ethernet Driver Considerations

The KV260 and KR260 have different Ethernet PHY compared to KD240, which requires slightly different implementation the LWIP stack. For more information, refer to [FAQ](https://xilinx.github.io/kria-apps-docs/faq/build/html/docs/faq.html#ethernet-implementation-for-amd-starter-kits).

<hr class="sphinxhide"></hr>

<p class="sphinxhide" align="center"><sub>Copyright © 2023-2025 Advanced Micro Devices, Inc.</sub></p>

<p class="sphinxhide" align="center"><sup><a href="https://www.amd.com/en/corporate/copyright">Terms and Conditions</a></sup></p>