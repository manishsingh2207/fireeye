if(window.addEventListener){
    window.addEventListener('load',onLoadFunction,false); //W3C
}
else{
    window.attachEvent('onload',onLoadFunction); //IE
}
function onLoadFunction(){
     var xhttp = new XMLHttpRequest();
  xhttp.onreadystatechange = function() {
    if (this.readyState == 4 && this.status == 200) {
     var data = this.responseText;
     GetUserData(JSON.parse(data));
    }
  };
  xhttp.open("GET", "https://api.myjson.com/bins/1e4hrx", true);
  xhttp.send();
    
}
function GetUserData(data){
    var url = window.location.href;
    var userId = url.split("?")[1];
    var userData = data[userId];
    if(userData){
        var dpEleList = document.getElementsByClassName("profilepic");
        for(var key in dpEleList){
            dpEleList[key].src=userData.imageurl;
        }
        var name = userData.name,
            tweets = userData.tweets,
            following = userData.following,
            followers = userData.followers;
        document.getElementById("username").innerHTML = name;
        document.getElementById("tweets").innerHTML = tweets;
        document.getElementById("following").innerHTML = following;
        document.getElementById("followers").innerHTML = followers;
        var tweetele = document.getElementById("tweet-compose");
        tweetele.addEventListener("keydown", function (e) {
        if (e.keyCode === 13) {  //checks whether the pressed key is "Enter"
            var sampleDiv = $(document.getElementsByClassName("tweet")[0]);
            var htmlToAppend= sampleDiv.clone();
            var userPic = $(this).closest("#dashboard").find("img").attr("src");
            htmlToAppend.find(".profilepic").attr("src",userPic);
            htmlToAppend.find(".avatar:not(.profilepic)").attr("src",userPic);
            htmlToAppend.find(".fullname").text(userData.name);
            htmlToAppend.find(".tweet-text").text($(this).val());
            sampleDiv.before(htmlToAppend);
        }
    }
                                  );
}
    else{
        alert("This is the default page. Specify user1 or user2 in url");
        
    }
}

