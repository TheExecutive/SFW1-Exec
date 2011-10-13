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
		return this;
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
		return this;
	},
	
	removeClass: function(name) {
		this.each(function () {
		  var pattern = new RegExp("(^| )" + name + "( |$)");
		  this.className = this.className.replace(pattern, "$1").replace(/ $/, "");
		  //we use $1 to remove any spaces that might remain. It's saying take the whole
		  //pattern and replace it with a space. if there was no space, replace it with
		  //nothing. It's using the RegExp.
		});
		return this;
	}, 
	
	getStyle: function(prop) {
		//can't do this.each because that's meant for setters, and this is a getter
		var elem = this.elements[0];
		
		if( elem.style[prop] ){
			//this tests if there is an inline style set by javascript
			return elem.style[prop];
		}else if ( elem.currentStyle ) {
			//this tests for IE, because this is the way you write it in IE
			return elem.currentStyle[prop];
		}else{
			//if it's not set by javascript or the user isn't using IE, then do this
			prop = prop.replace(/([A-Z])/g, "-$1").toLowerCase();
			//reg exp is saying look for any capital letter, put a dash in front of it
			//and make the whole thing lowercase. so instead of backgroundColor, it would
			//say background-color. It's a camel case undoer.
			return document.defaultView.getComputedStyle(elem, "").getPropertyValue(prop); 
			//you need the empty string in there
		};
	},
	
	hide: function() {
		this.each(function(){
			this.style.display = "none";
		});
		return this;
	},
	
	show: function() {
		this.each(function(){
			this.style.display = "";
		});
		return this;
	},
	
	on: function(evt, handler) {
		this.each(function(){
			//we can't say onclick because we have a string instead
			this[ "on" + evt ] = handler;
			//if we pass the string click, we get onlick.
			//this is a shortcut for binding events.
		});
		return this;
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


//-------------------------------------------------------------------------------------------
/*
	Ryu Easing
	----------
	Example: easing(currentTime, startValue, changeToValue, duration)
	----------
	Methods:
		linearTween
		easeInQuad
		easeOutQuad
		easeInOutQuad
		easeInCubic
		easeOutCubic
		easeInOutCubic
		easeInQuart
		easeOutQuart
		easeInOutQuart
		easeInQuint
		easeOutQuint
		easeInOutQuint
		easeInSine
		easeOutSine
		easeInOutSine
		easeInExpo
		easeOutExpo
		easeInOutExpo
		easeInCirc
		easeOutCirc
		easeInOutCirc
		easeInElastic
		easeOutElastic
		easeInOutElastic
		easeInBack
		easeOutBack
		easeInOutBack
		easeInBounce
		easeOutBounce
		easeInOutBounce	
*/
Math.linearTween=function(a,c,b,d){return b*a/d+c};Math.easeInQuad=function(a,c,b,d){return b*(a/=d)*a+c};Math.easeOutQuad=function(a,c,b,d){return-b*(a/=d)*(a-2)+c};Math.easeInOutQuad=function(a,c,b,d){return(a/=d/2)<1?b/2*a*a+c:-b/2*(--a*(a-2)-1)+c};Math.easeInCubic=function(a,c,b,d){return b*(a/=d)*a*a+c};Math.easeOutCubic=function(a,c,b,d){return b*((a=a/d-1)*a*a+1)+c};Math.easeInOutCubic=function(a,c,b,d){return(a/=d/2)<1?b/2*a*a*a+c:b/2*((a-=2)*a*a+2)+c};
Math.easeInQuart=function(a,c,b,d){return b*(a/=d)*a*a*a+c};Math.easeOutQuart=function(a,c,b,d){return-b*((a=a/d-1)*a*a*a-1)+c};Math.easeInOutQuart=function(a,c,b,d){return(a/=d/2)<1?b/2*a*a*a*a+c:-b/2*((a-=2)*a*a*a-2)+c};Math.easeInQuint=function(a,c,b,d){return b*(a/=d)*a*a*a*a+c};Math.easeOutQuint=function(a,c,b,d){return b*((a=a/d-1)*a*a*a*a+1)+c};Math.easeInOutQuint=function(a,c,b,d){return(a/=d/2)<1?b/2*a*a*a*a*a+c:b/2*((a-=2)*a*a*a*a+2)+c};
Math.easeInSine=function(a,c,b,d){return-b*Math.cos(a/d*(Math.PI/2))+b+c};Math.easeOutSine=function(a,c,b,d){return b*Math.sin(a/d*(Math.PI/2))+c};Math.easeInOutSine=function(a,c,b,d){return-b/2*(Math.cos(Math.PI*a/d)-1)+c};Math.easeInExpo=function(a,c,b,d){return a==0?c:b*Math.pow(2,10*(a/d-1))+c};Math.easeOutExpo=function(a,c,b,d){return a==d?c+b:b*(-Math.pow(2,-10*a/d)+1)+c};
Math.easeInOutExpo=function(a,c,b,d){return a==0?c:a==d?c+b:(a/=d/2)<1?b/2*Math.pow(2,10*(a-1))+c:b/2*(-Math.pow(2,-10*--a)+2)+c};Math.easeInCirc=function(a,c,b,d){return-b*(Math.sqrt(1-(a/=d)*a)-1)+c};Math.easeOutCirc=function(a,c,b,d){return b*Math.sqrt(1-(a=a/d-1)*a)+c};Math.easeInOutCirc=function(a,c,b,d){return(a/=d/2)<1?-b/2*(Math.sqrt(1-a*a)-1)+c:b/2*(Math.sqrt(1-(a-=2)*a)+1)+c};
Math.easeInElastic=function(a,c,b,d,e,f){if(a==0)return c;if((a/=d)==1)return c+b;f||(f=d*0.3);e<Math.abs(b)?(e=b,b=f/4):b=f/(2*Math.PI)*Math.asin(b/e);return-(e*Math.pow(2,10*(a-=1))*Math.sin((a*d-b)*2*Math.PI/f))+c};Math.easeOutElastic=function(a,c,b,d,e,f){if(a==0)return c;if((a/=d)==1)return c+b;f||(f=d*0.3);if(e<Math.abs(b))var e=b,g=f/4;else g=f/(2*Math.PI)*Math.asin(b/e);return e*Math.pow(2,-10*a)*Math.sin((a*d-g)*2*Math.PI/f)+b+c};
Math.easeInOutElastic=function(a,c,b,d,e,f){if(a==0)return c;if((a/=d/2)==2)return c+b;f||(f=d*0.3*1.5);if(e<Math.abs(b))var e=b,g=f/4;else g=f/(2*Math.PI)*Math.asin(b/e);return a<1?-0.5*e*Math.pow(2,10*(a-=1))*Math.sin((a*d-g)*2*Math.PI/f)+c:e*Math.pow(2,-10*(a-=1))*Math.sin((a*d-g)*2*Math.PI/f)*0.5+b+c};Math.easeInBack=function(a,c,b,d,e){e==void 0&&(e=1.70158);return b*(a/=d)*a*((e+1)*a-e)+c};Math.easeOutBack=function(a,c,b,d,e){e==void 0&&(e=1.70158);return b*((a=a/d-1)*a*((e+1)*a+e)+1)+c};
Math.easeInOutBack=function(a,c,b,d,e){e==void 0&&(e=1.70158);return(a/=d/2)<1?b/2*a*a*(((e*=1.525)+1)*a-e)+c:b/2*((a-=2)*a*(((e*=1.525)+1)*a+e)+2)+c};Math.easeInBounce=function(a,c,b,d){return b-Math.easeOutBounce(d-a,0,b,d)+c};Math.easeOutBounce=function(a,c,b,d){return(a/=d)<1/2.75?b*7.5625*a*a+c:a<2/2.75?b*(7.5625*(a-=1.5/2.75)*a+0.75)+c:a<2.5/2.75?b*(7.5625*(a-=2.25/2.75)*a+0.9375)+c:b*(7.5625*(a-=2.625/2.75)*a+0.984375)+c};
Math.easeInOutBounce=function(a,c,b,d){return a<d/2?Math.easeInBounce(a*2,0,b,d)*0.5+c:Math.easeOutBounce(a*2-d,0,b,d)*0.5+b*0.5+c};

