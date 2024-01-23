const navSlide = () => {
    const burger = document.querySelector('.burger');
    const nav = document.querySelector('.nav-links');
    const navLinks = document.querySelectorAll('.nav-links li');
    //toggle nav
    burger.addEventListener('click', () => {
        nav.classList.toggle('nav-active');
        // animate links
        navLinks.forEach((link, index)=>{
            if(link.style.animation){
                link.style.animation = '';
            }else{
                link.style.animation = `FadeNavLink 0.5s ease forwards ${index / 7 + 0.2}s`;
            }
        });
        // burger animation
        burger.classList.toggle('b-toggle');
    });
}

function getTrending(){
    // check if the trending container exists
    const trendingBooksContainer = document.getElementById('trending-output');
    if(trendingBooksContainer){
        // clear trending output div
        document.getElementById('trending-output').innerHTML="";
        // fetch the trending books for today from openlibrary
        // try{
            fetch("http://openlibrary.org/trending/daily.json")
            .then(response => response.json())
            .then(data =>{
                // for(var i = 0; i< 10; i++){
                //     document.getElementById("trending-output").innerHTML+="<div>'<h3>"+data.works[i].title+"</h3><br>"+data.works[i].author_name[0]+
                //     "<br><img src='http://covers.openlibrary.org/b/olid/"+data.works[i].cover_edition_key+"-M.jpg'></div>";
                // }
                const trendingOutput = document.getElementById("trending-output");
                for(var i = 0; i<= 19; i++){
                    if(data.works[i].author_name && data.works[i].cover_edition_key){
                        // create new div element for each book and add class the to it then append it to the parent trending-output div
                        const newDiv = document.createElement("div");
                        newDiv.classList.add("Trending-output-items");
                        newDiv.innerHTML = `
                        <img src='http://covers.openlibrary.org/b/olid/${data.works[i].cover_edition_key}-M.jpg'>
                        <br>
                        <button data-title="${encodeURIComponent(data.works[i].title)}" data-author="${encodeURIComponent(data.works[i].author_name[0])}">Add to list</button>
                        <br><h3>${data.works[i].title}</h3>
                        <h4>${data.works[i].author_name[0]}</h4>
                        <p>First published in ${data.works[i].first_publish_year}</p>
                        `;
                        trendingOutput.appendChild(newDiv);
                    }
             }
            });
    }
    // }catch(error){
    //     console.error('error');
    // }
}

// search by titles
function titleSearch(query){
    // fetch search results
    // check if the search container exists
    const searchContainer = document.getElementById('results-output');
    if(searchContainer){
        // clear current results displayed
        document.getElementById('results-output').innerHTML="";
        
        fetch("https://openlibrary.org/search.json?title="+query+"&sort=rating")
        .then(response => response.json())
        .then(data =>{
            // get number of results found
            const resultCount = data.docs.length;
            if(resultCount > 50){
                document.getElementById("result-count").innerHTML=data.docs.length.toLocaleString() + " results found. Displaying top 50";
                // loop through and each book result & create new div for them
                const resultsOutput = document.getElementById("results-output");
                var count = 0;
                for(var i = 0; count< 50; i++){
                    if(data.docs[i].edition_key && data.docs[i].author_name){
                        const workslink = "https://openlibrary.org"+data.docs[i].key;
                        const newDiv = document.createElement("div");
                        newDiv.classList.add("Result-output-items");
                        
                        newDiv.innerHTML = `
                        <img src='http://covers.openlibrary.org/b/olid/${data.docs[i].edition_key[0]}-M.jpg'>
                        <br>
                        <button data-title="${encodeURIComponent(data.docs[i].title)}" data-author="${encodeURIComponent(data.docs[i].author_name[0])}">Add to list</button>
                        <br><a href="${workslink}"><h3>${data.docs[i].title}</h3></a>
                        <h4>${data.docs[i].author_name[0]}</h4>
                        <p>First published in ${data.docs[i].first_publish_year}</p>
                        <p>${data.docs[i].number_of_pages_median} of pages</p>
                        <p>Average rating: ${data.docs[i].ratings_average}</p>
                        `;
                        resultsOutput.appendChild(newDiv);
                        count++;
                    }
                }
            }else if(resultCount > 0){
                document.getElementById("result-count").innerHTML=+data.docs.length.toLocaleString() + " results found.";
                // loop through and each book result & create new div for them
                const resultsOutput = document.getElementById("results-output");
                for(var i = 0; i< data.docs.length; i++){
                    if(data.docs[i].edition_key && data.docs[i].author_name){
                        const workslink = "https://openlibrary.org"+data.docs[i].key;
                        const newDiv = document.createElement("div");
                        newDiv.classList.add("Result-output-items");
                        
                        newDiv.innerHTML = `
                        <img src='http://covers.openlibrary.org/b/olid/${data.docs[i].edition_key[0]}-M.jpg'>
                        <br>
                        <button data-title="${encodeURIComponent(data.docs[i].title)}" data-author="${encodeURIComponent(data.docs[i].author_name[0])}">Add to list</button>
                        <br><a href="${workslink}"><h3>${data.docs[i].title}</h3></a>
                        <h4>${data.docs[i].author_name[0]}</h4>
                        <p>First published in ${data.docs[i].first_publish_year}</p>
                        <p>${data.docs[i].number_of_pages_median} of pages</p>
                        <p>Average rating: ${data.docs[i].ratings_average}</p>
                        `;
                        resultsOutput.appendChild(newDiv);
                    }
                }   
            }else{
                document.getElementById("result-count").innerHTML="No results found.";
            }
        });
    }
}

