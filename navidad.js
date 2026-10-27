/* =====================================================
   AMOS — Catálogo navideño
   Para agregar una pijama: copia una línea de PIJAMAS, cambia los datos
   y guarda la foto en la carpeta imagenes/navidad/.

   para:    mujer | hombre | ninas | ninos | familia
   largo:   larga | corta
   botones: true | false
===================================================== */
(function () {
  var PIJAMAS = [
    { nombre: "Pijama Mujer Cerezas",      img: "imagenes/pijamas mujer/1.png",     para: "mujer",   largo: "corta", botones: true  },
    { nombre: "Pijama Mujer Corazones",    img: "imagenes/pijamas mujer/3.png",     para: "mujer",   largo: "larga", botones: false },
    { nombre: "Pijama Mujer Suave",        img: "imagenes/pijamas mujer/5.png",     para: "mujer",   largo: "larga", botones: false },
    { nombre: "Pijama Hombre Cuadros",     img: "imagenes/pijamas hombre/h2.png",   para: "hombre",  largo: "larga", botones: false },
    { nombre: "Pijama Hombre Casual",      img: "imagenes/pijamas hombre/h1.png",   para: "hombre",  largo: "corta", botones: false },
    { nombre: "Pijama Niña Rosa",          img: "imagenes/pijamas ninas/a1.png",    para: "ninas",   largo: "larga", botones: false },
    { nombre: "Pijama Niña Lila",          img: "imagenes/pijamas ninas/a2.png",    para: "ninas",   largo: "larga", botones: false },
    { nombre: "Pijama Niño Aventura",      img: "imagenes/pijamas ninos/n1.png",    para: "ninos",   largo: "larga", botones: false },
    { nombre: "Pijama Niño Verano",        img: "imagenes/pijamas ninos/n2.png",    para: "ninos",   largo: "corta", botones: false },
    { nombre: "Pijama Familiar Pareja",    img: "imagenes/pijamas familiar/f1.png", para: "familia", largo: "larga", botones: false },
    { nombre: "Pijama Familiar Sonrisas",  img: "imagenes/pijamas familiar/f2.png", para: "familia", largo: "corta", botones: false }
  ];
  var ETIQUETA = { mujer: "Mujer", hombre: "Hombre", ninas: "Niñas", ninos: "Niños", familia: "Familia" };
  var filtro = { para: "todos", largo: "todos", botones: "todos" };
  var cont = document.getElementById("productos");

  function esc(s) { return String(s).replace(/[&<>"]/g, function (m) { return { "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;" }[m]; }); }

  function pinta() {
    var lista = PIJAMAS.filter(function (p) {
      return (filtro.para === "todos" || p.para === filtro.para) &&
             (filtro.largo === "todos" || p.largo === filtro.largo) &&
             (filtro.botones === "todos" || (filtro.botones === "si") === p.botones);
    });
    cont.innerHTML = lista.map(function (p) {
      return '<div class="product n-card visible">' +
        '<span class="ribbon">Navidad</span>' +
        '<div class="product-img-wrap"><img src="' + esc(p.img) + '" alt="' + esc(p.nombre) + '" loading="lazy"></div>' +
        '<div class="product-body"><h4>' + esc(p.nombre) + '</h4>' +
        '<div class="tags"><span>' + ETIQUETA[p.para] + '</span><span>' + (p.largo === "larga" ? "Larga" : "Corta") + '</span><span>' + (p.botones ? "Con botones" : "Sin botones") + '</span></div>' +
        '<a class="btn" href="#" data-producto="' + esc(p.nombre) + '">Solicitar por WhatsApp</a></div></div>';
    }).join("");
    document.getElementById("vacio").hidden = lista.length > 0;
    document.getElementById("resultCount").textContent = lista.length + (lista.length === 1 ? " pijama" : " pijamas");
  }

  document.querySelectorAll(".fgroup").forEach(function (g) {
    g.addEventListener("click", function (e) {
      var b = e.target.closest(".chip"); if (!b) return;
      g.querySelectorAll(".chip").forEach(function (c) { c.classList.toggle("on", c === b); });
      filtro[g.dataset.group] = b.dataset.v; pinta();
    });
  });
  // el botón "Ver familiares" aplica el filtro de familia
  document.querySelectorAll("[data-filter]").forEach(function (a) {
    a.addEventListener("click", function () {
      var g = document.querySelector('.fgroup[data-group="para"]');
      g.querySelectorAll(".chip").forEach(function (c) { c.classList.toggle("on", c.dataset.v === a.dataset.filter); });
      filtro.para = a.dataset.filter; pinta();
    });
  });

  cont.addEventListener("click", function (e) {
    var a = e.target.closest("a[data-producto]"); if (!a) return;
    e.preventDefault();
    var msg = "Hola! Me interesa la pijama navideña: *" + a.dataset.producto + "*\n¿Me pueden dar precio y tallas disponibles?";
    window.open("https://wa.me/" + WHATSAPP + "?text=" + encodeURIComponent(msg), "_blank");
  });
  document.getElementById("waNavidad").href = "https://wa.me/" + WHATSAPP + "?text=" + encodeURIComponent("Hola! Quiero pedir pijamas navideñas con Amos.");

  pinta();
})();
