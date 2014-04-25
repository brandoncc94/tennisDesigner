/*!
 * All Rights Reserved
 * This software is proprietary information of
 * Brandon Campos Calderón - Juan Carlos Martínez
 * Use is subject to license terms.
 * Filename: presentationNamespace.js
 */

 /*
  * Author:      juancar199400@gmail.com
  * Date:        16/04/2014
  * Description: Main controller to connect the logic with view
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
    pContext.getDesignSpaceHandler = function() {
        return DesignSpaceHandler;
    };

    /**
     * Module.
     *      Controller module.
     *
     * @private
     * @namespace
     **/
    var DesignSpaceHandler = (function(){
        
        function sentDataToDrawCircle(pPosX, pPosY, pRadius, pFillColor, pStrokeWidth, pStrokeColor){
            Presentation.getDesignSpace().drawCircle(pPosX, pPosY, pRadius, pFillColor, pStrokeWidth, pStrokeColor);
        }

        function sentDataToDrawLine(pPosX1, pPosY1, pPosX2, pPosY2, pStrokeWidth, pStrokeColor){
            Presentation.getDesignSpace().drawLine(pPosX1, pPosY1, pPosX2, pPosY2, pStrokeWidth, pStrokeColor);
        }

        function sendCircleToFire(pPosX, pPosY, pRadius, pFillColor, pStrokeWidth, pStrokeColor){
            BusinessLogic.getFireBL().drawCircleFire(pPosX, pPosY, pRadius, pFillColor, pStrokeWidth, pStrokeColor);
        }

        function sendCircleToArcade(pPosX, pPosY, pRadius, pFillColor, pStrokeWidth, pStrokeColor){
            BusinessLogic.getArcadeBL().drawCircleArcade(pPosX, pPosY, pRadius, pFillColor, pStrokeWidth, pStrokeColor);
        }

        function sendLineToFire(pPosX1, pPosY1, pPosX2, pPosY2, pStrokeWidth, pStrokeColor){
            BusinessLogic.getFireBL().drawLineFire(pPosX1, pPosY1, pPosX2, pPosY2, pStrokeWidth, pStrokeColor);
        }

        function sendLineToArcade(pPosX1, pPosY1, pPosX2, pPosY2, pStrokeWidth, pStrokeColor){
            BusinessLogic.getArcadeBL().drawLineArcade(pPosX1, pPosY1, pPosX2, pPosY2, pStrokeWidth, pStrokeColor);
        }

        function drawCircleFire(pPosX, pPosY, pRadius, pFillColor, pStrokeWidth, pStrokeColor){
            Presentation.getDesignSpace().drawCircleFire(pPosX, pPosY, pRadius, pFillColor, pStrokeWidth, pStrokeColor);
        }

        function drawLineFire(pPosX1, pPosY1, pPosX2, pPosY2, pStrokeWidth, pStrokeColor){
            Presentation.getDesignSpace().drawLineFire(pPosX1, pPosY1, pPosX2, pPosY2, pStrokeWidth, pStrokeColor);
        }

        function drawRectangleArcade(pPosX, pPosY, pRectWidth, pStrokeWidth, pStrokeColor, pAngle){
            Presentation.getDesignSpace().drawRectangleArcade(pPosX, pPosY, pRectWidth, pStrokeWidth, pStrokeColor, pAngle);
        }

        function drawCircleArcade(pPosX, pPosY, pIndex, pStroke, pStrokeWidth){
            Presentation.getDesignSpace().drawCircleArcade(pPosX, pPosY, pIndex, pStroke, pStrokeWidth);
        }

        return {
            sentDataToDrawCircle : sentDataToDrawCircle,
            sentDataToDrawLine : sentDataToDrawLine,
            sendCircleToFire : sendCircleToFire,
            sendCircleToArcade : sendCircleToArcade,
            sendLineToFire : sendLineToFire,
            sendLineToArcade : sendLineToArcade,
            drawCircleFire : drawCircleFire,
            drawCircleArcade : drawCircleArcade,
            drawRectangleArcade : drawRectangleArcade,
            drawLineFire : drawLineFire
        }; 
    })();    

}(Presentation, jQuery));
