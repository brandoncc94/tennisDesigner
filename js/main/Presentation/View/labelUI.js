/*!
 * All Rights Reserved
 * This software is proprietary information of
 * Brandon Campos Calderón - Juan Carlos Martínez
 * Use is subject to license terms.
 * Filename: labelUI.js
 */

 /*
  * Author:      brandonc94@gmail.com
  * Date:        11/03/2014
  * Description: Labels to paint 
  */

/*
 * Global Presentation Layer to be used with MVC Pattern
 * @namespace
 */
(function (pContext, $) {
    //'use strict'

    /**
     * Public method to return a reference of getLabelUI.
     * 
     * @return {LabelUI} View declarations of the MVC.
         * @public
     */

    pContext.getLabelUI = function() {
        return LabelUI;
    };

    var LabelUI = (function () {
        backgroundLayer = Presentation.getDesignSpace().getBackgroundLayer();
        
        function init(pType, pPosition) {
            // Singleton
            load();

            //Load the graphical label with empty text
            function load(){
                var group = new Kinetic.Group({
                    draggable: true
                });

                labelText = new Kinetic.Text({
                    x: pPosition[0],
                    y: pPosition[1],
                    text: pType,
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
            labelText.setText(pType + pColor);
            backgroundLayer.draw();
        }

        return{
            init:init,
            changeName:changeName
        };        
    })();

}(Presentation, jQuery));