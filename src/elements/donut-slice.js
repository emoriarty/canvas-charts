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
    this.innerRatio  = 3;

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
      this.innerRadius = this.pie.radius / this.innerRatio * 2;
      ctx.beginPath();
      ctx.fillStyle = opts.strokeColor;
      ctx.moveTo( this.pie.x, this.pie.y );
      ctx.arc( this.pie.x, this.pie.y, this.innerRadius, startRadian, endRadian, false );
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
    var px = mx - this.pie.x,
        py = my - this.pie.y,
        position = ( px * px + py * py );
    
    // check if is inside the outer radius
    return this.ctx.isPointInPath( mx, my ) && 
      position < ( this.pie.radius * this.pie.radius ) && 
      position > ( this.innerRadius * this.innerRadius );
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
