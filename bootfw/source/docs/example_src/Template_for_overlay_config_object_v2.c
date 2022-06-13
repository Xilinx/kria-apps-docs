/******************************************************************************
* Copyright (c) 2021 Xilinx, Inc.  All rights reserved.
* SPDX-License-Identifier: MIT
******************************************************************************/

/* Type of Config Object */
#define PM_CONFIG_OBJECT_TYPE_BASE	0x1U
#define PM_CONFIG_OBJECT_TYPE_OVERLAY	0x2U

/* Section Id */
#define PM_CONFIG_SLAVE_SECTION_ID	0x102U
#define PM_CONFIG_SET_CONFIG_SECTION_ID	0x107U

/* Flag Option */
#define PM_SLAVE_FLAG_IS_SHAREABLE	0x1U
#define PM_MASTER_USING_SLAVE_MASK	0x2U

/* IPI Mask for Master */
#define PM_CONFIG_IPI_PSU_CORTEXA53_0_MASK   0x00000001
#define PM_CONFIG_IPI_PSU_CORTEXR5_0_MASK    0x00000100
#define PM_CONFIG_IPI_PSU_CORTEXR5_1_MASK    0x00000200

/**
 * PM Node ID
 */
enum XPmNodeId {
	NODE_UNKNOWN = 0U,		/* 0x0  */
	NODE_APU = 1U,			/* 0x1  */
	NODE_APU_0 = 2U,		/* 0x2  */
	NODE_APU_1 = 3U,		/* 0x3  */
	NODE_APU_2 = 4U,		/* 0x4  */
	NODE_APU_3 = 5U,		/* 0x5  */
	NODE_RPU = 6U,			/* 0x6  */
	NODE_RPU_0 = 7U,		/* 0x7  */
	NODE_RPU_1 = 8U,		/* 0x8  */
	NODE_PLD = 9U,			/* 0x9  */
	NODE_FPD = 10U,			/* 0xA  */
	NODE_OCM_BANK_0 = 11U,		/* 0xB  */
	NODE_OCM_BANK_1 = 12U,		/* 0xC  */
	NODE_OCM_BANK_2 = 13U,		/* 0xD  */
	NODE_OCM_BANK_3 = 14U,		/* 0xE  */
	NODE_TCM_0_A = 15U,		/* 0xF  */
	NODE_TCM_0_B = 16U,		/* 0x10 */
	NODE_TCM_1_A = 17U,		/* 0x11 */
	NODE_TCM_1_B = 18U,		/* 0x12 */
	NODE_L2 = 19U,			/* 0x13 */
	NODE_GPU_PP_0 = 20U,		/* 0x14 */
	NODE_GPU_PP_1 = 21U,		/* 0x15 */
	NODE_USB_0 = 22U,		/* 0x16 */
	NODE_USB_1 = 23U,		/* 0x17 */
	NODE_TTC_0 = 24U,		/* 0x18 */
	NODE_TTC_1 = 25U,		/* 0x19 */
	NODE_TTC_2 = 26U,		/* 0x1A */
	NODE_TTC_3 = 27U,		/* 0x1B */
	NODE_SATA = 28U,		/* 0x1C */
	NODE_ETH_0 = 29U,		/* 0x1D */
	NODE_ETH_1 = 30U,		/* 0x1E */
	NODE_ETH_2 = 31U,		/* 0x1F */
	NODE_ETH_3 = 32U,		/* 0x20 */
	NODE_UART_0 = 33U,		/* 0x21 */
	NODE_UART_1 = 34U,		/* 0x22 */
	NODE_SPI_0 = 35U,		/* 0x23 */
	NODE_SPI_1 = 36U,		/* 0x24 */
	NODE_I2C_0 = 37U,		/* 0x25 */
	NODE_I2C_1 = 38U,		/* 0x26 */
	NODE_SD_0 = 39U,		/* 0x27 */
	NODE_SD_1 = 40U,		/* 0x28 */
	NODE_DP = 41U,			/* 0x29 */
	NODE_GDMA = 42U,		/* 0x2A */
	NODE_ADMA = 43U,		/* 0x2B */
	NODE_NAND = 44U,		/* 0x2C */
	NODE_QSPI = 45U,		/* 0x2D */
	NODE_GPIO = 46U,		/* 0x2E */
	NODE_CAN_0 = 47U,		/* 0x2F */
	NODE_CAN_1 = 48U,		/* 0x30 */
	NODE_EXTERN = 49U,		/* 0x31 */
	NODE_APLL = 50U,		/* 0x32 */
	NODE_VPLL = 51U,		/* 0x33 */
	NODE_DPLL = 52U,		/* 0x34 */
	NODE_RPLL = 53U,		/* 0x35 */
	NODE_IOPLL = 54U,		/* 0x36 */
	NODE_DDR = 55U,			/* 0x37 */
	NODE_IPI_APU = 56U,		/* 0x38 */
	NODE_IPI_RPU_0 = 57U,		/* 0x39 */
	NODE_GPU = 58U,			/* 0x3A */
	NODE_PCIE = 59U,		/* 0x3B */
	NODE_PCAP = 60U,		/* 0x3C */
	NODE_RTC = 61U,			/* 0x3D */
	NODE_LPD = 62U,			/* 0x3E */
	NODE_VCU = 63U,			/* 0x3F */
	NODE_IPI_RPU_1 = 64U,		/* 0x40 */
	NODE_IPI_PL_0 = 65U,		/* 0x41 */
	NODE_IPI_PL_1 = 66U,		/* 0x42 */
	NODE_IPI_PL_2 = 67U,		/* 0x43 */
	NODE_IPI_PL_3 = 68U,		/* 0x44 */
	NODE_PL = 69U,			/* 0x45 */
	NODE_ID_MAX = 70U		/* 0x46 */
};

#if defined (__ICCARM__)
#pragma language=save
#pragma language=extended
#endif
#if defined (__GNUC__)
    const unsigned int XPm_ConfigObject[] __attribute__((used, section(".overlay_cfg_data"))) =
#elif defined (__ICCARM__)
#pragma location = ".overlay_cfg_data"
__root const unsigned int XPm_ConfigObject[] =
#endif
{
	/**********************************************************************/
	/* HEADER */
	2,	/* Number of remaining words in the header */
	2,	/* Number of sections included in config object */
	PM_CONFIG_OBJECT_TYPE_OVERLAY,	/* Type of Config object as overlay*/
	/**********************************************************************/
	/* SLAVE SECTION */

	PM_CONFIG_SLAVE_SECTION_ID,	/* Section ID */
	< Number of slaves >,		/* Number of slaves */

	< Device Node Id >,
	PM_SLAVE_FLAG_IS_SHAREABLE,
	PM_CONFIG_IPI_PSU_CORTEXA53_0_MASK | PM_CONFIG_IPI_PSU_CORTEXR5_0_MASK | PM_CONFIG_IPI_PSU_CORTEXR5_1_MASK, /* IPI Mask */

	/* SET CONFIG SECTION */
	PM_CONFIG_SET_CONFIG_SECTION_ID,
	< IPI Mask for Masters >,	/* Loading permission to Overlay config object */

};
#if defined (__ICCARM__)
#pragma language=restore
#endif
