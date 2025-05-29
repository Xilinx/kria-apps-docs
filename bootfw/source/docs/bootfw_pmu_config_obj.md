
# PMU Overlay Config Object

## Introduction

Kria Starter Kits pre-built firmware and software uses a hierarchical boot process to support SOM and its multiple possible carrier cards. This concept of incremental hardware configuration is used to have a common "SOM only" base configuration which is then extended after the carrier card (CC) hardware is identified. After CC identification, the CC specific peripherals are enabled inclusive of the MPSoC MIO based peripherals. The FSBL loads the "SOM only" PMU configuration object after which the Kria Starter Kit boot firmware then dynamically loads a "PMU object overlay" that extends the system configuration having the PMU enable the corresponding subsystems and physical pin mappings. In Kria Starter Kits, the CC identification and PMU configuration object overlay APIs are exercised as part of U-Boot.

## Reference Overlay Config Object

As an example, the overlay config object for KV260 and KR260 on top of "base SOM" configuration were created according to the following table. The top half of the table contains the MIO definition for the base SOM and a set of shared MIO configurations for all AMD Kria carrier cards. The bottom half of the table defines MIO that are different between KV260 and KR260 and are enabled via a PMU overlay configuration API.

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
* Binary file: [overlay_cfg_obj_kv260_v2.bin](./example_src/overlay_cfg_obj_kv260_v2.bin)
* Size of overlay config object base on object file: [overlay_cfg_obj_kv260_v2.o](./example_src/overlay_cfg_obj_kv260_v2.o)

  ``` text
  text    data     bss     dec     hex filename
    76       0       0      76      4c overlay_cfg_obj_kv260_v2.o
  ```

>**NOTE:** By default, permissions to load the next overlay config object are disabled for the KV260.

### KR260

* C-code: [overlay_cfg_obj_kr260_v2.c](./example_src/overlay_cfg_obj_kr260_v2.c)
* Binary file: [overlay_cfg_obj_kr260_v2.bin](./example_src/overlay_cfg_obj_kr260_v2.bin)
* Size of overlay config object base on object file: [overlay_cfg_obj_kr260_v2.o](./example_src/overlay_cfg_obj_kr260_v2.o)

  ``` text
  text    data     bss     dec     hex filename
    88       0       0      88      58 overlay_cfg_obj_kr260_v2.o
  ```

>**NOTE:** By default, permissions to load next overlay config object are disabled for the KR260.

## Steps to Create the Overlay Config Object

