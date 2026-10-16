import type { MouseEvent } from "react";

// Chuyển sang trang tĩnh khác (CV, Contact): trang hiện tại mờ + nhoè dần rồi mới đổi trang
const LEAVE_MS = 550;

export const leaveTo = (e: MouseEvent<HTMLAnchorElement>) => {
  if (e.metaKey || e.ctrlKey || e.shiftKey || e.button !== 0) return;
  if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
  e.preventDefault();
  const href = e.currentTarget.href;
  document.body.classList.add("page-leave");
  setTimeout(() => {
    window.location.href = href;
  }, LEAVE_MS);
};

// Quay lại bằng nút Back của trình duyệt thì hiện lại trang
window.addEventListener("pageshow", (e) => {
  if (e.persisted) document.body.classList.remove("page-leave");
});
