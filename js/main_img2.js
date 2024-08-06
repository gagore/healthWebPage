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
    fetch('db/list.json') // JSON 파일의 경로
        .then(response => response.json())
        .then(images => {
            const carouselInner = document.querySelector('.carousel-inner');
            images.forEach((image, index) => {
                // 캐러셀 아이템 생성
                const carouselItem = document.createElement('div');
                carouselItem.className = `carousel-item ${index === 0 ? 'active' : ''} h-100`;
                carouselItem.innerHTML = `
                    <img src="${image.Image}" class="d-block w-100 h-100" alt="${image.Title}">
                    <div class="overlay-text position-absolute top-0 start-0">
                        ${getTypeIcon(image.type)}
                    </div>
                `;
                carouselInner.appendChild(carouselItem);
            });
        })
        .catch(error => console.error('Error loading images:', error));
});
