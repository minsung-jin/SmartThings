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

var ocfDevice;
var className = "NetworkAudio";
var capabilities = [capabilitySwitch, capabilityAudioTrackData, capabilityAudioVolume, capabilityMediaPlayback, capabilityMediaPlaybackRepeat, capabilityMediaPlaybackShuffle, capabilityMediaInputSource, capabilityMediaTrackControl];
var inlineStyle;

window.onload = function () {
	console.log("version : 0.0.1");
	init();

	inlineStyle = document.createElement('style');
	document.body.appendChild(inlineStyle);
};

function init() {
	console.log("-----------init-----------");
	scplugin.manager.getOCFDevices(getOCFDeviceCB);
}

function getOCFDeviceCB(devices) {
	console.log("getOCFDeviceCB : " + devices.length);
	for (var i in devices) {
		console.log("deviceHandle: " + devices[i].deviceHandle);
		console.log("deviceName: " + devices[i].deviceName);
		console.log("deviceType: " + devices[i].deviceType);
		console.log("metadata: " + devices[i].metadata);
	}
	setMainDevice(devices[0]);
	ocfDevice.subscribe(onRepresentCallback);

	for (var i = 0; i < capabilities.length; i++) {
		capabilities[i].update();
	}
}

function onRepresentCallback(result, deviceHandle, uri, rcsJsonString) {
	for (var i = 0; i < capabilities.length; i++) {
		if ( capabilities[i].href == uri) {
			capabilities[i].onRepresentCallback(result, deviceHandle, uri, rcsJsonString);
		}
	}
}

function setMainDevice(device) {
	scplugin.log.debug(className, arguments.callee.name, "set ocf device : " + device.deviceName);
	ocfDevice = device;
}

function backAction() {
  scplugin.manager.close();
}

function onPowerBtnClicked() {
	if (document.getElementById("repeat_listbox").classList.contains('show'))
		document.getElementById("repeat_listbox").classList.toggle("show", false);
	capabilitySwitch.powerToggle();
}

function onSelectSource(selectedItem) {
	if (document.getElementById("repeat_listbox").classList.contains('show'))
		document.getElementById("repeat_listbox").classList.toggle("show", false);
  capabilityMediaInputSource.set(selectedItem.value);
}

function onPrevClicked() {
	if (document.getElementById("repeat_listbox").classList.contains('show'))
		document.getElementById("repeat_listbox").classList.toggle("show", false);
	capabilityMediaTrackControl.set("previous");
}

function onPlayClicked() {
	if (document.getElementById("repeat_listbox").classList.contains('show'))
		document.getElementById("repeat_listbox").classList.toggle("show");
	capabilityMediaPlayback.toggle();
}

function onNextClicked() {
	if (document.getElementById("repeat_listbox").classList.contains('show'))
		document.getElementById("repeat_listbox").classList.toggle("show", false);
	capabilityMediaTrackControl.set("next");
}

function onVolumeClicked() {
	if (document.getElementById("repeat_listbox").classList.contains('show'))
		document.getElementById("repeat_listbox").classList.toggle("show", false);
	capabilityAudioVolume.muteToggle();
}

function InputVolume(rangeId, rangeValue) {
	if (document.getElementById("repeat_listbox").classList.contains('show'))
		document.getElementById("repeat_listbox").classList.toggle("show", false);
	capabilityAudioVolume.setVolume(parseInt(rangeValue));
}

function onSelectRepeate() {
	document.getElementById("repeat_listbox").classList.toggle("show", true);
}

function closeListBox(event) {
	var x1 = event.offsetLeft;
	var y1 = event.offsetTop;
	var x2 = event.offsetWidth;
	var y2 = event.offsetHeight;
	var x = event.onmouseout.arguments["0"].clientX;
	var y = event.onmouseout.arguments["0"].clientY;
	if(x < x1 || x > x1+x2)
		document.getElementById("repeat_listbox").classList.toggle("show", false);
	else if(y < y1 || y > y1+y2)
		document.getElementById("repeat_listbox").classList.toggle("show", false);
}

function onSelectOff() {
	capabilityMediaPlaybackRepeat.set("off");
}

function onSelectOne() {
	capabilityMediaPlaybackRepeat.set("one");
}

function onSelectAll() {
	capabilityMediaPlaybackRepeat.set("all");
}

function onClickShuffle(suffleMode) {
	if (document.getElementById("repeat_listbox").classList.contains('show'))
		document.getElementById("repeat_listbox").classList.toggle("show", false);
	if(suffleMode.checked == true) {
		capabilityMediaPlaybackShuffle.set("enabled");
		suffleMode.checked = false;
	}
	else {
		if (document.getElementById("repeat_listbox").classList.contains('show'))
			document.getElementById("repeat_listbox").classList.toggle("show", false);
		capabilityMediaPlaybackShuffle.set("disabled");
		suffleMode.checked = true;
	}
}
