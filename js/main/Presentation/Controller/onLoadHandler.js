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
        
        function saveDesignToData(pName,pPoints,pArrayCircles,pArrayLines,pSole){
            //Send data to its respective namespace reference
            return BusinessLogic.getParseBusinessLogic().saveDesignParseData(pName,pPoints,pArrayCircles,pArrayLines,pSole);
        }

        function drawGraphicalLabel(pText, pPosition, pId, pColor, pType){
            if(pType == "Sole"){
                var straight = Presentation.getDesignSpace().getStraight();
                var points = [straight.control3.attrs.x, straight.control3.attrs.y, straight.end.attrs.x, straight.end.attrs.y];
                var border = LibraryData.createSole(points, 2, pColor);
                BusinessLogic.getPaintManagerBL().insertSole(border);
            }
            if(pId == -1){
                Presentation.getLabelUI().init(pText, pPosition);
            }        
            else{
                Presentation.getLabelUI().changeName(pText, "", pId);            
            }
        }

        function nameDesignUsed(){
            Presentation.getOnLoad().nameDesignUsed();
        }

        function storedDesign(){
            Presentation.getOnLoad().storedDesign();
        }

        function sendExecutionTime(pTime){
            Presentation.getOnLoad().updateExecutionTime(pTime);
        }

        return {
            drawGraphicalLabel:drawGraphicalLabel,
            saveDesignToData:saveDesignToData,
            nameDesignUsed : nameDesignUsed,
            storedDesign : storedDesign,
            sendExecutionTime : sendExecutionTime
        }; 
    })();    

}(Presentation, jQuery));
