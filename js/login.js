document.getElementById('loginForm').addEventListener('submit', function(event) {
    event.preventDefault();

    const userId = document.getElementById('userId').value;
    const password = document.getElementById('password').value;
    const loginFailAlert = document.getElementById('loginFailAlert');

    fetch('/db/user.json')
        .then(response => response.json())
        .then(users => {
            const user = users.find(user => user.id === userId && user.pw === password);

            if (user) {
                // 로그인 성공
                localStorage.setItem('userId', userId);
                window.location.href = '/index.html'; // 메인 페이지로 리다이렉션
            } else {
                // 로그인 실패 알림 표시
                loginFailAlert.style.display = 'block';
            }
        })
        .catch(error => {
            console.error('로그인 처리 중 오류 발생', error);
            loginFailAlert.style.display = 'block';
        });
});
