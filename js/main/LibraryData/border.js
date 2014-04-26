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

    pContext.createBorder = function(pPointsFigure, pFillColor){
        return new Border(pPointsFigure, pFillColor);
    };

    var Border = Figure.extend({
        init: function(pPointsFigure, pFillColor){
            this._super(pPointsFigure, 1, pFillColor);
        },

        convertToJson : function(){
              var points = this.getPointsFigure();
              var lineJson = {
                  pointsBorder : points,
                  fillColor : this.strokeColor
              };
              return lineJson; 
            },

        paint: function(){
            var polygons = this.getPointsFigure();
            var color = this.getStrokeColor();
            Presentation.getDesignSpaceHandler().paintSector(polygons, color); 
        }
    });

}(LibraryData, jQuery));

     
