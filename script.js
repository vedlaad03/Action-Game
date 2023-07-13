score = 0;
cross = true;
audio = new Audio('music.mp3');
audiogo = new Audio('gameover.mp3');
setTimeout(() => {
    audio.play();
}, 1000);
document.onkeydown = function (e) {
    console.log("Key Code is", e.keyCode)
    if (e.keyCode == 38) {
        player = document.querySelector('.player');
        player.classList.add('animatePlayer');
        setTimeout(() => {
            player.classList.remove('animatePlayer')
        }, 700);
    }
    //right shift key code 39 right arrow
    if (e.keyCode == 39) {
        player = document.querySelector('.player');
        playerX = parseInt(window.getComputedStyle(player, null).getPropertyValue('left'));
        player.style.left = playerX + 112 + "px";
    }
    //left shift key code 37 left arrow
    if (e.keyCode == 37) {
        player = document.querySelector('.player');
        playerX = parseInt(window.getComputedStyle(player, null).getPropertyValue('left'));
        player.style.left = (playerX - 112) + "px";
    }

}
//dono ka collsion dekhne ke liye
setInterval(() => {
    player = document.querySelector('.player');
    gameOver = document.querySelector('.gameOver');
    obstacle = document.querySelector('.obstacle');

    dx = parseInt(window.getComputedStyle(player, null).getPropertyValue('left'));
    dy = parseInt(window.getComputedStyle(player, null).getPropertyValue('top'));

    ox = parseInt(window.getComputedStyle(obstacle, null).getPropertyValue('left'));
    oy = parseInt(window.getComputedStyle(obstacle, null).getPropertyValue('top'));

    offsetX = Math.abs(dx - ox);
    offsetY = Math.abs(dy - oy);
    if (offsetX < 133 && offsetY < 52) {
        gameOver.innerHTML = "Game Over - Reload to start"
        obstacle.classList.remove('obstacleAni')
        audiogo.play();
        audio.pause();
        setTimeout(()=>{
            audiogo.pause();
            
        },2000);
        
    }
    else if (offsetX < 145 && cross) {
        score += 1;
        updateScore(score);
        cross = false; // yaha score rukh jayega
        // fir kudne ke baad score ko firse start krne ke liye timeour et krdo
        setTimeout(() => {
            cross = true;
        }, 1000);
        setTimeout(() => {
            aniDur = parseFloat(window.getComputedStyle(obstacle, null).getPropertyValue('animation-duration'));
            newDur = aniDur - 0.1;
            obstacle.style.animationDuration = newDur + 's';
        }, 700);

    }
}, 100);

function updateScore(score) {
    scoreCont.innerHTML = "Your Score: " + score
}