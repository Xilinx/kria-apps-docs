
# Boot Firmware - PMU Overlay Config Object

## Introduction

For Kria Starter Kits pre-built firmware and software, Xilinx uses a hierarchical boot process in order to support SOM and its multiple possible carrier cards. This concept of incremental HW configuration is used to have a common "SOM only" base configuration which is then extended after the carrier card (CC) hardware is identified. After CC identification the CC specific peripherals are enabled inclusive of the MPSoC MIO based peripherals. The FSBL loads the "SOM only" PMU configuration object after which the Kria Starter Kit boot FW then dynamically loads a "PMU object overlay" that extends the system configuration having PMU enable the corresponding subsystems and physical pin mappings. In Kria Starter Kits the CC identification and PMU configuration object overlay APIs are exercised as part of U-Boot.

## Reference Overlay Config Object

As an example, the overlay config object for KV260 and KR260 on top of "base SOM" configuration were created according to the table below. The top half of the table contains MIO definition for the base SOM and a set of shared MIO configurations for all Xilinx Kria carrier cards. The bottom half of the table defines MIO that are different between KV260 and KR260 and are enabled via a PMU overlay configuration API.

|               Interface Name              |                 Interface Type                 | Device Location |  KV260 |  KR260 |
|:-----------------------------------------:|:----------------------------------------------:|:---------------:|:------:|:------:|
|                 DDR Memory                |           PS DDR Controller (4GB DD4)          |       SOM       |   Yes  |   Yes  |
|                    QSPI                   |                    MIO QSPI                    |       SOM       |   Yes  |   Yes  |
|                    LEDs                   |                    MIO GPIO                    |       SOM       |   Yes  |   Yes  |
|                   TPM2.0                  |                    MIO SPI1                    |       SOM       |   Yes  |   Yes  |
|                 SOM EEPROM                |                MIO I2C1 Sys Bus                |       SOM       |   Yes  |   Yes  |
|                Dialog PMICs               |                MIO I2C1 Sys Bus                |       SOM       |   Yes  |   Yes  |
|                 CC EEPROM                 |                MIO I2C1 Sys Bus                |   Carrier Card  |   Yes  |   Yes  |
|               SOM Power Mon               |                MIO I2C1 Sys Bus                |   Carrier Card  |   Yes  |   Yes  |
|              FW Update Enable             |                    MIO GPIO                    |   Carrier Card  |   Yes  |   Yes  |
|                   UART1                   |                    MIO UART1                   |   Carrier Card  |   Yes  |   Yes  |
|                                           | **Different Per Board / Applied as overlays**      |
|                    USB0                   | GTR(x1) & MIO, Diff RefClk & PHY reset mapping |   Carrier Card  |   Yes  |   Yes  |
|                DisplayPort                |           GTR (x1 or x2) & MIO DP_AUX          |   Carrier Card  | 2 Lane | 1 Lane |
|                    USB1                   |        GTR(x1) & MIO, PHY Reset on MODE        |   Carrier Card  |   No   |   Yes  |
|                    SD1                    |                  MicroSD on CC                 |   Carrier Card  |   Yes  |   No   |
|                    GEM3                   |              MIO Ethernet (RGMII)              |   Carrier Card  |   Yes  |   No   |
|                    GEM1                   |              MIO Ethernet (RGMII)              |   Carrier Card  |   No   |   Yes  |
|                    GEM0                   |              GTR  Ethernet (SGMII)             |   Carrier Card  |   No   |   Yes  |

### KV260

* C-code: [overlay_cfg_obj_kv260_v2.c](./example_src/overlay_cfg_obj_kv260_v2.c)
* binary file: [overlay_cfg_obj_kv260_v2.bin](./example_src/overlay_cfg_obj_kv260_v2.bin)
* Size of Overlay config object base on object file: [overlay_cfg_obj_kv260_v2.o](./example_src/overlay_cfg_obj_kv260_v2.o)

  ``` text
  text    data     bss     dec     hex filename
    76       0       0      76      4c overlay_cfg_obj_kv260_v2.o
  ```

* Note: Permission to load next overlay config object are disabled by default for KV260.

### KR260

