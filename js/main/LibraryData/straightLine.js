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
        pContext.createStraightLine = function(pPointsFigure, pStrokeWidth, pStrokeColor, pReference){
          return new StraightLine(pPointsFigure, pStrokeWidth, pStrokeColor, pReference);
        };

        var StraightLine = Figure.extend({
            init: function(pPointsFigure, pStrokeWidth, pStrokeColor, pReference){
                this._super(pPointsFigure, pStrokeWidth, pStrokeColor, pReference);
            }        
        });

}(LibraryData, jQuery));