// fetch and display the data for the works written by author key
function getAuthorWorks(key, author){
    const searchContainer = document.getElementById('results-output');
    if(searchContainer){
        // clear current results displayed
        document.getElementById('results-output').innerHTML="";
        document.getElementById("result-count").innerHTML="";
        fetch("https://openlibrary.org/authors/"+ key +"/works.json")
        .then(response => response.json())
        .then(data => {
            const resultsOutput = document.getElementById("results-output");
            for(var i = 0; i < data.entries.length; i++){
                if(data.entries[i].covers){
                    const workslink = "https://openlibrary.org"+data.entries[i].key;
                    const newDiv = document.createElement("div");
                        newDiv.classList.add("Result-author-items");
                        newDiv.innerHTML = `
                        <img src='http://covers.openlibrary.org/b/id/${data.entries[i].covers[0]}-M.jpg'>
                        <br>
                        <button data-title="${encodeURIComponent(data.entries[i].title)}" data-author="${encodeURIComponent(author)}">Add to list</button>
                        <br><a href="${workslink}"><h3>${data.entries[i].title}</h3></a>
                        `;
                        resultsOutput.appendChild(newDiv);
                    }   
                }
        });
    }
}

// search authors
function authorSearch(query){
    // fetch search results
    // check if the search container exists
    const searchContainer = document.getElementById('results-output');
    if(searchContainer){
        // clear current results displayed
        document.getElementById('results-output').innerHTML="";
        
        fetch("https://openlibrary.org/search/authors.json?q="+query)
        .then(response => response.json())
        .then(data =>{
            // get number of results found
            const resultCount = data.docs.length;
            if(resultCount > 20){
                document.getElementById("result-count").innerHTML=data.docs.length.toLocaleString() + " results found. Displaying top 20:";
                // loop through and each author result & create new div for them
                const resultsOutput = document.getElementById("results-output");
                for(var i = 0; i< 20; i++){
                    const newDiv = document.createElement("div");
                    newDiv.classList.add("Result-author-items");
                    newDiv.innerHTML = `
                    <img src='http://covers.openlibrary.org/a/olid/${data.docs[i].key}-M.jpg'>
                    <br><a href="javascript:getAuthorWorks('${data.docs[i].key}', '${data.docs[i].name}')"><h3>${data.docs[i].name}</h3></a>
                    <h4>Top work: ${data.docs[i].top_work}</h4>
                    <p>Total work count: ${data.docs[i].work_count}</p>
                    `;
                    resultsOutput.appendChild(newDiv);
                }
            }else if(resultCount > 0){
                document.getElementById("result-count").innerHTML=data.docs.length.toLocaleString() + " results found.";
                // loop through and each author result & create new div for them
                const resultsOutput = document.getElementById("results-output");
                for(var i = 0; i< data.docs.length; i++){
                    const newDiv = document.createElement("div");
                    newDiv.classList.add("Result-author-items");
                    newDiv.innerHTML = `
                    <img src='http://covers.openlibrary.org/a/olid/${data.docs[i].key}-M.jpg'>
                    <br><a href="javascript:getAuthorWorks('${data.docs[i].key}', '${data.docs[i].name}')"><h3>${data.docs[i].name}</h3></a>
                    <h4>Top work: ${data.docs[i].top_work}</h4>
                    <p>Total work count: ${data.docs[i].work_count}</p>
                    `;
                    resultsOutput.appendChild(newDiv);
                }
            }else{
                document.getElementById("result-count").innerHTML="No results found.";
            }
        });
    }
}

