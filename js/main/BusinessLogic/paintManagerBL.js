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
        var backgroundColor;
        var executionTimes = new Array();
        var borderCollection = new Array();
        var borderCollectionBackUp = new Array();

        //Let's centralize everything
        function insertLine(pLineObject){
            linesCollection.push(pLineObject);
        }

        function insertCircle(pCircleObject){
            circlesCollection.push(pCircleObject);
        }

        function insertBorder(pBorderObject){
            borderCollection.push(pBorderObject);
        }

        function insertSole(pSoleObject){
            sole = pSoleObject;
        }

        function setBackgroundColor(pColor){
            backgroundColor = pColor;
        }

        function deleteLineObject(pId){mae
            linesCollection[pId] = "empty";            
        }

        function deleteCircleObject(pId){
            circlesCollection[pId] = "empty";            
        }

        function deleteAllElements(){
            linesCollection = [];
            circlesCollection = [];
            borderCollection = [];
        }

        function deleteAllSectors(){
            borderCollectionBackUp = borderCollection;
            borderCollection = [];          
        }

        function restoreAllSectors(){
            if(borderCollectionBackUp.length == borderCollection.length)
               borderCollection = borderCollectionBackUp;
        }

        function getSpecificBorder(pId){
            Presentation.getAlertsUI().updateBorder(borderCollection[pId]);
        }

        function getArrayCircleJson(){
            var arrayCircleJson =  new Array();
            for (var i = 0; i <circlesCollection.length; i++) {
                if(circlesCollection[i] != "empty"){
                  arrayCircleJson.push(circlesCollection[i].convertToJson());
                }
            }
            return arrayCircleJson;
        }

        function getArrayLineJson(){
            var arrayLineJson =  new Array();
            for (var i = 0; i < linesCollection.length; i++) {
                if(linesCollection[i] != "empty"){
                  arrayLineJson.push(linesCollection[i].convertToJson());
                }
            }
            return arrayLineJson;
        }

        function getSoleJson(){
            if(sole == null) return {
                points : [],
                strokeWidth : 2,
                strokeColor : "black"
            };
            var soleJson = sole.convertToJson();
            return soleJson;
        }

        function getBackgroundColorJson(){
            return {
              color : backgroundColor
            };
        }

        function setExecutionTimes(pExecutionTimes, pName){
            executionTimes = pExecutionTimes;
            convertDataToExcel('tmpTable', 'metrix-table', 'historyOf' + pName + '.xls');
        }

        function getExecutionTimes(){
            return executionTimes;
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

        function loadDesignSole(pSole){
            var pointsSole = pSole["points"];
            var strokeColor = pSole["strokeColor"];
            var strokeWidth = pSole["strokeWidth"];
            var newSole = LibraryData.createSole(pointsSole,strokeWidth,strokeColor);
            insertSole(newSole);
        }

        function loadDesignBackgroundColor(pBackgroundColor){
            var backgroundColor = pBackgroundColor["color"];
            setBackgroundColor(backgroundColor);
        }

        function sendToDrawingManager(){
            BusinessLogic.getDrawingManager().paintTennis(linesCollection, circlesCollection, borderCollection, sole, backgroundColor);
        }

        function createTable() {
            var executionTimes = getExecutionTimes();

            var sortable = [];
            for (var vehicle in executionTimes)
                  sortable.push([vehicle, executionTimes[vehicle]])
            sortable.sort(function(a, b) {return a[1] - b[1]})
            
            executionTimes.sort(executionTimes[0][0]["time"]);
            executionTimes.sort(executionTimes[1][0]["time"]);

            // Create a <table> element
            var table  = document.createElement("table");
            //set an ID
            table.setAttribute("id", "tmpTable");                      
            var title = document.createElement("th");
            title.appendChild(document.createTextNode("Arcade"));
            table.appendChild(title);
            // create the rows
            for (var i = 0; i < executionTimes[0].length; i++) {
              // Crea las hileras de la tabla
              var row = document.createElement("tr");
           
              for (var j = 0; j < 1; j++) {
                var column = document.createElement("td");
                var columnText = document.createTextNode(executionTimes[0][i]["time"]);
                column.appendChild(columnText);
                row.appendChild(column);

                var column = document.createElement("td");
                var columnText = document.createTextNode(executionTimes[0][i]["date"]);                
                column.appendChild(columnText);
                row.appendChild(column);
              }
              table.appendChild(row);
            }

            var title = document.createElement("th");
            title.appendChild(document.createTextNode("Fire"));
            table.appendChild(title);
            // create the rows
            for (var i = 0; i < executionTimes[1].length; i++) {
              // Crea las hileras de la tabla
              var row = document.createElement("tr");
           
              for (var j = 0; j < 1; j++) {
                var column = document.createElement("td");
                var columnText = document.createTextNode(executionTimes[1][i]["time"]);
                column.appendChild(columnText);
                row.appendChild(column);

                var column = document.createElement("td");
                var columnText = document.createTextNode(executionTimes[1][i]["date"]);                
                column.appendChild(columnText);
                row.appendChild(column);
              }
              table.appendChild(row);
            }

            return table;
        }

        var convertDataToExcel = (function () {
          var uri = 'data:application/vnd.ms-excel;base64,'
          , template = '<html xmlns:o="urn:schemas-microsoft-com:office:office" xmlns:x="urn:schemas-microsoft-com:office:excel" xmlns="http://www.w3.org/TR/REC-html40"><head><!--[if gte mso 9]><xml><x:ExcelWorkbook><x:ExcelWorksheets><x:ExcelWorksheet><x:Name>{worksheet}</x:Name><x:WorksheetOptions><x:DisplayGridlines/></x:WorksheetOptions></x:ExcelWorksheet></x:ExcelWorksheets></x:ExcelWorkbook></xml><![endif]--></head><body><table>{table}</table></body></html>'
          , base64 = function (s) { return window.btoa(unescape(encodeURIComponent(s))) }
          , format = function (s, c) { return s.replace(/{(\w+)}/g, function (m, p) { return c[p]; }) }
          return function (table, name, filename) {
              var finalTable = createTable();
              $("body").append(finalTable);
              $("#tmpTable").hide();

              if (!table.nodeType) table = document.getElementById(table)
              var ctx = { worksheet: name || 'Worksheet', table: table.innerHTML }

              document.getElementById("downloadLink").href = uri + base64(format(template, ctx));
              document.getElementById("downloadLink").download = filename;
              document.getElementById("downloadLink").click();

              $("#tmpTable").remove();
          }
        })()

        function checkIfCollide(pCircleId){
            for(var i = 0; i < circlesCollection.length; i++){
                if(pCircleId != i){
                    var radio = circlesCollection[pCircleId].getRadio();
                    var posX = parseInt(circlesCollection[pCircleId].getPointsFigure().getPositionX());
                    var posY = parseInt(circlesCollection[pCircleId].getPointsFigure().getPositionY());

                    var radio2 = circlesCollection[i].getRadio();
                    var posX2 = parseInt(circlesCollection[i].getPointsFigure().getPositionX());
                    var posY2 = parseInt(circlesCollection[i].getPointsFigure().getPositionY());

                    var distanceX = posX - posX2;
                    var distanceY = posY - posY2;

                    var distance = Math.sqrt((distanceX * distanceX) + (distanceY * distanceY));

                    if(distance <= (parseInt(radio) + parseInt(radio2))){
                        bootbox.dialog({
                            title: "Priority",
                            message: "¿Do you want to exchange priorities?",
                            buttons: {
                              danger: {
                                label: "Cancel",
                                className: "btn-danger"
                              },
                              success: {
                                label: "Accept",
                                className: "btn-success",
                                callback: function() {
                                  var tmpObject = circlesCollection[i];
                                  circlesCollection[i] = circlesCollection[pCircleId];
                                  circlesCollection[pCircleId] = tmpObject;
                                  bootbox.alert("Changes applied.");
                                  Presentation.getPaintManagerHandler().exchangeCircleIds(pCircleId, i);
                                }
                              }
                            }
                        }); 
                        break;
                    }
                } 
            }
        }

        function checkIfLinesCollide(pId){            
            var arrayLineId = [linesCollection[pId].getPointsFigure().getPositionX().getPositionX(), linesCollection[pId].getPointsFigure().getPositionX().getPositionY(),
                              linesCollection[pId].getPointsFigure().getPositionY().getPositionX(), linesCollection[pId].getPointsFigure().getPositionY().getPositionY()]
            for( var i=0; i<linesCollection.length; i++){  // for each line compare
              if(pId != i){
                var arrayLineToCompare = [linesCollection[i].getPointsFigure().getPositionX().getPositionX(), linesCollection[i].getPointsFigure().getPositionX().getPositionY(),
                              linesCollection[i].getPointsFigure().getPositionY().getPositionX(), linesCollection[i].getPointsFigure().getPositionY().getPositionY()]
                var results = checkLineIntersection(arrayLineId[0], arrayLineId[1], arrayLineId[2], arrayLineId[3], 
                           arrayLineToCompare[0], arrayLineToCompare[1], arrayLineToCompare[2], arrayLineToCompare[3]);
                if(results.onLine1 == true && results.onLine2 == true){
                    bootbox.dialog({
                        title: "Priority",
                        message: "¿Do you want exchange priorities?",
                        buttons: {
                          danger: {
                            label: "Cancel",
                            className: "btn-danger"
                          },
                          success: {
                            label: "Accept",
                            className: "btn-success",
                            callback: function() {
                              var tmpObject = linesCollection[i];
                              linesCollection[i] = linesCollection[pId];
                              linesCollection[pId] = tmpObject;
                              bootbox.alert("Changes applied.");
                              Presentation.getPaintManagerHandler().exchangeLinesIds(pId, i);
                            }
                          }
                        }
                    }); 
                    break;
                }                    
              }               
            }
        }

        //Taken from http://jsfiddle.net/justin_c_rounds/Gd2S2/light/
        function checkLineIntersection(pLine1StartX, pLine1StartY, pLine1EndX, pLine1EndY, pLine2StartX, pLine2StartY, pLine2EndX, pLine2EndY) {
            var denominator, a, b, numerator1, numerator2, result = {
                x: null,        //  Position X of the intersection
                y: null,        //  Position Y of the intersection
                onLine1: false, 
                onLine2: false
            };
            
            denominator = ((pLine2EndY - pLine2StartY) * (pLine1EndX - pLine1StartX)) - ((pLine2EndX - pLine2StartX) * (pLine1EndY - pLine1StartY));
            if (denominator == 0) {
                return result;
            }
            a = pLine1StartY - pLine2StartY;
            b = pLine1StartX - pLine2StartX;
            numerator1 = ((pLine2EndX - pLine2StartX) * a) - ((pLine2EndY - pLine2StartY) * b);
            numerator2 = ((pLine1EndX - pLine1StartX) * a) - ((pLine1EndY - pLine1StartY) * b);
            a = numerator1 / denominator;
            b = numerator2 / denominator;

            // if we cast these lines infinitely in both directions, they intersect here:
            result.x = pLine1StartX + (a * (pLine1EndX - pLine1StartX));
            result.y = pLine1StartY + (a * (pLine1EndY - pLine1StartY));
        
            // if line1 is a segment and line2 is infinite, they intersect if:
            if (a > 0 && a < 1) {
                result.onLine1 = true;
            }
            // if line2 is a segment and line1 is infinite, they intersect if:
            if (b > 0 && b < 1) {
                result.onLine2 = true;
            }            
            //If both are true, they intersect each other
            return result;
        }        

        //Let's make it public
        return {
            insertLine : insertLine,
            insertCircle : insertCircle,
            insertBorder : insertBorder,
            deleteLineObject : deleteLineObject,
            deleteCircleObject : deleteCircleObject,
            deleteAllElements : deleteAllElements,
            deleteAllSectors : deleteAllSectors,
            restoreAllSectors : restoreAllSectors,
            getArrayCircleJson : getArrayCircleJson,
            getArrayLineJson : getArrayLineJson,
            getSoleJson : getSoleJson,
            getBackgroundColorJson : getBackgroundColorJson,
            loadDesignCircles : loadDesignCircles,
            loadDesignLines : loadDesignLines,
            loadDesignSole : loadDesignSole,
            loadDesignBackgroundColor : loadDesignBackgroundColor,
            sendToDrawingManager : sendToDrawingManager,
            setExecutionTimes : setExecutionTimes,
            insertSole : insertSole,
            convertDataToExcel : convertDataToExcel,
            checkIfCollide : checkIfCollide,
            checkIfLinesCollide : checkIfLinesCollide,
            getSpecificBorder : getSpecificBorder,
            setBackgroundColor : setBackgroundColor
        };  
    })();

}(BusinessLogic, jQuery));
