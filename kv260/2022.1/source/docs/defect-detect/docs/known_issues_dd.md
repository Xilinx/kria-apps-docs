
<table class="sphinxhide">
 <tr>
   <td align="center"><img src="../../media/xilinx-logo.png" width="30%"/><h1>Kria&trade; KV260 Vision AI Starter Kit Defect Detection Tutorial</h1>
   </td>
 </tr>
 <tr>
 <td align="center"><h1>Known Issues and Limitations</h1>

 </td>
 </tr>
</table>

First review the [FAQ](https://xilinx.github.io/kria-apps-docs/faq/build/html/docs/faq.html) for commonly encountered issues across the Kria SOM applications.

# Limitations

The Defect Detection algorithm is evolving and will be updated in further releases. The present algorithm has the following limitations:

* Only the MIPI interface camera is supported in this design.
* Sensors other than AR0144 are not supported in this design.
* This design has been validated only with 1280x800 resolution.
* This design supports only GRAY8 (Y8) format.
* System is not intelligent enough to identify whether the input is a mango. Therefore, pass only mangoes as input.
* Input to the system must only be one mango at a time.
* The mango background should be black.

# Known Issues

The known issues with the Defect Detection application are as follows:

* For some mangoes, defects at the corner of the mangoes are not detected by the current defect detection algorithm.
* Contours might be detected at the edges of the mangoes.
* While running the application, you can see the following error message which can be ignored.

  ```bash
  /opt/xilinx/kv260-defect-detect/bin/ar0144-sensor-calib.sh: 38: Syntax error: "(" unexpected
  ```

* On some monitors, you might see the following error during modetest; it can be ignored:

  ```
  ubuntu@kria:~$ modetest -M xlnx -D B0010000.v_mix -s 52@40:3840x2160@NV16
  setting mode 3840x2160-30.00Hz on connectors 52, crtc 40
  failed to set gamma: Function not implemented
  ```

## Next Steps

* [KV260 SOM Defect Detect Design Start Page](../defectdetect_landing)


<p class="sphinxhide" align="center"><sub>Copyright © 2021-2024 Advanced Micro Devices, Inc</sub></p>

<p class="sphinxhide" align="center"><sup><a href="https://www.amd.com/en/corporate/copyright">Terms and Conditions</a></sup></p>