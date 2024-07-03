const API_KEY = import.meta.env.VITE_SOME_KEY;

async function fetchChannelData(channelId) {
  const response = await fetch(
    `https://youtube.googleapis.com/youtube/v3/channels?part=snippet&id=${channelId}&key=${API_KEY}`,
    { mode: "cors" }
  );

  const data = await response.json();

  const title = data.items[0].snippet.title;
  const thumbnail = data.items[0].snippet.thumbnails;

  const getId = () => channelId;
  const getTitle = () => title;
  const getThumbnail = () => thumbnail;

  return { getId, getTitle, getThumbnail };
}

async function fetchUploadsId(uploadsId, amount) {
  const response = await fetch(
    `https://youtube.googleapis.com/youtube/v3/playlistItems?part=snippet&maxResults=${amount}&playlistId=${uploadsId}&key=${API_KEY}`,
    { mode: "cors" }
  );

  const data = await response.json();
  const liveBroadcastList = [];
  const recentUploadList = [];

  data.items.forEach((item) => {
    if (item.snippet.thumbnails.default.url.includes("live")) {
      liveBroadcastList.push({
        channelId: item.snippet.videoOwnerChannelId,
        videoId: item.snippet.resourceId.videoId,
        channelName: item.snippet.videoOwnerChannelTitle,
        videoTitle: item.snippet.title,
        videoThumbnail: item.snippet.thumbnails.medium.url,
        publishedAt: item.snippet.publishedAt,
      });
    } else {
      recentUploadList.push({
        channelId: item.snippet.videoOwnerChannelId,
        videoId: item.snippet.resourceId.videoId,
        channelName: item.snippet.videoOwnerChannelTitle,
        videoTitle: item.snippet.title,
        videoThumbnail: item.snippet.thumbnails.medium.url,
        publishedAt: item.snippet.publishedAt,
      });
    }
  });

  const getLiveBroadcast = () => liveBroadcastList[0];
  const getRecentUploadList = () => recentUploadList;

  return { getLiveBroadcast, getRecentUploadList };
}

export { fetchChannelData, fetchUploadsId };
