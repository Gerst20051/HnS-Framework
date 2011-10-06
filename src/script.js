Array.prototype.clear=function(){this.splice(0,this.length)};

window.$ && main() || (function() {
	var jquery = document.createElement("script");
	jquery.setAttribute("type","text/javascript");
	jquery.setAttribute("src","jquery.js");
	jquery.onload = main;
	jquery.onreadystatechange = function() {
		if (this.readyState == "complete" || this.readyState == "loaded") main();
	};
	(document.getElementsByTagName("head")[0] || document.documentElement).appendChild(jquery);
})();

function main() {
var aC = {
title: "HnS Framework",
logged: false,
user: {},
timestamp: Date.now || function(){
	return +new Date;
},
timestamp_sec: parseInt(Date.now / 1000) || function(){
	return parseInt(+new Date / 1000);
},
stringToBoolean: function(string){
        switch(string.toLowerCase()) {
                case "true": case "yes": case "1": return true;
                case "false": case "no": case "0": case null: return false;
                default: return false;
        }
},
empty: function(mixed){
	var key;
	if (mixed === "" || mixed === 0 || mixed === "0" || mixed === null || mixed === false || typeof mixed === 'undefined') return true;
	if (typeof mixed == 'object') {
		for (key in mixed) return false;
		return true;
	}
	return false;
},
addSlashes: function(str){
	return (str + '').replace(/[\\"']/g, '\\$&').replace(/\u0000/g, '\\0');
},
stripSlashes: function(str){
	return (str + '').replace(/\\(.?)/g, function (s, n1) {
		switch (n1) {
			case '\\': return '\\';
			case '0': return '\u0000';
			case '': return '';
			default: return n1;
		}
	});
},
setTitle: function(title,type){
	if (!type) {
		if (!title) document.title = aC.title;
		else document.title = aC.title + " | " + title;
	} else {
		document.title = title;
	}
},
setHash: function(hash){
	if (!hash) window.location.replace("#");
	else window.location.replace("#" + encodeURI(hash));
},
getHash: function(){
	return decodeURIComponent(window.location.hash.substring(1));
},
init: function(){
	$.get('ajax.php', {p:"logged"}, function(response) {
		if (aC.stringToBoolean(response)) aC.logged = true;
		if (!aC.logged) { /* Handle Login Form */ }
		else aC.loggedIn();
	});
},
loggedIn: function(){
	if (aC.logged) {
		$.getJSON('ajax.php', {p:"userdata"}, function(response) {
			aC.user = response;
			/* Manipulate User Data */
		});
		if (aC.empty(aC.getHash())) {
			/* Handle Default Action */
		} else {
			/* Handle Hash Actions */
		}
	}
},
login: function(){
	/* Handle Login */
},
logout: function(){
	$.post('ajax.php', {logout:true}, function() {
		/* Handle Logout */
	});
},
onKeyDown: function(e){
	var keyCode = e.keyCode || e.which;
	if (aC.logged) {
		/* Handle LoggedIn Keys */
	} else {
		/* Handle LoggedOut Keys */
	}
},
handleError: function(error){
	return error;
}
};

$(document.documentElement).keydown(aC.onKeyDown);
$(document).ready(function(){ aC.init();
/* Handle DOM Actions */
});

return true;
}

window.log = function() {
	log.history = log.history || [];
	log.history.push(arguments);
	if (this.console) console.log(Array.prototype.slice.call(arguments));
};