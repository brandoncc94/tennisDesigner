$(function(){
      //We declare the stage to be working on 
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
          dashArray: [10, 10, 0, 10],
          strokeWidth: 2,
          stroke: 'black',
          lineCap: 'round',
          id: 'straightLine',
          points: [0, 0]
        });

        lineLayer.add(straight);

        straight = {
          start: buildAnchor(150, 100),
          control1: buildAnchor(300, 100),
          control2: buildAnchor(375, 175),
          control3: buildAnchor(450, 250),
          end: buildAnchor(150, 250)
        };

        // Sincronyze the curve lines with the straigth ones
        anchorLayer.on('beforeDraw', function() {
          drawCurves();
          updateDottedLines();
        });

        stage.add(curveLayer);
        stage.add(lineLayer);
        stage.add(anchorLayer);

        drawCurves();
        updateDottedLines();


      // globals

      var curveLayer, lineLayer, anchorLayer, straight
      
      function updateDottedLines() {
        var s = straight;

        var straightLine = lineLayer.get('#straightLine')[0];

        straightLine.setPoints([s.control1.attrs.x, s.control1.attrs.y, s.control2.attrs.x, s.control2.attrs.y, s.control3.attrs.x, s.control3.attrs.y, s.end.attrs.x, s.end.attrs.y]);
        lineLayer.draw();
      }

      function buildAnchor(x, y) {
        var anchor = new Kinetic.Circle({
          x: x,
          y: y,
          radius: 20,
          stroke: '#666',
          fill: '#ddd',
          strokeWidth: 2,
          draggable: true
        });

        // add hover styling
        anchor.on('mouseover', function() {
          document.body.style.cursor = 'pointer';
          this.setStrokeWidth(4);
          anchorLayer.draw();
        });
        anchor.on('mouseout', function() {
          document.body.style.cursor = 'default';
          this.setStrokeWidth(2);
          anchorLayer.draw();
          
        });

        anchor.on('dragend', function() {
          drawCurves();
          updateDottedLines();
        });

        anchorLayer.add(anchor);
        return anchor;
      }

      function drawCurves() {
        var context = curveLayer.getContext();

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
});