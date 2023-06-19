const postTemplate = document.getElementById('single-post');
const listElement = document.querySelector('.posts');
const fetchPostsButton = document.querySelector('#fetch')
const createPostForm = document.querySelector('#create-post-form');

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
    }
    catch(e){
        alert(e);
    }
  
})



createPostForm.addEventListener('submit', async ()=>{
    event.preventDefault();
    const payload = {
        userId: crypto.randomUUID(),
        title: event.target.title.value,
        body: event.target.body.value
    }
    await sendHttpRequest('POST', API_URL, payload);
})


listElement.addEventListener('click', async(event) => {
    if(event.target.tagName === "BUTTON"){
        const id = event.target.closest('li').id;
        await sendHttpRequest('DELETE', `${API_URL}/${id}`);
        

    }
})

