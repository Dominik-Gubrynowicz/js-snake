function insertIntoDB(nick, score, moves) {
    (function ($) {
        var url = 'https://node-backend-snakemi16.herokuapp.com/insertRanking'
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
    $.getJSON('https://node-backend-snakemi16.herokuapp.com/ranking', function (data) {
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

    setTimeout(function () {
        sortTable();
    }, 500);
}
function sortTable() {
    var table, rows, switching, i, x, y, shouldSwitch;
    table = document.getElementById("tabela");
    switching = true;
    while (switching) {
        switching = false;
        rows = table.rows;
        for (i = 1; i < (rows.length - 1); i++) {
            shouldSwitch = false;
            x = rows[i].getElementsByTagName("TD")[1];
            y = rows[i + 1].getElementsByTagName("TD")[1];
            if (Number(x.innerHTML) < Number(y.innerHTML)) {
                shouldSwitch = true;
                break;
            }
        }
        if (shouldSwitch) {
            rows[i].parentNode.insertBefore(rows[i + 1], rows[i]);
            switching = true;
        }
    }
}