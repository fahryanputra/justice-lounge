import { useState, useEffect } from "react";
import getChannelData from "utilities/getChannelData";
import channels from "resources/channels";
import styles from "styles/card.module.css";

function Card({ index, id, subs, views, videos, setChannelData }) {
  const thisChannel = channels.find((e) => e.id === id);
  const formatterUS = new Intl.NumberFormat("en-US");

  const [channelInfo, setChannelInfo] = useState(null);

  useEffect(() => {
    getChannelData(id).then((data) => {
      setChannelInfo(data);
      setChannelData((channelData) => [...channelData, data]);
    });
  }, []);

  return (
    <>
      <div
        className={`${styles.card} ${index < 1 && styles.leader}`}
        onClick={() =>
          window.open(`https://www.youtube.com/channel/${id}`, "_blank")
        }
      >
        <div
          className={styles.banner}
          style={{ backgroundImage: `url(${thisChannel.banner})` }}
        >
          <div className={styles.thumbnail}>
            <img
              src={channelInfo ? channelInfo.getThumbnail().medium.url : ""}
              alt={channelInfo ? channelInfo.getTitle() : "Channel image"}
            />
          </div>
        </div>
        <div className={styles.title}>
          {channelInfo
            ? channelInfo.getTitle().slice(0, -16)
            : `Channel name ${index}`}
        </div>
        <div className={styles.subs}>{formatterUS.format(subs)}</div>
        <div className={styles.info}>
          <div className={styles.videos}>
            <span className="material-symbols-outlined">video_library</span>
            <p>{formatterUS.format(videos)}</p>
          </div>
          <div className={styles.views}>
            <span className="material-symbols-outlined">visibility</span>
            <p>{formatterUS.format(views)}</p>
          </div>
        </div>
      </div>
    </>
  );
}

export default Card;
