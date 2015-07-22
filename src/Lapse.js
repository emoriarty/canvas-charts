(function( root ){

	if (DEBUG)
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
