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
            
               
            // for (var i = 0; i < 50; i++) {
            //     var X = 110+i;
            //     var a = curveLayer.getAllIntersections({x: X ,  y : 231 });
            //     if(true){
            //         alert(a);    
            //     }
                
            // }
                

            
            
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

        function drawCircleArcade(pPosX, pPosY, pRadius, pFillColor, pStrokeWidth, pStrokeColor){
            var maxRadius = parseInt(pRadius) - parseInt(pStrokeWidth);
            for(var i = parseInt(pRadius); i > 0; i--){
                var circle = new Kinetic.Circle({
                    x: pPosX,
                    y: pPosY,
                    radius: i,
                    stroke: (i <= maxRadius) ? pFillColor : pStrokeColor,
                    strokeWidth: pStrokeWidth
                });

                figuresLayer.add(circle);
                figuresLayer.draw();    
            }
        }

        function drawCircle(pPosX, pPosY, pRadius, pFillColor, pStrokeWidth, pStrokeColor){
            var circle = new Kinetic.Circle({
                x: pPosX,
                y: pPosY,
                radius: pRadius,
                stroke: "#000",
                strokeWidth: 1,
                draggable: true,
                id: idLabel
            });

            figuresLayer.add(circle);
            figuresLayer.draw();
            
            var points = LibraryData.createPoint(pPosX, pPosY);
            var label = Presentation.getLabelUI();

            //Create the object and send it to the paint manager
            var circleRef = LibraryData.createCircle(points, pRadius, pStrokeWidth, pStrokeColor, pFillColor);

            var cad = "Radius: " + pRadius + "\n" + "Stroke Width: " + pStrokeWidth + "\n" + "Stroke Color: " + pStrokeColor + "\n" + "Fill Color: " + pFillColor;
            label.init(cad , [pPosX, pPosY], idLabel);    
            
            idLabel+=1;                
            Presentation.getPaintManagerHandler().sendCircleToPaintManager(circleRef);

            circle.on('click', function() {
                Presentation.getAlertsUI().changeFeatureDialog(circle, label, false, circleRef);
            });

            circle.on('dragend', function() {
                circleRef.setPointsFigure(LibraryData.createPoint(circle.getPosition().x, circle.getPosition().y));
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

         function convertRadiansToDegrees(rad){
            return rad*(180/Math.PI);
         }

        function calculateDistance(x1, y1, x2, y2) {
            return Math.sqrt((x2 - x1) * (x2 - x1) + (y2 - y1) * (y2 - y1));
        }

        function drawLineArcade(pPosX1, pPosY1, pPosX2, pPosY2, pStrokeWidth, pStrokeColor){
            var half = Math.floor(parseInt(pStrokeWidth) / 2);
            if(parseInt(pStrokeWidth) % 2 == 0){
                half -=1;
            }

            var startingX1 = parseInt(pPosX1);
            var endingX1 = parseInt(pPosX2);

            var startingY1 = parseInt(pPosY1);
            var endingY1 = parseInt(pPosY2);

            var rectWidth = calculateDistance(startingX1, startingY1, endingX1, endingY1);

            if(startingX1 > endingX1 && startingY1 < endingY1){
                //we have the maximum X's value and add to it the half cause the stroke expands
                var x = Math.max(startingX1, endingX1) + half;
                //we have the minimum Y's value and add the stroke width of the line in edit, 3 in this case.
                var y = Math.min(startingY1, endingY1) + 3;  
            }else if(startingX1 < endingX1 && startingY1 > endingY1){
                //we have the maximum X's value and add to it the half cause the stroke expands
                var x = Math.min(startingX1, endingX1) - half;
                //we have the minimum Y's value and add the stroke width of the line in edit, 3 in this case.
                var y = Math.max(startingY1, endingY1) - 3;  
            }else if(startingX1 > endingX1 && startingY1 > endingY1){
                //we have the maximum X's value and add to it the half cause the stroke expands
                var x = Math.max(startingX1, endingX1) - half;
                //we have the minimum Y's value and add the stroke width of the line in edit, 3 in this case.
                var y = Math.max(startingY1, endingY1) + 3;                  
            }else{
                //we have the maximum X's value and add to it the half cause the stroke expands
                var x = Math.min(startingX1, endingX1) + 3;
                //we have the minimum Y's value and add the stroke width of the line in edit, 3 in this case.
                var y = Math.min(startingY1, endingY1) - half;   
            }

            var rectLine = new Kinetic.Rect({
                x: x,
                y: y,
                width: rectWidth,
                height: pStrokeWidth,
                fill: pStrokeColor
            });    

            var angle = convertRadiansToDegrees(Math.atan2(pPosY2-pPosY1,pPosX2-pPosX1));
            rectLine.rotate(angle);

            figuresLayer.add(rectLine);
            figuresLayer.draw(); 
        }
    

        function drawLine(pPosX1, pPosY1, pPosX2, pPosY2, pStrokeWidth, pStrokeColor){
            var straight = new Kinetic.Line({
                strokeWidth: 3,
                stroke: 'black',
                points: [pPosX1, pPosY1, pPosX2, pPosY2],
                draggable: true,
                id: idLabel
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

            var cad = "Stroke Width: " + pStrokeWidth + "\n" + "Stroke Color: " + pStrokeColor + "\n" + "Points: [" + pPosX1 + ", " + pPosY1 + "] , " + "[" + pPosX2 + "," + pPosY2 + "]";
            label.init(cad , [pPosX2, pPosY2], idLabel);
            idLabel+=1;
            Presentation.getPaintManagerHandler().sendLineToPaintManager(lineRef);

            straight.on('click', function() {
                Presentation.getAlertsUI().changeLineFeatureDialog(straight, label, false, lineRef);
            });

            straight.on('dragend', function() {
                var lineObj = Presentation.getOnLoadDesignsHandler().updateLine(this, lineRef);    
                //Just update the label and redraw the line layer to make it visible
                var positionsArray = [lineObj.getPointsFigure().getPositionX().getPositionX(), lineObj.getPointsFigure().getPositionX().getPositionY(),
                                       lineObj.getPointsFigure().getPositionY().getPositionX(), lineObj.getPointsFigure().getPositionY().getPositionY()];

                var cad = "Stroke Width: " + lineObj.getStrokeWidth() + "\n" + "Stroke Color: " + lineObj.getStrokeColor()   + "\n" + 
                          "Points: [" + positionsArray[0] + ", " + positionsArray[1] + "] , " + 
                          "[" + positionsArray[2] + "," + positionsArray[3] + "]";
                
                label.changeName(cad , "", straight.id());
                figuresLayer.draw();

                checkIntersection(positionsArray);
                checkIntersectionQuadratic(positionsArray);
            });

            checkIntersection(positionsArray);
            checkIntersectionQuadratic(positionsArray);           
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

        function checkIntersectionQuadratic(pLineObject){
            var ptsa1 = [straight.start.attrs.x,straight.start.attrs.y,
            straight.control1.attrs.x-(-straight.start.attrs.x+straight.control1.attrs.x)/2, straight.start.attrs.y+
             (straight.control1.attrs.y)/5,
             straight.control1.attrs.x,
            straight.control1.attrs.y];

            var pts1 = getCurvePoints(ptsa1);
            
            for (var i = 0; i+2 < pts1.length; i+=2) {
                pts1[i]
                var results  = checkLineIntersection(pLineObject[0],pLineObject[1],pLineObject[2],pLineObject[3],
                 pts1[i],pts1[i+1],pts1[i+2],pts1[i+3]);
                if(results.onLine1 == true && results.onLine2 == true){
                    alert(results.x +" "+ results.y);
               }
            };

            var ptsa =[straight.start.attrs.x,straight.start.attrs.y,
             straight.start.attrs.x-(straight.start.attrs.x)/5, straight.start.attrs.y+
             (straight.end.attrs.y-straight.start.attrs.y)/2,
                straight.end.attrs.x,
                straight.end.attrs.y];
            var pts = getCurvePoints(ptsa, 1,false, 16);

            for (var i = 0; i+2 < pts.length; i+=2) {
                pts[i]
                var results  = checkLineIntersection(pLineObject[0],pLineObject[1],pLineObject[2],pLineObject[3],
                 pts[i],pts[i+1],pts[i+2],pts[i+3]);
                if(results.onLine1 == true && results.onLine2 == true){
                    alert(results.x +" "+ results.y);
               }
            };                                    
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
                //alert();
                //alert("x:"+anchor.getPosition().x+" Y:"+anchor.getPosition().y);
                drawCurves();
                updateLines();
                anchorLayer.draw(); 
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
            curveLayer.destroyChildren();


             var ptsa =[straight.start.attrs.x,straight.start.attrs.y,
             straight.start.attrs.x-(straight.start.attrs.x)/5, straight.start.attrs.y+
             (straight.end.attrs.y-straight.start.attrs.y)/2,
                straight.end.attrs.x,
                straight.end.attrs.y];
              
             var showPoints = false;

            // var l =  new Kinetic.Shape({
            //     drawFunc: function () {
            //         context.beginPath();    
            //         var pts = getCurvePoints(ptsa, 1,false, 16);
            //         context.moveTo(pts[0], pts[1]);
            //         for(i=2;i<pts.length-1;i+=2) context.lineTo(pts[i], pts[i+1]);
            //         context.stroke();
            //      },
            //     strokeWidth :3,
            //     stroke: "green"   

            // });
            var pts = getCurvePoints(ptsa, 1,false, 16);
            
            var line1 =  new Kinetic.Line({
                x: 0,
                y: 0,
                points : pts , 
                // drawFunc: function () {
                //     context.beginPath();        
                //     context.moveTo(pts[0], pts[1]);
                //     for(i=2;i<pts.length-1;i+=2) context.lineTo(pts[i], pts[i+1]);
                //     context.stroke();
                //  },
                strokeWidth :3,
                stroke: "green"   

            });

            var ptsa1 = [straight.start.attrs.x,straight.start.attrs.y,
            straight.control1.attrs.x-(-straight.start.attrs.x+straight.control1.attrs.x)/2, straight.start.attrs.y+
             (straight.control1.attrs.y)/5,
             straight.control1.attrs.x,
            straight.control1.attrs.y];

            var pts1 = getCurvePoints(ptsa1);
            var line2 = new Kinetic.Line({
                x: 0,
                y: 0,
                points: pts1,
                stroke: 'green',
                tension: 0,
                // drawFunc: function () {
                //     context.beginPath();
                //     context.moveTo(straight.start.attrs.x, straight.start.attrs.y);
                //     context.quadraticCurveTo(200,150,straight.control1.attrs.x, straight.control1.attrs.y);
                //     context.setAttr('strokeStyle', '#60a637');
                //     context.setAttr('lineWidth', 2);
                //     context.stroke();
                // },
                strokeWidth: 3,
                id : 2
            });

            curveLayer.add(line1);
            curveLayer.add(line2);
            curveLayer.draw();
            //canvasStage.add(curveLayer);
        }   

        

    function getCurvePoints(pts, tension, isClosed, numOfSegments) {

        // use input value if provided, or use a default value   
        tension = (typeof tension != 'undefined') ? tension : 0.5;
        isClosed = isClosed ? isClosed : false;
        numOfSegments = numOfSegments ? numOfSegments : 16;

        var _pts = [], res = [],    // clone array
            x, y,           // our x,y coords
            t1x, t2x, t1y, t2y, // tension vectors
            c1, c2, c3, c4,     // cardinal points
            st, t, i;       // steps based on num. of segments

        // clone array so we don't change the original
        _pts = pts.slice(0);

        // The algorithm require a previous and next point to the actual point array.
        // Check if we will draw closed or open curve.
        // If closed, copy end points to beginning and first points to end
        // If open, duplicate first points to befinning, end points to end
        if (isClosed) {
            _pts.unshift(pts[pts.length - 1]);
            _pts.unshift(pts[pts.length - 2]);
            _pts.unshift(pts[pts.length - 1]);
            _pts.unshift(pts[pts.length - 2]);
            _pts.push(pts[0]);
            _pts.push(pts[1]);
        }
        else {
            _pts.unshift(pts[1]);   //copy 1. point and insert at beginning
            _pts.unshift(pts[0]);
            _pts.push(pts[pts.length - 2]); //copy last point and append
            _pts.push(pts[pts.length - 1]);
        }

        // ok, lets start..


        // 1. loop goes through point array
        // 2. loop goes through each segment between the 2 pts + 1e point before and after
        for (i=2; i < (_pts.length - 4); i+=2) {
            for (t=0; t <= numOfSegments; t++) {

                // calc tension vectors
                t1x = (_pts[i+2] - _pts[i-2]) * tension;
                t2x = (_pts[i+4] - _pts[i]) * tension;

                t1y = (_pts[i+3] - _pts[i-1]) * tension;
                t2y = (_pts[i+5] - _pts[i+1]) * tension;

                // calc step
                st = t / numOfSegments;

                // calc cardinals
                c1 =   2 * Math.pow(st, 3)  - 3 * Math.pow(st, 2) + 1; 
                c2 = -(2 * Math.pow(st, 3)) + 3 * Math.pow(st, 2); 
                c3 =       Math.pow(st, 3)  - 2 * Math.pow(st, 2) + st; 
                c4 =       Math.pow(st, 3)  -     Math.pow(st, 2);

                // calc x and y cords with common control vectors
                x = c1 * _pts[i]    + c2 * _pts[i+2] + c3 * t1x + c4 * t2x;
                y = c1 * _pts[i+1]  + c2 * _pts[i+3] + c3 * t1y + c4 * t2y;

                //store points in array
                res.push(x);
                res.push(y);
            }
        }
        return res;
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

            var ptsa =[straight.start.attrs.x,straight.start.attrs.y,
                        straight.start.attrs.x-(straight.start.attrs.x)/5, straight.start.attrs.y+(straight.end.attrs.y-straight.start.attrs.y)/2,
                        straight.end.attrs.x, straight.end.attrs.y];

            var pts = getCurvePoints(ptsa, 1,false, 16);

            var ptsa1 = [straight.start.attrs.x,straight.start.attrs.y,
            straight.control1.attrs.x-(-straight.start.attrs.x+straight.control1.attrs.x)/2, straight.start.attrs.y+
             (straight.control1.attrs.y)/5,
             straight.control1.attrs.x,
            straight.control1.attrs.y];

            var pts1 = getCurvePoints(ptsa1);

            var figureBackground = new Kinetic.Shape({
                sceneFunc: function(context) {
                  context.beginPath();
                  //context.quadraticCurveTo(100,150,s.end.attrs.x, s.end.attrs.y);

                  for(var i = 0; i< pts1.length; i+=2){
                    if(i == 0)
                        context.moveTo(pts1[i], pts1[i+1]);
                    else
                        context.lineTo(pts1[i], pts1[i+1]);
                  }
                  context.lineTo(s.control1.attrs.x, s.control1.attrs.y);
                  context.lineTo(s.control2.attrs.x, s.control2.attrs.y);
                  context.lineTo(s.control3.attrs.x, s.control3.attrs.y);
                  context.lineTo(s.end.attrs.x, s.end.attrs.y);

                  for(var i = 0; i< pts.length; i+=2){
                    if(i == 0)
                        context.moveTo(pts1[i], pts1[i+1]);
                    else
                        context.lineTo(pts1[i], pts1[i+1]);
                  }
                  /*for(var i = 15; i > 0 ; i-=2)
                    context.lineTo(pts[i], pts[i-1]);
                  for(var i = 15; i > 0 ; i-=2)
                    context.lineTo(pts1[i], pts1[i-1]);*/
                  //context.quadraticCurveTo(200,150,s.start.attrs.x, s.start.attrs.y);
                  context.closePath();
                  // KineticJS specific context method
                  context.fillStrokeShape(this);
                },
                fill: pColor
            });

            backgroundLayer.add(figureBackground);

            backgroundLayer.draw();
        }

        function fillSole(pColor){
            var s = straight;

            var fillSole = new Kinetic.Line({
                points: [s.end.attrs.x, s.end.attrs.y, s.control3.attrs.x, s.control3.attrs.y],
                stroke: pColor,
                strokeWidth: 2
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
            Presentation.getPaintManagerHandler().deleteAllElements();
            defaultAnchors();
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
            drawLineArcade : drawLineArcade,
            drawCircle : drawCircle,
            drawCircleFire : drawCircleFire,
            drawCircleArcade : drawCircleArcade,
            dragElementsIntoCanvas: dragElementsIntoCanvas,
            cleanFigures : cleanFigures,
            cleanJustFigures : cleanJustFigures,
            fillBackground : fillBackground,
            fillSole : fillSole,
            reduceAnchors : reduceAnchors
        };            
    })();

}(Presentation, jQuery));


var strokeWidthAlert = 0, radiusAlert = 0, strokeColorAlert = "", fillColorAlert = "";
var idLabel = 0;