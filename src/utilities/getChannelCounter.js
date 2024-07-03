import fetchSocialcountsAPI from "utilities/fetchSocialcountsAPI";

async function getChannelCounter(channels) {
  const channelCounterList = [];
  let data;
  channels.forEach((channel) => {
    data = fetchSocialcountsAPI(channel.id);

    channelCounterList.push(data);
  });

  return await Promise.all(channelCounterList);
}

export default getChannelCounter;
