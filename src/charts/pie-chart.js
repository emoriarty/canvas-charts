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
	function pieChart( args ) {
    arcOpts    = args.arcOpts || {};
    pie        = args.pie || { x: 100, y: 100, radius: 50 };
    values     = args.values;
    arcOpts    = args.arcOpts;
    easingOpts = args.easingOpts;

    var ctx = this.canvas().getContext( '2d' );
    
    if ( !easingOpts ) {
      drawPie( ctx, pie, values, arcOpts );
    } else {

      if ( easingOpts.whole )
        drawAnimatedWholePie.call( this, ctx, pie, values, arcOpts, easingOpts );
      else
        drawAnimatedPieBySlice.call( this, ctx, pie, values, arcOpts, easingOpts );
    }

    this.replayOpts = { chart: 'pieChart', args: args };
	}


  // Private functions
  function composeSlice( val ) {
    var obj = {};

    if ( typeof val === 'object' ) {
      obj.value = val.value;
      obj.color = val.color;
    } else {
      obj.value = val;
      obj.color = '#' + ( Math.round( 16733683 * Math.random() ) ).toString( 16 );
    }

    return obj;
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
    var sliceVal, startRadian, endRadian,
        maxValue = sumValues( values );

    startRadian = endRadian = 0;

    if ( opts.angleStart ) {
      endRadian = startRadian = opts.angleStart * Math.PI / 180;
    }

    for( var i = 0; i < values.length; i++ ) {
      sliceVal  = composeSlice( values[ i ] );
      endRadian += ((sliceVal.value * (Math.PI * 2)) / maxValue );

      drawSlice( ctx, pie, sliceVal.color, startRadian, endRadian, opts );

      startRadian += ((sliceVal.value * (Math.PI * 2)) / maxValue );
    }
  }

  function drawSlice( ctx, pie, color, radian, maxRadian, opts ) {
    var slicePie = new CanvasGraphics.SlicePie( pie, color );
    
    slicePie.draw( ctx, radian, maxRadian, opts );

    return slicePie;
  }

  function drawAnimatedPieBySlice( ctx, pie, values, arcOpts, easingOpts ) {
    var maxRadians   = [],
        lapse        = new CanvasGraphics.Lapse( easingOpts.duration ),
        maxValue     = sumValues( values ),
        sliceVal     = composeSlice( values.shift() ),
        offsetRadian, startRadian, loopRadian, endRadian;
    
    offsetRadian = startRadian = loopRadian = endRadian = 0;

    if ( arcOpts.angleStart ) {
      offsetRadian = arcOpts.angleStart * Math.PI / 180;
      loopRadian = startRadian = offsetRadian;
    }

    ( function drawFrame() {
        endRadian = (sliceVal.value * (Math.PI * 2)) / maxValue ;

        if ( lapse.check() && loopRadian < endRadian + startRadian ) {
          this.clear();
          maxRadians.forEach( function( obj ) {
            drawSlice( ctx, pie, obj.color, obj.r, obj.mxr + obj.r, arcOpts );  
          } );
          drawSlice( ctx, pie, sliceVal.color, startRadian, loopRadian, arcOpts );

          loopRadian = CanvasGraphics.Easings[ easingOpts.easing ]( lapse.getElapsedTime(), 
            0, 
            Math.PI * 2,  
            easingOpts.duration ) + offsetRadian;

        } else {
          drawSlice( ctx, pie, sliceVal.color, startRadian, endRadian + startRadian, arcOpts );
          maxRadians.push( { r: startRadian, mxr: endRadian, color: sliceVal.color } );

          startRadian += endRadian;
          sliceVal    = composeSlice( values.shift() );
        }

        if ( endRadian < Math.PI * 2 ) window.requestAnimationFrame( drawFrame.bind( this ) );
    }.call( this ) );
  }

  function drawingWhole( ctx, pie, slices, start, step, end, max, opts ) {
    slices.forEach( function( slice ) {
      step = slice.value * end / max;
      drawSlice( ctx, pie, slice.color, start, step + start, opts );
      return start += step;
    } );
  }

  function drawAnimatedWholePie( ctx, pie, values, arcOpts, easingOpts ) {
    var lapse        = new CanvasGraphics.Lapse( easingOpts.duration ),
        maxValue     = sumValues( values ),
        maxRadians, composedValues,
        offsetRadian, endRadian, startRadian, stepMaxRadian;
    
    maxRadians = composedValues = [];
    offsetRadian = endRadian = startRadian = stepMaxRadian = 0;

    if ( arcOpts.angleStart ) {
      offsetRadian = arcOpts.angleStart * Math.PI / 180;
    }

    values.forEach( function( obj ) {
      composedValues.push( composeSlice( obj ) );
    } );
    

    ( function drawFrame() {
        startRadian = offsetRadian;

        if ( lapse.check() ) {
          this.clear();

          startRadian = drawingWhole( ctx, pie, composedValues, startRadian, stepMaxRadian, endRadian, maxValue, arcOpts );

          endRadian = CanvasGraphics.Easings[ easingOpts.easing ]( lapse.getElapsedTime(), 
            0, 
            Math.PI * 2,  
            easingOpts.duration );

          window.requestAnimationFrame( drawFrame.bind( this ) );
        } else {
          startRadian = drawingWhole( ctx, pie, composedValues, startRadian, stepMaxRadian, Math.PI * 2, maxValue, arcOpts );
        }
    }.call( this ) );
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