1. Use the template, [Template_for_overlay_config_object_v2.c](./example_src/Template_for_overlay_config_object_v2.c), as base.
    * Refer to enum XPmNodeId in template for existing node-IDs
    * Refer to the Enumeration XPmNodeId Values chapter in the *Standalone Library Documentation: BSP and Libraries Document Collection* ([UG643](https://docs.amd.com/go/en-US/oslib_rm)) for new node-IDs in future releases.
2. Modify the template as per requirement.
    * Update the neededumber of slaves value in slave section based on how many device/slave you want to add in the overlay config object.
    * Add details for the device/slave in the slave section.
      * Each device/slave required three device/slave details as Node-Id, Flag, and IPI mask.

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

      * Modify the device's/slave's Node-Id value as per your requirements.
    * Add permission details for the loading of the next overlay config object.
      * Provide the IPI Mask for masters with ORed as per your requirements.

3. Generate the binary file from the C-code file using the command given in the "Command to Create Binary File from the C File" section.

### Example

Examples to modify the slave section:

* Example: Only a single device/slave is present in the overlay config object.

  ``` text
  /* SLAVE SECTION */
  
  PM_CONFIG_SLAVE_SECTION_ID, /* Section ID */
  1,              /* Number of slaves */
  
  NODE_UART_1,
  PM_SLAVE_FLAG_IS_SHAREABLE,
  PM_CONFIG_IPI_PSU_CORTEXA53_0_MASK | PM_CONFIG_IPI_PSU_CORTEXR5_0_MASK | PM_CONFIG_IPI_PSU_CORTEXR5_1_MASK, /* IPI Mask */
  ```

* Example: A total of three devices/slaves are present in the overlay config object.

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
  
Examples to modify the set config section:

* Example: None of the masters have permission to load the next overlay config object.
  >**NOTE:** The loading of infinite overlay config objects is not secure and not system friendly. Therefore, at some time the script should disable the changing of configs.

  ``` text
  /* SET CONFIG SECTION */
  PM_CONFIG_SET_CONFIG_SECTION_ID,
  0U, /*  Loading permission to Overlay config object */
  ```

* Example: Only APU masters have permission to load the next overlay config object.

  >**NOTE:** The APU subsystem gets represented by CORTEXA53_0 in the base config, so CORTEXA53_1 is not listed in the base config and CORTEXA53_0 is not needed in the overlay config.

    ``` text
    /* SET CONFIG SECTION */
    PM_CONFIG_SET_CONFIG_SECTION_ID,
    PM_CONFIG_IPI_PSU_CORTEXA53_0_MASK, /*  Loading permission to Overlay config object */
    ```

* Example: Both APU and RPU masters have permission to load the next overlay config object.
  
  ``` text
  /* SET CONFIG SECTION */
  PM_CONFIG_SET_CONFIG_SECTION_ID,
  PM_CONFIG_IPI_PSU_CORTEXA53_0_MASK | PM_CONFIG_IPI_PSU_CORTEXR5_0_MASK | PM_CONFIG_IPI_PSU_CORTEXR5_1_MASK, /*  Loading permission to Overlay config object */
  ```

## Commands to Create the Binary file from the C File

Run the following commands in sequence to generate the binary file from the C file.

``` shell
gcc -c -nostdlib -nostartfiles -nodefaultlibs <overlay-config-object.c> -o <overlay-config-object.o>
objcopy -O binary <overlay-config-object.o> <overlay-config-object.bin>
```

>**NOTE:** The generated binary file only works on a little endian tool-chain.

## Set Permission to Load the Overlay Config Object from the Base Config

* The base config is autogenerated as part of the FSBL build. For reference, the source code of the base config can be found [here](https://github.com/Xilinx/embeddedsw/tree/master/lib/sw_apps/zynqmp_fsbl/misc/som/pm_cfg_obj.c).
  >**NOTE:** The base config contains many more sections than the overlay config.
* By default, permissions to load the overlay config object are disabled for all masters (APU/RPU0/RPU1).
* To load the overlay config object, enable the permission for the required master using the following listed BSP config flags during the FSBL build. For more details about the bsp config refer to the *Vitis Unified Software Platform Documentation: Embedded Software Development* ([UG1400]( https://docs.amd.com/go/en-US/ug1400-vitis-embedded)).
* Flags
  * Provide permission to the APU master: `apu_as_overlay_config_master`

    ``` shell
    bsp config apu_as_overlay_config_master "true"
    ```

  * Provide permission to the RPU0 master: `rpu0_as_overlay_config_master`

    ``` shell
    bsp config rpu0_as_overlay_config_master "true"
    ```

  * Provide permission to the RPU1 master: `rpu1_as_overlay_config_master`

    ``` shell
    bsp config rpu1_as_overlay_config_master "true"
    ```
  
## Loading Overlay Config Object in U-Boot

To load the overlay config object at the U-Boot level, use the following command at U-Boot on target:

``` shell
zynqmp pmufw <address> <size>
```

* address: Provide the address for the memory-location from where you want to load the overlay config object.
* size: Provide the size of the overlay config object you want to load.

In the Starter Kit flow, U-Boot dynamically creates, uses, and destroys the overlay config object. Example code can be found [here](https://github.com/Xilinx/u-boot-xlnx/blob/master/drivers/firmware/firmware-zynqmp.c). When you create your own customer carrier card and boot flow, you can dynamically generate your config object, or create it statically, put it on target, and load it as above.

U-Boot performs an inter-processor interrupt (IPI) call to the PMU with a runtime API to enable the object overlay. The ```SET_CONFIGURATION``` API is documented in the *Embedded Energy Management Interface [EEMI API Reference Guide]* ([UG1200](https://docs.amd.com/go/en-US/ug1200-eemi-api)), and an example call can also be found [here](https://github.com/Xilinx/u-boot-xlnx/blob/master/drivers/firmware/firmware-zynqmp.c).

<hr class="sphinxhide"></hr>

<p class="sphinxhide" align="center"><sub>Copyright © 2023-2025 Advanced Micro Devices, Inc.</sub></p>

<p class="sphinxhide" align="center"><sup><a href="https://www.amd.com/en/corporate/copyright">Terms and Conditions</a></sup></p>
