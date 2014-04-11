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

        function uploadParseData(pName){
            var tempDesign = new TennisDesign();
            tempDesign.save({
                Name : pName
            });  
        }

        function downloadDesignsName(){
            var tennis_query = new Parse.Query(TennisDesign);
            var designList = [];
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
            downloadParseData: downloadParseData
        };
        })();

}(DataAccess, jQuery));

