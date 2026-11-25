# Yapı Hırdavat kurumsal site

www.yapihirdavat.net için sıfırdan hazırlanan statik site. Derleme adımı yok; depo kökü olduğu gibi GitHub Pages'te ("Deploy from a branch", `main`, `/ (root)`) yayınlanır.

İç yollar göreli ve her sayfanın klasör derinliğine göre yazılı (kökteki sayfada `assets/site.css`, `hakkimizda/index.html`'de `../assets/site.css`, iki seviye altta `../../`). Böylece site hem alan adı kökünde hem de `https://slowengg.github.io/yapihirdavat/` önizlemesinde çalışır; yeni sayfa eklerken aynı kurala uyun. `404.html` her adreste sunulduğu için yollarını `<base>`'e göre çözer (github.io'da `/yapihirdavat/`, alan adında `/`).

Klasör adresleri (`/hakkimizda/`) çalışsın diye dosyayı doğrudan açmak yerine yerel sunucuyla bakın: `python3 -m http.server 8000` → http://localhost:8000/

**Alan adı geçişi:** Depoda henüz `CNAME` yok; olsaydı github.io önizlemesi alan adına (DNS değişene kadar eski siteye) yönlenirdi. Geçiş günü Settings → Pages → Custom domain alanına `www.yapihirdavat.net` yazılınca GitHub dosyayı kendisi ekler.

## Yapı

Sayfalar eski WordPress sitesinin adreslerinde durur (her biri bir klasörün `index.html`'i), böylece Google'daki eski kayıtlar çalışmaya devam eder.

| Dosya | Adres |
|---|---|
| `index.html` | `/` Ana sayfa (LocalBusiness JSON-LD burada) |
| `hakkimizda/index.html` | `/hakkimizda/` |
| `urunlerimiz/index.html` | `/urunlerimiz/` Ürünlerimiz + Katalog (`#katalog`) |
| `haberduyuru/index.html` | `/haberduyuru/` Haber & Duyuru listesi |
| `iletisim/index.html` | `/iletisim/` İletişim ve teklif formu |
| `e-ticaret/index.html` | `/e-ticaret/` Online alışverişin ysb.com.tr'de olduğunu söyleyen kısa sayfa |
| `22-uluslararasi-marble-…/index.html`, `win-eurasia-metalworking-fuarindayiz/index.html` | İki fuar haberi (metinler eski siteden) |
| `404.html` | Bulunamayan adresler için hata sayfası |
| `ewm-kaynak-…/`, `author/yapihiradavat/`, `category/genel/`, `2015/`, `2015/08/`, `2016/`, `2016/02/`, `2016/03/` | Yönlendirme sayfaları → `/haberduyuru/` (noindex, sitemap'te yok) |
| `download/Katalog2016.pdf` | Eski adresindeki katalog; "PDF İndir" düğmeleri buna gider |
| `wp-content/uploads/…` | Eski sitenin görselleri, eski adresleriyle (EWM görselleri hariç) |
| `sitemap.xml`, `robots.txt`, `.nojekyll` | SEO ve GitHub Pages dosyaları (canonical ve sitemap adresleri `https://www.yapihirdavat.net` ile başlar) |
| `assets/site.css` | Ortak temel stiller ve başlık ızgarası |
| `assets/` | Logo, fotoğraf ve bayrak görselleri |

Üst şerit, menü ve footer her sayfada aynı HTML olarak tekrarlanıyor; birinde yapılan değişikliği dokuz dosyaya da (yönlendirme sayfaları hariç bütün sayfalar ve `404.html`) uygulamak gerekir. Stillerin çoğu öğelerin üzerinde satır içi (`style="..."`) duruyor. Yeni sayfa eklenirse `sitemap.xml`'e ve sayfanın `<head>`'ine `<link rel="canonical">` eklenmeli.
## Tasarım değerleri (ysb.com.tr temasından)

- Ana mavi `#0360A0`, menü mavisi `#0278B8`, lacivert `#0A2A47`
- Metin `#12202E`, ikincil metin `#4F5A65`, soluk metin `#677079`
- Zemin `#F4F6F8`, açık mavi zemin `#EEF5FB`, çerçeve `#E9EDF1`
- Yazı tipi: Instrument Sans (Google Fonts)
- Kart köşesi 16 px, düğmeler tam yuvarlak
- İkonlar: Lucide (satır içi SVG)

## Hareket

- **Kaydırınca belirme:** `class="cik"` verilen öğeler ekrana girince aşağıdan süzülerek gelir (`assets/hareket.js`, bütün sayfalarda yüklü). Yeni bir öğeye eklemek için `cik` sınıfı vermek yeter. Fareyle üzerine gelince hareket eden düğmelere (`.dugme`) değil, içinde bulundukları kutuya verilmeli.
- **Sayfa geçişleri:** `assets/site.css` sonundaki View Transitions kuralları. Üst şerit ve menü yerinde kalır, içerik solarak geçer. Chrome, Edge ve Safari'de çalışır; desteklemeyen tarayıcıda normal geçiş olur. Dosyayı doğrudan açınca (`file://`) çalışmaz, sunucuya yüklenince çalışır.
- **Hareketli ikonlar:** Ana sayfa, Ürünler ve Hakkımızda'daki ikon kutuları (`.ikon`, `.faaliyet-ikon`, `.iletisim-ikon`) her biri kendi hareketini birkaç saniyede bir oynatır; gruptakiler sırayla, dalga gibi hareket eder. Hareketi kutudaki `ik-*` sınıfı seçer (`ik-makas`, `ik-forklift`, `ik-alev`…), sıradaki yeri `style="--g:…"` gecikmesi verir; kurallar `assets/site.css` içindeki "Hareketli ikonlar" bölümünde, hız `--ik-sure` ile ayarlanır. Ekran dışındaki bölümlerin ikonları durur (`assets/hareket.js`).
- Ziyaretçinin cihazında "hareketi azalt" açıksa bunların hepsi devre dışı kalır.

## Telefon ve tablet

- **Menü:** 1120 px ve altında menü ile "Online Alışveriş" düğmesi "☰" düğmesinin arkasına geçer (`assets/menu.js`) ve menü çubuğu kaydırırken üstte kalır. Her sayfanın `<head>` kısmındaki tek satırlık betik `<html>`'e `js` sınıfını ekler; menü yalnızca o zaman gizlenir, JavaScript kapalıysa açık görünür.
- **Telefon (760 px ve altı):** üst şeritte yalnızca telefon ve WhatsApp kalır; bölüm boşlukları ve koyu bantların iç boşlukları küçülür.
- Stiller satır içinde yazılı olduğundan telefon kuralları `assets/site.css` sonunda `!important` ile uygulanır ve öğelerdeki sınıf adlarına dayanır: `ust-serit`, `ust-iletisim`, `ust-saat`, `ust-sosyal`, `site-ust`, `ust-ic`, `ust-logo`, `ana-menu`, `ust-alisveris`, `sayfa-basi`, `bolum`, `bolum-alt`, `bant`, `haber-metin`, `kart-ic`. Yeni bölüm eklerken benzer bölümdeki sınıfı da verin.

## Eksikler

- **PDF katalog:** "PDF İndir" düğmeleri eski siteden alınan 2016 tarihli kataloğa (`/download/Katalog2016.pdf`) gidiyor; güncel katalog gelince eklenip bağlanmalı (eski dosya, eski adresi çalışsın diye kalmalı).
- **Marka logoları:** Markalar yazılı kutucuklarla gösteriliyor. Logo dosyaları tedarikçilerden alınıp eklenebilir.
- **Teklif formu:** Sunucuya bir şey göndermiyor; girilenleri WhatsApp mesajı olarak hazırlıyor (`iletisim/index.html` sonundaki betik).
- **Firma unvanı:** Eski sitenin Hakkımızda sayfasında "Abdullah Asım Coşkun", ana sayfasında "Tahir Coşkun" yazıyordu. Burada Tahir Coşkun kullanıldı; doğrulanmalı.
- **Rakamlar ve sevkiyat düzeni:** "10.000+ ürün", "10 il", "81 il" ve Hakkımızda'daki sevkiyat kartları firma tarafından doğrulanmalı.
- **Haberler:** İki haber de 2016 tarihli. Ana sayfadaki "Devamını oku" bağlantıları ve Haber & Duyuru listesindeki başlıklar haberlerin kendi sayfalarına (eski adresleri) gidiyor.

## Eski siteden kaldırılanlar

- EWM slaytı, EWM markası, EWM e-ticaret haberi ve ewmkaynak.com bağlantıları (WIN EURASIA haberindeki EWM standı fotoğrafı `ist-fuar1.jpg` firmanın onayıyla duruyor; haberin diğer dört EWM standı fotoğrafı yayınlanmadı). EWM haberinin eski adresi yalnızca `/haberduyuru/`'ya yönlendiriyor.
- Footer'daki "Powered by Arai Teknoloji" ibaresi
- Hepsiburada, Trendyol ve N11 mağaza bağlantıları (yalnızca ysb.com.tr bağlantısı kaldı)