* C-code: [overlay_cfg_obj_kr260_v2.c](./example_src/overlay_cfg_obj_kr260_v2.c)
* binary file: [overlay_cfg_obj_kr260_v2.bin](./example_src/overlay_cfg_obj_kr260_v2.bin)
* Size of Overlay config object base on object file: [overlay_cfg_obj_kr260_v2.o](./example_src/overlay_cfg_obj_kr260_v2.o)

  ``` text
  text    data     bss     dec     hex filename
    88       0       0      88      58 overlay_cfg_obj_kr260_v2.o
  ```

* Note: Permission to load next overlay config object are disabled by default for KR260.

## Steps to create Overlay Config Object

1. Use template [Template_for_overlay_config_object_v2.c](./example_src/Template_for_overlay_config_object_v2.c) as base.
    * Refer to enum XPmNodeId in template for existing node-IDs
    * Refer to chapter Enumeration XPmNodeId Values in [UG643](https://china.xilinx.com/support/documentation/sw_manuals/xilinx2021_1/oslib_rm.pdf) for new node-IDs in future releases.
2. Modify the template as per requirement.
    * Developers need to update the Number of slaves value in slave section based on how many device/slave they want to add in overlay config object.
    * Add detailed for device/slave in slave section,
      * Each device/slave required three device/slave details as Node-Id, Flag and IPI mask.

      ``` text
      < Device Node Id >,
      < Flag >,
      < IPI mask >,
      ```

      * Flag and IPI mask are hard coded here.

      ``` text
      Flag = PM_SLAVE_FLAG_IS_SHAREABLE,
      IPI mask = PM_CONFIG_IPI_PSU_CORTEXA53_0_MASK | PM_CONFIG_IPI_PSU_CORTEXR5_0_MASK | PM_CONFIG_IPI_PSU_CORTEXR5_1_MASK,
      ```

      * User needs to modify the device's/slave's Node-Id value as per requirement.
    * Add permission details for the loading of next overlay config object.
      * User needs to provide IPI Mask for masters with ORed as per requirement.

3. Generate the binary file from C-code file using command given in "Command to create binary file from c file" section.

### Example

Please find the following examples to modify slave section:

* Example: Only single device/slave is present in overlay config object.

  ``` text
  /* SLAVE SECTION */
  
  PM_CONFIG_SLAVE_SECTION_ID, /* Section ID */
  1,              /* Number of slaves */
  
  NODE_UART_1,
  PM_SLAVE_FLAG_IS_SHAREABLE,
  PM_CONFIG_IPI_PSU_CORTEXA53_0_MASK | PM_CONFIG_IPI_PSU_CORTEXR5_0_MASK | PM_CONFIG_IPI_PSU_CORTEXR5_1_MASK, /* IPI Mask */
  ```

* Example: Total 3 devices/slaves are present in overlay config object.

  ``` text
  /* SLAVE SECTION */
  PM_CONFIG_SLAVE_SECTION_ID, /* Section ID */
  3,              /* Number of slaves */
  
  NODE_UART_1,
  PM_SLAVE_FLAG_IS_SHAREABLE,
  PM_CONFIG_IPI_PSU_CORTEXA53_0_MASK | PM_CONFIG_IPI_PSU_CORTEXR5_0_MASK | PM_CONFIG_IPI_PSU_CORTEXR5_1_MASK, /* IPI Mask */
  
  NODE_USB_0,
  PM_SLAVE_FLAG_IS_SHAREABLE,
  PM_CONFIG_IPI_PSU_CORTEXA53_0_MASK | PM_CONFIG_IPI_PSU_CORTEXR5_0_MASK | PM_CONFIG_IPI_PSU_CORTEXR5_1_MASK, /* IPI Mask */
   
  NODE_ETH_0,
  PM_SLAVE_FLAG_IS_SHAREABLE,
  PM_CONFIG_IPI_PSU_CORTEXA53_0_MASK | PM_CONFIG_IPI_PSU_CORTEXR5_0_MASK | PM_CONFIG_IPI_PSU_CORTEXR5_1_MASK, /* IPI Mask */
  ```
  
Please find the following examples to modifiy set config section

* Example: None of the masters has permission to load next overlay config object. (Note: Loading of infinite overlay config object is not secure and not system friendly. Therefore att some time script should disable changing of configs).

  ``` text
  /* SET CONFIG SECTION */
  PM_CONFIG_SET_CONFIG_SECTION_ID,
  0U, /*  Loading permission to Overlay config object */
  ```

* Example: Only APU masters has permission to load next overlay config object. (Note: APU subsystem gets represented by CORTEXA53_0 in base config, So CORTEXA53_1 is not listed in base config and CORTEXA53_0 is not needed in overlay config)

  ``` text
  /* SET CONFIG SECTION */
  PM_CONFIG_SET_CONFIG_SECTION_ID,
  PM_CONFIG_IPI_PSU_CORTEXA53_0_MASK, /*  Loading permission to Overlay config object */
  ```

* Example: Both APU and RPU masters has permission to load next overlay config object.
  
  ``` text
  /* SET CONFIG SECTION */
  PM_CONFIG_SET_CONFIG_SECTION_ID,
  PM_CONFIG_IPI_PSU_CORTEXA53_0_MASK | PM_CONFIG_IPI_PSU_CORTEXR5_0_MASK | PM_CONFIG_IPI_PSU_CORTEXR5_1_MASK, /*  Loading permission to Overlay config object */
  ```

## Commands to create binary file from c file

Run below commands in sequence to generate the binary file from c-file

``` shell
gcc -c -nostdlib -nostartfiles -nodefaultlibs <overlay-config-object.c> -o <overlay-config-object.o>
objcopy -O binary <overlay-config-object.o> <overlay-config-object.bin>
```

Note: Generated binary file work only on little endian tool-chain.

## Set Permission to load Overlay config object from Base config

* Base config is auto generated as part of fsbl build. For reference, the source code of base config can be found [here](https://github.com/Xilinx/embeddedsw/tree/master/lib/sw_apps/zynqmp_fsbl/misc/som/pm_cfg_obj.c), please note that base config contains many more sections than overlay config
* By default permission to load overlay config object are disabled for all masters(APU/RPU0/RPU1).
* To load overlay config object enable the permission for required master by use of below listed BSP config flags during FSBL build. Please refer to [UG1400](https://docs.xilinx.com/r/en-US/ug1400-vitis-embedded/bsp-config) for more details about bsp config.
* Flags
  * Provide permission to APU master: apu_as_overlay_config_master

    ``` shell
    bsp config apu_as_overlay_config_master "true"
    ```

  * Provide permission to RPU0 master: rpu0_as_overlay_config_master

    ``` shell
    bsp config rpu0_as_overlay_config_master "true"

    ```

  * Provide permission to RPU1 master: rpu1_as_overlay_config_master

    ``` shell
    bsp config rpu1_as_overlay_config_master "true"
    ```
  
## Loading Overlay Config Object in U-Boot

To load overlay config object at U-Boot level use below command at U-Boot on target:

``` shell
zynqmp pmufw <address> <size>
```

* address: Provide address for the memory-location from where wants to load the overlay config object.
* size: Provide size of the overlay config object which wants to load.

In Starter kit flow, U-Boot dynamically create , use and destroy the overlay config object. Example code can be found [here](https://github.com/Xilinx/u-boot-xlnx/blob/master/drivers/firmware/firmware-zynqmp.c). When developers create their own customer carrier card and boot flow, they can dynamically generate their config object, or create it statically and put it on target and load it as above.

U-boot will perform IPI (inter-processor interrupt) call to PMU with run time API to enable the object overlay. The ```SET_CONFIGURATION``` API is documented in [ug1200](https://docs.xilinx.com/v/u/en-US/ug1200-eemi-api ) and an example call can be found [here](https://github.com/Xilinx/u-boot-xlnx/blob/master/drivers/firmware/firmware-zynqmp.c) as well.

## License

Licensed under the Apache License, Version 2.0 (the "License"); you may not use this file except in compliance with the License.

You may obtain a copy of the License at
[http://www.apache.org/licenses/LICENSE-2.0](http://www.apache.org/licenses/LICENSE-2.0)

Unless required by applicable law or agreed to in writing, software distributed under the License is distributed on an "AS IS" BASIS, WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied. See the License for the specific language governing permissions and limitations under the License.

<p align="center">Copyright&copy; 2021 Xilinx</p>
