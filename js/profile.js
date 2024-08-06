document.addEventListener('DOMContentLoaded', function () {
    const loggedInUserId = localStorage.getItem('userId');
    if (!loggedInUserId) {
        window.location.href = '/login.html';
        return;
    }

    fetch('/db/user.json')
        .then(response => response.json())
        .then(users => {
            const user = users.find(u => u.id === loggedInUserId);
            if (user) {
                updateProfileInfo(user);
            } else {
                console.error('사용자 정보를 찾을 수 없습니다.');
            }
        })
        .catch(error => console.error('사용자 정보 로드 중 오류 발생', error));
});

function updateProfileInfo(user) {
    const registrationStatusElement = document.getElementById('registrationStatus');
    const lockerPasswordArea = document.getElementById('lockerPasswordArea');
    const loggedInUserId = localStorage.getItem('userId');

    // 등록 만료 날짜 처리
    if (user['등록만료날짜']) {
        const expiryDate = new Date(user['등록만료날짜']);
        const today = new Date();
        const remainingDays = Math.ceil((expiryDate - today) / (1000 * 60 * 60 * 24));
        registrationStatusElement.textContent = `등록 만료 날짜: ${user['등록만료날짜']} (남은 일수: ${remainingDays}일)`;
    } else {
        registrationStatusElement.textContent = '등록되지 않음';
    }

    // 사물함 비밀번호 처리
    if (user['사물함비밀번호'] === -1) {
        lockerPasswordArea.innerHTML = `
            <input type="password" id="newLockerPassword" placeholder="새 비밀번호 입력" />
            <button id="setLockerPassword">비밀번호 등록</button>
        `;
        document.getElementById('setLockerPassword').addEventListener('click', function () {
            const newPassword = document.getElementById('newLockerPassword').value;
            // 여기에 서버에 비밀번호 업데이트 요청 로직을 추가해야 합니다.

            fetch('/db/user.json')
                .then(response => response.json()) // JSON 데이터를 JavaScript 객체로 변환
                .then(users => {
                    users.forEach(user => {
                        if (user.id === loggedInUserId) {
                            user.사물함비밀번호 = newPassword; // 새 비밀번호로 수정
                        }
                    });
                    return users; // 수정된 users 객체를 다음 단계로 전달
                })
                .then(updatedUsers => {
                    localStorage.setItem('/db/user.json', updatedUsers);
                    console.log('Success:', updatedUsers);
                })
                .catch(error => {
                    console.error('Error:', error);
                });





            console.log('새 비밀번호 등록:', newPassword);
        });
    } else {
        lockerPasswordArea.innerHTML = `
            <p>사물함 비밀번호: ${user['사물함비밀번호']}</p>
            <button id="resetLockerPassword">비밀번호 재설정</button>
        `;
        document.getElementById('resetLockerPassword').addEventListener('click', function () {
            // 비밀번호 재설정 로직을 여기에 추가합니다.
            console.log('비밀번호 재설정');
        });
    }
}
