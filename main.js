import './style.css';
import { generateKeywords } from './keyword-generator.js';

document.getElementById('generate').addEventListener('click', generateKeywords);
document.getElementById('keyword').addEventListener('keypress', (e) => {
  if (e.key === 'Enter') {
    generateKeywords();
  }
});