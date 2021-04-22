const apiKey = 'dd306562fcd8c7d28308eba41aaf8641'

$('#button-addon2').on('click', function (e) {
    e.preventDefault();

    var location = $('#City-search').val();

    var URL = "https://api.openweathermap.org/data/2.5/weather?q=" + location +'&apikey=' + apiKey + "&units=imperial";

    $.ajax({
        url: URL,
        method: 'GET'
    }).then(function (res) {
        var date = new Date(res.dt * 1000).toLocaleDateString()
        $('.City-display' ).text((res.name) + " (" + date + ")")
        $('.Humidity-display' ).text((res.main.humidity) + "%")
        $('.Temp-display' ).text(Math.floor(res.main.temp) + '° F')
        $('.Wind-display' ).text(Math.floor(res.wind.speed) + ' mph')
        UvIndex(res.coord.lon, res.coord.lat);
    })
})

$("#button-addon2").on("click", function (event) {
    event.preventDefault();

    var location = $('#City-search').val();
    var queryURL = "https://api.openweathermap.org/data/2.5/forecast?q=" + location + '&apikey=' + apiKey + '&units=imperial';

    $.ajax({
        url: queryURL,
        method: "GET"
    }).then(function (res) {
        console.log(res)

        for (var i = 0; i < 5; i++) {
            var date = new Date(res.list[((i + 1) * 8) - 1].dt * 1000).toLocaleDateString();

            $('#day' + i).html(date)
            $('#temperature' + i).html(Math.floor(res.list[((i + 1) * 8) - 1].main.temp) + '° F');
            $('#humidity' + i).html(res.list[((i + 1) * 8) - 1].main.humidity + "%");

        }
    });

})

function UvIndex(lon, lat) {
    var URL = "https://api.openweathermap.org/data/2.5/uvi?lat=" + lat + "&lon=" + lon + '&apikey=' + apiKey;
    $.ajax({
        url: URL,
        method: "GET"
    }).then(function (res) {
        console.log(res)
        var UVIndex = res.value
        $(".UVIndex-display").text(UVIndex)

        var UVcolor = null
        var textColor = null

        if (UVIndex < 2) {
            UVcolor = "green"
            textColor = "black"
        } else if (UVIndex < 6) {
            UVcolor = "yellow"
            textColor = "black"
        } else if (UVIndex < 8) {
            UVcolor = "orange"
            textColor = "black"
        } else if (UVIndex < 11) {
            UVcolor = "red";
            textColor = "black"
        } else {
            UVcolor = "violet"
            textColor = "black"
        }
        $(".UVIndex-display").css("backgroundColor", UVcolor)
            .css("color", textColor)
    })


}
