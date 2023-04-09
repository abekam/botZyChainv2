console.log('main.js loaded');

const form = document.querySelector('.chat-form');
const chatHistory = document.querySelector('.chat-history');
const loadingIndicator = document.querySelector('.loading-indicator');

form.addEventListener('submit', async (event) => {
  event.preventDefault();
  console.log('Form submitted');
  loadingIndicator.style.display = 'block';

  const question = event.target.elements.question.value;
  const userQuestion = document.createElement('p');
  userQuestion.classList.add('user-question');
  userQuestion.textContent = question;
  chatHistory.appendChild(userQuestion);

  const response = await fetch('/', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      question: question,
      history: chatHistory.innerText,
      secret: 'yarab',
    }),
  });

  const responseData = await response.json();
  loadingIndicator.style.display = 'none';

  if (response.ok && responseData.success) {
    const answer = responseData.answer;
    const botAnswer = document.createElement('p');
    botAnswer.classList.add('bot-answer');
    botAnswer.textContent = answer;
    chatHistory.appendChild(botAnswer);
  } else {
    const errorMessage = document.createElement('p');
    errorMessage.textContent = responseData.message || 'Error';
    chatHistory.appendChild(errorMessage);
  }
});
