import { fetchChannelData } from "utilities/fetchYouTubeAPI";

function getChannelData(channelId) {
  const channelData = fetchChannelData(channelId);

  return channelData;
}

export default getChannelData;
