package require Tcl 8.5

set loaded 0
foreach d $::auto_path {
    if { ![catch {load [file join $d libtclftd2xx[info sharedlibextension]]}] } {
	set loaded 1
	break
    }
}

if { !$loaded } {
    load [file join [file dirname [info script]] libtclftd2xx[info sharedlibextension]]
}

namespace eval ftd2xx {
    namespace ensemble create -command ::ftd2xx
    namespace export ftd2xx
}
