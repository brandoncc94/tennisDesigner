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
        
        function createCircle(pPointsFigure, pStrokeWidth, p){
            return new Circle();
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
            init: function(pPointsFigure,pColor,pLabel,pThink){
                this.colour = pColor;
                this.labels = pLabel;
                this.think = pThink;
                this.pointsFigure = pPointsFigure;
            },
            
            setColor: function(pColor){
                this.colour = pColor;
            },
            
            setLabel: function(pLabel){
                this.labels = pLabel;
            },
            
            setThink: function(pThink){
                this.think = pThink;
            },
            
            setPointsFigure : function(pPointsFigure){
                this.pointsFigure = pPointsFigure;
            },
            
            getColor: function(){
                return this.colour;
            },
            
            getLabel: function(){
                return this.labels;
            },
            
            getThink: function(){
                return this.think;
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
            init: function(pPointsFigure,pThickColor,,pThick,pRadio){
                this._super(pPointsFigure,pColor,pLabel,pThick);
                this.radio = pRadio;
                this.fillColor = 
            },
            
            setRadio: function(pRadio){
                this.radio = pRadio;
            },

            getRadio: function(){
                return this.radio;
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
            newFigure: function (pPointsFigure,pColor,pLabel,pThink){
                return new Figure(pPointsFigure,pColor,pLabel,pThink);
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

