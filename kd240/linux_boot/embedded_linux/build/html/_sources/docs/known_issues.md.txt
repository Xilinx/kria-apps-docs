# Known Issues

1. On Ubuntu 24.04 and Yocto 2024.2, the Linux image (Ubuntu or Yocto generated wic image) is shared between different starter kits (e.g. the same image works across KD240, KR260, KV260). However, the SD card would be "locked in" to the started kit on which it first booted. E.g. once you have booted the common image on a KV260, you will not be able to re-use the same SD card with the shared common Linux image on a KR260 or a KD240. This is because on initial boot, the default bitstream will be locked in based on EEPROM reading on first boot, and this is not updated on subsequent boots.

## Miscellaneous Information


If needed, the following commands are used to set the System Timezone and locale:

* Set timezone:

   ```bash
   sudo timedatectl set-ntp true
   sudo timedatectl set-timezone America/Los_Angeles
   timedatectl
   ```

* Set locale:

   ```bash
   sudo locale-gen en_US en_US.UTF-8
   sudo update-locale LC_ALL=en_US.UTF-8 LANG=en_US.UTF-8
   export LANG=en_US.UTF-8
   locale
   ```

The following example command sets the date and time:

`sudo date --set "11 January 2023 16:47:00"`

<p class="sphinxhide" align="center">Copyright&copy; 2023 Advanced Micro Devices, Inc</p>
