(function( root ){
	/**
	 * PARAMS
	 * ------
	 *  pie:        pie is an object which contains the next structure -> { x, y, radius }.
	 *  values:     It can be an array with any kind of value you like to represent in the pie chart -> [ float, ... ],
   *                or an array of object containing the values with the color (hexadecimal or rgb) for that pie -> [ { value, color } ] 
   *  arcOpts:    Options to change the pie characteristics and behavior -> { stroke, strokeColor, lineWidth, angleStart }
   *  easingOpts: { easing, duration }
	 * 
	 */
	function pieChart( args ) {
    arcOpts    = args.arcOpts || {};
    pie        = args.pie || { x: 100, y: 100, radius: 50 };
    values     = args.values;
    arcOpts    = args.arcOpts;
    easingOpts = args.easingOpts;

    var ctx = this.canvas().getContext( '2d' );
    
    if ( !easingOpts ) {
      drawPie.call( this, ctx, pie, values, arcOpts );
    } else {
      drawAnimatedWholePie.call( this, ctx, pie, values, arcOpts, easingOpts );
    }

    this.replayOpts = { chart: 'pieChart', args: args };
	}

  /*
   *  Private functions
   */
  function composeSlice( pie, val, donut ) {
    if ( donut )
      return new CanvasGraphics.DonutSlice( pie, val );

    return new CanvasGraphics.SlicePie( pie, val );
  }

  function composeSlices( pie, values, donut ) {
    var slices = [];

    // Creating the pie slices
    values.forEach( function( obj ) {
      slices.push( composeSlice( pie, obj, donut ) );
    } );

    return slices;
  }

  function sumValues( values ) {
    var maxValue = 0;

    values.forEach( function( val ) { 
      if ( typeof val === 'object' ) {
        maxValue += val.value; 
      } else { 
        maxValue += val; 
      }
    } );

    return maxValue;
  }

  function drawPie( ctx, pie, values, opts ) {
    var pieSlice, startRadian, endRadian, maxValue = sumValues( values );

    if ( opts.angleStart ) {
      endRadian = startRadian = opts.angleStart * Math.PI / 180;
    }

    for( var i = 0; i < values.length; i++ ) {
      pieSlice  = composeSlice( pie, values[ i ] );
      endRadian += (pieSlice.value * (Math.PI * 2)) / maxValue;

      slicePie.draw( ctx, startRadian, endRadian, opts );

      startRadian += (pieSlice.value * (Math.PI * 2)) / maxValue;
    }
  }

  function drawSlice( pie, color, radian, maxRadian, opts ) {
    var slicePie = new CanvasGraphics.SlicePie( pie, color );
    
    slicePie.draw( radian, maxRadian, opts );

    return slicePie;
  }

  function drawAnimatedWholePie( ctx, pie, values, arcOpts, easingOpts ) {
    var lapse      = new CanvasGraphics.Lapse( easingOpts.duration ),
        maxValue   = sumValues( values ),
        slices     = composeSlices( pie, values, arcOpts.inner ), // Creating the pie slices 
        maxRadians = [],
        offsetRadian, endRadian, startRadian, stepMaxRadian;

    // Where the pie begins to be drawn (clockwise)
    if ( arcOpts.angleStart ) {
      offsetRadian = arcOpts.angleStart * Math.PI / 180;
    }

    // Store slices in the canvas state
    slices.forEach( function (slice) {
      this.state.addElement( slice );
    }.bind( this ));
    this.state.addListener( 'click', function() { console.log( 'click in' ); } );

    ( function drawFrame() {
        startRadian = offsetRadian;

        if ( lapse.check() ) {
          this.clear();

          startRadian = drawingWhole( ctx, slices, startRadian, stepMaxRadian, endRadian, maxValue, arcOpts );
          endRadian   = CanvasGraphics.Easings[ easingOpts.easing ]( 
            lapse.getElapsedTime(), 
            0, 
            Math.PI * 2,  
            easingOpts.duration );

          window.requestAnimationFrame( drawFrame.bind( this ) );
        } else {
          startRadian = drawingWhole( ctx, slices, startRadian, stepMaxRadian, Math.PI * 2, maxValue, arcOpts );
        }
    }.call( this ) );
  }

  function drawingWhole( ctx, slices, start, step, end, max, opts ) {
    slices.forEach( function( slice ) {
      step = slice.value * end / max;
      slice.draw( ctx, start, step + start, opts );
      return start += step;
    } );
  }


	
  if ( typeof module != "undefined" && module !== null && module.exports ) {
		module.exports = CanvasGraphics;
	} else if ( typeof define === "function" && define.amd ) {
		define( function() { return CanvasGraphics; } );
	} else {
		if ( !root.CanvasGraphics ) { 
      root.CanvasGraphics = {};
    }
    root.CanvasGraphics.prototype.pieChart = pieChart;
	}
}( self ));