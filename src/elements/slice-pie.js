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
