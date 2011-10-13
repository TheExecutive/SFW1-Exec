// Accordion Demo
// SFW1

/*var firstDiv = exec("#accordion .content").elements[0];
//pull all the divs with the class of content, but only give me the
//first one. we're not doing first child here, because the h2 
//toggler is actually the first child of the accordion

var accHeight = exec(firstDiv).getStyle("height");

var newVal;
var change = 200;

var duration = 1500; //2000 milliseconds
var time = 0; //before the interval begins, no time has passed

//firstDiv.style.height = (parseFloat(accHeight) + 50) + "px";
//changing its height to add 50 to it. ParseInt finds the first
//numbers and stops when it finds a string, making it an int.
//ParseFloat does the same thing but makes it a number.
//BUT...css doesn't take numbers, it takes strings. so, you
//strip the px out, make the math operation, then put the px back in.

var anim = setInterval(function(){
	time += 30; //this should be the same time as the interval
	
	if(time >= duration){
		clearInterval(anim); //stop the anim
		return false;
	};
	
	newVal = Math.easeOutBack(time, parseFloat(accHeight), change, duration, 10);
	//curve speed is usually 0.1 or 2, but when using back, you can do a higher number
	
	firstDiv.style.height = newVal + "px";
}, 30); //this is pretty close to 30 frames a second*/

(function(){
	
	/*exec("#accordion .content").animate({
		
		duration: 1000,
		easing: "easeOutBounce",
		props: {
			height: 200 //we're going to add the px in the lib
		}//end of object
		
	}); */
	
	/*var firstDiv = document.querySelectorAll(".content")[0];
	
	firstDiv.style.position = "relative";
	
	var height = parseFloat( exec(firstDiv).getStyle("height") );
	
	exec(firstDiv).animate({
		duration: 1000,
		props: {
			height: 0,
			top: -height //you can't change properties like left unless the thing is relative, fixed, or absolute
		}
	});*/
	
	var overlay = document.getElementById("overlay");
	
	overlay.style.display = "block"; //so it can be seen, it's none in the CSS
	
	var h = parseFloat(exec(overlay).getStyle("height"));
	
	overlay.style.top = -h + "px"; //negative h
	
	exec(overlay).animate({
		props: {top: 0}
	});
	
	overlay.onclick = function(){
		exec(this).animate({
			props: {top: -h}
		});
		return false;
	};
	
})();
