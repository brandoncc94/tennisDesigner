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

    pContext.createPoint = function(pPosX, pPosY) {
        return new Point(pPosX, pPosY);
    };

    var Point = Class.extend({         
        init: function(pPositionX, pPositionY){
            this.positionY = pPositionY;
            this.positionX = pPositionX;     
        },

        setPositionY: function(pPositionY){
            this.positionY = pPositionY; 
        },

        setPositionX: function(pPositionX){
            this.positionX = pPositionX; 
        },

        getPositionY: function(){
            return this.positionY;
        },

        getPositionX: function(){
            return this.positionX;
        }

    });
    
}(LibraryData, jQuery));

