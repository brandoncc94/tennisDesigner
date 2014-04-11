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

var LibraryData = window.LibraryData || {};

var designSpace;
/*
 * 
 * @namespace
 */
(function (pContext, $) {
    'use strict';
    
    pContext.getLibraryModule = function(){
        return LibraryModule;
    };

    var LibraryModule = (function(){
        function createCircle(pPointsFigure, pRadius, pStrokeWidth, pStrokeColor, pFillColor){
            return new Circle(pPointsFigure, pRadius, pStrokeWidth, pStrokeColor, pFillColor);
        }

        function createPoint(pPosX, pPosY){
            return new Point(pPosX, pPosY);
        }

        var Design = Class.extend({
          init: function(pName){
            this.Name = pName;
          },
          setName: function(pName){
            this.Name = pName;
          },
          getName: function(){
            return this.Name;
          }
        });

        var Point = Class.extend({         
            init: function(pPositionX, pPositionY){
                this.positionY = pPositionY;
                this.positionX = pPositionX;     
            },

            setPositionY: function(pPositionY){
                this.positionY = pPositionY; 
            },

            setPositionX: function(pPositionX){
                this.positionX = pPositionX; 
            },

            getPositionY: function(){
                return this.positionY;
            },

            getPositionX: function(){
                return this.positionX;
            }

        });

        var Figure = Class.extend({

            init: function(pPointsFigure, pStrokeWidth, pStrokeColor, pReference){
                this.pointsFigure = pPointsFigure;
                this.strokeWidth = pStrokeWidth;
                this.strokeColor = pStrokeColor;
            },

            setStrokeColor: function(pStrokeColor){
                this.strokeColor = pStrokeColor;
            },

            setStrokeWidth: function(pStrokeWidth){
                this.strokeWidth = pStrokeWidth;
            },
            
            setPointsFigure : function(pPointsFigure){
                this.pointsFigure = pPointsFigure;
            },
            
            getStrokeColor: function(){
                return this.strokeColor;
            },
            
            getStrokeWidth: function(){
                return this.strokeWidth;
            },
            
            getPointsFigure : function(){
                return this.pointsFigure;
            }
        });

        var StraightLine = Figure.extend({
            init: function(pPointsFigure,pColor,pLabel,pThink){
                this._super(pPointsFigure,pColor,pLabel,pThink);
            }        
        });

        var CurveLine = Figure.extend({
            init: function(pPointsFigure,pColor,pLabel,pThink){
                this._super(pPointsFigure,pColor,pLabel,pThink);
            }        
        });

        var Sole = Figure.extend({
            init: function(pPointsFigure,pColor,pLabel,pThink){
                this._super(pPointsFigure,pColor,pLabel,pThink);
            }        
        });

        var Circle = Figure.extend({

            init: function(pPointsFigure, pRadio, pStrokeWidth, pStrokeColor, pFillColor){
                this._super(pPointsFigure, pStrokeWidth, pStrokeColor);
                this.radio = pRadio;
                this.fillColor = pFillColor;
            },
            
            setRadio: function(pRadio){
                this.radio = pRadio;
            },

            setFillColor: function(pFillColor){
                this.fillColor = pFillColor;
            },

            getRadio: function(){
                return this.radio;
            },

            getFillColor: function(){
                return this.fillColor;
            }
        }); 

        var Border = Figure.extend({
            init: function(pPointsFigure,pColor,pLabel,pThink,pTypeBorder){
                this._super(pPointsFigure,pColor,pLabel,pThink);
                this.typeBorder = pTypeBorder;
            },
            getTypeBorder: function(){
                return this.typeBorder;
            },
            
            setTypeBorder : function(pTypeBorder){
                this.typeBorder = pTypeBorder;
            }
         
        });

        

        function init(){

        }

        return {
            init: init,
            newFigure: function (pPointsFigure, pStrokeWidth, pStrokeColor){
                return new Figure(pPointsFigure, pStrokeWidth, pStrokeColor);
            },
            createCircle:createCircle,
            createPoint:createPoint
        };
    })();


        

    function init(){
        
    }

    //Init.
    $(init);

}(LibraryData, jQuery));

