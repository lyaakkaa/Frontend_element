
const listElement = document.querySelector('.posts');
const postTemplate = document.getElementById('single-post');

const fetchPostsButton = document.querySelector('#fetch');
const createPostForm = document.querySelector('#create-post-form');
const cancelBtn = document.querySelector('#cancel');

let API_URL = 'https://jsonplaceholder.typicode.com/posts';

/**
 * GET
 * POST
 * PUT
 * PATCH
 * DELETE
 * OPTIONS
 */

let controller;

function sendHttpRequest(method, url, body) {
    // const promise = new Promise((resolve, reject) => {
    //     const xhr = new XMLHttpRequest();
    //
    //     xhr.open(method, url);
    //     xhr.setRequestHeader('Authorization', 'Bearer xh');
    //     xhr.setRequestHeader('Authorization', 'Bearer xh 2')
    //     xhr.setRequestHeader('Authorization', 'Bearer xh 3')
    //     xhr.setRequestHeader('Authorization', 'Bearer xh 4')
    //     xhr.setRequestHeader('Authorization', 'Bearer xh 5')
    //
    //     xhr.responseType = 'json';
    //
    //     xhr.onload = () => {
    //         if (xhr.status >= 200 && xhr.status < 300) {
    //             resolve(xhr.response);
    //         } else {
    //             reject(new Error('Internal server error'))
    //         }
    //     }
    //     xhr.send(JSON.stringify(body));
    // });
    //
    // return promise;

    controller = new AbortController();
    const signal = controller.signal;

    return fetch(url,{
        method,
        body: JSON.stringify(body),
        headers: {
            'Authorization': 'Bearer token',
            'Content-type': 'application/json; charset=UTF-8',
            // 'Authorization 2': 'Bearer token 2'
        },
        signal
    }).then(res => res.json());
}

fetchPostsButton.addEventListener('click', async () => {

    try {
        // const posts = await sendHttpRequest('GET', API_URL);
        // for (const post of posts) {
        //     const postEl = document.importNode(postTemplate.content, true);
        //     postEl.querySelector('h2').textContent = post.title.toUpperCase();
        //     postEl.querySelector('p').textContent = post.body;
        //     postEl.querySelector('.post-item').id = post.id;
        //     listElement.appendChild(postEl);
        // }
        sendHttpRequest('GET', API_URL).then(posts => {
            for (const post of posts) {
                const postEl = document.importNode(postTemplate.content, true);
                postEl.querySelector('h2').textContent = post.title.toUpperCase();
                postEl.querySelector('p').textContent = post.body;
                postEl.querySelector('.post-item').id = post.id;
                listElement.appendChild(postEl);
            }
        })
    } catch (e) {
        alert(e)
    }
});

createPostForm.addEventListener('submit', async (event) => {
    event.preventDefault();
    const payload = {
        userId: crypto.randomUUID(),
        title: event.target.title.value,
        body: event.target.body.value
    }
    await sendHttpRequest('POST', API_URL, payload)
});

cancelBtn.addEventListener('click', () => controller.abort());

listElement.addEventListener('click', async (event) => {
    if (event.target.tagName === 'BUTTON') {
        const id = event.target.closest('li').id;
        await sendHttpRequest('DELETE', `${API_URL}/${id}`);
    }
})