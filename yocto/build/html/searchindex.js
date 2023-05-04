Search.setIndex({"docnames": ["docs/library_dependency", "docs/yocto_kria_support", "docs/yocto_port_example", "index"], "filenames": ["docs\\library_dependency.md", "docs\\yocto_kria_support.md", "docs\\yocto_port_example.md", "index.rst"], "titles": ["Library Dependency", "Yocto Kria Support", "Porting an Application to PetaLinux - Smartcam", "Yocto Support"], "terms": {"some": [0, 1, 2], "exampl": [0, 1, 2], "applic": [0, 1], "ar": [0, 1, 2], "specif": [0, 1, 2], "version": [0, 1, 2], "viti": [0, 2], "vva": [0, 2], "packag": [0, 1], "name": [0, 1], "accel": [0, 2], "lib": [0, 2], "petalinux": [0, 1], "renam": 0, "from": [0, 1, 2], "iva": 0, "2021": [0, 1, 2], "1": [0, 1], "older": 0, "tool": [0, 1, 2], "essenti": 0, "ubuntu": [0, 2], "github": [0, 1, 2], "page": [0, 1, 2], "here": [0, 1, 2], "ai": [0, 2], "vai": 0, "xrt": [0, 2], "zocl": [0, 2], "The": [0, 1, 2], "alwai": 0, "backward": [0, 2], "compat": [0, 2], "us": [0, 1, 2], "you": [0, 1, 2], "need": [0, 2], "instal": [0, 1], "those": 0, "when": [0, 1, 2], "app": [0, 2], "through": 0, "feed": 0, "docker": 0, "per": [0, 2], "deploy": 0, "document": [0, 1, 2], "appropri": 0, "default": [0, 1], "manual": 0, "flow": 0, "yocto": [0, 2], "port": 0, "take": 0, "care": 0, "These": 0, "wa": [0, 1, 2], "verifi": [0, 2], "releas": [0, 1], "bsp": [0, 2], "2022": [0, 1, 2], "202210": [0, 2], "2": [0, 1], "13": [0, 2], "479": [0, 2], "5": [0, 1], "0": [0, 1, 2], "202110": 0, "11": 0, "4": 0, "2020": 0, "202020": 0, "8": 0, "3": 0, "note": [0, 1, 2], "first": [0, 2], "otherwis": [0, 2], "latest": [0, 2], "similarli": 0, "mai": [0, 1, 2], "under": [0, 1, 2], "apach": [0, 1, 2], "thi": [0, 1, 2], "file": [0, 1, 2], "except": [0, 1, 2], "complianc": [0, 1, 2], "obtain": [0, 1, 2], "copi": [0, 1, 2], "http": [0, 1, 2], "www": [0, 1, 2], "org": [0, 1, 2], "unless": [0, 1, 2], "requir": [0, 2], "law": [0, 1, 2], "agre": [0, 1, 2], "write": [0, 1, 2], "softwar": [0, 1], "distribut": [0, 1, 2], "an": [0, 1], "AS": [0, 1, 2], "IS": [0, 1, 2], "basi": [0, 1, 2], "without": [0, 1, 2], "warranti": [0, 1, 2], "OR": [0, 1, 2], "condit": [0, 1, 2], "OF": [0, 1, 2], "ani": [0, 1, 2], "kind": [0, 1, 2], "either": [0, 1, 2], "express": [0, 1, 2], "impli": [0, 1, 2], "see": [0, 1, 2], "languag": [0, 1, 2], "govern": [0, 1, 2], "permiss": [0, 1, 2], "limit": [0, 1, 2], "copyright": [0, 1, 2], "xilinx": [0, 1, 2], "run": 2, "os": 2, "develop": [1, 2], "can": [1, 2], "guid": 2, "own": 2, "onto": 2, "start": [1, 2], "newer": 2, "support": 2, "give": 2, "opportun": 2, "show": 2, "process": [1, 2], "one": 2, "It": [1, 2], "assum": 2, "have": [1, 2], "alreadi": 2, "familiar": [1, 2], "There": 2, "wai": 2, "toolchain": 2, "follow": 2, "two": 2, "method": 2, "ha": [1, 2], "overlap": 2, "eachoth": 2, "therefor": 2, "thei": 2, "same": [1, 2], "section": [1, 2], "new": [1, 2], "move": [1, 2], "outlin": 2, "how": [1, 2], "kv260": [1, 2], "download": [1, 2], "boot": [1, 2], "starter": [1, 2], "kit": [1, 2], "linux": 2, "pre": [1, 2], "built": 2, "sd": 2, "card": 2, "onc": [1, 2], "git": [1, 2], "repositori": 2, "sudo": [1, 2], "dnf": 2, "y": [1, 2], "clone": 2, "branch": [1, 2], "xlnx": 2, "rel": [1, 2], "v2022": [1, 2], "1_update4": 2, "com": [1, 2], "kria": 2, "xlnx_rel_v2022": 2, "next": 2, "correct": 2, "locat": 2, "cd": 2, "board": 2, "dtc": 2, "o": 2, "dtb": 2, "dtbo": 2, "dtsi": 2, "binari": 2, "devic": 2, "tree": 2, "error": [1, 2], "ignor": 2, "home": 2, "cp": 2, "r": 2, "ap1302_ar1335_single_fw": 2, "bin": [1, 2], "runtim": 2, "depend": [1, 2], "onli": [1, 2], "zcol": 2, "them": 2, "prevent": 2, "other": [1, 2], "tip": 2, "below": [1, 2], "sh": 2, "sourc": [1, 2], "save": 2, "time": 2, "librari": [1, 2], "which": [1, 2], "so": [1, 2], "instruct": 2, "find": [1, 2], "more": 2, "inform": [1, 2], "befor": [1, 2], "dev": 2, "rest": 2, "glog": 2, "gstreamer1": 2, "rtsp": 2, "server": 2, "opencv": 2, "self": 2, "host": 2, "gst": 2, "perf": 2, "omx": 2, "python": 2, "v4l": 2, "util": [1, 2], "alsa": 2, "plugin": 2, "bad": 2, "faac": 2, "mpegtsmux": 2, "good": 2, "rtp": 2, "km": 2, "mediasrcbin": 2, "videoparsersbad": 2, "multifil": 2, "rtpmanag": 2, "udp": 2, "video4linux2": 2, "libdrm": 2, "python3": 2, "core": [1, 2], "lastli": 2, "mkdir": 2, "cmake": 2, "dcmake_install_prefix": 2, "make": [1, 2], "j": 2, "avail": 2, "opt": 2, "final": [1, 2], "xmutil": [1, 2], "listapp": 2, "should": [1, 2], "up": [1, 2], "list": [1, 2], "unloadapp": 2, "unload": 2, "exist": [1, 2], "loadapp": 2, "load": [1, 2], "m": 2, "esdk": 2, "updat": [1, 2], "later": [1, 2], "asynchron": 2, "includ": [1, 2], "main": 2, "To": [1, 2], "extract": 2, "accept": 2, "s": 2, "set": [1, 2], "script": [1, 2], "v2021": 2, "sdk": 2, "publish": 2, "upgrad": 2, "update1": 2, "u": [1, 2], "sswreleas": 2, "sdkupdat": 2, "1_update1": 2, "p": 2, "aarch64": 2, "now": 2, "som": [1, 2], "wiki": [1, 2], "t": [1, 2], "starterkit": [1, 2], "timestamp": 2, "we": [1, 2], "ad": 2, "bring": 2, "togeth": 2, "spec": 2, "meta": [1, 2], "user": 2, "folder": 2, "layer": [1, 2], "thats": 2, "confirm": 2, "look": [1, 2], "conf": [1, 2], "bblayer": 2, "after": 2, "If": [1, 2], "choos": 2, "sure": [1, 2], "bitstream": 2, "its": [1, 2], "associ": 2, "xclbin": 2, "shell": 2, "json": 2, "_": [1, 2], "keep": 2, "example_firmwar": 2, "content": 2, "bb": 2, "commit": [1, 2], "id": 2, "correspond": 2, "tag": 2, "update4": 2, "summari": 2, "design": 2, "proprietari": 2, "gpl": 2, "lic_files_chksum": [1, 2], "workdir": 2, "md5": [1, 2], "fa9b03ada9ffccf51dd60899bf28c702": 2, "gplv2": 2, "9afdcd1be3f71bd3791fa5961075d776": 2, "specifi": [1, 2], "src_uri": [1, 2], "protocol": [1, 2], "srcrev": [1, 2], "9d7d92d8a89f911ae8c1b0a25316c924c1a4ff3f": 2, "repo": [1, 2], "inherit": 2, "fpgamanager_custom": 2, "package_arch": 2, "machine_arch": 2, "fw_dir": 2, "compatible_machin": 2, "k26": [1, 2], "kv": [1, 2], "machin": 2, "ar1335": 2, "mipi": 2, "sensor": 2, "call": 2, "inc": [1, 2], "singl": 2, "fw_name": 2, "abov": 2, "txt": 2, "9c13aad1aab42f76326f1beceafc40c4": 2, "63e20752dc8b1e91fc6d6d518ebeb76f65e9f738": 2, "do_configur": 2, "noexec": 2, "do_compil": 2, "do_instal": 2, "d": [1, 2], "0644": 2, "pn": 2, "Then": 2, "a9c5ded2ac97b4ce01aa0ace8f3a1755": 2, "ad9523ee5f002141334698eb6ddc9a14679ac8d2": 2, "rdepend": 2, "somapp_install_path": 2, "extra_oecmak": 2, "dcmake_build_typ": 2, "dcmake_sysroot": 2, "staging_dir_host": 2, "want": [1, 2], "group": 2, "both": [1, 2], "well": [1, 2], "driver": 2, "ug1144": 2, "also": [1, 2], "detail": 2, "descript": [1, 2], "relat": 2, "example_packag": 2, "line": 2, "rootfsconfig": 2, "config_packagegroup": 2, "enabl": [1, 2], "command": [1, 2], "get": [1, 2], "configur": 2, "gui": 2, "config": [1, 2], "c": [1, 2], "rootf": 2, "go": 2, "all": [1, 2], "place": 2, "bootfil": 2, "ramdisk": 2, "cpio": 2, "gz": 2, "scr": 2, "system": [1, 2], "flash": 2, "sdimag": 2, "result": [1, 2], "rmp": 2, "found": [1, 2], "tmp": [1, 2], "deploi": [1, 2], "xilinx_k26_kv": 2, "r0": 2, "cortexa72_cortexa53": 2, "config_tmp_dir_loc": 2, "22": 2, "howev": 2, "incompat": 2, "automat": 2, "correctli": [1, 2], "execut": [1, 2], "displai": 2, "screen": 2, "contain": 1, "gener": 1, "abstract": 1, "extra": 1, "xsct": 1, "xsdb": 1, "etc": 1, "vs": 1, "differ": 1, "backend": 1, "e": 1, "g": 1, "base": 1, "project": 1, "provid": 1, "extens": 1, "recommend": 1, "yourself": 1, "concept": 1, "continu": 1, "defin": 1, "given": 1, "each": 1, "For": 1, "bitbak": 1, "imag": 1, "full": 1, "cmdline": 1, "smk": 1, "output": 1, "produc": 1, "perspect": 1, "pleas": 1, "chang": 1, "between": 1, "2023": 1, "qspi": 1, "na": 1, "product": 1, "wic": 1, "dynam": 1, "kr260": 1, "kr": 1, "flat": 1, "pc": 1, "meet": 1, "nf": 1, "mount": 1, "local": 1, "scratch": 1, "disk": 1, "besid": 1, "possibl": 1, "addit": 1, "curl": 1, "storag": 1, "googleapi": 1, "chmod": 1, "x": 1, "your": 1, "path": 1, "mv": 1, "add": 1, "usag": 1, "messag": 1, "invok": 1, "help": 1, "flag": 1, "fetch": 1, "init": 1, "manifest": 1, "b": 1, "sync": 1, "setupsdk": 1, "tmpdir": 1, "variou": 1, "complet": 1, "runqemu": 1, "nograph": 1, "slirp": 1, "exit": 1, "ctrl": 1, "dure": 1, "creat": 1, "dir": 1, "option": 1, "qemuboot": 1, "In": 1, "combin": 1, "hardwar": 1, "emul": 1, "accord": 1, "comment": 1, "most": 1, "assign": 1, "valu": 1, "order": 1, "influenc": 1, "replac": 1, "previous": 1, "ones": 1, "seri": 1, "prioriti": 1, "consid": 1, "pars": 1, "few": 1, "taken": 1, "codebas": 1, "kria_arch_packag": 1, "append": 1, "cmd": 1, "bootfile_ext": 1, "machineoverrid": 1, "log": 1, "came": 1, "redirect": 1, "got": 1, "serial": 1, "consol": 1, "serial_consol": 1, "oper": 1, "jtoomei": 1, "poki": 1, "zynqmp": 1, "46": 1, "115200": 1, "ttyps0": 1, "common": 1, "14": 1, "ttyps1": 1, "380": 1, "doc": 1, "tty": 1, "getti": 1, "918": 1, "_defaultv": 1, "getvar": 1, "qemuarm64": 1, "virtual": 1, "distro": 1, "virt": 1, "xen": 1, "15": 1, "ttyama0": 1, "expans": 1, "ask": 1, "john": 1, "bake": 1, "where": 1, "relev": 1, "krai": 1, "individu": 1, "compon": 1, "purpos": 1, "integr": 1, "debug": 1, "might": 1, "necessari": 1, "point": 1, "src": 1, "uri": 1, "out": 1, "diff": 1, "index": 1, "f83bcb3": 1, "2839b62": 1, "100644": 1, "b5b1ad13bcc48d4cbd20476c97d05589bdfc7772": 1, "gitenterpris": 1, "0000000000000000000000000000000000000000": 1, "master": 1, "mit": 1, "0835ade698e0bcf8506ecda2f7b4f302": 1, "been": 1, "rebuilt": 1, "pick": 1, "code": 1, "clean": 1, "forc": 1, "hsi": 1, "couldn": 1, "libxv_commontask": 1, "mayb": 1, "miss": 1, "libtinfo5": 1, "apt": 1}, "objects": {}, "objtypes": {}, "objnames": {}, "titleterms": {"librari": 0, "depend": 0, "licens": [0, 1, 2], "port": 2, "an": 2, "applic": 2, "petalinux": 2, "smartcam": 2, "build": [1, 2], "target": 2, "wic": 2, "imag": 2, "rpm": 2, "packag": 2, "step": 2, "1": 2, "creat": 2, "project": 2, "2": 2, "add": 2, "recip": [1, 2], "fpga": 2, "firmwar": 2, "3": 2, "ap1302": 2, "4": 2, "softwar": 2, "5": 2, "packagegroup": 2, "6": 2, "option": 2, "bake": 2, "gener": 2, "instal": 2, "releas": 2, "7": 2, "test": 2, "yocto": [1, 3], "support": [1, 3], "kria": 1, "machin": 1, "configur": 1, "host": 1, "requir": 1, "prepar": 1, "environ": 1, "artifact": 1, "qemu": 1, "variabl": 1, "overrid": 1, "work": 1, "llibrari": 1, "issu": 1}, "envversion": {"sphinx.domains.c": 2, "sphinx.domains.changeset": 1, "sphinx.domains.citation": 1, "sphinx.domains.cpp": 6, "sphinx.domains.index": 1, "sphinx.domains.javascript": 2, "sphinx.domains.math": 2, "sphinx.domains.python": 3, "sphinx.domains.rst": 2, "sphinx.domains.std": 2, "sphinx.ext.intersphinx": 1, "sphinx.ext.todo": 2, "sphinx.ext.viewcode": 1, "sphinx": 56}})