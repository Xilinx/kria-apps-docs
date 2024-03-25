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

# Known Issues

First review the [FAQ](https://xilinx.github.io/kria-apps-docs/faq.html) for commonly encountered issues across AMD Kria&trade; SOM applications.

1. There is a time-bomb implemented in the capture & 10GigE pipeline IPs, so sensor streaming is there for a limited time.

2. After streaming the data for a while, a white screen might appear in Sphinx, which indicates that the evaluation period has expired. For a full version of IPs, contact the IP vendor [Framos](sales@framos.com).

3. If you get the evaluation period expired error in Sphinx application, unload and load the application firmware using xmutil or to get full version of IPs. You can contact the IP vendor [Euresys](https://www.euresys.com/en/About-us/Blog-event/News/New-GigE-Vision-Viewer-for-AMD-Xilinx-Kria-KR260-R).

4. The quality of the preview image displayed in Sphinx GEV Viewer might be unsatisfactory. So you can tune the sensor parameters using `v4l2-ctl` command mentioned in the [Application Deployment](app_deployment.md) page.

5. Fiber optical cable should be connected to SFP+ connector before booting the KR260 board. Otherwise, you will get an external abort kernel panic log in KR260 console.

6. Hot plugging of fiber optic cable is not supported.

7. Depends on the Host PC capability with Sphinx application frame rate might vary.

8. If you get any TIMEOUT error in the Sphinx host application, KR260 device might get closed. In such cases, exit the sphinx application and relaunch it.

9. When gvrd application is stopped and relaunched, you get the following error that can be ignored.

    ```
      Connected at:

      SIOCADDRT: File exists
      \*\*\* ERROR: exec failed
      \*\*\* ERROR: exec failed
    ```

10. s2imac driver probe might fail when you load the MV-Camera application firmware. In such cases, unload and reload the MV-Camera firmware.

11. Randomly after running gst-launch command and sphinx, you might not see the preview image in sphinx GEV viewer. In such cases, check the framebuffer interrupt count using `cat/proc/interrupts`. If the interrupt count is not increasing, reboot the KR260 target and relaunch the MV-Camera application.

12. Recommended to use Windows version of sphinx because sphinx GEV viewer in Ubuntu flashes set XML error at times.

13. Appearing optical black lines at the top of the live in the display output.

14. Sometimes, white lines appear at the top of the final output display.

# Limitations

1. MV-Defect-Detect pipeline supports max 60 fps.

2. MV-Defect-Detect pipeline is sensitive to lighting conditions.

3. There is no hardened ISP in KR260 board, and there is no enough PL resources available to add soft ISP (HLS). So there might be a deviation in the expected accuracy out from mv-defect-detect application.

## Next Steps

* Go back to the [Debug](debug.md)

<!---

Licensed under the Apache License, Version 2.0 (the "License"); you may not use this file except in compliance with the License.

You may obtain a copy of the License at http://www.apache.org/licenses/LICENSE-2.0.

Unless required by applicable law or agreed to in writing, software distributed under the License is distributed on an "AS IS" BASIS, WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied. See the License for the specific language governing permissions and limitations under the License.

-->
<p align="center"><sup>Copyright&copy; 2023 Advan ced Micro Devices, Inc.</sup></p>