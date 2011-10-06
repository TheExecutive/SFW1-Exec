(function(){
	
	/*var formFields = document.querySelectorAll("#myform input");
	//selecting all the inputs inside of myForm
	
	for(var i=0, j=formFields.length; i<j; i++){
		formFields[i].style.backgroundColor = "black";
	}*/
	
	var formFields = exec("#myform input");
	
	formFields.each(function(){
		
	});
	
	formFields.css({
		"backgroundColor" : "black",
		"color" : "white",
		"padding" : "20px" //end of object
	});
	
	//console.log(exec("#tester").hasClass("formleft"));
	//testing to see if the id tester has the class
	//"formleft". don't need a dot infront of the class
	//because we're just testing if that string exists
	
	exec("li").addClass("testing");
	
	
})();
