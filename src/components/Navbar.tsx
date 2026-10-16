import { useEffect, useState } from "react";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import HoverLinks from "./HoverLinks";
import { gsap } from "gsap";
import Lenis from "lenis";
import "./styles/Navbar.css";
import { useI18n } from "../i18n";

gsap.registerPlugin(ScrollTrigger);
export let lenis: Lenis | null = null;

const Navbar = () => {
  const { t, lang, setLang } = useI18n();
  const [typedText, setTypedText] = useState("");
  const [isDeleting, setIsDeleting] = useState(false);
  const fullText = "minhphuong.creative";

  useEffect(() => {
    const typingSpeed = isDeleting ? 80 : 150;

    const timer = setTimeout(() => {
      if (!isDeleting) {
        // Typing phase
        const nextText = fullText.slice(0, typedText.length + 1);
        setTypedText(nextText);

        if (nextText === fullText) {
          // Finished typing, wait 2s before starting to delete
          setTimeout(() => setIsDeleting(true), 2000);
        }
      } else {
        // Deleting phase
        const nextText = fullText.slice(0, typedText.length - 1);
        setTypedText(nextText);

        if (nextText === "") {
          // Finished deleting, start typing again
          setIsDeleting(false);
        }
      }
    }, typingSpeed);

    return () => clearTimeout(timer);
  }, [typedText, isDeleting]);

  useEffect(() => {
    // ... existing Lenis and ScrollTrigger initialization ...
    lenis = new Lenis({
      duration: 1.2,
      lerp: 0.1,
      easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
      orientation: "vertical",
      gestureOrientation: "vertical",
      smoothWheel: true,
      wheelMultiplier: 1.7,
      touchMultiplier: 2,
      infinite: false,
    });

    // Start paused
    lenis.stop();

    // Synchronize Lenis with GSAP ScrollTrigger
    lenis.on("scroll", ScrollTrigger.update);

    gsap.ticker.add((time) => {
      lenis?.raf(time * 1000);
    });

    gsap.ticker.lagSmoothing(0);

    // Handle navigation links
    let links = document.querySelectorAll(".header ul a");
    links.forEach((elem) => {
      let element = elem as HTMLAnchorElement;
      // Link không có data-href (vd: CV) thì để trình duyệt mở bình thường
      if (!element.getAttribute("data-href")) return;
      element.addEventListener("click", (e) => {
        if (window.innerWidth > 1024) {
          e.preventDefault();
          let elem = e.currentTarget as HTMLAnchorElement;
          let section = elem.getAttribute("data-href");
          if (section && lenis) {
            const target = document.querySelector(section) as HTMLElement;
            if (target) {
              lenis.scrollTo(target, {
                offset: 0,
                duration: 1.5,
              });
            }
          }
        }
      });
    });

    // Handle resize
    window.addEventListener("resize", () => {
      lenis?.resize();
    });

    return () => {
      lenis?.destroy();
    };
  }, []);
  return (
    <>
      <div className="header">
        <a href="/#" className="navbar-title typing-logo" data-cursor="disable">
          {typedText}
          <span className="cursor"></span>
        </a>
        <a
          href="/#"
          className="navbar-connect"
          data-cursor="disable"
        >
          portfolio
        </a>
        <ul>
          <li>
            <a data-href="#about" href="#about">
              <HoverLinks text={t.nav.about} />
            </a>
          </li>
          <li>
            <a data-href="#work" href="#work">
              <HoverLinks text={t.nav.work} />
            </a>
          </li>
          <li>
            <a href="/cv/index.html" target="_blank" rel="noopener noreferrer">
              <HoverLinks text={t.nav.cv} />
            </a>
          </li>
          <li>
            <a data-href="#contact" href="#contact">
              <HoverLinks text={t.nav.contact} />
            </a>
          </li>
          <li className="lang-switch" data-cursor="disable">
            <span
              className={lang === "vi" ? "lang-on" : ""}
              onClick={() => setLang("vi")}
            >
              VI
            </span>
            <span className="lang-sep">/</span>
            <span
              className={lang === "en" ? "lang-on" : ""}
              onClick={() => setLang("en")}
            >
              EN
            </span>
          </li>
        </ul>
      </div>

      <div className="landing-circle1"></div>
      <div className="landing-circle2"></div>
      <div className="nav-fade"></div>
    </>
  );
};

export default Navbar;
