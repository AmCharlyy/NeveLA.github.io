document.addEventListener('DOMContentLoaded', () => {
    console.log('Script cargado correctamente');

    // Selección de elementos DOM
    const memoryList = document.getElementById('memory-list');
    const startMemoryBtn = document.getElementById('start-memory');
    const startQuizBtn = document.getElementById('start-quiz');
    const quizContainer = document.getElementById('quiz-container');
    const questionEl = document.getElementById('question');
    const answersEl = document.getElementById('answers');
    const nextQuestionBtn = document.getElementById('next-question');
    const timerEl = document.createElement('div'); // Temporizador dinámico
    timerEl.className = 'timer';

    
    let currentQuestionIndex = 0;
    let timerInterval;

    
    startMemoryBtn.addEventListener('click', () => {
        console.log('Iniciando el reto de memoria');
        const items = ['Manzana', 'Casa', 'Pelota', 'Reloj', 'Silla', 'Libro', 'Perro', 'Flor', 'Coche', 'Mesa'];
        memoryList.innerHTML = '';
        
        items.forEach(item => {
            const div = document.createElement('div');
            div.textContent = item;
            div.className = 'memory-item';
            memoryList.appendChild(div);
        });

        
        setTimeout(() => {
            memoryList.innerHTML = '';
            alert('Tiempo terminado. ¿Recuerdas los elementos?');
        }, 30000);
    });

    
    const quizQuestions = [
        {
            question: '¿Cuál es la capital de Francia?',
            answers: ['París', 'Madrid', 'Roma', 'Berlín'],
            correct: 0
        },
        {
            question: '¿Cuánto es 5 x 6?',
            answers: ['11', '30', '25', '35'],
            correct: 1
        },
        {
            question: '¿Quién escribió "Cien años de soledad"?',
            answers: ['Mario Vargas Llosa', 'Gabriel García Márquez', 'Isabel Allende', 'Pablo Neruda'],
            correct: 1
        }
    ];

    
    startQuizBtn.addEventListener('click', () => {
        console.log('Iniciando el quiz');
        startQuizBtn.classList.add('hidden');
        quizContainer.classList.remove('hidden');
        quizContainer.insertAdjacentElement('beforebegin', timerEl); 
        startTimer(60); 
        loadQuestion();
    });

    nextQuestionBtn.addEventListener('click', () => {
        console.log('Cargando siguiente pregunta');
        currentQuestionIndex++;
        if (currentQuestionIndex < quizQuestions.length) {
            loadQuestion();
        } else {
            clearInterval(timerInterval); 
            quizContainer.innerHTML = '<p>¡Quiz finalizado! Gracias por participar.</p>';
        }
    });

    //  cargar una pregunta
    function loadQuestion() {
        const currentQuestion = quizQuestions[currentQuestionIndex];
        console.log('Cargando pregunta: ', currentQuestion);
        questionEl.textContent = currentQuestion.question;
        answersEl.innerHTML = '';

        currentQuestion.answers.forEach((answer, index) => {
            const button = document.createElement('button');
            button.textContent = answer;
            button.className = 'cta-button';
            button.addEventListener('click', () => {
                if (index === currentQuestion.correct) {
                    alert('Respuesta correcta');
                } else {
                    alert('Respuesta incorrecta');
                }
            });
            answersEl.appendChild(button);
        });
    }

    
    function startTimer(duration) {
        let timeRemaining = duration;
        timerEl.textContent = `Tiempo: ${timeRemaining}s`;

        timerInterval = setInterval(() => {
            timeRemaining--;
            timerEl.textContent = `Tiempo: ${timeRemaining}s`;

            if (timeRemaining <= 0) {
                clearInterval(timerInterval);
                alert('¡Se acabó el tiempo!');
                quizContainer.innerHTML = '<p>El tiempo ha terminado. ¡Gracias por participar!</p>';
            }
        }, 1000);
    }
});
