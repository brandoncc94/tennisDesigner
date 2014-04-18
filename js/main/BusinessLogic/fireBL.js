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
    pContext.getfireBL = function() {
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

        function paint(pLinesCollection, pCirclesCollection, pSoleObject){
            var start = new Date().getTime();
            Presentation.getDesignSpace().fillBackground("red");
            Presentation.getDesignSpace().reduceAnchors();

            if(pSoleObject == null){
                Presentation.getDesignSpace().fillSole("black");
            }else{
                Presentation.getDesignSpace().fillSole(pSoleObject.getStrokeColor());
            }
            paintLines(pLinesCollection);
            paintCircles(pCirclesCollection);

            var end = new Date().getTime();
            var time = end - start;
            Presentation.getOnLoadHandler().sendExecutionTime(time);
        }

        function paintLines(pLinesCollection){
            for(var i = 0; i < pLinesCollection.length; i++){
                var strokeWidth = pLinesCollection[i].getStrokeWidth();
                var strokeColor = pLinesCollection[i].getStrokeColor();
                var points = [pLinesCollection[i].getPointsFigure().getPositionX().getPositionX(), 
                              pLinesCollection[i].getPointsFigure().getPositionX().getPositionY(),
                              pLinesCollection[i].getPointsFigure().getPositionY().getPositionX(),
                              pLinesCollection[i].getPointsFigure().getPositionY().getPositionY()];
                Presentation.getDesignSpace().drawLine(points[0], points[1], points[2], points[3], strokeWidth, strokeColor, "fire"); 
            }
        }

        function paintCircles(pCirclesCollection){
            for(var i = 0; i < pCirclesCollection.length; i++){
                var strokeWidth = pCirclesCollection[i].getStrokeWidth();
                var strokeColor = pCirclesCollection[i].getStrokeColor();
                var radio = pCirclesCollection[i].getRadio();
                var fillColor = pCirclesCollection[i].getFillColor();
                var points = [pCirclesCollection[i].getPointsFigure().getPositionX(), 
                              pCirclesCollection[i].getPointsFigure().getPositionY()];

                Presentation.getDesignSpace().drawCircle(points[0], points[1], radio, fillColor, strokeWidth, strokeColor, "fire"); 
            }

        }

        return {
            paint: paint
        }; 
    })();    

}(BusinessLogic, jQuery));