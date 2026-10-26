/* =====================================================
   AMOS — Script del inicio (carrusel de colecciones)
   Para cambiar una colección, edita el arreglo COLECCIONES.
===================================================== */
(function () {
  var reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

  // fotos: la primera es la principal, las otras tres flotan alrededor
  var COLECCIONES = [
    { palabra: "Camisas", cat: "Camisas", nombre: "Camisas", frase: "para cada integrante",
      desc: "Camisas y blusas para mujer, hombre, niñas y niños. Cortes cómodos y telas que se sienten bien todo el día.",
      etiquetas: ["Mujer", "Hombre", "Niñas", "Niños"], enlace: "camisas.html",
      fotos: ["camisas-1", "camisas-2", "camisas-3", "camisas-4"],
      bg: "#F4B8C4", ink: "#1C3150", wc: "#FFF6F8" },
    { palabra: "Pijamas", cat: "Pijamas", nombre: "Pijamas", frase: "para soñar bonito",
      desc: "Para toda la familia, incluso conjuntos que combinan. Telas suaves para descansar mejor.",
      etiquetas: ["Mujer", "Hombre", "Niñas", "Niños", "Familia"], enlace: "pijamas.html",
      fotos: ["pijamas-1", "pijamas-2", "pijamas-3", "pijamas-4"],
      bg: "#1C3150", ink: "#FFF3F0", wc: "#34517F" },
    { palabra: "Vestidos", cat: "Vestidos", nombre: "Vestidos", frase: "casual o de fiesta",
      desc: "Casuales, elegantes y para ocasiones especiales. Diseños para ella y para las más pequeñas.",
      etiquetas: ["Casual", "Elegante", "Ocasiones especiales"], enlace: "vestidos.html",
      fotos: ["vestidos-1", "vestidos-2", "vestidos-3", "vestidos-4"],
      bg: "#E6B84F", ink: "#1C3150", wc: "#F8E2A0" },
    { palabra: "Uniformes", cat: "Uniformes", nombre: "Uniformes", frase: "con tu logo o bordado",
      desc: "Para empresas, restaurantes y equipos. Resistentes, cómodos y con presentación impecable.",
      etiquetas: ["Empresas", "Restaurantes", "Equipos"], enlace: "uniformes.html",
      fotos: ["uniformes-1", "uniformes-2", "uniformes-3", "uniformes-4"],
      bg: "#86A8D6", ink: "#142640", wc: "#C3D6EE" }
  ];

  var $ = function (id) { return document.getElementById(id); };
  var stage = $("coleccion");
  if (!stage) return;
  var cur = 0, busy = false, z = 1;
  var bgs = $("bgs"), words = $("words"), tilt = $("tilt"), dots = $("dots");
  var bgEls = [], wEls = [], aEls = [], dEls = [];

  COLECCIONES.forEach(function (c, i) {
    var b = document.createElement("div"); b.className = "bgl"; b.style.background = c.bg; b.style.zIndex = i === 0 ? 1 : 0; bgs.appendChild(b); bgEls.push(b);
    var w = document.createElement("span"); w.textContent = c.palabra; if (i === 0) w.className = "on"; words.appendChild(w); wEls.push(w);
    var a = document.createElement("div"); a.className = "art" + (i === 0 ? " on" : "");
    a.innerHTML = c.fotos.map(function (f, k) {
      var cls = k === 0 ? "m" : "s s" + k;
      return '<img class="' + cls + '" src="images/home/' + f + '.webp" alt="' + (k === 0 ? c.nombre : "") + '" width="560" height="740" ' + (i === 0 ? "" : 'loading="lazy"') + ">";
    }).join("");
    tilt.appendChild(a); aEls.push(a);
    var d = document.createElement("button"); d.type = "button"; d.setAttribute("aria-label", c.nombre);
    d.addEventListener("click", function () { go(i); }); dots.appendChild(d); dEls.push(d);
  });

  function paintTheme(i) {
    var c = COLECCIONES[i];
    stage.style.setProperty("--ink", c.ink); stage.style.setProperty("--wc", c.wc); stage.style.setProperty("--bgc", c.bg);
  }
  function paintInfo(i) {
    var c = COLECCIONES[i];
    $("cnt").textContent = String(i + 1).padStart(2, "0") + " / " + String(COLECCIONES.length).padStart(2, "0");
    $("cat").textContent = c.cat;
    $("iname").textContent = c.nombre; $("iscript").textContent = c.frase; $("idesc").textContent = c.desc;
    $("itags").innerHTML = c.etiquetas.map(function (t) { return "<li>" + t + "</li>"; }).join("");
    $("igo").setAttribute("href", c.enlace);
    $("igo").textContent = "Ver " + c.nombre.toLowerCase();
    dEls.forEach(function (d, j) { d.setAttribute("aria-current", String(j === i)); });
  }
  paintTheme(0); paintInfo(0);

  function go(n, dir) {
    n = (n + COLECCIONES.length) % COLECCIONES.length;
    if (n === cur || busy) return;
    dir = dir || (n > cur ? 1 : -1);
    busy = true;
    var old = cur; cur = n;
    paintTheme(n); paintInfo(n);
    wEls[old].className = ""; wEls[n].className = "on";
    var layer = bgEls[n]; layer.style.zIndex = ++z;
    var ox = dir > 0 ? 82 : 18;
    var out = aEls[old], inn = aEls[n];
    inn.classList.add("on");
    if (!reduce) {
      layer.animate([{ clipPath: "circle(0% at " + ox + "% 58%)" }, { clipPath: "circle(150% at " + ox + "% 58%)" }], { duration: 900, easing: "cubic-bezier(.7,0,.2,1)" });
      out.animate([{ opacity: 1, transform: "none" }, { opacity: 0, transform: "translateX(" + (-dir * 45) + "%) rotate(" + (-dir * 14) + "deg) scale(.75)" }], { duration: 650, easing: "ease-in", fill: "forwards" });
      inn.animate([{ opacity: 0, transform: "translateX(" + (dir * 45) + "%) rotate(" + (dir * 14) + "deg) scale(.75)" }, { opacity: 1, transform: "none" }], { duration: 800, delay: 180, easing: "cubic-bezier(.2,.8,.2,1)", fill: "backwards" });
      $("info").animate([{ opacity: 0, transform: "translateY(12px)" }, { opacity: 1, transform: "none" }], { duration: 600, delay: 250, easing: "ease-out", fill: "backwards" });
    }
    setTimeout(function () {
      out.classList.remove("on");
      out.getAnimations().forEach(function (a) { a.cancel(); });
      busy = false;
    }, reduce ? 0 : 900);
  }
  $("prev").addEventListener("click", function () { go(cur - 1, -1); });
  $("next").addEventListener("click", function () { go(cur + 1, 1); });

  var visible = false;
  new IntersectionObserver(function (e) { visible = e[0].isIntersecting; }, { threshold: 0.4 }).observe(stage);
  document.addEventListener("keydown", function (e) {
    if (!visible) return;
    if (e.key === "ArrowRight") go(cur + 1, 1);
    if (e.key === "ArrowLeft") go(cur - 1, -1);
  });

  // deslizar con el dedo
  var sx = null;
  $("mid").addEventListener("pointerdown", function (e) { sx = e.clientX; });
  window.addEventListener("pointerup", function (e) {
    if (sx === null) return;
    var dx = e.clientX - sx; sx = null;
    if (Math.abs(dx) > 50) go(cur + (dx < 0 ? 1 : -1), dx < 0 ? 1 : -1);
  });

  // inclinación y parallax con el mouse
  if (!reduce && window.matchMedia("(hover: hover)").matches) {
    stage.addEventListener("pointermove", function (e) {
      var r = stage.getBoundingClientRect();
      stage.style.setProperty("--rx", ((e.clientX - r.left) / r.width - 0.5).toFixed(3));
      stage.style.setProperty("--ry", ((e.clientY - r.top) / r.height - 0.5).toFixed(3));
    });
    stage.addEventListener("pointerleave", function () { stage.style.setProperty("--rx", 0); stage.style.setProperty("--ry", 0); });
    var hero = document.querySelector(".hero-amos");
    hero.addEventListener("pointermove", function (e) {
      var r = hero.getBoundingClientRect();
      hero.style.setProperty("--hx", ((e.clientX - r.left) / r.width - 0.5).toFixed(3));
      hero.style.setProperty("--hy", ((e.clientY - r.top) / r.height - 0.5).toFixed(3));
    });
  }

  // frase que se ilumina palabra por palabra
  var sayEl = $("say");
  sayEl.innerHTML = sayEl.textContent.trim().split(/\s+/).map(function (w) { return '<span class="w">' + w + "</span>"; }).join(" ");
  var ws = sayEl.querySelectorAll(".w");
  function reveal() {
    var r = sayEl.getBoundingClientRect(), vh = window.innerHeight;
    var p = Math.max(0, Math.min(1, (vh * 0.85 - r.top) / (r.height + vh * 0.35)));
    var n = Math.round(p * ws.length);
    ws.forEach(function (w, i) { w.classList.toggle("lit", i < n); });
  }
  if (!reduce) { window.addEventListener("scroll", reveal, { passive: true }); window.addEventListener("resize", reveal); reveal(); }
})();
