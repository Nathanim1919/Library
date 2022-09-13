
// declaring variables
const searchclose = document.getElementById('searchclose');
const searchicon = document.getElementById('searchicon');
const darkmode = document.getElementById('darkmode');
const plus = document.getElementById('plus');
const backdrop = document.getElementById('backdrop-container');
const searchbar = document.querySelector('.searchbar');
const searchinput = document.getElementById('searchinput');
const body = document.querySelector('body');
const header = document.getElementById('header');
const book_title = document.getElementById('book-title');
const author_name = document.getElementById('author-name');
const book_page = document.getElementById('book-page');
const delbtn = document.getElementById('delete');
const BookStatus = document.getElementById('Bookstatus');
const Status = document.getElementById('status');
const submit = document.getElementById('submit');
const title = document.getElementById('title');
const author = document.getElementById('author');
const page = document.getElementById('page');
const container = document.getElementById('book-container');
const form = document.querySelector('#form');
const close = document.getElementById('close');
const icons = document.querySelector('.icon');
const info = document.querySelector('.info');
const info_icon = document.querySelector('#info');
const filter = document.querySelector('.filter');
const inner = document.querySelector('.inner');
const exit = document.querySelector('.exit');
const information = document.querySelector('.information');
const backdrop2 = document.querySelector('.backdrop2');



let books = [];
if(!localStorage.getItem('bookId')){
        localStorage.setItem('bookId',1);
}


let bookId = localStorage.getItem('bookId');

// events
filter.addEventListener('click',()=>{
    inner.classList.add('inner_display');
});

inner.addEventListener('click',()=>{
    inner.classList.remove('inner_display');
    info.classList.remove('display');
    backdrop2.classList.remove('dropDisplay');
})


window.addEventListener('click',(e)=>{
   if (e.target != filter && e.target != info_icon) {
    inner.classList.remove('inner_display');
    info.classList.remove('display');
    backdrop2.classList.remove('dropDisplay');
   }
       
    
});

close.addEventListener('click',()=>backdrop.classList.remove('bkdrop'));
searchicon.addEventListener('click',()=>searchbar.style.top=`${3}rem`);
searchclose.addEventListener('click',()=>searchbar.style.top=`${-3}rem`);
plus.addEventListener('click',()=>backdrop.classList.toggle('bkdrop'));
submit.addEventListener('click',(e)=>{
    e.preventDefault();
    addBook();
    form.reset();
    
})
info_icon.addEventListener('click',()=>{
    info.classList.add('display');
    backdrop2.classList.add('dropDisplay');
});



exit.addEventListener('click',()=>{
    info.classList.remove('display');
    inner.classList.remove('inner_display');
    backdrop2.classList.remove('dropDisplay');
})
darkmode.addEventListener('click',()=>{
    if (!body.classList.contains('dark')) {
        body.classList.add('dark');
        darkmode.classList.add('fa-sun');
        darkmode.classList.remove('fa-moon');

    }else{
        body.classList.remove('dark');
        darkmode.classList.remove('fa-sun');
        darkmode.classList.add('fa-moon');
    }
    
   
});





// add book to the localstorage
function addBook(){
    if (!validate()) {
        alert('invalide form or dublicate book title');
        return false;
    }
   
    let titleValue = title.value;
    let authorValue = author.value;
      
    
    // minimizing the length of the title and author name if it contains is greater than 20 and 15 characters respectively
    // checking the length of the book title 
    if (authorValue.length >= 20) {
       authorValue = Array.from(authorValue);
       authorValue = authorValue.splice(0,20).join('');
    }

    // checking the length of the author name
    if (titleValue.length >= 15) {
        titleValue = Array.from(titleValue);
        titleValue = titleValue.splice(0,20).join('');
     }

    // creating a book object from newlly add book
    const book = {
        title:`"${titleValue}"`,
        author:`By:${authorValue}`,
        page:`pages: ${page.value}`,
        bookStatus:Status.value,
        bookId:bookId,   
    }
    bookId++;
    localStorage.setItem('bookId',bookId);

    // push the newlly craeted object into the books array
    books.push(book);

    // save the array to the localstorage by changing it into string using JSON.stringify method
    localStorage.setItem('books',JSON.stringify(books));

    // after add the book into the localstorage we remove the form (after we tab the submit button)
    backdrop.classList.remove('bkdrop');
    fetchBook();
    }


// validating the user input
function validate(){
    if (title.value != '' && author.value != '' && page.value > 0 && preventDublicate() && (Status.value == 'not Started' || Status.value == 'Inprogress' || Status.value == 'Completed')) {
        return true;
    }
    else{
        return false;
    }
}

function preventDublicate(){
    // books = JSON.parse(localStorage.getItem('books'));
    for (let i = 0; i < books.length; i++) {
        if (title.value == books[i].title) {
          return false;
        }
    }

      return true;
}



// build book card to every objects that are found in the books array
function build(){
  
  // make the books container clear 
  container.textContent = '';
 
//for each book objects found in books array, we gonna create its sub childs and append it to the container 
  books.forEach(mybook =>{
      const{title,author,page,bookStatus,bookId} = mybook;
       
      const book = document.createElement('div');
          book.setAttribute('id','book');
      const h1 = document.createElement('h1');
          h1.setAttribute('id','book-title');
          h1.textContent = mybook.title;
      const h4 = document.createElement('h4');
          h4.setAttribute('id','author-name');
          h4.textContent = mybook.author;
      const p = document.createElement('p');
          p.setAttribute('id','book-page');
          p.textContent = mybook.page;
      const deleteBtn = document.createElement('button');
          deleteBtn.setAttribute('id','delete');
          deleteBtn.setAttribute('value','delete');
          deleteBtn.innerHTML = 'Delete';
          deleteBtn.setAttribute('onclick',`deleteBook('${bookId}')`);
      const status = document.createElement('button');
          status.setAttribute('id','Bookstatus');
          status.textContent = mybook.bookStatus;
          status.setAttribute('onclick',`statusChange('${bookId}')`);   
      book.append(h1,h4,p,status,deleteBtn);
      container.appendChild(book);    
  });
}


