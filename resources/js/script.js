// script.js

// Define los colores disponibles para el juego
const COLORS = ['red', 'blue', 'green', 'yellow', 'orange', 'purple'];

// Genera un código aleatorio para adivinar
function generateCode() {
    return Array.from({ length: 4 }, () => COLORS[Math.floor(Math.random() * COLORS.length)]);
}

// Función principal para iniciar el juego
function startGame() {
    const secretCode = generateCode(); // Código secreto para adivinar
	console.log(secretCode);
	
    let attempts = 0; // Contador de intentos

	// Función para verificar la jugada del jugador
	function checkGuess(guess) {
		let feedback = [];
		let matchedPositions = [];
		
		// Compara el código secreto con el intento del jugador
		for (let i = 0; i < guess.length; i++) {
			if (guess[i] === secretCode[i]) {
				feedback.push('green'); // Ficha negra para posición y color correctos
				matchedPositions.push(i);
			} else if (secretCode.includes(guess[i])) {
				feedback.push('orange'); // Ficha blanca para color correcto pero en posición incorrecta
			} else {
				feedback.push('red');
			}
		}
		
		// Si no hay coincidencias, devuelve cuatro bolas negras
		if (feedback.length === 0) {
			feedback = ['red', 'red', 'red', 'red'];
		}

		// Devuelve las fichas de retroalimentación y las posiciones que hicieron match
		return { feedback, matchedPositions };
	}


    // Evento para manejar el intento del jugador
    document.getElementById('submit-btn').addEventListener('click', function() {
        const guess = Array.from(document.querySelectorAll('.guess'));
        const guessColors = guess.map(g => g.value);
        
        const { feedback, matchedPositions } = checkGuess(guessColors);

        // Mostrar retroalimentación al jugador
        const feedbackContainer = document.getElementById('feedback-container');
		const attemptSeparator = document.createElement('div');
		attemptSeparator.className = 'attempt-separator'; // Añadir una clase para estilizar el separador si es necesario
				
		feedback.forEach((color, index) => {
			const peg = document.createElement('div');
			peg.className = 'peg ' + color;
			attemptSeparator.appendChild(peg);
		});

		feedbackContainer.insertBefore(attemptSeparator, feedbackContainer.firstChild);
		
        attempts++; // Incrementa el contador de intentos
        document.getElementById('attempts-counter').textContent = attempts; // Actualiza el contador de intentos

        // Mostrar conjeturas anteriores
        /*const previousGuessesContainer = document.getElementById('previous-guesses');
        const previousGuessesDiv = document.createElement('div');
        previousGuessesDiv.textContent = `Attempt ${attempts}: ${guessColors.join(', ')} - Positions Matched: ${matchedPositions.map(p => p + 1).join(', ')}`;
        previousGuessesContainer.appendChild(previousGuessesDiv);
		*/
		
        if (matchedPositions.length === 4) {
            alert('¡Felicidades! Has adivinado el código secreto en ' + attempts + ' intentos.');
            // Aquí puedes reiniciar el juego si lo deseas
        } else if (attempts === 10) {
            alert('¡Has alcanzado el máximo de intentos! El código secreto era: ' + secretCode.join(''));
            // Aquí puedes reiniciar el juego si lo deseas
        }
    });
}

// Inicia el juego cuando el documento HTML haya cargado completamente
document.addEventListener('DOMContentLoaded', startGame);