// search by subject
function subjectSearch(query){
    // check if the search container exists
    const searchContainer = document.getElementById('results-output');
    if(searchContainer){
        // clear current results displayed
        document.getElementById('results-output').innerHTML="";
        const formattedInput = query.replace(/ /g, "_");
        fetch("https://openlibrary.org/subjects/" + formattedInput + ".json?limit=100")
        .then(response => response.json())
        .then(data => {
            // get number of results found
            const resultCount = data.works.length;
            // check results have covers
                if(resultCount > 50){
                    document.getElementById("result-count").innerHTML=data.works.length.toLocaleString() + " results found. Displaying top 50";
                    // loop through and each book result & create new div for them
                    const resultsOutput = document.getElementById("results-output");
                    for(var i = 0; i< 50; i++){
                        if(data.works[i].cover_id != null){
                            const workslink = "https://openlibrary.org"+data.works[i].key;
                            const newDiv = document.createElement("div");
                            newDiv.classList.add("Result-output-items");
                            newDiv.innerHTML = `
                            <img src='http://covers.openlibrary.org/b/id/${data.works[i].cover_id}-M.jpg'>
                            <br>
                            <button data-title="${encodeURIComponent(data.works[i].title)}" data-author="${encodeURIComponent(data.works[i].authors[0].name)}">Add to list</button>
                            <br><a href="${workslink}"><h3>${data.works[i].title}</h3></a>
                            <p>Author: ${data.works[i].authors[0].name}</p>
                            <p>First published in ${data.works[i].first_publish_year}</p>
                            `;
                            resultsOutput.appendChild(newDiv);
                        }
                    }
                }else if( resultCount > 0){
                    document.getElementById("result-count").innerHTML=data.works.length.toLocaleString() + " results found.";
                    // loop through and each book result & create new div for them
                    const resultsOutput = document.getElementById("results-output");
                    for(var i = 0; i< resultCount; i++){
                        if(data.works[i].cover_id != null){
                            const workslink = "https://openlibrary.org"+data.works[i].key;
                            const newDiv = document.createElement("div");
                            newDiv.classList.add("Result-output-items");
                            newDiv.innerHTML = `
                            <img src='http://covers.openlibrary.org/b/id/${data.works[i].cover_id}-M.jpg'>
                            <button data-title="${encodeURIComponent(data.works[i].title)}" data-author="${encodeURIComponent(data.works[i].authors[0].name)}">Add to list</button>
                            <br><a href="${workslink}"><h3>${data.works[i].title}</h3></a>
                            <p>Author: ${data.works[i].authors[0].name}</p>
                            <p>First published in ${data.works[i].first_publish_year}</p>
                            `;
                            resultsOutput.appendChild(newDiv);
                        }
                    }
                }else{
                    document.getElementById("result-count").innerHTML="No results found.";
                }
        });
    }

}

// search bar function
function performSearch(){
    // check if search form exists
    const searchingForm = document.getElementById('searchForm');
    if(searchingForm){
        document.getElementById('searchForm').addEventListener('submit', function (e) {
            e.preventDefault();

            const searchCategory = document.getElementById('SearchCategory').value;
            const searchQuery = document.getElementById('searchInput').value.toLowerCase();
            if(searchQuery.trim().length > 0){
            // perform search based on chosen category
            switch(searchCategory) {
                case 'title':
                    titleSearch(searchQuery);
                    break;
                case 'author':
                    authorSearch(searchQuery);
                    break;
                case 'genre':
                    subjectSearch(searchQuery);
                    break;
            }
        }
        });
    }
}

