(function( root ){

	if (DEBUG)
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
