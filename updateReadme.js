
const fs = require('fs');
const fetchYouTubeVideos = require('./fetchYouTubeVideos');

async function updateReadme() {
  const youtubeVideos = await fetchYouTubeVideos();
  const readmeContent = fs.readFileSync('README.md', 'utf-8');
  const updatedReadme = readmeContent.replace('<div id="youtube-videos"></div>', `<div id="youtube-videos">${youtubeVideos}</div>`);
  fs.writeFileSync('README.md', updatedReadme, 'utf-8');
}

updateReadme();
