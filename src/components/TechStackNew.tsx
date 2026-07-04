import { useEffect, useRef, useState } from "react";
import { FaVolumeHigh, FaVolumeXmark } from "react-icons/fa6";
import "./styles/TechStackNew.css";

// Showreel section — video do Nguyễn Minh Phương tự thực hiện
const TechStackNew = () => {
  const videoRef = useRef<HTMLVideoElement>(null);
  const frameRef = useRef<HTMLDivElement>(null);
  const [muted, setMuted] = useState(true);
  const [inView, setInView] = useState(false);
  const userMuted = useRef(false); // người dùng chủ động tắt tiếng thì tôn trọng
  const curVol = useRef(0);

  // Trình duyệt CHỈ cho mở tiếng khi có tương tác "thật" (click/chạm/gõ phím).
  // LƯU Ý: cuộn (wheel/scroll) KHÔNG được tính → không dùng để mở tiếng,
  // vì mở tiếng lúc cuộn sẽ khiến trình duyệt tạm dừng video.
  useEffect(() => {
    const v = videoRef.current;
    if (v) v.volume = 0;
    const enableSound = () => {
      const vid = videoRef.current;
      if (vid && vid.muted && !userMuted.current) {
        vid.muted = false;
        vid.play().catch(() => {});
        setMuted(false);
      }
      remove();
    };
    const evts = ["pointerdown", "keydown", "touchstart"];
    const remove = () => evts.forEach((e) => window.removeEventListener(e, enableSound));
    evts.forEach((e) => window.addEventListener(e, enableSound, { passive: true }));
    return remove;
  }, []);

  // Theo dõi khu video có trong màn hình không (để nhắc bật tiếng)
  useEffect(() => {
    const frame = frameRef.current;
    if (!frame) return;
    const io = new IntersectionObserver(
      ([entry]) => setInView(entry.isIntersecting),
      { threshold: 0.35 }
    );
    io.observe(frame);
    return () => io.disconnect();
  }, []);

  // Âm lượng tăng/giảm mượt theo khoảng cách khung video tới giữa màn hình
  useEffect(() => {
    let raf = 0;
    const tick = () => {
      const v = videoRef.current;
      const frame = frameRef.current;
      if (v && frame) {
        const rect = frame.getBoundingClientRect();
        const vh = window.innerHeight;
        const frameCenter = rect.top + rect.height / 2;
        const dist = Math.abs(frameCenter - vh / 2);
        // to nhất (1.0) khi khung ở giữa màn hình, tắt dần trong ~0.9 màn hình
        let target = 1 - dist / (vh * 0.9);
        target = Math.max(0, Math.min(1, target));
        curVol.current += (target - curVol.current) * 0.1;
        v.volume = Math.max(0, Math.min(1, curVol.current));
      }
      raf = requestAnimationFrame(tick);
    };
    raf = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(raf);
  }, []);

  const toggleMute = (e: React.MouseEvent) => {
    e.stopPropagation();
    const v = videoRef.current;
    if (!v) return;
    v.muted = !v.muted;
    userMuted.current = v.muted;
    if (!v.muted) v.play().catch(() => {});
    setMuted(v.muted);
  };

  // Nhắc bật tiếng: khi video đang hiển thị mà vẫn tắt tiếng
  const hint = muted && inView && !userMuted.current;

  return (
    <div className="techstack-new">
      <div className="showreel-header">
        <h2>Video của tôi</h2>
        <p className="showreel-sub">Một vài thước phim tôi đã thực hiện</p>
      </div>

      <div className="showreel-frame" ref={frameRef}>
        <video
          ref={videoRef}
          className="showreel-video"
          autoPlay
          loop
          muted
          playsInline
          poster="/images/projects/showreel-poster.jpg"
        >
          <source src="/video/showreel.mp4" type="video/mp4" />
          <source src="/video/video.webm" type="video/webm" />
        </video>

        <button
          className={`showreel-mute ${hint ? "showreel-mute--hint" : ""}`}
          onClick={toggleMute}
          aria-label={muted ? "Bật tiếng" : "Tắt tiếng"}
          title={muted ? "Bật tiếng" : "Tắt tiếng"}
          data-cursor="disable"
        >
          {muted ? <FaVolumeXmark /> : <FaVolumeHigh />}
          {hint && <span className="showreel-mute-label">Bật tiếng</span>}
        </button>
      </div>
    </div>
  );
};

export default TechStackNew;
