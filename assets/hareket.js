// "cik" sınıflı öğeleri ekrana girdiklerinde aşağıdan yukarı süzülerek gösterir; aynı anda görünenler
// sırayla (kısa aralıklarla) gelir. Faaliyet kartlarında ışık ve çerçeve parlaması fareyi izler.
// JavaScript kapalıysa ya da "hareketi azalt" açıksa her şey baştan görünür durur.
(function () {
  var azalt = window.matchMedia && window.matchMedia('(prefers-reduced-motion: reduce)').matches;

  document.querySelectorAll('.faaliyet-kart').forEach(function (kart) {
    kart.addEventListener('pointermove', function (e) {
      if (e.pointerType !== 'mouse') return;
      var r = kart.getBoundingClientRect();
      kart.style.setProperty('--mx', (e.clientX - r.left) + 'px');
      kart.style.setProperty('--my', (e.clientY - r.top) + 'px');
    });
  });

  // Hareketli ikonlar (site.css): bölümü ekran dışındayken ikonlar durur, bölüm yaklaşınca kaldığı yerden sürer.
  // Bir bölümdeki ikonlar birlikte durup başladığı için aralarındaki sıralı dalga bozulmaz.
  if (!azalt && 'IntersectionObserver' in window) {
    var bolumler = [];
    document.querySelectorAll('.ikon, .faaliyet-ikon, .iletisim-ikon').forEach(function (ikon) {
      var bolum = ikon.closest('section');
      if (bolum && bolumler.indexOf(bolum) < 0) bolumler.push(bolum);
    });
    var ikonGozcu = new IntersectionObserver(function (girdiler) {
      girdiler.forEach(function (girdi) { girdi.target.classList.toggle('ikon-durgun', !girdi.isIntersecting); });
    }, { rootMargin: '120px 0px' });
    bolumler.forEach(function (bolum) { ikonGozcu.observe(bolum); });
  }

  var ogeler = document.querySelectorAll('.cik');
  if (azalt || !ogeler.length || !('IntersectionObserver' in window)) return;

  var ARALIK = 70; // ms, aynı anda görünen öğeler arasındaki gecikme
  var gozlemci = new IntersectionObserver(function (girdiler) {
    var sira = 0;
    girdiler.forEach(function (girdi) {
      // Öğenin %20'si görününce gelir. Telefondaki haber kartı gibi uzun öğeler ekranı doldurup yine de
      // %20'ye ulaşmayabilir; bunlar, görünen kısmı ekran yüksekliğinin %15'ini geçince gelir.
      if (!girdi.isIntersecting) return;
      if (girdi.intersectionRatio < 0.2 && girdi.intersectionRect.height < window.innerHeight * 0.15) return;
      gozlemci.unobserve(girdi.target);
      girdi.target.style.transitionDelay = (sira++ * ARALIK) + 'ms';
      girdi.target.classList.add('gorundu');
    });
  }, { threshold: [0, 0.05, 0.1, 0.15, 0.2], rootMargin: '0px 0px -40px 0px' });

  document.documentElement.classList.add('hareket');
  ogeler.forEach(function (el) { gozlemci.observe(el); });
})();
