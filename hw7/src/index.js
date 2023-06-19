const listElement = document.querySelector('.posts');
const fetchPostsButton = document.querySelector('#fetch');
const postTemplate = document.getElementById('single-post');
const modalContainer = document.querySelector("#modalContainer");
const modalContent = document.querySelector("#modalContent");
const commentsContainer = document.querySelector("#commentsContainer");
const closeModal = document.querySelector("#closeModal");

let API_URL = 'https://jsonplaceholder.typicode.com/posts';

function sendHttpRequest(method, url, body){
    const promise = new Promise((resolve, reject) => {
        const xhr = new XMLHttpRequest();
        xhr.open(method, url);
        xhr.responseType = 'json';

        xhr.onload = () => {
            if(xhr.status >= 200 && xhr.status < 300){
                resolve(xhr.response);
            }
            else{
                reject(new Error('Internal server error'));
            }  
        }
        xhr.send(JSON.stringify(body));
    });
    return promise;    
    // return fetch(url, {
    //     method,
    //     body: JSON.stringify(body)
    // }).then(res => res.json());
}

fetchPostsButton.addEventListener('click', async ()=>{
    
    try{
        const posts = await sendHttpRequest('GET', API_URL);
        
        for(const post of posts){
            const postEl = document.importNode(postTemplate.content, true);
            postEl.querySelector('h2').textContent = post.title.toUpperCase();
            postEl.querySelector('p').textContent = post.body;
            postEl.querySelector('.post-item').id = post.id;
            listElement.appendChild(postEl);
        }
        console.log(posts)
    }
    catch(e){
        alert(e);
    }
  
})



async function fetchComments(postId) {
    const response = await fetch(`${API_URL}/comments?postId=${postId}`);
    const data = await response.json();
    return data.slice(0, 5);
  }

async function fetchComments(id){
    const response = await fetch(`${API_URL}/comments?postId=${id}`);
    const comments = await response.json();
    return comments.slice(0, 5);
}

function getComments(comments){
    comment.innerHTML = "";
    comments.forEach(com => {
        const commentContainer = document.createElement("div");
        comment.innerHTML =   `
        <h3>${com.name}</h3>
        <p>${com.email}</p>
        <p>${com.body}</p>
        `;
        comment.appendChild(commentContainer);
    })
}


closeSign.addEventListener("click", () => {
    commentContainer.style.display = "none";
});
  

window.addEventListener("click", e => {
    if (e.target === closeSign) {
        commentContainer.style.display = "none";
    }
  });
  
  fetchPosts().then(posts => {
      posts.forEach(post => {
      renderPost(post);
      });
      });