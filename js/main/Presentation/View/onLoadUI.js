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
    pContext.getOnLoad = function() {
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


            $('#imgSaveDesign').click(function(){
                updateDesign();
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

            $('#imgLoadDesign').click(function(){
                var name = getDesignListSelected();
                downloadDesign(name);                                
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

        function downloadDesign(pName){
            Presentation.getOnLoadDesignsHandler().downloadDesign(pName);
        }


        function loadDesignView(pName,pPoints){
            var name = getDesignListSelected();
            $('#selectDesignName').text("Create your design: "+ name);
            loadPointsDesignView(pPoints);

        }

        function loadPointsDesignView(pPoints){
            Presentation.getDesignSpace().getStraight().start.setX(pPoints[0][0]);
            Presentation.getDesignSpace().getStraight().start.setY(pPoints[0][1]);
            Presentation.getDesignSpace().getStraight().control1.setX(pPoints[1][0]);
            Presentation.getDesignSpace().getStraight().control1.setY(pPoints[1][1]);
            Presentation.getDesignSpace().getStraight().control2.setX(pPoints[2][0]);
            Presentation.getDesignSpace().getStraight().control2.setY(pPoints[2][1]);
            Presentation.getDesignSpace().getStraight().control3.setX(pPoints[3][0]);
            Presentation.getDesignSpace().getStraight().control3.setY(pPoints[3][1]);
            Presentation.getDesignSpace().getStraight().end.setX(pPoints[4][0]);
            Presentation.getDesignSpace().getStraight().end.setY(pPoints[4][1]);
            Presentation.getDesignSpace().getAnchorLayer().draw();
        }

        function getDesignListSelected(){
            var select_object = document.getElementById('designs');
            var index = select_object.selectedIndex;
            var name = select_object.options[index].text;
            return name;
        }

        function updateDesign(){
            var name =  getDesignListSelected();
            var points = getPoints();
            Presentation.getOnLoadDesignsHandler().updateDesign(name,points);
        }


        function getPoints(){
            var points = new Array();
            var straight =Presentation.getDesignSpace().getStraight(); 
            points[0] = [straight.start.attrs.x , straight.start.attrs.y];
            points[1] = [straight.control1.attrs.x, straight.control1.attrs.y];
            points[2] = [straight.control2.attrs.x,straight.control2.attrs.y];
            points[3] = [straight.control3.attrs.x,straight.control3.attrs.y];
            points[4] = [straight.end.attrs.x,straight.end.attrs.y];
            return points;
        }

        function searchDesign(){
            //Send reference to OnLoadDesignHandler.js controller
            Presentation.getOnLoadDesignsHandler().downloadDesignsList();
        }

        function loadDesignDataList(pDesignList){
            $('#designs').empty();
            for (var i = 0; i < pDesignList.length; i++) {
                   $('#designs').append("<option value=" + pDesignList[i] + ">"+ pDesignList[i]+"</option>");
            }            
        }

        function addDesign(){                
            if($('#tbxDesignName').val().length!=0){
                //Sending the name design to parse
                var pPoints = getPoints();
                Presentation.getOnLoadHandler().saveDesignToData($('#tbxDesignName').val(),pPoints);
            }else{
                $('#tbxDesignName').effect( "shake", 1000 );
                $('#tbxDesignName').val("");    
            }
        }


        // var arrayList = new Array();
        // arrayList.push(2);
        // arrayList.push("casa");
        // arrayList.push(true);
        
        // if(arrayList[2]){
        //     alert(arrayList);
        // }

        // var objecJson = {
        //     Name: "juan",
        //     Numero: 2
        // }

        // alert(objecJson["Numero"]);

        // var typeObjects = {
        //     LINE  : 1,
        //     CIRCLE : 2
        // };

        // var c1 = 9;

        // function guardar ( figura){
        //     switch (tipo){
        //         case typeObjects.CIRCLE:
        //             guardarCircle(figura);
        //             break;
        //         case typeObjects.LINE:
        //             alert("I'm a line");
        //             break;
        //         default:
        //             alert("I don't know");
        //     }
        // }

        // PerformAction(c1);

            


        function nameDesignUsed(){
            alert("Name not available.");
            $('#tbxDesignName').effect("shake",1000);
            $('#tbxDesignName').val("");
        }

        function storedDesign(){
            $('#nameDesign-container').effect( "drop", 1000);
            $('#showMessage').text("Design created successfully.");
            $('#showMessage').fadeIn(1000);
            $('#showMessage').fadeOut(1000);
            setTimeout(function(){$('#listDesign-container').slideDown(3000)},1000);

            searchDesign();
            $('#tbxDesignName').val("");
        }


        return {
            init:init,
            addDesign : addDesign,
            loadDesignDataList : loadDesignDataList,
            loadDesignView : loadDesignView,
            nameDesignUsed : nameDesignUsed,
            storedDesign : storedDesign
        };  
    })();

    function init(){
        onLoad.init();
    }

    //Init.
    $(init);

}(Presentation, jQuery));
