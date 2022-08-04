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

1. There is a time-bomb implemented in the capture & 10GigE pipeline IPs', so sensor streaming will be there for limited time.

2. After a while streaming the data, white screen may appear in Sphinx, it indicates that evaluation period has expired. For full version of IPs' user can contact IP vendor [Framos](sales@framos.com).

3. If user gets evaluation period expired error in Sphinx application, user can unload & load the application firmware using xmutil or to get full version of IPs, user can contact IP vendor [Euresys](https://www.euresys.com/en/About-us/Blog-event/News/New-GigE-Vision-Viewer-for-AMD-Xilinx-Kria-KR260-R).

4. The preview image quality displayed in Sphinx GEV Viewer may be poor. So, user can tune the sensor parameters using `v4l2-ctl` command mentioned in [Application Deployment](app_deployment.md) page.

5. Fiber optical cable should be connected to SFP+ connector before booting the KR260 board, otherwise user will get external abort kernel panic log in KR260 console.

6. Hot plugging of fiber optic cable is not supported.

7. Depends on the Host PC capability with Sphinx application frame rate may vary.

8. If user get any TIMEOUT error in Sphinx host application, KR260 device may get closed. In such case, exit the sphinx application and relauch it.

9. When gvrd application is stopped & re-launched again, user will get below error which can be ignored.

    ```
      Connected at:

      SIOCADDRT: File exists
      \*\*\* ERROR: exec failed
      \*\*\* ERROR: exec failed
    ```

10. s2imac driver probe may fail, when user loads the MV-Camera application firmware. In such case user can unload and load the MV-Camera firmware again.

11. Installing firmware binaries may cause dfx-mgr to crash and a restart is needed, which is listed in the known issues section. Once this is fixed an newer updates are available for dfx-manager, restart may not be needed.

    If dfx-manager crashes, restart it with this command:
    ```sudo systemctl restart dfx-mgr.service```

12. Randomly after running gst-launch command and sphinx, user may not see the preview image in sphinx GEV viewer. In such case check the framebuffer interrupt count using `cat/proc/interrupts`. If the interrupt count is not increasing, reboot the KR260 target and relaunch the MV Camera application.

13. Recommended to use Windows version of sphinx because sphinx GEV viewer in Ubuntu flashes set XML error at times.

## Next Steps

* Go back to the [Debug](debug.md)

<!---

Licensed under the Apache License, Version 2.0 (the "License"); you may not use this file except in compliance with the License.

You may obtain a copy of the License at http://www.apache.org/licenses/LICENSE-2.0.

Unless required by applicable law or agreed to in writing, software distributed under the License is distributed on an "AS IS" BASIS, WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied. See the License for the specific language governing permissions and limitations under the License.

-->