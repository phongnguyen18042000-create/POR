import { Link } from "react-router-dom";
import { useI18n } from "../i18n";
import "./styles/CallToAction.css";

const CallToAction = () => {
  const { config, t } = useI18n();
  return (
    <div className="cta-section">
      <div className="cta-buttons">
        <Link to="/play" className="cta-btn cta-btn-play" data-cursor="disable">
          <img src="/images/play.png" alt="Play" className="cta-icon" /> {t.cta.play}
        </Link>

        <a
          href={config.contact.facebook}
          target="_blank"
          rel="noopener noreferrer"
          className="cta-btn cta-btn-hire"
          data-cursor="disable"
        >
          <img src="/images/hand-shake.png" alt="Hire" className="cta-icon" /> {t.cta.hire}
        </a>
      </div>
    </div>
  );
};

export default CallToAction;
