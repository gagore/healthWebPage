function getTypeIcon(type) {
    let iconHtml = '';

    switch (type) {
        case '이벤트':
            iconHtml = '<span class="badge text-bg-primary">이벤트</span>';
            break;
        case '공지':
            iconHtml = '<span class="badge text-bg-danger">공지</span>';
            break;
        default:
            iconHtml = '<span class="badge text-bg-secondary">기타</span>';
    }

    return iconHtml;
}

document.addEventListener('DOMContentLoaded', function () {
    fetch('db/list.json')
        .then(response => response.json())
        .then(images => {
            const carouselInner = document.querySelector('.carousel-inner');
            images.forEach((image, index) => {
                const carouselItem = document.createElement('div');
                carouselItem.className = `carousel-item ${index === 0 ? 'active' : ''} h-100`;

                // 이미지에 클릭 이벤트 추가
                const imgTag = `<img src="${image.Image}" class="d-block w-100 h-100" alt="${image.Title}" style="cursor:pointer;" data-notice-id="#notice${image.No}">`;
                carouselItem.innerHTML = `
                    ${imgTag}
                    <div class="overlay-text position-absolute top-0 start-0">
                        ${getTypeIcon(image.type)}
                    </div>
                `;
                carouselItem.querySelector('img').addEventListener('click', function() {
//                    const noticeId = this.getAttribute('data-notice-id');
                    window.location.href = `/info/notice-detail.html?postId=${image.No}`;
                });

                carouselInner.appendChild(carouselItem);
            });
        })
        .catch(error => console.error('Error loading images:', error));
})


document.addEventListener('DOMContentLoaded', function() {
    const promotionImage = document.getElementById('promotionImage');
    if (promotionImage) {
        promotionImage.addEventListener('click', function() {
            navigator.clipboard.writeText("X-mas").then(() => {
                alert('"X-mas"가 클립보드에 복사되었습니다.');
            }).catch(err => {
                console.error('복사 실패:', err);
            });
        });
    } else {
        console.error('이미지를 찾을 수 없습니다.');
    }
});

