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
		 init.call( this, this.opts );
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

  /**
   * Clear the canvas
   */
	CanvasGraphics.prototype.clear = function() {
    var ctx = this.canvas().getContext( '2d' );

    ctx.clearRect( 0, 0, this.canvas().width, this.canvas().height );
	};

  /**
   * Redraw the chart preventing the easing
   */
  CanvasGraphics.prototype.redraw = function() {
    this.clear();
    if ( this.replayOpts ) {

      // Storing temporary easing options
      var tmpEasingOpts = this.replayOpts.args.easingOpts;

      // Setting null the easing options
      this.replayOpts.args.easingOpts = null;
      this[ this.replayOpts.chart ]( this.replayOpts.args );

      // Restoting easing options
      this.replayOpts.args.easingOpts = tmpEasingOpts;
    }
  };

  /**
   * Redraw the chart with all args, this will include the easing animation
   */
  CanvasGraphics.prototype.replay = function() {
    this.clear();
    if ( this.replayOpts ) {
      this[ this.replayOpts.chart ]( this.replayOpts.args );
    }
  };

  CanvasGraphics.prototype.capturePosition = function( ev ) {
    var rect = this.canvas().getBoundingClientRect(),
        mx   = Math.round( ( ev.clientX - rect.left ) / ( rect.right - rect.left ) * this.canvas().width ),
        my   = Math.round( ( ev.clientY - rect.top ) / ( rect.bottom - rect.top ) * this.canvas().height );

    return { x: mx, y: my };
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
      this.cnvs = document.getElementById( opts.id );
    }

    if ( this.cnvs ) {
      this.state = new CanvasGraphics.CanvasState( this );
    }
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
  function CanvasState( canvasChart ) {
    this.canvasChart = canvasChart;
    this.canvas = canvasChart.canvas();
    this.elements = [];
  }

  CanvasState.prototype.addListener = function( type, cb ) {
    var fn = function( ev ) {

      // To obtain the X/Y in CANVAS space, you would need to take your X (Y), 
      // divide by the client rect width (height) and multiply that by the canvas width (height)
      var coord = this.canvasChart.capturePosition( ev );

      for ( var i = this.elements.length - 1; i >= 0; i-- ) {
        var el = this.elements[ i ];
        
        if ( el.contains( coord.x, coord.y ) ) {
          cb( ev, el );
        }
      }
    }.bind( this );

    this.canvas.addEventListener( type, fn );

    return fn;
  };

  CanvasState.prototype.removeListener = function( type, cb) {
    this.canvas.addEventListener( type, fn );
  };

  CanvasState.prototype.addElement = function( obj ) {
    for ( var i = this.elements.length - 1; i >= 0; i-- ) {
      var el = this.elements[ i ];
      if ( el === obj ) return;
    }

    this.elements.push( obj );
  };


  if ( typeof module != "undefined" && module !== null && module.exports ) {
    module.exports = CanvasGraphics;
  } else if ( typeof define === "function" && define.amd ) {
    define( function() { return CanvasGraphics; } );
  } else {
    if ( !root.CanvasGraphics ) { 
      root.CanvasGraphics = {};
    }
    root.CanvasGraphics.CanvasState = CanvasState;
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
   *  easingOpts: { easing, duration }
	 * 
	 */
	function pieChart( args ) {
    arcOpts    = args.arcOpts || {};
    pie        = args.pie || { x: 100, y: 100, radius: 50 };
    values     = args.values;
    arcOpts    = args.arcOpts;
    easingOpts = args.easingOpts;
    events     = args.events;

    var ctx = this.canvas().getContext( '2d' );
    
    if ( !easingOpts ) {
      drawPie.call( this, ctx, pie, values, arcOpts, events );
    } else {
      drawAnimatedWholePie.call( this, ctx, pie, values, arcOpts, easingOpts, events );
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

  function drawPie( ctx, pie, values, opts, events ) {
    var i, pieSlice, startRadian, endRadian, maxValue = sumValues( values );

    if ( opts.angleStart ) {
      endRadian = startRadian = opts.angleStart * Math.PI / 180;
    }

    // Creating elements and adding them in state object
    if ( this.state.elements.length === 0 ) {
      for ( i = 0; i < values.length; i++ ) {
        pieSlice = composeSlice( pie, values[ i ] );
        this.state.addElement( pieSlice );
      }

      // Adding events
      if ( events ) {
        for ( var prop in events ) {
          this.state.addListener( prop, events[ prop ] );
        }
      }
    }

    for( i = 0; i < this.state.elements.length; i++ ) {
      pieSlice = this.state.elements[ i ];
      endRadian += (pieSlice.value * (Math.PI * 2)) / maxValue;
      pieSlice.draw( ctx, startRadian, endRadian, opts );
      startRadian += (pieSlice.value * (Math.PI * 2)) / maxValue;
    }

  }

  function drawSlice( pie, color, radian, maxRadian, opts ) {
    var pieSlice = new CanvasGraphics.SlicePie( pie, color );
    
    pieSlice.draw( radian, maxRadian, opts );

    return pieSlice;
  }

  function drawAnimatedWholePie( ctx, pie, values, arcOpts, easingOpts, events ) {
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

(function( root ){

  function SlicePie( pie, opts ) {
    this.pie    = pie;
    this.id     = opts.id;
    this.color  = opts.color;
    this.value  = opts.value;
  }

  /**
   * PARAMS
   * ------
   *  ctx
   *  startRadian
   *  endRadian
   *  opts: { stroke, lineWidth, strokeColor }
   */
  SlicePie.prototype.draw = function ( ctx, startRadian, endRadian, opts ) {
    opts = opts || {};

    // Storing values for redrawing purposes
    this.ctx         = ctx;
    this.startRadian = startRadian;
    this.endRadian   = endRadian;
    this.opts        = opts;

    if ( this.color ) ctx.fillStyle = this.color;

    this.defineArc();
    ctx.lineTo( this.pie.x, this.pie.y );
    ctx.closePath();

    ctx.fill();

    if ( opts.stroke ) {
      if ( opts.lineWidth ) ctx.lineWidth = opts.lineWidth;
      if ( opts.strokeColor ) ctx.strokeStyle = opts.strokeColor;
      ctx.stroke();
    }

    /*if ( opts.inner ) {
      ctx.beginPath();
      ctx.fillStyle = opts.strokeColor;
      ctx.moveTo( this.pie.x, this.pie.y );
      ctx.arc( this.pie.x, this.pie.y, this.pie.radius / 3 * 2, startRadian, endRadian, false );
      ctx.closePath();
      ctx.fill();
    }*/
  };

  /**
   * This method redraws the last drawn shape reusing the arguments.
   */
  SlicePie.prototype.redraw = function () {
    this.draw( this.ctx, this.startRadian, this.endRadian, this.opts );
  };

  /**
   * The arc with represents the pie slice is defined.
   * This is useful to know which slice was selected in the canvas.
   */
  SlicePie.prototype.defineArc = function () {
    var ctx = this.ctx;

    ctx.beginPath();
    ctx.moveTo( this.pie.x, this.pie.y );
    ctx.arc( this.pie.x, 
      this.pie.y, 
      this.pie.radius, 
      this.startRadian, 
      this.endRadian, 
      false 
    );
  };

  /*
   * Check if the coordinates x and y are over the slice
   */
  SlicePie.prototype.contains = function ( mx, my ) { 
    this.defineArc();
    return this.ctx.isPointInPath( mx, my );
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

  function DonutSlice( pie, opts ) {
    this.pie    = pie;
    this.id     = opts.id;
    this.color  = opts.color;
    this.value  = opts.value;
  }

  /**
   * PARAMS
   * ------
   *  ctx
   *  startRadian
   *  endRadian
   *  opts: { stroke, lineWidth, strokeColor }
   */
  DonutSlice.prototype.draw = function ( ctx, startRadian, endRadian, opts ) {
    opts = opts || {};

    // Storing values for redrawing purposes
    this.ctx         = ctx;
    this.startRadian = startRadian;
    this.endRadian   = endRadian;
    this.opts        = opts;

    if ( this.color ) ctx.fillStyle = this.color;

    this.defineArc();
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
      ctx.arc( this.pie.x, this.pie.y, this.pie.radius / 3 * 2, startRadian, endRadian, false );
      ctx.closePath();
      ctx.fill();
    }
  };

  /**
   * This method redraws the last drawn shape reusing the arguments.
   */
  DonutSlice.prototype.redraw = function () {
    this.draw( this.ctx, this.startRadian, this.endRadian, this.opts );
  };

  /**
   * The arc with represents the pie slice is defined.
   * This is useful to know which slice was selected in the canvas.
   */
  DonutSlice.prototype.defineArc = function () {
    var ctx = this.ctx;

    ctx.beginPath();
    ctx.moveTo( this.pie.x, this.pie.y );
    ctx.arc( this.pie.x, 
      this.pie.y, 
      this.pie.radius, 
      this.startRadian, 
      this.endRadian, 
      false 
    );
  };

  /*
   * Check if the coordinates x and y are over the slice
   */
  DonutSlice.prototype.contains = function ( mx, my ) { 
    this.defineArc();
    return this.ctx.isPointInPath( mx, my );
  };
  

  if ( typeof module != "undefined" && module !== null && module.exports ) {
    module.exports = DonutSlice;
  } else if ( typeof define === "function" && define.amd ) {
    define( function() { return DonutSlice; } );
  } else {
    if ( !root.CanvasGraphics ) { 
      root.CanvasGraphics = {};
    }
    root.CanvasGraphics.DonutSlice = DonutSlice;
  }
}( self ));
