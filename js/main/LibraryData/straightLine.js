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
            }        
        });

}(LibraryData, jQuery));

