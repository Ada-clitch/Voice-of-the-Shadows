let voices = [];

function generateVoices() {
  const truths = [
    "The exit is behind me.",
    "Only one of us speaks truth.",
    "You will regret trusting them.",
    "The shadows lie... but not me."
  ];

  const lies = [
    "All of us are truthful.",
    "The truth is not important.",
    "There is no escape.",
    "I say what they say."
  ];

  const truthIndex = Math.floor(Math.random() * 3);

  voices = [0, 1, 2].map((i) => {
    return {
      isTruth: i === truthIndex,
      text: i === truthIndex
        ? truths[Math.floor(Math.random() * truths.length)]
        : lies[Math.floor(Math.random() * lies.length)]
    };
  });
}

function displayVoices() {
  voices.forEach((voice, index) => {
    const el = document.getElementById(`voice${index + 1}`);
    el.textContent = voices[index].text;
    el.onclick = () => checkAnswer(index);
  });
}

function checkAnswer(index) {
  const result = document.getElementById("result");
  if (voices[index].isTruth) {
    typeWriter("🎉 You found the truth! You may pass...", "result", "#0f0");
  } else {
    typeWriter("❌ That was a lie. The maze deepens...", "result", "#f00");
  }
}

function startGame() {
  generateVoices();
  displayVoices();
  typeWriter("One voice tells the truth. Choose wisely...", "instruction", "#fff");
  document.getElementById("result").textContent = "";
}

function toggleMusic() {
  const music = document.getElementById("bg-music");
  music.muted = !music.muted;
}

function typeWriter(text, elementId, color = "#fff", speed = 40) {
  let i = 0;
  const el = document.getElementById(elementId);
  el.textContent = "";
  el.style.color = color;

  function type() {
    if (i < text.length) {
      el.textContent += text.charAt(i);
      i++;
      setTimeout(type, speed);
    }
  }
  type();
}

startGame();
// 🔊 Ensure music starts after user interaction
window.addEventListener('click', function playMusicOnce() {
  const music = document.getElementById("bg-music");
  music.play().catch((e) => {
    console.log("Autoplay prevented:", e);
  });
  window.removeEventListener('click', playMusicOnce); // only once
});