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
            Presentation.getDesignSpace().drawCircle(pPosX, pPosY, pRadius, pFillColor, pStrokeWidth, pStrokeColor, "edit");
        }

        function sentDataToDrawLine(pPosX1, pPosY1, pPosX2, pPosY2, pStrokeWidth, pStrokeColor){
            Presentation.getDesignSpace().drawLine(pPosX1, pPosY1, pPosX2, pPosY2, pStrokeWidth, pStrokeColor, "edit");
        }

        return {
            sentDataToDrawCircle : sentDataToDrawCircle,
            sentDataToDrawLine : sentDataToDrawLine    
        }; 
    })();    

}(Presentation, jQuery));