// home page search bar
function homeSearch(){
    // check if home search form exists
    const homesearchingForm = document.getElementById('HomeSearch');
    if(homesearchingForm){
       document.getElementById('HomeSearch').addEventListener('submit', function (e) {
           e.preventDefault();

           const query = document.querySelector('.searchInput').value.toLowerCase();

           window.location.href = `Search.html?query=${query}`;
       });
    }
}

// load the search on search page
function loadHomeSearch(){
    if (window.location.pathname === "/Search.html") {
        const urlParams = new URLSearchParams(window.location.search);
        const searchQuery = urlParams.get('query');
        if (searchQuery) {
            titleSearch(searchQuery);
            console.log(searchQuery);
        }
    }
}

// open modal for input details and add books
let handleFormSubmission; 
function addBookInput(title, author){
    return new Promise((resolve, reject) => {
    openModal();
    // function to handle form submission
    handleFormSubmission = function(e) {
        e.preventDefault();

        const listCategory = document.getElementById('lists').value;
        const score = document.getElementById('scores').value;
        if(listCategory){
            console.log(title, author, listCategory, score);
            // add to list or change category 
            if(checkList(title, author)){
                changeCategory(title, author, score, listCategory);
            }else{
                AddBooksToLists(title, author, score, listCategory);
            }
            // close modal
            const modal = document.querySelector(".modal");
            const overlay = document.querySelector(".overlay");
            modal.classList.add("hidden");
            overlay.classList.add("hidden");
            const categorySelect = document.getElementById("lists");
            const scoreSelect = document.getElementById("scores");
            categorySelect.selectedIndex = 0;
            scoreSelect.selectedIndex = 0;

            // remove the event listener handling submission
            document.getElementById('modalInput').removeEventListener('submit', handleFormSubmission);
            resolve()
        }
    }

    // attach eventlistener for form submission
    document.getElementById('modalInput').addEventListener('submit', handleFormSubmission);
    })
}

// open modal for input
function openModal(){
    const modal = document.querySelector(".modal");
    const overlay = document.querySelector(".overlay");
    //position modal in center
    modal.classList.add("modal-fixed");

    modal.classList.remove("hidden");
    overlay.classList.remove("hidden");
}

//close modal
function closeModal() {
    const closeModalBtn = document.querySelector(".close-btn");
    const modal = document.querySelector(".modal");
    const overlay = document.querySelector(".overlay");

    function closeModalHandler(){
        modal.classList.add("hidden");
        overlay.classList.add("hidden");
        const categorySelect = document.getElementById("lists");
        const scoreSelect = document.getElementById("scores");
        categorySelect.selectedIndex = 0;
        scoreSelect.selectedIndex = 0;

        // remove form event listener
        document.getElementById('modalInput').removeEventListener('submit', handleFormSubmission);
    }

    closeModalBtn.addEventListener('click', closeModalHandler);
    overlay.addEventListener('click', closeModalHandler);

  };

//add books to lists
function AddBooksToLists(title, author, score, category){
    const categoryKey = `${category}Books`;
    const existingCategoryList = JSON.parse(localStorage.getItem(categoryKey)) || [];

    existingCategoryList.push({ title, author, score});

    localStorage.setItem(categoryKey, JSON.stringify(existingCategoryList));
    // test storage
    console.log(`Updated ${category} Books List:`, existingCategoryList);
}


// select list to display on table
function listCategoryButtons(){
    const listButtons = document.getElementsByClassName('menu-options');
    if(listButtons.length > 0){
        document.getElementById('Completed').addEventListener('click', function(){
            listDisplay("Completed");
        });

        document.getElementById('Current').addEventListener('click', function(){
            listDisplay("CurrentlyReading");
        });

        document.getElementById('Planned').addEventListener('click', function(){
            listDisplay("PlanToRead");
        });
    }
}

