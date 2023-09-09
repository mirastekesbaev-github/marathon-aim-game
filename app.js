const startButton = document.getElementById('start')
const screens = document.querySelectorAll('.screen')
const timeList = document.getElementById('time-list')
const timeEl = document.getElementById('time')
const board = document.querySelector('.board')
const colors = ['default', 'red', 'green', 'blue']

let time = 0
let score = 0
let index = 0

startButton.addEventListener('click', event => {
    event.preventDefault()
    screens[0].classList.add('up')
})

timeList.addEventListener('click', event => {
    if (event.target.classList.contains('time-btn')) {
        screens[1].classList.add('up')
        time = parseInt(event.target.getAttribute('data-time'));
        startGame()
    }
})

board.addEventListener('click', event => {
    if (event.target.classList.contains('circle')) {
        score++
        event.target.remove()
        createRandomCircle()
    }
})

function startGame() {
    index = getRandomNumber(0, 3)
    setInterval(decreaseTime, 1000)
    createRandomCircle()
    setTime(time)
}

function decreaseTime() {
    if (time === 0) {
        finishGame()
    } else {
        setTime(--time)
    }
}

function setTime(value) {
    if (time < 10) {
        timeEl.innerHTML = `00:0${value}`
    } else {
        timeEl.innerHTML = `00:${value}`
    }
}

function finishGame() {
    timeEl.parentNode.classList.add('hide')
    board.innerHTML = `<h1>Ваш счет: <span class="primary">${score}</span></h1>`
}

function createRandomCircle() {
    const circle = document.createElement('div')
    const size = getRandomNumber(10, 60)
    const { height, width } = board.getBoundingClientRect()
    const x = getRandomNumber(0, width - size)
    const y = getRandomNumber(0, height - size)
    const colorClass = getRandomColorClass()
    console.log('colorClass', colorClass)

    circle.classList.add(colorClass)
    circle.classList.add('circle')
    circle.style.width = `${size}px`
    circle.style.height = `${size}px`
    circle.style.top = `${y}px`
    circle.style.left = `${x}px`

    board.append(circle)
}

function getRandomNumber(min, max) {
    return Math.round(Math.random() * (max - min) + min)
}

function getRandomColorClass() {
    let currentIndex = getRandomNumber(0, 3)
    while (index === currentIndex) {
        currentIndex = getRandomNumber(0, 3)
    }
    index = currentIndex
    return colors[currentIndex]
}