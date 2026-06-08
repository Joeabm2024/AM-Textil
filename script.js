/* =====================================================
   AM TEXTIL — Script Global
===================================================== */

const WHATSAPP = "50688888888"; // ← cambia este número

/* ── WhatsApp Buttons ── */
document.querySelectorAll(".pedirBtn").forEach(btn => {
  btn.addEventListener("click", e => {
    e.preventDefault();
    const producto = btn.dataset.producto || "Producto";
    const msg = `Hola! Me interesa el producto: *${producto}* 🙌\n¿Me pueden dar más información?`;
    window.open(`https://wa.me/${WHATSAPP}?text=${encodeURIComponent(msg)}`, "_blank");
  });
});

/* ── Modal Zoom ── */
const modal    = document.getElementById("modal");
const modalImg = document.getElementById("imgGrande");
const cerrar   = document.querySelector(".cerrar");

document.querySelectorAll(".product img").forEach(img => {
  img.addEventListener("click", () => {
    if(!modal) return;
    modal.classList.add("open");
    modalImg.src = img.src;
    document.body.style.overflow = "hidden";
  });
});

if(cerrar) cerrar.onclick = closeModal;
if(modal)  modal.onclick  = e => { if(e.target === modal) closeModal(); };
document.addEventListener("keydown", e => { if(e.key === "Escape") closeModal(); });

function closeModal() {
  if(!modal) return;
  modal.classList.remove("open");
  document.body.style.overflow = "";
}

/* ── Scroll Fade-up ── */
const observer = new IntersectionObserver(entries => {
  entries.forEach(e => { if(e.isIntersecting) e.target.classList.add("visible"); });
}, { threshold: 0.12 });
document.querySelectorAll(".fade-up").forEach(el => observer.observe(el));

/* ── Mobile Menu ── */
const toggle = document.getElementById("menuToggle");
const nav    = document.getElementById("mainNav");
if(toggle && nav) {
  toggle.addEventListener("click", () => nav.classList.toggle("open"));
  // cerrar al hacer click en link
  nav.querySelectorAll("a").forEach(a => a.addEventListener("click", () => nav.classList.remove("open")));
}

/* ── Buscador ── */
const buscadorInput = document.querySelector(".buscador");
if(buscadorInput) {
  const productos = document.querySelectorAll(".product");
  buscadorInput.addEventListener("input", () => {
    const q = buscadorInput.value.toLowerCase().trim();
    productos.forEach(p => {
      const texto = p.innerText.toLowerCase();
      p.style.display = (!q || texto.includes(q)) ? "" : "none";
    });
  });
}