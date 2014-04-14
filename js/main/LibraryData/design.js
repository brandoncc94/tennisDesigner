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

var LibraryData = window.LibraryData || {};

/*
 * 
 * @namespace
 */
(function (pContext, $) {
    'use strict';

    var Design = Class.extend({
        init: function(pName){
        this.Name = pName;
        },
        setName: function(pName){
        this.Name = pName;
        },
        getName: function(){
        return this.Name;
        }
    })();

    return {
        
    };

    var design = new Design("hola");
    

}(LibraryData, jQuery));

