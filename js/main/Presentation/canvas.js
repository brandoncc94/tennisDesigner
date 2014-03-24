$(function(){
      //Some part were taken from: http://www.html5canvastutorials.com/kineticjs/html5-canvas-drag-and-drop-events-tutorial/
      /*function getMousePosition(pCanvas, pEvt) {
        var rect = pCanvas.getBoundingClientRect();
        return {
          x: pEvt.clientX - rect.left,
          y: pEvt.clientY - rect.top
        };
      }*/

      
      var canvas = document.getElementById('canvas-container');
      var context = canvas.getContext('2d');
    
      function drawDefault(){
          //Draw default circles to move the scheme
          drawCircle(150, 100, 12, 2, 2, '#000000', '#009999');
          drawCircle(300, 100, 12, 2, 2, '#000000', '#009999');
          drawCircle(150, 250, 12, 2, 2, '#000000', '#009999');
          drawCircle(450, 250, 12, 2, 2, '#000000', '#009999');

          //Draw linear functions
          drawLinear(150, 250, 450, 250);
          drawLinear(300, 100, 450, 250);

          //Draw Quadratic function
          drawQuadratic(150, 100, 150, 250, 100, 150);
          drawQuadratic(150, 100, 300, 100, 200, 150);
      }

      function drawCircle(pPosX, pPosY, pRadius, pEndAngle, pStrokeWidth, pStrokeColor, pFillColor){
          context.beginPath();
          context.arc(pPosX, pPosY, pRadius, 0, pEndAngle * Math.PI, false);
          context.fillStyle = pFillColor;
          context.fill();
          context.lineWidth = pStrokeWidth;
          context.strokeStyle = pStrokeColor;
          context.stroke();
      }

      function drawLinear(pStartPosX, pStartPosY, pEndPosX, pEndPosY){
          context.beginPath();
          context.moveTo(pStartPosX, pStartPosY);
          context.lineTo(pEndPosX, pEndPosY);
          context.stroke();
      }

      function drawQuadratic(pStartPosX, pStartPosY, pEndPosX, pEndPosY, pXContext, pYContext){
          context.beginPath();
          context.moveTo(pStartPosX, pStartPosY);
          context.quadraticCurveTo(pXContext, pYContext, pEndPosX, pEndPosY);
          context.lineWidth = 2;
          context.stroke();
      }

      //canvas.addEventListener('mousemove', function(pEvt) {
      //  var mousePosition = getMousePosition(canvas, pEvt);
        //alert('Mouse position: ' + mousePosition.x + ',' + mousePosition.y);
      //}, false);
});