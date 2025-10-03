// --- TAM SAYFA ŞİFRE KORUMASI ("BENİ HATIRLA" ÖZELLİKLİ) ---
document.addEventListener('DOMContentLoaded', function() {
    const dogruSifre = '10012023'; // ✅ KENDİ ŞİFRENİ YAZ!
    const sifreKorumaEkrani = document.getElementById('sifre-koruma');
    const anaIcerik = document.getElementById('ana-icerik');
    const sifreInput = document.getElementById('sifre-input');
    const sifreButon = document.getElementById('sifre-buton');
    const hataMesaji = document.getElementById('hata-mesaji');
    const beniHatirlaCheckbox = document.getElementById('beni-hatirla');

    // 1. Sayfa yüklendiğinde "Beni Hatırla"yı kontrol et
    const hatirlananGiris = localStorage.getItem('siteyeGirisYapildi');
    if (hatirlananGiris === 'true') {
        girisYap();
    }

    // 2. Buton ve Enter tuşu olayları
    sifreButon.addEventListener('click', sifreyiKontrolEt);
    sifreInput.addEventListener('keypress', function(event) {
        if (event.key === 'Enter') {
            sifreyiKontrolEt();
        }
    });

    // 3. Şifreyi kontrol etme fonksiyonu
    function sifreyiKontrolEt() {
        if (sifreInput.value === dogruSifre) {
            // Şifre doğruysa...
            if (beniHatirlaCheckbox.checked) {
                // "Beni Hatırla" işaretliyse, bilgiyi kaydet
                localStorage.setItem('siteyeGirisYapildi', 'true');
            }
            girisYap();
        } else {
            // Şifre yanlışsa
            hataMesaji.style.display = 'block';
            sifreInput.value = '';
        }
    }
    
    // 4. Giriş yapma (animasyon ve içeriği gösterme) fonksiyonu
    function girisYap() {
        sifreKorumaEkrani.style.opacity = '0';
        setTimeout(() => {
            sifreKorumaEkrani.style.display = 'none';
            anaIcerik.style.display = 'block';
        }, 500);
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
muzikButonu.addEventListener('click', function() {
    // sarki.paused, müziğin durup durmadığını kontrol eden yerleşik bir özelliktir
    if (sarki.paused) {
        sarki.play();
        muzikButonu.classList.add('caliyor'); // Animasyonu başlat
    } else {
        sarki.pause();
        muzikButonu.classList.remove('caliyor'); // Animasyonu durdur
    }
});

muzikButonu.addEventListener('click', function() {
    if (muzikCaliyor) {
       sarki.pause();
    // Artık ikonu değiştirmiyoruz, animasyonu durduracağız (bir sonraki adımda)
       muzikCaliyor = false;
    } else {
    sarki.play();
    // Artık ikonu değiştirmiyoruz, animasyonu başlatacağız (bir sonraki adımda)
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

    if (simdi > yilDonumuTarihi) {
        yilDonumuYili++;
        yilDonumuTarihi = new Date(yilDonumuYili, tanismaAyi - 1, tanismaGunu);
    }

    const toplamSaniye = (yilDonumuTarihi - simdi) / 1000;

    // ✅ YENİ EKLENEN KOŞUL
    if (toplamSaniye <= 0) {
        // Geri sayım bittiyse (veya yıl dönümü günüyse)
        document.getElementById('geri-sayim').style.display = 'none'; // Sayacı gizle
        document.querySelector('.geri-sayim-container h3').style.display = 'none'; // Başlığı gizle
        document.getElementById('kutlama-mesaji').style.display = 'block'; // Kutlama mesajını göster
    } else {
        // Geri sayım devam ediyorsa
        const gun = Math.floor(toplamSaniye / 3600 / 24);
        const saat = Math.floor(toplamSaniye / 3600) % 24;
        const dakika = Math.floor(toplamSaniye / 60) % 60;
        const saniye = Math.floor(toplamSaniye) % 60;

        gunEl.innerHTML = formatla(gun);
        saatEl.innerHTML = formatla(saat);
        dakikaEl.innerHTML = formatla(dakika);
        saniyeEl.innerHTML = formatla(saniye);
    }
}

// Tek haneli sayıların başına '0' eklemek için
function formatla(zaman) {
    return zaman < 10 ? `0${zaman}` : zaman;
}

// Sayacı her saniye güncelle
setInterval(geriSayimiGuncelle, 1000);

// Sayfayı ilk açtığında da çalıştır
geriSayimiGuncelle();