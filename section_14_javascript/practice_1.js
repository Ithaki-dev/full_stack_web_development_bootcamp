var tweet = prompt("Compose your tweet:");
var tweetUnder140 = tweet.slice(0,139)
var maxLength = 140
var tweetLength = tweet.length
var remain = maxLength-tweetLength

alert(tweetLength+" charactes entered | "+remain+" characters remaining"+tweetUnder140 )
