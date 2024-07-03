import { fetchUploadsId } from "utilities/fetchYouTubeAPI";

async function getBroadcastData(channels, amount) {
  const liveBroadcastList = [];
  let data;

  channels.forEach((channel) => {
    data = fetchUploadsId(channel.uploadsId, amount);

    liveBroadcastList.push(data);
  });

  return await Promise.all(liveBroadcastList);
}

export default getBroadcastData;
