# Known issues

1. After the exit from GUI, you might see the following error prints on the terminal. These can be safely ignored.

```bash
root@kria:/home /ubuntu/Desktop# xterm: warning error event received:
X Error of failed request: BadDrawable (invalid Pixmap or Window parameter)
Major opcode of failed request:
76 (X
_ImageText8)
Resource id in failed request:
0x340002d
Serial number of failed request: 1246
Current serial number in output stream:
1258
```
2. While running the Jupyter Notebook, you might see the following error prints on the terminal. These can be safely ignored.

```bash 
[IPKernelApp] WARNING | debugpy_stream undefined, debugging will not be enabled
[IPKernelApp] ERROR | No such comm target registered: jupyter.widget.version
[IPKernelApp] ERROR | No such comm target registered: jupyter.widget.version
```

```bash
[W 09:34:52.011 NotebookApp] Forbidden
[W 09:34:52.012 NotebookApp] 403 GET /api/contents/master.ipynb?content=0&_=1712568650560 (172.23.93.58) 3.080000ms referer=http://10.140.37.99:8888/notebooks/master.ipynb
[W 09:34:52.035 NotebookApp] Forbidden
[W 09:34:52.036 NotebookApp] 403 PUT /api/contents/master.ipynb (172.23.93.58) 3.280000ms referer=http://10.140.37.99:8888/notebooks/master.ipynb
[W 09:36:52.030 NotebookApp] Forbidden
```

### Next Steps

- [Application Deployment](app_deployment.md)
- Go back to the [KR260 SOM GPS-1588-PTP App Start Page](../gps_1588_ptp_precision_time_mgmt)



<!---

Licensed under the Apache License, Version 2.0 (the "License"); you may not use this file except in compliance with the License.

You may obtain a copy of the License at http://www.apache.org/licenses/LICENSE-2.0.

Unless required by applicable law or agreed to in writing, software distributed under the License is distributed on an "AS IS" BASIS, WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied. See the License for the specific language governing permissions and limitations under the License.

-->

<p class="sphinxhide" align="center">Copyright (C) 2023 Advanced Micro Devices, Inc.</p>

