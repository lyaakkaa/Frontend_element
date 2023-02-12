import {getRepos as getReposFromGithub} from "./api.js";
import {formatDate} from "./utils.js";
import {timeAgo} from "./timeago.js";

const list = document.getElementById('repos');
const nextBtn = document.getElementById('next');
const prevBtn = document.getElementById('prev');

const user = 'techorda3';

let pageNumber = 1;

function getRepos() {
    getReposFromGithub(user, pageNumber, 2).then(repos => {

        let reposHtml = '';

        repos.forEach(repo => {
            reposHtml += `
<p>Repo Name ${repo.full_name}</p>
<time>Created at ${formatDate(repo.created_at)}</time>
<time>${timeAgo(repo.created_at)}</time>
`
        });

        list.innerHTML = reposHtml;
    })
}

getRepos()

function nextPage() {
    pageNumber++;
    getRepos()
}

function prevPage() {
    if (pageNumber > 1) {
        pageNumber--;
        getRepos();
    }
}

nextBtn.addEventListener('click', nextPage);
prevBtn.addEventListener('click', prevPage)