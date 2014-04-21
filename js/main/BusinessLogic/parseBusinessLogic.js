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
  * Description: Business layer
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
        
        function nameDesignUsed(){
            Presentation.getOnLoadHandler().nameDesignUsed();
        }

        function storedDesign(){
            Presentation.getOnLoadHandler().storedDesign();
        }

        function loadDesign(pName,pPoints,pArrayCircles,pArrayLines,pSole){
            Presentation.getOnLoadDesignsHandler().loadDesign(pName,pPoints,pArrayCircles,pArrayLines,pSole);
        }

        function downloadDesign(pName){
            DataAccess.getParseDataAcces().downloadDesign(pName);
        }
        
        function saveDesignParseData(pName,pPoints,pArrayCircles,pArrayLines,pSole){
            DataAccess.getParseDataAcces().saveDesign(pName,pPoints,pArrayCircles,pArrayLines,pSole);
        }

        function downloadDesignsNameReference(){
            DataAccess.getParseDataAcces().downloadDesignsName();
        }

        function updateDesign(pName,pPoints,pArrayCircles,pArrayLines,pSole){
            DataAccess.getParseDataAcces().updateDesign(pName,pPoints,pArrayCircles,pArrayLines,pSole);
        }

        //Load the drop down list, send reference to controller onLoadHandler.js
        function loadDesignsReference(pDesignList){
            Presentation.getOnLoadDesignsHandler().loadDesignsList(pDesignList);
        }
    
        function addExecutionTimeDesign(pName,pTypeAlgorithm,pTime){
            DataAccess.getParseDataAcces().addExecutionTimeDesign(pName,pTypeAlgorithm,pTime);
        }

        function getExecutionTimes(pName){
          DataAccess.getParseDataAcces().getExecutionTimes(pName);
        }

        //Let's make it public
        return {
            addExecutionTimeDesign : addExecutionTimeDesign,
            downloadDesignsNameReference: downloadDesignsNameReference,
            downloadDesign : downloadDesign,
            loadDesignsReference : loadDesignsReference,
            saveDesignParseData : saveDesignParseData,
            updateDesign : updateDesign,
            nameDesignUsed : nameDesignUsed,
            getExecutionTimes : getExecutionTimes,
            storedDesign : storedDesign,
            loadDesign : loadDesign
        };  
    })();

}(BusinessLogic, jQuery));
