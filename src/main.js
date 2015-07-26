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
