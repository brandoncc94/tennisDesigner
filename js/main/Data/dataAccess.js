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
    var var1 = 'a';
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
     * Module.
     *      Module description 
     *
     * @private
     * @namespace
     **/

    /**
     * Initializes the module.
     * @private
     */

    var TennisDataAcces = (function(){
        // private property
        

        // public api
    return {
        
    };
    })();


    var ParseDataAcces = (function(){
        //-------------------------------------------------
        var TennisDesign = Parse.Object.extend("TennisDesign");
        Parse.$ = jQuery;
        //-------------------------------------------------

    
        // public api
        return {
            // OK
            uploadParseData: function(pName){
                var tempDesign = new TennisDesign();
                tempDesign.save({
                    Name : pName
                });
                return;   
            },
            // OK

            downloadDesignsName: function(){
                var tennis_query = new Parse.Query(TennisDesign);
                var designList = new Array();
                tennis_query.find({
                    success: function(results) {
                        for (var i = 0 ;i<results.length;i++){
                            var object = results[i];
                            var name = object.get('Name');
                            designList[i]=name;
                            alert(designList[i]);
                        }
                        alert(designList);
                        return designList;
                    },
                    error: function(error) {
                        alert("Error: " + error.code + " " + error.message);
                    }
                });
                
            },

            downloadParseData: function(pKey,value){
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
        };
        })();

    function init() {

        //Called the methods required to initialize all the modules.
        
    }

    //Init.
    $(init);

}(DataAccess, jQuery));

