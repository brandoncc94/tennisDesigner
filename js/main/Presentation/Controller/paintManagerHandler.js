/*!
 * All Rights Reserved
 * This software is proprietary information of
 * Brandon Campos Calderón - Juan Carlos Martínez
 * Use is subject to license terms.
 * Filename: paintManagerController.js
 */

 /*
  * Author:      brandonc94@gmail.com
  * Date:        11/04/2014
  * Description: Paint manager controller to connect the view with data
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
    pContext.getPaintManagerHandler = function() {
        return paintManagerHandler;
    };

    /**
     * Module.
     *      Controller module.
     *
     * @private
     * @namespace
     **/

    var paintManagerHandler = (function(){
        
        function sendLineToPaintManager(pLineObject){
            BusinessLogic.getPaintManagerBL().insertLine(pLineObject);
        }

        function sendCircleToPaintManager(pCircleObject){
            BusinessLogic.getPaintManagerBL().insertCircle(pCircleObject);
        }

        function sendBorderToPaintManager(pBorderObject){
            BusinessLogic.getPaintManagerBL().insertBorder(pBorderObject);   
        }

        function deleteLine(pId){
            BusinessLogic.getPaintManagerBL().deleteLineObject(pId);
        }

        function deleteCircle(pId){
            BusinessLogic.getPaintManagerBL().deleteCircleObject(pId);
        }

        function deleteAllElements(){
            BusinessLogic.getPaintManagerBL().deleteAllElements();  
        }

        function deleteAllSectors(){
            BusinessLogic.getPaintManagerBL().deleteAllSectors();     
        }

        function restoreAllSectors(){
            BusinessLogic.getPaintManagerBL().restoreAllSectors();
        }

        function getCirclesFromPaintManager(){
            return BusinessLogic.getPaintManagerBL().getArrayCircleJson();
        }

        function getLinesFromPaintManager(){
            return BusinessLogic.getPaintManagerBL().getArrayLineJson();
        }

        function getBordersFromPaintManager(){
            return BusinessLogic.getPaintManagerBL().getArrayBordersJson();
        }

        function getSoleFromPaintManager(){
          return BusinessLogic.getPaintManagerBL().getSoleJson();
        }

        function getBackgroundColorFromPaintManager(){
            return BusinessLogic.getPaintManagerBL().getBackgroundColorJson();
        }

        function loadDesignCircles(pArrayCircles){
            BusinessLogic.getPaintManagerBL().loadDesignCircles(pArrayCircles);
        }

        function loadDesignLines(pArrayLines){
            BusinessLogic.getPaintManagerBL().loadDesignLines(pArrayLines);
        }

        function loadDesignBorders(pArrayBorders){
            BusinessLogic.getPaintManagerBL().loadDesignBorders(pArrayBorders);   
        }

        function loadDesignSole(pSole){
          BusinessLogic.getPaintManagerBL().loadDesignSole(pSole);
        }

        function loadDesignBackgroundColor(pBackgroundColor){
            BusinessLogic.getPaintManagerBL().loadDesignBackgroundColor(pBackgroundColor);
        }

        function sendToDrawingManager(){
            BusinessLogic.getPaintManagerBL().sendToDrawingManager();   
        }

        function convertTableToExcel(pTable, pName, pFileName){
            BusinessLogic.getPaintManagerBL().convertDataToExcel(pTable, pName, pFileName);
        }

        function sendExecutionTimes(pExecutionTimes, pName){
            BusinessLogic.getPaintManagerBL().setExecutionTimes(pExecutionTimes, pName);
        }

        function checkIfCollide(pCircleId){
            BusinessLogic.getPaintManagerBL().checkIfCollide(pCircleId);   
        }

        function exchangeCircleIds(pId, pId2){
            Presentation.getDesignSpace().exchangeCircleIds(pId, pId2);            
        }

        function checkIfLinesCollide(pLineId){
            BusinessLogic.getPaintManagerBL().checkIfLinesCollide(pLineId);
        }

        function exchangeLinesIds(pId, pId2){
            Presentation.getDesignSpace().exchangeLinesIds(pId, pId2);  
        }
        
        function getSpecificBorder(pId){
            BusinessLogic.getPaintManagerBL().getSpecificBorder(pId);
        }

        return {
            sendLineToPaintManager : sendLineToPaintManager,
            sendCircleToPaintManager : sendCircleToPaintManager,
            sendBorderToPaintManager : sendBorderToPaintManager,
            sendExecutionTimes : sendExecutionTimes,
            deleteLine : deleteLine,
            deleteCircle : deleteCircle,
            deleteAllElements: deleteAllElements,
            deleteAllSectors : deleteAllSectors,
            restoreAllSectors : restoreAllSectors,
            getCirclesFromPaintManager : getCirclesFromPaintManager,
            getLinesFromPaintManager : getLinesFromPaintManager,
            getSoleFromPaintManager : getSoleFromPaintManager,
            getBordersFromPaintManager : getBordersFromPaintManager,
            getBackgroundColorFromPaintManager : getBackgroundColorFromPaintManager,
            loadDesignCircles : loadDesignCircles,
            loadDesignLines : loadDesignLines,
            loadDesignSole : loadDesignSole,
            loadDesignBorders : loadDesignBorders,
            loadDesignBackgroundColor : loadDesignBackgroundColor,
            sendToDrawingManager : sendToDrawingManager,
            convertTableToExcel : convertTableToExcel,
            checkIfCollide : checkIfCollide,
            exchangeCircleIds : exchangeCircleIds,
            checkIfLinesCollide : checkIfLinesCollide,
            exchangeLinesIds : exchangeLinesIds,
            getSpecificBorder : getSpecificBorder
        }; 
    })();    

}(Presentation, jQuery));