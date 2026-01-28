// Get display element
const display = document.querySelector('.display');

// Calculator state
let currentValue = '0';
let previousValue = '';
let operation = null;
let shouldResetDisplay = false;

// Get all buttons
const buttons = document.querySelectorAll('.pill-btn');

// Add click event listeners to all buttons
buttons.forEach(button => {
  button.addEventListener('click', () => {
    const value = button.textContent;
    
    if (value >= '0' && value <= '9') {
      handleNumber(value);
    } else if (value === '.') {
      handleDecimal();
    } else if (value === 'AC') {
      handleClear();
    } else if (value === 'DEL') {
      handleDelete();
    } else if (value === '+' || value === '-' || value === '*' || value === '/') {
      handleOperation(value);
    } else if (value === '%') {
      handlePercent();
    } else if (value === '=') {
      handleEquals();
    }
    
    updateDisplay();
  });
});

// Handle number input
function handleNumber(num) {
  if (shouldResetDisplay) {
    currentValue = num;
    shouldResetDisplay = false;
  } else {
    currentValue = currentValue === '0' ? num : currentValue + num;
  }
}

// Handle decimal point
function handleDecimal() {
  if (shouldResetDisplay) {
    currentValue = '0.';
    shouldResetDisplay = false;
    return;
  }
  
  if (!currentValue.includes('.')) {
    currentValue += '.';
  }
}

// Handle clear (AC)
function handleClear() {
  currentValue = '0';
  previousValue = '';
  operation = null;
  shouldResetDisplay = false;
}

// Handle delete (DEL)
function handleDelete() {
  if (currentValue.length > 1) {
    currentValue = currentValue.slice(0, -1);
  } else {
    currentValue = '0';
  }
}

// Handle operation buttons
function handleOperation(op) {
  if (operation !== null && !shouldResetDisplay) {
    handleEquals();
  }
  
  previousValue = currentValue;
  operation = op;
  shouldResetDisplay = true;
}

// Handle percent
function handlePercent() {
  const num = parseFloat(currentValue);
  currentValue = (num / 100).toString();
}

// Handle equals
function handleEquals() {
  if (operation === null || shouldResetDisplay) {
    return;
  }
  
  const prev = parseFloat(previousValue);
  const current = parseFloat(currentValue);
  let result = 0;
  
  switch (operation) {
    case '+':
      result = prev + current;
      break;
    case '-':
      result = prev - current;
      break;
    case '*':
      result = prev * current;
      break;
    case '/':
      if (current === 0) {
        currentValue = 'Error';
        operation = null;
        shouldResetDisplay = true;
        return;
      }
      result = prev / current;
      break;
  }
  
  // Round to avoid floating point errors
  currentValue = Math.round(result * 100000000) / 100000000 + '';
  operation = null;
  shouldResetDisplay = true;
}

// Update display
function updateDisplay() {
  display.value = currentValue;
}

// Initialize display
updateDisplay();

// Add keyboard support
document.addEventListener('keydown', (e) => {
  if (e.key >= '0' && e.key <= '9') {
    handleNumber(e.key);
    updateDisplay();
  } else if (e.key === '.') {
    handleDecimal();
    updateDisplay();
  } else if (e.key === 'Enter' || e.key === '=') {
    handleEquals();
    updateDisplay();
  } else if (e.key === 'Escape') {
    handleClear();
    updateDisplay();
  } else if (e.key === 'Backspace') {
    handleDelete();
    updateDisplay();
  } else if (e.key === '+' || e.key === '-' || e.key === '*' || e.key === '/') {
    handleOperation(e.key);
    updateDisplay();
  } else if (e.key === '%') {
    handlePercent();
    updateDisplay();
  }
});