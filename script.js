// Log tiếng Việt
console.log("Chào mừng đến với trang bán hàng Việt Đồ! Website đã tải xong.");

// Thêm hiệu ứng mờ cho navbar khi cuộn
window.addEventListener('scroll', function() {
    const navbar = document.querySelector('.navbar');
    if (window.scrollY > 50) {
        navbar.classList.add('navbar-scrolled');
    } else {
        navbar.classList.remove('navbar-scrolled');
    }
});