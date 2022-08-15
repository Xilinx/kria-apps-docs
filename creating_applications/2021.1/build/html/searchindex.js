Search.setIndex({"docnames": ["docs/baremetal", "docs/bootmodes", "docs/custom_cc_flow", "docs/dtsi_dtbo_generation", "docs/examples", "docs/target", "docs/vitis_accel_flow", "docs/vitis_accel_flow_smartcam_filter2d_example", "docs/vitis_accel_vadd_example", "docs/vitis_platform_flow", "docs/vivado_accel_example", "docs/vivado_accel_flow", "index"], "filenames": ["docs\\baremetal.md", "docs\\bootmodes.md", "docs\\custom_cc_flow.md", "docs\\dtsi_dtbo_generation.md", "docs\\examples.rst", "docs\\target.md", "docs\\vitis_accel_flow.md", "docs\\vitis_accel_flow_smartcam_filter2d_example.md", "docs\\vitis_accel_vadd_example.md", "docs\\vitis_platform_flow.md", "docs\\vivado_accel_example.md", "docs\\vivado_accel_flow.md", "index.rst"], "titles": ["Bare-metal Flow Example", "Setting Bootmodes", "Custom Carrier Card Flow", "Generating DTSI and DTBO Overlay Files", "Examples", "On-target Utilities and Firmware", "Vitis Accelerator Flow", "Vitis Accelerator Flow Example - Replacing DPU with Filter2d Accelerator in Smartcam Application", "Vitis Accelerator Flow Example - Adding VADD Accelerator using Vitis GUI", "Vitis Platform Flow", "Vivado Accelerator Flow Example", "Vivado Accelerator Flow", "Kria SOM Accelerator and Custom Carrier Card Firmware Development"], "terms": {"develop": [0, 1, 5, 6, 8, 9, 11], "who": [0, 8], "wish": 0, "som": [0, 1, 3, 5, 7, 8], "without": [0, 1, 2, 3, 5, 6, 7, 8, 9, 10, 11], "creat": [0, 3, 7, 9, 11, 12], "also": [0, 2, 3, 5, 6, 7, 9, 10, 12], "call": [0, 1, 3, 5, 7], "thi": [0, 1, 2, 3, 5, 6, 7, 8, 9, 10, 11, 12], "detail": [0, 2, 5, 7, 8, 9, 12], "process": [0, 1, 5, 7, 12], "simpl": [0, 7, 10, 11, 12], "bram": [0, 10], "connect": [0, 1, 2, 7, 8, 9, 10, 11, 12], "ps": [0, 2, 9, 10, 11, 12], "run": [0, 2, 3, 5, 8, 9, 10, 12], "vision": [0, 2, 7, 9, 11, 12], "ai": [0, 2, 5, 9, 11], "starter": [0, 1, 5, 8, 10, 12], "kit": [0, 1, 2, 5, 6, 8, 9, 10, 11, 12], "The": [0, 2, 3, 5, 6, 7, 8, 9, 11, 12], "read": [0, 5, 7, 8, 10, 11, 12], "write": [0, 1, 2, 3, 5, 6, 7, 8, 9, 10, 11], "from": [0, 5, 7, 8, 9, 10, 11, 12], "lastli": 0, "suggest": 0, "two": [0, 2, 9, 10, 11, 12], "wai": [0, 3, 6, 8, 9, 10, 11], "load": [0, 3, 5, 6, 7, 8, 9, 10, 11, 12], "test": [0, 1, 2, 5], "xilinx": [0, 1, 2, 3, 5, 6, 7, 8, 9, 10, 11, 12], "built": [0, 2, 3, 6, 9, 11, 12], "carrier": [0, 5, 6, 9, 11], "card": [0, 5, 6, 7, 8, 9, 11], "correspond": [0, 2, 5, 6, 8, 9, 11, 12], "board": [0, 6, 8, 10, 12], "file": [0, 1], "input": [0, 2, 6, 7, 9, 11, 12], "s": [0, 2, 3, 5, 6, 7, 8, 9, 10, 11, 12], "own": [0, 2, 3, 6, 11, 12], "acceler": [0, 2, 3, 5], "case": [0, 7, 8, 10, 12], "bit": [0, 3, 5, 7, 8, 9, 12], "fsbl": [0, 12], "elf": [0, 8, 12], "pmufw": [0, 8], "document": [0, 2, 6, 9, 11], "assum": [0, 2, 3, 5, 6, 7, 8, 9, 10, 11, 12], "2021": [0, 1, 2, 3, 5, 6, 7, 8, 9, 10, 11, 12], "later": [0, 2, 6, 8, 9, 10, 11, 12], "tool": [0, 2, 6, 7, 8, 9, 10, 11], "content": [0, 2, 5, 6, 7, 8, 11], "releas": [0, 2, 3, 5, 6, 7, 8, 9, 11, 12], "version": [0, 1, 2, 3, 5, 6, 7, 8, 9, 10, 11, 12], "should": [0, 2, 3, 6, 7, 8, 9, 10, 11], "match": [0, 2, 6, 8, 9, 11], "e": [0, 2, 5, 6, 9, 11, 12], "g": [0, 2, 5, 6, 9, 11, 12], "same": [0, 2, 5, 6, 7, 9, 11, 12], "bootgen": [0, 5, 6, 7, 8], "xsdb": [0, 1, 2, 12], "instal": [0, 2, 3, 5, 6, 7, 8, 9, 10, 11, 12], "which": [0, 3, 6, 9, 12], "includ": [0, 2, 3, 5, 6, 8, 9, 10, 11, 12], "start": [0, 1, 2, 5, 6, 8, 9, 10, 11, 12], "choos": [0, 2, 12], "project": [0, 3, 6, 7, 8, 10, 12], "new": [0, 3, 5, 6, 7, 10, 12], "Then": [0, 1, 2, 3, 5, 7, 9, 10, 11, 12], "rtl": [0, 7], "click": [0, 2, 8, 9, 10, 11], "next": [0, 7, 8, 10], "default": [0, 5, 8, 10], "part": [0, 3, 9, 11, 12], "section": [0, 2, 7, 8, 12], "k26": [0, 1, 2, 3, 6, 7, 8, 9, 10, 11, 12], "through": [0, 6, 7, 9, 10, 11, 12], "finish": [0, 7, 8, 9, 11, 12], "now": [0, 2, 5, 7, 8, 9, 10, 12], "block": [0, 2, 9, 10, 11], "In": [0, 2, 3, 5, 6, 7, 8, 9, 10, 11, 12], "sign": [0, 10], "add": [0, 1, 2, 3, 7, 8, 9, 10, 11], "onc": [0, 1, 2, 6, 9, 11, 12], "ad": [0, 2, 3, 5, 9, 10, 11], "make": [0, 2, 3, 5, 6, 7, 8, 9, 10, 11], "sure": [0, 2, 3, 6, 7, 8, 9, 10, 11], "autom": [0, 2, 9, 10, 11, 12], "appli": [0, 2, 3, 9, 11, 12], "preset": [0, 7], "configur": [0, 2, 3, 5, 6, 8, 9, 10, 11], "correctli": 0, "anoth": [0, 7], "axi": [0, 10], "control": [0, 10, 12], "_": [0, 2, 3, 5, 6, 7, 8, 9, 10, 11], "port": [0, 9, 12], "m_axi_hpm0": 0, "again": [0, 3, 5, 10], "porta": 0, "ram": 0, "doubl": [0, 8, 10], "onli": [0, 2, 3, 5, 7, 9, 11, 12], "have": [0, 2, 3, 5, 7, 8, 9, 10, 11, 12], "interfac": [0, 2, 6, 9, 10, 11, 12], "select": [0, 2, 5, 8, 9, 10, 11, 12], "enabl": [0, 2, 3, 8, 11], "hpm0": [0, 10], "unselect": [0, 10], "hpm1": [0, 10], "ar": [0, 1, 2, 3, 5, 6, 7, 8, 9, 10, 11, 12], "complet": [0, 3, 8, 12], "after": [0, 1, 2, 3, 5, 6, 9, 10, 11, 12], "done": [0, 7], "right": [0, 7], "you": [0, 1, 2, 3, 5, 6, 7, 8, 9, 10, 11, 12], "hdl": [0, 7], "wrapper": [0, 5], "set": [0, 2, 3, 5, 7, 8, 9, 10, 11, 12], "top": [0, 2, 7, 8, 10, 12], "modul": [0, 5], "check": [0, 2, 3, 8, 9, 10], "address": [0, 10, 12], "map": [0, 2, 7, 10, 12], "slave": 0, "memori": 0, "so": [0, 7, 8, 10], "we": [0, 2, 7, 8, 10, 12], "can": [0, 1, 2, 3, 5, 6, 7, 8, 9, 11, 12], "bitstream": [0, 2, 3, 5, 6, 8, 9, 10, 11, 12], "try_1": 0, "impl_1": [0, 10], "add_bram_wrapp": 0, "export": [0, 2, 3, 8, 9, 10, 11, 12], "xsa": [0, 6, 8, 12], "work": [0, 3, 6, 7, 8], "launch": [0, 7, 8], "layunch": 0, "id": [0, 5, 7, 8], "platform": [0, 3, 5], "hardwar": [0, 2, 3, 5, 6, 8, 9, 10, 11, 12], "point": [0, 2, 7, 12], "wa": [0, 7, 8, 10], "just": [0, 12], "name": [0, 1, 2, 3, 5, 6, 7, 8, 9, 10], "associ": [0, 3, 6, 8, 9, 12], "psu": [0, 1], "cortexa53": [0, 8], "0": [0, 1, 2, 3, 5, 6, 7, 8, 9, 10, 11], "hello": 0, "world": 0, "templat": [0, 2, 3, 8], "helloworld": 0, "c": [0, 5, 6, 7, 8], "alter": [0, 8], "code": 0, "hello_world_system": 0, "build": [0, 2, 3, 6, 7, 8, 9, 11], "follow": [0, 1, 2, 3, 5, 6, 7, 8, 11, 12], "vitis_workspac": 0, "sw": [0, 8, 9, 11, 12], "hello_world": 0, "debug": [0, 12], "There": [0, 6, 9, 10, 11], "download": [0, 2, 6, 7, 8, 9, 10, 11, 12], "program": [0, 7, 8], "sector": [0, 5], "qspi": [0, 1, 12], "up": [0, 2, 3, 5, 7, 8, 10], "upon": 0, "power": 0, "need": [0, 1, 2, 3, 5, 6, 7, 8, 9, 10, 11, 12], "ideal": 0, "while": [0, 2, 6, 7, 12], "deploy": [0, 5, 7], "script": [0, 1, 2, 3, 5, 7, 9, 12], "proc": [0, 1, 3, 10], "boot_jtag": [0, 1], "switch": [0, 1], "mode": [0, 1, 2, 5, 7, 12], "target": [0, 1, 8, 9], "filter": [0, 1, 7], "updat": [0, 1, 2, 5, 6, 7, 8, 9, 11, 12], "multiboot": [0, 1], "zero": [0, 1], "mwr": [0, 1], "0xffca0010": [0, 1], "0x0": [0, 1], "chang": [0, 1, 2, 8, 10, 12], "0xff5e0200": [0, 1], "0x0100": [0, 1], "reset": [0, 1], "rst": [0, 1], "system": [0, 1, 2, 5, 6, 7, 8, 9, 11, 12], "2000": [0, 1], "fpga": [0, 3], "0xffca0038": 0, "0x1ff": 0, "microblaz": [0, 12], "pmu": [0, 12], "500": 0, "dow": 0, "con": [0, 1], "a53": [0, 1, 8], "core": 0, "cortex": 0, "processor": [0, 7, 12], "clear": 0, "regist": 0, "10000": 0, "stop": [0, 1, 5], "altern": [0, 2, 3, 6, 8, 9, 11, 12], "A": [0, 3, 6, 10, 11, 12], "b": [0, 9, 11, 12], "first": [0, 1, 2, 3, 5, 6, 7, 8, 9, 10, 11, 12], "bif": [0, 5, 6, 7, 8], "contain": [0, 2, 3, 5, 6, 8, 9, 11, 12], "the_rom_imag": [0, 8], "fsbl_config": [0, 8], "a5x_x64": 0, "pmufw_imag": [0, 8], "bootload": [0, 8], "destination_devic": 0, "destination_cpu": [0, 8], "a5x": 0, "thei": [0, 1, 2, 5, 6, 9, 11, 12], "arch": [0, 5, 6, 7, 8], "zynqmp": [0, 2, 5, 6, 7, 8], "o": [0, 3, 6, 7, 8, 9, 10, 12], "fw": [0, 12], "recoveri": [0, 12], "util": [0, 2, 3, 6, 10, 11, 12], "ug1089": [0, 12], "here": [0, 2, 3, 6, 7, 8, 9, 10, 11], "firmwar": [0, 3, 6, 7, 8, 10, 11], "decid": [0, 2, 6], "mark": 0, "bootabl": 0, "request": 0, "everi": 0, "cycl": 0, "printout": [0, 2], "indic": [0, 2, 5, 7, 9, 11, 12], "abil": 0, "mai": [0, 1, 2, 3, 5, 6, 7, 8, 9, 10, 11, 12], "back": 0, "its": [0, 5, 6, 7, 8, 9, 11], "one": [0, 2, 8, 12], "had": [0, 7], "been": [0, 3, 5], "overwriten": 0, "wiki": [0, 2, 3, 8, 9, 11, 12], "under": [0, 1, 2, 3, 5, 6, 7, 8, 9, 10, 11], "apach": [0, 1, 2, 3, 5, 6, 7, 8, 9, 10, 11], "except": [0, 1, 2, 3, 5, 6, 7, 8, 9, 10, 11, 12], "complianc": [0, 1, 2, 3, 5, 6, 7, 8, 9, 10, 11], "obtain": [0, 1, 2, 3, 5, 9, 10, 11], "copi": [0, 1, 2, 3, 5, 6, 7, 8, 9, 10, 11, 12], "http": [0, 1, 2, 3, 5, 6, 7, 8, 9, 10, 11], "www": [0, 1, 2, 3, 5, 6, 7, 8, 9, 10, 11], "org": [0, 1, 2, 3, 5, 6, 7, 8, 9, 10, 11], "unless": [0, 1, 2, 3, 5, 6, 7, 8, 9, 10, 11], "requir": [0, 1, 2, 5, 6, 7, 8, 9, 10, 11], "law": [0, 1, 2, 3, 5, 6, 7, 8, 9, 10, 11], "agre": [0, 1, 2, 3, 5, 6, 7, 8, 9, 10, 11], "distribut": [0, 1, 2, 3, 5, 6, 7, 8, 9, 10, 11], "an": [0, 1, 2, 3, 5, 6, 7, 8, 9, 10, 11, 12], "AS": [0, 1, 2, 3, 5, 6, 7, 8, 9, 10, 11], "IS": [0, 1, 2, 3, 5, 6, 7, 8, 9, 10, 11], "basi": [0, 1, 2, 3, 5, 6, 7, 8, 9, 10, 11, 12], "warranti": [0, 1, 2, 3, 5, 6, 7, 8, 9, 10, 11], "OR": [0, 1, 2, 3, 5, 6, 7, 8, 9, 10, 11], "condit": [0, 1, 2, 3, 5, 6, 7, 8, 9, 10, 11], "OF": [0, 1, 2, 3, 5, 6, 7, 8, 9, 10, 11], "ani": [0, 1, 2, 3, 5, 6, 7, 8, 9, 10, 11, 12], "kind": [0, 1, 2, 3, 5, 6, 7, 8, 9, 10, 11], "either": [0, 1, 2, 3, 5, 6, 7, 8, 9, 10, 11], "express": [0, 1, 2, 3, 5, 6, 7, 8, 9, 10, 11], "impli": [0, 1, 2, 3, 5, 6, 7, 8, 9, 10, 11], "see": [0, 1, 2, 3, 5, 6, 7, 8, 9, 10, 11, 12], "specif": [0, 1, 2, 3, 5, 6, 7, 8, 9, 10, 11, 12], "languag": [0, 1, 2, 3, 5, 6, 7, 8, 9, 10, 11], "govern": [0, 1, 2, 3, 5, 6, 7, 8, 9, 10, 11], "permiss": [0, 1, 2, 3, 5, 6, 7, 8, 9, 10, 11], "limit": [0, 1, 2, 3, 5, 6, 7, 8, 9, 10, 11], "copyright": [0, 1, 2, 3, 5, 6, 7, 8, 9, 10, 11], "applic": [1, 3, 5, 10], "custom": [1, 3], "hw": [1, 2, 3, 8, 9, 11], "design": [1, 3, 5, 6, 10], "gener": [1, 5], "move": [1, 2, 5, 7, 9, 10, 12], "them": [1, 2, 5, 6, 7, 8, 9, 10, 12], "If": [1, 2, 3, 5, 7, 9, 11, 12], "us": [1, 5, 6, 7, 10, 12], "kria": [1, 8], "variou": [1, 12], "boot": [1, 3, 5, 7, 8, 10], "monolith": [1, 12], "softwar": [1, 2, 3, 5, 6, 7, 8, 9, 10, 11], "tcl": [1, 2, 7, 9, 12], "prefer": [1, 2, 7, 10, 11, 12], "put": [1, 2, 5, 12], "function": [1, 2, 5, 6, 7, 9, 11, 12], "host": [1, 2, 8], "machin": [1, 2, 8], "command": [1, 2, 3, 6, 7, 8, 10], "xsct": [1, 3, 9, 10, 11, 12], "sourc": [1, 2, 3, 6, 7, 8, 12], "boot_": 1, "To": [1, 2, 5, 6, 8, 9, 11, 12], "jtag": [1, 2, 12], "sd": [1, 5, 7, 8, 12], "boot_sd": 1, "0xe100": 1, "held": 1, "catch": 1, "boot_qspi": 1, "0x2100": 1, "emmc": 1, "boot_emmc": 1, "nocas": 1, "0x6100": 1, "usb": 1, "boot_usb": 1, "usb0": 1, "0x7100": 1, "2": [1, 3, 5, 7, 8, 10, 12], "provid": [2, 3, 5, 6, 7, 8, 9, 10, 11, 12], "product": [2, 12], "mio": [2, 12], "defin": [2, 3, 5, 6, 9, 11, 12], "minim": [2, 12], "doe": [2, 9, 11, 12], "inform": [2, 3, 6, 8, 9, 11, 12], "base": [2, 3, 5, 6, 7, 8, 9, 11, 12], "physic": [2, 6, 9, 12], "cc": [2, 5, 9, 11, 12], "guid": [2, 9, 11, 12], "ug1091": [2, 12], "integr": [2, 12], "os": [2, 3, 10, 12], "artifact": [2, 3, 12], "previous": [2, 12], "discuss": [2, 12], "workflow": 2, "viti": [2, 3, 5, 11], "output": [2, 3, 5, 6, 7, 8, 9, 11, 12], "wic": [2, 7, 10, 12], "src": [2, 12], "ramdisk": [2, 7, 12], "cpio": [2, 7, 12], "gz": [2, 7, 12], "u": [2, 7, 8, 12], "dtb": [2, 3, 6, 7, 8, 10, 12], "rootf": [2, 5, 7, 8, 12], "tar": [2, 12], "share": [2, 5, 6, 7, 9, 11], "agnost": [2, 6, 9, 11], "kernel": [2, 3, 5, 6, 7, 8, 9, 11, 12], "yocto": [2, 3, 6, 9, 11, 12], "depend": [2, 6, 7, 9, 11, 12], "librari": [2, 5, 6, 8, 9, 11, 12], "baselin": [2, 6, 9, 11], "when": [2, 3, 5, 6, 8, 9, 11, 12], "tutori": [2, 6, 7, 8, 9, 11, 12], "git": [2, 3, 6, 7, 8, 9, 11, 12], "repositori": [2, 3, 6, 7, 8, 9, 10, 11, 12], "variant": [2, 6, 9, 11], "multi": [2, 6, 9, 11], "support": [2, 5, 6, 7, 8, 9, 11, 12], "packag": [2, 5, 6, 7, 8, 11, 12], "recommend": [2, 3, 6, 9, 11, 12], "ensur": [2, 6, 9, 11], "minimalist": [2, 6, 9, 11], "ha": [2, 3, 6, 9, 10, 11, 12], "primari": [2, 6, 9, 11, 12], "oper": [2, 6, 9, 11, 12], "dynam": [2, 3, 5, 6, 7, 9, 11], "runtim": [2, 3, 6, 9, 11, 12], "exampl": [2, 3, 5, 12], "relat": [2, 5, 12], "kv260": [2, 3, 5, 6, 7, 8, 9, 11, 12], "k26c": [2, 9, 11], "k26i": [2, 9, 11], "found": [2, 3, 5, 6, 7, 9, 11], "pleas": [2, 3, 6, 7, 8, 9, 10, 11, 12], "note": [2, 5, 7, 8], "avail": [2, 7, 8, 9, 11, 12], "21": [2, 5, 7, 10, 12], "well": [2, 7, 9, 10, 12], "though": 2, "xml": [2, 7, 12], "captur": [2, 3, 6, 7, 12], "pcb": 2, "min": 2, "delai": 2, "max": 2, "all": [2, 3, 5, 6, 7, 8, 12], "pin": [2, 12], "extend": 2, "where": [2, 6, 11, 12], "place": [2, 6, 7, 11], "ug895": [2, 12], "between": [2, 12], "mpsoc": [2, 7, 12], "connector": [2, 9, 11], "constraint": [2, 6, 12], "both": [2, 8, 12], "site": 2, "k260": 2, "how": [2, 7, 9, 10, 12], "refer": [2, 3, 6, 8, 9, 10, 11], "suit": [2, 12], "ug903": [2, 12], "more": [2, 3, 6, 8, 9, 12], "three": [2, 3, 6, 9, 11], "peripher": [2, 9, 11, 12], "These": [2, 9, 11, 12], "list": [2, 6, 7, 9, 11], "wizard": [2, 9, 11], "commerci": [2, 9, 11], "grade": [2, 9, 11], "industri": [2, 9, 11], "Be": 2, "instead": [2, 12], "kv": [2, 9, 11], "zynq": [2, 9, 11, 12], "ultra": [2, 9, 11], "extens": [2, 6, 9], "whether": 2, "intend": [2, 5], "reus": [2, 7], "manag": [2, 5, 9, 11, 12], "t": [2, 3, 6, 7, 8, 9, 10, 11], "starterkit": [2, 3, 6, 7, 8, 9, 10, 11, 12], "v2021": [2, 6, 7, 8, 9, 10, 11], "final": [2, 3, 6, 7, 8, 9, 10, 11, 12], "cd": [2, 3, 6, 7, 8, 9, 10, 11], "folder": [2, 3, 5, 6, 7, 8, 9, 10, 11], "open": [2, 3, 7, 8, 9, 10, 11, 12], "xpr": [2, 9, 10, 11], "about": [2, 3, 5, 9, 11, 12], "being": [2, 5, 7, 9, 11], "howev": [2, 7, 8, 9, 11, 12], "enough": [2, 9, 11], "basic": [2, 9, 11], "ip": [2, 7, 8, 9, 11, 12], "your": [2, 3, 5, 7, 8, 9, 10, 11, 12], "binari": [2, 3, 5, 6, 8, 10, 11, 12], "convert": [2, 5, 6, 7, 8, 11, 12], "order": [2, 11], "go": [2, 7, 8, 10, 11, 12], "renam": [2, 3, 7, 11], "spec": [2, 3, 6, 7], "descript": [2, 3, 5, 12], "dtsi": [2, 7, 8, 10, 12], "ug1144": [2, 12], "below": [2, 3, 5, 6, 8, 10, 12], "extract": [2, 7], "type": [2, 5, 8], "petalinux_project": 2, "config": [2, 3, 5, 6, 7, 8, 10], "get": [2, 6, 7, 8, 9, 11], "path": [2, 3, 6, 7, 8, 10], "cp": [2, 7, 10], "meta": [2, 3, 7], "user": [2, 3, 5, 7, 8, 12], "recip": [2, 3, 7, 8], "devic": [2, 3, 5, 6, 7, 10], "tree": [2, 3, 5, 6, 7, 10], "It": [2, 5, 8, 9, 12], "xmutil": [2, 6, 7, 8, 10, 11, 12], "dfx": [2, 3, 6, 11, 12], "mgr": [2, 3, 6, 11, 12], "bring": 2, "replac": 2, "abov": [2, 3, 7, 8, 10, 12], "what": [2, 7], "differ": [2, 3, 5, 6, 7, 9, 12], "via": [2, 12], "help": [2, 5, 12], "bootmod": [2, 12], "pre": [2, 7, 9, 10, 12], "prebuilt": [2, 8, 10], "tini": 2, "exit": [2, 8, 10], "still": [2, 7, 8], "take": [2, 3, 7, 8, 12], "care": 2, "pointer": 2, "remov": [2, 7], "end": [2, 5], "observ": [2, 10], "step": [3, 8, 10, 12], "pl": [3, 5, 6, 7, 8, 10], "must": [3, 5, 6, 8, 9, 12], "translat": 3, "linux": [3, 5, 7, 8, 10], "understand": [3, 12], "format": [3, 5, 7, 8, 12], "describ": [3, 8, 12], "concept": [3, 12], "dt": [3, 6, 9, 10, 11, 12], "human": 3, "readabl": 3, "form": [3, 12], "post": [3, 6, 9, 11], "therefor": [3, 7, 8], "slightli": 3, "than": [3, 9, 12], "fragment": 3, "For": [3, 5, 6, 7, 8, 9, 11, 12], "each": [3, 6, 7], "organ": 3, "number": [3, 10], "data": [3, 5, 12], "expect": [3, 5, 7, 9], "line": [3, 7], "manual": [3, 5], "fpgamang": 3, "vivado": [3, 6, 7, 8], "out": [3, 8], "align": [3, 12], "rest": 3, "chain": 3, "bsp": [3, 5, 7, 8, 10, 12], "clone": [3, 7, 8], "github": [3, 5, 7, 8], "com": [3, 7, 8], "xlnx": [3, 7, 10], "checkout": [3, 8], "xlnx_rel_v2021": 3, "1": [3, 5, 7, 8, 10, 12], "pub": 3, "scm": 3, "page": [3, 5, 7, 8, 9, 10, 11], "hand": 3, "off": 3, "hsi": [3, 10], "open_hw_design": [3, 10], "design_nam": 3, "set_repo_path": [3, 10], "create_sw_design": [3, 10], "device_tre": [3, 10], "psu_cortexa53_0": [3, 10], "set_properti": [3, 10], "dt_overlai": [3, 10], "true": [3, 7, 10], "get_o": [3, 10], "generate_target": [3, 10], "dir": [3, 8, 10], "desired_dts_filenam": 3, "close_hw_design": [3, 10], "current_hw_design": 3, "current": [3, 5], "link": [3, 5, 7, 8, 10], "flow": 3, "desir": 3, "filenam": 3, "some": [3, 5], "modif": [3, 7], "befor": [3, 7, 8, 10, 12], "readi": [3, 10], "directli": [3, 5, 12], "opensourc": 3, "actual": [3, 6], "shown": [3, 6, 12], "appropri": [3, 12], "fpgamanager_custom": 3, "bitbak": 3, "class": 3, "helper": 3, "method": [3, 7, 10], "json": [3, 6, 11], "specifi": 3, "slot": [3, 7], "flat": [3, 5, 10], "xclbin": [3, 5, 8, 9, 11, 12], "silentconfig": 3, "app": [3, 5, 7, 10], "fpgamanag": [3, 8], "n": 3, "srcuri": 3, "shell": [3, 6, 12], "locat": [3, 5, 6, 7, 8, 9, 10], "bb": [3, 7], "minimum": 3, "element": 3, "further": 3, "newli": [3, 8], "tmp_folder": [3, 6], "sysroot": [3, 6], "compon": [3, 6, 8, 12], "zynqmp_gener": 3, "lib": [3, 5, 6, 7, 8, 10], "tmp": [3, 7], "config_tmp_dir_loc": [3, 6], "fpgamanager_dtg": 3, "option": [3, 6, 8, 12], "append": 3, "want": [3, 7, 8, 12], "inspect": 3, "clean": [3, 7], "thing": [3, 7], "success": [3, 6, 10], "variabl": [3, 8], "rm_work_exclud": 3, "pn": 3, "tmpworkspac": 3, "r0": 3, "scp": [5, 6, 7, 8, 10], "ftp": [5, 6], "find": [5, 7], "media": [5, 7], "mmcblk1p1": 5, "structur": 5, "touch": [5, 12], "deploi": 5, "etc": 5, "mgrd": 5, "daemon": 5, "vart": 5, "conf": [5, 7], "misc": 5, "other": [5, 7, 8, 12], "modifi": 5, "loadabl": 5, "ko": 5, "driver": [5, 7], "opt": 5, "exist": [5, 6, 8, 12], "dnf": [5, 6, 7], "bin": [5, 7, 8, 9, 12], "iva": [5, 7], "notebook": [5, 7], "vitis_ai_librari": 5, "vai": 5, "model": [5, 6], "front": 5, "common": 5, "experi": 5, "interact": 5, "identifi": 5, "unload": 5, "multipl": 5, "python": 5, "standard": [5, 6], "sub": 5, "stat": 5, "context": [5, 12], "feed": 5, "repo": [5, 6, 7], "down": 5, "group": 5, "eeprom": 5, "getpkg": [5, 7], "queri": 5, "present": [5, 7, 8], "string": 5, "quickli": [5, 12], "implement": [5, 11, 12], "activ": [5, 8, 12], "maintain": 5, "relev": 5, "loadapp": [5, 7, 8, 10], "unloadapp": [5, 7, 8, 10], "listapp": [5, 8, 10], "capabl": 5, "hierarch": 5, "compani": 5, "until": 5, "2022": 5, "long": 5, "latest": [5, 12], "visit": 5, "i": [5, 7, 9, 12], "notifi": 5, "brought": 5, "directori": [5, 7, 8, 9], "overlai": [5, 6, 10, 12], "dtbo": [5, 12], "xrt": [5, 8, 10], "metadata": [5, 6, 8, 12], "mgt": 5, "header": 5, "trim": 5, "bitgen": [5, 6], "echo": [5, 7, 8], "w": [5, 7, 8], "process_bitstream": [5, 6, 7, 8], "imag": [5, 6, 7, 8, 9, 10, 11, 12], "recogn": 5, "expand": 5, "aie": [5, 8], "futur": [5, 12], "shell_typ": [5, 8], "xrt_flat": [5, 8], "num_slot": [5, 8], "do": [5, 7, 8, 12], "yet": [5, 7], "messag": 5, "flag": 5, "verbos": 5, "restart": 5, "sudo": [5, 7, 8, 10], "systemctl": 5, "servic": 5, "usr": [5, 7], "By": [5, 8, 10], "partit": [5, 12], "expos": 5, "full": [5, 8], "space": [5, 7, 12], "becaus": [5, 7, 8, 10, 12], "across": 5, "cannot": 5, "last": 5, "bake": 5, "capac": 5, "fdisk": 5, "size": 5, "l": 5, "show": [5, 8, 10, 12], "4gb": 5, "mmcblk1": 5, "p2": 5, "dev": [5, 7], "8": [5, 8], "4194311": 5, "4194304": 5, "2g": 5, "w95": 5, "fat32": 5, "lba": 5, "mmcblk1p2": 5, "4194312": 5, "12582919": 5, "8388608": 5, "4g": 5, "83": 5, "kr260": 5, "sda": 5, "sda1": 5, "sda2": 5, "22": 5, "verifi": 5, "12": 5, "30244863": 5, "26050552": 5, "import": [6, 8, 12], "within": [6, 12], "bound": [6, 12], "blob": [6, 12], "result": [6, 7, 8, 9, 11, 12], "access": [6, 9, 10, 11], "definit": [6, 11, 12], "xpfm": [6, 8, 9], "tabl": [6, 12], "smartcam": [6, 8], "kv260_ispmipirx_vcu_dp": [6, 7, 8], "aibox": [6, 8], "reid": [6, 8], "kv260_vcudecode_vmixdp": [6, 8], "defect": [6, 8], "detect": [6, 8], "kv260_ispmipirx_vmixdp": [6, 8], "nlp": [6, 8], "smartvis": [6, 8], "kv260_ispmipirx_dp": [6, 8], "uniqu": 6, "dtc": [6, 7, 8, 10, 12], "dtsi_dtbo_gener": [6, 8, 9, 11], "temp_fold": 6, "temp": 6, "typic": [6, 12], "makefil": [6, 7, 8, 12], "And": 6, "On": [6, 7, 10, 11], "gui": 6, "zoo": 6, "walk": [7, 10], "smart": 7, "camera": 7, "particular": 7, "environ": [7, 8], "try": [7, 8, 10], "familiar": 7, "alreadi": [7, 10, 12], "smartcamera": 7, "re": 7, "sinc": [7, 8, 10], "ispmipirx": [7, 8], "vcu": 7, "dp": [7, 8], "branch": 7, "recurs": [7, 8], "workdir": [7, 8], "settings64": [7, 8], "sh": [7, 8], "pfm": [7, 8, 9], "xilinx_kv260_ispmipirx_vcu_dp_202110_1": 7, "seper": 7, "vck190": 7, "trd": 7, "filter2d_pl": 7, "r": 7, "xfopencv_incdir": 7, "vitis_librari": 7, "l1": 7, "level": [7, 8, 10, 12], "mean": 7, "pack": 7, "xo": 7, "those": [7, 9, 12], "3": [7, 8, 10], "dpu_hdlsrc": 7, "kernel_xml": 7, "package_dpu_kernel": 7, "gen_dpu_xo": 7, "dpu_ip": 7, "dpuczdx8g": 7, "v": 7, "inc": 7, "arch_def": 7, "vh": 7, "xdc": [7, 12], "dpuczdx8g_": 7, "_dpu": 7, "sv": 7, "arch_para": 7, "dpu_tcl": 7, "dpu_kern_nam": 7, "dpu_xo": 7, "binary_container_1": [7, 8], "mkdir": [7, 8, 10], "p": [7, 8], "d": [7, 8], "rm": 7, "batch": 7, "tclarg": 7, "binary_": 7, "vpl": 7, "prj": [7, 8], "gen": 7, "sources_1": 7, "bd": 7, "_dpuczdx8g_1_0": 7, "sd_card": 7, "preprocess": 7, "pp": 7, "pp_pipeline_accel": 7, "kernel_xo": 7, "kernel_xo_flag": 7, "k": 7, "d__sdsvhls__": 7, "dhls_no_xil_fpo_lib": 7, "advanc": 7, "prop": 7, "kernel_flag": 7, "std": 7, "0x": 7, "xf_pp_pipeline_accel": 7, "cpp": 7, "vpp": 7, "vpp_xo_flag": 7, "xil": 7, "filter2d_xo": 7, "filter2d_pl_accel": 7, "binary_contain": 7, "vpp_link_flag": 7, "xbu": 7, "xbu_flag": 7, "mv": [7, 8], "invoc": 7, "strip": 7, "interconnect": 7, "wont": 7, "xp": 7, "param": 7, "compil": [7, 8, 10, 12], "userpostsyslinkoverlaytcl": 7, "dir_prj": 7, "prj_conf": 7, "strip_interconnect": 7, "dpu_pp_xo": 7, "compar": 7, "origin": [7, 8], "subsystem": [7, 9, 12], "prj_config_1dpu": 7, "pipelin": 7, "accel": 7, "clock": 7, "hp1": 7, "freqhz": 7, "300000000": 7, "dpuczdx8g_1": 7, "aclk": 7, "600000000": 7, "ap_clk_2": 7, "pp_pipeline_accel_1": 7, "ap_clk": 7, "200000000": 7, "filter2d_pl_accel_0": 7, "sp": 7, "m_axi_gp0": 7, "m_axi_hp0": 7, "m_axi_hp2": 7, "hpc1": 7, "m_axi_gmem1": 7, "hp3": 7, "m_axi_gmem2": 7, "m_axi_gmem3": 7, "m_axi_gmem4": 7, "nk": 7, "frm_in": 7, "frm_out": 7, "preprocessor": 7, "working_dir": 7, "bitfil": 7, "int": 7, "doesnt": 7, "entri": [7, 12], "rebuild": [7, 12], "rf": 7, "bigbuckbunni": 7, "360p": 7, "vp9": 7, "webm": 7, "multimedia": 7, "sampl": 7, "config_filter2d": 7, "rootfsconfig": 7, "y": 7, "rootfs_config": 7, "config_bigbuckbunni": 7, "bootfil": 7, "scr": 7, "zip": 7, "gzip": 7, "sdimag": 7, "plug": 7, "seperatedli": 7, "instruct": 7, "know": 7, "packagegroup": 7, "noarch": 7, "With": [7, 9, 12], "gstreamer": 7, "transfer": [7, 8], "chosen": 7, "kernel_xfilter2d_pl": 7, "pass": [7, 8], "fine": 7, "monitor": 7, "displai": 7, "mipi": [7, 9, 12], "media0": 7, "1920x1080p": 7, "gst": 7, "mediasrcbin": 7, "v4l2src0": 7, "io": 7, "mmap": 7, "video": [7, 12], "x": [7, 8], "raw": 7, "width": 7, "1920": 7, "height": 7, "1080": 7, "nv12": 7, "framer": 7, "30": [7, 8], "perf": 7, "kmssink": 7, "plane": 7, "39": 7, "fullscreen": 7, "confirm": [7, 8], "yuy2": 7, "our": 7, "sensor": 7, "compat": 7, "googl": 7, "bbb": 7, "sunflow": 7, "1080p": 7, "30fp": 7, "normal": 7, "mp4": 7, "onlin": 7, "home": [7, 8], "execut": [7, 8, 12], "filesrc": 7, "bbb_sunflower_1080p_30fps_norm": 7, "decodebin": 7, "videoconvert": 7, "ivas_xfilt": 7, "filter_preset": 7, "edg": 7, "sync": 7, "fals": 7, "abl": [7, 9, 10], "repleas": 7, "underscor": 7, "horizont": 7, "horizontal_edg": 7, "slow": 7, "frame": 7, "time": [7, 12], "insert": 8, "xilinx_kv260_ispmipirx_dp_202110_1": 8, "petalinux": [8, 10], "save": 8, "setup": 8, "petalinux_tool_install_dir": 8, "esdk": 8, "upgrad": 8, "sswreleas": 8, "rel": 8, "sdkupdat": 8, "1_update1": 8, "aarch64": 8, "doesn": 8, "cross": 8, "window": 8, "filesystem": 8, "press": 8, "sdk": 8, "pathnam": 8, "arbitrari": 8, "vhoos": 8, "ld": 8, "tri": 8, "img": 8, "even": 8, "empti": 8, "error": 8, "syntax": 8, "7": 8, "harmless": 8, "avoid": 8, "popul": 8, "a53_x64": 8, "zynqmp_fsbl": 8, "exception_level": 8, "el": 8, "trustzon": 8, "bl31": 8, "0x00100000": 8, "skip": 8, "welcom": 8, "navig": 8, "domain": [8, 12], "smp_linux": 8, "sys_root": 8, "cortexa72": 8, "leav": 8, "root": [8, 12], "fs": 8, "vector": 8, "addit": 8, "explor": 8, "emul": 8, "vadd_system": 8, "icon": 8, "toolbar": 8, "task": 8, "would": 8, "10": 8, "minut": 8, "perform": 8, "ignor": 8, "prepar": 8, "ethernet": 8, "cabl": 8, "sftp": 8, "upload": 8, "chmod": 8, "print": 8, "2021_1": 8, "info": 8, "congratul": 8, "mani": 8, "automat": [9, 12], "drive": [9, 12], "commonli": [9, 12], "outlin": [9, 12], "xlcbin": [9, 12], "sdx": 9, "adjac": 9, "itself": 9, "initi": [9, 11, 12], "good": 9, "close": 9, "scope": [9, 12], "infrastructur": 10, "xstc": [10, 12], "dtg": [10, 12], "onto": [10, 12], "baremet": [10, 12], "zynq_ultra_ps_e_0": 10, "s_axi": 10, "axi_bram_ctrl_0": 10, "m_axi_hpm0_fpd": 10, "fpd": 10, "unus": 10, "bram_porta": 10, "blockram": 10, "look": 10, "like": 10, "0xa0000000": 10, "chose": 10, "bin_fil": 10, "project_1_wrapp": 10, "previou": 10, "bram_dt": 10, "over": [10, 12], "prompt": 10, "But": 10, "devmem": 10, "32": 10, "0xdeadbeef": 10, "tradit": [11, 12], "2020": 11, "xhub": 11, "store": 11, "cred": 11, "proper": [11, 12], "area": 11, "programm": 12, "logic": 12, "focus": 12, "overal": 12, "whenev": 12, "consist": 12, "xck26": 12, "chip": 12, "abstract": 12, "subset": 12, "focu": 12, "leverag": 12, "given": 12, "4": 12, "give": 12, "overview": 12, "best": 12, "fix": 12, "easier": 12, "chapter": 12, "secondari": 12, "atf": 12, "initramf": 12, "often": 12, "alwai": 12, "apu": 12, "rpu": 12, "usual": 12, "entir": 12, "overrid": 12, "qspi32": 12, "higher": 12, "determin": 12, "lower": 12, "y2k22": 12, "patch": 12, "Not": 12, "decis": 12, "involv": 12, "four": 12, "choic": 12, "intersect": 12, "plan": 12, "suppli": 12, "vitis_accel_librari": 12, "allow": 12, "advantag": 12, "jump": 12, "might": 12, "diagram": 12, "hierarchi": 12, "layer": 12, "diverg": 12, "distinct": 12, "centric": 12, "hook": 12, "architectur": 12, "label": 12, "selector": 12, "debugg": 12, "sheet": 12, "ds987": 12, "ds986": 12, "trm": 12, "ug1085": 12, "unifi": 12, "web": 12, "ug940": 12, "ug892": 12, "ug896": 12, "dtbi": 12, "overlaid": 12, "soc": 12, "linkabl": 12, "simplifi": 12, "As": 12, "storag": 12, "known": 12, "axlf": 12, "proof": 12, "archiv": 12, "embed": 12}, "objects": {}, "objtypes": {}, "objnames": {}, "titleterms": {"bare": [0, 12], "metal": [0, 12], "flow": [0, 2, 6, 7, 8, 9, 10, 11, 12], "exampl": [0, 4, 6, 7, 8, 9, 10, 11], "prerequisit": [0, 2, 6, 9, 11, 12], "assumpt": [0, 2, 6, 9, 11, 12], "step": [0, 2, 6, 7, 9, 11], "1": [0, 2, 6, 9, 11], "gener": [0, 2, 3, 6, 7, 8, 9, 10, 11, 12], "pl": [0, 2, 9, 11, 12], "design": [0, 2, 9, 11, 12], "vivado": [0, 2, 9, 10, 11, 12], "2": [0, 2, 6, 9, 11], "standalon": 0, "softwar": [0, 12], "viti": [0, 6, 7, 8, 9, 12], "3": [0, 2, 6, 9, 11], "boot": [0, 2, 6, 9, 11, 12], "baremet": 0, "applic": [0, 2, 6, 7, 8, 9, 11, 12], "option": [0, 7], "us": [0, 2, 3, 8, 9, 11], "jtag": 0, "bin": [0, 2, 6, 10, 11], "4": [0, 2, 6, 9, 11], "observ": 0, "uart": 0, "output": 0, "restor": 0, "linux": [0, 2, 6, 9, 11, 12], "imag": [0, 2], "licens": [0, 1, 2, 3, 5, 6, 7, 8, 9, 10, 11], "set": 1, "bootmod": 1, "custom": [2, 9, 11, 12], "carrier": [2, 12], "card": [2, 12], "align": [2, 6, 9, 11], "kria": [2, 6, 9, 11, 12], "som": [2, 6, 9, 10, 11, 12], "infrastructur": [2, 6, 9, 11], "petalinux": [2, 3, 6, 7, 9, 11, 12], "bsp": [2, 6, 9, 11], "creat": [2, 6, 8, 10], "board": [2, 9, 11], "file": [2, 3, 5, 6, 7, 8, 9, 10, 11, 12], "xdc": 2, "new": [2, 9, 11], "starter": [2, 6, 9, 11], "project": [2, 9, 11], "bit": [2, 6, 10, 11], "xsa": [2, 3, 9, 10, 11], "from": [2, 3, 6], "5": [2, 6, 9, 11], "target": [2, 5, 6, 7, 10, 11, 12], "platform": [2, 6, 7, 8, 9, 11, 12], "6": 2, "develop": [2, 12], "dtsi": [3, 6], "dtbo": [3, 6, 7, 8, 9, 10, 11], "overlai": [3, 7, 8, 9, 11], "xstc": 3, "dtg": 3, "dtc": 3, "tool": [3, 12], "input": 3, "requir": [3, 12], "compil": [3, 6, 9, 11], "fpgamanger_custom": 3, "bbclass": 3, "fpgamanger_dtg": 3, "On": [5, 12], "util": 5, "firmwar": [5, 12], "xmutil": 5, "dfx": 5, "mgr": 5, "shell": [5, 7, 8, 10], "json": [5, 7, 8, 10], "debug": 5, "resiz": 5, "part": 5, "acceler": [6, 7, 8, 9, 10, 11, 12], "obtain": [6, 7, 8], "id": 6, "step3": 6, "xclbin": [6, 7], "move": [6, 11], "user": [6, 11], "run": [6, 7, 11], "replac": 7, "dpu": 7, "filter2d": 7, "smartcam": 7, "alter": 7, "bitstream": 7, "modifi": 7, "includ": 7, "sw": 7, "stack": 7, "ad": 8, "vadd": 8, "gui": 8, "sysroot": 8, "test": [8, 10, 12], "packag": 9, "devic": [9, 11, 12], "tree": [9, 11, 12], "blob": [9, 11], "follow": 9, "introduct": 12, "hw": 12, "configur": 12, "build": 12, "deploi": 12, "portion": 12, "non": 12, "workflow": 12, "refer": 12, "document": 12, "extens": 12, "appendix": 12}, "envversion": {"sphinx.domains.c": 2, "sphinx.domains.changeset": 1, "sphinx.domains.citation": 1, "sphinx.domains.cpp": 6, "sphinx.domains.index": 1, "sphinx.domains.javascript": 2, "sphinx.domains.math": 2, "sphinx.domains.python": 3, "sphinx.domains.rst": 2, "sphinx.domains.std": 2, "sphinx.ext.intersphinx": 1, "sphinx.ext.todo": 2, "sphinx.ext.viewcode": 1, "sphinx": 56}})