/*!
 * All Rights Reserved
 * This software is proprietary information of
 * Brandon Campos Calderón - Juan Carlos Martínez
 * Use is subject to license terms.
 * Filename: paintManajerBL.js
 */

 /*
  * Author:      brandonc94@gmail.com
  * Date:        25/03/2014
  * Description: Business layer
  */

/*
 * Global BusinessLogic Layer 
 * @namespace
 */
(function (pContext, $) {
    'use strict';
    /**
     * Public method to return a reference of parseBusinessLogic.
     * 
     * @return {parseBusinessLogic} Bussiness logic.
         * @public
     */
    pContext.getPaintManagerBL = function() {
        return paintManagerBL;
    };  

    /**
     * Module.
     *      Module for logic layers and sections.
     *
     * @private
     * @namespace
     **/

    //This is a logic that centralizes the objects
    var paintManagerBL = (function(){
        var linesCollection = new Array();
        var circlesCollection = new Array();
        var sole;

        //Let's centralize everything
        function insertLine(pLineObject){
            linesCollection.push(pLineObject);
        }

        function insertCircle(pCircleObject){
            circlesCollection.push(pCircleObject);
        }

        function insertSole(pSoleObject){
            sole = pSoleObject;
        }

        function deleteLineObject(pId){
            alert(pId);
            linesCollection[pId] = "empty";            
        }

        function deleteCircleObject(pId){
            circlesCollection[pId] = "empty";            
        }

        function deleteAllElements(){
            linesCollection = [];
            circlesCollection = [];
        }

        function printArray(){
            for(var i = 0; i < linesCollection.length; i++){
                if(linesCollection[i] != "empty")
                    alert(linesCollection[i].getStrokeWidth());
            }
        }

        function printArray2(){
            for(var i = 0; i < circlesCollection.length; i++){
                if(circlesCollection[i] != "empty")
                    alert(circlesCollection[i].getRadio());
            }
        }

        function getArrayCircleJson(){
            var arrayCircleJson =  new Array();
            for (var i = 0; i <circlesCollection.length; i++) {
                if(circlesCollection[i] != "empty"){
                  arrayCircleJson.push(circlesCollection[i].convertToJson());
                }
            };
            return arrayCircleJson;
        }

        function getArrayLineJson(){
            var arrayLineJson =  new Array();
            for (var i = 0; i < linesCollection.length; i++) {
                if(linesCollection[i] != "empty"){
                  arrayLineJson.push(linesCollection[i].convertToJson());
                }
            };
            return arrayLineJson;
        }

        function loadDesignCircles(pArrayCircles,pArrayLines){
            for (var i = 0; i < pArrayCircles.length; i++) {
              var circle  = pArrayCircles[i];
              var posX = circle["points"][0];
              var posY = circle["points"][1];
              var radius = circle["radius"];
              var fillColor = circle["fillColor"];
              var strokeWidth = circle["strokeWidth"];
              var strokeColor = circle["strokeColor"];
              Presentation.getDesignSpaceHandler().sentDataToDrawCircle(posX,posY,radius,fillColor,strokeWidth,strokeColor);
            }

        }

        function loadDesignLines(pArrayLines){
            for (var i = 0; i < pArrayLines.length; i++) {
              var circle  = pArrayLines[i];
              var posX1 = circle["points"][0][0];
              var posY1 = circle["points"][0][1];
              var posX2 = circle["points"][1][0];
              var posY2 = circle["points"][1][1];
              var strokeWidth = circle["strokeWidth"];
              var strokeColor = circle["strokeColor"];
              Presentation.getDesignSpaceHandler().sentDataToDrawLine(posX1,posY1,posX2,posY2,strokeWidth,strokeColor);
            }
        }

        function sendToFire(){
            BusinessLogic.getfireBL().paint(linesCollection, circlesCollection, sole);
        }

        //Let's make it public
        return {
            insertLine : insertLine,
            insertCircle : insertCircle,
            deleteLineObject : deleteLineObject,
            deleteCircleObject : deleteCircleObject,
            printArray : printArray,
            printArray2 : printArray2,
            deleteAllElements : deleteAllElements,
            getArrayCircleJson : getArrayCircleJson,
            getArrayLineJson : getArrayLineJson,
            loadDesignCircles : loadDesignCircles,
            loadDesignLines : loadDesignLines,
            sendToFire : sendToFire,
            insertSole : insertSole
        };  
    })();

}(BusinessLogic, jQuery));
