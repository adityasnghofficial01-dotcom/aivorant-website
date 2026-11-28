
'use strict';

// AIVORANT website JavaScript

// 1. Mobile navigation
const menu = document.getElementById('menu');
const nav = document.getElementById('nav');

if (menu && nav) {
  menu.addEventListener('click', () => {
    nav.classList.toggle('open');
  });

  nav.querySelectorAll('a').forEach(link => {
    link.addEventListener('click', () => {
      nav.classList.remove('open');
    });
  });
}

// 2. Community checklist
const checks = Array.from(
  document.querySelectorAll('.task input[type="checkbox"]')
);

const progress = document.getElementById('progress');
const bar = document.getElementById('bar');

const storageKey = 'aivorant_hub_v1';

// Load saved checklist progress
function loadChecklist() {
  try {
    const saved = JSON.parse(
      localStorage.getItem(storageKey) || '[]'
    );

    if (Array.isArray(saved)) {
      checks.forEach((checkbox, index) => {
        checkbox.checked = saved[index] === true;
      });
    }
  } catch (error) {
    console.warn('Checklist data could not be loaded:', error);
  }
}

// Update checklist progress
function updateChecklist() {
  const total = checks.length;
  const completed = checks.filter(
    checkbox => checkbox.checked
  ).length;

  if (progress) {
    progress.textContent =
      `${completed} / ${total} complete`;
  }

  if (bar) {
    const percentage = total > 0
      ? (completed / total) * 100
      : 0;

    bar.style.width = `${percentage}%`;
  }

  // Save progress in this browser
  try {
    localStorage.setItem(
      storageKey,
      JSON.stringify(
        checks.map(checkbox => checkbox.checked)
      )
    );
  } catch (error) {
    console.warn('Checklist data could not be saved:', error);
  }
}

// Activate checklist
if (checks.length > 0) {
  loadChecklist();

  checks.forEach(checkbox => {
    checkbox.addEventListener(
      'change',
      updateChecklist
    );
  });

  updateChecklist();
}

// 3. Automatic copyright year
const year = document.getElementById('year');

if (year) {
  year.textContent = new Date().getFullYear();
}
