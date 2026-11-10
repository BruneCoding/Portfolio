
    function toggle(id) {
      const sec = document.getElementById('sec-' + id);
      const ch = document.getElementById('ch-' + id);
      if (!sec) return;
      sec.classList.toggle('show');
      if (ch) ch.classList.toggle('open');
    }

    function cp(text) {
      navigator.clipboard.writeText(text).catch(() => {
        const t = document.createElement('textarea');
        t.value = text;
        document.body.appendChild(t);
        t.select();
        document.execCommand('copy');
        document.body.removeChild(t);
      });
      const old = document.querySelector('.toast');
      if (old) old.remove();
      const el = document.createElement('div');
      el.className = 'toast';
      el.textContent = 'copied ' + text;
      document.body.appendChild(el);
      setTimeout(() => el.remove(), 2200);
    }

toggle('social'); toggle('proj');


document.addEventListener("DOMContentLoaded", () => {

    const preview = document.getElementById("videoPreview");
    const previewVideo = preview.querySelector("video");

    const modal = document.getElementById("videoModal");
    const modalVideo = modal.querySelector("video");
    const closeBtn = document.getElementById("closeVideo");

    const triggers = document.querySelectorAll(".preview-trigger");

    if (!preview || !modal || !previewVideo || !modalVideo) return;

    let mouseX = 0;
    let mouseY = 0;
    let x = 0;
    let y = 0;

    let visible = false;
    let hoverTimeout = null;
    let currentTrigger = null;

    document.addEventListener("mousemove", e => {
        mouseX = e.clientX + 20;
        mouseY = e.clientY + 20;
    });

    function animate() {
        if (visible) {
            x += (mouseX - x) * 0.28;
            y += (mouseY - y) * 0.28;
            preview.style.transform = `translate(${x}px, ${y}px) scale(1)`;
        }

        requestAnimationFrame(animate);
    }

    animate();

    triggers.forEach(trigger => {

        trigger.addEventListener("mouseenter", e => {

            currentTrigger = trigger;

            const src = trigger.dataset.video;
            if (src && previewVideo.src !== src) {
                previewVideo.src = src;
                previewVideo.load();
            }

            previewVideo.currentTime = 0;
            previewVideo.play().catch(() => {});

            x = mouseX = e.clientX + 20;
            y = mouseY = e.clientY + 20;

            preview.style.transform = `translate(${x}px, ${y}px) scale(1)`;

            clearTimeout(hoverTimeout);

            hoverTimeout = setTimeout(() => {
                visible = true;
                preview.classList.add("show");
            }, 375);

        });

        trigger.addEventListener("click", () => {
            modalVideo.src = previewVideo.currentSrc || previewVideo.src;
            modalVideo.currentTime = previewVideo.currentTime;
            modalVideo.controls = true;
            modalVideo.play().catch(() => {});

            modal.classList.add("show");
        });

        trigger.addEventListener("mouseleave", () => {

            clearTimeout(hoverTimeout);

            visible = false;

            preview.classList.remove("show");

        });

    });

    preview.addEventListener("click", () => {

        if (!currentTrigger) return;

        modalVideo.src = previewVideo.currentSrc || previewVideo.src;
        modalVideo.currentTime = previewVideo.currentTime;
        modalVideo.controls = true;
        modalVideo.play().catch(() => {});

        modal.classList.add("show");

    });

    function closeModal() {
        document.getElementById("delete-effect").play()
        modalVideo.pause();
        modal.classList.remove("show");
        modalVideo.currentTime = 0;
    }

    closeBtn?.addEventListener("click", closeModal);

    modal.addEventListener("click", e => {
        if (e.target === modal) closeModal();
    });

    document.addEventListener("keydown", e => {
        if (e.key === "Escape") closeModal();
    });

});

function openModal() {
     if (!currentTrigger) return;
     document.getElementById("openmodel-effect").play()

        modalVideo.src = previewVideo.currentSrc || previewVideo.src;
        modalVideo.currentTime = previewVideo.currentTime;
        modalVideo.controls = true;
        modalVideo.play().catch(() => {});

        modal.classList.add("show");
}