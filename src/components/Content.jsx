import ChannelCards from "components/ChannelCards";
import BroadcastCenter from "components/BroadcastCenter";
import { useState } from "react";
import styles from "styles/content.module.css";

function Content() {
  const [channelData, setChannelData] = useState([]);

  return (
    <>
      <div className={styles.content}>
        <section>
          <h2>
            <span className="material-symbols-outlined">trophy</span>Member
            Ranking
          </h2>
          <ChannelCards setChannelData={setChannelData} />
        </section>
        <section>
          <h2>
            {" "}
            <span className="material-symbols-outlined">smart_display</span>
            Broadcast Center
          </h2>
          <BroadcastCenter channelData={channelData} />
        </section>
      </div>
    </>
  );
}

export default Content;
