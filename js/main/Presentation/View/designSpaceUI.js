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

        //Let's draw the default stage
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

        function getLineLayer(){
            return lineLayer;
        }

        //Funtion that draws the kinetic Stage, layers and anchors
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
        }    

        //When an elements is draged & dropped
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
                if (arguments.callee._singletonInstance )
                    return arguments.callee._singletonInstance;
                arguments.callee._singletonInstance = this;

                //Get the position X & Y when dropped
                var posX = Presentation.getOnLoadDesignsHandler().getXPageReference(e);
                var posY = Presentation.getOnLoadDesignsHandler().getYPageReference(e);
                drawFigure(posX, posY, pRadius, pFillColor, pStrokeWidth, pStrokeColor, dragSrcEl);
            });
        }

        //Draw the figure selected
        function drawFigure(pPosX, pPosY, pRadius, pFillColor, pStrokeWidth, pStrokeColor, dragSrcEl){
            if(dragSrcEl.id == "imgCircle")
                drawCircle(pPosX, pPosY, pRadius, pFillColor, pStrokeWidth, pStrokeColor);
            else if(dragSrcEl.id == "imgLine")
                Presentation.getOnLoadDesignsHandler().drawLineListener(pStrokeWidth, pStrokeColor);
        }


        function drawCircleFire(pPosX, pPosY, pRadius, pFillColor, pStrokeWidth, pStrokeColor){
            var circle = new Kinetic.Circle({
                x: pPosX,
                y: pPosY,
                radius: pRadius,
                stroke: pStrokeColor,
                strokeWidth: pStrokeWidth,
                fill: pFillColor
            });

            figuresLayer.add(circle);
            figuresLayer.draw();
        }


        function drawCircleArcade(pPosX, pPosY, pIndex, pStroke, pStrokeWidth){
            var circle = new Kinetic.Circle({
                x: pPosX,
                y: pPosY,
                radius: pIndex,
                stroke: pStroke,
                strokeWidth: pStrokeWidth
            });

            figuresLayer.add(circle);
            figuresLayer.draw();  
        }

        function drawCircle(pPosX, pPosY, pRadius, pFillColor, pStrokeWidth, pStrokeColor){
            var circle = new Kinetic.Circle({
                x: pPosX,
                y: pPosY,
                radius: pRadius,
                stroke: "#000",
                strokeWidth: 1,
                draggable: true,
                id: idLabel,
                name: nameCircle
            });

            figuresLayer.add(circle);
            figuresLayer.draw();
            
            var points = LibraryData.createPoint(pPosX, pPosY);
            var label = Presentation.getLabelUI();

            //Create the object and send it to the paint manager
            var circleRef = LibraryData.createCircle(points, pRadius, pStrokeWidth, pStrokeColor, pFillColor);
            var cad = "Radius: " + pRadius + "\n" + "Stroke Width: " + pStrokeWidth + "\n" + 
                      "Stroke Color: " + pStrokeColor + "\n" + "Fill Color: " + pFillColor;
            label.init(cad , [pPosX, pPosY], idLabel);    
            //Let's increment id's
            idLabel+=1;   
            nameCircle+=1;

            //Send the object created to the PAINT MANAGER that centralizes everything
            Presentation.getPaintManagerHandler().sendCircleToPaintManager(circleRef);

            //If circle clicked -> change characteristics
            circle.on('click', function() {
                Presentation.getAlertsUI().changeFeatureDialog(circle, label, false, circleRef);
            });

            //If circle dragend -> update the points and check if a colition happened
            circle.on('dragend', function() {
                circleRef.setPointsFigure(LibraryData.createPoint(circle.getPosition().x, circle.getPosition().y));
                Presentation.getPaintManagerHandler().checkIfCollide(this.name());
            });

            circle.on('mouseover', function() {
                circle.fill("97FFF1");
                circle.opacity(0.8);
                figuresLayer.draw();
            });

            circle.on('mouseout', function() {
                circle.fill("");
                circle.opacity(1);
                figuresLayer.draw();
            });
        }        
        
        function drawLineFire(pPosX1, pPosY1, pPosX2, pPosY2, pStrokeWidth, pStrokeColor){
            var straight = new Kinetic.Line({
                strokeWidth: pStrokeWidth,
                stroke: pStrokeColor,
                points: [pPosX1, pPosY1, pPosX2, pPosY2]
            });

            figuresLayer.add(straight);
            figuresLayer.draw();
        }

        function drawRectangleArcade(pPosX, pPosY, pRectWidth, pStrokeWidth, pStrokeColor, pAngle){
            var rectLine = new Kinetic.Rect({
                x: pPosX,
                y: pPosY,
                width: pRectWidth,
                height: pStrokeWidth,
                fill: pStrokeColor
            });    

            rectLine.rotate(pAngle);
            figuresLayer.add(rectLine);
            figuresLayer.draw(); 
        }

        function drawLine(pPosX1, pPosY1, pPosX2, pPosY2, pStrokeWidth, pStrokeColor){
            //Let's create the graphical line
            var straight = new Kinetic.Line({
                strokeWidth: 3,
                stroke: 'black',
                points: [pPosX1, pPosY1, pPosX2, pPosY2],
                draggable: true,
                id: idLabel,
                name: nameLine
            });

            figuresLayer.add(straight);
            figuresLayer.draw();

            var label = Presentation.getLabelUI();
            var points = LibraryData.createPoint(pPosX1, pPosY1);
            var points2 = LibraryData.createPoint(pPosX2, pPosY2);
            var points3 = LibraryData.createPoint(points, points2);               

            var lineRef = LibraryData.createStraightLine(points3, pStrokeWidth, pStrokeColor);
            var positionsArray = [lineRef.getPointsFigure().getPositionX().getPositionX(), lineRef.getPointsFigure().getPositionX().getPositionY(),

                                lineRef.getPointsFigure().getPositionY().getPositionX(), lineRef.getPointsFigure().getPositionY().getPositionY()];

            var cad = "Stroke Width: " + pStrokeWidth + "\n" + "Stroke Color: " + pStrokeColor + "\n" + 
                      "Points: [" + pPosX1 + ", " + pPosY1 + "] , " + "[" + pPosX2 + "," + pPosY2 + "]";
            label.init(cad , [pPosX2, pPosY2], idLabel);
            //Let's increase the Id's
            idLabel+=1;
            nameLine+=1;
            
            //Send the object created to the PAINT MANAGER that centralizes everything
            Presentation.getPaintManagerHandler().sendLineToPaintManager(lineRef);

            //If straight is clicked -> change features of the lines
            straight.on('click', function() {
                Presentation.getAlertsUI().changeLineFeatureDialog(straight, label, false, lineRef);
            });

            //If straight is dragend -> let's update the features of the object, the label and check if lines collide
            straight.on('dragend', function() {
                var lineObj = Presentation.getOnLoadDesignsHandler().updateLine(this, lineRef);    
                var positionsArray = [lineObj.getPointsFigure().getPositionX().getPositionX(), lineObj.getPointsFigure().getPositionX().getPositionY(),
                                       lineObj.getPointsFigure().getPositionY().getPositionX(), lineObj.getPointsFigure().getPositionY().getPositionY()];
                var cad = "Stroke Width: " + lineObj.getStrokeWidth() + "\n" + "Stroke Color: " + lineObj.getStrokeColor()   + "\n" + 
                          "Points: [" + positionsArray[0] + ", " + positionsArray[1] + "] , " + 
                          "[" + positionsArray[2] + "," + positionsArray[3] + "]";
                
                label.changeName(cad , "", straight.id());
                figuresLayer.draw();
                Presentation.getPaintManagerHandler().checkIfLinesCollide(this.name());
                Presentation.getExtraCalculationsHandler().checkIntersection(positionsArray);
                Presentation.getExtraCalculationsHandler().checkIntersectionQuadratic(positionsArray);
            });         
            
            straight.on('mouseover', function() {
                straight.stroke("0F9CA9");
                straight.opacity(0.8);
                figuresLayer.draw();
            });

            straight.on('mouseout', function() {
                straight.stroke("black");
                straight.opacity(1);
                figuresLayer.draw();
            });
        }

        function updateLines() {
            var s = straight;
            var straightLine = lineLayer.get('#straightLine')[0];
            //Update the lines when moved dinamically
            straightLine.setPoints([s.control1.attrs.x, s.control1.attrs.y, s.control2.attrs.x, 
                        s.control2.attrs.y, s.control3.attrs.x, s.control3.attrs.y, s.end.attrs.x, s.end.attrs.y]);    
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
                        if (X < 370) {
                            X = 370;
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
                        if (X > 530) {
                            X = 530;
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
                idSector = 0;
                drawCurves();
                updateLines();
                cleanSectors();
                Presentation.getOnLoadHandler().executeDivideSegments();
                Presentation.getPaintManagerHandler().restoreAllSectors();
                anchorLayer.draw(); 
            });

            //Add to the layer the anchor we've just created
            anchorLayer.add(anchor);
            return anchor;
        }

        function drawCurves() {
            var context = curveLayer.getContext();
            //Clear method avoid repeting the color and leave marks behind
            context.clear();
            curveLayer.destroyChildren();

            var ptsa =[straight.start.attrs.x,straight.start.attrs.y,
             straight.start.attrs.x-(straight.start.attrs.x)/5, straight.start.attrs.y+
             (straight.end.attrs.y-straight.start.attrs.y)/2,
                straight.end.attrs.x,
                straight.end.attrs.y];

            var pts = getCurvePoints(ptsa, 1,false, 16);              

            var line1 =  new Kinetic.Line({
                    x: 0,
                    y: 0,
                    points : pts , 
                    strokeWidth :3,
                    stroke: "black"   
            });

            curveLayer.add(line1);

            var ptsa1 = [straight.start.attrs.x,straight.start.attrs.y,
            straight.control1.attrs.x-(-straight.start.attrs.x+straight.control1.attrs.x)/2, straight.start.attrs.y+
             (straight.control1.attrs.y)/5,
             straight.control1.attrs.x,
            straight.control1.attrs.y];  

            var pts1 = getCurvePoints(ptsa1, 1,false, 16);

            var line2 =  new Kinetic.Line({
                    x: 0,
                    y: 0,
                    points : pts1 , 
                    strokeWidth :3,
                    stroke: "black"   
            });

            curveLayer.add(line2);
            curveLayer.draw();
        }       
        
        function fillBackground(pColor){
            var s = straight;

            var figureBackground = new Kinetic.Shape({
                sceneFunc: function(context) {

                    var ptsa =[straight.start.attrs.x,straight.start.attrs.y,
                            straight.start.attrs.x-(straight.start.attrs.x)/5, straight.start.attrs.y+
                            (straight.end.attrs.y-straight.start.attrs.y)/2,
                            straight.end.attrs.x, straight.end.attrs.y];
                
                    var pts = getCurvePoints(ptsa, 1,false, 16); 

                    var ptsa1 = [straight.start.attrs.x,straight.start.attrs.y,
                                straight.control1.attrs.x-(-straight.start.attrs.x+straight.control1.attrs.x)/2, straight.start.attrs.y+
                                (straight.control1.attrs.y)/5,
                                straight.control1.attrs.x,
                                straight.control1.attrs.y];

                    var pts1 = getCurvePoints(ptsa1, 1,false, 16); 
            
                    context.beginPath();
                    context.moveTo(s.start.attrs.x, s.start.attrs.y);
                    for(i=2;i<pts.length-1;i+=2) context.lineTo(pts[i], pts[i+1]);
                    context.lineTo(s.control3.attrs.x, s.control3.attrs.y);
                    context.lineTo(s.control2.attrs.x, s.control2.attrs.y);
                    context.lineTo(s.control1.attrs.x, s.control1.attrs.y);
                    for(i=pts1.length-1;i>2;i-=2) context.lineTo(pts1[i-1], pts1[i]);
                    context.closePath();
                    context.fillStrokeShape(this);
                },
                fill: pColor
            });

            backgroundLayer.add(figureBackground);
            backgroundLayer.draw();
        }

        function fillExternBackground(){
            var s = straight;

            var figureBackground = new Kinetic.Shape({
                sceneFunc: function(context) {

                    var ptsa =[straight.start.attrs.x,straight.start.attrs.y,
                                 straight.start.attrs.x-(straight.start.attrs.x)/5, straight.start.attrs.y+
                                 (straight.end.attrs.y-straight.start.attrs.y)/2,
                                straight.end.attrs.x,
                                straight.end.attrs.y];

                    var pts = getCurvePoints(ptsa, 1,false, 16); 

                    var ptsa1 = [straight.start.attrs.x,straight.start.attrs.y,
                                straight.control1.attrs.x-(-straight.start.attrs.x+straight.control1.attrs.x)/2, straight.start.attrs.y+
                                 (straight.control1.attrs.y)/5,
                                 straight.control1.attrs.x,
                                straight.control1.attrs.y];

                    var pts1 = getCurvePoints(ptsa1, 1,false, 16); 
                
                    context.beginPath();
                    context.moveTo(0 , 0);
                    context.lineTo(s.start.attrs.x, s.start.attrs.y);
                    for(i=2;i<pts.length-1;i+=2) context.lineTo(pts[i], pts[i+1]);
                    context.lineTo(s.control3.attrs.x, s.control3.attrs.y);
                    context.lineTo(s.control2.attrs.x, s.control2.attrs.y);
                    context.lineTo(s.control1.attrs.x, s.control1.attrs.y);
                    for(i=pts1.length-1;i>2;i-=2) context.lineTo(pts1[i-1], pts1[i]);
                    context.lineTo(0, 0);
                    context.lineTo(650, 0);
                    context.lineTo(650, 350);
                    context.lineTo(0, 350);
                    context.lineTo(0, 0);
                    context.closePath();
                    context.fillStrokeShape(this);
                },
                
                fill: "white",
                id: "externBackground"
            });
            
            lineLayer.add(figureBackground);
            figureBackground.getParent().moveToTop();
            lineLayer.draw();
        }

        function fillSole(pColor, pStrokeWidth){
            var s = straight;
            var fillSole = new Kinetic.Line({
                points: [s.end.attrs.x, s.end.attrs.y, s.control3.attrs.x, s.control3.attrs.y],
                stroke: pColor,
                strokeWidth: pStrokeWidth
            });

            figuresLayer.add(fillSole);
            figuresLayer.draw();
        }

        function reduceAnchors(){
            var anchorArray = anchorLayer.getChildren();
            for(var i = 0; i < anchorArray.length; i++){
                anchorArray[i].radius(0);
            }
            anchorLayer.draw();
        }

        function defaultAnchors(){
            var anchorArray = anchorLayer.getChildren();
            for(var i = 0; i < anchorArray.length; i++){
                anchorArray[i].radius(15);
            }
            anchorLayer.draw();
        }

        function cleanFigures(){
            //Destroy all the children of the figures and labels
            figuresLayer.destroyChildren();
            backgroundLayer.destroyChildren();
            //Redraw them
            figuresLayer.draw();
            backgroundLayer.draw();
            //Now let's update the paint manager
            idLabel= 0;
            idSector = 0;

            Presentation.getPaintManagerHandler().deleteAllElements();
            defaultAnchors();
        }

        function cleanSectors(){
            var childrenSectors = backgroundLayer.get('Line');
            Presentation.getPaintManagerHandler().deleteAllSectors();
            for(var i = 0; i < childrenSectors.length; i++){
                if(childrenSectors[i].name() == "polygon")
                    childrenSectors[i].remove();
            }  
            backgroundLayer.draw();
        }

        function cleanJustFigures(){
            //Destroy all the children of the figures and labels
            figuresLayer.destroyChildren();
            backgroundLayer.destroyChildren();
            //Redraw them
            figuresLayer.draw();
            backgroundLayer.draw();
            idLabel= 0;
        }

        function exchangeCircleIds(pId, pId2){
            var children = figuresLayer.getChildren();
            children[pId].id(children[pId2]);
            children[pId2].id(children[pId]); 
        }

        function exchangeLinesIds(pId, pId2){
            var children = figuresLayer.getChildren();
            children[pId].id(children[pId2]);
            children[pId2].id(children[pId]); 
        }

        function paintSector(pPolygon, pColor){
            var poly =  new Kinetic.Line({
                points : pPolygon,
                draggable : false, 
                color: pColor,
                opacity:1,   
                closed:true,
                name: "polygon",
                fill: pColor
            });
            backgroundLayer.add(poly);
            backgroundLayer.draw();
        }

        function paintPolygon(pPolygon, pColor){
            var poly =  new Kinetic.Line({
                points : pPolygon,
                draggable : false, 
                color: pColor,
                opacity:1,   
                closed:true,
                name: "polygon",
                id: idSector
            });
            idSector += 1;

            poly.on('mouseover', function(){
                poly.fill("97FFF1");
                poly.opacity(0.8);
                backgroundLayer.drawScene();
            });

            poly.on('mouseout', function() {
                poly.fill("");
                poly.opacity(1);
                backgroundLayer.drawScene();
            });

            var borderObj = LibraryData.createBorder(poly.getAttr("points"), "");
            //Send the object created to the PAINT MANAGER that centralizes everything
            Presentation.getPaintManagerHandler().sendBorderToPaintManager(borderObj);

            poly.on('click', function(){
                Presentation.getAlertsUI().changeColorZones(borderObj, this.id());
            });

            backgroundLayer.add(poly);
            poly.getParent().moveToBottom();
            backgroundLayer.draw();
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
            drawLineFire : drawLineFire,
            drawCircle : drawCircle,
            drawCircleFire : drawCircleFire,
            dragElementsIntoCanvas: dragElementsIntoCanvas,
            cleanFigures : cleanFigures,
            cleanJustFigures : cleanJustFigures,
            fillBackground : fillBackground,
            fillSole : fillSole,
            reduceAnchors : reduceAnchors,
            exchangeCircleIds : exchangeCircleIds,
            exchangeLinesIds : exchangeLinesIds,
            fillExternBackground : fillExternBackground,
            getLineLayer : getLineLayer,
            paintPolygon : paintPolygon,
            drawRectangleArcade : drawRectangleArcade,
            drawCircleArcade : drawCircleArcade,
            paintSector : paintSector
        };            
    })()

}(Presentation, jQuery));

var strokeWidthAlert = 0, radiusAlert = 0, strokeColorAlert = "", fillColorAlert = "";
var idLabel = 0, nameCircle = 0, nameLine = 0, pts = [], pts1 = [];
var pointIntersect = new Array(), idSector = 0;
