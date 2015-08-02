(function( root ){

	if (DEBUG)
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
