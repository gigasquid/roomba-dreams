var roomba_data = [[200, 200]];

var dataset = [];                        //Initialize empty array
for (var i = 0; i < 10; i++) {           //Loop 25 times
  var newNumber = Math.floor(Math.random() * 460) + 20;  //New random number (0-30)
  dataset = dataset.concat(newNumber); //Add new number to array
}

//Width and height
var w = 500;
var h = 500;

var svg = d3.select("body").append("svg").attr("width", w).attr("height", h);
//setup the room
svg.append("rect").attr("width", w).attr("height", h).attr("fill", "#ffcc66")
  .attr("stroke", "black").attr("stroke-width", "10");


var roomba = svg.selectAll("roomba").data(roomba_data).enter()
  .append("svg:image")
  .attr("class", "roomba")
  .attr("xlink:href", "roomba.gif")
  .attr("width", 48)
  .attr("height", 48)
  .attr("x", function(d) { return d[0];})
  .attr("y", function(d) { return d[1];});

function next_position(){
  return  Math.floor(Math.random() * 460) + 20;
}

function move(){
  svg.selectAll("image.roomba").transition()
    .attr("x", next_position())
    .attr("y", next_position()).duration(1000).delay(100);
  setTimeout(move, 2000 + 200);
}

move();


