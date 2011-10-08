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

exec.prototype.init.prototype = exec.prototype;
//this is what allows the "factory" technique to work
