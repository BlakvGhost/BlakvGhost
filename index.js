import { get } from 'axios';
import { writeFileSync } from 'fs';
import readme from './readme';

const today = new Date();

async function getRandomQuote() {
  try {
    const response = await get('https://api.quotable.io/random');
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
  
function getSigning() {
    const mood = moodByDay[today.getDay()];
    return `🤖 This README.md is updated with ${mood}, by Quavo ❤️`;
  }

async function updateReadme() {
  const quote = await getRandomQuote();

  if (quote) {
    const readmeContent = ` ${readme}
## <p align="center">Quote</p>

<p align="left">Random quote for today :</p>
<p align="left">"${quote}"</p>
<p align="center">"${getSigning()}"</p>
`;

    writeFileSync('README.md', readmeContent, { encoding: 'utf-8' });
  }
}

updateReadme();
