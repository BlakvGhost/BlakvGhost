import dotenv from 'dotenv';

dotenv.config()

const apiKey = process.env.YOUTUBE_API_KEY;
const channelId = process.env.YOUTUBE_CHANNEL_ID;
const maxResults = 10;
const apiUrl = `https://www.googleapis.com/youtube/v3/search?part=snippet&channelId=${channelId}&maxResults=${maxResults}&order=date&type=video&key=${apiKey}`;

export default async function fetchYouTubeVideos() {
    try {
        const response = await fetch(apiUrl);
        const data = await response.json();

        const videos = data.items.map(item => {
            const { videoId } = item.id;
            const { title } = item.snippet;
            const thumbnailUrl = item.snippet.thumbnails.default.url;

            return {
                videoId,
                title,
                thumbnailUrl
            };
        });

        const videoElements = videos.map(video => {
            const videoUrl = `https://www.youtube.com/watch?v=${video.videoId}`;
            return `<a href="${videoUrl}" target="_blank" style="margin:5px"><img src="${video.thumbnailUrl}" alt="${video.title}" title="${video.title}" width="20%"></a>`;
        });

        return videoElements.join('');
    } catch (error) {
        console.error('Error fetching YouTube videos:', error);
        return '';
    }
}
