
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

# Limitations

Defect Detection algorithm is evolving and will be updated in further releases. The present algorithm has the following limitations:

* Only the MIPI interface camera is supported in this design
* Sensors other than AR0144 are not supported in this design.
* This design has been validated only with 1280x800 resolution. 
* This design supports only GRAY8 (Y8) format.
* System is not intelligent enough to identify whether the input is a mango. Therefore, pass only mangoes as input.
* Input to system must only be one mango at a time.
* The mango background should be black.
* The Defect Detection Jupyter lab can only be run as the `root` user.


# Known Issues

The known issues with the Defect Detection application are as follows:

* For some mangoes, defects at the corner of the mangoes are not detected by the current defect detection algorithm. 
* Contours may be detected at the edges of the mangoes. 


### License

Licensed under the Apache License, Version 2.0 (the "License"); you may not use this file except in compliance with the License.

You may obtain a copy of the License at
[http://www.apache.org/licenses/LICENSE-2.0](http://www.apache.org/licenses/LICENSE-2.0)


Unless required by applicable law or agreed to in writing, software distributed under the License is distributed on an "AS IS" BASIS, WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied. See the License for the specific language governing permissions and limitations under the License.

<p align="center"><sup>Copyright&copy; 2021 Xilinx</sup></p>
