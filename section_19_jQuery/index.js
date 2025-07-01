$("h1").addClass("big-title");
$("body").keypress(function(event) {
    $("h1").text(event.key);
});
$("button").click(function() {
    $("h1").slideUp().slideDown().animate({opacity: 0.5});
});