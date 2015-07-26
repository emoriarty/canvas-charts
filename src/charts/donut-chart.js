(function( root ){
	/**
	 * PARAMS
	 * ------
	 *  pie:        pie is an object which contains the next structure -> { x, y, radius }.
	 *  values:     It can be an array with any kind of value you like to represent in the pie chart -> [ float, ... ],
   *                or an array of object containing the values with the color (hexadecimal or rgb) for that pie -> [ { value, color } ] 
   *  arcOpts:    Options to change the pie characteristics and behavior -> { stroke, strokeColor, lineWidth, angleStart }
   *  easingOpts: { easing, duration, whole: true|false }
	 * 
	 */
	function donutChart( args ) {
    args.arcOpts.inner = true;

    this.pieChart( args );
    this.replayOpts = { chart: 'donutChart', args: args };
	}



  if ( typeof module != "undefined" && module !== null && module.exports ) {
		module.exports = CanvasGraphics;
	} else if ( typeof define === "function" && define.amd ) {
		define( function() { return CanvasGraphics; } );
	} else {
		if ( !root.CanvasGraphics ) { 
      root.CanvasGraphics = {};
    }
    root.CanvasGraphics.prototype.donutChart = donutChart;
	}
}( self ));
