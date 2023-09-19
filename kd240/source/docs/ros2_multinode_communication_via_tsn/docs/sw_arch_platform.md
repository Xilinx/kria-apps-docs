# Software Architecture of the Platform

## Introduction

This section describes software components involved in the design and their relation with each other. The application requires hw platform as described in [Hardware Architecture of the Platform](./hw_arch_platform.md) for the stack explained in this section to work.

Following diagram illustrates the top-level architecture and arrangement of various software components:

![Software Architecture Overview](media/sw_arch_intro.png)]

- Operating System: Xilinx Linux kernel + Ubuntu env
  - Drivers:
    - Uart-rs485
    - set of tsn related drivers
- Libraries and Middleware
  - ModBus
  - ROS2
  - DDS
- Applications
  - tsn configurations utilities
  - tsn raw package application example
  - Linux ptp for clock sync
  - Pmod test application over rs485

The details of each individual component can be obtained though the reference at the end of this section. The scope of this document is with respect to what is being demonstrated through the example application.

The following list describes the top-level application functions:

- TSN demonstration
- ROS demonstration
- Modbus and RS485 demonstration

## TSN

Time-Sensitive Networking (TSN) is a set of standards under development by the Time-Sensitive Networking task group of the IEEE 802.1 working group. This standards allows low latency transmission and time-guaranteed packet delivery.

### Driver

Set of drivers used for the TSN solution is enabled in the staging area under `linux-xlnx/drivers/staging/xilinx-tsn`. These set of drivers provides TSN capability such as vlan,scheduled traffic, best effort traffic, ptp, QBV shaper, and so on using standard ethernet framework and IP route tools.

The details of the device tree for the driver can be found in the kernel documentation at `linux-xlnx/Documentation/devicetree/bindings/net/xilinx*tsn*.txt`.

