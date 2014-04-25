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
var Figure;
/*
 * 
 * @namespace
 */
(function (pContext, $) {
    'use strict';
    
    Figure = Class.extend({

        init: function(pPointsFigure, pStrokeWidth, pStrokeColor){
            this.pointsFigure = pPointsFigure;
            this.strokeWidth = pStrokeWidth;
            this.strokeColor = pStrokeColor;
        },

        setStrokeColor: function(pStrokeColor){
            this.strokeColor = pStrokeColor;
        },

        setStrokeWidth: function(pStrokeWidth){
            this.strokeWidth = pStrokeWidth;
        },
        
        setPointsFigure : function(pPointsFigure){
            this.pointsFigure = pPointsFigure;
        },
        
        getStrokeColor: function(){
            return this.strokeColor;
        },
        
        getStrokeWidth: function(){
            return this.strokeWidth;
        },
        
        getPointsFigure : function(){
            return this.pointsFigure;
        },

        convertToJson : function(){
            return ; 
        },

        paint : function(pFigure){
            console.log("Painting figure.");
        }
    });

}(LibraryData, jQuery));

