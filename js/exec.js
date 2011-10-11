/* JS Library - "Exec", SFW1
 * Author: Troy Grant
 */

var exec = function(selector) {
	return new exec.prototype.init(selector);
	//passing selector to init function
};

exec.prototype = {
	
	init: function(selector) {
		//init the library
		if (typeof selector === "string") {
			this.elements = document.querySelectorAll(selector);
		}else if (selector.nodeType) {
			//we can't test just if something is an object
			//however, all html elements have a nodeType.
			//so if it has a nodeType, we know it's an html element.
			this.elements = [selector];
		};
			
	},
	
	elements: [], 
		//Array that holds the data from querySelectorAll
		
	each: function(fn) {
		for (var i=0, j=this.elements.length; i < j; i++) {
		  fn.call(this.elements[i]);
		  //run whatever the function that is passed in
		  //for every element that is on that variable
		};
		return this; //returning the object that exec made,
		//all functions in exec will return this.
	},
	
	css: function(props) {
		//this function takes in an object
		for(var prop in props){
			//for each key in the object
			this.each(function(){
				this.style[prop] = props[prop];
				//this.style[prop] is the first object tag
				//equals props[prop] is the second tag
			});
		};
	},
	
	hasClass: function(name) {
		
		var hasIt = false;
		
		this.each(function (){
			var pattern = new RegExp("(^| )" + name + "( |$)");
			if( pattern.test(this.className) ){
				//.test returns a boolean, .match returns an array
				// we need a boolean here
				hasIt = true;
				//we cant say return false here because it would return
				//false as a result of the this.each function, not
				//part of the hasClass function, which is what we want
			};
		});	
		return hasIt;
	},
	
	addClass: function(name) {
		this.each(function () {
		  if ( !exec(this).hasClass(name) ) {
		  	//if this does NOT already have the class
		  		this.className += " " + name;
		  		//adding a space because class names are seperated by spaces in HTML
		  };
		});
	},
	
	removeClass: function(name) {
		this.each(function () {
		  var pattern = new RegExp("(^| )" + name + "( |$)");
		  this.className = this.className.replace(pattern, "$1").replace(/ $/, "");
		  //we use $1 to remove any spaces that might remain. It's saying take the whole
		  //pattern and replace it with a space. if there was no space, replace it with
		  //nothing. It's using the RegExp.
		});
	} //end of object
};

// ------------------------------LIBRARY UTILITY FUNCTIONS (non-DOM)------------------------

/*
 * exec.ajax({
 * 	url: "xhr/file.php",
 * 	type: "GET",
 * 	success: function(response){},
 * 	error: function(response){},
 * 	timeout: 8000       //(8 seconds)
 * 
 * });
 */
exec.ajax = function(options) {
	
	//taking the options passed in and redefining it into a new object
	// for creating defaults
	options = {
		url: (options.url || ""),
			//this is a shorthand if. If options.url doesn't exist, meaning it's false,
			//then make it an empty string
		type: (options.type || "GET"),
		timeout: (options.timeout || 8000),
		success: (options.success || function() {}),
		error: (options.error || function() {}), 
		data: options.data || {} //end of object
	};
	
	setTimeout(function(){
		if(xhr){
			xhr.abort(); // stop the request if it's still not finished by now
		}
		
	}, options.timeout); //runs this function once after the time that is in timeout (8 seconds)
	
	var checkHttp = function() {
		try{
			
			return !xhr.status && location.protocol === "file:" ||
					(xhr.status >= 200 && xhr.status <300 ) ||
					xhr.status === 304 ||
					navigator.userAgent.indexOf("Safari") >= 0 && xhr.status === "undefined"
					//end of return. Safari has a bug where it returns a string "undefined"
					//instead of saying undefined
			;
			
		}catch(err){};
		
		return false; //if the whole thing fails, just return false
	};
	
	var parseData = function() {
		var ct = xhr.getResponseHeader("content-type");
		var isxml = ct && ct.indexOf("xml") >= 0;
		return isxml ? xhr.responseXML : xhr.responseText;	
		//ct means content type
	};
	
	var serialize = function() {
		var ser = [];
		
		for(var key in options.data){
			ser.push( key + "=" + encodeURIComponent(options.data[key]) );
			//variable = content (content encoded for URL)
		};
		
		//requests begin with a ? mark and are seperated by an ampersand
		return "?" + ser.join("&");
	};
	
	var xhr = new XMLHttpRequest();
	
	xhr.open(options.type, options.url + serialize(), true); //true or false determines if it's asynchronus.
	//it will always be true
	
	xhr.onreadystatechange = function() {
		if(xhr.readyState === 4){
			//4 means that the call is 100% done. We don't care about any other states but 4.
			
			var valid = checkHttp(); //this function will return true or false based on whether
			//or not the request was successful or failed.
			
			if(valid){
				//success
				var response = parseData();
				options.success( response );
			}else{
				//fail
				options.error(xhr);
			};
			
			xhr = undefined; //at this point we're done with it so there's no need to have
			//it still be defined.
		};
		
	};
	
	xhr.send(null); //this null is get around a firefox bug
};


//------------------------------------------------------------------------------------------

exec.prototype.init.prototype = exec.prototype;
//this is what allows the "factory" technique to work

//end of library