Refer to [Xilinx TSN Solution](https://xilinx-wiki.atlassian.net/wiki/spaces/A/pages/25034864/Xilinx+TSN+Solution) for details of various features supported by Xilinx TSN drivers.

## ROS2

Robot Operating System (ROS) is a set of open source algorithms, hardware driver, software, and tools for developing robot control software. Contrary to its name, ROS is not an operating system but a library.

In a full-fledged ROS environment sensors in robots, motion controllers, detection, and navigation algorithms, and so on are all components of this distributed ROS architecture. Each individual component is referred as **Node**. ROS nodes (and applications) typically communicate through interfaces of one of three types: messages, services, and actions. ROS 2 uses a simplified description language, the interface definition language (IDL), to describe these interfaces. This description makes it easy for ROS tools to automatically generate the source code for the interface type in several target languages.

Topics are the elements of ROS2 that act as bus for nodes to exchange messages. In the simplest use case, the message is published by a node on a given topic. Anyone subscribed to that topic can receive the message.

![TopicSingleNode](media/Topic-SinglePublisherandSingleSubscriber.gif)

A node may publish data to any number of topics and simultaneously have subscriptions to any number of topics.

![TopicMultiNodes](media/Topic-MultiplePublisherandMultipleSubscriber.gif)

These nodes can be on the same system or distributed across systems. The biggest improvement ROS2 provides over ROS1 is how the communication is handled across various systems. ROS2 adopts the decentralized (as opposed to centralized in ROS1) DDS middleware. Instead of implementing its own DDS layer, ROS2 provides a middleware abstraction layer (rmw), which can be plugged on any standard DDS implementation.

### DDS

ROS 2 is built on top of DDS/RTPS as its middleware, which provides discovery, serialization, and transportation. DDS is an end-to-end middleware that provides features that are relevant to ROS systems, such as distributed discovery (not centralized like in ROS 1) and control over different “Quality of Service” options for the transportation. There are many independent DDS implementation by various vendors. ROS2's rmw abstraction allows to easily switch or adapt different implementations.

Following are supported DDS implementation for ROS2 humble release:

- eProsima Fast DDS (Default RMW)
- Eclipse Cyclone DDS
- RTI Connext DDS
- GurumNetworks GurumDDS

For this application, two separate nodes, one running as publisher and the other as subscriber on separate KR260 communicate over the TSN network. The underlying middleware is default to FastDDS.

#### DDS configuration

For demonstration, the message is sent as a scheduled traffic. The DDS is configured allow the message only from the whitelisted interface, which is set to have [vlan qos mapping](https://tsn.readthedocs.io/vlan.html) for all the outgoing traffic to be set as Scheduled Traffic (PCP=4).

For example,

```shell
ip link add link ep name ep.40 type vlan id 40 egress-qos-map 0:4
ip addr add 111.222.0.10/24 broadcast + dev ep.40
```

Now this new interface can be added to whitelist of the DDS configuration for the required topic through the xml configuration.

```shell
<transport_descriptor>
    <transport_id>UdpVLANTransport</transport_id>
    <type>UDPv4</type>
    <interfaceWhiteList>
        <address>111.222.0.10</address>
    </interfaceWhiteList>
</transport_descriptor>
```

For more information various possible configuration, refer to [fast dds configuration](https://fast-dds.docs.eprosima.com/en/latest/fastdds/ros2/ros2_configure.html).

## Modbus and RS485

Modbus is an open-source, client/server communication protocol widely used in remote monitoring, control, and robotic applications. Because of its simple message structure, it is easy to deploy. It supports multiple devices to be connected on the same bus and uses polling mechanism to acquire the status of each device on the bus.

Modbus data can be carried over serial ports or ethernet interface.

**Modbus RTU** (remote terminal unit), used in serial communication, is the most common implementation for modbus supporting devices. Modbus RTU makes use of a compact, binary representation of the data for protocol communication. The RTU format follows the commands/data with a cyclic redundancy check checksum as an error check mechanism to ensure the reliability of data.

**RS485** is a widely used serial communication standard, especially between the devices communicating over Modbus RTU protocol.

### Modbus RTU frame format

| Name     | Length (bits) | Function                                                                            |
|----------|---------------|-------------------------------------------------------------------------------------|
| Start    | 3.5 x 8       | At least 3+1⁄2 character times (28 bits) of silence (mark condition)                |
| Address  | 8             | Station address                                                                     |
| Function | 8             | Indicates the function code. For example, "read coils"                                       |
| Data     | n × 8         | Data + length will be filled depending on the message type                          |
| CRC      | 16            | Cyclic redundancy check                                                             |
| End      | 3.5 x 8       | At least 3+1⁄2 character times (28 bits) of silence (mark condition) between frames |

### Linux driver

In this application, uartlite IP in PL is patched to support RS485, by enabling/connect the DE line. To support this, there is a **uartlite-rs485** driver in the staging area. This driver is copy of original uartlite driver with additional advertised capability of RS485 support. No additional changes are required for the given IP patch.

This new driver requires different compatibility string and; hence, the original device tree node's compatible string needs to be overwritten as below.

```text
&axi_uartlite_0 {
        compatible = "xlnx,axi-uartlite-rs485";
};
```

### Modbus Library

**libmodbus** is a free software library to send/receive data according to the Modbus protocol. This library is written in C and supports RTU (serial) and TCP (Ethernet) communications. It is available on most of the platforms (OS) include Linux, FreeBSD, Mac, and Windows.

Once the required communication channel is established, the library takes care of converting the regular message in the modbus format.

### Application

To demonstrate Modbus and RS485 capability an example C application, pmdo-rs485-test is provided. The target device is modbus capable temperature sensor, connected over the pmod interface. See connection and hardware details in [Deployment](app_deployment.md) and [Hardware Arch](./hw_arch_platform.md) sections.

**pmod-rs485-test** is the application that uses libmodbus to:

- Create modbus RTU channel over uartlite-rs485 device
- Adjust response time
- Read Temperature and Humidity values from the sensor

## References

- [Xilinx TSN Solution](https://xilinx-wiki.atlassian.net/wiki/spaces/A/pages/25034864/Xilinx+TSN+Solution)
- [Xilinx TSN UserGuide](https://www.xilinx.com)
- [ROS2 Humble](https://docs.ros.org/)
- [eProsima fast DDS](https://fast-dds.docs.eprosima.com/en/latest/index.html)
- [Modbus](https://www.libmodbus.org/documentation/)
- [Modbus Protocol](https://www.modbus.org/specs.php)
- [RS485](https://en.wikipedia.org/wiki/RS-485)
- [Uartlite Driver](https://xilinx-wiki.atlassian.net/wiki/spaces/A/pages/18842249/Uartlite+Driver) (Original driver)

### Next Steps

- [Hardware Architecture of the Platform](hw_arch_platform.md)
- Go back to the [KR260 design start page](../ros2_multinode_communication_via_tsn_landing)

<!---

Licensed under the Apache License, Version 2.0 (the "License"); you may not use this file except in compliance with the License.

You may obtain a copy of the License at http://www.apache.org/licenses/LICENSE-2.0.

Unless required by applicable law or agreed to in writing, software distributed under the License is distributed on an "AS IS" BASIS, WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied. See the License for the specific language governing permissions and limitations under the License.

-->

<p class="sphinxhide" align="center">Copyright&copy; 2023 Advanced Micro Devices, Inc.</p>
