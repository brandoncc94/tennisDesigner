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
        function checkIntersection(pLineObject){
            BusinessLogic.getExtraCalculationsBL().checkIntersection(pLineObject);
        }

        function checkIntersectionQuadratic(pLineObject){
            BusinessLogic.getExtraCalculationsBL().checkIntersectionQuadratic(pLineObject);
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
            sendDrawCurves : sendDrawCurves
        }; 
    })();    

}(Presentation, jQuery));
