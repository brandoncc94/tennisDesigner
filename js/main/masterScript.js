  
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
    Parse.$ = jQuery;   
    Parse.initialize("DKofKQXu2AtXwkr5qSlWBJMxKBxnFzDhX8I0VEZH", "ojzZihBULwli0g5ZaKK3IB0lfS2Rw0WoTyYEaVW4");
    var TennisDesign = Parse.Object.extend("TennisDesign");
    var tennis_query = new Parse.Query(TennisDesign);
    tennis_query.equalTo("Name",$('#tbxDesignName').val());
    tennis_query.find({
      success: function(results) {
        if(results.length==0){
          var design = new TennisDesign();
          design.save({
            Name: $('#tbxDesignName').val()
          });
          $('#nameDesign-container').effect( "drop", 1000);
          $('#showMessage').text("Design created successfully.");
          $('#showMessage').fadeIn(1000);
          $('#showMessage').fadeOut(1000);
          $('#tbxDesignName').val("");

        }
        else{
          $('#tbxDesignName').effect( "shake", 1000 );
          $('#tbxDesignName').val("");    
        }
      },
      error: function(error) {
        alert("Error: " + error.code + " " + error.message);
      }
    });
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
  