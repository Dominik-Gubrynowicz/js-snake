function insertIntoDB(nick,score,moves){(function ($) {
    //var url = 'https://node-backend-snakemi16.herokuapp.com/insertRanking'
    var url = 'http://localhost:3000/insertRanking'
    $.ajax({
        url: url,
        type: 'POST',
        contentType: 'application/json',
        data: JSON.stringify({
            "nick": nick,
            "score": score,
            "move": moves
        })
    }
    )
    })(jQuery);
}
function fetchRanking(){
    class dane {
        user;
    }
    dane.user = "";
    $.getJSON('http://192.168.100.12:3000/ranking', function (data) {
        console.log(data);
        data.forEach(element => {
            console.log(element["nick"])
            console.log(element["score"])
            console.log(element["moves"])
            dane.user = dane.user + `<tr><td>${element["nick"]}</td><td>${element["score"]}</td><td>${element["moves"]}</td></tr>`

        });

        document.getElementById("tabela").innerHTML = dane.user;
    });
}
