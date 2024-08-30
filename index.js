$("#filter").on("click", "a[filter]", function() {

    $("#filter a").removeAttr("selected");
    let what = $(this).attr("filter");
    $(this).attr("selected", "");

    if (what == "all") {
        $("#_list .r").show();
    } else {
        $("#_list .r").show();
        $("#_list .r:not([type='" + what + "'])").hide();
    }


});

// search

jQuery.expr[':'].contains = function(a, i, m) {
    return jQuery(a).text().toUpperCase()
        .indexOf(m[3].toUpperCase()) >= 0;
};

$("#search input._search").keyup(function() {

    $("#_list .r").hide();

    $('#_list .r:contains("' + $("._search").val() + '")').show();



});


const SPREADSHEET_ID = "13LQ6AO0DyMwSCmiAxv9KtQPBm12Spcc5dnzmwKCurlk";
const TAB_NAME = "INDEX";


$(document).ready(function() {


    $.getJSON("https://opensheet.elk.sh/" + SPREADSHEET_ID + "/" + TAB_NAME, function(data) {

        console.log(data);

        // go over everything in data and run the code below
        data.forEach(function(entry, index) {

            let _links = "";

            if (entry["mirror/0"] && entry["mirror/0"].length !== 0) {
                _links += `<a href='` + entry["mirror/0"] + `'> </a>`;
            }
            if (entry["mirror/1"] && entry["mirror/1"].length !== 0) {
                _links += `<a href='` + entry["mirror/1"] + `'> </a>`;
            }
            if (entry["mirror/2"] && entry["mirror/2"].length !== 0) {
                _links += `<a href='` + entry["mirror/2"] + `'> </a>`;
            }
            if (entry["mirror/3"] && entry["mirror/3"].length !== 0) {
                _links += `<a href='` + entry["mirror/3"] + `'> </a>`;
            }

            let d = $(`<div class='r' type='` + (entry.type).toLowerCase() + `'> 
          <a href="` + entry["mirror/0"] + `" target="_blank" class="_link">
            <div class="_title">
            <span class="_type">` + entry.type + `</span> <h2 title>` +
                    entry.title +
                    `</h2></div>
            <div class="_desc"><p>` + entry.desc + `</p></div></a>
            <div class="_mirror">` + _links + `</div>
          </div>`)
                .appendTo("#_list");

        });

        // update counters

        $("[counter]").text($(".r").length);
        $(".count_all").text($(".r").length);
        $(".count_webdev").text($(".r[type*='Web Development']").length);
        $(".count_data").text($(".r[type*='data']").length);
        $(".count_design").text($(".r[type*='ux design']").length);
        $(".count_processanalysis").text($(".r[type*='process analysis']").length);
    });




    // write


})