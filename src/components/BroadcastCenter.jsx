import { useEffect, useRef, useState } from "react";
import getBroadcastData from "utilities/getBroadcastData";
import channels from "resources/channels";
import VideoContainer from "components/VideoContainer";
import styles from "styles/broadcastCenter.module.css";
import { v4 as uuidv4 } from "uuid";
import LiteYouTubeEmbed from "react-lite-youtube-embed";
import "react-lite-youtube-embed/dist/LiteYouTubeEmbed.css";

function BroadcastCenter({ channelData }) {
  const [contents, setContents] = useState(null);
  const [recentUploads, setRecentUploads] = useState([]);
  const [liveStreams, setLiveStreams] = useState([]);
  const [isLiveStream, setIsLiveStream] = useState(true);
  const [selectedVideo, setSelectedVideo] = useState({
    videoId: "",
    title: "",
    channelId: "",
    profile: "",
    name: "",
  });

  const buttonRef = useRef();

  useEffect(() => {
    getBroadcastData(channels, 10).then((data) => setContents(data));
    buttonRef.current.focus();
  }, []);

  useEffect(() => {
    contents &&
      contents.map((data) =>
        data
          .getRecentUploadList()
          .map((data) =>
            setRecentUploads((recentUploads) => [...recentUploads, data])
          )
      );
  }, [contents]);

  useEffect(() => {
    contents &&
      contents
        .filter(
          (data) => data.getLiveBroadcast() && data.getLiveBroadcast().channelId
        )
        .map((data) =>
          setLiveStreams((liveStreams) => [
            ...liveStreams,
            data.getLiveBroadcast(),
          ])
        );
  }, [contents]);

  useEffect(() => {
    liveStreams[0] &&
      channelData &&
      setSelectedVideo({
        ...selectedVideo,
        id: liveStreams[0].videoId,
        title: liveStreams[0].videoTitle,
        channelId: liveStreams[0].channelId,
        profile: getChannelImage(liveStreams[0].channelId),
        name: liveStreams[0].channelName,
      });
  }, [liveStreams, channelData]);

  function getChannelImage(channelId) {
    const selectedChannel = channelData.find((e) => e.getId() === channelId);

    return selectedChannel && selectedChannel.getThumbnail().default.url;
  }

  return (
    <>
      <div className={styles["broadcast-center"]}>
        <div className={styles["video-embed-container"]}>
          <div className={styles["embed-video"]}>
            <LiteYouTubeEmbed id={selectedVideo.id} title="YouTube Embed" />
          </div>
          <div className={styles["embed-info"]}>
            <div className={styles.title}>{selectedVideo.title}</div>
            <div className={styles["embed-info-channel"]}>
              <div
                className={styles.picture}
                onClick={() =>
                  window.open(
                    `https://www.youtube.com/channel/${selectedVideo.channelId}`,
                    "_blank"
                  )
                }
              >
                <img src={selectedVideo.profile} alt="Channel image" />
              </div>
              <div className={styles.name}>
                <a
                  href={`https://www.youtube.com/channel/${selectedVideo.channelId}`}
                  target="_blank"
                >
                  {selectedVideo.name}
                </a>
              </div>
            </div>
          </div>
        </div>
        <div className={styles["button-container"]}>
          <button ref={buttonRef} onClick={() => setIsLiveStream(true)}>
            <span className="material-symbols-outlined">live_tv</span>
            Live
          </button>
          <button onClick={() => setIsLiveStream(false)}>
            <span className="material-symbols-outlined">animated_images</span>
            Videos
          </button>
        </div>
        <div className={styles["video-container-wrapper"]}>
          <div className={styles["video-container"]}>
            {!contents ? (
              <div className={styles.loading}>No videos.</div>
            ) : isLiveStream ? (
              liveStreams
                .sort((a, b) => {
                  return (
                    new Date(a.publishedAt).getTime() -
                    new Date(b.publishedAt).getTime()
                  );
                })
                .reverse()
                .map((data) => (
                  <VideoContainer
                    key={uuidv4()}
                    channelId={data.channelId}
                    videoId={data.videoId}
                    channelName={data.channelName}
                    videoTitle={data.videoTitle}
                    videoThumbnail={data.videoThumbnail}
                    channelData={channelData}
                    selectedVideo={selectedVideo}
                    setSelectedVideo={setSelectedVideo}
                  />
                ))
            ) : (
              recentUploads
                .sort((a, b) => {
                  return (
                    new Date(a.publishedAt).getTime() -
                    new Date(b.publishedAt).getTime()
                  );
                })
                .reverse()
                .map((data) => (
                  <VideoContainer
                    key={uuidv4()}
                    channelId={data.channelId}
                    videoId={data.videoId}
                    channelName={data.channelName}
                    videoTitle={data.videoTitle}
                    videoThumbnail={data.videoThumbnail}
                    channelData={channelData}
                    setSelectedVideo={setSelectedVideo}
                  />
                ))
            )}
          </div>
        </div>
      </div>
    </>
  );
}

export default BroadcastCenter;
