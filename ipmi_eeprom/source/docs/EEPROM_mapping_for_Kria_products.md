# Kria SOM EEPROM Content

This page provides information on the EEPROM definition of Kria SOM products including SOM and its carrier cards. It follows the recommendation from [IPMI EEPROM design guide](./IPMI_EEPROM_design_guide.md) and can be referenced as an example for your own carrier card IPMI definition.

## SOM EEPROM Content

There are two versions of SOM EEPROM content because there was an update to the EEPROM layout to compress the footprint. The K26 SOM and K26 on KV260 Starter Kits use revision 1. K26 on KR260 Starter Kits use revision 2.

Kria SOM (K26) and EEPROM Record Area Summary:

### Version 1 (K26 production SOM, KV260 SOM)

| Record Area                     | Record Type                                  | Record Start | Record End |
|---------------------------------|----------------------------------------------| ------------ | ---------- |
| Common Header                   | IPMI Standard | 0x00 | 0x07 |
| Board Info Area                 | IPMI Standard | 0x08 | 0x67 |
| DC Load MultiRecord             | IPMI Standard | 0x68 | 0x79 |
| SOM MAC Addr MultiRecord        | IPMI OEM Record | 0x7A | 0x88 |
| SOM Memory Config MultiRecord   | IPMI OEM Record | 0x9B | 0xF6 |

### Version 2 (KR260 SOM)

