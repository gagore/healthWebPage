document.addEventListener('DOMContentLoaded', function() {
    const loggedInUserId = localStorage.getItem('userId');
    if (!loggedInUserId) {
        window.location.href = '/login.html'; // 로그인 페이지로 리다이렉션
        return;
    }

    const form = document.getElementById('paymentForm');
    const totalPriceElement = document.getElementById('totalPrice');
    const monthsSelect = document.getElementById('months');
    const couponInput = document.getElementById('coupon');
    const cardNumberGroup = document.getElementById('cardNumberGroup');
    const accountNumberGroup = document.getElementById('accountNumberGroup');
    const paymentMethodInputs = document.querySelectorAll('input[name="paymentMethod"]');

    // 개월 수와 쿠폰 입력값 변경 시 가격 업데이트
    monthsSelect.addEventListener('change', updatePrice);
    couponInput.addEventListener('change', updatePrice);


    paymentMethodInputs.forEach(input => {
        input.addEventListener('change', function() {
            const isCardSelected = this.value === 'card';

            // 카드 번호와 관련된 필드들
            document.getElementById('cardNumber').required = isCardSelected;
            document.getElementById('cvs').required = isCardSelected;
            document.getElementById('yymm').required = isCardSelected;

            // 카드/계좌 번호 입력 창 표시 업데이트
            cardNumberGroup.style.display = isCardSelected ? 'block' : 'none';
            accountNumberGroup.style.display = isCardSelected ? 'none' : 'block';
        });
    });
    // 가격 업데이트 함수
    function updatePrice() {
        const months = parseInt(monthsSelect.value);
        let totalPrice = months * 10000; // 기본 가격

        // 할인 로직
        if ([3, 6, 12].includes(months)) {
            totalPrice -= 1000 * Math.floor(months / 3);
        }

        // 쿠폰 검사
        if (couponInput.value === "x-mas") {
            totalPrice *= 0.8; // 20% 할인
        }

        totalPriceElement.value = `${totalPrice.toLocaleString()}원`;
    }

    // 폼 제출 처리
    form.addEventListener('submit', function(event) {
        event.preventDefault();

        // 결제 방법 확인
        const paymentMethod = document.querySelector('input[name="paymentMethod"]:checked').value;

        // 최종 금액 확인 및 결제 진행
        const confirmation = confirm(`총 결제 금액은 ${totalPriceElement.value}입니다. 결제 방법은 ${paymentMethod}입니다. 계속하시겠습니까?`);
        if (confirmation) {
            // 결제 처리 로직 구현
            alert('결제가 완료되었습니다.');
        }
    });

    // 초기 페이지 로드 시 가격 업데이트
    updatePrice();
});