function listDisplay(category){
    const categoryKey = `${category}Books`;
    const list = JSON.parse(localStorage.getItem(categoryKey)) || [];

    // get table body
    const tableBody = document.getElementById('ListTableBody');
    // clear current data
    tableBody.innerHTML = '';
    var index = 1;
    // iterate through list displaying data
    list.forEach(book => {
        const row = tableBody.insertRow();
        // create cells in rows
        const bookIndexCell = row.insertCell(0);
        const titleCell = row.insertCell(1);
        const authorCell = row.insertCell(2);
        const scoreCell = row.insertCell(3);
        const editCell = row.insertCell(4);

        // center content in specific cells
        bookIndexCell.classList.add("centeredCell");
        scoreCell.classList.add("centeredCell");
        editCell.classList.add("centeredCell");

        // set values
        bookIndexCell.textContent = index;
        titleCell.textContent = book.title;
        authorCell.textContent = book.author;
        scoreCell.textContent = book.score;
        editCell.innerHTML = `<span id="itemlinks"><a href="#" onclick="refresh('${category}', '${book.title}', '${book.author}', 'edit')">edit</a> 
        | <a href="#" onclick="refresh('${category}', '${book.title}', '${book.author}', 'remove')"">remove</a></span>`;

        index += 1;
    });
}

const app = ()=>{
    navSlide();
    getTrending();
    performSearch();
    homeSearch();
    loadHomeSearch();
    closeModal();
    listCategoryButtons();
}


app()

// handle add button click
function handleButtonClick(event){
    const target = event.target;

    if(target.tagName === 'BUTTON' && target.dataset.title && target.dataset.author) {
        const title = decodeURIComponent(target.dataset.title);
        const author = decodeURIComponent(target.dataset.author);
        addBookInput(title, author);
    }
}

// remove selected book from list
function removeBook(title, author) {
    console.log(title, author);
}

//refresh table data after list edit, takes list category, book title and author and action params
async function refresh(category, title, author, action){
    // call method depending on if we are removing book from lists or editing 
    if(action == "remove"){
        await removeBook(title, author);
    }else{
        await addBookInput(title, author);
    }
    // call display to update table
    console.log("refresh the page");
    listDisplay(category);
}

// check if book already in list
function checkList(title, author){
    const categories = ['CurrentlyReading', 'Completed', 'PlanToRead'];
    for (const category of categories) {
        const categoryKey = `${category}Books`;
        const categoryList = JSON.parse(localStorage.getItem(categoryKey)) || [];

        const isInList = categoryList.some(book => book.title === title && book.author == author);

        if (isInList) {
            return true; // Book is in at least one list
        }
    }
}

// if book is in any list move to new list and delete from old
function changeCategory(title, author, newScore, newCategory){
    const categories = ['CurrentlyReading', 'Completed', 'PlanToRead'];
    for (const currentCategory of categories) {
        const currentCategoryKey = `${currentCategory}Books`;
        const newCategoryKey = `${newCategory}Books`;

        // get lists
        const currentCategoryList = JSON.parse(localStorage.getItem(currentCategoryKey)) || [];
        const newCategoryList = JSON.parse(localStorage.getItem(newCategoryKey)) || [];

        // Find the book in the current category list
        const bookIndex = currentCategoryList.findIndex(book => book.title === title && book.author === author);

        if (bookIndex !== -1) {
            // Remove the book from the current category list
            const removedBook = currentCategoryList.splice(bookIndex, 1)[0];

            // check if the book alrady in the new category list
            const existingBookIndex = newCategoryList.findIndex(book => book.title === title && book.author === author);
            if(existingBookIndex !== -1){
                newCategoryList[existingBookIndex].score = newScore;
            }else{
                // Add the book to the new category list
                removedBook.score = newScore;
                newCategoryList.push(removedBook);
            }

            // Update Local Storage for both categories
            localStorage.setItem(currentCategoryKey, JSON.stringify(currentCategoryList));
            localStorage.setItem(newCategoryKey, JSON.stringify(newCategoryList));

            console.log(`Moved book "${title}" by ${author} to ${newCategory}.`, newCategoryList);
            return; // Exit the function after moving the book
        }
    }
}