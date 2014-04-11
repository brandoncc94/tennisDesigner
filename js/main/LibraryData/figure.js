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

        init: function(pPointsFigure, pStrokeWidth, pStrokeColor, pReference){
            this.pointsFigure = pPointsFigure;
            this.strokeWidth = pStrokeWidth;
            this.strokeColor = pStrokeColor;
            this.reference = pReference;
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

        setReference : function(pReference){
            this.reference = pReference;
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

        getReference: function(){
            return this.reference;
        }
    });

}(LibraryData, jQuery));

