

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

// Функция для отображения текущего вопроса
function showQuestion() {
  // Получаем текущий вопрос из массива questions
  const q = questions[currentQuestion];

  // Заполняем контейнер текстом вопроса
  quizContainer.innerHTML = `<p>${q.text}</p>`;

  // Перебираем все возможные ответы на вопрос
  q.answers.forEach((answer, i) => {
    // Добавляем радиокнопку для каждого ответа с его значением (баллом)
    quizContainer.innerHTML += `<label>
          <input type='radio' name='answer' value='${q.scores[i]}'> ${answer}
      </label><br><br>`;
  });
}

// Функция обработки ответа и перехода к следующему вопросу
function nextQuestion() {
  startMusic(); // Запускаем музыку при первом нажатии

  const selected = document.querySelector("input[name='answer']:checked");
  if (selected) {
    score += parseInt(selected.value);
    currentQuestion++;

    if (currentQuestion < questions.length) {
      showQuestion();
    } else {
      showResult();
    }
  }
}

// Функция для показа итогового результата теста
function showResult() {
  // Определяем результат в зависимости от количества набранных баллов
  let resultText =
    score >= 40
      ? "Ты очень любишь свою маму! Можно телефон на час"
      : score >= 30
      ? "Ты любишь маму, но иногда забываешь об этом. Можно телефон по разрешении мамы."
      : score >= 15
      ? "Ты мог бы быть внимательнее к маме. Телефон нельзя."
      : "Попробуй больше заботиться о маме. Забудь о телефоне на неделю";

  // Выводим результат на экран
  quizContainer.innerHTML = `<p class='result'>${resultText}</p>`;

  // Изменяем текст кнопки на "Пройти тест еще раз"
  nextButton.textContent = "Пройти тест еще раз";
  
  // Убираем обработчик для перехода к следующему вопросу
  nextButton.removeEventListener("click", nextQuestion);
  
  // Добавляем обработчик для сброса теста
  nextButton.addEventListener("click", resetTest);
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
