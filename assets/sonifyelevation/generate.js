// generative

"use strict"

function frequency(f){
	var synth = T("SynthDef").play();
	synth.def = function(opts) {
		var osc1, osc2, env;
		osc1 = T("saw", {freq:opts.freq         , mul:f});
		osc2 = T("saw", {freq:opts.freq * 1.6818, mul:f-0.05});
		env  = T("linen", {s:450, r:250, lv:0.5}, osc1, osc2);
		return env.on("ended", opts.doneAction).bang();
	};

	T("interval", {interval:500}, function(count) {
		var noteNum  = 69 + [0, 2, 4, 5, 7, 9, 11, 12][count % 8];
		var velocity = 64 + (count % 64);
		synth.noteOn(noteNum, velocity);
	}).start();
}

function drum(speed){
	var src = "./timbre.js-master/misc/audio/drum.wav";
	var audio = T("audio", {loop:true}).load(src, function(res) {

		T("comp", {thresh:-48, knee:30, ratio: speed, gain:18 }, this).play();
	});
}

function schedule(){
	var synth = T("OscGen", {wave:"sin(@4:10)", env:{type:"perc", r:500}, mul:0.25, poly:8});
	var sched = T("schedule");
	var func = [];
	for (var i = 0; i < 21; i += 3) {
		var time = ((Math.random() * 8)|0) * 100 + 800;
		func[i] = function(i, time) {
			synth.noteOn(69 - 7 + i, 60);
			sched.sched(time, func[i]);
		}.bind(null, i, time);
		sched.sched(time, func[i]);
	}
	sched.start();
	T("delay", {time:350, fb:0.8, mix:0.4}, synth).play();
}

var elevationSound = function pluck(freq){
	var func = T(function(count) {
		return freq[count%25];
	});
	T("interval", {interval:50}, func).start();
	return T("sin", {freq:func});
}
