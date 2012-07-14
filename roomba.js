var roomba_data = [[200, 200]];
var tweets = ["(Becomes Self-Aware)"];
var tweet_num = 0;

function getTweets() {
  var url = 'http://api.twitter.com/1/statuses/user_timeline.json?screen_name=SelfAwareROOMBA&callback=?'
  $.getJSON(url,function(json){
    for (i=0; i<json.length; i++){
      if (!json[i].in_reply_to_user_id){
        tweets.push(json[i].text);
      }
    }
    tweets.reverse();
  });
}

getTweets();

//Width and height
var w = 500;
var h = 500;

var svg = d3.select("body").append("svg").attr("width", w).attr("height", h);
//setup the room
svg.append("rect").attr("width", w).attr("height", h).attr("fill", "#ffffee")
  .attr("stroke", "black").attr("stroke-width", "10");
//setup the tweet area
d3.select("body").append("div").attr("class", "tweet");



var roomba = svg.selectAll("roomba").data(roomba_data).enter()
  .append("g")
  .append("svg:image")
  .attr("class", "roomba")
  .attr("xlink:href", "roomba.gif")
  .attr("width", 48)
  .attr("height", 48)
  .attr("x", function(d) { return d[0];})
  .attr("y", function(d) { return d[1];});

var tweet = svg.selectAll("g")
  .append("text");

function next_position(){
  return  Math.floor(Math.random() * 460) + 20;
}

function showTweet(){
  var i = tweet_num;
  if (tweets.length > tweet_num +1){
    tweet_num++;
  }
  if (tweets.length < tweet_num +1){
    tweet_num = 0;
  }
  d3.select(".tweet").text(tweets[tweet_num]);
}


function move(){
  var new_x = next_position();
  var new_y = next_position();
  svg.selectAll("image.roomba").transition()
    .attr("x", new_x)
    .attr("y", new_y).duration(1000).delay(100);

  showTweet();

  setTimeout(move, 2000 + 200);
}

move();


