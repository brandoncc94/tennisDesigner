/*!
 * All Rights Reserved
 * This software is proprietary information of
 * Brandon Campos Calderón - Juan Carlos Martínez
 * Use is subject to license terms.
 * Filename: AlertsUI.js
 */

 /*
  * Author:      brandonc94@gmail.com
  * Date:        15/04/2014
  * Description: Alerts to show
 */

/*
 * Global Presentation Layer to be used with MVC Pattern
 * @namespace
 */
(function (pContext, $) {
    /**
     * Public method to return a reference of AlertsUI.
     * 
     * @return {AlertsUI} View declarations of the MVC.
         * @public
     */

    pContext.getAlertsUI = function() {
        return AlertsUI;
    };


    var AlertsUI = (function(){
        function insertLineFeatureDialog(pChange){     
            HTML = "<div id='infos'>\
                    <span>Stroke Color: </span><div style ='margin-top: -55px' id='tmp2DivBackgroundColor' class='color-box'></div></br></br>\
                    <span>Stroke Width: </span><input style='margin-top: -55px' type='text' id='tbxStrokeWidth'></input></br></br>\
                    </div>";

            colorPickers = "<script>\
                    $('#tmp2DivBackgroundColor').colpick({colorScheme:'dark',layout:'rgbhex',color:'ff8800',onSubmit:function(hsb,hex,rgb,el) {$(el).css('background-color', '#'+hex);$(el).colpickHide();  }}).css('background-color', '#ff8800');\
                    </script>";

            colorPickersOriginal = colorPickers;

            if(pChange){
                pChange = false;
                ColorPickers += "<script> $('#tbxStrokeWidth').val(strokeWidthAlert);\
                                        $('#tmpDivBackgroundColor').colpick({colorScheme:'dark',layout:'rgbhex',color:'ff8800',onSubmit:function(hsb,hex,rgb,el) {$(el).css('background-color', '#'+hex); $(el).colpickHide(); }}).css('background-color', '#' + strokeColorAlert);\
                                  </script>";                
            }

            bootbox.dialog({
              message: HTML + colorPickers,
              title: "Insert Characteristics",
              buttons: {
                main: {
                  label: "Apply",
                  className: "btn-primary",
                    callback: function() {
                        strokeColorAlert = Presentation.getOnLoadDesignsHandler().convertToHex($("#tmp2DivBackgroundColor").css('backgroundColor'));
                        strokeWidthAlert = $("#tbxStrokeWidth").val();
                        
                        if($("#tbxStrokeWidth").val().length == 0){
                            pChange = true;
                            bootbox.alert("Please select the stroke width.", function() {
                                insertLineFeatureDialog(pChange);
                            });
                        }else{
                            bootbox.alert("Now drag the line.");
                            Presentation.getDesignSpace().dragElementsIntoCanvas(null, strokeWidthAlert, strokeColorAlert,null);
                        }
                    }
                }
              }
            });
        }

        function changeLineFeatureDialog(pReference, pLabel, pChange, pLineObj){ 
            HTML = "<div id='infos'>\
                    <span>Stroke Color: </span><div style ='margin-top: -55px' id='tmp2DivBackgroundColor' class='color-box'></div></br></br>\
                    <span>Stroke Width: </span><input style='margin-top: -55px' type='text' id='tbxStrokeWidth'></input></br></br>\
                    </div>";

            colorPickers = "<script>\
                    $('#tmp2DivBackgroundColor').colpick({colorScheme:'dark',layout:'rgbhex',color:'ff8800',onSubmit:function(hsb,hex,rgb,el) {$(el).css('background-color', '#'+hex);$(el).colpickHide();  }}).css('background-color', '#ff8800');\
                    </script>";

            colorPickersOriginal = colorPickers;

            strokeWidthAlert = pLineObj.getStrokeWidth();
            strokeColorAlert = pLineObj.getStrokeColor();

            colorPickers += "<script> $('#tbxStrokeWidth').val(strokeWidthAlert);\
                                       $('#tmp2DivBackgroundColor').colpick({colorScheme:'dark',layout:'rgbhex',color:'ff8800',onSubmit:function(hsb,hex,rgb,el) {$(el).css('background-color', '#'+hex);$(el).colpickHide();  }}).css('background-color', strokeColorAlert);\
                             </script>";

            bootbox.dialog({
              message: HTML + colorPickers,
              title: "Change Characteristics",
              buttons: {
                main: {
                  label: "Apply",
                  className: "btn-primary",
                    callback: function() {
                        strokeColorAlert = Presentation.getOnLoadDesignsHandler().convertToHex($("#tmp2DivBackgroundColor").css('backgroundColor'));
                        strokeWidthAlert = $("#tbxStrokeWidth").val();

                        if($("#tbxStrokeWidth").val().length == 0){
                            pChange = true;
                            bootbox.alert("Please select the stroke width.", function() {
                                insertLineFeatureDialog(pChange);
                            });
                        }
                        else{
                            /****************************************************************************************************/
                            /****************************************************************************************************/
                            /****************************************************************************************************/    
                            /****************************************************************************************************/

                            pLineObj.setStrokeWidth(strokeWidthAlert);
                            pLineObj.setStrokeColor(strokeColorAlert);

                            /****************************************************************************************************/
                            /****************************************************************************************************/
                            /****************************************************************************************************/
                            /****************************************************************************************************/

                            var cad = "Stroke Width: " + strokeWidthAlert + "\n" + "Stroke Color: " + strokeColorAlert  + "\n" + 
                                      "Points: [" + pLineObj.getPointsFigure().getPositionX().getPositionX() + ", " +pLineObj.getPointsFigure().getPositionX().getPositionY() + "] , " + 
                                      "[" + pLineObj.getPointsFigure().getPositionY().getPositionX() + "," + pLineObj.getPointsFigure().getPositionY().getPositionY() + "]";
                            
                            pLabel.changeName(cad, "", pReference.id());                            
                            Presentation.getDesignSpace().getFiguresLayer().draw();

                            bootbox.alert("Changes applied.");
                        }
                    }
                }
              }
            });
        }

        function insertFeatureDialog(pChange){     
            HTML = "<div id='infos'>\
                    <span>Fill Color: </span><div id='tmpDivBackgroundColor' class='color-box'></div></br></br>\
                    <span>Stroke Color: </span><div id='tmp2DivBackgroundColor' class='color-box'></div></br></br>\
                    <span>Stroke Width: </span><input type='text' id='tbxStrokeWidth'></input></br></br>\
                    <span>Radius: </span> <input type='text' id='tbxRadius'>\
                    </div>";

            colorPickers = "<script>\
                    $('#tmpDivBackgroundColor').colpick({colorScheme:'dark',layout:'rgbhex',color:'ff8800',onSubmit:function(hsb,hex,rgb,el) {$(el).css('background-color', '#'+hex); $(el).colpickHide(); }}).css('background-color', '#ff8800');\
                    $('#tmp2DivBackgroundColor').colpick({colorScheme:'dark',layout:'rgbhex',color:'ff8800',onSubmit:function(hsb,hex,rgb,el) {$(el).css('background-color', '#'+hex);$(el).colpickHide();  }}).css('background-color', '#ff8800');\
                    </script>";

            colorPickersOriginal = colorPickers;

            if(pChange){
                pChange = false;
                colorPickers += "<script> $('#tbxStrokeWidth').val(strokeWidthAlert);\
                                       $('#tbxRadius').val(radiusAlert);\
                                       $('#tmpDivBackgroundColor').colpick({colorScheme:'dark',layout:'rgbhex',color:'ff8800',onSubmit:function(hsb,hex,rgb,el) {$(el).css('background-color', '#'+hex); $(el).colpickHide(); }}).css('background-color', '#' + fillColorAlert);\
                                       $('#tmp2DivBackgroundColor').colpick({colorScheme:'dark',layout:'rgbhex',color:'ff8800',onSubmit:function(hsb,hex,rgb,el) {$(el).css('background-color', '#'+hex);$(el).colpickHide();  }}).css('background-color', '#' + strokeColorAlert);\
                             </script>";                
            }

            bootbox.dialog({
              message: HTML + colorPickers,
              title: "Insert Characteristics",
              buttons: {
                main: {
                  label: "Apply",
                  className: "btn-primary",
                    callback: function() {
                        fillColorAlert = Presentation.getOnLoadDesignsHandler().convertToHex($("#tmpDivBackgroundColor").css('backgroundColor'));    
                        radiusAlert = $("#tbxRadius").val();             
                        strokeColorAlert = Presentation.getOnLoadDesignsHandler().convertToHex($("#tmp2DivBackgroundColor").css('backgroundColor'));
                        strokeWidthAlert = $("#tbxStrokeWidth").val();
                        
                        if($("#tbxStrokeWidth").val().length == 0){
                            pChange = true;
                            colorPickers = colorPickersOriginal;
                            bootbox.alert("Please select the stroke width.", function() {
                                insertFeatureDialog(pChange);                     
                            });
                        }else if($("#tbxRadius").val().length == 0){
                            pChange = true;
                            colorPickers = colorPickersOriginal;
                            bootbox.alert("Please select the radius of the circle.", function() {
                                insertFeatureDialog(pChange);                     
                            });
                        }else{
                            bootbox.alert("Now drag the circle.");
                            Presentation.getDesignSpace().dragElementsIntoCanvas(radiusAlert, strokeWidthAlert, strokeColorAlert, fillColorAlert);
                        }
                    }
                }
              }
            });
        }

        function changeFeatureDialog(pReference, pLabel, pChange, pCircleObj){ 
            HTML = "<div id='infos'>\
                    <span>Fill Color: </span><div id='tmpDivBackgroundColor' class='color-box'></div></br></br>\
                    <span>Stroke Color: </span><div id='tmp2DivBackgroundColor' class='color-box'></div></br></br>\
                    <span>Stroke Width: </span><input type='text' id='tbxStrokeWidth'></input></br></br>\
                    <span>Radius: </span> <input type='text' id='tbxRadius'>\
                    </div>";

            colorPickers = "<script>\
                    $('#tmpDivBackgroundColor').colpick({colorScheme:'dark',layout:'rgbhex',color:'ff8800',onSubmit:function(hsb,hex,rgb,el) {$(el).css('background-color', '#'+hex); $(el).colpickHide(); }}).css('background-color', '#ff8800');\
                    $('#tmp2DivBackgroundColor').colpick({colorScheme:'dark',layout:'rgbhex',color:'ff8800',onSubmit:function(hsb,hex,rgb,el) {$(el).css('background-color', '#'+hex);$(el).colpickHide();  }}).css('background-color', '#ff8800');\
                    </script>";

            colorPickersOriginal = colorPickers;

            strokeWidthAlert = pCircleObj.getStrokeWidth();
            radiusAlert = pCircleObj.getRadio();
            fillColorAlert = pCircleObj.getFillColor();
            strokeColorAlert = pCircleObj.getStrokeColor();

            colorPickers += "<script> $('#tbxStrokeWidth').val(strokeWidthAlert);\
                                       $('#tbxRadius').val(radiusAlert);\
                                       $('#tmpDivBackgroundColor').colpick({colorScheme:'dark',layout:'rgbhex',color:'ff8800',onSubmit:function(hsb,hex,rgb,el) {$(el).css('background-color', '#'+hex); $(el).colpickHide(); }}).css('background-color', fillColorAlert);\
                                       $('#tmp2DivBackgroundColor').colpick({colorScheme:'dark',layout:'rgbhex',color:'ff8800',onSubmit:function(hsb,hex,rgb,el) {$(el).css('background-color', '#'+hex);$(el).colpickHide();  }}).css('background-color', strokeColorAlert);\
                             </script>";

            bootbox.dialog({
              message: HTML + colorPickers,
              title: "Change Characteristics",
              buttons: {
                main: {
                  label: "Apply",
                  className: "btn-primary",
                  callback: function() {
                        fillColorAlert = Presentation.getOnLoadDesignsHandler().convertToHex($("#tmpDivBackgroundColor").css('backgroundColor'));
                        strokeColorAlert = Presentation.getOnLoadDesignsHandler().convertToHex($("#tmp2DivBackgroundColor").css('backgroundColor'));
                        strokeWidthAlert = $("#tbxStrokeWidth").val();
                        radiusAlert = $("#tbxRadius").val();

                        if($("#tbxStrokeWidth").val().length == 0){
                            change = true;
                            colorPickers = colorPickersOriginal;
                            bootbox.alert("Please select the stroke width.", function() {
                                insertFeatureDialog(change);                     
                            });
                        }
                        else if($("#tbxRadius").val().length == 0){
                            change = true;
                            colorPickers = colorPickersOriginal;
                            bootbox.alert("Please select the radius of the circle.", function() {
                                insertFeatureDialog(change);                     
                            });
                        }
                        else{
                            //Graphical radio
                            pReference.setRadius(radiusAlert);

                            /****************************************************************************************************/
                            /****************************************************************************************************/
                            /****************************************************************************************************/
                            /****************************************************************************************************/

                            pCircleObj.setRadio(radiusAlert);
                            pCircleObj.setStrokeWidth(strokeWidthAlert);
                            pCircleObj.setFillColor(fillColorAlert);
                            pCircleObj.setStrokeColor(strokeColorAlert);

                            /****************************************************************************************************/
                            /****************************************************************************************************/
                            /****************************************************************************************************/
                            /****************************************************************************************************/

                            var cad = "Radius: " + radiusAlert + "\n" + "Stroke Width: " + strokeWidthAlert + "\n" + "Stroke Color: " + strokeColorAlert + "\n" + "Fill Color: " + fillColorAlert;
                            pLabel.changeName(cad, "", pReference.id());                  
                            Presentation.getDesignSpace().getFiguresLayer().draw();

                            bootbox.alert("Changes applied.");
                        }
                  }
                }
              }
            });
        }
        return{
            insertLineFeatureDialog:insertLineFeatureDialog,
            insertFeatureDialog:insertFeatureDialog,
            changeLineFeatureDialog:changeLineFeatureDialog,
            changeFeatureDialog:changeFeatureDialog

        };
    })();
}(Presentation, jQuery));

var HTML = "", colorPickers = "", orginalColorPickers = "";