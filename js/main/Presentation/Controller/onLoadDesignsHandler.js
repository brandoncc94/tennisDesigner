/*!
 * All Rights Reserved
 * This software is proprietary information of
 * Brandon Campos Calderón - Juan Carlos Martínez
 * Use is subject to license terms.
 * Filename: presentationNamespace.js
 */

 /*
  * Author:      brandonc94@gmail.com
  * Date:        11/04/2014
  * Description: Main controller to connect the view with data
  */

/*
 * Global Presentation Layer to be used with MVC Pattern
 * @namespace
 */
(function (pContext, $) {
	'use strict'
    /**
     * Public method to return a reference of handler module.
     * 
     * @return {handlerModule} Handler declarations of the MVC.
     * @public
     */
    pContext.getOnLoadDesignsHandler = function() {
        return onLoadDesignsHandler;
    };

    /**
     * Module.
     *      Controller module.
     *
     * @private
     * @namespace
     **/

    var onLoadDesignsHandler = (function(){
        function downloadDesigns(){
        	//Send data to its respective namespace reference
            BusinessLogic.getParseBusinessLogic().downloadDesignsNameReference();
        }       

        function loadDesigns(pDesignList){    
            //Load designs through the respective controller    
            Presentation.getOnLoad().loadDesignDataList(pDesignList);  
        }

        //Converts from RGB to HEX taken from http://jsfiddle.net/DCaQb/  
        function convertToHex(pColor) {
            var color = '';
            var parts = pColor.match(/^rgb\((\d+),\s*(\d+),\s*(\d+)\)$/);
            delete(parts[0]);
            for (var i = 1; i <= 3; ++i) {
                parts[i] = parseInt(parts[i]).toString(16);
                if (parts[i].length == 1) parts[i] = '0' + parts[i];
            }
            color = '#' + parts.join('');
            return color;
        }

        function getXPageReference(pE){
            return pE.pageX - ($(".main-container").width() - $("#decoration-container").width() - $("#create-container").width());
        }

        function getYPageReference(pE){
            return pE.pageY - ($("body").height() - $(".header-container").height() - $(".main-container").height() - $(".footer-container").height() + 200);
        }

        function drawLineListener(pStrokeWidth, pStrokeColor){
          //Let's draw a line with 2 clicks
          var clicks = 0;
          var clicksArray = [0, 0]; 
          var canvas = document.getElementById("canvas-container");
          canvas.addEventListener('click', getPosition, false);

          function getPosition(event){
            var x = event.x;
            var y = event.y;

            var canvas = document.getElementById("canvas-container");

            x -= canvas.offsetLeft;
            y -= canvas.offsetTop;
            drawLine(x, y);
          }

          function drawLine(x, y) { 
              if (clicks != 1) {
                  clicks++;
              } else {                  
                  clicks = 0;
                  canvas.removeEventListener('click',  getPosition, false);
                  Presentation.getDesignSpace().drawLine(clicksArray[0], clicksArray[1], x, y, pStrokeWidth, pStrokeColor);   
              }                        
              clicksArray = [x,y];
          };
        }

        function updateLine(pThis, pLineRef, pLabel){
          //Get posX and posY
          var newPosX = pThis.getX();
          var newPosY = pThis.getY();

          var points = pThis.getPoints();

          var points1 = LibraryData.createPoint(points[0] + newPosX, points[1] + newPosY);
          var points2 = LibraryData.createPoint(points[2] + newPosX, points[3] + newPosY);
          var points3 = LibraryData.createPoint(points1, points2);

          //Update the respective object
          pLineRef.setPointsFigure(points3);
          //Update the line Points
          pThis.setPoints(points);

          Presentation.getDesignSpace().updateLinePosition(pLineRef, pLabel);
        }

        return {
            downloadDesigns:downloadDesigns,
            loadDesigns:loadDesigns,
            convertToHex: convertToHex,
            getXPageReference: getXPageReference,
            getYPageReference: getYPageReference,
            drawLineListener: drawLineListener,
            updateLine: updateLine

        }; 
    })();    

}(Presentation, jQuery));