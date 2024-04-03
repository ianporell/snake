(() => {
    const GRID_SIDE = 16    // must be a power of 2 for nice bit optimization
    let game
    let app
    let inps = [+1]
    let s = [104, 136]
    let temp = []
    let dir = 1
    let getRow = (n) => {return Math.floor(n/(GRID_SIDE*2))}
    let getCol = (n) => {return n%GRID_SIDE}
    let isInBounds = (n) => {return (n&528) == 0}
    let getTile = (n) => {return game.children[16*getRow(n)+getCol(n)]}
    let createApp = () => {
        let n = Math.floor(Math.random() * Math.pow(GRID_SIDE, 2))
        while (s.includes(n) || !isInBounds(n)) n = Math.floor(Math.random() * Math.pow(GRID_SIDE, 2))
        app = n
        getTile(app).className += ' app'
    }
    let increaseLen = () => {
        s.push(s[s.length - 1] + s[s.length - 1] - s[s.length - 2])
    }
    (() => {
        game = document.getElementById('game')
        for (i = 0; i < GRID_SIDE; i++) {
            for (j = 0; j < GRID_SIDE; j++) {
                const d = document.createElement('div')
                d.className += (i + j) % 2 == 0 ? 'col' : ''
                game.appendChild(d)
            }
        }
        createApp()
    })()
    document.onkeydown = (e) => {
        let newDir
        switch (e.key.toLowerCase()) {
            case 'w':
                newDir = -GRID_SIDE * 2
                break
            case 'a':
                newDir = -1
                break
            case 's':
                newDir = +GRID_SIDE * 2
                break
            case 'd':
                newDir = +1
                break
        }
        if (Math.abs(newDir) != Math.abs(inps.length == 0 ? dir : inps[inps.length - 1]) && inps.length <= 3) inps.push(newDir)
    }
    let loop = () => {
        if (inps.length > 0) dir = inps.shift()  
        if (!isInBounds(s[0] + dir) || s.includes(s[0] + dir)) {
            document.getElementById("over-text").className = ''
            s = []
        } else {
            for (i = s.length - 1; i > 0; i--) {
                s[i] = s[i - 1]
            }
            s[i] += dir
        }
        if (s[0] == app) {
            createApp()
            increaseLen()
        }
        temp.forEach(i => {
            i.className = i.className.toString().substring(0, 3)
        }); temp = []
        s.forEach(i => {
            let tile = getTile(i)
            tile.className += ' active'
            temp.push(tile)
        })
    }
    let gameLoop = setInterval(loop, 100)
})()