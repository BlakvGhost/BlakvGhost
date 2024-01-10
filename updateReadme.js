
import { readFileSync, writeFileSync } from 'fs';
import fetchYouTubeVideos from './fetchYouTubeVideos.js';

async function updateReadme() {
  const youtubeVideos = await fetchYouTubeVideos();
  const readmeContent = readFileSync('README.md', 'utf-8');
  const updatedReadme = readmeContent.replace('<div id="youtube-videos"></div>', `<div id="youtube-videos">${youtubeVideos}</div>`);
  writeFileSync('README.md', updatedReadme, 'utf-8');
}

updateReadme();
