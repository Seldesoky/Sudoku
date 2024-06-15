//-------------------------------- Constants --------------------------------
const initialBoards = [
    [
      [0, 0, 0, 2, 6, 0, 7, 0, 1],
      [6, 8, 0, 0, 7, 0, 0, 9, 0],
      [1, 9, 0, 0, 0, 4, 5, 0, 0],
      [8, 2, 0, 1, 0, 0, 0, 4, 0],
      [0, 0, 4, 6, 0, 2, 9, 0, 0],
      [0, 5, 0, 0, 0, 3, 0, 2, 8],
      [0, 0, 9, 3, 0, 0, 0, 7, 4],
      [0, 4, 0, 0, 5, 0, 0, 3, 6],
      [7, 0, 3, 0, 1, 8, 0, 0, 0]
    ],
    [
      [1, 0, 0, 4, 8, 9, 0, 0, 6],
      [7, 3, 0, 0, 0, 0, 0, 4, 0],
      [0, 0, 0, 0, 0, 1, 2, 9, 5],
      [0, 0, 7, 1, 2, 0, 6, 0, 0],
      [5, 0, 0, 7, 0, 3, 0, 0, 8],
      [0, 0, 6, 0, 9, 5, 7, 0, 0],
      [9, 1, 4, 6, 0, 0, 0, 0, 0],
      [0, 2, 0, 0, 0, 0, 0, 3, 7],
      [8, 0, 0, 5, 1, 2, 0, 0, 4]
    ],
    [
      [0, 2, 0, 6, 0, 8, 0, 0, 0],
      [5, 8, 0, 0, 0, 9, 7, 0, 0],
      [0, 0, 0, 0, 4, 0, 0, 0, 0],
      [3, 7, 0, 0, 0, 0, 5, 0, 0],
      [6, 0, 0, 0, 0, 0, 0, 0, 4],
      [0, 0, 8, 0, 0, 0, 0, 1, 3],
      [0, 0, 0, 0, 2, 0, 0, 0, 0],
      [0, 0, 9, 8, 0, 0, 0, 3, 6],
      [0, 0, 0, 3, 0, 6, 0, 9, 0]
    ]
  ];
  
  const solutionBoards = [
    [
      [4, 3, 5, 2, 6, 9, 7, 8, 1],
      [6, 8, 2, 5, 7, 1, 4, 9, 3],
      [1, 9, 7, 8, 3, 4, 5, 6, 2],
      [8, 2, 6, 1, 9, 5, 3, 4, 7],
      [3, 7, 4, 6, 8, 2, 9, 1, 5],
      [9, 5, 1, 7, 4, 3, 6, 2, 8],
      [5, 1, 9, 3, 2, 6, 8, 7, 4],
      [2, 4, 8, 9, 5, 7, 1, 3, 6],
      [7, 6, 3, 4, 1, 8, 2, 5, 9]
    ],
    [
      [1, 5, 2, 4, 8, 9, 3, 7, 6],
      [7, 3, 9, 2, 5, 6, 8, 4, 1],
      [4, 6, 8, 3, 7, 1, 2, 9, 5],
      [3, 8, 7, 1, 2, 4, 6, 5, 9],
      [5, 9, 1, 7, 6, 3, 4, 2, 8],
      [2, 4, 6, 8, 9, 5, 7, 1, 3],
      [9, 1, 4, 6, 3, 7, 5, 8, 2],
      [6, 2, 5, 9, 4, 8, 1, 3, 7],
      [8, 7, 3, 5, 1, 2, 9, 6, 4]
    ],
    [
      [1, 2, 3, 6, 7, 8, 9, 4, 5],
      [5, 8, 4, 2, 3, 9, 7, 6, 1],
      [9, 6, 7, 1, 4, 5, 3, 2, 8],
      [3, 7, 2, 4, 6, 1, 5, 8, 9],
      [6, 9, 1, 5, 8, 3, 2, 7, 4],
      [4, 5, 8, 7, 9, 2, 6, 1, 3],
      [8, 3, 6, 9, 2, 4, 1, 5, 7],
      [2, 1, 9, 8, 5, 7, 4, 3, 6],
      [7, 4, 5, 3, 1, 6, 8, 9, 2]
    ]
  ];
  
  const BOARD_SIZE = 9;
  
  //-------------------------------- Variables ----------------------------
  let board;

  let solutionBoard;
  
  let errorCount = 0;
  
  let gameSolved = false;
  
  let timer;
  let seconds = 0;
  let minutes = 0;
  
  let gameStarted = false;
  
  //-------------------------------- Cached Element References ------------------------
  const boardEl = document.querySelector('.sudoku-board');
  
  const resetButtonEl = document.querySelector('#reset-button');
  
  const startButtonEl = document.querySelector('#start-button');
  
  const messageEl = document.querySelector('#message');
  
  const errorCounterEl = document.querySelector('#error-count');
  
  const timerEl = document.querySelector('#timer');
  
  const instructionsButtonEl = document.querySelector('#instructions-button');
  const instructionsPopupEl = document.querySelector('#instructions-popup');
  const closePopupEl = document.querySelector('#close-popup');
  
  //-------------------------------- Functions --------------------------------
  function initBoard() {
    boardEl.innerHTML = '';
    for (let row = 0; row < BOARD_SIZE; row++) {
      for (let col = 0; col < BOARD_SIZE; col++) {
        const cell = document.createElement('div');
        cell.classList.add('sudoku-cell');
        cell.id = `cell-${row * BOARD_SIZE + col}`;
        const input = document.createElement('input');
        input.type = 'text';
        input.maxLength = '1';
        input.disabled = true; 
        input.addEventListener('input', handleInputChange);
        input.addEventListener('keypress', validateInput);
        cell.appendChild(input);
        boardEl.appendChild(cell);
      }
    }
  }
  
  function initGame() {
    errorCount = 0;
    gameSolved = false;
    gameStarted = false;
    seconds = 0;
    minutes = 0;
    updateErrorCounter();
    updateTimerDisplay();
  
    initBoard();
  
    messageEl.textContent = '';
  }
  
  function startGame() {
    if (!gameStarted) {
      gameStarted = true;
      const randomIndex = Math.floor(Math.random() * initialBoards.length);
      board = initialBoards[randomIndex].map(row => row.slice());
      solutionBoard = solutionBoards[randomIndex];
      renderBoard();
      startTimer();
    }
  }
  
  function renderBoard() {
    for (let row = 0; row < BOARD_SIZE; row++) {
      for (let col = 0; col < BOARD_SIZE; col++) {
        const cell = document.querySelector(`#cell-${row * BOARD_SIZE + col}`);
        cell.innerHTML = '';
        if (board[row][col] !== 0) {
          cell.textContent = board[row][col];
          cell.classList.add('fixed');
        } else {
          const input = document.createElement('input');
          input.type = 'text';
          input.maxLength = '1';
          input.addEventListener('input', handleInputChange);
          input.addEventListener('keypress', validateInput);
          cell.appendChild(input);
        }
      }
    }
  }
  
  function handleInputChange(event) {
    const input = event.target;
    const value = parseInt(input.value);
  
    if (gameSolved) {
      input.value = '';
      return;
    }
  
    const cellId = input.parentElement.id;
    const [_, index] = cellId.split('-').map(Number);
    const row = Math.floor(index / BOARD_SIZE);
    const col = index % BOARD_SIZE;
  
    if (!isNaN(value) && value >= 1 && value <= 9) {
      if (value === solutionBoard[row][col]) {
        board[row][col] = value;
      } else {
        input.value = '';
        errorCount++;
        updateErrorCounter();
        checkErrors();
      }
    } else {
      input.value = '';
      errorCount++;
      updateErrorCounter();
      checkErrors();
    }
    if (checkWin()) {
      gameSolved = true;
      displayWinMessage();
      disableAllInputs();
      stopTimer();
    }
  }
  
  function validateInput(event) {
    const key = event.key;
    if (!/^[1-9]$/.test(key)) {
      event.preventDefault();
      errorCount++;
      updateErrorCounter();
      checkErrors();
    }
  }
  
  function disableAllInputs() {
    const inputs = document.querySelectorAll('input');
    inputs.forEach(input => input.disabled = true);
  }
  
  function checkWin() {
    for (let row = 0; row < BOARD_SIZE; row++) {
      for (let col = 0; col < BOARD_SIZE; col++) {
        if (board[row][col] === 0 || board[row][col] !== solutionBoard[row][col]) {
          return false;
        }
      }
    }
    return true;
  }
  
  function displayWinMessage() {
    if (errorCount === 0) {
      messageEl.textContent = 'WOW, Superb! You can call yourself a Sudoku Guru!';
    } else if (errorCount === 1) {
      messageEl.textContent = 'Amazing, Congrats! You solved the puzzle with only one hit!';
    } else if (errorCount > 1 && errorCount < 10) {
      messageEl.textContent = 'Congratulations! You solved the puzzle!';
    } else {
      messageEl.textContent = 'Oops, You got a lot of hits, How about you try again!';
    }
  }
  
  function checkErrors() {
    if (errorCount >= 10) {
      gameSolved = true;
      disableAllInputs();
      stopTimer();
      messageEl.textContent = 'Oops, You got a lot of hits, How about you try again!';
    }
  }
  
  function updateErrorCounter() {
    errorCounterEl.textContent = `${errorCount}`;
  }
  
  function startTimer() {
    timer = setInterval(() => {
      seconds++;
      if (seconds === 60) {
        seconds = 0;
        minutes++;
      }
      updateTimerDisplay();
    }, 1000);
  }
  
  function stopTimer() {
    clearInterval(timer);
  }
  
  function updateTimerDisplay() {
    const formattedMinutes = String(minutes).padStart(2, '0');
    const formattedSeconds = String(seconds).padStart(2, '0');
    timerEl.textContent = `Time: ${formattedMinutes}:${formattedSeconds}`;
  }
  
  function resetGame() {
    stopTimer();
    initGame();
  }
  
  function showInstructions() {
    instructionsPopupEl.style.display = 'block';
  }
  
  function hideInstructions() {
    instructionsPopupEl.style.display = 'none';
  }
  
  //-------------------------------- Event Listeners -----------------------------
  resetButtonEl.addEventListener('click', resetGame);
  
  startButtonEl.addEventListener('click', startGame);
  
  instructionsButtonEl.addEventListener('click', showInstructions);
  
  closePopupEl.addEventListener('click', hideInstructions);
  
  initGame();
  