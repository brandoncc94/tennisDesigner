/*!
 * All Rights Reserved
 * This software is proprietary information of
 * Brandon Campos Calderón - Juan Carlos Martínez
 * Use is subject to license terms.
 * Filename: fireBL.js
 */

 /*
  * Author:      brandoncc94@gmail.com
  * Date:        17/04/2014
  * Description: Fire method.
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
     * @return {fireBL} Handler declarations of the MVC.
     * @public
     */
    pContext.getFireBL = function() {
        return fireBL;
    };

    /**
     * Module.
     *      Controller module.
     *
     * @private
     * @namespace
     **/

    var fireBL = (function(){
        
        function drawCircleFire(pPosX, pPosY, pRadius, pFillColor, pStrokeWidth, pStrokeColor){
            Presentation.getDesignSpaceHandler().drawCircleFire(pPosX, pPosY, pRadius, pFillColor, pStrokeWidth, pStrokeColor);  // + 2 + 2 + 6
            //f(x) = 10 -> O(c)
        }

        function drawLineFire(pPosX1, pPosY1, pPosX2, pPosY2, pStrokeWidth, pStrokeColor){
            Presentation.getDesignSpaceHandler().drawLineFire(pPosX1, pPosY1, pPosX2, pPosY2, pStrokeWidth, pStrokeColor);    // + 2 + 2 + 6
            //f(x) = 10 -> O(c)
        }

        return {
            drawCircleFire: drawCircleFire,
            drawLineFire : drawLineFire
        }; 
    })();    

}(BusinessLogic, jQuery));