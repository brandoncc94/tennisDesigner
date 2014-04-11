/*!
 * All Rights Reserved
 * This software is proprietary information of
 * Brandon Campos Calderón - Juan Carlos Martínez
 * Use is subject to license terms.
 * Filename: presentationNamespace.js
 */

 /*
  * Author:      brandonc94@gmail.com
  * Date:        11/04/2014
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
            BusinessLogic.getParseBusinessLogic().downloadDesignsNameReference();
        }       

        function loadDesigns(pDesignList){    
            //Load designs through the respective controller    
            Presentation.getOnLoad().loadDesignDataList(pDesignList);  
        }

        //Converts from RGB to HEX taken from http://jsfiddle.net/DCaQb/  
        function convertToHex(pColor) {
            var color = '';
            var parts = pColor.match(/^rgb\((\d+),\s*(\d+),\s*(\d+)\)$/);
            delete(parts[0]);
            for (var i = 1; i <= 3; ++i) {
                parts[i] = parseInt(parts[i]).toString(16);
                if (parts[i].length == 1) parts[i] = '0' + parts[i];
            }
            color = '#' + parts.join('');
            return color;
        }

        function getXPageReference(pE){
            return pE.pageX - ($(".main-container").width() - $("#decoration-container").width() - $("#create-container").width());
        }

        function getYPageReference(pE){
            return pE.pageY - ($("body").height() - $(".header-container").height() - $(".main-container").height() - $(".footer-container").height() + 200);
        }

        return {
            downloadDesigns:downloadDesigns,
            loadDesigns:loadDesigns,
            convertToHex: convertToHex,
            getXPageReference: getXPageReference,
            getYPageReference: getYPageReference

        }; 
    })();    

}(Presentation, jQuery));