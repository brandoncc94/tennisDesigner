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
        return "Hello Intelligent Sense.";
    };

    /**
     * Private method
     * private 
     */
    function privateMethod() {
        
    }

    /**
     * Module.
     *      Module description 
     *
     * @private
     * @namespace
     **/
    var IntSenseModule = (function() {

        /**
        * Module's private var
        **/
        var vars = {
            moduleVar: false
        };

        /**
         *  Private Method description
         * 
         * @private
         **/
        function modulePrivateMethod(pParams) {

        }

        /**
         *  Public Method description
         * 
         * @public
         **/
        function modulePublicMethod() {

        }

        /**
         * Init the module.
         * @public
         */
        function init() {
            //Called the methods to initialize the module 
            modulePrivateMethod({});
        }

        //Return the public methods of the module so that they are accessible outside this context. 
        return {
                    init : init,
                    modulePublicMethod: modulePublicMethod
                };
    })();


    /**
     * Initializes the module.
     * @private
     */
    function init() {

        //Called the methods required to initialize all the modules.
        IntSenseModule.init();
        
        privateMethod();
    }

    //Init.
    $(init);

}(IntSenseNamespace, jQuery));
