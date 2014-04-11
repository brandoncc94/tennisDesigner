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
    pContext.getOnLoadHandler = function() {
        return OnLoadHandler;
    };

    /**
     * Module.
     *      Controller module.
     *
     * @private
     * @namespace
     **/
    var OnLoadHandler = (function(){
        function sendNameToData(pName){
        	//Send data to its respective namespace reference
            BusinessLogic.getParseBusinessLogic().uploadParseDataReference(pName);
        }       

        function drawGraphicalLabel(pType, pColor){
            //Singleton instance
            Presentation.getDesignSpace().getLabelUI().init(pType, pColor);
            
        }

        return {
            sendNameToData:sendNameToData,
            drawGraphicalLabel:drawGraphicalLabel
        }; 
    })();    

}(Presentation, jQuery));