| Record Area                     | Record Type                                  | Record Start | Record End |
|---------------------------------|----------------------------------------------| ------------ | ---------- |
| Common Header                   | IPMI Standard, refer to table 8-1 in [IPMI Spec](https://www.intel.com/content/dam/www/public/us/en/documents/specification-updates/ipmi-platform-mgt-fru-info-storage-def-v1-0-rev-1-3-spec-update.pdf) | 0x00 | 0x07 |
| Board Info Area                 | IPMI Standard, refer to table 11-1 in [IPMI Spec](https://www.intel.com/content/dam/www/public/us/en/documents/specification-updates/ipmi-platform-mgt-fru-info-storage-def-v1-0-rev-1-3-spec-update.pdf) | 0x08 | 0x67 |
| DC Load MultiRecord             | IPMI Standard, refer to table 16-1 and  18-4 in [IPMI Spec](https://www.intel.com/content/dam/www/public/us/en/documents/specification-updates/ipmi-platform-mgt-fru-info-storage-def-v1-0-rev-1-3-spec-update.pdf) | 0x68 | 0x79 |
| SOM MAC Addr MultiRecord        | IPMI OEM Record, refer to table in [MAC Addr MultiRecords](./IPMI_EEPROM_design_guide.md#mac-addr-multirecords) | 0x7A | 0x88 |
| SOM Memory Config MultiRecord   | IPMI OEM Record, refer to table in [Memory Config MultiRecord](./IPMI_EEPROM_design_guide.md#memory-config-multirecord) | 0x89 | 0xE4 |

### Mac Addr MultiRecord for K26

SOM EEPROM for its [MAC Addr MultiRecords](./IPMI_EEPROM_design_guide.md#mac-addr-multirecords) has 0x0A(10) in its length field and have the following MAC ID definition:

| Data Description | Notes                                     |
|------------------|-------------------------------------------|
|     MAC ID 0     | SOM PS Primary Ethernet MAC ID            |

## KV260 CC EEPROM Content

The following table shows the EEPROM record area summary for the KV260 carrier card:

| Record Area                     | Record Type   | Record Start | Record End |
|---------------------------------|---------------| ------------ | ---------- |
| Common Header                   | IPMI Standard, refer to table 8-1 in [IPMI Spec](https://www.intel.com/content/dam/www/public/us/en/documents/specification-updates/ipmi-platform-mgt-fru-info-storage-def-v1-0-rev-1-3-spec-update.pdf) | 0x00         | 0x07       |
| Board Info Area                 | IPMI Standard, refer to table 11-1 in [IPMI Spec](https://www.intel.com/content/dam/www/public/us/en/documents/specification-updates/ipmi-platform-mgt-fru-info-storage-def-v1-0-rev-1-3-spec-update.pdf) | 0x08         | 0x67       |
| DC Load MultiRecord             | IPMI Standard, refer to table 16-1 and  18-4 in [IPMI Spec](https://www.intel.com/content/dam/www/public/us/en/documents/specification-updates/ipmi-platform-mgt-fru-info-storage-def-v1-0-rev-1-3-spec-update.pdf) | 0x68         | 0x79       |

The SCK-KV-G carrier card only supports a single SOM driven Ethernet interface. Therefore, an incremental MAC Address record is not required.

## KR260 CC EEPROM Content

The following table shows the EEPROM record area summary for the KR260 carrier card.

| Record Area                     | Record Type     | Record Start | Record End |
|---------------------------------|-----------------| ------------ | ---------- |
| Common Header                   | IPMI Standard, refer to table 8-1 in [IPMI Spec](https://www.intel.com/content/dam/www/public/us/en/documents/specification-updates/ipmi-platform-mgt-fru-info-storage-def-v1-0-rev-1-3-spec-update.pdf)   | 0x00         | 0x07       |
| Board Info Area                 | IPMI Standard, refer to table 11-1 in [IPMI Spec](https://www.intel.com/content/dam/www/public/us/en/documents/specification-updates/ipmi-platform-mgt-fru-info-storage-def-v1-0-rev-1-3-spec-update.pdf)   | 0x08         | 0x67       |
| DC Load MultiRecord             | IPMI Standard, refer to table 16-1 and  18-4 in [IPMI Spec](https://www.intel.com/content/dam/www/public/us/en/documents/specification-updates/ipmi-platform-mgt-fru-info-storage-def-v1-0-rev-1-3-spec-update.pdf)   | 0x68         | 0x79       |
| CC MAC Addr MultiRecord         | IPMI OEM Record, refer to table in [MAC Addr MultiRecords](./IPMI_EEPROM_design_guide.md#mac-addr-multirecords) | 0x7A         | 0x94       |
| CC EtherCAT Addr MultiRecord    | IPMI OEM Record, refer to table in [EtherCat Addr MultiRecords](./IPMI_EEPROM_design_guide.md#ethercat-addr-multirecords) | 0x95         | 0xA1       |

The SCK-KR-G carrier card has 3 additional Ethernet interface (4 total including the SOM-driven one), thus EEPROM for its [MAC Addr MultiRecords](./IPMI_EEPROM_design_guide.md#mac-addr-multirecords) has 0x16 in its length field and have the following MAC ID definition:

| Data Description | Notes                               |
|------------------|-------------------------------------|
|     MAC ID 0     | SOM PS secondary Ethernet #1 MAC ID |
|     MAC ID 1     | SOM PL Ethernet #0 MAC ID           |
|     MAC ID 2     | SOM PL Ethernet #1 MAC ID           |

## EEPROM Binaries and Utilities

The EEPROM binaries used in Kria SOM products can be found in  [xlnx-board-id-data repo](https://github.com/Xilinx/xlnx-board-id-data/).

There is a Yocto recipe for an example Linux init script used in Kria Starter Kits that updates MAC address by getting the information from the Xilinx EEPROM MAC Address records. The script is located at [github](https://github.com/Xilinx/meta-som/tree/rel-v2022.2/recipes-bsp/misc-config).

## License

Licensed under the Apache License, Version 2.0 (the "License"); you may not use this file except in compliance with the License.

You may obtain a copy of the License at
[http://www.apache.org/licenses/LICENSE-2.0](http://www.apache.org/licenses/LICENSE-2.0)

Unless required by applicable law or agreed to in writing, software distributed under the License is distributed on an "AS IS" BASIS, WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied. See the License for the specific language governing permissions and limitations under the License.

<p class="sphinxhide" align="center">Copyright&copy; 2023 Xilinx</p>
