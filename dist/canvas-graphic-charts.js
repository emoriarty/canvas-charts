/*! CanvasGraphicCharts 0.0.1 */
(function( root ){

	if (true)
	{
		console.log("Library started");
	}

  // Main section
  /**
   * PARAMS
   * ------
   *  opts
   *    id: canvas id tag
   */
	function CanvasGraphics( opts ) {
		this.opts = initOptions( opts );
		this.cnvs = init( this.opts );
	}

  /**
   * Returns the current working canvas
   *
   * PARAMS
   * ------
   *  canvas: new canvas object 
   */
  CanvasGraphics.prototype.canvas = function( canvas ) {
    if ( typeof canvas !== 'undefined' ) {
      this.cnvs = canvas;
      this.opts.id = canvas.id;
    }

    return this.cnvs;
  };

	CanvasGraphics.prototype.clear = function() {
    var ctx = this.canvas().getContext( '2d' );

    ctx.clearRect( 0, 0, this.canvas().width, this.canvas().height );
	};


  CanvasGraphics.prototype.replay = function() {
    this.clear();
    if ( this.replayOpts ) {
      this[ this.replayOpts.chart ]( this.replayOpts.args );
    }
  };

  // Private functions
  function initOptions( opts ) {
    return {
      id: opts.id || 'canvas-graphic',
    };
  }

  function init( opts ) {
    var canvas;

    if ( opts.id ) {
      canvas = document.getElementById( opts.id );
    }

    return canvas;
  }
	
  if ( typeof module != "undefined" && module !== null && module.exports ) {
		module.exports = CanvasGraphics;
	} else if ( typeof define === "function" && define.amd ) {
		define( function() { return CanvasGraphics; } );
	} else {
		root.CanvasGraphics = CanvasGraphics;
	}
}( self ));

(function( root ){

	if (true)
	{
		console.log("Library started");
	}

  // Global vars
  var NOT_EASING_FUNCTIONS = [ 'easings' ],
      EASING_PROPS;

  /**
   * Params for all functions
   * ------------------------
   * t: current time
   * b: start value
   * c: change in value
   * d: duration
   */
  function Easings() {}

  Easings.linearTween = function ( t, b, c, d ) {
    return c * t / d + b;
  };

  Easings.easeInQuad = function ( t, b, c, d ) {
    t /= d;
    return c * t * t + b;
  };

  Easings.easeOutQuad = function ( t, b, c, d ) {
    t /= d;
    return -c * t * ( t - 2 ) + b;
  };

  Easings.easeInOutQuad = function ( t, b, c, d ) {
    t /= d / 2;
    if ( t < 1 ) return c / 2 * t * t + b;
    t--;
    return -c / 2 * ( t * ( t - 2 ) - 1 ) + b;
  };

  Easings.easeInCubic = function (t, b, c, d) {
    t /= d;
    return c*t*t*t + b;
  };

  Easings.easeOutCubic = function (t, b, c, d) {
    t /= d;
    t--;
    return c*(t*t*t + 1) + b;
  };

  Easings.easeInOutCubic = function (t, b, c, d) {
    t /= d/2;
    if (t < 1) return c/2*t*t*t + b;
    t -= 2;
    return c/2*(t*t*t + 2) + b;
  };

  Easings.easeInQuart = function (t, b, c, d) {
    t /= d;
    return c*t*t*t*t + b;
  };

  Easings.easeOutQuart = function (t, b, c, d) {
    t /= d;
    t--;
    return -c * (t*t*t*t - 1) + b;
  };

  Easings.easeInOutQuart = function (t, b, c, d) {
    t /= d/2;
    if (t < 1) return c/2*t*t*t*t + b;
    t -= 2;
    return -c/2 * (t*t*t*t - 2) + b;
  };

  Easings.easeInQuint = function (t, b, c, d) {
    t /= d;
    return c*t*t*t*t*t + b;
  };

  Easings.easeOutQuint = function (t, b, c, d) {
    t /= d;
    t--;
    return c*(t*t*t*t*t + 1) + b;
  };

  Easings.easeInOutQuint = function (t, b, c, d) {
    t /= d/2;
    if (t < 1) return c/2*t*t*t*t*t + b;
    t -= 2;
    return c/2*(t*t*t*t*t + 2) + b;
  };

  Easings.easeInSine = function (t, b, c, d) {
    return -c * Math.cos(t/d * (Math.PI/2)) + c + b;
  };

  Easings.easeOutSine = function (t, b, c, d) {
    return c * Math.sin(t/d * (Math.PI/2)) + b;
  };

  Easings.easeInOutSine = function (t, b, c, d) {
    return -c/2 * (Math.cos(Math.PI*t/d) - 1) + b;
  };


  Easings.easeInExpo = function (t, b, c, d) {
    return c * Math.pow( 2, 10 * (t/d - 1) ) + b;
  };

  Easings.easeOutExpo = function (t, b, c, d) {
    return c * ( -Math.pow( 2, -10 * t/d ) + 1 ) + b;
  };

  Easings.easeInOutExpo = function (t, b, c, d) {
    t /= d/2;
    if (t < 1) return c/2 * Math.pow( 2, 10 * (t - 1) ) + b;
    t--;
    return c/2 * ( -Math.pow( 2, -10 * t) + 2 ) + b;
  };

  Easings.easeInCirc = function (t, b, c, d) {
    t /= d;
    return -c * (Math.sqrt(1 - t*t) - 1) + b;
  };

  Easings.easeOutCirc = function (t, b, c, d) {
    t /= d;
    t--;
    return c * Math.sqrt(1 - t*t) + b;
  };

  Easings.easeInOutCirc = function (t, b, c, d) {
    t /= d/2;
    if (t < 1) return -c/2 * (Math.sqrt(1 - t*t) - 1) + b;
    t -= 2;
    return c/2 * (Math.sqrt(1 - t*t) + 1) + b;
  };

  Easings.outElastic = function(t, b, c, d) {
    var ts=(t/=d)*t;
    var tc=ts*t;
    return b+c*(31.345*tc*ts + -98.5825*ts*ts + 114.58*tc + -59.29*ts + 12.9475*t);
  };

  Easings.easings = function() {
    if ( !EASING_PROPS ) {
      var prop;
      EASING_PROPS = {};

      for ( prop in Easings ) {
        if ( Easings.hasOwnProperty( prop ) && NOT_EASING_FUNCTIONS.indexOf( prop ) < 0 ) {
          EASING_PROPS[ prop ] = prop;
        }
      }
    }

    return EASING_PROPS;
  }();

  if ( typeof module != "undefined" && module !== null && module.exports ) {
		module.exports = Easings;
	} else if ( typeof define === "function" && define.amd ) {
		define( function() { return Easings; } );
	} else {
		if ( !root.CanvasGraphics ) { 
      root.CanvasGraphics = {};
    }
    root.CanvasGraphics.Easings = Easings;
	}
}( self ));

