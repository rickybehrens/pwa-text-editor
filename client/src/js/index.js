import { Workbox } from 'workbox-window';
import Editor from './editor';
import './database';
import '../css/style.css';
import header from './header';

const main = document.querySelector('#main');
main.innerHTML = '';

const loadSpinner = () => {
  const spinner = document.createElement('div');
  spinner.classList.add('spinner');
  spinner.innerHTML = `
    <div class="loading-container">
      <div class="loading-spinner" />
    </div>
  `;
  main.appendChild(spinner);
};

const initializeEditor = async () => {
  try {
    const editor = new Editor();
    await editor.initialize(); // Assuming you add an initialize method to your Editor class
    main.innerHTML = ''; // Clear the loading spinner or any previous content
    main.appendChild(editor.editor); // Append the editor to the DOM
  } catch (error) {
    console.error('Error initializing editor:', error);
    // Handle the error, perhaps display an error message
  }
};

loadSpinner();
initializeEditor();

// Check if service workers are supported
if ('serviceWorker' in navigator) {
  // Register Workbox service worker
  const workboxSW = new Workbox('/src-sw.js');
  workboxSW.register();
} else {
  console.error('Service workers are not supported in this browser.');
}
