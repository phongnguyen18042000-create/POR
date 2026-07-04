import { Link } from "react-router-dom";
import { config } from "../config";
import { FaGithub } from "react-icons/fa6";
import { MdArrowOutward } from "react-icons/md";
import "./MyWorks.css";

const MyWorks = () => {
  return (
    <div className="myworks-page">
      <div className="myworks-header">
        <Link to="/" className="back-button" data-cursor="disable">
          ← Quay lại trang chủ
        </Link>
        <h1>
          Tất cả <span>Dự án</span>
        </h1>
        <p>Tổng hợp toàn bộ dự án và sản phẩm tôi đã thực hiện</p>
      </div>

      <div className="myworks-grid">
        {config.projects.map((project, index) => (
          <div className="myworks-card" key={project.id} data-cursor="disable">
            <div className="myworks-card-number">0{index + 1}</div>
            <div className="myworks-card-image">
              {project.demo ? (
                <a href={project.demo} target="_blank" rel="noopener noreferrer" data-cursor="disable">
                  <img src={project.image} alt={project.title} />
                </a>
              ) : (
                <img src={project.image} alt={project.title} />
              )}
            </div>
            <div className="myworks-card-info">
              <h3>{project.title}</h3>
              <p className="myworks-card-category">{project.category}</p>
              <p className="myworks-card-description">{project.description}</p>
              <p className="myworks-card-tech">{project.technologies}</p>
              <div className="myworks-card-links">
                {project.github && (
                  <a
                    href={project.github}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="myworks-link myworks-link-github"
                    data-cursor="disable"
                  >
                    <FaGithub /> GitHub
                  </a>
                )}
                {project.demo && (
                  <a
                    href={project.demo}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="myworks-link myworks-link-demo"
                    data-cursor="disable"
                  >
                    Xem video <MdArrowOutward />
                  </a>
                )}
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default MyWorks;
