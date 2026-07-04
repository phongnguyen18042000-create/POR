import "./styles/TechStackNew.css";

// Showreel section — video do Nguyễn Minh Phương tự thực hiện
const TechStackNew = () => {
  return (
    <div className="techstack-new">
      <div className="showreel-header">
        <h2>Video của tôi</h2>
        <p className="showreel-sub">Một vài thước phim tôi đã thực hiện</p>
      </div>

      <div className="showreel-frame">
        <video
          className="showreel-video"
          controls
          autoPlay
          loop
          muted
          playsInline
          poster="/images/projects/showreel-poster.jpg"
        >
          <source src="/video/showreel.mp4" type="video/mp4" />
          <source src="/video/video.webm" type="video/webm" />
        </video>
      </div>
    </div>
  );
};

export default TechStackNew;
