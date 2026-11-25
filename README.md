# Yapı Hırdavat kurumsal site

yapihirdavat.net için sıfırdan hazırlanan statik site. Derleme adımı yok; dosyaları olduğu gibi herhangi bir hosting'e yükleyebilir ya da `index.html` dosyasını tarayıcıda açabilirsiniz.

## Yapı

| Dosya | Sayfa |
|---|---|
| `index.html` | Ana sayfa |
| `hakkimizda.html` | Hakkımızda |
| `urunler.html` | Ürünlerimiz + Katalog (`#katalog`) |
| `haberler.html` | Haber & Duyuru |
| `iletisim.html` | İletişim ve teklif formu |
| `assets/site.css` | Ortak temel stiller ve başlık ızgarası |
| `assets/` | Logo, fotoğraf ve bayrak görselleri |

Üst şerit, menü ve footer her sayfada aynı HTML olarak tekrarlanıyor; birinde yapılan değişikliği beş dosyaya da uygulamak gerekir. Stillerin çoğu öğelerin üzerinde satır içi (`style="..."`) duruyor.

## Tasarım değerleri (ysb.com.tr temasından)

- Ana mavi `#0360A0`, menü mavisi `#0278B8`, lacivert `#0A2A47`
- Metin `#12202E`, ikincil metin `#4F5A65`, soluk metin `#677079`
- Zemin `#F4F6F8`, açık mavi zemin `#EEF5FB`, çerçeve `#E9EDF1`
- Yazı tipi: Instrument Sans (Google Fonts)
- Kart köşesi 16 px, düğmeler tam yuvarlak
- İkonlar: Lucide (satır içi SVG)

## Hareket

- **Kaydırınca belirme:** `class="cik"` verilen öğeler ekrana girince aşağıdan süzülerek gelir (`assets/hareket.js`, beş sayfada da yüklü). Yeni bir öğeye eklemek için `cik` sınıfı vermek yeter. Fareyle üzerine gelince hareket eden düğmelere (`.dugme`) değil, içinde bulundukları kutuya verilmeli.
- **Sayfa geçişleri:** `assets/site.css` sonundaki View Transitions kuralları. Üst şerit ve menü yerinde kalır, içerik solarak geçer. Chrome, Edge ve Safari'de çalışır; desteklemeyen tarayıcıda normal geçiş olur. Dosyayı doğrudan açınca (`file://`) çalışmaz, sunucuya yüklenince çalışır.
- **Hareketli ikonlar:** Ana sayfa, Ürünler ve Hakkımızda'daki ikon kutuları (`.ikon`, `.faaliyet-ikon`, `.iletisim-ikon`) her biri kendi hareketini birkaç saniyede bir oynatır; gruptakiler sırayla, dalga gibi hareket eder. Hareketi kutudaki `ik-*` sınıfı seçer (`ik-makas`, `ik-forklift`, `ik-alev`…), sıradaki yeri `style="--g:…"` gecikmesi verir; kurallar `assets/site.css` içindeki "Hareketli ikonlar" bölümünde, hız `--ik-sure` ile ayarlanır. Ekran dışındaki bölümlerin ikonları durur (`assets/hareket.js`).
- Ziyaretçinin cihazında "hareketi azalt" açıksa bunların hepsi devre dışı kalır.

## Telefon ve tablet

- **Menü:** 1120 px ve altında menü ile "Online Alışveriş" düğmesi "☰" düğmesinin arkasına geçer (`assets/menu.js`) ve menü çubuğu kaydırırken üstte kalır. Her sayfanın `<head>` kısmındaki tek satırlık betik `<html>`'e `js` sınıfını ekler; menü yalnızca o zaman gizlenir, JavaScript kapalıysa açık görünür.
- **Telefon (760 px ve altı):** üst şeritte yalnızca telefon ve WhatsApp kalır; bölüm boşlukları ve koyu bantların iç boşlukları küçülür.
- Stiller satır içinde yazılı olduğundan telefon kuralları `assets/site.css` sonunda `!important` ile uygulanır ve öğelerdeki sınıf adlarına dayanır: `ust-serit`, `ust-iletisim`, `ust-saat`, `ust-sosyal`, `site-ust`, `ust-ic`, `ust-logo`, `ana-menu`, `ust-alisveris`, `sayfa-basi`, `bolum`, `bolum-alt`, `bant`, `haber-metin`, `kart-ic`. Yeni bölüm eklerken benzer bölümdeki sınıfı da verin.

## Eksikler

- **PDF katalog:** "PDF İndir" düğmeleri `#katalog` adresine gidiyor; güncel katalog dosyası eklenip bağlanmalı.
- **Marka logoları:** Markalar yazılı kutucuklarla gösteriliyor. Logo dosyaları tedarikçilerden alınıp eklenebilir.
- **Teklif formu:** Sunucuya bir şey göndermiyor; girilenleri WhatsApp mesajı olarak hazırlıyor (`iletisim.html` sonundaki betik).
- **Firma unvanı:** Eski sitenin Hakkımızda sayfasında "Abdullah Asım Coşkun", ana sayfasında "Tahir Coşkun" yazıyordu. Burada Tahir Coşkun kullanıldı; doğrulanmalı.
- **Rakamlar ve sevkiyat düzeni:** "10.000+ ürün", "10 il", "81 il" ve Hakkımızda'daki sevkiyat kartları firma tarafından doğrulanmalı.
- **Haberler:** İki haber de 2016 tarihli. "Devamını oku" bağlantıları `haberler.html` içindeki ilgili habere gidiyor (`#marble`, `#win-eurasia`); ayrı haber sayfası yok.

## Eski siteden kaldırılanlar

- EWM slaytı, EWM markası, EWM e-ticaret haberi ve ewmkaynak.com bağlantıları (WIN EURASIA haberindeki EWM standı fotoğrafı firmanın onayıyla duruyor)
- Footer'daki "Powered by Arai Teknoloji" ibaresi
- Hepsiburada, Trendyol ve N11 mağaza bağlantıları (yalnızca ysb.com.tr bağlantısı kaldı)
