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
    pContext.onLoad = function() {
        return onLoad;
    };


    /**
     * Module.
     *      Module when loading page.
     *
     * @private
     * @namespace
     **/
    var onLoad = (function(){
        function init(){
            $('#nameDesign-container').hide();
            $('#listDesign-container').hide();
            $('#showMessage').hide();
            $('#contact-container').hide();

            $('#imgSearchDesign').click(function(){
                if(!$('#nameDesign-container').hidden){
                    $('#nameDesign-container').hide();
                }
                $('#listDesign-container').slideDown();
                searchDesign();
            });

            $('#imgAddDesign').click(function() {
                if(!$('#listDesign-container').hidden){
                    $('#listDesign-container').hide();
                }
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


            $('#divBackgroundColor').colpick({
                colorScheme:'dark',
                layout:'rgbhex',
                color:'ff8800',
                onSubmit:function(hsb,hex,rgb,el) {
                    $(el).css('background-color', '#'+hex);
                    $(el).colpickHide();
                    Presentation.getOnLoadHandler().drawGraphicalLabel("Background-color: ",hex);
                }
            }).css('background-color', '#ff8800');  

            $('#nameDesigns-container').bind('select', function (event) {
                    var args = event.args;
                    var item = $('#nameDesigns-container').jqxDropDownList('getItem', args.index);
                    alert('Selected: ' + item.label);
            });


            $('#divBorderSole').colpick({
                colorScheme:'dark',
                layout:'rgbhex',
                color:'ff8800',
                onSubmit:function(hsb,hex,rgb,el) {
                    $(el).css('background-color', '#'+hex);
                    $(el).colpickHide();
                    Presentation.getOnLoadHandler().drawGraphicalLabel("BorderSole-color: ",hex);
                }
            }).css('background-color', '#ff8800');  
        }

        function searchDesign(){
            DataAccess.getParseDataAcces().downloadDesignsName();
        }

        function obtenerDatos(designList){
            // Create a jqxDropDownList
            $('#designs').empty();
            for (var i = 0; i < designList.length; i++) {
                   $('#designs').append("<option value='" + designList[i] + "'>");
               }
           }

        function addDesign(){                
            if($('#tbxDesignName').val().length!=0){
                //Sending the name design to parse
                Presentation.getOnLoadHandler().sendToData($('#tbxDesignName').val());

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
            addDesign:addDesign,
            obtenerDatos:obtenerDatos
        };  
    })();

    function init(){
        onLoad.init();
    }

    //Init.
    $(init);

}(Presentation, jQuery));

