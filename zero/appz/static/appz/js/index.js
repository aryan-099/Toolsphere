// Math Trivia Data
const triviaData = [
    "The Shape of Earth's Shadow: During a lunar eclipse, Earth's shadow is circular. This observation helped ancient mathematicians like Pythagoras realize Earth is round.",
    "Zero as a Number: The concept of zero as a number was developed in India around 458 AD.",
    "The Golden Ratio: The number φ (1.618...) appears frequently in nature and art.",
    "Perfect Numbers: 6 is the first perfect number - its factors (1, 2, 3) sum to itself.",
    "Euler's Identity: e^(iπ) + 1 = 0 is often considered the most beautiful equation."
  ];
  
  let currentTrivia = 0;
  let autoPlayInterval;
  const AUTOPLAY_DELAY = 5000; // 5 seconds
  
  function updateTrivia() {
    const triviaContent = document.getElementById('trivia-content');
    const dotsContainer = document.getElementById('trivia-dots');
    
    // Update trivia text with fade effect
    triviaContent.style.opacity = '0';
    setTimeout(() => {
      triviaContent.textContent = triviaData[currentTrivia];
      triviaContent.style.opacity = '1';
    }, 300);
    
    // Update dots
    dotsContainer.innerHTML = '';
    triviaData.forEach((_, index) => {
      const dot = document.createElement('div');
      dot.className = `dot ${index === currentTrivia ? 'active' : ''}`;
      dot.addEventListener('click', () => {
        currentTrivia = index;
        updateTrivia();
        resetAutoPlay();
      });
      dotsContainer.appendChild(dot);
    });
  }
  
  function nextTrivia() {
    currentTrivia = (currentTrivia + 1) % triviaData.length;
    updateTrivia();
  }
  
  function prevTrivia() {
    currentTrivia = (currentTrivia - 1 + triviaData.length) % triviaData.length;
    updateTrivia();
  }
  
  function startAutoPlay() {
    autoPlayInterval = setInterval(nextTrivia, AUTOPLAY_DELAY);
  }
  
  function resetAutoPlay() {
    clearInterval(autoPlayInterval);
    startAutoPlay();
  }
  
  // Initialize trivia
  document.addEventListener('DOMContentLoaded', () => {
    updateTrivia();
    startAutoPlay();
    
    // Add event listeners for navigation
    document.getElementById('prev-trivia').addEventListener('click', () => {
      prevTrivia();
      resetAutoPlay();
    });
    
    document.getElementById('next-trivia').addEventListener('click', () => {
      nextTrivia();
      resetAutoPlay();
    });
  });