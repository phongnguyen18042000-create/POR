import { PropsWithChildren } from "react";
import "./styles/Landing.css";
import { config } from "../config";

const Landing = ({ children }: PropsWithChildren) => {
  // Hero chỉ hiển thị tên gọi (2 âm cuối), VD "Nguyễn Minh Phương" -> "Minh Phương"
  const nameParts = config.developer.fullName.trim().split(/\s+/);
  const heroParts = nameParts.slice(-2);
  const firstName = heroParts[0] || config.developer.name;
  const lastName = heroParts.slice(1).join(" ") || "";

  return (
    <>
      <div className="landing-section" id="landingDiv">
        <div className="landing-container">
          <div className="landing-intro">
            <h2>Xin chào! Tôi là</h2>
            <h1>
              {firstName.toUpperCase()} {lastName && <span>{lastName.toUpperCase()}</span>}
            </h1>
          </div>
          <div className="landing-info">
            <h3>Là một</h3>
            <h2 className="landing-info-h2">{config.developer.title}</h2>
          </div>

        </div>
        {children}
      </div>
    </>
  );
};

export default Landing;
