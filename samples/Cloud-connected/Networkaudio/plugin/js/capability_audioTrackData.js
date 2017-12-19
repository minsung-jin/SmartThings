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

var capabilityAudioTrackData = {
	'href' : "/capability/audioTrackData/main/0",

	'update' : function() {
		ocfDevice.getRemoteRepresentation(this.href, this.onRepresentCallback);
	},

	'onRepresentCallback' : function(result, deviceHandle, uri, rcsJsonString) {
		scplugin.log.debug(className, arguments.callee.name, result);
		scplugin.log.debug(className, arguments.callee.name, uri);

		if (result == "OCF_OK" || result == "OCF_RESOURCE_CHANGED" || result == "OCF_RES_ALREADY_SUBSCRIBED") {
			if (title != null && title != "") {
				var length = document.getElementById("title").scrollWidth / 10;
				var string = rcsJsonString["title"];
				if (length < string.length)
					document.getElementById("title").innerHTML = string.substr(0,Math.floor(length)) + "...";
				else
					document.getElementById("title").innerHTML = string;
			} else
				document.getElementById("title").innerHTML = "Title";

			if (artist != null && artist != "") {
				var length = document.getElementById("artist").scrollWidth / 10;
				var string = rcsJsonString["artist"];
				if (length < string.length)
					document.getElementById("artist").innerHTML = string.substr(0,Math.floor(length)) + "...";
				else
					document.getElementById("artist").innerHTML = string;
			} else
				document.getElementById("artist").innerHTML = "CP name";

		}
	}
}
