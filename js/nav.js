document.addEventListener('DOMContentLoaded', function() {
    // nav.html 파일 불러오기
    fetch('/nav.html')
        .then(response => response.text())
        .then(html => {
            const navbarPlaceholder = document.getElementById('navbar-placeholder');
            navbarPlaceholder.innerHTML = html;

            // 로그인 상태에 따른 네브바 링크 변경
            updateNavbarForLoginStatus();

            // nav.html 로드 후 활성 메뉴 아이템 강조
            const currentPage = window.location.pathname;
            const menuItems = navbarPlaceholder.querySelectorAll('.navbar-nav .nav-link');

            menuItems.forEach(item => {
                if (item.getAttribute('href') === currentPage) {
                    item.classList.add('active-menu');
                }
            });
        })
        .catch(error => console.error('Error loading navigation:', error));
});

function updateNavbarForLoginStatus() {
    const UserName = document.getElementById('UserName');
    const UserImg = document.getElementById('UserImg');
    const loginLogoutLink = document.getElementById('loginLogoutLink');   
    const loggedInUserId = localStorage.getItem('userId');

    if (loggedInUserId) {
        // 로그인 상태일 때
        UserName.textContent = `${loggedInUserId}님`;
        UserName.href = '/info/profile.html';
        UserImg.href = '/info/profile.html';
        
        loginLogoutLink.textContent = '로그아웃';
        loginLogoutLink.href = '#';
            
        loginLogoutLink.addEventListener('click', function() {
            localStorage.removeItem('userId');
            window.location.reload(); // 페이지 새로고침
        });
    } else {
        // 로그아웃 상태일 때
        loginLogoutLink.textContent = '로그인';
        loginLogoutLink.href = '/login.html'; // 로그인 페이지로 이동
    }
}
