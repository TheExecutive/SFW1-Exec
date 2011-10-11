// Tooltip Logic Demo
// SFW1

/*
 * Logic Workflow
 * 1) Describe end Result
 * 2) Identify needed html targets
 * 3) Identify events per target
 * 4) Accomplish result
 */

(function(){
	
	var tooltips = exec(".tooltip");
	
	tooltips.on("mouseover", function(eventObject) {
		var tip = this.nextSibling;
		//this gets us the div next to the anchor
		//because the div is a sibling of the anchor, the li is a parent
		//to both of them
		
		exec(tip).css({
			display: "block",
			top: (eventObject.pageY + 2) + "px",
			left: (eventObject.pageX + 2) + "px"
			/*we add 2 to the spacing out of the tooltip so that
			the tooltip isn't directly under the mouse. If it was 
			directly under it, that would count as the mouse pointer
			leaving the anchor, which means that the mouse out event
			would fire, causing a weird flickering glitch.
			*/
		});
		//we can chain because all of our functions say 
		//return this at the end
		
	});
	
	tooltips.on("mouseout", function(eventObject) {
		var tip = this.nextSibling;

		exec(tip).hide();
	});
	
	tooltips.on("mousemove", function(eventObject) {
		var tip = this.nextSibling;
		exec(tip).css({
			//you can get rid of the block first because mouse over had to fire
			//before on mouse move does, so it's already set to block
			top: (eventObject.pageY + 2) + "px",
			left: (eventObject.pageX + 2) + "px"
		});
	});
	
})();
