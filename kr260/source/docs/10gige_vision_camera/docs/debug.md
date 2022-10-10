<table>
 <tr>
   <td align="center"><img src="https://www.xilinx.com/content/dam/xilinx/imgs/press/media-kits/corporate/xilinx-logo.png" width="30%"/><h1>Kria&trade; KR260 Robotics Starter Kit</h1>
   </td>
 </tr>
 <tr>
 <td align="center"><h1>Machine Vision Camera Tutorial</h1>
 
 </td>
 </tr>
</table>

# Debug

1. To get Max fps in sphinx GEV viewer user can change the draw value in sphinx --> options based on the host type (windows or ubuntu)

    - On ubuntu host,

         For 60 fps user must set the draw value to `10` 
         For 120 fps user must set the draw value to `50`

    - On windows host,

         For 60/120 fps user must set the draw value to `10`

         ![Sphinx GE Viewer](media/Sphinx_GE_Viewer.png)

2. To cross check the connection between KR260 target and host use ping functionality. For Example, ping -I `<10G_interface_name> <ip address>`

3. To identify whether NIC card is inserted properly or not in ubuntu host machine PCIe slot, run this command `lspci -vvv | grep -i "82599 10 Gigabit Network"`

4. After inserting the 10G NIC card in windows host machine PCIe slot check device manager for device detection and driver installation. If driver is not installed for this device install the driver from the given link: [NIC Card driver](https://www.intel.com/content/www/us/en/download/15084/intel-ethernet-adapter-complete-driver-pack.html).

5. If user get -1 for `xmutil loadapp <app name>`, try to unload the existing app firmware using `xmutil unloadapp` and then load the preferred app firmware.

6. To trigger the sensor stream-on, run the Gstreamer capture pipeline in background using gst-launch-1.0 utility before starting 10GigE application.

## Next Steps

* [Known Issues](known_issues.md)
* Go back to the [MV Camera Application Deployment](app_deployment.md)

<!---

Licensed under the Apache License, Version 2.0 (the "License"); you may not use this file except in compliance with the License.

You may obtain a copy of the License at http://www.apache.org/licenses/LICENSE-2.0.


Unless required by applicable law or agreed to in writing, software distributed under the License is distributed on an "AS IS" BASIS, WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied. See the License for the specific language governing permissions and limitations under the License.

-->

<p align="center"><sup>Copyright&copy; 2022 Xilinx</sup></p>