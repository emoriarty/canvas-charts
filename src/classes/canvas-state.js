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

  CanvasState.prototype.removeListener = function( type, cb ) {
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
