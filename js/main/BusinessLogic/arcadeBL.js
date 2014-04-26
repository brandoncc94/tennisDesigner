/*!
 * All Rights Reserved
 * This software is proprietary information of
 * Brandon Campos Calderón - Juan Carlos Martínez
 * Use is subject to license terms.
 * Filename: fireBL.js
 */

 /*
  * Author:      brandoncc94@gmail.com
  * Date:        19/04/2014
  * Description: Arcade method.
  */

/*
 * Global Presentation Layer 
 * @namespace
 */
(function (pContext, $) {
	'use strict'
    /**
     * Public method to return a reference of handler module.
     * 
     * @return {ArcadeBL} Handler declarations of the MVC.
     * @public
     */
    pContext.getArcadeBL = function() {
        return arcadeBL;
    };

    /**
     * Module.
     *      Controller module.
     *
     * @private
     * @namespace
     **/

    var arcadeBL = (function(){

        function drawCircleArcade(pPosX, pPosY, pRadius, pFillColor, pStrokeWidth, pStrokeColor){
            var maxRadius = parseInt(pRadius) - parseInt(pStrokeWidth);                                         // 1 + 3 + 1 + 3
            for(var i = parseInt(pRadius); i > 0; i--){                                                         // + 4 + ( 1 + 2
                var stroke = (i <= maxRadius) ? pFillColor : pStrokeColor;                                      // + 1 + 1 + 1
                Presentation.getDesignSpaceHandler().drawCircleArcade(pPosX, pPosY, i, stroke, pStrokeWidth);   // + 2 + 2 + 5

                if(String(pFillColor) === "")                                                                   // + 3 + 1 ) N
                    break;                                                                                      // + 1
            }
            //f(x) = 12 + 19N -> O(n)
        }

        function drawLineArcade(pPosX1, pPosY1, pPosX2, pPosY2, pStrokeWidth, pStrokeColor){
            var half = Math.floor(parseInt(pStrokeWidth) / 2);                                                  // 1 + 2 + 1 + 3 + 2

            var startingX1 = parseInt(pPosX1);                                                                  // + 1 + 3
            var endingX1 = parseInt(pPosX2);                                                                    // + 1 + 3  

            var startingY1 = parseInt(pPosY1);                                                                  // + 1 + 3
            var endingY1 = parseInt(pPosY2);                                                                    // + 1 + 3

            var rectWidth = calculateDistance(startingX1, startingY1, endingX1, endingY1);                      // + 1 + 2 + 4

            if(startingX1 > endingX1 && startingY1 < endingY1){                                                 // + 2
                //we have the maximum X's value and add to it the half cause the stroke expands
                var x = Math.max(startingX1, endingX1) + half;                                                  // + 1 + 2 + 2 + 1 
                var y = Math.min(startingY1, endingY1) + 3;                                                     // + 1 + 2 + 2 + 1
            }else if(startingX1 < endingX1 && startingY1 > endingY1){
                //we have the minimum X's value and quit to it the half cause the stroke expands
                var x = Math.min(startingX1, endingX1) - half;
                var y = Math.max(startingY1, endingY1) - 3;  
            }else if(startingX1 > endingX1 && startingY1 > endingY1){
                //we have the maximum X's value and add to it the half cause the stroke expands
                var x = Math.max(startingX1, endingX1) - half;
                var y = Math.max(startingY1, endingY1) + 3;                  
            }else{
                //we have the maximum X's value and add to it the half cause the stroke expands
                var x = Math.min(startingX1, endingX1) + 3;
                var y = Math.min(startingY1, endingY1) - half;   
            }

            var angle = convertRadiansToDegrees(Math.atan2(pPosY2-pPosY1,pPosX2-pPosX1));                       // + 1 + 2 + 1 + 2 + 2 + 2
            Presentation.getDesignSpaceHandler().drawRectangleArcade(x, y, rectWidth, pStrokeWidth, pStrokeColor, angle); // + 2 + 2 + 6

            //f(x) = 66 -> O(c)
        }
        
        function convertRadiansToDegrees(pRad){
           return pRad*(180/Math.PI);           // + 2 + 1 + 2
        }

        function calculateDistance(x1, y1, x2, y2) {
            return Math.sqrt((x2 - x1) * (x2 - x1) + (y2 - y1) * (y2 - y1));  // + 2 + 7 + 1 
        }

        return {
            drawCircleArcade: drawCircleArcade,
            drawLineArcade : drawLineArcade
        }; 
    })();    

}(BusinessLogic, jQuery));