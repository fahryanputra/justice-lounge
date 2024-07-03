import { useEffect, useState } from "react";
import styles from "styles/videoContainer.module.css";

function VideoContainer({
  channelId,
  videoId,
  channelName,
  videoTitle,
  videoThumbnail,
  channelData,
  selectedVideo,
  setSelectedVideo,
}) {
  const [thisChannel, setThisChannel] = useState(null);

  useEffect(() => {
    setThisChannel(channelData.find((e) => e.getId() === channelId));
  }, [channelData, channelId]);

  return (
    <>
      <div className={styles.card}>
        <div
          className={styles.thumbnail}
          onClick={() =>
            setSelectedVideo({
              ...selectedVideo,
              id: videoId,
              title: videoTitle,
              channelId: channelId,
              profile: thisChannel && thisChannel.getThumbnail().default.url,
              name: channelName,
            })
          }
        >
          <img src={videoThumbnail} alt="Video thumbnail" />
        </div>
        <div className={styles.info}>
          <div
            className={styles.profile}
            onClick={() =>
              window.open(
                `https://www.youtube.com/channel/${channelId}`,
                "_blank"
              )
            }
          >
            <img
              src={
                channelData.length < 1
                  ? ""
                  : thisChannel && thisChannel.getThumbnail().default.url
              }
              alt=""
            />
          </div>
          <div className={styles.video}>
            <p onClick={() => setSelectedVideo(videoId)}>{videoTitle}</p>
          </div>
          <div className={styles.name}>
            <a
              href={channelId && `https://www.youtube.com/channel/${channelId}`}
              target="_blank"
            >
              {channelName}
            </a>
          </div>
        </div>
      </div>
    </>
  );
}

export default VideoContainer;
