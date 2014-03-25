/*!
 * All Rights Reserved
 * This software is proprietary information of
 * Brandon Campos Calderón - Juan Carlos Martínez
 * Use is subject to license terms.
 * Filename: presentationNamespace.js
 */

 /*
  * Author:      brandonc94@gmail.com
  * Date:        25/03/2014
  * Description: Presentation layer to be develop with MVC
  */


/**
 * Namespace declaration.
 */  

var presentationNamespace = window.presentationNamespace || {};

/*
 * Global Presentation Layer to be used with MVC Pattern
 * @namespace
 */
(function (pContext, $) {
    'use strict';
    /**
     * Public method to return a reference of view module.
     * 
     * @return {viewModule} View declarations of the MVC.
     * @public
     */
    pContext.getViewModule = function() {
        return viewModule;
    };

    /**
     * Public method to return a reference of handler module.
     * 
     * @return {handlerModule} Handler declarations of the MVC.
     * @public
     */
    pContext.getHandlerModule = function() {
        return handlerModule;
    };

    /**
     * Module.
     *      Module of the view
     *
     * @private
     * @namespace
     **/

    var viewModule = (function(){
        
        var designSpaceModule = (function(){

            var curveLayer, lineLayer, anchorLayer, straight;

            //We declare the stage to be working with 
            var stage = new Kinetic.Stage({
                container: 'canvas-container',
                width: 600,
                height: 350
            });

            //Layers of the stage
            anchorLayer = new Kinetic.Layer();
            lineLayer = new Kinetic.Layer();
            curveLayer = new Kinetic.Layer();

            var straight = new Kinetic.Line({
                strokeWidth: 2,
                stroke: 'black',
                lineCap: 'round',
                id: 'straightLine',
                points: [0, 0]
            });
     
            //Add the line to te layer
            lineLayer.add(straight);

            straight = {
                start: buildAnchor(150, 100),
                control1: buildAnchor(300, 100),
                control2: buildAnchor(375, 175),
                control3: buildAnchor(450, 250),
                end: buildAnchor(150, 250)
            };

            // Before drawing lets syncronize the lines when we pick up the anchor
            anchorLayer.on('beforeDraw', function() {
                drawCurves();
                updateLines();
            });

            //Add all layers to the main stage
            stage.add(curveLayer);
            stage.add(lineLayer);
            stage.add(anchorLayer);
          
            function updateLines() {
                var s = straight;
                var straightLine = lineLayer.get('#straightLine')[0];

                straightLine.setPoints([s.control1.attrs.x, s.control1.attrs.y, s.control2.attrs.x, 
                            s.control2.attrs.y, s.control3.attrs.x, s.control3.attrs.y, s.end.attrs.x, s.end.attrs.y]);

                //Let's draw the layer to make it visible
                lineLayer.draw();
            }

            function buildAnchor(x, y) {
                var anchor = new Kinetic.Circle({
                    x: x,
                    y: y,
                    radius: 15,
                    stroke: '#666',
                    fill: '#ddd',
                    strokeWidth: 2,
                    draggable: true
                });

                // when mouseover let's increase the stroke
                anchor.on('mouseover', function() {
                    document.body.style.cursor = 'pointer';
                    this.setStrokeWidth(4);
                    anchorLayer.draw();
                });

                // when mouseout let's decrease the stroke
                anchor.on('mouseout', function() {
                    document.body.style.cursor = 'default';
                    this.setStrokeWidth(2);
                    anchorLayer.draw();
                });

                // when mouseover let's increase the stroke
                anchor.on('dragend', function() {
                    //alert(anchor.getPosition().x);
                    drawCurves();
                    updateLines();
                });

                //Add to the layer the anchor we've just created
                anchorLayer.add(anchor);
                return anchor;
            }

            function drawCurves() {
                var context = curveLayer.getContext();

                //Clear method avoid repeting the color and leave marks behind
                context.clear();

                // draw curve lines
                context.beginPath();
                context.moveTo(straight.start.attrs.x, straight.start.attrs.y);
                context.quadraticCurveTo(100,150,straight.end.attrs.x, straight.end.attrs.y);
                context.setAttr('strokeStyle', '#60a637');
                context.setAttr('lineWidth', 4);
                context.stroke();

                context.beginPath();
                context.moveTo(straight.start.attrs.x, straight.start.attrs.y);
                context.quadraticCurveTo(200,150,straight.control1.attrs.x, straight.control1.attrs.y);
                context.setAttr('strokeStyle', '#60a637');
                context.setAttr('lineWidth', 4);
                context.stroke();

            }      

            function init(){
                drawCurves();
                updateLines();
            }

            return {
                // init Components
                init: init
            };
        })();

        function init(){
            designSpaceModule.init();
        }
        // public methods return
        return {
            // init Components
            init: init
        };
    })();


    /**
     * Module.
     *      Module of the handler
     *
     * @private
     * @namespace
     **/
    var handlerModule = (function(){

    })();

    function init() {

        //Called the methods required to initialize all the modules.
    }

    //Init.
    $(init);

}(presentationNamespace, jQuery));

