import React from "react";

const ClientMain = () => {
  return (
    <>
      <section className="content-main">
        <div className="content-header">
          <h2 className="content-title"> Client Dashboard </h2>
        </div>
        <div className="video-player">
          <iframe
            width="1180"
            height="540"
            src="https://www.youtube.com/embed/pEXDyn3uC3o"
            title="YouTube Video"
            frameborder="0"
            allowfullscreen
          ></iframe>
        </div>
      </section>
    </>
  );
};

export default ClientMain;