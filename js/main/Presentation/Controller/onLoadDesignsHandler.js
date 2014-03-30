/*!
 * All Rights Reserved
 * This software is proprietary information of
 * Brandon Campos Calderón - Juan Carlos Martínez
 * Use is subject to license terms.
 * Filename: presentationNamespace.js
 */

 /*
  * Author:      brandonc94@gmail.com
  * Date:        28/03/2014
  * Description: Main controller to connect the view with data
  */

/*
 * Global Presentation Layer to be used with MVC Pattern
 * @namespace
 */
(function (pContext, $) {
	'use strict'
    /**
     * Public method to return a reference of handler module.
     * 
     * @return {handlerModule} Handler declarations of the MVC.
     * @public
     */
    pContext.getOnLoadDesignsHandler = function() {
        return onLoadDesignsHandler;
    };

    /**
     * Module.
     *      Controller module.
     *
     * @private
     * @namespace
     **/


    var onLoadDesignsHandler = (function(){
        function downloadDesigns(){
        	//Send data to its respective namespace reference
            DataAccess.getParseDataAcces().downloadDesignsName();
        }       

        function loadDesigns(designList){
            
            Presentation.getOnLoad().loadDesignDataList(designList);
            
        }

        return {
            downloadDesigns:downloadDesigns,
            loadDesigns:loadDesigns
        }; 
    })();    

}(Presentation, jQuery));