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

        function getStraight(){
            return straight;
        }

        function getAnchorLayer(){
            return anchorLayer;
        }

        function getFiguresLayer(){
            return figuresLayer;
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
                e.preventDefault(); //Stops the reference to do the defult event
                //Singleton Pattern that allow only drag one figure and just one
                if ( arguments.callee._singletonInstance )
                    return arguments.callee._singletonInstance;
                arguments.callee._singletonInstance = this;

                var posX = Presentation.getOnLoadDesignsHandler().getXPageReference(e);
                var posY = Presentation.getOnLoadDesignsHandler().getYPageReference(e);
                drawFigure(posX, posY, pRadius, pFillColor, pStrokeWidth, pStrokeColor, dragSrcEl, "edit");
            });
        }

        function drawFigure(pPosX, pPosY, pRadius, pFillColor, pStrokeWidth, pStrokeColor, dragSrcEl, pType){
            
            if(dragSrcEl.id == "imgCircle"){
                drawCircle(pPosX, pPosY, pRadius, pFillColor, pStrokeWidth, pStrokeColor, pType);
            }
            else if(dragSrcEl.id == "imgLine")
                Presentation.getOnLoadDesignsHandler().drawLineListener(pStrokeWidth, pStrokeColor);
        }

        function drawCircle(pPosX, pPosY, pRadius, pFillColor, pStrokeWidth, pStrokeColor, pType){
            var circle = new Kinetic.Circle({
                x: pPosX,
                y: pPosY,
                radius: pRadius,
                stroke: "#000",
                strokeWidth: 1,
                draggable: true,
                id: idLabel
            });

            if(pType == "fire"){
                circle.fill(pFillColor);
                circle.stroke(pStrokeColor);
                circle.strokeWidth(pStrokeWidth);
            }

            figuresLayer.add(circle);
            figuresLayer.draw();

            idLabel+=1;

            var points = LibraryData.createPoint(pPosX, pPosY);
            var label = Presentation.getLabelUI();
            var cad = "Radius: " + pRadius + "\n" + "Stroke Width: " + pStrokeWidth + "\n" + "Stroke Color: " + pStrokeColor + "\n" + "Fill Color: " + pFillColor;
            label.init(cad , [pPosX, pPosY]);                    

            //Create the object and send it to the paint manager
            var circleRef = LibraryData.createCircle(points, pRadius, pStrokeWidth, pStrokeColor, pFillColor);
            Presentation.getPaintManagerHandler().sendCircleToPaintManager(circleRef);

            circle.on('click', function() {

                /*//Datos del objeto
                alert("Position X: " + circleRef.getPointsFigure().getPositionX() + "\n" +
                      "Position Y: " + circleRef.getPointsFigure().getPositionY() + "\n" + 
                      "Radio:      " + circleRef.getRadio()     + "\n" + 
                      "StrokeWidth:" + circleRef.getStrokeWidth() + "\n" + 
                      "StrokeColor:" + circleRef.getStrokeColor() + "\n" +
                      "FillColor  :" + circleRef.getFillColor() + "\n"); */

                Presentation.getAlertsUI().changeFeatureDialog(circle, label, false, circleRef);
            });

            circle.on('dragend', function() {
                /****************************************************************************************************/
                /****************************************************************************************************/
                /****************************************************************************************************/
                /****************************************************************************************************/

                circleRef.setPointsFigure(LibraryData.createPoint(circle.getPosition().x, circle.getPosition().y));

                /****************************************************************************************************/
                /****************************************************************************************************/
                /****************************************************************************************************/
                /****************************************************************************************************/
            });
        }

        
        function drawLine(pPosX1, pPosY1, pPosX2, pPosY2, pStrokeWidth, pStrokeColor, pType){
            var straight = new Kinetic.Line({
                strokeWidth: 3,
                stroke: 'black',
                points: [pPosX1, pPosY1, pPosX2, pPosY2],
                draggable: true,
                id: idLabel
            });

            if(pType == "fire"){
                straight.strokeWidth(pStrokeWidth);
                straight.stroke(pStrokeColor);
            }

            figuresLayer.add(straight);
            figuresLayer.draw();

            idLabel+=1;

            var points = LibraryData.createPoint(pPosX1, pPosY1);
            var points2 = LibraryData.createPoint(pPosX2, pPosY2);
            var points3 = LibraryData.createPoint(points, points2);

            var label = Presentation.getLabelUI();

            var cad = "Stroke Width: " + pStrokeWidth + "\n" + "Stroke Color: " + pStrokeColor + "\n" + "Points: [" + pPosX1 + ", " + pPosY1 + "] , " + "[" + pPosX2 + "," + pPosY2 + "]";
            
            var lineRef = LibraryData.createStraightLine(points3, pStrokeWidth, pStrokeColor);
            alert(lineRef.convertToJson());

            Presentation.getPaintManagerHandler().sendLineToPaintManager(lineRef);

            var positionsArray = [lineRef.getPointsFigure().getPositionX().getPositionX(), lineRef.getPointsFigure().getPositionX().getPositionY(),
                                       lineRef.getPointsFigure().getPositionY().getPositionX(), lineRef.getPointsFigure().getPositionY().getPositionY()];

            label.init(cad , [pPosX2, pPosY2]);

            straight.on('click', function() {
                /*//Datos del objeto
                        alert("Position X: [" + lineRef.getPointsFigure().getPositionX().getPositionX() + ", " +
                                                lineRef.getPointsFigure().getPositionX().getPositionY() + "] " + "\n" +
                              "Position Y: [" + lineRef.getPointsFigure().getPositionY().getPositionX() + ", " +
                                               lineRef.getPointsFigure().getPositionY().getPositionY() + "] " + "\n" +
                              "StrokeWidth:" + lineRef.getStrokeWidth() + "\n" + 
                              "StrokeColor:" + lineRef.getStrokeColor() + "\n"); */

                Presentation.getAlertsUI().changeLineFeatureDialog(straight, label, false, lineRef);
            });

            straight.on('dragend', function() {
                var lineObj = Presentation.getOnLoadDesignsHandler().updateLine(this, lineRef);    
                //Just update the label and redraw the line layer to make it visible
                positionsArray = [lineObj.getPointsFigure().getPositionX().getPositionX(), lineObj.getPointsFigure().getPositionX().getPositionY(),
                                       lineObj.getPointsFigure().getPositionY().getPositionX(), lineObj.getPointsFigure().getPositionY().getPositionY()];

                var cad = "Stroke Width: " + lineObj.getStrokeWidth() + "\n" + "Stroke Color: " + lineObj.getStrokeColor()   + "\n" + 
                          "Points: [" + positionsArray[0] + ", " + positionsArray[1] + "] , " + 
                          "[" + positionsArray[2] + "," + positionsArray[3] + "]";
                
                label.changeName(cad , "", straight.id());
                figuresLayer.draw();

                checkIntersection(positionsArray);
            });

            checkIntersection(positionsArray);
        }

        function checkIntersection(pLineObject){
            var lineChildren = lineLayer.getChildren();
            var straightLine = lineLayer.get('#straightLine')[0];
            var staticLines = lineChildren[0].getPoints();
            
            for( var i=0; i<6; i++){  // for each static straight line

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

        // function prueba ( a , b , callback){
        //     c=a+b;
        //     callback(c);
        // }

        // function result ( c){
        //     alert(c);
        // }

        // prueba(1,2,result);

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
                Presentation.getAlertsUI().insertFeatureDialog(false);
            });

            $( "#imgLine" ).on( "click", function(){
                Presentation.getAlertsUI().insertLineFeatureDialog(false);
            });
        }
    
        
        function fillBackground(pColor){
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
        }

        function cleanFigures(){
            //Destroy all the children of the figures and labels
            figuresLayer.destroyChildren();
            backgroundLayer.destroyChildren();
            //Redraw them
            figuresLayer.draw();
            backgroundLayer.draw();
            //Now let's update the paint manager
            Presentation.getPaintManagerHandler().deleteAllElements();
        }

        function init(){
            drawCurves();
            updateLines();
        }

        return {
            init: init,
            getBackgroundLayer : getBackgroundLayer,
            getFiguresLayer : getFiguresLayer,
            getStraight: getStraight,
            buildAnchor: buildAnchor,
            drawCurves : drawCurves,
            updateLines : updateLines,
            getAnchorLayer :getAnchorLayer,
            drawLine: drawLine,
            dragElementsIntoCanvas: dragElementsIntoCanvas,
            cleanFigures : cleanFigures
        };            
    })();

}(Presentation, jQuery));


var strokeWidthAlert = 0, radiusAlert = 0, strokeColorAlert = "", fillColorAlert = "";
var idLabel = 0;