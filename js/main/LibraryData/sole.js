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


    pContext.createSole = function(pPointsFigure, pStrokeWidth, pStrokeColor){
        return new Sole(pPointsFigure, pStrokeWidth, pStrokeColor);
    };

    var Sole = Figure.extend({
        init: function(pPointsFigure, pStrokeWidth, pStrokeColor){
            this._super(pPointsFigure, pStrokeWidth, pStrokeColor);
        },

        convertToJson : function() {
            var soleJson = {
                points : this.pointsFigure,
                strokeWidth : this.strokeWidth,
                strokeColor : this.strokeColor
            };
            return soleJson;
        }      
    });

}(LibraryData, jQuery));

