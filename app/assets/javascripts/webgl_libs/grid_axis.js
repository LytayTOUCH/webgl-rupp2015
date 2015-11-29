// function isNumberKey(evt){
//   var charCode = (evt.which) ? evt.which : evt.keyCode;
//   if (charCode != 46 && charCode > 31 
//     && (charCode < 48 || charCode > 57))
//      return false;
//   return true;
// }

function drawgrid(){
  a = document.getElementById('value-a');
  b = document.getElementById('value-b');
  console.log(a.value+', '+b.value);
  // console.log('Draw Grid!');
  
  canvas=document.getElementById('grid-axis');
  // console.log(canvas);
  
  w = 800;
  h = 600;

  ratio = 2;
  canvas.width = w * ratio;
  canvas.height = h * ratio;
  canvas.style.width = w + "px";
  canvas.style.height = h + "px";
  g = canvas.getContext("2d");
  g.setTransform(ratio, 0, 0, ratio, 0, 0);

  graphLt = 10;
  graphTp = 10;

  graphWd = 550;
  graphHt = 450;

  // graphLt = canvas.width;
  // graphWd = canvas.height;
  // graphTp = 10;
  // graphHt = canvas.height;

  coords = new Coords(graphLt, graphTp, graphWd, graphHt, -9, -9, 9, 9, false);
  console.log(coords);

  g = canvas.getContext("2d");
  g.clearRect(0, 0, canvas.width, canvas.height);
  g.fillStyle = "#ffffff";
  g.beginPath();
  g.rect(coords.left, coords.top, coords.width, coords.height);
  g.fill();
  graph = new Graph(g, coords);
  // graph.drawGraph();
  drawLine(a.value, b.value);
}