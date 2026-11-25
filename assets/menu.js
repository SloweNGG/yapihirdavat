// Telefon ve tablette (1120 px ve altı) ana menüyü "☰" düğmesiyle açıp kapatır.
// Menü yalnızca JavaScript çalışırken gizlenir (sayfa başındaki satır <html>'e "js" sınıfı ekler);
// JavaScript kapalıysa menü her zamanki gibi açık görünür.
(function () {
  var ust = document.querySelector('.site-ust');
  var dugme = ust && ust.querySelector('.menu-dugme');
  if (!dugme) return;

  function ayarla(acik) {
    ust.classList.toggle('menu-acik', acik);
    dugme.setAttribute('aria-expanded', acik ? 'true' : 'false');
    dugme.setAttribute('aria-label', acik ? 'Menüyü kapat' : 'Menüyü aç');
  }

  dugme.addEventListener('click', function () {
    ayarla(!ust.classList.contains('menu-acik'));
  });

  // Esc ile kapanır, odak düğmeye döner
  document.addEventListener('keydown', function (e) {
    if (e.key === 'Escape' && ust.classList.contains('menu-acik')) {
      ayarla(false);
      dugme.focus();
    }
  });

  // Aynı sayfadaki bir bölüme giden bağlantıda (ör. Katalog → #katalog) menü kapansın
  ust.querySelector('.ana-menu').addEventListener('click', function (e) {
    if (e.target.closest('a')) ayarla(false);
  });

  // Pencere masaüstü genişliğine çıkarsa açık kalmasın
  if (window.matchMedia) {
    var genis = window.matchMedia('(min-width: 1121px)');
    var kapat = function (e) { if (e.matches) ayarla(false); };
    if (genis.addEventListener) genis.addEventListener('change', kapat);
  }
})();
