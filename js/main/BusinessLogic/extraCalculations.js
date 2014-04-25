/*!
 * All Rights Reserved
 * This software is proprietary information of
 * Brandon Campos Calderón - Juan Carlos Martínez
 * Use is subject to license terms.
 * Filename: extraCalculations.js
 */

 /*
  * Author:      brandonc94@gmail.com
  * Date:        23/04/2014
  * Description: Business layer
  */

/*
 * Global BusinessLogic Layer 
 * @namespace
 */
(function (pContext, $) {
    'use strict';
    /**
     * Public method to return a reference of parseBusinessLogic.
     * 
     * @return {extraCalculations} Bussiness logic.
         * @public
     */
    pContext.getExtraCalculationsBL = function() {
        return extraCalculations;
    };  

    /**
     * Module.
     *      Module for logic layers and sections.
     *
     * @private
     * @namespace
     **/

    //This is a logic that centralizes the objects
    var extraCalculations = (function(){

        //Check the intersection with the default lines
        function checkIntersection(pLineObject, pType){
            var lineIntersetions = new Array();

            var lineChildren = Presentation.getDesignSpace().getLineLayer().get('Line');
            var straightLine = Presentation.getDesignSpace().getLineLayer().get('#straightLine')[0];
            var staticLines = lineChildren[0].getPoints();
            
            for( var i=0; i<6; i++){  // for each static straight line
               var results = checkLineIntersection(pLineObject[0], pLineObject[1], pLineObject[2], pLineObject[3], 
                           staticLines[i], staticLines[i + 1], staticLines[i + 2], staticLines[i + 3]);
               if(results.onLine1 == true && results.onLine2 == true){
                    lineIntersetions.push([results.x,results.y,i+1]);
               }
               i+=1;
            }

            if(pType == "return")
                return lineIntersetions;
            else
                Presentation.getExtraCalculationsHandler().checkIntersectionArray(lineIntersetions);
        }

        //Taken from http://jsfiddle.net/justin_c_rounds/Gd2S2/light/
        function checkLineIntersection(pLine1StartX, pLine1StartY, pLine1EndX, pLine1EndY, pLine2StartX, pLine2StartY, pLine2EndX, pLine2EndY) {
            
            //alert(pLine2StartX + " " + pLine2StartY + " " + pLine2EndX + " " + pLine2EndY);
            var denominator, a, b, numerator1, numerator2, result = {
                x: null,        //  Position X of the intersection
                y: null,        //  Position Y of the intersection
                onLine1: false, 
                onLine2: false
            };
            
            denominator = ((pLine2EndY - pLine2StartY) * (pLine1EndX - pLine1StartX)) - ((pLine2EndX - pLine2StartX) * (pLine1EndY - pLine1StartY));
            if (denominator == 0) {
                return result;
            }
            a = pLine1StartY - pLine2StartY;
            b = pLine1StartX - pLine2StartX;
            numerator1 = ((pLine2EndX - pLine2StartX) * a) - ((pLine2EndY - pLine2StartY) * b);
            numerator2 = ((pLine1EndX - pLine1StartX) * a) - ((pLine1EndY - pLine1StartY) * b);
            a = numerator1 / denominator;
            b = numerator2 / denominator;

            // if we cast these lines infinitely in both directions, they intersect here:
            result.x = pLine1StartX + (a * (pLine1EndX - pLine1StartX));
            result.y = pLine1StartY + (a * (pLine1EndY - pLine1StartY));
        
            // if line1 is a segment and line2 is infinite, they intersect if:
            if (a > 0 && a < 1) {
                result.onLine1 = true;
            }
            // if line2 is a segment and line1 is infinite, they intersect if:
            if (b > 0 && b < 1) {
                result.onLine2 = true;
            }            
            //If both are true, they intersect each other
            return result;
        }        

        function checkIntersectionQuadratic(pLineObject){
            var straight = Presentation.getDesignSpace().getStraight();
            var pointIntersect = new Array();
            var ptsa1 = [straight.start.attrs.x,straight.start.attrs.y,
            straight.control1.attrs.x-(-straight.start.attrs.x+straight.control1.attrs.x)/2, straight.start.attrs.y+
             (straight.control1.attrs.y)/5,
             straight.control1.attrs.x,
            straight.control1.attrs.y];

            var pts1 = getCurvePoints(ptsa1, 1,false, 16,"return");
            
            for (var i = 0; i+2 < pts1.length; i+=2) {
                pts1[i]
                var results  = checkLineIntersection(pLineObject[0],pLineObject[1],pLineObject[2],pLineObject[3],
                 pts1[i],pts1[i+1],pts1[i+2],pts1[i+3]);
                if(results.onLine1 == true && results.onLine2 == true){
                    pointIntersect.push([results.x,results.y,2]);
                    alert("yes collide");
               }
            };

            var ptsa =[straight.start.attrs.x,straight.start.attrs.y,
             straight.start.attrs.x-(straight.start.attrs.x)/5, straight.start.attrs.y+
             (straight.end.attrs.y-straight.start.attrs.y)/2,
                straight.end.attrs.x,
                straight.end.attrs.y];
            var pts = getCurvePoints(ptsa, 1,false, 16,  "return");

            for (var i = 0; i+2 < pts.length; i+=2) {
                pts[i]
                var results  = checkLineIntersection(pLineObject[0],pLineObject[1],pLineObject[2],pLineObject[3],
                 pts[i],pts[i+1],pts[i+2],pts[i+3]);
                if(results.onLine1 == true && results.onLine2 == true){
                    pointIntersect.push([results.x,results.y,4]);
                    alert("yes collide");
               }
            };                   
            return pointIntersect;
        }

        function divideSegments(){
            for(var j=0; j < pointIntersect.length - 1; j++){
                for(var i=0; i < pointIntersect.length - 1; i++){
                    if(pointIntersect[i][0][0] > pointIntersect[i + 1][0][0]){
                        var tmpObject = pointIntersect[i];
                        pointIntersect[i] = pointIntersect[i + 1];
                        pointIntersect[i + 1] = tmpObject;
                    }
                }
            }

            for (var i = 0; i < pointIntersect.length; i++) {
                Presentation.getExtraCalculationsHandler().paintPolygon(pointIntersect[i][0],pointIntersect[i][1]);
            };

            pointIntersect = [];
        }

        //Let's make it public
        return {
            checkIntersection : checkIntersection,
            checkLineIntersection : checkLineIntersection,
            checkIntersectionQuadratic : checkIntersectionQuadratic,
            divideSegments : divideSegments
        };  
    })();

}(BusinessLogic, jQuery));
