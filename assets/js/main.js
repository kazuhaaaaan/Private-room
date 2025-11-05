
// Thought Wall logic
const thoughtInput = document.getElementById("thought-input");
const saveThoughtBtn = document.getElementById("save-thought");
const clearThoughtBtn = document.getElementById("clear-thought");
const thoughtList = document.getElementById("thought-list");

// Ambil data yang sudah disimpan di localStorage
let thoughts = JSON.parse(localStorage.getItem("thoughts")) || [];

// Fungsi render daftar pikiran
function renderThoughts() {
  thoughtList.innerHTML = "";
  thoughts.forEach((thought, index) => {
    const div = document.createElement("div");
    div.className = "p-3 bg-[#0c0b10] rounded-md flex justify-between items-start";
    div.innerHTML = `
      <p class="text-sm text-gray-300 whitespace-pre-line">${thought}</p>
      <button class="text-xs text-gray-500 hover:text-red-400 ml-4" data-index="${index}">Delete</button>
    `;
    thoughtList.appendChild(div);
  });
}

// Simpan ke localStorage
function saveThought() {
  const text = thoughtInput.value.trim();
  if (text !== "") {
    thoughts.push(text);
    localStorage.setItem("thoughts", JSON.stringify(thoughts));
    thoughtInput.value = "";
    renderThoughts();
  }
}

// Hapus semua pikiran
function clearThoughts() {
  localStorage.removeItem("thoughts");
  thoughts = [];
  renderThoughts();
}

// Hapus salah satu pikiran
thoughtList.addEventListener("click", (e) => {
  if (e.target.tagName === "BUTTON") {
    const index = e.target.getAttribute("data-index");
    thoughts.splice(index, 1);
    localStorage.setItem("thoughts", JSON.stringify(thoughts));
    renderThoughts();
  }
});

// Event listeners
saveThoughtBtn.addEventListener("click", saveThought);
clearThoughtBtn.addEventListener("click", clearThoughts);

// Render awal
renderThoughts();

// === NAVBAR SCROLL EFFECT & MENU ===
  const navbar = document.getElementById('navbar');
  const menuBtn = document.getElementById('menu-btn');
  const navLinks = document.getElementById('nav-links');

  menuBtn.addEventListener('click', () => {
    navLinks.classList.toggle('hidden');
  });

  window.addEventListener('scroll', () => {
    if (window.scrollY > 10) {
      navbar.classList.add('backdrop-blur-lg', 'bg-[#0B0B14]/70', 'shadow-lg');
    } else {
      navbar.classList.remove('backdrop-blur-lg', 'bg-[#0B0B14]/70', 'shadow-lg');
    }
  });

  // === AMBIENT SOUND SYSTEM ===
  const ambientMainBtn = document.getElementById('toggle-sound');
  const ambientBtns = document.querySelectorAll('.ambient-btn');
  let ambientAudio = null;
  let currentAmbient = '';

  function stopAmbient() {
    if (ambientAudio) {
      ambientAudio.pause();
      ambientAudio.currentTime = 0;
      ambientAudio = null;
      currentAmbient = '';
      ambientMainBtn.textContent = 'Ambient: OFF';
    }
  }

  ambientMainBtn.addEventListener('click', () => {
    if (ambientAudio && !ambientAudio.paused) {
      stopAmbient();
    } else if (ambientAudio) {
      ambientAudio.play();
      ambientMainBtn.textContent = 'Ambient: ON';
    }
  });

  ambientBtns.forEach(btn => {
    btn.addEventListener('click', () => {
      const type = btn.dataset.ambient;
      stopAmbient();

      if (type === 'stop') return;

      let audioSrc = '';
      if (type === 'space') audioSrc = 'assets/Space.mp3';
      if (type === 'lofi') audioSrc = 'assets/Lofi.mp3';

      ambientAudio = new Audio(audioSrc);
      ambientAudio.loop = true;
      ambientAudio.volume = 0.5;
      ambientAudio.play();
      currentAmbient = type;
      ambientMainBtn.textContent = `Ambient: ${type.toUpperCase()}`;
    });
  });

  // === AURORA BACKGROUND ===
  const canvas = document.getElementById('aurora-bg');
  const ctx = canvas.getContext('2d');
  let particles = [];

  function resize() {
    canvas.width = innerWidth;
    canvas.height = innerHeight;
  }
  window.addEventListener('resize', resize);
  resize();

  for (let i = 0; i < 60; i++) {
    particles.push({
      x: Math.random() * canvas.width,
      y: Math.random() * canvas.height,
      r: Math.random() * 2 + 1,
      dx: (Math.random() - 0.5) * 0.4,
      dy: (Math.random() - 0.5) * 0.4
    });
  }

  function aurora(scrollY) {
    const gradient = ctx.createLinearGradient(0, scrollY / 5, canvas.width, canvas.height);
    gradient.addColorStop(0, 'rgba(123,97,255,0.12)');
    gradient.addColorStop(0.5, 'rgba(80,60,180,0.18)');
    gradient.addColorStop(1, 'rgba(10,10,25,0.1)');
    ctx.fillStyle = gradient;
    ctx.fillRect(0, 0, canvas.width, canvas.height);
  }

  function animate() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    aurora(window.scrollY);
    particles.forEach(p => {
      ctx.beginPath();
      ctx.arc(p.x, p.y, p.r, 0, Math.PI * 2);
      ctx.fillStyle = 'rgba(123,97,255,0.15)';
      ctx.fill();
      p.x += p.dx;
      p.y += p.dy;
      if (p.x < 0 || p.x > canvas.width) p.dx *= -1;
      if (p.y < 0 || p.y > canvas.height) p.dy *= -1;
    });
    requestAnimationFrame(animate);
  }
  animate();

  // === FADE IN EFFECT ===
  document.body.style.opacity = 0;
  window.addEventListener('load', () => {
    document.body.style.transition = 'opacity 1.5s ease';
    document.body.style.opacity = 1;
  });

// TASK SYSTEM
const taskInput = document.getElementById('task-input');
const addTask = document.getElementById('add-task');
const taskList = document.getElementById('task-list');

let tasks = JSON.parse(localStorage.getItem('tasks')) || [];

function renderTasks() {
  taskList.innerHTML = '';
  tasks.forEach((t, i) => {
    const li = document.createElement('li');
    li.className = 'flex justify-between items-center bg-[#0c0b10] p-3 rounded-md text-sm';
    li.innerHTML = `
      <div class="flex items-center gap-3">
        <input type="checkbox" ${t.done ? 'checked' : ''} data-index="${i}" class="w-4 h-4 accent-[#7B61FF]">
        <span class="${t.done ? 'line-through text-gray-500' : ''}">${t.text}</span>
      </div>
      <button data-index="${i}" class="delete-task text-gray-500 hover:text-red-400 text-xs">Delete</button>
    `;
    taskList.appendChild(li);
  });
  localStorage.setItem('tasks', JSON.stringify(tasks));
}

addTask.addEventListener('click', () => {
  const text = taskInput.value.trim();
  if (text) {
    tasks.push({ text, done: false });
    taskInput.value = '';
    renderTasks();
  }
});

taskList.addEventListener('click', e => {
  if (e.target.matches('input[type="checkbox"]')) {
    const i = e.target.dataset.index;
    tasks[i].done = e.target.checked;
    renderTasks();
  }
  if (e.target.classList.contains('delete-task')) {
    const i = e.target.dataset.index;
    tasks.splice(i, 1);
    renderTasks();
  }
});

renderTasks();
