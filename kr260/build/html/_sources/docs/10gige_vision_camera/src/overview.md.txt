<table class="sphinxhide">
 <tr>
   <td align="center"><img src="https://raw.githubusercontent.com/Xilinx/Image-Collateral/main/xilinx-logo.png" width="30%"/><h1>Kria&trade; KR260 Robotics Starter Kit</h1>
   </td>
 </tr>
 <tr>
 <td align="center"><h1>10GigE Machine Vision Camera Tutorial</h1>
 
 </td>
 </tr>
</table>

# Overview

The Machine Vision (MV) Camera Application uses a Sony IMX547 sensor, mono or color module, which interfaces to the KR260 board with the widely adopted SLVS-EC interface standard.

The SLVS-EC receiver IPs [(Third Party IP from Framos)](https://www.framos.com/framos-slvs-ec-rx-ip-core)  converts the incoming sensor data to MONO or BAYER8 stream data.  

This stream data is broadcasted to two paths, 10GigE pipeline and Defect Detect pipeline.

The 10GigE Vision pipeline IPs [(Third Party IP from Sensor-to-Image)](https://www.euresys.com/en/Products/IP-Cores/Vision-Standard-IP-Cores-for-FPGA/GigE-Vision-IP-Core-(2)) transmits the stream data on the SFP+ interface available on the KR260 carrier card. The 10GigE packets are sent to host machine. The Frame Grabber software interprets the incoming packets and displays it the Sphinx GEV Viewer. 

Defect Detect pipeline uses AMD Vitis&trade; Vision libraries to build a defect detection function for  mangoes. The sensor could be pointing to queue of mangoes and the defect detect application can indicate which mangoes are defective.  This is the acceleration function implemented in the design and can replaced by any other acceleration function as desired. The output of the defect detection is displayed on a monitor.

The MV-Camera high level pipeline is depicted in the following figure:

![KR260 Overview Diagram](media/Overview_diagram.PNG)

The third-party IPs are not open-source. To create custom designs, contact the third-party vendors via [Product Inquiry](https://www.xilinx.com/products/app-store/kria/10gige-vision-camera/product-inquiry.html) 

## Features

1) IMX547 Camera Sensor color or mono with 5.1 Mega Pixel, 2472 x 2128 resolution with max framerate of 122 fps.

2) Sphinx GEV Viewer running on X86 host PC to display the live streaming data through 10GigE pipeline.

3) MV-Defect-Detect acceleration application to detect defects in the input mango images, displayed on monitor connected to the KR260.

## References
* [Kria™ KR260 Robotics Starter Kit](https://www.amd.com/en/products/system-on-modules/kria/k26/kr260-robotics-starter-kit.html)
* [HW-IMX547C-SK-G Camera Kit Color ](https://www.amd.com/en/products/system-on-modules/kria/k26/kr260-robotics-starter-kit/imx547-camera-kit-color.html)
* [HW-IMX547M-SK-G Camera Kit Monochrome](https://www.amd.com/en/products/system-on-modules/kria/k26/kr260-robotics-starter-kit/imx547-camera-kit-monochrome.html)


## Next Steps

* [Introduction](introduction.md)
* Go back to the [MV Camera Landing Page](../10gige_vision_camera_landing)



<hr class="sphinxhide"></hr>

<p class="sphinxhide" align="center"><sub>Copyright © 2023–2024 Advanced Micro Devices, Inc.</sub></p>

<p class="sphinxhide" align="center"><sup><a href="https://www.amd.com/en/corporate/copyright">Terms and Conditions</a></sup></p>
