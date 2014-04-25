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
            var maxRadius = parseInt(pRadius) - parseInt(pStrokeWidth);
            for(var i = parseInt(pRadius); i > 0; i--){
                var stroke = (i <= maxRadius) ? pFillColor : pStrokeColor;
                Presentation.getDesignSpaceHandler().drawCircleArcade(pPosX, pPosY, i, stroke, pStrokeWidth);

                if(String(pFillColor) === "")
                    break; 
            }
        }

        function drawLineArcade(pPosX1, pPosY1, pPosX2, pPosY2, pStrokeWidth, pStrokeColor){
            var half = Math.floor(parseInt(pStrokeWidth) / 2);
            if(parseInt(pStrokeWidth) % 2 == 0){
                half -=1;
            }

            var startingX1 = parseInt(pPosX1);
            var endingX1 = parseInt(pPosX2);

            var startingY1 = parseInt(pPosY1);
            var endingY1 = parseInt(pPosY2);

            var rectWidth = calculateDistance(startingX1, startingY1, endingX1, endingY1);

            if(startingX1 > endingX1 && startingY1 < endingY1){
                //we have the maximum X's value and add to it the half cause the stroke expands
                var x = Math.max(startingX1, endingX1) + half;
                var y = Math.min(startingY1, endingY1) + 3;  
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

            var angle = convertRadiansToDegrees(Math.atan2(pPosY2-pPosY1,pPosX2-pPosX1));
            Presentation.getDesignSpaceHandler().drawRectangleArcade(x, y, rectWidth, pStrokeWidth, pStrokeColor, angle);
        }
        

        function convertRadiansToDegrees(pRad){
           return pRad*(180/Math.PI);
        }

        function calculateDistance(x1, y1, x2, y2) {
            return Math.sqrt((x2 - x1) * (x2 - x1) + (y2 - y1) * (y2 - y1));
        }

        return {
            drawCircleArcade: drawCircleArcade,
            drawLineArcade : drawLineArcade
        }; 
    })();    

}(BusinessLogic, jQuery));