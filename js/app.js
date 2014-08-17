function getRecipeHome() {
    $("#list-home").empty();
    var e = "http://localhost/carimakananbayi.com/public/?__my=jelajahi&android_json=true";
    getRequest(e, function(e) {
        var e = JSON.parse(e.responseText);
        for (var t = 0; t < e.length; t++) {
            if (!e[t]["list_image"]) {
                var n = "images/empty.jpg"
            } else {
                var n = e[t]["list_image"]
            }
            $("#list-home").append("<li>" + '<a href="#detail" class="getDetail" data-transition="slide" rel="' + e[t]["list_id"] + '">' + '<div class="home-container img-shadow">' + '<div class="title-menu">' + e[t]["list_name"] + "</div>" + '<img src="images/bg_home_title.png" border="0" class="img-menu">' + '<img src="' + n + '" width="250px" height="200px" />' + "</div>" + "</a>" + "</li>")
        }
    })
}

function getRecipeCategory() {
    $("#list-category").empty();
    var e = "http://localhost/carimakananbayi.com/public/?__my=usia&android_json=true";
    getRequest(e, function(e) {
        var e = JSON.parse(e.responseText);
        for (var t = 0; t < e.length; t++) {
            if (!e[t]["category_image"]) {
                var n = "images/empty.jpg"
            } else {
                var n = e[t]["category_image"]
            }
            $("#list-category").append("<li>" + '<a href="#list_all" data-transition="slide" class="getList" rel="' + e[t]["category_id"] + '">' + "<h2>" + e[t]["category_name"] + "</h2>" + "<p>" + e[t]["category_desc"] + "</p>" + '<span class="ui-li-count">' + e[t]["count"] + "</span>" + "</a>" + "</li>").listview("refresh")
        }
    })
}

function getRecipeList(e) {
    $("#list-all").empty();
    var t = "http://localhost/carimakananbayi.com/public/?__my=usia&android_json=true&umur=" + e;
    getRequest(t, function(e) {
        var e = JSON.parse(e.responseText);
        for (var t = 0; t < e.length; t++) {
            if (!e[t]["list_image"]) {
                var n = "images/empty.jpg"
            } else {
                var n = e[t]["list_image"]
            }
            $("#list-all").append("<li>" + '<a href="#detail" data-transition="slide" class="getDetail" rel="' + e[t]["list_id"] + '">' + '<img border="0" height="80" src="'+ n + '">' + "<h2>" + e[t]["list_name"] + "</h2>" + "<p>" + e[t]["list_cook_time"] + e[t]["list_porsi"] +"</p>" + "</a>" + "</li>").listview("refresh")
        }
    })
}

function getRecipeBookmark() {
    $("#list-bookmark").empty();
    for (var e in tbBookmark) {
        var t = JSON.parse(tbBookmark[e]);
        var n = "http://localhost/carimakananbayi.com/public/?__my=viewresep&android_json=true&xid=" + t.id;
		//$("#list-bookmark").append(t.id);
        getRequest(n, function(e) {
            var e = JSON.parse(e.responseText);
            for (var t = 0; t < e.length ; t++) {
                if (!e[t]["list_image"]) {
                    var n = "images/empty.jpg"
                } else {
                    var n = e[t]["list_image"]
                }
                $("#list-bookmark").append("<li>" + '<a href="#detail" data-transition="slide" class="getDetail" rel="' + e[t]["list_id"] + '">' + '<img border="0" height="80" src="' + n + '">' + "<h2>" + e[t]["list_name"] + "</h2>" + "<p>" + e[t]["list_cook_time"] + "</p>" + "</a>" + "</li>").listview("refresh")
            }
        })
    }
}

function getDetail(e) {
    $("#btn-bookmark").attr("rel", e);
    //var t = urlService + "service/get_detail?id=" + e;
	var t = "http://localhost/carimakananbayi.com/public/?__my=viewresep&android_json=true&xid=" + e;
    getRequest(t, function(e) {
        var e = JSON.parse(e.responseText);
        for (var t = 0; t < e.length; t++) {
            if (!e[t]["list_image"]) {
                var n = "images/empty.jpg"
            } else {
                var n = e[t]["list_image"]
            }
            $("#btn-bookmarks").html('<img src="images/buttom.png" border="0" style="position:absolute; margin-top:-17px;">');
            $("#name").html(e[t]["list_name"]);
            $("#image").html('<img src="'+ n + '" width="250px" height="200px" />');
            $("#summary").html(e[t]["list_summary"]);
            $("#ingredients").html(e[t]["list_ingredients"]);
            $("#instruction").html(e[t]["list_instruction"])
        }
    })
}

function getRequest(e, t) {
    $(".ui-icon-loading").show();
    var n;
    if (window.XMLHttpRequest) {
        n = new XMLHttpRequest
    } else {
        n = new ActiveXObject("Microsoft.XMLHTTP")
    }
    n.onreadystatechange = function() {
        if (n.readyState == 4 && n.status == 200) {
            t(n);
            $(".ui-icon-loading").hide()
        }
    };
    n.open("GET", e, true);
    n.send()
}

function jqUpdateSize() {
    vph = $(window).height() - 240;
    $("#verticalWrapper").css({
        height: vph + "px"
    });
    setTimeout(jqUpdateSize, 500);
    detailScroll.refresh()
}

function loaded() {
    homeScroll = new iScroll("horizontalWrapper");
    detailScroll = new iScroll("verticalWrapper")
}
var setUrl = "http://celebeslab.pusku.com/recipes/admin/";
var urlService = setUrl + "index.php/";
var homeScroll;
var detailScroll;
var selected_index = -1;
var tbBookmark = localStorage.getItem("tbBookmark");
tbBookmark = JSON.parse(tbBookmark);
if (tbBookmark == null) {
    tbBookmark = []
}
$(document).on("click", ".getList", function() {
    var e = $(this).attr("rel");
    getRecipeList(e)
});
$(document).on("click", ".getDetail", function() {
    var e = $(this).attr("rel");
    getDetail(e)
});
$(document).on("click", "#getBookmark", function() {
    getRecipeBookmark()
});


$(document).on("click", "#btn-bookmark", function() {
    var e = $(this).attr("rel");
    for (var t in tbBookmark) {
        var n = JSON.parse(tbBookmark[t]);
        if (n.id === e) return
    }
    var r = JSON.stringify({
        id: e
    });
    tbBookmark.push(r);
    localStorage.setItem("tbBookmark", JSON.stringify(tbBookmark));
    alert("The data was bookmark.");
    return true
});





$(document).ready(jqUpdateSize);
$(window).resize(jqUpdateSize);
document.addEventListener("DOMContentLoaded", loaded, false);
getRecipeHome();
getRecipeCategory()