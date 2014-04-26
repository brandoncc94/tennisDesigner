/*!
 * All Rights Reserved
 * This software is proprietary information of
 * Brandon Campos Calderón - Juan Carlos Martínez
 * Use is subject to license terms.
 * Filename: drawingManager.js
 */

 /*
  * Author:      brandoncc94@gmail.com
  * Date:        25/04/2014
  * Description: drawing Manager.
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
    pContext.getDrawingManager = function() {
        return drawingManager;
    };

    /**
     * Module.
     *      Drawing Manager module.
     *
     * @private
     * @namespace
     **/

    var drawingManager = (function(){

        function paintTennis(pLinesCollection, pCirclesCollection, pBordersCollection, pSoleObject, pBackgroundColor){
            var start = new Date().getTime();
            Presentation.getDesignSpace().fillBackground(pBackgroundColor);
            Presentation.getDesignSpace().reduceAnchors();

            if(pSoleObject == null){
                Presentation.getDesignSpace().fillSole("black", 2);
            }else{
                pSoleObject.paint();
            }
            paintBorders(pBordersCollection);
            paintLines(pLinesCollection);
            paintCircles(pCirclesCollection);
            Presentation.getDesignSpace().fillExternBackground();
            var end = new Date().getTime();
            var time = end - start;
            time = time / 1000;
            Presentation.getOnLoadHandler().sendExecutionTime(time);
        }

        function paintBorders(pBordersCollection){
            for(var i = 0; i < pBordersCollection.length; i++)
                pBordersCollection[i].paint();
        }

        function paintLines(pLinesCollection){            
            for(var i = 0; i < pLinesCollection.length; i++)
                pLinesCollection[i].paint();
        }

        function paintCircles(pCirclesCollection){
            for(var i = 0; i < pCirclesCollection.length; i++)
                pCirclesCollection[i].paint();
        }

        return {
            paintTennis: paintTennis
        }; 
    })();    

}(BusinessLogic, jQuery));