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
        var executionTimes = new Array();

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

        function setExecutionTimes(pExecutionTimes){
            alert(pExecutionTimes.length);
            alert(pExecutionTimes[0].length);
            alert(pExecutionTimes[1].length);
            executionTimes = pExecutionTimes;
            alert(executionTimes.length);
            alert(executionTimes[0].length);
            alert(executionTimes[1][0]["time"]);
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

        function sendToFire(){
            BusinessLogic.getfireBL().paintTennis(linesCollection, circlesCollection, sole);
        }

        function sendToArcade(){
            BusinessLogic.getArcadeBL().paintTennis(linesCollection, circlesCollection, sole);
        }

        function createTable(pI, pTable) {
          if(pI == 1){
              var row = document.createElement("tr");
              var column = document.createElement("td");
              var columnText = document.createTextNode($('#metrix-table').find('td:eq(0)').text());
              column.appendChild(columnText);
              row.appendChild(column);

              var column = document.createElement("td");
              var columnText = document.createTextNode($('#metrix-table').find('td:eq(1)').text());                
              column.appendChild(columnText);
              row.appendChild(column);

              pTable.appendChild(row);

              return pTable;
          }
          else{
            // Crea un elemento <table> 
            var table   = document.createElement("table");
            table.setAttribute("id", "tmpTable");
           
            // Crea las celdas
            for (var i = 0; i < pI; i++) {
              // Crea las hileras de la tabla
              var row = document.createElement("tr");
           
              for (var j = 0; j < 1; j++) {
                var column = document.createElement("td");
                var columnText = document.createTextNode("Historial");
                column.appendChild(columnText);
                row.appendChild(column);

                var column = document.createElement("td");
                var columnText = document.createTextNode("Aqui va el resto");                
                column.appendChild(columnText);
                row.appendChild(column);
              }
              table.appendChild(row);
            }

            return table;
          }
        }

        var convertDataToExcel = (function () {
          var uri = 'data:application/vnd.ms-excel;base64,'
          , template = '<html xmlns:o="urn:schemas-microsoft-com:office:office" xmlns:x="urn:schemas-microsoft-com:office:excel" xmlns="http://www.w3.org/TR/REC-html40"><head><!--[if gte mso 9]><xml><x:ExcelWorkbook><x:ExcelWorksheets><x:ExcelWorksheet><x:Name>{worksheet}</x:Name><x:WorksheetOptions><x:DisplayGridlines/></x:WorksheetOptions></x:ExcelWorksheet></x:ExcelWorksheets></x:ExcelWorkbook></xml><![endif]--></head><body><table>{table}</table></body></html>'
          , base64 = function (s) { return window.btoa(unescape(encodeURIComponent(s))) }
          , format = function (s, c) { return s.replace(/{(\w+)}/g, function (m, p) { return c[p]; }) }
          return function (table, name, filename) {
            var tmpTable = createTable(5);
            var finalTable = createTable(1, tmpTable);
            $("body").append(finalTable);
            $("#tmpTable").hide();

              if (!table.nodeType) table = document.getElementById(table)
              var ctx = { worksheet: name || 'Worksheet', table: table.innerHTML }

              document.getElementById("downloadLink").href = uri + base64(format(template, ctx));
              document.getElementById("downloadLink").download = filename;
              document.getElementById("downloadLink").click();
          }
        })()

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
            getSoleJson : getSoleJson,
            loadDesignCircles : loadDesignCircles,
            loadDesignLines : loadDesignLines,
            loadDesignSole : loadDesignSole,
            sendToFire : sendToFire,
            sendToArcade : sendToArcade,
            setExecutionTimes : setExecutionTimes,
            insertSole : insertSole,
            convertDataToExcel : convertDataToExcel
        };  
    })();

}(BusinessLogic, jQuery));
