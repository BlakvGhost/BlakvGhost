import axios from 'axios';
import { writeFileSync } from 'fs';
import simpleGit from 'simple-git';

const startDate = new Date('2022-08-01');
const endDate = new Date('2023-08-19'); // Date actuelle

async function getRandomQuote() {
  try {
    const response = await axios.get('https://api.quotable.io/random');
    return response.data.content;
  } catch (error) {
    console.error('Erreur lors de la récupération de la citation:', error);
    return null;
  }
}

const moodByDay = {
  1: 'hate',
  2: 'wickedness',
  3: 'pleasure',
  4: 'wickedness',
  5: 'cruelty',
  6: 'horror',
  7: 'love',
};

function getSigning(date) {
  const mood = moodByDay[date.getDay()];
  return `🤖 This README2.md is updated with ${mood}, by Quavo ❤️\n\nLast update: ${date.toDateString()}`;
}

async function updateReadmeAndCommit(date) {
    const quote = true;
  if (quote) {
    const readmeContent = `# Quavo\n\nLa date actuelle est : ${date.toDateString()}}`;

    writeFileSync('README2.md', readmeContent, { encoding: 'utf-8' });

    const git = simpleGit();
    await git.add('README2.md');
    await git.commit(`Updated README2.md for ${date.toDateString()}`, null, { '--date': date.toISOString() });
    console.log(`README2.md mis à jour et commit effectué pour ${date.toDateString()}`);
  }
}

// Boucle sur chaque jour de janvier à aujourd'hui
let currentDate = startDate;
while (currentDate <= endDate) {
  await updateReadmeAndCommit(currentDate);
  currentDate.setDate(currentDate.getDate() + 1); // Avance d'un jour
}