function fetchBook() {
    if (!localStorage.getItem('books')) {
        books = [{
            title:'atomic habit',
            author:'james clear',
            page:235,
            bookStatus:'Completed',
            bookId:bookId,
        }
    ]
        localStorage.setItem('books',JSON.stringify(books));
       
    }
    else{
        books = JSON.parse(localStorage.getItem('books'));
    }
       
        build();
}


function deleteBook(bookId) {
    books.forEach((book,i)=>{
        if (book.bookId == bookId) {
            books.splice(i,1);
        }
     
    });

    
    localStorage.setItem('books',JSON.stringify(books));
    fetchBook();

}


function statusChange(bookId){
    books.forEach((book)=>{
        if (book.bookId == bookId) {
           
            if (book.bookStatus == 'not Started') {
                book.bookStatus = 'Inprogress';
                
               
            }else if(book.bookStatus == 'Inprogress'){
                book.bookStatus = 'Completed';
                               
            }
            else if(book.bookStatus == 'Completed'){
                book.bookStatus = 'not Started';
                         
            }
           
        }
     
    });

    localStorage.setItem('books',JSON.stringify(books));
    fetchBook();

}


let filteredBooksCollections = [];
function filterBook(status) {
    localStorage.removeItem('filteredBooksCollections');
    filteredBooksCollections.splice(0);
    if (!localStorage.getItem('filteredBooksCollections')) {
       localStorage.setItem('filteredBooksCollections',JSON.stringify(filteredBooksCollections));
    }
   
    books.forEach(book=>{
        const{title,author,page,bookStatus,bookId} = book;
        if (book.bookStatus == status) {
           filteredBooksCollections.push(book);
        }
    })
    localStorage.setItem('filteredBooksCollections',JSON.stringify(filteredBooksCollections));
   

    if (status == 'All') {
        build();
    }else{
        buildFilteredBooks(filteredBooksCollections);
    }
}


function buildFilteredBooks(filteredBooksCollections) {
        // make the books container clear 
        container.textContent = '';
       
      //for each book objects found in books array, we gonna create its sub childs and append it to the container 
        filteredBooksCollections.forEach(mybook =>{
            const{title,author,page,bookStatus,bookId} = mybook;
             
            const book = document.createElement('div');
                book.setAttribute('id','book');
            const h1 = document.createElement('h1');
                h1.setAttribute('id','book-title');
                h1.textContent = mybook.title;
            const h4 = document.createElement('h4');
                h4.setAttribute('id','author-name');
                h4.textContent = mybook.author;
            const p = document.createElement('p');
                p.setAttribute('id','book-page');
                p.textContent = mybook.page;
            const deleteBtn = document.createElement('button');
                deleteBtn.setAttribute('id','delete');
                deleteBtn.setAttribute('value','delete');
                deleteBtn.innerHTML = 'Delete';
                deleteBtn.setAttribute('onclick',`deleteBook('${bookId}')`);
            const status = document.createElement('button');
                status.setAttribute('id','Bookstatus'); 
                status.textContent = mybook.bookStatus;
                status.setAttribute('onclick',`statusChange('${bookId}')`);   
            book.append(h1,h4,p,status,deleteBtn);
            container.appendChild(book);    
        });
     
}



function userInfo() {
    container.textContent = '';
    const all = document.createElement('div');
    all.setAttribute('class','userinfo');

    const header = document.createElement('h1');
    header.textContent = 'USER INFORMATION';
    header.style.borderBottom = '2px solid orange';

    const allBooks = document.createElement('h3');
    allBooks.textContent = `number of books u add so far is: ${bookId}  Books`;
    const availableBooks = document.createElement('h3');
    availableBooks.textContent = `Available books: ${books.length} Books`;
    let completedBooks = 0;
    let inprogressBooks = 0;
    let notStartedBooks = 0;

    books.forEach(book =>{
        if (book.bookStatus == 'not Started') {
            notStartedBooks++;
        }else if(book.bookStatus == 'Inprogress'){
            inprogressBooks++;
        }else if(book.bookStatus == 'Completed'){
            completedBooks++;
        }
    });

    const comBooks = document.createElement('h3');
    comBooks.textContent = `Compltede:                      ${completedBooks} Books`;

    const inpBooks = document.createElement('h3');
    inpBooks.textContent = `Inprogress:                      ${inprogressBooks} Books`;

    const notBooks = document.createElement('h3');
    notBooks.textContent = `Started yet:                      ${notStartedBooks} Books`;
    
    all.append(header,allBooks,availableBooks,comBooks,inpBooks,notBooks);
    container.appendChild(all);
}



let searchedBooks = [];
function search() {
    let searchValue = searchinput.value;
    localStorage.removeItem('searchedBooks');
    searchedBooks.splice(0);
    if (!localStorage.getItem('searchedBooks')) {
       localStorage.setItem('searchedBooks',JSON.stringify(filteredBooksCollections));
    }

    books.forEach(book=>{
        const{title,author,page,bookStatus,bookId} = book;
        if (book.title.startsWith(`"${searchValue}`)) {
           searchedBooks.push(book);
        }
    });

    buildFilteredBooks(searchedBooks);

}

fetchBook();

