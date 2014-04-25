/*!
 * All Rights Reserved
 * This software is proprietary information of
 * Brandon Campos Calderón - Juan Carlos Martínez
 * Use is subject to license terms.
 * Filename: kibraryDataNamespace.js
 */

 /*
  * Author:      juancar199400@gmail.com
  * Date:        26/03/2014
  * Description: Library of Data
  */


/**
 * Namespace declaration.
 */  

/*
 * 
 * @namespace
 */
(function (pContext, $) {
    'use strict';
        pContext.createStraightLine = function(pPointsFigure, pStrokeWidth, pStrokeColor){
          return new StraightLine(pPointsFigure, pStrokeWidth, pStrokeColor);
        };

        var StraightLine = Figure.extend({
            init: function(pPointsFigure, pStrokeWidth, pStrokeColor){
                this._super(pPointsFigure, pStrokeWidth, pStrokeColor);
            },

            convertToJson : function(){
              var points = new Array();
              points.push(this.pointsFigure.getPositionX().convertToArray());
              points.push(this.pointsFigure.getPositionY().convertToArray());
              var lineJson = {
                  points : points,
                  strokeWidth : this.strokeWidth,
                  strokeColor : this.strokeColor
              };
              return lineJson; 
            },

            paint : function(){
              var strokeWidth = this.getStrokeWidth();
              var strokeColor = this.getStrokeColor();
              var points = [this.getPointsFigure().getPositionX().getPositionX(), 
                            this.getPointsFigure().getPositionX().getPositionY(),
                            this.getPointsFigure().getPositionY().getPositionX(),
                            this.getPointsFigure().getPositionY().getPositionY()];
              //Let's see the current State
              switch(currentState){
                case State.FIRE:
                    Presentation.getDesignSpaceHandler().sendLineToFire(points[0], points[1], points[2], points[3], strokeWidth, strokeColor); 
                break;

                case State.ARCADE:
                    Presentation.getDesignSpaceHandler().sendLineToArcade(points[0], points[1], points[2], points[3], strokeWidth, strokeColor); 
                break;
              }
            }     
        });

}(LibraryData, jQuery));

