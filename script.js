// --- TAM SAYFA ŞİFRE KORUMASI ---
document.addEventListener('DOMContentLoaded', function() {
    const dogruSifre = '10012023'; // ✅ BURAYA KENDİ ŞİFRENİ YAZ!
    const sifreKorumaEkrani = document.getElementById('sifre-koruma');
    const anaIcerik = document.getElementById('ana-icerik');
    const sifreInput = document.getElementById('sifre-input');
    const sifreButon = document.getElementById('sifre-buton');
    const hataMesaji = document.getElementById('hata-mesaji');

    sifreButon.addEventListener('click', sifreyiKontrolEt);
    sifreInput.addEventListener('keypress', function(event) {
        if (event.key === 'Enter') {
            sifreyiKontrolEt();
        }
    });

    function sifreyiKontrolEt() {
        if (sifreInput.value === dogruSifre) {
            // Şifre doğruysa
            sifreKorumaEkrani.style.opacity = '0';
            setTimeout(() => {
                sifreKorumaEkrani.style.display = 'none';
                anaIcerik.style.display = 'block';
            }, 500); // 0.5 saniye sonra ekranı kaldır
        } else {
            // Şifre yanlışsa
            hataMesaji.style.display = 'block';
            sifreInput.value = ''; // Giriş kutusunu temizle
        }
    }
});
// --- Sürpriz Butonu ve Şık Mesaj Kutusu (Modal) İşlevi ---

// 1. HTML'deki elemanları bul ve değişkenlere ata.
const surprizButonu = document.getElementById('surprizButonu');
const modalOverlay = document.getElementById('modal-overlay');
const closeModal = document.getElementById('close-modal');

// 2. Sürpriz butonuna tıklandığında modal'ı göster.
surprizButonu.addEventListener('click', function() {
    modalOverlay.classList.add('active'); // CSS'teki .active class'ını ekleyerek görünür yap.
});

// 3. Kapatma butonuna (X) tıklandığında modal'ı gizle.
closeModal.addEventListener('click', function() {
    modalOverlay.classList.remove('active'); // .active class'ını kaldırarak gizle.
});

// 4. Arka plandaki karartılmış alana tıklandığında da modal'ı gizle.
modalOverlay.addEventListener('click', function(event) {
    if (event.target === modalOverlay) { // Eğer tıklanan yer tam olarak karartılmış alan ise...
        modalOverlay.classList.remove('active');
    }
});


// --- Tıklanan Yerde Kalp Oluşturma Efekti ---
document.addEventListener('click', function(e) {
    // Sadece butonun, modal kutusunun veya içindekilerin üzerine tıklanmadıysa kalp oluştur
    const modalBox = document.getElementById('modal-box');
    if (e.target.id !== 'surprizButonu' && !modalBox.contains(e.target)) {
        let kalp = document.createElement('div');
        kalp.style.position = 'absolute';
        kalp.style.left = e.pageX - 10 + 'px';
        kalp.style.top = e.pageY - 10 + 'px';
        kalp.innerHTML = '❤️';
        kalp.style.fontSize = '20px';
        kalp.style.transition = 'all 1s ease-out';
        kalp.style.zIndex = '999'; // Kalplerin modal'ın arkasında kalması için
        
        document.body.appendChild(kalp);

        setTimeout(function() {
            kalp.style.top = e.pageY - 150 + 'px';
            kalp.style.opacity = '0';
        }, 50);

        setTimeout(function() {
            kalp.remove();
        }, 1050);
    }
});

// --- AOS (Animate On Scroll) Başlatma ---
AOS.init({
    duration: 800, // Animasyonun ne kadar süreceği (milisaniye)
    once: true     // Animasyonun sadece bir kere çalışmasını sağlar
});
// --- Özel Müzik Oynatıcı Kontrolü ---
const muzikButonu = document.getElementById('muzikButonu');
const sarki = document.getElementById('bizimSarkimiz');
let muzikCaliyor = false;

muzikButonu.addEventListener('click', function() {
    if (muzikCaliyor) {
      sarki.pause();
      muzikButonu.innerHTML = '▶️'; // Sadece oynat ikonu
      muzikCaliyor = false;
    } else {
      sarki.play();
      muzikButonu.innerHTML = '⏸️'; // Sadece durdur ikonu
      muzikCaliyor = true;
}
});
// --- Geri Sayım Sayacı Mantığı ---
const gunEl = document.getElementById('gun');
const saatEl = document.getElementById('saat');
const dakikaEl = document.getElementById('dakika');
const saniyeEl = document.getElementById('saniye');

// Tanışma tarihinizi buraya girin (Ay ve Gün)
const tanismaAyi = 1; // 1 = Ocak
const tanismaGunu = 10; // 10. gün

function geriSayimiGuncelle() {
    const simdi = new Date();
    let yilDonumuYili = simdi.getFullYear();
    let yilDonumuTarihi = new Date(yilDonumuYili, tanismaAyi - 1, tanismaGunu);

    // Eğer bu seneki yıl dönümü geçtiyse, gelecek senekini hedefle
    if (simdi > yilDonumuTarihi) {
        yilDonumuYili++;
        yilDonumuTarihi = new Date(yilDonumuYili, tanismaAyi - 1, tanismaGunu);
    }

    const toplamSaniye = (yilDonumuTarihi - simdi) / 1000;

    const gun = Math.floor(toplamSaniye / 3600 / 24);
    const saat = Math.floor(toplamSaniye / 3600) % 24;
    const dakika = Math.floor(toplamSaniye / 60) % 60;
    const saniye = Math.floor(toplamSaniye) % 60;

    gunEl.innerHTML = formatla(gun);
    saatEl.innerHTML = formatla(saat);
    dakikaEl.innerHTML = formatla(dakika);
    saniyeEl.innerHTML = formatla(saniye);
}

// Tek haneli sayıların başına '0' eklemek için
function formatla(zaman) {
    return zaman < 10 ? `0${zaman}` : zaman;
}

// Sayacı her saniye güncelle
setInterval(geriSayimiGuncelle, 1000);

// Sayfayı ilk açtığında da çalıştır
geriSayimiGuncelle();