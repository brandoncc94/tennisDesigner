/*!
 * All Rights Reserved
 * This software is proprietary information of
 * Brandon Campos Calderón - Juan Carlos Martínez
 * Use is subject to license terms.
 * Filename: extraCalculationsHandler.js
 */

 /*
  * Author:      brandonc94@gmail.com
  * Date:        23/04/2014
  * Description: Calculations controller to make math and stuff
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
    pContext.getExtraCalculationsHandler = function() {
        return extraCalculationsHandler;
    };

    /**
     * Module.
     *      Controller module.
     *
     * @private
     * @namespace
     **/
    var extraCalculationsHandler = (function(){
        function checkIntersection(pLineObject, pType, pLen){
            BusinessLogic.getExtraCalculationsBL().checkIntersection(pLineObject, pType, pLen);
        }

        function checkIntersectionArray(pLineObject, pType){
            Presentation.getDesignSpace().checkIntersectionArray(pLineObject, pType);
        }

        function checkIntersectionQuadratic(pLineObject){
            BusinessLogic.getExtraCalculationsBL().checkIntersectionQuadratic(pLineObject);
        }

        function divideSegments(){
            BusinessLogic.getExtraCalculationsBL().divideSegments();
        }

        function paintPolygon(pPointIntersectA, pPointIntersectB){
            Presentation.getDesignSpace().paintPolygon(pPointIntersectA, pPointIntersectB);
        }
        
        /*function getCurvePoints(pts, tension, isClosed, numOfSegments){
            BusinessLogic.getExtraCalculationsBL().getCurvePoints(pts, tension, isClosed, numOfSegments);
        }*/

        function sendDrawCurves(pResult){
            Presentation.getDesignSpace().drawCurvesPoints(pResult);
        }

        return {
            checkIntersection : checkIntersection,
            checkIntersectionQuadratic : checkIntersectionQuadratic,
            //getCurvePoints : getCurvePoints,
            sendDrawCurves : sendDrawCurves,
            checkIntersectionArray : checkIntersectionArray,
            divideSegments : divideSegments,
            paintPolygon : paintPolygon
        }; 
    })();    

}(Presentation, jQuery));
