const state = {
    view: {
        squares: document.querySelectorAll(".square"),
        enemy: document.querySelector(".enemy"),
        timeleft: document.querySelector("#time-left"),
        score: document.querySelector("#score"),

    },
    values: {
        timerId: null,
        gameVelocity: 1000,
        hitPosition: 0,
        result: 0,
        curretTime: 60,
    },
    actions:{
        timerId: setInterval(randomSquare, 1000),
        countDownTimerId: setInterval(countDown, 1000),
    }
};

function countDown(){
    state.values.curretTime--;
    state.view.timeleft.textContent = state.values.curretTime;

    if(state.values.curretTime <=0) {
        clearInterval(state.actions.countDownTimerId);
        clearInterval(state.actions.TimerId);
        alert("Gamer Over! O seu resultado foi: " + state.values.result);
    }

}

function playSound(){
    let audio = new Audio("./src/audios/hit.m4a");
    audio.volume = 0.2;
    audio.play();
}

//função criada pra percorrer todas as classe e remover a classe enemy
function randomSquare() {
    state.view.squares.forEach((square) => {
        square.classList.remove("enemy");
    });

    let randomNumber = Math.floor(Math.random() * 9);
    let randomSquare = state.view.squares[randomNumber];
    randomSquare.classList.add("enemy");
    state.values.hitPosition = randomSquare.id;
}
//mover o inimigo//criando um intervalo
function moveEnemy() {
    state.values.timerId = setInterval(randomSquare, state.values.gameVelocity);
}

//listener é como se fosse alguem ouvindo o que vai acontecer
function addListenerHitBox() {
    state.view.squares.forEach((square) => {
      square.addEventListener("mousedown", () => {
        if (square.id === state.values.hitPosition) {
          state.values.result++;
          state.view.score.textContent = state.values.result;
          state.values.hitPosition = null;
          playSound("hit");
        }
      });
    });
  }

//tem que ter uma função principal. Pode ser init, initialize, main
function initialize() {
    //chama a função de eventos do teclado
    moveEnemy();
    addListenerHitBox();
}

initialize();