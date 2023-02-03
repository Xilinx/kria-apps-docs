# Kria SOM EEPROM Design Guide

## Kria SOM EEPROM Overview

This document covers Kria SOMs and its associated carrier card hardware platform's EEPROM content, which are based on the IPMI specification. The information in  EEPROM defines platform information that allows the system to be identified by software. The Intelligent Platform Management Interface (IPMI) is a set of computer interface specifications for an autonomous computer subsystem that provides management and monitoring capabilities independently of the host system's CPU, firmware (BIOS or UEFI) and operating system. Xilinx EEPROM configuration build on top of the [IPMI Platform Management FRU Information Storage Definition v1.0](https://www.intel.com/content/dam/www/public/us/en/documents/specification-updates/ipmi-platform-mgt-fru-info-storage-def-v1-0-rev-1-3-spec-update.pdf) and a Xilinx specific, internal EEPROM Definition specification.

## EEPROM Information

SOM and SOM CC EEPROM device details:


- Size: 64K bits (8K bytes)
- I2C address:
    - SOM-7’b101_0000(0x50)
    - Carrier Card –7’b101-0001(0x51)

To readout EEPROM in Linux:

``` shell
sudo hexdump -C /sys/devices/platform/axi/ff030000.i2c/i2c-1/1-0050/eeprom # Reads out SOM EEPROM
sudo hexdump -C /sys/devices/platform/axi/ff030000.i2c/i2c-1/1-0051/eeprom # Reads out CC EEPROM
```

To readout EEPROM, in u-boot:

``` shell
i2c dev 1;
i2c md 0x50 0.2 0x100 # Reads out SOM EEPROM
i2c md 0x51 0.2 0x100 # Reads out CC EEPROM
```

## Record Type Summary for Kria SOM and Xilinx Carrier Cards

There are two record types in Kria SOM EEPROM - standard record type that follows IPMI specification, and OEM (original equipment manufacturer) record type that is specified by Xilinx. Developer of SOM carrier cards (OEM) are expected to fill in their carrier card specific information aligning to standard or OEM record types. The following tables list the record areas for SOM and CC to show the order which they are presented in.

Kria SOM (K26) and EEPROM Record Area Summary:

| Record Area                     | Record Type                                  |
|---------------------------------|----------------------------------------------|
| Common Header                   | IPMI Standard, refer to table 8-1 in [IPMI Spec](https://www.intel.com/content/dam/www/public/us/en/documents/specification-updates/ipmi-platform-mgt-fru-info-storage-def-v1-0-rev-1-3-spec-update.pdf) |
| Board Info Area                 | IPMI Standard, refer to table 11-1 in [IPMI Spec](https://www.intel.com/content/dam/www/public/us/en/documents/specification-updates/ipmi-platform-mgt-fru-info-storage-def-v1-0-rev-1-3-spec-update.pdf) |
| DC Load MultiRecord             | IPMI Standard, refer to table 16-1 and  18-4 in [IPMI Spec](https://www.intel.com/content/dam/www/public/us/en/documents/specification-updates/ipmi-platform-mgt-fru-info-storage-def-v1-0-rev-1-3-spec-update.pdf) |
| SOM MAC Addr MultiRecord        | IPMI OEM Record, refer to table in [MAC Addr MultiRecords](#mac-addr-multirecords) |
| SOM Memory Config MultiRecord   | IPMI OEM Record, refer to table in [Memory Config MultiRecord](#memory-config-multirecord) |

KV Carrier Card:

| Record Area                     | Record Type                                   |
|---------------------------------|-----------------------------------------------|
| Common Header                   | IPMI Standard, refer to table 8-1 in [IPMI Spec](https://www.intel.com/content/dam/www/public/us/en/documents/specification-updates/ipmi-platform-mgt-fru-info-storage-def-v1-0-rev-1-3-spec-update.pdf) |
| Board Info Area                 | IPMI Standard, refer to table 11-1 in [IPMI Spec](https://www.intel.com/content/dam/www/public/us/en/documents/specification-updates/ipmi-platform-mgt-fru-info-storage-def-v1-0-rev-1-3-spec-update.pdf) |
| DC Load MultiRecord             | IPMI Standard, refer to table 16-1 and  18-4 in [IPMI Spec](https://www.intel.com/content/dam/www/public/us/en/documents/specification-updates/ipmi-platform-mgt-fru-info-storage-def-v1-0-rev-1-3-spec-update.pdf) |

KR Carrier Card:

| Record Area                     | Record Type                                  |
|---------------------------------|----------------------------------------------|
| Common Header                   | IPMI Standard, refer to table 8-1 in [IPMI Spec](https://www.intel.com/content/dam/www/public/us/en/documents/specification-updates/ipmi-platform-mgt-fru-info-storage-def-v1-0-rev-1-3-spec-update.pdf) |
| Board Info Area                 | IPMI Standard, refer to table 11-1 in [IPMI Spec](https://www.intel.com/content/dam/www/public/us/en/documents/specification-updates/ipmi-platform-mgt-fru-info-storage-def-v1-0-rev-1-3-spec-update.pdf) |
| DC Load MultiRecord             | IPMI Standard, refer to table 16-1 and  18-4 in [IPMI Spec](https://www.intel.com/content/dam/www/public/us/en/documents/specification-updates/ipmi-platform-mgt-fru-info-storage-def-v1-0-rev-1-3-spec-update.pdf) |
| CC MAC Addr MultiRecord         | IPMI OEM Record, refer to table in [MAC Addr MultiRecords](#mac-addr-multirecords)              |
| CC EtherCAT Addr MultiRecord    | IPMI OEM Record, refer to table in [MAC Addr MultiRecords](#mac-addr-multirecords)              |

## IPMI-defined Record Fields

For IPMI standard record type, refer to [IPMI specification](https://www.intel.com/content/dam/www/public/us/en/documents/specification-updates/ipmi-platform-mgt-fru-info-storage-def-v1-0-rev-1-3-spec-update.pdf) to determine field meaning and determine how to fill in those fields. They must be IPMI-compliant.

## IPMI OEM Xilinx-defined Record Fields

For IPMI OEM Record, they are free-form in IPMI Specification. The SOM and CC from Xilinx uses Xilinx-defined format for those record, which custom CC vendor can choose to reference and/or use their own definition.

### Board Info Area Record Custom Mfg Info

In the Board Info Area Record for Kria SOM and its carrier card, there are additional custom Mfg. Info fields. They are defined by Xilinx as following, but a carrier card manufactured can use the field anyway they like.

|     Start   Location    |     Length   (in Bytes)    |     Description                   |     Stored Format    | Notes                                                                                                                                            |
|-------------------------|----------------------------|-----------------------------------|----------------------|--------------------------------------------------------------------------------------------------------------------------------------------------|
|     0x43                |     1                      |     Revision Type-Length          |     Binary           | Bits 7:6 - format<br> 11 indicates ASCII<br>Bits 5:0 - length                                                                                    |
|     0x44                |     8                      |     Revision Number               |     ASCII            | Indicates the board PWA revision capturing PCB + BOM + rework level. Unused Bytes are 0x0 filled. Value assigned at time of board manufacturing. |
|     0x4C                |     1                      |     PCIe Info Type/length byte    |     Binary           | Bits 7:6 - format<br> 00 indicates Binary <br>Bits 5:0 - length                                                                                  |
|     0x4D                |     8                      |     PCIe Info                     |     Binary           | Vendor ID – 2 bytes<br>Device ID – 2 bytes<br>SubVendor ID – 2 bytes<br>SubDevice ID – 2 bytes                                                   |
|     0x55                |     1                      |     UUID Type/length byte         |     Binary           | Bits 7:6 - format<br> 00 indicates Binary <br>Bits 5:0 - length                                                                                  |
|     0x56                |     16                     |     UUID                          |     Binary           | UUID. Universal Unique Identifier. SOM use this field with random UUID to support customer implemented device enrollment functionalities.        |

### MAC Addr MultiRecords

The SOM MAC Addr MultiRecord is a OEM Record of type 0xD2 ("Xilinx MAC Addr Multi Record" defined by Xilinx), manufacturer of Carrier card can choose to follow the same format to define their MAC address, but its not required.

This is the Xilinx definition for its MAC Addr MultiRecord.

| Size (in Bytes) | Data Description           |     Stored Format    | Notes                                                                                                            |
|-----------------|----------------------------|----------------------|------------------------------------------------------------------------------------------------------------------|
| 1               |     Record   Type (OEM)    |     Binary           | OEM Record - set to 0xD2 (free form format)                                                                      |
| 1               |     Type                   |     Binary           | set to 0x02 or 0x82 (Bit 7 on means last record)                                                                 |
| 1               |     Length                 |     Binary           | Data length starting after Header Check Sum to end of record - this indicates how many MAC ID fields are present |
| 1               |     Record Check Sum       |     Binary           | Sum over bytes after Header Checksum plus this checksum should equal 00.                                         |
| 1               |     Header Check Sum       |     Binary           | Sum over last 4 bytes plus this checksum = 00.                                                                   |
| 3               |     IANA ID                |     Binary           | Internet Assigned Numbers Authority                                                                              |
| 1               |     Version Number         |     Binary           | Version number - 0x31 for Device Under Test for characterization/ evaluation MAC ID’s                            |
| 6               |     MAC ID 0               |     Binary           | MAC ID                                                                                                           |
| 6               |     MAC ID 1               |     Binary           | MAC ID - if Length field is 16 or greater                                                                        |
| 6               |     MAC ID 2               |     Binary           | MAC ID - if length field is 22 or greater                                                                        |
| 6               |     MAC ID 3               |     Binary           | MAC ID - if length field is 28 or greater                                                                        |


While the SOM itself support only 1 MAC ID for  PS primary Ethernet, each CC card have different numbers of MAC IDs dependent on how many Ethernet PHYs are put on the CC.

SOM EEPROM for this entry has a length of 0x0A (10) and have the following MAC ID definition:

| Data Description | Notes                                     |
|------------------|-------------------------------------------|
|     MAC ID 0     | SOM PS Primary Ethernet MAC ID            |

The SCK-KV-G carrier card only supports a single SOM driven Ethernet interface. Therefore, an incremental MAC Address record is not required.

The SCK-KR-G carrier card has 3 additional Ethernet interface (4 total including the SOM-driven one), thus EEPROM for this entry has a length of 0x16 (22) and have the following MAC ID definition:

| Data Description | Notes                               |
|------------------|-------------------------------------|
|     MAC ID 0     | SOM PS secondary Ethernet #1 MAC ID |
|     MAC ID 1     | SOM PL Ethernet #0 MAC ID           |
|     MAC ID 2     | SOM PL Ethernet #1 MAC ID           |

### Memory Config MultiRecord

The Xilinx Free Form Record with OEM record type 0xD3 is for "Xilinx Memory Config MultiRecord" and free form. manufacturer of Carrier card can choose to have a record following the same format but it is not required.

|Start location (hex) | Length(in decimal Bytes) |      Data Description                                                             |      Stored Format     |      Notes                                                                                                                                                           |
|---------------------|--------------------------|-----------------------------------------------------------------------------------|------------------------|----------------------------------------------------------------------------------------------------------------------------------------------------------------------|
|     0x89            |     1                    |     Record   Type (OEM)                                                           |     Binary             |     Set to 0xD3                                                                                                                                                      |
|     0x8A            |     1                    |     Record Format                                                                 |     Binary             |     set to 0x02 or 0x82 (Bit 7 on means last record)                                                                                                                 |
|     0x8B            |     1                    |     Length                                                                        |     Binary             |     length of data after Header Checksum - 0x57 (87) for   K26 SOM                                                                                               |
|     0x8C            |     1                    |     Record Check Sum                                                              |     Binary             |     Sum over bytes after Header Checksum plus   this checksum should equal 00.                                                                                       |
|     0x8D            |     1                    |     Header Check Sum                                                              |     Binary             |     Sum over last 4 bytes plus this checksum should   equal 00.                                                                                                      |
|     0x8E            |     3                    |     IANA ID                                                                       |     Binary             |     (Internet Assigned Numbers Authority)                                                                                                                            |
|     0x91            |     8                    |     “Memory: “                                                                    |     ASCII              |     Memory Type Field Name identifier.                                                                                                                               |
|     0x99            |     12                   |     Primary boot device memory definition<br>e.g. “QSPI:512Mb”                    |     ASCII              |     Describes primary NV memory device. If no primary   device note “None”. <br>Unused characters are spaces: 0x20 <br> “b”   means bit, “B” means byte              |
|     0xA5            |     1                    |     Memory Type Field end                                                         |     Binary             |     Set to 0x00                                                                                                                                                      |
|     0xA6            |     8                    |     “Memory: ”                                                                    |     ASCII              |     Memory Type Field Name identifier.                                                                                                                               |
|     0xAE            |     12                   |     SOM secondary boot device memory <br>e.g. “eMMC:16GB” <br>e.g. “eMMC:32GB”    |     ASCII              |     Describes secondary NV memory device. If no   secondary boot device note “None”. <br> Unused characters are spaces:   0x20 <br> “b” means bit, “B” means byte    |
|     0xBA            |     1                    |     Memory Type Field end                                                         |     Binary             |     Set to 0x00                                                                                                                                                      |
|     0xBB            |     8                    |     “Memory: ”                                                                    |     ASCII              |     Memory Type Field Name identifier.                                                                                                                               |
|     0xC3            |     12                   |     SOM PS DDR memory<br>e.g. “PSDDR4:4GB”<br>e.g. “PSDDR4:2GB”                   |     ASCII              |     Describes PS MIO based DDR configuration. If no PS   DDR note “None”. <br> Unused characters are spaces: 0x20 <br> “b”   means bit, “B” means byte               |
|     0xCF            |     1                    |     Memory Type Field end                                                         |     Binary             |     Set to 0x00                                                                                                                                                      |
|     0xD0            |     8                    |     “Memory: ”                                                                    |     ASCII              |     Memory Type Field Name identifier.                                                                                                                               |
|     0xD8            |     12                   |     SOM PL DDR memory <br>e.g. “PLDDR4:None”                                      |     ASCII              |     Describes PL based DDR configuration. If no PL DDR   note “None”. <br> Unused characters are spaces: 0x20 <br> “b”   means bit, “B” means byte                   |
|     0xE4            |     1                    |     Memory Type Field end                                                         |     Binary             |     Set to 0x00                                                                                                                                                      |


#### License

Licensed under the Apache License, Version 2.0 (the "License"); you may not use this file except in compliance with the License.

You may obtain a copy of the License at
[http://www.apache.org/licenses/LICENSE-2.0](http://www.apache.org/licenses/LICENSE-2.0)

Unless required by applicable law or agreed to in writing, software distributed under the License is distributed on an "AS IS" BASIS, WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied. See the License for the specific language governing permissions and limitations under the License.

<p class="sphinxhide" align="center">Copyright&copy; 2023 Xilinx</p>