(function( root ){

	if (true)
	{
		console.log("Library started");
	}

  /**
   * This class is used to manage the elapsing time during the animation.
   * It work in milliseconds.
   * It contains two attr.:
   *  startTime
   *  currentTime 
   */
  function Lapse( duration ) {
    this.clear();
    this.duration = duration;
  }

  Lapse.prototype.getElapsedTime = function() {
    if ( !this.startTime ) 
      this.startTime = this.currentTime = Date.now(); 
    else
      this.currentTime = Date.now();

    return this.currentTime - this.startTime;
  };

  Lapse.prototype.check = function( duration ) {
    return this.currentTime - this.startTime <= ( duration || this.duration );
  };

  Lapse.prototype.clear = function() {
    this.startTime = this.currentTime = 0;
  };

  if ( typeof module != "undefined" && module !== null && module.exports ) {
		module.exports = Lapse;
	} else if ( typeof define === "function" && define.amd ) {
		define( function() { return Lapse; } );
	} else {
		if ( !root.CanvasGraphics ) { 
      root.CanvasGraphics = {};
    }
    root.CanvasGraphics.Lapse = Lapse;
	}
}( self ));

(function( root ){

	if (true)
	{
		console.log("Library started");
	}

  function SlicePie( pie, color ) {
    this.pie   = pie;
    this.color = color;
  }

  /**
   * PARAMS
   * ------
   *  ctx
   *  opts: { stroke, lineWidth, strokeColor }
   */
  SlicePie.prototype.draw = function ( ctx, radian, maxRadian, opts ) {
    opts = opts || {};

    if ( this.color ) ctx.fillStyle = this.color;

    ctx.beginPath();
    ctx.moveTo( this.pie.x, this.pie.y );
    ctx.arc( this.pie.x, 
      this.pie.y, 
      this.pie.radius, 
      radian, 
      maxRadian, 
      false 
    );
    ctx.lineTo( this.pie.x, this.pie.y );
    ctx.closePath();

    ctx.fill();

    if ( opts.stroke ) {
      if ( opts.lineWidth ) ctx.lineWidth = opts.lineWidth;
      if ( opts.strokeColor ) ctx.strokeStyle = opts.strokeColor;
      ctx.stroke();
    }

    if ( opts.inner ) {
      ctx.beginPath();
      ctx.fillStyle = opts.strokeColor;
      ctx.moveTo( this.pie.x, this.pie.y );
      ctx.arc( this.pie.x, this.pie.y, this.pie.radius / 3 * 2, radian, maxRadian, false );
      ctx.closePath();
      ctx.fill();
    }
  };

  if ( typeof module != "undefined" && module !== null && module.exports ) {
		module.exports = SlicePie;
	} else if ( typeof define === "function" && define.amd ) {
		define( function() { return SlicePie; } );
	} else {
		if ( !root.CanvasGraphics ) { 
      root.CanvasGraphics = {};
    }
    root.CanvasGraphics.SlicePie = SlicePie;
	}
}( self ));

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
