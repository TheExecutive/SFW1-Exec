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
	
	
//------move this code into my project
(function(){
	
	var header = exec(".dssheader");
	
	header.css({
		padding: "20px", 
		border: "2px solid black"
	});
	
	//var color = exec(".dssheader").elements[0].style.color; //pulling the font color out
	//the dom style can only access attributes that javascript itself set.
	//therefore, this, as written, will only get me an empty string.
	
	var height = header.getStyle("height");
	//don't ever try to pull out colors, it's buggy and why would you ever need to?
	
	console.log(height);
	
	header.hide();
	
	setTimeout(function(){
		header.show();
	}, 3000);
	
	var validationSet = {
		
		email: {
			
			test: function(elem) {
				var pattern = /^([0-9a-zA-Z]([-.\w]*[0-9a-zA-Z])*@([0-9a-zA-Z][-\w]*[0-9a-zA-Z]\.)+[a-zA-Z]{2,9})$/;
				return pattern.test(elem.value);
			},
			message: "Invalid email address."
			
		},
		phone: {
			
			test: function(elem) {
				var pattern = /^[01]?[- .]?\(?[2-9]\d{2}\)?[- .]?\d{3}[- .]?\d{4}$/;
			},
			message: "Invalid phone."
			
		},
		text: {
			
			test: function(elem) {
				var pattern = /^[a-zA-Z]+$/;
				//Validating just text
			},
			message: "Invalid text."
			
		},
		password: {
			
			test: function(elem) {
				var pattern = /^(?=.*\d)(?=.*[a-zA-Z])(?!.*[\W_\x7B-\xFF]).{6,15}$/;
				//Requires 6-20 characters including at least 1 upper or lower alpha, and 1 digit.
			},
			message: "Invalid password."
			
		},
		website: {
			
			test: function(elem) {
				var pattern = /(((ht|f)tp(s?):\/\/)|(www\.[^ \[\]\(\)\n\r\t]+)|(([012]?[0-9]{1,2}\.){3}[012]?[0-9]{1,2})\/)([^ \[\]\(\),;&quot;'&lt;&gt;\n\r\t]+)([^\. \[\]\(\),;&quot;'&lt;&gt;\n\r\t])|(([012]?[0-9]{1,2}\.){3}[012]?[0-9]{1,2})/;
				//URL validator
			},
			message: "Invalid website."
			
		} // end of object
		
	};
	
	var regFields = exec("#myform input");
	
	regFields.each(function () {
	  this.onkeyup = function() {
	  	//the word this will point to each item
	  	//we are now going to loop through the validation set and if it's a match, we test
	  	
	  	for(var key in validationSet){
	  		if( exec(this).hasClass(key) ){
	  			//if the item we're testing for has the class (key) 
	  			//then run the test method inside this..
	  			if ( validationSet[key].test(this) ){
	  				//...and check if true or false. if it's true...
	  				console.log("success");
	  				
	  			}else{
	  				console.log("no match");
	  			};
	  		};
	  	};
	  	
	  };
	  
	})
	
})();	
	
	
})();
