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
            $('#metrix-table').hide();
            $("#exportToExcel").hide();
            $("#create-container").hide();
            $("#decoration-container").hide();

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
                setTimeout(function(){$("#lieEdit a").click();}, 500);
            });

            $("#lieEdit a").click(function(){
                currentState = State.EDIT;
                clearElements();
                try{
                    var name = getDesignListSelected();

                    $("#canvas-container").fadeOut(500,function(){
                        $("#canvas-container").fadeIn(500);
                        reacomodeBackground();
                    });
                    downloadDesign(name);                   
                    updateDecorationPanel();
                }catch(err){
                    bootbox.alert("You haven't selected the design: ");
                }
            });

            $("#lieArcade a").click(function(){            
                currentState = State.ARCADE;
                $(".main-container").css('background-color', '#5bc0de');
                $("#canvas-container").fadeOut(500,function(){
                    $("#canvas-container").fadeIn(500);
                });

                $("#decoration-container").fadeOut(500,function(){
                    $("#algorithmName").text("Arcade"); 
                    $("#decoration-container span").text("Metrix Results");
                    $("#tabs").hide();
                    $("#content").hide();
                    $("#metrix-table").show();
                    $("#exportToExcel").show();                   
                    $("#decoration-container").fadeIn(500);
                    Presentation.getDesignSpace().cleanJustFigures();
                    Presentation.getPaintManagerHandler().sendToDrawingManager();
                });                
            });

            $("#lieFire a").click(function(){
                currentState = State.FIRE;
                $(".main-container").css('background-color', '#428bca');
                $("#canvas-container").fadeOut(500,function(){
                    $("#canvas-container").fadeIn(500);
                });
                $("#decoration-container").fadeOut(500,function(){

                    $("#algorithmName").text("Fire");
                    $("#decoration-container span").text("Metrix Results");
                    $("#tabs").hide();
                    $("#content").hide();
                    $("#metrix-table").show();
                    $("#exportToExcel").show();                    
                    $("#decoration-container").fadeIn(500);
                    Presentation.getDesignSpace().cleanJustFigures();
                    Presentation.getPaintManagerHandler().sendToDrawingManager();
                });
            
            });

            $("#lieContact a").click(function(){
                $('#contact-container').fadeToggle(500);
            });

            $('#imgSelectDesign').click(function() {
                addDesign();
            });

            $('#imgLoadDesign').click(function(){
                clearElements();
                updateDecorationPanel();
                var name = getDesignListSelected();
                downloadDesign(name);         
                
                $("#canvas-container").fadeOut(500,function(){
                    $("#canvas-container").fadeIn(500);
                    reacomodeBackground();
                });
            }); 

            $( "#imgCircle" ).on( "click", function(){   
                Presentation.getAlertsUI().insertFeatureDialog(false);
            });

            $( "#imgLine" ).on( "click", function(){
                Presentation.getAlertsUI().insertLineFeatureDialog(false);
            });
            
            $("#exportToExcel").click(function(){
                var name = getDesignListSelected();
                Presentation.getOnLoadHandler().getExecutionTimes(name);                     
            }); 

            $('#divBackgroundColor').colpick({
                colorScheme:'dark',
                layout:'rgbhex',
                color:'ff8800',
                onSubmit:function(hsb,hex,rgb,el) {
                    $(el).css('background-color', '#'+hex);
                    $(el).colpickHide();
                    if(backgroundColorId == 0){
                        idLabel+=1
                        backgroundColorId = idLabel;
                        Presentation.getOnLoadHandler().drawGraphicalLabel("background-color: " + hex, [10,10], -1, "", hex, "background-color");
                    }
                    else
                        Presentation.getOnLoadHandler().drawGraphicalLabel("background-color: " + hex, "", backgroundColorId - 1, "", hex, "background-color");
                }
            }).css('background-color', '#ff8800');  


            $('#divBorderSole').colpick({
                colorScheme:'dark',
                layout:'rgbhex',
                color:'ff8800',
                onSubmit:function(hsb,hex,rgb,el) {
                    $(el).css('background-color', '#'+hex);
                    $(el).colpickHide();
                    if(borderSoleColorId == 0){
                        idLabel+=1
                        borderSoleColorId = idLabel;
                        Presentation.getOnLoadHandler().drawGraphicalLabel("BorderSole-color: " + hex, [10,40], -1, $("#tbxSoleStrokeWidth").val(), hex, "Sole");
                    }
                    else
                        Presentation.getOnLoadHandler().drawGraphicalLabel("BorderSole-color: " + hex, "", borderSoleColorId - 1, $("#tbxSoleStrokeWidth").val(), hex, "Sole");
                }
            }).css('background-color', '#ff8800');  
        }

        function updateDecorationPanel(){
            $('#decoration-container').slideDown(1000);
            $('#create-container').slideDown(1000);

            if($("#metrix-table").is(":visible")){
                $("#decoration-container").fadeOut(500,function(){
                    $("#decoration-container span").text("Add Decoration: ");
                    $("#tabs").show();
                    $("#content").show();
                    $("#metrix-table").hide();
                    $("#exportToExcel").hide();
                    $("#decoration-container").fadeIn(500);
                });
            }
        }
        function updateExecutionTime(pTime){
            var name = getDesignListSelected();
            var typeAlgorithm = $("#algorithmName").text();
            $("#executionTime").text(pTime);
            Presentation.getOnLoadDesignsHandler().addExecutionTimeDesign(name,typeAlgorithm,pTime);
        }

        function downloadDesign(pName){
            Presentation.getOnLoadDesignsHandler().downloadDesign(pName);
        }

        function loadDesignView(pName,pPoints,pArrayCircles,pArrayLines,pArrayBorders,pSole,pBackgroundColor){
            $("#canvas-container").fadeOut(500,function(){
                Presentation.getDesignSpace().cleanFigures();
                var name = getDesignListSelected();
                $('#selectDesignName').text("Create your design: "+ name);
                Presentation.getPaintManagerHandler().loadDesignCircles(pArrayCircles);
                Presentation.getPaintManagerHandler().loadDesignLines(pArrayLines);
                Presentation.getPaintManagerHandler().loadDesignSole(pSole);
                Presentation.getPaintManagerHandler().loadDesignBorders(pArrayBorders);
                Presentation.getPaintManagerHandler().loadDesignBackgroundColor(pBackgroundColor);
                loadPointsDesignView(pPoints);
                $("#canvas-container").fadeIn(500);
                Presentation.getOnLoadHandler().executeDivideSegments();
            });
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
            var arrayCircles = Presentation.getPaintManagerHandler().getCirclesFromPaintManager();
            var arrayLines = Presentation.getPaintManagerHandler().getLinesFromPaintManager();
            var arrayBorders = Presentation.getPaintManagerHandler().getBordersFromPaintManager();
            var sole = Presentation.getPaintManagerHandler().getSoleFromPaintManager();
            var backgroundColor = Presentation.getPaintManagerHandler().getBackgroundColorFromPaintManager();
            alert(backgroundColor["color"]);
            Presentation.getOnLoadDesignsHandler().updateDesign(name,points,arrayCircles,arrayLines,arrayBorders,
                sole,backgroundColor);
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
            Presentation.getDesignSpace().cleanFigures();                
            if($('#tbxDesignName').val().length!=0){
                //Sending the name design to parse
                var pPoints = getPoints();
                var arrayCircles = Presentation.getPaintManagerHandler().getCirclesFromPaintManager();
                var arrayLines = Presentation.getPaintManagerHandler().getLinesFromPaintManager();
                var arrayBorders = Presentation.getPaintManagerHandler().getBordersFromPaintManager();
                var sole = Presentation.getPaintManagerHandler().getSoleFromPaintManager();
                var backgroundColor = Presentation.getPaintManagerHandler().getBackgroundColorFromPaintManager();
                Presentation.getOnLoadHandler().saveDesignToData($('#tbxDesignName').val(),pPoints,arrayCircles,
                    arrayLines,arrayBorders,sole,backgroundColor);
            }else{
                $('#tbxDesignName').effect( "shake", 1000 );
                $('#tbxDesignName').val("");    
            }
        } 

        function nameDesignUsed(){
            bootbox.alert("Name is not available!");
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

        function clearElements(){
            backgroundColorId = 0;
            borderSoleColorId = 0;
            idLabel = 0;      
            nameCircle = 0;
            idSector = 0;
            nameLine = 0;
            labelsTextArray = [];
            labelsFrameArray = [];
            $(".main-container").css('background-color', '#d9534f');
        }

        function reacomodeBackground(){
            try{
                var lineLayer = Presentation.getDesignSpace().getLineLayer();
                var lineChildren = lineLayer.get('Shape');
                for(var i = 0; i < lineChildren.length; i++){
                    if(lineChildren[i].id() == "externBackground"){
                        lineChildren[i].getParent().moveToBottom();
                        lineLayer.draw();    
                    }
                }                
            }catch(err){
                console.log("There is no extern background yet.");
            }
        }
        return {
            init:init,
            addDesign : addDesign,
            loadDesignDataList : loadDesignDataList,
            loadDesignView : loadDesignView,
            nameDesignUsed : nameDesignUsed,
            storedDesign : storedDesign,
            updateExecutionTime : updateExecutionTime
        };  
    })();

    function init(){
        onLoad.init();
    }

    //Init.
    $(init);

}(Presentation, jQuery));

var backgroundColorId = 0, borderSoleColorId = 0, currentState = 0;