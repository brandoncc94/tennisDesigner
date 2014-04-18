/*!
 * All Rights Reserved
 * This software is proprietary information of
 * Brandon Campos Calderón - Juan Carlos Martínez
 * Use is subject to license terms.
 * Filename: kibraryDataNamespace.js
 */

 /*
  * Author:      brandoncc94@gmail.com
  * Date:        17/04/2014
  * Description: Borders

/*
 * 
 * @namespace
 */
(function (pContext, $) {
    'use strict';

    pContext.createBorder = function(pPointsFigure, pStrokeWidth, pStrokeColor){
        return new Border(pPointsFigure, pStrokeWidth, pStrokeColor);
    };

    var Border = Figure.extend({
        init: function(pPointsFigure, pStrokeWidth, pStrokeColor){
            this._super(pPointsFigure, pStrokeWidth, pStrokeColor);
        }
    });

}(LibraryData, jQuery));

     
