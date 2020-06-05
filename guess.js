function randomNum(min, max) {
    return Math.floor(Math.random() * (max - min + 1) + min)
  }

const readline = require('readline')
const rli = readline.createInterface(process.stdin, process.stdout)

function capitalize(s){
    return s.charAt(0).toUpperCase() + s.slice(1).toLowerCase()
}

function ask(questionText){
    return new Promise((resolve, reject) => {
        rli.question(questionText, resolve)
    })
}

async function binary_search(min_num, max_num){                                                 // Since I know I'm not looking through an array but a range, I only need to worry about 1 to n
    let guessNum = Math.floor((min_num + max_num)/2)
    let response = await ask(`I guess ${guessNum}. Is this number right, too high, or too low? (r/h/l)`)
    if((response === 'l' || response === 'h') && (max_num - min_num < 2)){
        console.log("Cheater detected!")
        process.exit()
    }
    switch(response){                                                                       // Unless the input is 'r', I use recursion on this function to loop to the start depending on the response with the new max or min determined by the last max or min
        case 'r':
            console.log('Yes! I win!')
            process.exit()
        case 'h':
            console.log(`Hmm... I\'ll remember the number is less than ${guessNum}...`)
            binary_search(1,guessNum-1)
            break
        case 'l':
            console.log(`Hmmm... I\'ll remember this number is more than ${guessNum}...`)
            binary_search(guessNum+1, max_num)
            break
        
        default:
            console.log('Unexpected input! Please enter again')
            binary_search(min_num, max_num)
            break
    }
}

async function random_guess(min_num, max_num){
    let guessNum = randomNum(min_num,max_num)  
    let response = await ask(`I guess ${guessNum}. Is this number right, too high, or too low? (r/h/l)`)
    if((response === 'l' || response === 'h') && (max_num - min_num < 2)){
        console.log("Cheater detected!")
        process.exit()
    }
    switch(response){                                                                                       // Unless the input is 'r', I use recursion on this function to loop to the start depending on the response with the new max or min determined by the last max or min
        case 'r':
            console.log('Yes! I win!')
            process.exit()
        case 'h':
            console.log(`Hmm... I\'ll remember the number is less than ${guessNum}...`)
            random_guess(1,guessNum-1)
            break
        case 'l':
            console.log(`Hmmm... I\'ll remember this number is more than ${guessNum}...`)
            random_guess(guessNum+1, max_num)
            break
        
        default:
            console.log('Unexpected input! Please enter again')
            random_guess(min_num, max_num)
            break
    }
    
}

async function player_guess(min_num, max_num, answer){
    console.log(answer)
    
    let unclean_response = await ask(`Pick any number between ${min_num} and ${max_num} `)
    var response = parseInt(unclean_response, 10);
    if(Number.isInteger(response) === false){
        console.log("Error, unexpected input, the input is not a number!")
        player_guess(min_num, max_num, answer)
    }

    if(response > answer){
        console.log("Your input was higher than the answer! Try again")
        player_guess(min_num, max_num, answer)
    } else if (response < answer) {
        console.log("Your input was lower than the answer! Try again")
        player_guess(min_num, max_num, answer)
    } else {
        let game_mode = await ask("Congratulations! You\'ve guessed correctly! Go back to menu? (y/n)")                                                                    
        switch(game_mode){
            case 'y':
                start()
                break

            case 'n':
                console.log("Goodbye!")
                process.exit()
                break

            default:
                console.log("Unexpected output! Exiting by default")
                process.exit()
                break
        }
            
        }
       
            
    }
    
        

    
}


async function start(){
    let unclean_max = await ask("Hello, please think of a number between 1 and any number. Choose the maximum.")
    var max = parseInt(unclean_max, 10);

    if((Number.isInteger(max)) === true){
        let game_mode = await ask("Do you want the computer to guess the number or you? (c/y)")
        switch(game_mode){
            case 'y':
                answer = randomNum(1, max)
                player_guess(1, max, answer)
                break
            
            case 'c':
                let guess_mode = await ask("Please choose random or binary guessing (b/r)")
                switch(guess_mode){
                    case 'b':
                        binary_search(1, max)
                        break
                    
                    case 'r':
                        random_guess(1, max)
                        break
                    default:
                        console.log("Error, incorrect number, please try again.")
                        start()
                        break                
            default:
                console.log("Hmm")
                process.exit()
                
        }
        
        
        }
        
    } else {
        console.log('Please enter a real number!')
        start()
    }

}

start()
