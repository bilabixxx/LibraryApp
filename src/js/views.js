import '../js/script';

const h1 = document.createElement('h1');
h1.innerHTML = 'Library';
h1.classList.add('text-center','mt-3', 'mb-5');

const div = document.createElement('div');
div.classList.add('d-flex', 'justify-content-center');

const input = document.createElement('input');
input.classList.add('text-center', 'py-2');
input.setAttribute('id','search-bar');
input.setAttribute('type','text');
input.setAttribute('placeholder','Search subject');
input.setAttribute('name','search-bar');

const button = document.createElement('button');
button.innerHTML = 'Search';
button.classList.add('btn', 'btn-primary', 'btn-dark', 'ms-1');
button.setAttribute('id','search-btn');
button.setAttribute('type','submit');

const divResult = document.createElement('div');
divResult.setAttribute('id','result');

document.body.appendChild(h1);
const mainContainer = document.body.appendChild(div); 
mainContainer.appendChild(input);
mainContainer.appendChild(button);
document.body.appendChild(divResult);

document.getElementById('search-btn').addEventListener('click', () => getSubjectResult());