const covBook = require('../img/no-image.png');
const { Remarkable } = require('remarkable');

let showResult = (key, title, authors, cover) => {
  let html = "";
  let coverBook = checkCoverBook(cover);
  html += `
  <div>
    <img src="${coverBook}">
  </div>
  <div class="book-title">  
    <p><b>Book: </b>${title}</p>
    <p><b>Authors: </b>
  `;
  for(let numberAuthors in authors) {
    html += `${authors[numberAuthors].name}`;  
    if(numberAuthors != authors.length-1){
      html+=', ';
    }else {
      html+='.';
    }
  }
  html+= `</p>
    <div class="inactive" id="${key}-description"></div>
    <button class="btn btn-dark read-more" id="${key}-read-button" type="button">
    Read More<i class="fas fa-arrow-down ps-3"></i></button>
  </div>`;
   
  

  let child = document.createElement('div');
  child.classList.add('book', 'd-flex', 'm-5');
  child.setAttribute('id', `${key}`);
  child.innerHTML = html;

  
  document.getElementById('result').appendChild(child);
  document.getElementById(`${key}-read-button`).addEventListener("click", function() {
    let elem = document.getElementById(`${key}-description`);
    let buttonReadMore = document.getElementById(`${key}-read-button`);
    if (elem.classList.contains('inactive')) {
      elem.classList.remove('inactive');
      elem.classList.add('active');
      buttonReadMore.classList.remove('inactive');
      buttonReadMore.classList.add('active');
      buttonReadMore.innerHTML = `Read Less<i class="fas fa-arrow-up ps-3"></i>`;
      
  } else {
      elem.classList.remove('active');
      elem.classList.add('inactive');
      buttonReadMore.classList.remove('active');
      buttonReadMore.classList.add('inactive');
      buttonReadMore.innerHTML = `Read More<i class="fas fa-arrow-down ps-3"></i>`;
  }
  });
}

let showResultNotFound = () => {
  let child = document.createElement('h2');
  child.classList.add('text-center', 'mt-3');
  child.innerHTML = 'No results found';
  document.getElementById('result').appendChild(child);
}

let checkCoverBook = (cover) => {
  if(cover == null) {
    cover = covBook;
  } else {
    cover = `https://covers.openlibrary.org/b/id/${cover}-M.jpg`;
  }
  return cover;
}

let showDescription = (keyId, html) => {
  let md = new Remarkable();
  let elem = document.getElementById(`${keyId}-description`);
  if(typeof(html) == 'object'){
    html = _.get(html, 'value', 'Description not found');
  }
  let paragraph = document.createElement('p');
  paragraph.innerHTML = '<b>Description:</b>' + md.render(html);

   elem.appendChild(paragraph);
    
};

export {showResult, showResultNotFound, checkCoverBook, showDescription};