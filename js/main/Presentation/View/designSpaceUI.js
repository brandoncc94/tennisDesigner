/*!
 * All Rights Reserved
 * This software is proprietary information of
 * Brandon Campos Calderón - Juan Carlos Martínez
 * Use is subject to license terms.
 * Filename: presentationNamespace.js
 */

 /*
  * Author:      brandonc94@gmail.com
  * Date:        28/03/2014
  * Description: Design space (canvas) to develop the graphical design
  */


/*
 * Global Presentation Layer to be used with MVC Pattern
 * @namespace
 */
(function (pContext, $) {
    //'use strict'

    /**
     * Public method to return a reference of onLoadModule.
     * 
     * @return {onLoadModule} View declarations of the MVC.
         * @public
     */

    pContext.getDesignSpace = function() {
        return designSpace;
    };

    /**
     * Module.
     *      Design space module to crete your own designs
     *
     * @private
     * @namespace
     **/
    var designSpace = (function(){
        var curveLayer, lineLayer, anchorLayer, backgroundLayer, 
                figuresLayer, straight, labelText, canvasStage;

        drawCanvasStage();

        function drawCanvasStage(){
            //We declare the stage to be working with 
            canvasStage = new Kinetic.Stage({
                container: 'canvas-container',
                width: 600,
                height: 350
            });

            //Layers of the stage
            anchorLayer = new Kinetic.Layer();
            lineLayer = new Kinetic.Layer();
            curveLayer = new Kinetic.Layer();
            backgroundLayer = new Kinetic.Layer();
            figuresLayer = new Kinetic.Layer();

            straight = new Kinetic.Line({
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
                
            canvasStage.add(backgroundLayer); 
            canvasStage.add(curveLayer);
            canvasStage.add(lineLayer);
            canvasStage.add(figuresLayer); 
            canvasStage.add(anchorLayer); 

            loadFiguresActions();

        }

        function loadFiguresActions(){
            $( "#imgCircle" ).on( "click", function(){
                HTML = "<div id='infos'>\
                    <span>Fill Color: </span><div id='tmpDivBackgroundColor' class='color-box'></div></br></br>\
                    <span>Stroke Color: </span><div id='tmp2DivBackgroundColor' class='color-box'></div></br></br>\
                    <span>Stroke Width: </span><input type='text' id='tbxStrokeWidth'></input></br></br>\
                    <span>Radius: </span> <input type='text' id='tbxRadius'>\
                    </div>";

                colorPickers = "<script>\
                        $('#tmpDivBackgroundColor').colpick({colorScheme:'dark',layout:'rgbhex',color:'ff8800',onSubmit:function(hsb,hex,rgb,el) {$(el).css('background-color', '#'+hex); $(el).colpickHide(); }}).css('background-color', '#ff8800');\
                        $('#tmp2DivBackgroundColor').colpick({colorScheme:'dark',layout:'rgbhex',color:'ff8800',onSubmit:function(hsb,hex,rgb,el) {$(el).css('background-color', '#'+hex);$(el).colpickHide();  }}).css('background-color', '#ff8800');\
                        </script>";

                orginalColorPickers = colorPickers;

                insertFeatureDialog(HTML, colorPickers, orginalColorPickers,  false);
            });
        }

        function insertFeatureDialog(pHTML, pColorPickers, pColorPickersOriginal, pChange){     
            if(pChange){
                pChange = false;
                pColorPickers += "<script> $('#tbxStrokeWidth').val(strokeWidthAlert);\
                                           $('#tbxRadius').val(radiusAlert);\
                                           $('#tmpDivBackgroundColor').colpick({colorScheme:'dark',layout:'rgbhex',color:'ff8800',onSubmit:function(hsb,hex,rgb,el) {$(el).css('background-color', '#'+hex); $(el).colpickHide(); }}).css('background-color', '#' + fillColorAlert);\
                                           $('#tmp2DivBackgroundColor').colpick({colorScheme:'dark',layout:'rgbhex',color:'ff8800',onSubmit:function(hsb,hex,rgb,el) {$(el).css('background-color', '#'+hex);$(el).colpickHide();  }}).css('background-color', '#' + strokeColorAlert);\
                                 </script>";
            }

            bootbox.dialog({
              message: pHTML + pColorPickers,
              title: "Insert Characteristics",
              buttons: {
                main: {
                  label: "Apply",
                  className: "btn-primary",
                  callback: function() {
                        fillColorAlert = hexc($("#tmpDivBackgroundColor").css('backgroundColor'));
                        strokeColorAlert = hexc($("#tmp2DivBackgroundColor").css('backgroundColor'));
                        strokeWidthAlert = $("#tbxStrokeWidth").val();
                        radiusAlert = $("#tbxRadius").val();

                        if($("#tbxStrokeWidth").val().length == 0){
                            pChange = true;
                            pColorPickers = pColorPickersOriginal;
                            bootbox.alert("Please select the stroke width.", function() {
                                insertFeatureDialog(pHTML, pColorPickers, pColorPickersOriginal, pChange);                     
                            });
                        }
                        else if($("#tbxRadius").val().length == 0){
                            pChange = true;
                            pColorPickers = pColorPickersOriginal;
                            bootbox.alert("Please select the radius of the circle.", function() {
                                insertFeatureDialog(pHTML, pColorPickers, pColorPickersOriginal, pChange);                     
                            });
                        }
                        else{
                            bootbox.alert("Now drag the circle.");
                            dragCircleIntoCanvas(radiusAlert, strokeWidthAlert, strokeColorAlert, fillColorAlert);
                        }
                  }
                }
              }
            });
        }

        function changeFeatureDialog(pReference, pHTML, pColorPickers, pColorPickersOriginal, pChange){     
            bootbox.dialog({
              message: pHTML + pColorPickers,
              title: "Insert Characteristics",
              buttons: {
                main: {
                  label: "Apply",
                  className: "btn-primary",
                  callback: function() {
                        fillColorAlert = hexc($("#tmpDivBackgroundColor").css('backgroundColor'));
                        strokeColorAlert = hexc($("#tmp2DivBackgroundColor").css('backgroundColor'));
                        strokeWidthAlert = $("#tbxStrokeWidth").val();
                        radiusAlert = $("#tbxRadius").val();

                        if($("#tbxStrokeWidth").val().length == 0){
                            pChange = true;
                            pColorPickers = pColorPickersOriginal;
                            bootbox.alert("Please select the stroke width.", function() {
                                insertFeatureDialog(pHTML, pColorPickers, pColorPickersOriginal, pChange);                     
                            });
                        }
                        else if($("#tbxRadius").val().length == 0){
                            pChange = true;
                            pColorPickers = pColorPickersOriginal;
                            bootbox.alert("Please select the radius of the circle.", function() {
                                insertFeatureDialog(pHTML, pColorPickers, pColorPickersOriginal, pChange);                     
                            });
                        }
                        else{
                            //PAINT CIRCLE
                            /*pReference.setStrokeWidth(strokeWidthAlert);
                            pReference.setRadius(radiusAlert);
                            pReference.setFill(fillColorAlert);
                            pReference.setStroke(strokeColorAlert);
                            figuresLayer.draw();*/
                            bootbox.alert("Changes applied.");
                        }
                  }
                }
              }
            });
        }


        //Converts from RGB to HEX taken from http://jsfiddle.net/DCaQb/  
        function hexc(pColor) {
            var color = '';
            var parts = pColor.match(/^rgb\((\d+),\s*(\d+),\s*(\d+)\)$/);
            delete(parts[0]);
            for (var i = 1; i <= 3; ++i) {
                parts[i] = parseInt(parts[i]).toString(16);
                if (parts[i].length == 1) parts[i] = '0' + parts[i];
            }
            color = '#' + parts.join('');
            return color;
        }

        function dragCircleIntoCanvas(pRadius, pStrokeWidth, pStrokeColor, pFillColor){

            var canvasContainer = canvasStage.getContainer();    
            var dragSrcEl = null;

            //Safe reference of the image moved
            $( "#imgCircle" ).on( "dragstart", function(){
                dragSrcEl = this;
            });
            
            canvasContainer.addEventListener('dragover',function(e){
                e.preventDefault(); //Stops the reference to do the defult event
            });

            canvasContainer.addEventListener('drop',function(e){
                var posX = e.pageX - ($(".main-container").width() - $("#decoration-container").width() - $("#create-container").width());
                var posY = e.pageY - ($("body").height() - $(".header-container").height() - $(".main-container").height() - $(".footer-container").height() + 200);
                if(dragSrcEl.id = "imgCircle"){
                    var circle = new Kinetic.Circle({
                        x: posX,
                        y: posY,
                        radius: pRadius,
                        stroke: '#000',
                        strokeWidth: 1,
                        draggable: true
                    });

                    circle.on('click', function() {
                        changeFeatureDialog(this,HTML, colorPickers, colorPickers,  false);
                    });

                    var cad = "Radius: " + pRadius + "\n" + "Stroke Width: " + pStrokeWidth + "\n" + "Stroke Color: " + '#' + pStrokeColor + "\n" + "Fill Color: " + '#' + pFillColor;
                    
                    var points = LibraryData.getLibraryModule().createPoint(posX, posY);

                    var reference = getLabelUI();

                    var circleRef = LibraryData.getLibraryModule().createCircle(points, pRadius, pStrokeWidth, pStrokeColor, pFillColor, reference);

                    reference.init(cad , circleRef.getPointsFigure().getPositionX());

                    figuresLayer.add(circle);
                }

                figuresLayer.draw();

             });
        }

        function updateLines() {
            var s = straight;
            var straightLine = lineLayer.get('#straightLine')[0];

            //Update the lines when moved dinamically
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

            // when dragend redraw everything
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

        function getLabelUI(){
            return LabelUI;
        }

        var LabelUI = (function () {

            function init(pType, pColor) {
                // Singleton
                load();

                //Load the graphical label with empty text
                function load(){
                    var group = new Kinetic.Group({
                        draggable: true
                    });

                    labelText = new Kinetic.Text({
                        x: 150,
                        y: 200,
                        text: pType + pColor,
                        fontSize: 12,
                        fontFamily: 'Calibri',
                        fill: '#555',
                        width: 180,
                        padding: 5,
                        align: 'center'
                    });

                    var labelFrame = new Kinetic.Rect({
                        x: labelText.getPosition().x,
                        y: labelText.getPosition().y,
                        stroke: '#555',
                        strokeWidth: 3,
                        fill: '#ddd',
                        width: labelText.width(),
                        height: labelText.height(),
                        shadowColor: 'black',
                        shadowBlur: 10,
                        shadowOffset: {x:5,y:5},
                        shadowOpacity: 0.2,
                        cornerRadius: 5
                    });

                    group.add(labelFrame);
                    group.add(labelText);
                    backgroundLayer.add(group);

                    backgroundLayer.draw();
                    
                }
            }

            function changeName(pType, pColor){
                labelText.setText(pType + '#' + pColor);
            }

            return{
                init:init,
                changeName:changeName
            };        
        })();

        /*function fillBackground(pColor){
            var s = straight;

            var figureBackground = new Kinetic.Shape({
                sceneFunc: function(context) {
                  context.beginPath();
                  context.moveTo(s.start.attrs.x, s.start.attrs.y);
                  context.quadraticCurveTo(100,150,s.end.attrs.x, s.end.attrs.y);

                  context.lineTo(s.control3.attrs.x, s.control3.attrs.y);
                  context.lineTo(s.control2.attrs.x, s.control2.attrs.y);
                  context.lineTo(s.control1.attrs.x, s.control1.attrs.y);
                  context.quadraticCurveTo(200,150,s.start.attrs.x, s.start.attrs.y);
                  context.closePath();
                  // KineticJS specific context method
                  context.fillStrokeShape(this);
                },
                fill: pColor
            });

            backgroundLayer.add(figureBackground);

            backgroundLayer.draw();
        }*/

        function init(){
            drawCurves();
            updateLines();
        }

        return {
            init: init,
            getLabelUI:getLabelUI
        };            
    })();

}(Presentation, jQuery));


var strokeWidthAlert = 0, radiusAlert = 0, strokeColorAlert = "", fillColorAlert = "", HTML = "", colorPickers = "", orginalColorPickers = "";