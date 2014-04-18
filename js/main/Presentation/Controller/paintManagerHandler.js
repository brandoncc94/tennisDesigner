/*!
 * All Rights Reserved
 * This software is proprietary information of
 * Brandon Campos Calderón - Juan Carlos Martínez
 * Use is subject to license terms.
 * Filename: paintManagerController.js
 */

 /*
  * Author:      brandonc94@gmail.com
  * Date:        11/04/2014
  * Description: Paint manager controller to connect the view with data
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
    pContext.getPaintManagerHandler = function() {
        return paintManagerHandler;
    };

    /**
     * Module.
     *      Controller module.
     *
     * @private
     * @namespace
     **/

    var paintManagerHandler = (function(){
        
        function sendLineToPaintManager(pLineObject){
            BusinessLogic.getPaintManagerBL().insertLine(pLineObject);
            //BusinessLogic.getPaintManagerBL().printArray();
        }

        function sendCircleToPaintManager(pCircleObject){
            BusinessLogic.getPaintManagerBL().insertCircle(pCircleObject);
            //BusinessLogic.getPaintManagerBL().printArray2();
        }

        function deleteLine(pId){
            BusinessLogic.getPaintManagerBL().deleteLineObject(pId);
        }

        function deleteCircle(pId){
            BusinessLogic.getPaintManagerBL().deleteCircleObject(pId);
        }

        function deleteAllElements(){
            BusinessLogic.getPaintManagerBL().deleteAllElements();  
        }

        function getCirclesFromPaintManager(){
            return BusinessLogic.getPaintManagerBL().getArrayCircleJson();
        }

        function getLinesFromPaintManager(){
            return BusinessLogic.getPaintManagerBL().getArrayLineJson();
        }

        function loadDesignCircles(pArrayCircles){
            BusinessLogic.getPaintManagerBL().loadDesignCircles(pArrayCircles);
        }

        function loadDesignLines(pArrayLines){
            BusinessLogic.getPaintManagerBL().loadDesignLines(pArrayLines);
        }

        function sendToFire(){
            BusinessLogic.getPaintManagerBL().sendToFire();   
        }


        return {
            sendLineToPaintManager : sendLineToPaintManager,
            sendCircleToPaintManager : sendCircleToPaintManager,
            deleteLine : deleteLine,
            deleteCircle : deleteCircle,
            deleteAllElements: deleteAllElements,
            getCirclesFromPaintManager : getCirclesFromPaintManager,
            getLinesFromPaintManager : getLinesFromPaintManager,
            loadDesignCircles : loadDesignCircles,
            loadDesignLines : loadDesignLines,
            sendToFire : sendToFire
        }; 
    })();    

}(Presentation, jQuery));