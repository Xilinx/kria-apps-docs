# euresys

    -   Accelerated Applications

        -   (SLVS-EC Machine Vision application)

            -   Overview

                -   Introduction of Accelerated Application

                -   Application Features

                -   Overview of Sony IMX547 Sensor

                -   Overview of FSA Module

                -   Overview of FSM Module

                -   Overview of Framos SLVS-EC IP Core

                -   Overview of Euresys 10GE Pipeline IP's

                -   Resource Utilization

            -   Quick Start

                -   Test Environment for 10GE

                -   Application Installation and Execution

                    -   Installation & Sphinx application Usage

                    -   GE application Execution Steps

            -   Application Architecture

                -   Software

                    -   10GE pipeline SW Architecture

                -   Hardware

                    -   Capture Pipeline HW Architecture

                    -   10GE Pipeline HW Architecture

            -   Tutorials

                -   How to integrate Framos and Euresys IPs

                -   How to tune SLVS-EC camera sensor

            -   Others

                -   Debugging steps

                -   Known issues

            -   Licensing

                -   Details on how to get Framos and Euresys IPs license

Overview of Sensor to Image 10G GigE Vision Pipeline IPs

![Block diagram of the SLVS-EC GigE Vision camera design](media/block_diagram.png)

Figure 1: Block diagram of the SLVS-EC GigE Vision camera design

The SLVS-EC Machine Vision application on Kria KR260 board demonstrates
the use of a Xilinx Zynq Ultrascale+ device together with Framos SLVS-EC
IP and Sensor to Image GigE Vision IP to build a machine vision
application according to the GigE Vision standard.

The design is done in Xilinx Vivado version 2022.1 with running
Petalinux on the Zynq ARM processor subsystem.

The design is built as BlockDesign, instantiates all the modules
required to

form fully functional GigE Vision camera. The design consists of
following modules:

■ CPU Processor system. This is a block instantiates and configures the
Zynq ARM CPU and AXI peripherals for interfacing the CPU to an external
code memory and the rest of the design. It configures also the AXI
Master Memory Controller, which provides access to external memory both
from CPU and framebuffer core side. With a high performance port, other
AXI masters like the framebuffer have access to the memory.

■ SLVS-EC video input. This module and respective submodules instantiate
the Framos SLVS-EC IP to interface the Sony IMX547 sensor, provide a
sensor configuration interface and decode the sensor SLVS-EC signals.
Output is an AXI stream, which is the input for the GigE Vision
streaming chain with the framebuffer as first block.

■ GigE framebuffer controller. This module operates as a special video
framebuffer which forms data packets for the GigE core. In this
application, image data are transferred in the GenICam GenDC format. It
handles also the packet resend feature (serving resend packets) of the
GigE Vision streaming protocol. It uses a Xilinx AXI interconnect to
interface to the AXI Master memory controller, which is part of the
processor system. Note that physical memory is shared between ARM and
framebuffer.

■ XGigE core. This module handles all the low-level networking features
to the rest of the system. It forms the GigE Vision stream channel and
provides networking interface for the CPU system.

■ 10Gigabit Ethernet MAC. This module is used in 10G systems for
controlling access to the medium.

■ PHY interface core. This module converts XGMII interface of XGMACcore
to high speed serial interface needed by physical interface. The
component is part of the Vivado IP catalog.

Resource Utilization

  -------------------------------------------------------------------------
  IP            LUT         FF          BRAM        DSP         GT
  ------------- ----------- ----------- ----------- ----------- -----------
  Framebuffer   6573        10239       14.5        1           0

  XGigE         3557        5601        10.5        0           0

  10G MAC       3572        2632        0           0           0

  PCS/PMA       2752        5010        0           0           1

  SLVS-EC       1192        1706        0           0           2

                                                                

                                                                
  -------------------------------------------------------------------------

Test Environment for 10GE

KR260 Board

Network card like

-   <https://www.amazon.com/dp/B01LZRSQM9?pd_rd_i=B01LZRSQM9&pd_rd_w=TcxxK&pf_rd_p=3465d0d7-4e28-4692-b633-326c458deaa4&pd_rd_wg=KlLZ9&pf_rd_r=DW3Z81ZGWVXPFSR0KAFN&pd_rd_r=68b63a0c-1d6b-4770-80e0-79ad47e1a511>
    (not tested yet at S2I)

-   <https://www.amazon.de/E10G42BTDA-10Gbps-Ethernet-Adapter-X520-da2/dp/B002I9L7PS/ref=sr_1_16?crid=3VYPG8MA3C5PL&dchild=1&keywords=intel+sfp%2B10g&qid=1621936558&sprefix=intel+sfp%2B%2Caps%2C195&sr=8-16>
    (might need Intel coded SFP+ modules)

Fiber Cable

-   <https://www.amazon.com/dp/B089K3VYZ1/ref=sspa_dk_detail_1?pd_rd_i=B0897B8SW7&pd_rd_w=OvoqM&pf_rd_p=5d846283-ed3e-4512-a744-a30f97c5d738&pd_rd_wg=Jh1DR&pf_rd_r=GC2RTS0AHW0JF70BFD4B&pd_rd_r=4f75d78a-f377-4749-bdcd-ee4a7c207f09&spLa=ZW5jcnlwdGVkUXVhbGlmaWVyPUExRzJBWlQxUFRVS1NOJmVuY3J5cHRlZElkPUEwNzA3NTk0Mzc2UUFFNUpRRTkwQyZlbmNyeXB0ZWRBZElkPUEwNDYxMzA0MlRPNjY3UllTV1RJVCZ3aWRnZXROYW1lPXNwX2RldGFpbF90aGVtYXRpYyZhY3Rpb249Y2xpY2tSZWRpcmVjdCZkb05vdExvZ0NsaWNrPXRydWU&th=1>

Two SFP+ Modules

-   <https://www.amazon.com/10Gtek-SFP-10G-SR-Transceiver-10GBASE-SR-300-meter/dp/B08BP55663/ref=pd_bxgy_img_2/143-6278076-9705018?_encoding=UTF8&pd_rd_i=B00U8Q7946&pd_rd_r=5e4b9782-8061-4262-8bc7-c59b5e76d816&pd_rd_w=izpJI&pd_rd_wg=XpNSU&pf_rd_p=fd3ebcd0-c1a2-44cf-aba2-bbf4810b3732&pf_rd_r=Z768SJSGXZWNJXANGWVW&refRID=Z768SJSGXZWNJXANGWVW&th=1>

Installation & Sphinx application Usage

-   See Manual Sphinx Viewer

GigE Vision application execution steps

(tbd)

10G GigE Vision pipeline SW Architecture

(tbd)

Capture Pipeline HW Architecture

(Karthik)

10G GigE Vision Pipeline HW Architecture

What is expected here? Architecture is already descripted above.

How to integrate Framos and Euresys IPs

Please contact Framos and Sensor to Image Sales and Support Team.

(the accelerated app doesn't include the Vivado design with all of its
cores)

Details on how to get Framos and Sensor to Image IPs license

Please contact Framos and Sensor to Image Sales and Support Team.
