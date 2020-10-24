function insertIntoDB(nick, score, moves) {
    (function ($) {
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
function fetchRanking() {
    class dane {
        user;
    }
    dane.user = `<table id="tabela"><tr><th>Nick</th><th>Wynik</th><th>Ruchy</th></tr>`;
    $.getJSON('http://localhost:3000/ranking', function (data) {
        console.log(data);
        data.forEach(element => {
            //debug
            console.log(element["nick"])
            console.log(element["score"])
            console.log(element["moves"])
            dane.user = dane.user + `<tr><td>${element["nick"]}</td><td>${element["score"]}</td><td>${element["moves"]}</td></tr>`

        });
        dane.user = dane.user + `</table>`;
        document.getElementById("tabela_holder").innerHTML = dane.user;
    });
}
