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
    const preloader = document.getElementById('preloader');

    // 1. Şifre ekranını yavaşça kaybet
    sifreKorumaEkrani.style.opacity = '0';
    setTimeout(() => {
        sifreKorumaEkrani.style.display = 'none';

        // 2. "Loading" ekranını göster
        preloader.style.display = 'flex';

        // 3. 1.5 saniye sonra "Loading" ekranını kaldır ve ana içeriği göster
        setTimeout(() => {
            preloader.style.display = 'none';
            anaIcerik.style.display = 'block';
        }, 1500); // 1.5 saniye bekleme süresi

    }, 500); // 0.5 saniye animasyon süresi
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

// --- SANA ÖZEL SÖZ KUTUSU MANTIĞI ---
document.addEventListener('DOMContentLoaded', function() {
    const sozKutusu = document.getElementById('soz-kutusu');
    const gununSozuEl = document.getElementById('gunun-sozu');

    const sozler = [
        "Seninle her şey daha güzel, çünkü sen her şeysin.",
        "Gülüşün, en sevdiğim mevsim.",
        "Sen benim en güzel şiirimsin.",
        "Varlığın, hayatıma verilmiş en büyük hediye.",
        "Birlikte yaşlanmak istediğim tek insansın.",
        "Seninle dolu bir kalp, dünyanın en zengin hazinesi.",
        "Hayat kısa, ama seninle geçen her an sonsuzluk gibi.",
        "Sen benim pazar sabahımsın.",
        "Aşk, seninle anlam buluyor.",
        "Seninle her an, yeni bir macera.",
        "Seninle hayat, bir masal gibi.",
        "Hayatıma girdiğin an, bütün şarkılar anlam kazandı.",
        "Gülüşün, en karanlık günümü bile aydınlatan güneş gibi.",
        "Sen benim en güzel \"iyi ki\"msin.",
        "Bazen durup düşünüyorum da, senden önce gerçekten yaşıyor muydum?",
        "Sen benim pusulamsın, ne zaman kaybolsam yolumu sende buluyorum.",
        "Sesini duymak, günümün en güzel melodisi.",
        "Birlikte keşfedeceğimiz ne kadar çok yer, biriktireceğimiz ne kadar çok anı var...",
        "Ve en önemlisi: Seni her şeyden çok seviyorum."
    ];
    
    let suankiSozIndex = -1; // Başlangıçta -1 yapıyoruz ki ilk tıklamada 0 olsun
    let yaziYaziliyor = false; // Aynı anda birden fazla tıklamayı engellemek için

    // Yazı yazma fonksiyonu
    function yaziYaz(soz, element) {
        yaziYaziliyor = true;
        let harfIndex = 0;
        element.textContent = ''; // Metni temizle

        const interval = setInterval(function() {
            if (harfIndex < soz.length) {
                element.textContent += soz.charAt(harfIndex);
                harfIndex++;
            } else {
                clearInterval(interval);
                yaziYaziliyor = false;
            }
        }, 50); // Her harf arasındaki süre (ms)
    }

    // Bir sonraki sözü gösteren fonksiyon
    function sonrakiSozuGoster() {
        if (yaziYaziliyor) return; // Eğer hala yazı yazılıyorsa, fonksiyonu çalıştırma

        suankiSozIndex++;
        if (suankiSozIndex >= sozler.length) {
            suankiSozIndex = 0;
        }
        yaziYaz(sozler[suankiSozIndex], gununSozuEl);
    }

    // Sayfa ilk yüklendiğinde ilk sözü yazdır
    sonrakiSozuGoster();

    // Kutuya tıklandığında bir sonraki sözü yazdır
    sozKutusu.addEventListener('click', sonrakiSozuGoster);
});
// --- İLİŞKİ TESTİ OYUNU MANTIĞI ---
document.addEventListener('DOMContentLoaded', function() {
    const testiBitirBtn = document.getElementById('testi-bitir-btn');
    const testAlani = document.getElementById('iliski-testi');
    
    // ✅ BURAYA DOĞRU CEVAPLARI KÜÇÜK HARFLE YAZ!
    const dogruCevaplar = [
        "lacivert",
        "spiderman",
        ["araba ve kolonya", "araba, kolonya", "kolonya ve araba", "kolonya", "araba", "oyuncak araba", "oyuncak araba ve kolonya", "kolonya ve oyuncak araba", "kolonya, araba", "kolonya, oyuncak araba", "oyuncak araba, kolonya"], // Birden fazla doğru cevap için dizi kullanıyoruz
        "gezmek",
        "zeytinburnu sahil",    
        "soda",
        "kış",
        ["starbucks, kahve", "kahve, starbucks", "starbucks kahve", "kahve starbucks", "kahve ve starbucks", "starbucks ve kahve"], // Birden fazla doğru cevap için dizi kullanıyoruz
        "bateri",
        ["sahil kenarı", "sahil", "deniz kenarı", "deniz", "sahil kasabası", "sahil kasabası kenarı"], // Birden fazla doğru cevap için dizi kullanıyoruz
    ];

    testiBitirBtn.addEventListener('click', function() {
        const cevapInputlari = testAlani.querySelectorAll('input[type="text"]');
        let dogruSayisi = 0;

        cevapInputlari.forEach((input, index) => {
            // Cevabı küçük harfe çevir ve boşlukları temizle
            const kullaniciCevabi = input.value.toLowerCase().trim();
const beklenenCevap = dogruCevaplar[index];
let cevapDogruMu = false;

if (Array.isArray(beklenenCevap)) {
    // Eğer beklenen cevap bir dizi ise (yani birden fazla seçenek varsa)
    if (beklenenCevap.includes(kullaniciCevabi)) {
        cevapDogruMu = true;
    }
} else {
    // Eğer beklenen cevap normal bir string ise
    if (kullaniciCevabi === beklenenCevap) {
        cevapDogruMu = true;
    }
}

if (cevapDogruMu) {
    dogruSayisi++;
    input.style.border = '2px solid #4CAF50'; // Doğruysa yeşil çerçeve
} else {
    input.style.border = '2px solid #F44336'; // Yanlışsa kırmızı çerçeve
}
        });

        // ...
const sonucMesaji = document.getElementById('test-sonucu');
if (dogruSayisi === dogruCevaplar.length) {
    // Durum 1: Hepsi doğruysa
    sonucMesaji.innerHTML = `🎉 Harika! ${dogruSayisi}/${dogruSayisi} doğru! Beni gerçekten de mükemmel tanıyorsun! ❤️`;
    sonucMesaji.style.color = '#4CAF50';
} else if (dogruSayisi === 0) {
    // ✅ Durum 2: Hiç doğru yoksa
    sonucMesaji.innerHTML = `😱 Hiç doğru cevap yok! Sanırım acil bir toplantı yapmamız gerekiyor... Yine de seni seviyorum! 😂`;
    sonucMesaji.style.color = '#F44336'; // Kırmızı renk
} else {
    // Durum 3: Arada bir puan aldıysa
    sonucMesaji.innerHTML = `Eh, fena değil! ${dogruSayisi}/${dogruCevaplar.length} doğru. Sanırım bazı şeyleri tekrar konuşmalıyız 😉`;
    sonucMesaji.style.color = '#D96666';
}
sonucMesaji.style.display = 'block';
    });
});
// --- BİZİM HARİTAMIZ MANTIĞI (GÜNCELLENMİŞ) ---
document.addEventListener('DOMContentLoaded', function() {
    
    // Harita 'div'ini ve onu içeren bölümü seç
    const haritaDiv = document.getElementById('bizim-haritamiz');
    const haritaBolumu = document.querySelector('.harita-bolumu');

    // Haritayı başlangıçta 'null' olarak tanımla
    let harita = null;
    let haritaOlusturuldu = false;

    // Haritayı oluşturan fonksiyon
    function haritayiOlustur() {
        if (haritaOlusturuldu) return; // Eğer zaten oluşturulduysa, tekrar oluşturma

        harita = L.map('bizim-haritamiz').setView([41.045, 28.976], 10);

        L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
            attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
        }).addTo(harita);

        const yerler = [
        { koordinat: [41.041517844321405, 28.895504480726444], baslik: "Otogar", aciklama: "Hikayemizin başladığı o yer..." },
        { koordinat: [40.99530053907266, 28.902649359199717], baslik: "Köfteci Yusuf", aciklama: "İlk yemek yediğimiz yer..." },
        { koordinat: [40.98620924854159, 28.912177294216583], baslik: "Zeytinburnu Sahil", aciklama: "İlk öptüğüm yer..." },
        { koordinat: [40.99077257487383, 29.02926792162343], baslik: "Boğa Heykeli", aciklama: "Kadıköy'de gezdiğimiz günlerden bir gün..." },
        { koordinat: [40.98798341189912, 29.036577757136907], baslik: "Fenerbahçe Stadyumu", aciklama: "Fenerbahçe stadyumuna gidip gördüğümüz zamanlar..." },
        { koordinat: [40.991831439014646, 29.022326045277158], baslik: "Kadıköy İskele", aciklama: "Kadıköy'de buraya gelip canlı müzik dinlediğimiz zamanlar..." },
        { koordinat: [41.026235560965766, 29.01252440058403], baslik: "Üsküdar Big Mamma's", aciklama: "Ramazanda dışarıda yediğimiz ilk iftar..." },
        { koordinat: [41.03080074928693, 29.030318534687844], baslik: "Fethipaşa Korusu", aciklama: "Kahvaltıya gittiğimiz zaman..." },
        { koordinat: [41.03779304981847, 29.039287841366082], baslik: "Nakkaştepe Millet Bahçesi", aciklama: "Üsküdar'ı gezdiğimiz zamanlardan..." },
        { koordinat: [41.025864114165856, 29.013357522351715], baslik: "Üsküdar Meydan", aciklama: "Sabah kahvaltı yaptığımız zamanı hatırlıyor musun sahilde ve gül satmaya çalışan ablayı :)" },
        { koordinat: [41.04943335003772, 29.016002143589798], baslik: "Yıldız Parkı", aciklama: "Peki o Yıldız Parkının içinde gezip yorulduğumuz gün..." },
        { koordinat: [41.047593362308376, 29.025804828869934], baslik: "Ortaköy Meydan", aciklama: "Ortaköy'de kumpir yediğimiz zaman..." },
        { koordinat: [41.04258186163836, 29.007096725851085], baslik: "Beşiktaş Meydan", aciklama: "Yıldız'dan buraya indiğimiz ya da tam tersi Yıldız'a çıktığımız zamanlar..." },
        { koordinat: [41.02559162686179, 28.97394264958766], baslik: "Galata Kulesi", aciklama: "Sizinkilere yakalanma korkusuyla gittiğimiz zamanı hatırlıyor musun..." },
        { koordinat: [41.02807340320498, 28.98509562117013], baslik: "Galataport", aciklama: "Kocaman gemiler yüzünden sahili göremediğimiz zaman..." },
        { koordinat: [41.03385252052638, 28.97795862560609], baslik: "İstiklal Caddesi", aciklama: "İstiklal Caddesinde gezdiğimiz zamanlar..." },
        { koordinat: [41.06811039199013, 28.992738911412964], baslik: "Trump AVM", aciklama: "Burayı koymazsam olmaz Ramen başka nerde yedik demi..." },
        { koordinat: [41.063297020744365, 28.992445693294023], baslik: "İstanbul Cevahir AVM", aciklama: "En gidi bir Best Burger vardı..." },
        { koordinat: [41.044371160872686, 28.977799366378306], baslik: "Merve Pastanesi", aciklama: "En çok gittiğimiz yerlerin başındadır belki Kurtuluş Caddesi ama her seferinde geldiğimde..." },
        { koordinat: [41.02419077294257, 28.964990211751978], baslik: "Atatürk Köprüsü", aciklama: "Anlatmaya kelimeler yetmez..." },
        { koordinat: [41.02301910046581, 28.966791877192687], baslik: "Haliç Metrosu", aciklama: "Buraya da çok geldik..." },
        { koordinat: [41.019249175176384, 28.969799008393515], baslik: "Eminönü", aciklama: "Eskiden az gelmiyorduk..." },
        { koordinat: [40.99975127792402, 28.94766369175632], baslik: "Yenikapı Etkinlik Alanı", aciklama: "Burayı ve ilerideki sahile kadar yürüdüğümüz günü hatırlıyor musun..." },
        { koordinat: [41.13944465718076, 29.03025978646202], baslik: "Atatürk Kent Ormanı", aciklama: "Buraya ne anlatsam az kalır." },
        { koordinat: [41.15117863880416, 29.04378348136066], baslik: "Kireçburnu Sahil", aciklama: "Ramazanda gezdiğimiz günlerden..." },
        { koordinat: [41.18177613378284, 29.07498704099925], baslik: "Rumeli Kavağı", aciklama: "Buraya gittiğimiz zaman peki..." },
        { koordinat: [41.047286153620504, 28.89675512981831], baslik: "Forum İstanbul", aciklama: "İkea ve burayı da atlamayalım lütfen" },
        { koordinat: [40.97765025547219, 28.787340239966706], baslik: "İBB Florya Atatürk Ormanı", aciklama: "Florya'da gezdiğimiz günlerden bir gün..." },
        { koordinat: [40.96641800998344, 28.796182778851243], baslik: "Florya Sahil", aciklama: "Akşam sahilde oturduğumuz zaman..." },
        { koordinat: [41.00029921702124, 28.765621090974687], baslik: "İBB Küçükçekmece Sosyal Tesisleri", aciklama: "Küçükçekmece'den başlayıp buraya yürüdüğümüz gün..." },
        { koordinat: [41.056427029044734, 28.77105855606203], baslik: "Tema World", aciklama: "Az gitmedik çocuğumuzda götürürüz..." },
        { koordinat: [40.97960648244668, 28.600676508202106], baslik: "Gürpınar Sahil", aciklama: "Burası kalabalık değilken çok güzel..." },
        { koordinat: [41.01727365072121, 28.589394370404204], baslik: "Büyükçekmece Plajı", aciklama: "Akşamki kalabalığını saymazsak burası güzel tabiki seninle..." },
        { koordinat: [41.03098409191692, 28.555590160514058], baslik: "İBB Büyükçekmece Gölü Doğal Yaşam Parkı", aciklama: "Böcekli parkın..." },
        { koordinat: [41.01395504824513, 28.562453389759877], baslik: "Mimar Sinan Sahili", aciklama: "Sessiz, sakin ve tenha yer..." }
    ];

    yerler.forEach(yer => {
            const marker = L.marker(yer.koordinat).addTo(harita);
            const popupIcerigi = `
                <div>
                    <h4 style="margin: 5px 0 5px 0; color: #D96666;">${yer.baslik}</h4>
                    <p style="margin: 0; font-size: 0.9em;">${yer.aciklama}</p>
                </div>
            `;
            marker.bindPopup(popupIcerigi);
        });
        
        haritaOlusturuldu = true;
    }

    // ✅ EN ÖNEMLİ KISIM: Harita bölümü ekrana geldiğinde haritayı oluştur ve yeniden boyutlandır
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                // Harita ilk kez ekrana geldiğinde
                if (!haritaOlusturuldu) {
                    haritayiOlustur();
                }
                
                // Harita ekrana her geldiğinde boyutunu kontrol etmesi için
                // Kısa bir gecikme ile haritanın boyutlarını yeniden hesapla
                setTimeout(function() {
                    if (harita) {
                        harita.invalidateSize();
                    }
                }, 200); // 200 milisaniye gecikme

                // Sadece bir kez çalışması yeterliyse gözlemciyi durdur
                // observer.unobserve(entry.target);
            }
        });
    }, {
        threshold: 0.1 // %10'u göründüğünde tetiklen
    });

    // Harita bölümünü gözlemlemeye başla
    observer.observe(haritaBolumu);

});
// --- GELECEĞE NOT BIRAK MANTIĞI ---
document.addEventListener('DOMContentLoaded', function() {
    const notAlani = document.getElementById('gelecek-notu');
    const notuKaydetBtn = document.getElementById('notu-kaydet-btn');
    const kayitOnayi = document.getElementById('kayit-onayi');

    // 1. Sayfa yüklendiğinde, kaydedilmiş not var mı diye kontrol et ve varsa yükle
    const kaydedilmisNot = localStorage.getItem('gelecegeNot');
    if (kaydedilmisNot) {
        notAlani.value = kaydedilmisNot;
    }

    // 2. "Kaydet" butonuna tıklandığında...
    notuKaydetBtn.addEventListener('click', function() {
        const anlikNot = notAlani.value;

        // Yazılan notu tarayıcının hafızasına kaydet
        localStorage.setItem('gelecegeNot', anlikNot);

        // Kullanıcıya geri bildirim ver
        kayitOnayi.style.display = 'block';
        // 2 saniye sonra onay mesajını gizle
        setTimeout(function() {
            kayitOnayi.style.display = 'none';
        }, 2000);
    });
});