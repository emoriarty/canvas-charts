(function() {
  window.onload = function() {
    var canvasDonut = new CanvasGraphics( { id: 'canvas-donut' } ),
        canvasPie   = new CanvasGraphics( { id: 'canvas-pie' } );

    function addReplayListener( canvas ) {
      var replayBtn = document.getElementById( canvas.canvas().id )
        .nextElementSibling.querySelector( '.replay' );

      if ( replayBtn ) {
        replayBtn.addEventListener( 'click', canvas.replay.bind( canvas ) );
      }
    }

    canvasPie.pieChart( {
      pie: { 
        x: canvasPie.canvas().width / 2, 
        y: canvasPie.canvas().height / 2, 
        radius: 148 
      }, 
      values: [ 
        { id: 1, value: 10, color: '#ECD078' }, 
        { id: 2, value: 30, color: '#D95B43' }, 
        { id: 3, value: 20, color: '#C02942' }, 
        { id: 4, value: 60, color: '#542437' }, 
        { id: 5, value: 40, color: '#53777A' }
      ],
      arcOpts: { 
        stroke: true, 
        strokeColor: '#FFFFFF', 
        lineWidth: 2 ,
        angleStart: -90 
      },
      events: {
        'click': function( ev, el ) {
          alert( 'The slice selected is ' + el.id );
        }
      }
    } );
    addReplayListener( canvasPie );

    canvasDonut.donutChart( {
      pie: {
        x: canvasDonut.canvas().width / 2, 
        y: canvasDonut.canvas().height / 2, 
        radius: 148 
      }, 
      values: [ { id: 0, value: 20, color: '#ECD078' }, 
        { id: 1, value: 40, color: '#D95B43' }, 
        { id: 2, value: 50, color: '#542437' }, 
        { id: 3, value: 20, color: '#53777A' } 
      ],
      arcOpts: { 
        stroke: true, 
        strokeColor: '#FFFFFF', 
        lineWidth: 2,
        angleStart: -90
      },
      easingOpts: { 
        easing: CanvasGraphics.Easings.easings.easeOutCirc, 
        duration: 1000
      },
      events: {
        'click': function( ev, el ) {
          alert( 'The slice selected is ' + el.id );
        }
      }
    } );
    addReplayListener( canvasDonut );
  }


}());
