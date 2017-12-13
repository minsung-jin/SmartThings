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

var capabilityAudioVolume = {
	'href' : "/capability/audioVolume/main/0",
	'value' : "50",
	'muteState' : false,

	'update' : function() {
		ocfDevice.getRemoteRepresentation(this.href, this.onRepresentCallback);
	},

	'onRepresentCallback' : function(result, deviceHandle, uri, rcsJsonString) {
		scplugin.log.debug(className, arguments.callee.name, result);
		scplugin.log.debug(className, arguments.callee.name, uri);

		if (result == "OCF_OK" || result == "OCF_RESOURCE_CHANGED" || result == "OCF_RES_ALREADY_SUBSCRIBED") {
			capabilityAudioVolume.value = rcsJsonString["volume"];
			capabilityAudioVolume.muteState =  rcsJsonString["mute"];

			var styleText = "";
			var image = document.getElementById("volumebutton");
			if (capabilityAudioVolume.muteState == true) {
				image.style.content = "url(res/ic_mute.svg)";
				document.getElementById("volume_value").value = "0";
				styleText += '#' + 'volume_value' + '::-webkit-slider-runnable-track{background-size:' + '0' + '% 100%} ';
				styleText += '#' + 'volume_value' + '::-webkit-slider-thumb{background-color: #d6d6d6}';
				inlineStyle.textContent = styleText;
			} else {
				image.style.content = "url(res/ic_volume.svg)";
				styleText += '#' + 'volume_value' + '::-webkit-slider-runnable-track{background-size:' + capabilityAudioVolume.value + '% 100%} ';
				inlineStyle.textContent = styleText;
				document.getElementById("volume_value").value = capabilityAudioVolume.value;
			}
		}
	},

	'setVolume' : function(value) {
		scplugin.log.debug(className, arguments.callee.name, "audioVolume : " + value);
		var setRcsJson = {};
		setRcsJson["volume"] = value;
		setRcsJson["mute"] = false;
		ocfDevice.setRemoteRepresentation(this.href, setRcsJson, this.onRepresentCallback);
	},

	'setMute' : function(mute) {
		scplugin.log.debug(className, arguments.callee.name, "mute : " + mute);
		var setRcsJson = {};
		setRcsJson["mute"] = mute;
		ocfDevice.setRemoteRepresentation(this.href, setRcsJson, this.onRepresentCallback);
	},

	'muteToggle' : function() {
		if (this.muteState == true) {
			this.setMute(false);
		} else {
			this.setMute(true);
		}
	}
}
