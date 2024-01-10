
import { readFileSync, writeFileSync } from 'fs';
import fetchYouTubeVideos from './fetchYoutubeVideos.js';

async function updateReadme() {
  const youtubeVideos = await fetchYouTubeVideos();
  const readmeContent = readFileSync('READMEx.md', 'utf-8');
  const updatedReadme = readmeContent.replace('<div id="youtube-videos"></div>', `<div id="youtube-videos">${youtubeVideos}</div>`);
  writeFileSync('README.md', updatedReadme, 'utf-8');
  console.log(youtubeVideos);
}

updateReadme();
