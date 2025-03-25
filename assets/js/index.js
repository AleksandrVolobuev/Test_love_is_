const gameMusic = document.querySelector(".gameMusic");
gameMusic.volume = 0.5; // Громкость музыки

let isMusicStarted = false; // Флаг для отслеживания запуска музыки

// Функция для запуска музыки
function startMusic() {
  if (!isMusicStarted) {
    gameMusic.play();
    isMusicStarted = true;
  }
}

// Функция обновления сообщения о текущем ходе
let currentQuestion = 0;

// Счетчик баллов
let score = 0;

// Контейнер, в котором отображаются вопросы и варианты ответов
const quizContainer = document.querySelector(".quiz");

// Кнопка "Следующий вопрос"
const nextButton = document.querySelector(".nextButton");
nextButton.addEventListener("click", nextQuestion);

const shuffleAnswers = (question) => {
  // Сохраняем ответы и баллы в массив объектов
  const answersWithScores = question.answers.map((answer, index) => ({
    answer,
    score: question.scores[index]
  }));
  
  // Перемешиваем ответы и их баллы
  answersWithScores.sort(() => Math.random() - 0.5);
  
  // Обновляем вопрос с перемешанными ответами и баллами
  question.answers = answersWithScores.map(item => item.answer);
  question.scores = answersWithScores.map(item => item.score);
};

// Функция для отображения текущего вопроса
function showQuestion() {
  // Выводим текущий вопрос в консоль
  console.log('Текущий вопрос:', questions[currentQuestion]);
  
  const q = questions[currentQuestion];
  shuffleAnswers(q);
  
  quizContainer.innerHTML = `<p>${q.text}</p>`;

  q.answers.forEach((answer, i) => {
    quizContainer.innerHTML += `<label>
      <input type='radio' class="w-5 h-5 text-blue-500 focus:ring-blue-400" name='answer' value='${q.scores[i]}'> ${answer}
    </label><br>`;
  });
}


// Функция обработки ответа и перехода к следующему вопросу
function nextQuestion() {
  console.log('Переходим к следующему вопросу...');

  const selected = document.querySelector("input[name='answer']:checked");
  if (selected) {
    score += parseInt(selected.value); // Добавляем баллы
    currentQuestion++; // Переходим к следующему вопросу

    console.log('Текущий вопрос:', currentQuestion);
    
    if (currentQuestion < questions.length) {
      showQuestion(); // Показываем следующий вопрос
    } else {
      console.log('Последний вопрос, показываем результат.');
      showResult(); // Если это последний вопрос, показываем результат
    }
  }
}



// Функция для показа итогового результата теста
function showResult() {
  console.log('Результат теста...');

  let resultText =
    score >= questions.length * 3
      ? answers[0]
      : score >= questions.length * 2
      ? answers[1]
      : score >= questions.length * 1
      ? answers[2]
      : answers[3];

  quizContainer.innerHTML = `<p class='result'>${resultText}</p>`;

  // Изменяем текст кнопки
  nextButton.textContent = "Пройти тест еще раз";
  nextButton.removeEventListener("click", nextQuestion);
  nextButton.addEventListener("click", resetTest);

  console.log('Результат показан, обработчик кнопки добавлен.');
}

// Функция для сброса теста
function resetTest() {
  score = 0;
  currentQuestion = 0;
  nextButton.textContent = "Ответить";
  showQuestion();

  // Убираем обработчик для сброса теста
  nextButton.removeEventListener("click", resetTest);

  // Восстанавливаем обработчик для "Следующего вопроса"
  nextButton.addEventListener("click", nextQuestion);
}

// Запускаем первый вопрос
showQuestion();
