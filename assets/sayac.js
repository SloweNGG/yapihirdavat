// Rakam kartındaki sayıları (2004, 10.000+, 10 il, 81 il) görünür olduklarında data-baslangic değerinden
// data-hedef değerine sayarak gösterir (başlangıç hedeften büyükse geriye doğru sayar, ör. 2026 → 2004).
// Son değerler HTML'de yazılı durur; JavaScript kapalıysa ya da "hareketi azalt" açıksa olduğu gibi kalır.
(function () {
  var sayilar = document.querySelectorAll('.sayac[data-hedef]');
  if (!sayilar.length || !('IntersectionObserver' in window)) return;
  if (window.matchMedia && window.matchMedia('(prefers-reduced-motion: reduce)').matches) return;

  var bicim = new Intl.NumberFormat('tr-TR');
  var SURE = 1600; // ms

  function yaz(el, n) {
    var metin = el.dataset.bicim === 'yil' ? String(n) : bicim.format(n);
    el.textContent = metin + (el.dataset.sonek || '');
  }

  function ilkDeger(el) {
    return Number(el.dataset.baslangic || 0);
  }

  function say(el) {
    var hedef = Number(el.dataset.hedef);
    var ilk = ilkDeger(el);
    var baslangic = null;
    function adim(zaman) {
      if (baslangic === null) baslangic = zaman;
      var oran = Math.min((zaman - baslangic) / SURE, 1);
      var yumusak = 1 - Math.pow(1 - oran, 3); // hızlı başlar, yavaşlayarak durur
      yaz(el, Math.round(ilk + (hedef - ilk) * yumusak));
      if (oran < 1) requestAnimationFrame(adim);
    }
    requestAnimationFrame(adim);
  }

  var gozlemci = new IntersectionObserver(function (girdiler) {
    girdiler.forEach(function (girdi) {
      if (!girdi.isIntersecting) return;
      gozlemci.unobserve(girdi.target);
      say(girdi.target);
    });
  }, { threshold: 0.6 });

  sayilar.forEach(function (el) {
    yaz(el, ilkDeger(el));
    gozlemci.observe(el);
  });
})();
