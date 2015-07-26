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
        { value: 10, color: '#ECD078' }, 
        { value: 30, color: '#D95B43' }, 
        { value: 20, color: '#C02942' }, 
        { value: 60, color: '#542437' }, 
        { value: 40, color: '#53777A' }
      ],
      arcOpts: { 
        stroke: true, 
        strokeColor: '#FFFFFF', 
        lineWidth: 2 ,
        angleStart: -90 
      },
      easingOpts: {
        easing: CanvasGraphics.Easings.easings.easeInOutExpo, 
        duration: 1000,
        whole: true
      } 
    } );
    addReplayListener( canvasPie );

    canvasDonut.donutChart( {
      pie: {
        x: canvasDonut.canvas().width / 2, 
        y: canvasDonut.canvas().height / 2, 
        radius: 148 
      }, 
      values: [ { value: 20, color: '#ECD078' }, 
        { value: 40, color: '#D95B43' }, 
        { value: 50, color: '#542437' }, 
        { value: 20, color: '#53777A' } 
      ],
      arcOpts: { 
        stroke: true, 
        strokeColor: '#FFFFFF', 
        lineWidth: 2,
        angleStart: -90
      },
      easingOpts: { 
        easing: CanvasGraphics.Easings.easings.easeOutCirc, 
        duration: 1000,
        whole: true
      } 
    } );
    addReplayListener( canvasDonut );
  }


}());
