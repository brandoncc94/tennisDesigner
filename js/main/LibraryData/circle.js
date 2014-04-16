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

    pContext.createCircle = function(pPointsFigure, pRadius, pStrokeWidth, pStrokeColor, pFillColor) {
        return new Circle(pPointsFigure, pRadius, pStrokeWidth, pStrokeColor, pFillColor);       
    };
    
    var Circle = Figure.extend({

        init: function(pPointsFigure, pRadio, pStrokeWidth, pStrokeColor, pFillColor){
            this._super(pPointsFigure, pStrokeWidth, pStrokeColor);
            this.radio = pRadio;
            this.fillColor = pFillColor;
        },
        
        setRadio: function(pRadio){
            this.radio = pRadio;
        },

        setFillColor: function(pFillColor){
            this.fillColor = pFillColor;
        },

        getRadio: function(){
            return this.radio;
        },

        getFillColor: function(){
            return this.fillColor;
        },

        convertToJson : function() {
            var points = this.pointsFigure.convertToArray();
            var circleJson = {
                points : points,
                radius: this.radio,
                strokeWidth : this.strokeWidth,
                strokeColor : this.strokeColor,
                fillColor : this.fillColor
            };
            return circleJson;
        }

    }); 

}(LibraryData, jQuery));


