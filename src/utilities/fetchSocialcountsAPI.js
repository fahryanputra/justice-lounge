async function fetchSocialcountsAPI(channelId) {
  const response = await fetch(
    `https://api.socialcounts.org/youtube-live-subscriber-count/${channelId}`,
    { mode: "cors" }
  );

  const data = await response.json();
  const subs = data.est_sub;
  const views = data.table[0].count;
  const videos = data.table[1].count;

  const getId = () => channelId;
  const getSubs = () => subs;
  const getViews = () => views;
  const getVideos = () => videos;

  return { getId, getSubs, getViews, getVideos };
}

export default fetchSocialcountsAPI;
