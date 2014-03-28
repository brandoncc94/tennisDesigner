/*!
 * All Rights Reserved
 * This software is proprietary information of
 * Brandon Campos Calderón - Juan Carlos Martínez
 * Use is subject to license terms.
 * Filename: presentationNamespace.js
 */

 /*
  * Author:      brandonc94@gmail.com
  * Date:        25/03/2014
  * Description: Presentation layer to be develop with MVC
  */


/**
 * Namespace declaration.
 */  

var Presentation = window.Presentation || {};

/*
 * Global Presentation Layer to be used with MVC Pattern
 * @namespace
 */
(function (pContext, $) {
    'use strict';
    /**
     * Public method to return a reference of onLoadModule.
     * 
     * @return {onLoadModule} View declarations of the MVC.
         * @public
     */
    pContext.onLoadModule = function() {
        return onLoadModule;
    };


    /**
     * Module.
     *      Module when loading page.
     *
     * @private
     * @namespace
     **/
    var onLoadModule = (function(){
        function init(){
            $('#nameDesign-container').hide();
            $('#showMessage').hide();
            $('#contact-container').hide();

            $('#imgAddDesign').click(function() {
            $('#nameDesign-container').slideDown();
            });

            $('#imgCancelOption').click(function() {
            $('#nameDesign-container').effect( "explode" );
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

            $('#imgSelectDesign').click(function() {
                addDesign();
            }); 
        }

        function addDesign(){                
            if($('#tbxDesignName').val().length!=0){
                //Sending the name design to parse
                Presentation.getHandlerModule().sendToData($('#tbxDesignName').val());

                $('#nameDesign-container').effect( "drop", 1000);
                $('#showMessage').text("Design created successfully.");
                $('#showMessage').fadeIn(1000);
                $('#showMessage').fadeOut(1000);
                $('#tbxDesignName').val("");
            }else{
                $('#tbxDesignName').effect( "shake", 1000 );
                $('#tbxDesignName').val("");    
            }
        }

        return {
            init:init,
            addDesign:addDesign
        };  
    })();

    function init(){
        onLoadModule.init();
    }

    //Init.
    $(init);

}(Presentation, jQuery));

