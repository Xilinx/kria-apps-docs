<table class="sphinxhide">
 <tr>
   <td align="center"><img src="https://raw.githubusercontent.com/Xilinx/Image-Collateral/main/xilinx-logo.png" width="30%"/><h1>Kria&trade; KR260 Robotics Starter Kit</h1>
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

4. The quality of the preview image displayed in Sphinx GEV Viewer might be unsatisfactory. So you can tune the sensor parameters using `v4l2-ctl` or `qv4l2` command mentioned in the [Application Deployment](app_deployment.md) page.

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

12. The mv-camera mono/color firmware fails to probe the imx547 mono/color sensor on the second load of the mv-camera firmware. Due to this the sensor never gets
probed and added to media subsystem in Linux. To recover from this, workaround is to reboot the system using `sudo reboot`.

    ```bash
      ubuntu@kria:~$ sudo xmutil unloadapp
      ubuntu@kria:~$ sudo xmutil loadapp kr260-mv-camera-color
      [sudo] password for ubuntu:
      remove from slot 0 returns: 0 (Ok)
      [ 1253.237678] OF: overlay: WARNING: memory leak will occur if overlay removed, property: /fpga-full/firmware-name
      [ 1253.247909] OF: overlay: WARNING: memory leak will occur if overlay removed, property: /fpga-full/resets
      [ 1253.502242] xilinx_axienet a0070000.ethernet: missing axistream-connected property
      [ 1253.509963] Getting DMA resource failed
      [ 1253.515192] s2imac a0060000.xgige: Couldn't lock phy base address region at 000000005f7d6d0f
      kr260-mv-camera-color: loaded to slot 0
      [ 1253.626369] zocl-drm axi:zyxclmm_drm: IRQ index 8 not found

      ubuntu@kria:~$ sudo dmesg | grep imx547
      [ 1253.554501] imx547: module is from the staging directory, the quality is unknown, you have been warned.
      [ 1253.557744] imx547 7-001a: imx547 : imx547 probe success !

      ubuntu@kria:~$ sudo xmutil unloadapp
      [ 1265.362765] OF: ERROR: memory leak, expected refcount 1 instead of 2, of_node_get()/of_node_put() unbalanced - destroy cset entry: attach overlay node /axi/isp_subset_convertor_0/ports/port@1/endpoint
      [ 1265.382806] OF: ERROR: memory leak, expected refcount 1 instead of 2, of_node_get()/of_node_put() unbalanced - destroy cset entry: attach overlay node /axi/isp_subset_convertor_0/ports/port@0/endpoint
      [ 1265.400949] OF: ERROR: memory leak, expected refcount 1 instead of 2, of_node_get()/of_node_put() unbalanced - destroy cset entry: attach overlay node /axi/isp_subset_convertor_0/ports
      [ 1265.417627] OF: ERROR: memory leak, expected refcount 1 instead of 2, of_node_get()/of_node_put() unbalanced - destroy cset entry: attach overlay node /axi/ISPPipeline_accel@b0000000/ports/port@1/endpoint
      [ 1265.436084] OF: ERROR: memory leak, expected refcount 1 instead of 2, of_node_get()/of_node_put() unbalanced - destroy cset entry: attach overlay node /axi/ISPPipeline_accel@b0000000/ports/port@0/endpoint
      [ 1265.454374] OF: ERROR: memory leak, expected refcount 1 instead of 2, of_node_get()/of_node_put() unbalanced - destroy cset entry: attach overlay node /axi/ISPPipeline_accel@b0000000/ports
      remove from slot 0 returns: 0 (Ok)

      ubuntu@kria:~$ sudo dmesg -c            //To clean older dmesg logs
      ubuntu@kria:~$ sudo xmutil loadapp kr260-mv-camera-color
      [ 1275.756314] OF: overlay: WARNING: memory leak will occur if overlay removed, property: /fpga-full/firmware-name
      [ 1275.766502] OF: overlay: WARNING: memory leak will occur if overlay removed, property: /fpga-full/resets
      [ 1275.929637] imx547 7-001a: GT TRX Reset GPIO not setup in DT
      [ 1275.930456] xilinx_axienet a0070000.ethernet: can't request region for resource [mem 0xa0070000-0xa007ffff]
      [ 1275.955302] zocl-drm axi:zyxclmm_drm: IRQ index 8 not found
      kr260-mv-camera-color: loaded to slot 0

      ubuntu@kria:~$ sudo dmesg | grep imx547
      [  122.329434] imx547 7-001a: GT TRX Reset GPIO not setup in DT
      [  122.335272] imx547: probe of 7-001a failed with error -16
    ```

# Limitations

1. MV-Defect-Detect pipeline supports max 60 fps.

2. MV-Defect-Detect pipeline is sensitive to lighting conditions.

3. There is no hardened ISP in KR260 board, and there is no enough PL resources available to add soft ISP (HLS). So there might be a deviation in the expected accuracy out from mv-defect-detect application.

4. The MV-Defect-Detect application at stage `-o 2` runs at only 25fps.

## Next Steps

* Go back to the [Debug](debug.md)


<hr class="sphinxhide"></hr>

<p class="sphinxhide" align="center"><sub>Copyright © 2023–2024 Advanced Micro Devices, Inc.</sub></p>

<p class="sphinxhide" align="center"><sup><a href="https://www.amd.com/en/corporate/copyright">Terms and Conditions</a></sup></p>
