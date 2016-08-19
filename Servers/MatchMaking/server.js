var Discover = require("node-discover");

var d = new Discover({ key : "MMSRV", advertisement:"MatchMaking" });

d.on("added", function (obj) {
	console.log("New node added to the network.");
	console.log(obj);
});

d.on("removed", function (obj) {
	console.log("Node removed from the network.");
	console.log(obj);
});

d.on("error", function (err) {
	console.log("error", err);
});
