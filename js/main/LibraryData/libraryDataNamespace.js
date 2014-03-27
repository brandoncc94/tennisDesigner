/*!
 * All Rights Reserved
 * This software is proprietary information of
 * Brandon Campos Calderón - Juan Carlos Martínez
 * Use is subject to license terms.
 * Filename: kibraryDataNamespace.js
 */

 /*
  * Author:      juancar199400@gmail.com
  * Date:        26/03/2014
  * Description: Library of Data
  */


/**
 * Namespace declaration.
 */  

var LibraryDataNamespace = window.LibraryDataNamespace || {};

/*
 * 
 * @namespace
 */
(function (pContext, $) {
    'use strict';
    

    
    var LibraryModule = (function(){
        var design = (function(){
            function init(){
                
            }

            return {
                init : init
            };  
        })();

        var Point = (function(pPositionX, pPositionY){
            this.positionY = pPositionY;

            this.positionX = pPositionX;     
            function init(){
                
            }

            return {
                // init Components
                init: init
            };            
        })();

        var Figure = (function(pPointsFigure){
            //Array
            this.pointsFigure = pPointsFigure;

            function init(){
                
            }

            return {
                // init Components
                init: init
            };            
        })();

        var StraightLine = (function(pPointsFigure){
            Figure.call(this,pPointsFigure);

            function init(){
                
            }

            return {
                // init Components
                init: init
            };            
        })();
        LibraryDataNamespace.LibraryModule.StraightLine.prototype = new LibraryDataNamespace.LibraryModule.Figure;


        var CurveLine = (function(pPointsFigure){
            Figure.call(this,pPointsFigure);

            function init(){
                
            }

            return {
                // init Components
                init: init
            };            
        })();
        LibraryDataNamespace.LibraryModule.CurveLine.prototype = new LibraryDataNamespace.LibraryModule.Figure;

        var Sole = (function(pPointsFigure){
            Figure.call(this,pPointsFigure);

            function init(){
                
            }

            return {
                // init Components
                init: init
            };            
        })();
        LibraryDataNamespace.LibraryModule.Sole.prototype = new LibraryDataNamespace.LibraryModule.Figure;

        var Circle = (function(pPointsFigure , pRadio){
            
            Figure.call(this,pPointsFigure);
            
            this.radio = pRadio;
            
            this.getRadio = function(){
                return (this.radio);
            }
            
            this.setRadio = function(pRadio){
                this.radio = pRadio;
            }

            function init(){
                
            }

            return {
                // init Components
                init: init
            };            
        })();
        LibraryDataNamespace.LibraryModule.Circle.prototype = new LibraryDataNamespace.LibraryModule.Figure;

        var Border = (function(pPointsFigure , pTypeBorder, pThick, pColorBorder, pLabelFigure){
            Figure.call(this,pPointsFigure);
            this.typeBorder = pTypeBorder;
            this.thick = pThick;
            this.colorBorder = pColorBorder;
            this.labelFigure = pLabelFigure;

            this.getTypeBorder = function(){
                return (this.typeBorder);
            }
            
            this.setTypeBorder = function(pTypeBorder){
                this.typeBorder = pTypeBorder;
            }

            this.getThick = function(){
                return (this.thick);
            }
            
            this.setThick = function(pThick){
                this.thick = pThick;
            }

            this.getColorBorder = function(){
                return (this.colorBorder);
            }
            
            this.setColorBorder = function(pColorBorder){
                this.radio = pColorBorder;
            }

            this.getLabelFigure = function(){
                return (this.labelFigure);
            }
            
            this.setLabelFigure = function(pLabelFigure){
                this.labelFigure = pLabelFigure;
            }

            function init(){
                
            }

            return {
                // init Components
                init: init
            };            
        })();
        LibraryDataNamespace.LibraryModule.Sole.prototype = new LibraryDataNamespace.LibraryModule.Figure;



        function init(){

        }

        return {
            init:init
        };
    })();

        

    function init(){
        
    }

    //Init.
    $(init);

}(presentationNamespace, jQuery));

