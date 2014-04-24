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
        function checkIntersection(pLineObject){
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
            return lineIntersetions;
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

        //Taken from http://stackoverflow.com/questions/7054272/how-to-draw-smooth-curve-through-n-points-using-javascript-html5-canvas
        function getCurvePoints(pts, tension, isClosed, numOfSegments, pType) {
            // use input value if provided, or use a default value   
            tension = (typeof tension != 'undefined') ? tension : 0.5;
            isClosed = isClosed ? isClosed : false;
            numOfSegments = numOfSegments ? numOfSegments : 16;

            var _pts = [], res = [],    // clone array
                x, y,           // our x,y coords
                t1x, t2x, t1y, t2y, // tension vectors
                c1, c2, c3, c4,     // cardinal points
                st, t, i;       // steps based on num. of segments

            // clone array so we don't change the original
            _pts = pts.slice(0);

            // The algorithm require a previous and next point to the actual point array.
            // Check if we will draw closed or open curve.
            // If closed, copy end points to beginning and first points to end
            // If open, duplicate first points to befinning, end points to end
            if (isClosed) {
                _pts.unshift(pts[pts.length - 1]);
                _pts.unshift(pts[pts.length - 2]);
                _pts.unshift(pts[pts.length - 1]);
                _pts.unshift(pts[pts.length - 2]);
                _pts.push(pts[0]);
                _pts.push(pts[1]);
            }
            else {
                _pts.unshift(pts[1]);   //copy 1. point and insert at beginning
                _pts.unshift(pts[0]);
                _pts.push(pts[pts.length - 2]); //copy last point and append
                _pts.push(pts[pts.length - 1]);
            }

            // ok, lets start..


            // 1. loop goes through point array
            // 2. loop goes through each segment between the 2 pts + 1e point before and after
            for (i=2; i < (_pts.length - 4); i+=2) {
                for (t=0; t <= numOfSegments; t++) {

                    // calc tension vectors
                    t1x = (_pts[i+2] - _pts[i-2]) * tension;
                    t2x = (_pts[i+4] - _pts[i]) * tension;

                    t1y = (_pts[i+3] - _pts[i-1]) * tension;
                    t2y = (_pts[i+5] - _pts[i+1]) * tension;

                    // calc step
                    st = t / numOfSegments;

                    // calc cardinals
                    c1 =   2 * Math.pow(st, 3)  - 3 * Math.pow(st, 2) + 1; 
                    c2 = -(2 * Math.pow(st, 3)) + 3 * Math.pow(st, 2); 
                    c3 =       Math.pow(st, 3)  - 2 * Math.pow(st, 2) + st; 
                    c4 =       Math.pow(st, 3)  -     Math.pow(st, 2);

                    // calc x and y cords with common control vectors
                    x = c1 * _pts[i]    + c2 * _pts[i+2] + c3 * t1x + c4 * t2x;
                    y = c1 * _pts[i+1]  + c2 * _pts[i+3] + c3 * t1y + c4 * t2y;

                    //store points in array
                    res.push(x);
                    res.push(y);
                }
            }
            if(pType == "return")
                return res;
            else
                Presentation.getExtraCalculationsHandler().sendDrawCurves(res);
        }

        //Let's make it public
        return {
            checkIntersection : checkIntersection,
            checkLineIntersection : checkLineIntersection,
            checkIntersectionQuadratic : checkIntersectionQuadratic,
            getCurvePoints : getCurvePoints
        };  
    })();

}(BusinessLogic, jQuery));
