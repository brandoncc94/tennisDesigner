/*!
 * All Rights Reserved
 * This javascript file is proprietary information of
 * Brandon Campos Calderón and Juan Carlos Martínez Ramírez
 * Use is subject to license terms.
 * Filename: prueba.js
 */

 /*
  * Author:      brandoncc94@gmail.com
  * Date:        23/03/2014
  * Description: Applying the concept of namespaces and modules of business layer
  */


/**
 * Namespace declaration for avoiding overwriting files.
 */  

var logicalBusinessNamespace = window.logicalBusinessNamespace || {};

/*
 * Global logic
 * @namespace
 */

(function (pContext, $) {
    //Improve safety and prevents global prohibited access 
    'use strict';

    /**
     * Public method to be used outside of the module.
     * 
     * @return {type} description.
     * @public
     */
    pContext.sayMyName = function (pName) {
        return "Hello " + pName;
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
    var tennisDesignerPersonModule = (function() {

        /**
        * Module's private var
        **/
        var dimensions = {
            width: 1000,
            height: 400
        };

        /**
         *  Public Method description
         * 
         * @public
         **/
        var getWidth = function(){
            return dimensions.width;
        };

        /**
         *  Public Method description
         * 
         * @public
         **/
        var getHeight = function(){
            return dimensions.height;
        };
        /**
         *  Private Method description
         * 
         * @private
         **/
        function modulePrivateMethod(pParams) {

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
                    getWidth: getWidth,
                    getHeight: getHeight
                };
    })();


    /**
     * Initializes the module.
     * @private
     */
    function init() {

        //Called the methods required to initialize all the modules.
        tennisDesignerPersonModule.init();
        
        privateMethod();
    }

    //Init.
    $(init);

}(logicalBusinessNamespace, jQuery));


