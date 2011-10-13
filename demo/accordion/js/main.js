// Accordion Demo
// SFW1

var firstDiv = exec("#accordion .content").elements[0];
//pull all the divs with the class of content, but only give me the
//first one. we're not doing first child here, because the h2 
//toggler is actually the first child of the accordion

var accHeight = exec(firstDiv).getStyle("borderRadius");

var counter = 1;

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
	
	counter *= 1.1;
	firstDiv.style.borderRadius = (parseFloat(accHeight) + counter) + "px";
}, 30); //this is pretty close to 30 frames a second
