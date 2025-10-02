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