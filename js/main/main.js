/*!
 * All Rights Reserved
 * This software is proprietary information of
 * Intelligent Sense
 * Use is subject to license terms.
 * Filename: main.js
 */

 /*
  * Author:      kchaves@intelligentsense.com
  * Date:        28/10/2013
  * Description: Template to create javascript namespaces and modules
  */


/**
 * Namespace declaration. Use the client's name and project. 
 */  




var IntSenseNamespace = window.IntSenseNamespace || {};

/*
 * Global logic
 * @namespace
 */
(function (pContext, $) {
    'use strict';

    //Namespace var
    var var1 = 'a';
    var var2 = 'b';

    /**
     * Public method to be used outside of the module.
     * 
     * @return {type} description.
     * @public
     */
    pContext.publicMethod = function () {
        return var1;

    };

    pContext.getModule = function() {
        return module;
    };


    pContext.getModule2 = function() {
        return module2;
    };
    /**
     * Private method
     * private 
     */
    function privateMethod() {
        return "Bye Intelligent Sense.";    
    }

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

        var module = (function(){
        // private property
        var number = 10;

        // public api
        return {
            // OK
            getNumber: function(){
                 return number;   
            },
            // OK
            incrNumber: function(){
                 number++;  
            }
        };
    })();


        var module2 = (function(){
        // private property
        var number = 20;

        // public api
        return {
            // OK
            getNumber: function(){
                 return number;   
            },
            // OK
            incrNumber: function(){
                 number++;  
            }
        };
    })();

    function init() {

        //Called the methods required to initialize all the modules.
        
        privateMethod();
    }

    //Init.
    $(init);

}(IntSenseNamespace, jQuery));

