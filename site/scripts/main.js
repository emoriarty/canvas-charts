(function() {
  window.onload = function() {
    var canvasBasic     = new CanvasGraphics( { id: 'canvas-basic' } ),
        canvasColors    = new CanvasGraphics( { id: 'canvas-colors' } ),
        canvasStroke    = new CanvasGraphics( { id: 'canvas-stroke' } ),
        canvasAnimWhole = new CanvasGraphics( { id: 'canvas-anim-whole' } ),
        canvasAnimSlice = new CanvasGraphics( { id: 'canvas-anim-slice' } );

    canvasBasic.pieChart( { 
        x: canvasBasic.canvas().width / 2, 
        y: canvasBasic.canvas().height / 2, 
        radius: 148 
      }, 
      [ 1200, 4500, 1000, 1500, 2000, 3000 ] );

    canvasColors.pieChart( { 
        x: canvasColors.canvas().width / 2, 
        y: canvasColors.canvas().height / 2, 
        radius: 148 
      }, [ 
        { value: 10, color: '#ECD078' }, 
        { value: 30, color: '#D95B43' }, 
        { value: 20, color: '#C02942' }, 
        { value: 60, color: '#542437' }, 
        { value: 40, color: '#53777A' }
      ] );

    canvasStroke.pieChart( {
        x: canvasStroke.canvas().width / 2, 
        y: canvasStroke.canvas().height / 2, 
        radius: 148 
      }, 
      [ 20, 40, 30, 50, 20 ],
      { stroke: true, 
        strokeColor: '#FFFFFF', 
        lineWidth: 2 ,
        inner: true,
        angleStart: 90 } );

    canvasAnimWhole.pieChart( {
        x: canvasAnimWhole.canvas().width / 2, 
        y: canvasAnimWhole.canvas().height / 2, 
        radius: 148 
      }, 
      [ { value: 20, color: '#ECD078' }, 
        { value: 40, color: '#D95B43' }, 
        { value: 50, color: '#542437' }, 
        { value: 20, color: '#53777A' } ],
      { 
        stroke: true, 
        strokeColor: '#FFFFFF', 
        lineWidth: 2,
        inner: true,
        angleStart: -90
      },
      { 
        easing: CanvasGraphics.Easings.easings.easeInOutExpo, 
        duration: 1500,
        whole: true
      } );

    canvasAnimSlice.pieChart( {
        x: canvasAnimSlice.canvas().width / 2, 
        y: canvasAnimSlice.canvas().height / 2, 
        radius: 148 
      }, 
      [ { value: 20, color: '#ECD078' }, 
        { value: 40, color: '#D95B43' }, 
        { value: 50, color: '#542437' }, 
        { value: 20, color: '#53777A' } ],
      { 
        stroke: true, 
        strokeColor: '#FFFFFF', 
        lineWidth: 2,
        inner: false,
        angleStart: 0
      },
      { 
        easing: CanvasGraphics.Easings.easings.linearTween, 
        duration: 1000
      } );
  }
}());
