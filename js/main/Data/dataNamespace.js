/*!
 * All Rights Reserved
 * This software is proprietary information of
 * TEAMPRO
 * Use is subject to license terms.
 * Filename: dataNamespace.js
 */

 /*
  * Author:      juancar199400@gmail.com
  * Date:        25/03/2014
  * Description: 
  */


/**
 * Namespace declaration. Use the client's name and project. 
 */  




var DataNamespace = window.DataNamespace || {};

/*
 * Global logic
 * @namespace
 */
(function (pContext, $) {
    'use strict';

    //Namespace var
    var var1 = 'a';
    Parse.initialize("DKofKQXu2AtXwkr5qSlWBJMxKBxnFzDhX8I0VEZH", "ojzZihBULwli0g5ZaKK3IB0lfS2Rw0WoTyYEaVW4");
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

}(DataNamespace, jQuery));

