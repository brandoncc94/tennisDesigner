/*!
 * All Rights Reserved
 * This software is proprietary information of
 * Brandon Campos Calderón - Juan Carlos Martínez
 * Use is subject to license terms.
 * Filename: businessLogic.js
 */

 /*
  * Author:      brandonc94@gmail.com
  * Date:        25/03/2014
  * Description: Presentation layer to be develop with MVC
  */


/**
 * Namespace declaration.
 */  
var BusinessLogic = window.BusinessLogic || {};

/*
 * Global BusinessLogic Layer 
 * @namespace
 */
(function (pContext, $) {
    'use strict';
    /**
     * Public method to return a reference of parseBusinessLogic.
     * 
     * @return {parseBusinessLogic} Bussiness logic.
         * @public
     */
    pContext.getParseBusinessLogic = function() {
        return parseBusinessLogic;
    };  

    /**
     * Module.
     *      Module for logic layers and sections.
     *
     * @private
     * @namespace
     **/

    //This is a logic that only connects with Parse and get the data.
    var parseBusinessLogic = (function(){

        //Bridge functions, intermediation between layers
        //Download the names, send reference to dataAcess.js
        function downloadDesignsNameReference(){
            DataAccess.getParseDataAcces().downloadDesignsName();
        }

        //Upload an input name, send reference to dataAcess.js
        function uploadParseDataReference(pName){
            DataAccess.getParseDataAcces().uploadParseData(pName);
        }

        //Load the drop down list, send reference to controller onLoadHandler.js
        function loadDesignsReference(pDesignList){
            Presentation.getOnLoadDesignsHandler().loadDesigns(pDesignList);
        }

        //Let's make it public
        return {
            downloadDesignsNameReference: downloadDesignsNameReference,
            uploadParseDataReference    : uploadParseDataReference,
            loadDesignsReference : loadDesignsReference
        };  
    })();

}(BusinessLogic, jQuery));
