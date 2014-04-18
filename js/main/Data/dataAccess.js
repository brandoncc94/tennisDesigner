/*!
 * All Rights Reserved
 * This software is proprietary information of
 * TEAMPRO
 * Use is subject to license terms.
 * Filename: DataAccess.js
 */

 /*
  * Author:      juancar199400@gmail.com
  * Date:        25/03/2014
  * Description: 
  */


/**
 * Namespace declaration. Use the client's name and project. 
 */  

var DataAccess = window.DataAccess || {};

/*
 * Global logic
 * @namespace
 */
(function (pContext, $) {
    'use strict';

    //Namespace var
    Parse.initialize("8MeOaSAgl4qqGTAzYjUFJr2JYYng6TSEFFquHgDX", "MoAGjc9crYjb6QyyEcPMPDQtnv4e5KBbE4PIzLUA");
    
    /**
     * Public method to be used outside of the module.
     * 
     * @return {type} description.
     * @public
     */


    pContext.getTennisDataAcces = function() {
        return TennisDataAcces;
    };


    pContext.getParseDataAcces = function() {
        return ParseDataAcces;
    };

    /**
     * Module TennisDataAcces.
     *      Module description 
     *
     * @private
     * @namespace
     **/

    var TennisDataAcces = (function(){
        // private property
        

        return {
            
        };
    })();


    var ParseDataAcces = (function(){
        var TennisDesign = Parse.Object.extend("TennisDesign");
        Parse.$ = jQuery;


        function uploadParseData(pName,pPoints,pArrayCircles,pArrayLines,pSole){
            var tempDesign = new TennisDesign();
            tempDesign.save({
                Name : pName,
                Points : pPoints,
                Circles : pArrayCircles,
                Lines : pArrayLines,
                Sole : pSole
            });  
        }


        function downloadDesign(pName){
            var query_Name = new Parse.Query(TennisDesign);
            query_Name.equalTo("Name", pName);
            query_Name.find({
              success: function(designs) {
                if(designs.length==1){
                    var points = designs[0].get("Points");
                    var name = designs[0].get("Name");
                    var arrayCircles = designs[0].get("Circles");
                    var arrayLines = designs[0].get("Lines");
                    var sole = designs[0].get("Sole");
                    BusinessLogic.getParseBusinessLogic().loadDesign(name,points,arrayCircles,arrayLines,sole); 
                }
                
              },
              error: function(error) {
                // The request failed
              }
            });
        }

        function updateDesign(pName,pPoints,pArrayCircles,pArrayLines,pSole){
            var query_Name = new Parse.Query(TennisDesign);
            query_Name.equalTo("Name", pName);
            query_Name.find({
              success: function(designs) {
                if(designs.length==1){
                    var design = designs[0];
                    updateDesignAux(design,pPoints,pArrayCircles,pArrayLines,pSole); 
                }
                
              },
              error: function(error) {
                // The request failed
              }
            });
        }

        function updateDesignAux(design,pPoints,pArrayCircles,pArrayLines,pSole){
            design.save({
                Points : pPoints,
                Circles : pArrayCircles,
                Lines : pArrayLines,
                Sole : pSole
            });
        }

        function saveDesign(pName,pPoints,pArrayCircles,pArrayLines,pSole){
            var query_Name = new Parse.Query(TennisDesign);
            query_Name.equalTo("Name", pName);
            query_Name.count({
              success: function(count) {
                if (count>0) {
                     BusinessLogic.getParseBusinessLogic().nameDesignUsed();
                }
                else{
                    uploadParseData(pName,pPoints,pArrayCircles,pArrayLines,pSole);
                    BusinessLogic.getParseBusinessLogic().storedDesign();
                }
                
                
              },
              error: function(error) {
                // The request failed
              }
            });
        }


        function downloadDesignsName(){
            var tennis_query = new Parse.Query(TennisDesign);
            var designList = [];
            tennis_query.descending("createdAt");
            tennis_query.find({
                success: function(results) {
                    for (var i = 0 ;i<results.length;i++){
                        var object = results[i];
                        designList.push(object.get('Name'));
                    }
                    BusinessLogic.getParseBusinessLogic().loadDesignsReference(designList);
                },
                error: function(error) {
                    alert("Error: " + error.code + " " + error.message);
                }
            });
            
        }

        function downloadParseData(pKey,value){
            var tennis_query = new Parse.Query(TennisDesign);
            tennis_query.equalTo(pkey,value);
            tennis_query.find({
                success: function(results) {
                    for (var i = 0 ;results.length;i++){
                        var object = results[i];
                        alert("Name:" + object.get('Name'));
                    }
                },
                error: function(error) {
                    alert("Error: " + error.code + " " + error.message);
                }
            });
        }

        return {
            uploadParseData: uploadParseData,
            downloadDesignsName: downloadDesignsName,
            downloadParseData: downloadParseData,
            saveDesign : saveDesign,
            updateDesign : updateDesign,
            downloadDesign : downloadDesign
        };
        })();

}(DataAccess, jQuery));

