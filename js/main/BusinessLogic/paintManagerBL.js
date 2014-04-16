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

        //Let's centralize everything
        function insertLine(pLineObject){
            linesCollection.push(pLineObject);
        }

        function insertCircle(pCircleObject){
            circlesCollection.push(pCircleObject);
        }

        function deleteLineObject(pId){
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
            for (var i = 0; i <linesCollection.length; i++) {
                if(linesCollection[i] != "empty"){
                  arrayLineJson.push(linesCollection[i].convertToJson());
                }
            };
            return arrayLineJson;
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
            getArrayLineJson : getArrayLineJson
        };  
    })();

}(BusinessLogic, jQuery));
