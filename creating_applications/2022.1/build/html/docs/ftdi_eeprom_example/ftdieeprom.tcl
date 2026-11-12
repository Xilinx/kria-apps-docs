
#Xilinx FTDI Programming example script
#               Note: "device_list" call returns garbage when more than one board is connected. 
#               Note: New "number_of_devices" call correctly numbers the connected boards. 
#               Note: DLL is missing Erase call; must use FT_Prog to erase FTDI device.
#

source [file join [file dirname [info script]] ftd2xx.tcl]

set ftdi_configs {
    MLCC       {VendorId 1027 ProductId 24593 MaxPower 100 PnP 1 SerNumEnable8 1 ADriveCurrent 4 BDriveCurrent 4 CDriveCurrent 4 DSchmittInput 1 DDriveCurrent 8 BIsVCP8 1 CIsVCP8 1}
    KRCC       {VendorId 1027 ProductId 24593 MaxPower 100 PnP 1 SerNumEnable8 1 ADriveCurrent 4 BDriveCurrent 4 CDriveCurrent 4 DSchmittInput 1 DDriveCurrent 8 BIsVCP8 1 CIsVCP8 0}
    KDCC       {VendorId 1027 ProductId 24593 MaxPower 100 PnP 1 SerNumEnable8 1 ADriveCurrent 4 BDriveCurrent 4 CDriveCurrent 4 DSchmittInput 1 DDriveCurrent 8 BIsVCP8 1 CIsVCP8 0}
}

set boards {
    KDCC {FtdiConfig KRCC FirmwareId 0x584a0004 Vendor VNAME Product {SCK-KD} Manufacturer MNAME Description "KD Carrier Card"}
    MLCC {FtdiConfig MLCC FirmwareId 0x584a0004 Vendor VNAME Product {X-MLCC-01} Manufacturer MNAME Description "ML Carrier Card"}
    KRCC {FtdiConfig KRCC FirmwareId 0x584a0004 Vendor VNAME Product {SCK-KR} Manufacturer MNAME Description "KR Carrier Card"}
}

proc dict_get_safe {dict args} {
    if { [dict exists $dict {*}$args] } {
    return [dict get $dict {*}$args]
    }
    return {}
}

proc device_list {} {
    set devs [ftd2xx get_device_info_list]
    set devs [lsort -index 9 $devs]
    set res ""
    set skip 0
    foreach dev $devs {
        if { $skip > 0 } {
            incr skip -1
            continue
        }
        set ID [dict_get_safe $dev ID]
        set VID [expr {($ID >> 16) & 0xffff}]
        set PID [expr {$ID & 0xffff}]
        if { $VID != 0x0403 } continue
        if { $PID == 0x6010 } { incr skip 1 }
        if { $PID == 0x6011 } { incr skip 3 }

        if { $res == "" } {
            append res [format "%-10s %-30s %-20s" Location Description SerialNumber]
        }
        append res "\n"
        append res [format "%-10s %-30s %-20s" [dict_get_safe $dev LocId] [dict_get_safe $dev Description] [dict_get_safe $dev SerialNumber]]
    }
    return $res
}

proc return_description {} {
    set devs [ftd2xx get_device_info_list]
    set devs [lsort -index 9 $devs]
    set res ""
    set skip 0
    foreach dev $devs {
        if { $skip > 0 } {
            incr skip -1
            continue
        }
        set ID [dict_get_safe $dev ID]
        set VID [expr {($ID >> 16) & 0xffff}]
        set PID [expr {$ID & 0xffff}]
        if { $VID != 0x0403 } continue
        if { $PID == 0x6010 } { incr skip 1 }
        if { $PID == 0x6011 } { incr skip 3 }

        #if { $res == "" } {
        #    append res [format "%-10s %-30s %-20s" Location Description SerialNumber]
        #}
        #append res "\n"
        set res [dict_get_safe $dev Description]
    }
	
    return $res
}

proc return_location {} {
    set devs [ftd2xx get_device_info_list]
    set devs [lsort -index 9 $devs]
    set res ""
    set skip 0
    foreach dev $devs {
        if { $skip > 0 } {
            incr skip -1
            continue
        }
        set ID [dict_get_safe $dev ID]
        set VID [expr {($ID >> 16) & 0xffff}]
        set PID [expr {$ID & 0xffff}]
        if { $VID != 0x0403 } continue
        if { $PID == 0x6010 } { incr skip 1 }
        if { $PID == 0x6011 } { incr skip 3 }

        #if { $res == "" } {
        #    append res [format "%-10s %-30s %-20s" Location Description SerialNumber]
        #}
        #append res "\n"
        append res [dict_get_safe $dev LocId]
    }
    return $res
}

proc number_of_devices {} {
    set devs [ftd2xx get_device_info_list]
    set devs [lsort -index 9 $devs]
    set res ""
    set numdev 0
    foreach dev $devs {
        incr numdev 1
        continue
    }
    set res [expr {$numdev / 4}]
    return $res
}

proc return_serial_number {} {
    set devs [ftd2xx get_device_info_list]
    set devs [lsort -index 9 $devs]
    set res ""
    set skip 0
    foreach dev $devs {
        if { $skip > 0 } {
            incr skip -1
            continue
        }
        set ID [dict_get_safe $dev ID]
        set VID [expr {($ID >> 16) & 0xffff}]
        set PID [expr {$ID & 0xffff}]
        if { $VID != 0x0403 } continue
        if { $PID == 0x6010 } { incr skip 1 }
        if { $PID == 0x6011 } { incr skip 3 }

        set res [string range [dict_get_safe $dev SerialNumber] 0 end-1]
    }
    return $res
}

proc program_eeprom {location board serial} {
    variable ftdi_configs
    variable boards
    if { ![dict exists $boards $board] } {
        error "unknown board type \"$board\": must be [join [dict keys $boards] {, }]"
    }
    set board_props [dict get $boards $board]
    set ftdi_config [dict get $ftdi_configs [dict get $board_props FtdiConfig]]
    dict set ftdi_config ManufacturerId ""
    dict set ftdi_config Manufacturer [dict get $board_props Manufacturer]
    dict set ftdi_config Description [dict get $board_props Description]
    dict set ftdi_config SerialNumber $serial
	
    set fwid [dict_get_safe $board_props FirmwareId]
    set vendor "[encoding convertto utf-8 [dict_get_safe $board_props Vendor]]\0"
    set product "[encoding convertto utf-8 [dict_get_safe $board_props Product]]\0"
    set user_area [binary format ia*a* $fwid $vendor $product]

    set handle {}
    set devs [ftd2xx get_device_info_list]
    foreach dev $devs {
        if { [dict_get_safe $dev LocId] != $location } continue
        set ID [dict_get_safe $dev ID]
        set VID [expr {($ID >> 16) & 0xffff}]
        set PID [expr {$ID & 0xffff}]
        set VID2 [dict_get_safe $ftdi_config VendorId]
        set PID2 [dict_get_safe $ftdi_config ProductId]
        if { $VID != $VID2 || $PID != $PID2 } {
            error "unexpected VID/PID id, device $VID/$PID, board expects $VID2/$PID2"
        }
        set handle [ftd2xx open_by_location $location]
        break
    }
    if { $handle == {} } {
        error "no device at location \"$location\""
    }

    ftd2xx ee_program $handle $ftdi_config
    ftd2xx ee_ua_write $handle $user_area

    ftd2xx close $handle
}
