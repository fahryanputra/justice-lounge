import { useEffect, useState } from "react";
import channels from "resources/channels";
import getChannelCounter from "utilities/getChannelCounter";
import Card from "components/Card";
import styles from "styles/channelCard.module.css";

function ChannelCards({ setChannelData }) {
  const [channelCounter, setChannelCounter] = useState(null);

  useEffect(() => {
    getChannelCounter(channels).then((data) => setChannelCounter(data));
    const interval = setInterval(() => {
      getChannelCounter(channels).then((data) => setChannelCounter(data));
    }, 2000);
    return () => clearInterval(interval);
  }, []);

  return (
    <>
      {!channelCounter ? (
        <div className={styles.loading}>Loading...</div>
      ) : (
        <div className={styles.cards}>
          {channelCounter
            .sort((a, b) => (a.getSubs() < b.getSubs() ? 1 : -1))
            .map((data, index) => (
              <Card
                key={data.getId()}
                index={index}
                id={data.getId()}
                subs={data.getSubs()}
                views={data.getViews()}
                videos={data.getVideos()}
                setChannelData={setChannelData}
              />
            ))}
        </div>
      )}
    </>
  );
}

export default ChannelCards;
