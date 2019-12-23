(function () {

    const container = document.querySelector('.conatner');
    // const snake = document.querySelector('.snake');
    const cellsDiv = document.querySelector('.cell');
    let cells = [{
        id: "0",
        x: 0,
        y: 0,
        dir: 'R'
    }]



    var nextSnake = function () {
        console.log('direction', cells[0].dir);
        for (let i = 0; i < cells.length; i++) {
            c = cells[i]
            if (c.dir == 'R') {
                c.x += 10
            }
            if (c.dir == 'L') {
                c.x -= 10
            }
            if (c.dir == 'T') {
                c.y -= 10
            }
            if (c.dir == 'D') {
                c.y += 10
            }
            setPosition(c.id, c.x, c.y)
            isBoundaryCollision()


        }
    }
    setInterval(nextSnake, 10);


    function isBoundaryCollision() {
        cell = document.getElementById("0");
        d = cells[0].dir
        x = parseInt(cell.style.left, 10)
        y = parseInt(cell.style.top, 10)
        if ((x >= 600 && d == 'R') ||
            (x <= 0 && d == 'L') ||
            (y >= 600 && d == 'D') ||
            (y <= 0 && d == 'T')) {
            cells = [{
                id: "0",
                x: 0,
                y: 0,
                dir: 'R'
            }]
        }


    }

    function setPosition(i, x, y) {
        cell = document.getElementById(i);
        cell.style.left = x + "px"
        cell.style.top = y + "px"
    }

    document.addEventListener('keydown', function (e) {
        k = e.keyCode
        if (cells[0].dir == 'T' || cells[0].dir == 'D') {
            if (k == 39) {
                cells[0].dir = 'R'
            } else if (k == 37) {
                cells[0].dir = 'L'
            }
        } else if (cells[0].dir == 'L' || cells[0].dir == 'R') {
            if (k == 38) {
                cells[0].dir = 'T'
            } else if (k == 40) {
                cells[0].dir = 'D'
            }
        }
        console.log(e.keyCode);
    })
})()