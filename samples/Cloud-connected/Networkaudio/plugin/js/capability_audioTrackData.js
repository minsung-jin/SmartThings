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
			if (rcsJsonString["title"] != null && rcsJsonString["title"] != "") {
				var title_length = document.getElementById("title").scrollWidth / 10;
				var title_string = rcsJsonString["title"];
				if (title_length < title_string.length)
					document.getElementById("title").innerHTML = title_string.substr(0,Math.floor(title_length)) + "...";
				else
					document.getElementById("title").innerHTML = title_string;
			} else
				document.getElementById("title").innerHTML = "Title";

			if (rcsJsonString["artist"] != null && rcsJsonString["artist"] != "") {
				var artist_length = document.getElementById("artist").scrollWidth / 10;
				var artist_string = rcsJsonString["artist"];
				if (artist_length < artist_string.length)
					document.getElementById("artist").innerHTML = artist_string.substr(0,Math.floor(artist_length)) + "...";
				else
					document.getElementById("artist").innerHTML = artist_string;
			} else
				document.getElementById("artist").innerHTML = "CP name";

		}
	}
}
