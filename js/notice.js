document.addEventListener('DOMContentLoaded', function () {
    fetch('/db/list.json')
    .then(response => response.json())
    .then(data => {
        const noticeList = document.getElementById('notice-list');
        noticeList.innerHTML = '';

        data.sort((a, b) => b.No - a.No);

        data.forEach(item => {
            const badgeHtml = getTypeIcon(item.type);
            const listItemHtml = `
                <li class="list-group-item">
                    <a href="/info/notice-detail.html?postId=${item.No}" class="text-decoration-none text-dark">
                        <div class="d-flex justify-content-between">
                            <h5 class="mb-1">${item.Title}</h5>
                            <small>${item.Date}</small>
                        </div>
                        <p class="mb-1">${item.Content}</p>
                        ${badgeHtml}
                    </a>
                </li>
            `;
            noticeList.innerHTML += listItemHtml;
        });
    })
    .catch(error => console.error('Error fetching data:', error));
});

function getTypeIcon(type) {
    let iconHtml = '';
    switch (type) {
        case '이벤트':
            iconHtml = '<span class="badge text-bg-primary float-end">이벤트</span>';
            break;
        case '공지':
            iconHtml = '<span class="badge text-bg-danger float-end">공지</span>';
            break;
        default:
            iconHtml = '<span class="badge text-bg-secondary float-end">기타</span>';
    }
    return iconHtml;
}
