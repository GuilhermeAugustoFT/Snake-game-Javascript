window.onload = function(){

    var stage = document.getElementById("stage");
    var ctx = stage.getContext("2d"); // Aqui acontecerá toda a parte visual do Jogo
    document.addEventListener("keydown", keyMap); // Espera com que o evento "keydown" seja ativado, e assim executa a função keymap 
    setInterval(game, 60); // faz com que a função game seja chamada a cada 60 milisegundos


    const vel = 1; // velocidade da cobra

    var vx = vy = 0; // iniciando a velocidade x e y da cobra com 0
    var px = py = 10; // local onde a cobra irá começar 
    var size = 20; // tamanho em px de cada quadrado
    var quantity = 25; // numero de quadrados no canvas 
    var appleX = appleY = 15; // posição inicial da maçã
    
    var snake = [];
    var tail = 2;
    started = false;

    var direction = " ";

    var score = 0;

    var leaderboard = [];
    var index = 0;

    function game() {
        
        px += vx; // } --> Inicializando a posição da cobra
        py += vy; // }

        if(px < 0) // se a cobra sair do stage
        {
            die();
        }
        if(px > quantity - 1) // se a cobra sair do stage
        {
            die();
        }
        if(py < 0) // se a cobra sair do stage
        {
            die();
        }
        if(py > quantity - 1) // se a cobra sair do stage
        {
            die();
        }
        
        
        ctx.fillStyle = "black"; // Escolhe a cor de fundo do stage
        ctx.fillRect(0, 0, stage.width, stage.height) ; // Preenche o stage com a cor de fundo escolhida 

        ctx.fillStyle = "red"; // Escolhe a cor da Maçã
        ctx.fillRect(appleX * size, appleY * size, size, size); // Preenche a posição da maçã com vermelho

        ctx.fillStyle = "gray"; // Escolhe a cor da cobra
        for(var i = 0; i < snake.length; i++)
        {
            ctx.fillRect(snake[i].x * size, snake[i].y * size, size - 1, size - 1); // preenche os blocos onde a cobra esta com azul claro

            if(px == snake[i].x && py == snake[i].y) // se a cabeça da cobra colidir com seu corpo
            {
                die();
            } 
        }

        snake.push({x : px, y : py}) // faz a cobra se movimentar

        while (snake.length > tail) { // se o tamanho da cobra foi maior do que a cauda
            snake.shift(); // tira o primeiro elemento do Array
        }

        if(px == appleX && py == appleY) // se a cobra pegar a maçã
        {
            tail++; // a cauda da cobra aumenta
            appleX = Math.floor(Math.random()*quantity); // Reposiciona a maçã
            appleY = Math.floor(Math.random()*quantity); // Reposiciona a maçã
            score++; // aumenta a pontuação do jogador
            document.getElementById("score").innerHTML = "Your score : " + score; // Atualiza a pontuação do jogador
        }
        

    }

    function keyMap(event) // função responsável pela movimentação
    {
        
        switch(event.keyCode) { // dependendo da tecla pressionada
            case 37: // left
                if(!(direction == "right")) // Se a direção não for a oposta
                {
                    vx = -vel; // movimenta para a esquerda
                    vy = 0;
                    started = true;  // Diz ao jogo que o usuário começou a jogar   
                    direction = "left"; // Muda o valor da váriavel que indica a direção
                }


            break;
            case 38: // Up
                if(!(direction == "down")) // Se a direção não for a oposta
                { 
                    vy = - vel; // movimenta para cima
                    vx = 0;
                    started = true; // Diz ao jogo que o usuário começou a jogar
                    direction = "up"; // Muda o valor da váriavel que indica a direção
                }
            break;
            case 39: // right
                if(!(direction == "left")) // Se a direção não for a oposta
                {
                    vx = vel; // movimenta para a direita
                    vy = 0;
                    started = true; // Diz ao jogo que o usuário começou a jogar
                    direction = "right"; // Muda o valor da váriavel que indica a direção
                }
               
            break;
            case 40: // down
                if(!(direction == "up")) // Se a direção não for a oposta
                {
                    vy = vel; // movimenta para baixo
                    vx = 0;
                    started = true; // Diz ao jogo que o usuário começou a jogar
                    direction = "down"; // Muda o valor da váriavel que indica a direção
                }
                
            break;
        }
    }    
    
    function generateLeaderboard()
    {
        leaderboard.sort(compare);
        leaderboard.reverse();
        var html = " ";
        for(var i = 0; i < leaderboard.length; i++)
        {
            html += "<li>" + leaderboard[i].name + " with "+ leaderboard[i].score + " points.</li>";
        }
        
        document.getElementById("leaderboard").innerHTML = html;
    }

    function compare(a, b)
    {
        if(a.score > b.score)
            return 1;

        if(a.score < b.score)
            return -1;

        if(a.score == b.score)
        return 0;
    }

    function die()
    {
        vx = vy = 0; // Para a cobra
        tail = 2; // volta a cobra para o tamanho inicial
         
        if(started)
        {
            document.getElementById("score").innerHTML = "Your final score was : " + score; // diz ao usuário sua pontação final
            started = false;
            var username = document.getElementById("textBox").value;
            username = username.replace('<', '&lt');
            username = username.replace('>', '&gt');                
            leaderboard[index] = {name: username, score: score};
            index++;
            generateLeaderboard()

            px = py = 10;
        }

        
        


        score = 0; // zera a pontuação 
    }
}