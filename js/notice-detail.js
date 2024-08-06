document.addEventListener('DOMContentLoaded', function () {
    const urlParams = new URLSearchParams(window.location.search);
    const postId = urlParams.get('postId');

    fetch('/db/list.json')
    .then(response => response.json())
    .then(data => {
        const post = data.find(item => item.No.toString() === postId);
        if (post) {
            document.getElementById('post-title').textContent = post.Title;
            document.getElementById('post-image').src = post.Image;
            document.getElementById('post-image').alt = post.Title;
            document.getElementById('post-content').textContent = post.Content;

            if (post.video) {
                const videoContainer = document.getElementById('post-video-container');
                const videoHtml = `
                    <video controls class="img-fluid">
                        <source src="${post.video}" type="video/mp4">
                        Your browser does not support the video tag.
                    </video>
                `;
                videoContainer.innerHTML = videoHtml;
            }
        } else {
            console.error('게시글을 찾을 수 없습니다.');
        }
    })
    .catch(error => console.error('Error fetching post data:', error));
});
