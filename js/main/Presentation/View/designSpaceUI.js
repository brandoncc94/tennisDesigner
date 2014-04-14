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
    designSpace = (function(){
        var curveLayer, lineLayer, anchorLayer, backgroundLayer, 
                figuresLayer, straight, labelText, canvasStage;

        drawCanvasStage();

        function getBackgroundLayer(){
            return backgroundLayer;
        }

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

        function dragElementsIntoCanvas(pRadius, pStrokeWidth, pStrokeColor, pFillColor){

            var canvasContainer = canvasStage.getContainer();    
            var dragSrcEl = null;

            //Safe reference of the image moved
            $( "#imgCircle" ).on( "dragstart", function(){
                dragSrcEl = this;
            });

            $( "#imgLine" ).on( "dragstart", function(){
                dragSrcEl = this;
            });
            
            canvasContainer.addEventListener('dragover',function(e){
                e.preventDefault(); //Stops the reference to do the defult event
            });

            canvasContainer.addEventListener('drop',function(e){
                //Singleton Pattern that allow only drag one circle and just one
                if ( arguments.callee._singletonInstance )
                    return arguments.callee._singletonInstance;
                arguments.callee._singletonInstance = this;

                var posX = Presentation.getOnLoadDesignsHandler().getXPageReference(e);
                var posY = Presentation.getOnLoadDesignsHandler().getYPageReference(e);

                if(dragSrcEl.id == "imgCircle"){
                    var circle = new Kinetic.Circle({
                        x: posX,
                        y: posY,
                        radius: pRadius,
                        stroke: '#000',
                        strokeWidth: 1,
                        draggable: true
                    });

                    figuresLayer.add(circle);
                    figuresLayer.draw();

                    var points = LibraryData.createPoint(posX, posY);

                    var label = Presentation.getLabelUI();
                    var cad = "Radius: " + pRadius + "\n" + "Stroke Width: " + pStrokeWidth + "\n" + "Stroke Color: " + pStrokeColor + "\n" + "Fill Color: " + pFillColor;
                    label.init(cad , "");

                    var circleRef = LibraryData.createCircle(points, pRadius, pStrokeWidth, pStrokeColor, pFillColor, circle);

                    circle.on('click', function() {
                        changeFeatureDialog(circle, HTML, colorPickers, colorPickers, false, label, circleRef);
                    });

                    circle.on('dragend', function() {
                        var points = LibraryData.createPoint(circle.getPosition().x, circle.getPosition().y);
                        circleRef.setPointsFigure(points);
                    });
                }
                else if(dragSrcEl.id == "imgLine"){
                    Presentation.getOnLoadDesignsHandler().drawLineListener(pStrokeWidth, pStrokeColor);
                }
             });
        }

        function drawLine(pPosX1, pPosY1, pPosX2, pPosY2, pStrokeWidth, pStrokeColor){
            var straight = new Kinetic.Line({
                strokeWidth: 3,
                stroke: 'black',
                points: [pPosX1, pPosY1, pPosX2, pPosY2],
                draggable: true
            });

            var points = LibraryData.createPoint(pPosX1, pPosY1);
            var points2 = LibraryData.createPoint(pPosX2, pPosY2);
            var points3 = LibraryData.createPoint(points, points2);

            var lineRef = LibraryData.createStraightLine(points3, pStrokeWidth, pStrokeColor, straight);
            var positionsArray = [lineRef.getPointsFigure().getPositionX().getPositionX(), lineRef.getPointsFigure().getPositionX().getPositionY(),
                                       lineRef.getPointsFigure().getPositionY().getPositionX(), lineRef.getPointsFigure().getPositionY().getPositionY()];


            var label = Presentation.getLabelUI();
            var cad = "Stroke Width: " + pStrokeWidth + "\n" + "Stroke Color: " + pStrokeColor + "\n" + "Points: [" + pPosX1 + ", " + pPosY1 + "] , " + "[" + pPosX2 + "," + pPosY2 + "]";
            label.init(cad , [pPosX2, pPosY2]);

            straight.on('click', function() {
                changeLineFeatureDialog(straight, HTML, colorPickers, colorPickers, false, label, lineRef);
            });

            straight.on('dragend', function() {
                var lineObj = Presentation.getOnLoadDesignsHandler().updateLine(this, lineRef);    
                //Just update the label and redraw the line layer to make it visible
                positionsArray = [lineObj.getPointsFigure().getPositionX().getPositionX(), lineObj.getPointsFigure().getPositionX().getPositionY(),
                                       lineObj.getPointsFigure().getPositionY().getPositionX(), lineObj.getPointsFigure().getPositionY().getPositionY()];

                //this.setPoints(positionsArray);
                //alert(this.getPoints());
                var cad = "Stroke Width: " + strokeWidthAlert + "\n" + "Stroke Color: " + strokeColorAlert  + "\n" + 
                          "Points: [" + positionsArray[0] + ", " + positionsArray[1] + "] , " + 
                          "[" + positionsArray[2] + "," + positionsArray[3] + "]";
                label.changeName(cad , "");
                figuresLayer.draw(); 

                checkIntersection(positionsArray);
            });

            figuresLayer.add(straight);
            figuresLayer.draw();   
            checkIntersection(positionsArray);
        }

        function checkIntersection(pLineObject){
            //var straightLineLen = straightLine.getPoints().length / 2 - 1;
            var lineChildren = lineLayer.getChildren();
            var straightLine = lineLayer.get('#straightLine')[0];
            var staticLines = lineChildren[0].getPoints();
            
            for( var i=0; i<6; i++){  // for each single shape

               var results = checkLineIntersection(pLineObject[0], pLineObject[1], pLineObject[2], pLineObject[3], 
                           staticLines[i], staticLines[i + 1], staticLines[i + 2], staticLines[i + 3]);
               if(results.onLine1 == true && results.onLine2 == true){
                    alert("Collide!");
               }
               i+=1;
            }
        }

        //Taken from http://jsfiddle.net/justin_c_rounds/Gd2S2/light/
        function checkLineIntersection(pLine1StartX, pLine1StartY, pLine1EndX, pLine1EndY, pLine2StartX, pLine2StartY, pLine2EndX, pLine2EndY) {
            
            //alert(pLine2StartX + " " + pLine2StartY + " " + pLine2EndX + " " + pLine2EndY);
            var denominator, a, b, numerator1, numerator2, result = {
                x: null,        //  Position X of the intersection
                y: null,        //  Position Y of the intersection
                onLine1: false, 
                onLine2: false
            };
            
            denominator = ((pLine2EndY - pLine2StartY) * (pLine1EndX - pLine1StartX)) - ((pLine2EndX - pLine2StartX) * (pLine1EndY - pLine1StartY));
            if (denominator == 0) {
                return result;
            }
            a = pLine1StartY - pLine2StartY;
            b = pLine1StartX - pLine2StartX;
            numerator1 = ((pLine2EndX - pLine2StartX) * a) - ((pLine2EndY - pLine2StartY) * b);
            numerator2 = ((pLine1EndX - pLine1StartX) * a) - ((pLine1EndY - pLine1StartY) * b);
            a = numerator1 / denominator;
            b = numerator2 / denominator;

            // if we cast these lines infinitely in both directions, they intersect here:
            result.x = pLine1StartX + (a * (pLine1EndX - pLine1StartX));
            result.y = pLine1StartY + (a * (pLine1EndY - pLine1StartY));
        
            // if line1 is a segment and line2 is infinite, they intersect if:
            if (a > 0 && a < 1) {
                result.onLine1 = true;
            }
            // if line2 is a segment and line1 is infinite, they intersect if:
            if (b > 0 && b < 1) {
                result.onLine2 = true;
            }            
            //If both are true, they intersect each other
            return result;
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
                draggable: true,
                dragBoundFunc: function (pos) {
                    //Anchor values
                    var X = pos.x;
                    var Y = pos.y;
                    if(x == 150 && y == 100){
                        if (X < 30) {
                            X = 30;
                        }
                        if (X > 240) {
                            X = 240;
                        }
                        if (Y < 30) {
                            Y = 30;
                        }
                        if (Y > 120) {
                            Y = 120;
                        }
                        return ({
                            x: X,
                            y: Y
                        });
                    }else if(x == 300 && y == 100){
                        if (X < 290) {
                            X = 290;
                        }
                        if (X > 550) {
                            X = 550;
                        }
                        if (Y < 30) {
                            Y = 30;
                        }
                        if (Y > 130) {
                            Y = 130;
                        }
                        return ({
                            x: X,
                            y: Y
                        });
                    }else if(x == 375 && y == 175){
                        if (X < 320) {
                            X = 320;
                        }
                        if (X > 550) {
                            X = 550;
                        }
                        if (Y < 150) {
                            Y = 150;
                        }
                        if (Y > 200) {
                            Y = 200;
                        }
                        return ({
                            x: X,
                            y: Y
                        });
                    }else if(x == 450 && y == 250){
                        if (X < 290) {
                            X = 290;
                        }
                        if (X > 550) {
                            X = 550;
                        }
                        if (Y < 240) {
                            Y = 240;
                        }
                        if (Y > 320) {
                            Y = 320;
                        }
                        return ({
                            x: X,
                            y: Y
                        });
                    }else{
                        if (X < 30) {
                            X = 30;
                        }
                        if (X > 240) {
                            X = 240;
                        }
                        if (Y < 175) {
                            Y = 175;
                        }
                        if (Y > 320) {
                            Y = 320;
                        }
                        return ({
                            x: X,
                            y: Y
                        });
                    }
                }
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

            $( "#imgLine" ).on( "click", function(){
                HTML = "<div id='infos'>\
                    <span>Stroke Color: </span><div style ='margin-top: -55px' id='tmp2DivBackgroundColor' class='color-box'></div></br></br>\
                    <span>Stroke Width: </span><input style='margin-top: -55px' type='text' id='tbxStrokeWidth'></input></br></br>\
                    </div>";

                colorPickers = "<script>\
                        $('#tmp2DivBackgroundColor').colpick({colorScheme:'dark',layout:'rgbhex',color:'ff8800',onSubmit:function(hsb,hex,rgb,el) {$(el).css('background-color', '#'+hex);$(el).colpickHide();  }}).css('background-color', '#ff8800');\
                        </script>";

                orginalColorPickers = colorPickers;
                insertLineFeatureDialog(HTML, colorPickers, orginalColorPickers,  false);
            });
        }
    
        function insertLineFeatureDialog(pHTML, pColorPickers, pColorPickersOriginal, pChange){     
            if(pChange){
                pChange = false;
                pColorPickers += "<script> $('#tbxStrokeWidth').val(strokeWidthAlert);\
                                               $('#tmpDivBackgroundColor').colpick({colorScheme:'dark',layout:'rgbhex',color:'ff8800',onSubmit:function(hsb,hex,rgb,el) {$(el).css('background-color', '#'+hex); $(el).colpickHide(); }}).css('background-color', '#' + strokeColorAlert);\
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
                        strokeColorAlert = Presentation.getOnLoadDesignsHandler().convertToHex($("#tmp2DivBackgroundColor").css('backgroundColor'));
                        strokeWidthAlert = $("#tbxStrokeWidth").val();
                        
                        if($("#tbxStrokeWidth").val().length == 0){
                            pChange = true;
                            pColorPickers = pColorPickersOriginal;
                            bootbox.alert("Please select the stroke width.", function() {
                                insertFeatureDialog(pHTML, pColorPickers, pColorPickersOriginal, pChange);                     
                            });
                        }else{
                            bootbox.alert("Now drag the line.");
                            dragElementsIntoCanvas(null, strokeWidthAlert, strokeColorAlert,null);
                        }
                  }
                }
              }
            });
        }

        function changeLineFeatureDialog(pReference, pHTML, pColorPickers, pColorPickersOriginal, pChange, pLabel, pLineObj, pType){ 
            strokeWidthAlert = pLineObj.getStrokeWidth();
            strokeColorAlert = pLineObj.getStrokeColor();

            pColorPickers += "<script> $('#tbxStrokeWidth').val(strokeWidthAlert);\
                                       $('#tmp2DivBackgroundColor').colpick({colorScheme:'dark',layout:'rgbhex',color:'ff8800',onSubmit:function(hsb,hex,rgb,el) {$(el).css('background-color', '#'+hex);$(el).colpickHide();  }}).css('background-color', strokeColorAlert);\
                             </script>";

            bootbox.dialog({
              message: pHTML + pColorPickers,
              title: "Change Characteristics",
              buttons: {
                main: {
                  label: "Apply",
                  className: "btn-primary",
                  callback: function() {
                        strokeColorAlert = Presentation.getOnLoadDesignsHandler().convertToHex($("#tmp2DivBackgroundColor").css('backgroundColor'));
                        strokeWidthAlert = $("#tbxStrokeWidth").val();

                        if($("#tbxStrokeWidth").val().length == 0){
                            pChange = true;
                            pColorPickers = pColorPickersOriginal;
                            bootbox.alert("Please select the stroke width.", function() {
                                insertFeatureDialog(pHTML, pColorPickers, pColorPickersOriginal, pChange);                     
                            });
                        }
                        else{
                            //PAINT LINE
                            //pReference.setRadius(radiusAlert);
                            
                            pLineObj.setStrokeWidth(strokeWidthAlert);
                            pLineObj.setStrokeColor(strokeColorAlert);

                            var cad = "Stroke Width: " + strokeWidthAlert + "\n" + "Stroke Color: " + strokeColorAlert  + "\n" + 
                                      "Points: [" + pLineObj.getPointsFigure().getPositionX().getPositionX() + ", " +pLineObj.getPointsFigure().getPositionX().getPositionY() + "] , " + 
                                      "[" + pLineObj.getPointsFigure().getPositionY().getPositionX() + "," + pLineObj.getPointsFigure().getPositionY().getPositionY() + "]";
                            pLabel.changeName(cad, "");                            
                            figuresLayer.draw();

                            bootbox.alert("Changes applied.");
                        }
                  }
                }
              }
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
                        fillColorAlert = Presentation.getOnLoadDesignsHandler().convertToHex($("#tmpDivBackgroundColor").css('backgroundColor'));    
                        radiusAlert = $("#tbxRadius").val();             
                        strokeColorAlert = Presentation.getOnLoadDesignsHandler().convertToHex($("#tmp2DivBackgroundColor").css('backgroundColor'));
                        strokeWidthAlert = $("#tbxStrokeWidth").val();
                        
                        if($("#tbxStrokeWidth").val().length == 0){
                            pChange = true;
                            pColorPickers = pColorPickersOriginal;
                            bootbox.alert("Please select the stroke width.", function() {
                                insertFeatureDialog(pHTML, pColorPickers, pColorPickersOriginal, pChange);                     
                            });
                        }else if($("#tbxRadius").val().length == 0){
                            pChange = true;
                            pColorPickers = pColorPickersOriginal;
                            bootbox.alert("Please select the radius of the circle.", function() {
                                insertFeatureDialog(pHTML, pColorPickers, pColorPickersOriginal, pChange);                     
                            });
                        }else{
                            bootbox.alert("Now drag the circle.");
                            dragElementsIntoCanvas(radiusAlert, strokeWidthAlert, strokeColorAlert, fillColorAlert);
                        }
                  }
                }
              }
            });
        }

        function changeFeatureDialog(pReference, pHTML, pColorPickers, pColorPickersOriginal, pChange, pLabel, pCircleObj, pType){ 
            strokeWidthAlert = pCircleObj.getStrokeWidth();
            radiusAlert = pCircleObj.getRadio();
            fillColorAlert = pCircleObj.getFillColor();
            strokeColorAlert = pCircleObj.getStrokeColor();

            pColorPickers += "<script> $('#tbxStrokeWidth').val(strokeWidthAlert);\
                                       $('#tbxRadius').val(radiusAlert);\
                                       $('#tmpDivBackgroundColor').colpick({colorScheme:'dark',layout:'rgbhex',color:'ff8800',onSubmit:function(hsb,hex,rgb,el) {$(el).css('background-color', '#'+hex); $(el).colpickHide(); }}).css('background-color', fillColorAlert);\
                                       $('#tmp2DivBackgroundColor').colpick({colorScheme:'dark',layout:'rgbhex',color:'ff8800',onSubmit:function(hsb,hex,rgb,el) {$(el).css('background-color', '#'+hex);$(el).colpickHide();  }}).css('background-color', strokeColorAlert);\
                             </script>";

            bootbox.dialog({
              message: pHTML + pColorPickers,
              title: "Change Characteristics",
              buttons: {
                main: {
                  label: "Apply",
                  className: "btn-primary",
                  callback: function() {
                        fillColorAlert = Presentation.getOnLoadDesignsHandler().convertToHex($("#tmpDivBackgroundColor").css('backgroundColor'));
                        strokeColorAlert = Presentation.getOnLoadDesignsHandler().convertToHex($("#tmp2DivBackgroundColor").css('backgroundColor'));
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
                            pReference.setRadius(radiusAlert);
                            pCircleObj.setRadio(radiusAlert);
                            pCircleObj.setStrokeWidth(strokeWidthAlert);
                            pCircleObj.setFillColor(fillColorAlert);
                            pCircleObj.setStrokeColor(strokeColorAlert);

                            var cad = "Radius: " + radiusAlert + "\n" + "Stroke Width: " + strokeWidthAlert + "\n" + "Stroke Color: " + strokeColorAlert + "\n" + "Fill Color: " + fillColorAlert;
                            pLabel.changeName(cad, "");                            
                            figuresLayer.draw();

                            bootbox.alert("Changes applied.");
                        }
                  }
                }
              }
            });
        }
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
            getBackgroundLayer : getBackgroundLayer,
            drawLine: drawLine
        };            
    })();

}(Presentation, jQuery));


var strokeWidthAlert = 0, radiusAlert = 0, strokeColorAlert = "", fillColorAlert = "", HTML = "", colorPickers = "", orginalColorPickers = "";