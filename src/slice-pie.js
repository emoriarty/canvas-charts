(function( root ){

	if (DEBUG)
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
