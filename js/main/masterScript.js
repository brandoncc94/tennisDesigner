$(function() {
  $('#nameDesign-container').hide();
  $('#showMessage').hide();
  $('#contact-container').hide();
  
  $('#imgAddDesign').click(function() {
    $('#nameDesign-container').slideDown();
  });
  
  $('#imgCancelOption').click(function() {
    $('#nameDesign-container').effect( "explode" );
  });
  
  $('#imgSelectDesign').click(function() {
    var inp = $('#tbxDesignName');
    if(inp.val().length <= 0){
      $('#tbxDesignName').effect( "shake", 1000 );
    }
    else{
       $('#nameDesign-container').effect( "drop", 1000);
       $('#showMessage').text("Design created successfully.");
       $('#showMessage').fadeIn(1000);
       $('#showMessage').fadeOut(1000);

       //send to database
       //Design :  name PK
       //Figure:   figureObject that contains all the points.... 
       //If exist....
       //Insert

       $('#tbxDesignName').val("");

    }
  }); 

  $("#lieEdit a").click(function(){
  		$(".main-container").css('background-color', '#d9534f');
	});
	
  $("#lieArcade a").click(function(){
  		$(".main-container").css('background-color', '#5bc0de');
	});
	
  $("#lieFire a").click(function(){
  		$(".main-container").css('background-color', '#428bca');
	});
	
  $("#lieContact a").click(function(){
		$('#contact-container').fadeToggle(500);
  });
});