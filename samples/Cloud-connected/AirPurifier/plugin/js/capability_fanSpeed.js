/*
 * Copyright (c) 2015 - 2017 Samsung Electronics Co., Ltd All Rights Reserved
 *
 * Licensed under the Apache License, Version 2.0 (the License);
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 * http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an AS IS BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */

var capabilityFanspeed = {
	'href' : "/capability/fanSpeed/main/0",
	'range' : [0, 100],

	'update' : function() {
		ocfDevice.getRemoteRepresentation(this.href, this.onRepresentCallback);
	},

	'onRepresentCallback' : function(result, deviceHandle, uri, rcsJsonString) {
		scplugin.log.debug(className, arguments.callee.name, result);
		scplugin.log.debug(className, arguments.callee.name, uri);

		if (result == "OCF_OK" || result == "OCF_RESOURCE_CHANGED" || result == "OCF_RES_ALREADY_SUBSCRIBED") {
			capabilityFanspeed.range = rcsJsonString["range"];
			var temp = parseInt((capabilityFanspeed.range[1] - capabilityFanspeed.range[0]) / 4);
			if (rcsJsonString["fanSpeed"] <= capabilityFanspeed.range[0] + temp * 1)
				document.getElementById("comboFanSpeed").value = "Sleep";
			else if (rcsJsonString["fanSpeed"] <= capabilityFanspeed.range[0] + temp * 2)
				document.getElementById("comboFanSpeed").value = "Low";
			else if (rcsJsonString["fanSpeed"] <= capabilityFanspeed.range[0] + temp * 3)
				document.getElementById("comboFanSpeed").value = "Medium";
			else
				document.getElementById("comboFanSpeed").value = "High";
		}
	},

	'set' : function(speed) {
		console.log ("fan speed : " + speed);
		var setRcsJson = {};
		var temp = parseInt((this.range[1] - this.range[0]) / 4);
		setRcsJson["fanSpeed"] = this.range[0] + temp * speed;
		scplugin.log.debug(className, arguments.callee.name, setRcsJson);
		ocfDevice.setRemoteRepresentation(this.href, setRcsJson, this.onRepresentCallback);
	}
}
