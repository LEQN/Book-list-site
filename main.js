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
                for(var i = 0; i<= 20; i++){
                    if(data.works[i].author_name){
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
                for(var i = 0; i< 50; i++){
                    if(data.docs[i].edition_key){
                        const workslink = "https://openlibrary.org"+data.docs[i].key;
                        const newDiv = document.createElement("div");
                        newDiv.classList.add("Result-output-items");
                        if(data.docs[i].author_name){
                        newDiv.innerHTML = `
                        <img src='http://covers.openlibrary.org/b/olid/${data.docs[i].edition_key[0]}-M.jpg'>
                        <br><button>Add to list</button>
                        <br><a href="${workslink}"><h3>${data.docs[i].title}</h3></a>
                        <h4>${data.docs[i].author_name[0]}</h4>
                        <p>First published in ${data.docs[i].first_publish_year}</p>
                        <p>${data.docs[i].number_of_pages_median} of pages</p>
                        <p>Average rating: ${data.docs[i].ratings_average}</p>
                        `;
                        resultsOutput.appendChild(newDiv);
                        }else{
                        newDiv.innerHTML = `
                        <img src='http://covers.openlibrary.org/b/olid/${data.docs[i].edition_key[0]}-M.jpg'>
                        <br><button>Add to list</button>
                        <br><a href="${workslink}"><h3>${data.docs[i].title}</h3></a>
                        <p>First published in ${data.docs[i].first_publish_year}</p>
                        <p>${data.docs[i].number_of_pages_median} of pages</p>
                        <p>Average rating: ${data.docs[i].ratings_average}</p>
                        `;
                        resultsOutput.appendChild(newDiv);
                        }
                    }
                }
            }else if(resultCount > 0){
                document.getElementById("result-count").innerHTML=+data.docs.length.toLocaleString() + " results found.";
                // loop through and each book result & create new div for them
                const resultsOutput = document.getElementById("results-output");
                for(var i = 0; i< data.docs.length; i++){
                    if(data.docs[i].edition_key){
                        const workslink = "https://openlibrary.org"+data.docs[i].key;
                        const newDiv = document.createElement("div");
                        newDiv.classList.add("Result-output-items");
                        if(data.docs[i].author_name){
                        newDiv.innerHTML = `
                        <img src='http://covers.openlibrary.org/b/olid/${data.docs[i].edition_key[0]}-M.jpg'>
                        <br><button>Add to list</button>
                        <br><a href="${workslink}"><h3>${data.docs[i].title}</h3></a>
                        <h4>${data.docs[i].author_name[0]}</h4>
                        <p>First published in ${data.docs[i].first_publish_year}</p>
                        <p>${data.docs[i].number_of_pages_median} of pages</p>
                        <p>Average rating: ${data.docs[i].ratings_average}</p>
                        `;
                        resultsOutput.appendChild(newDiv);
                        }else{
                        newDiv.innerHTML = `
                        <img src='http://covers.openlibrary.org/b/olid/${data.docs[i].edition_key[0]}-M.jpg'>
                        <br><button>Add to list</button>
                        <br><a href="${workslink}"><h3>${data.docs[i].title}</h3></a>
                        <p>First published in ${data.docs[i].first_publish_year}</p>
                        <p>${data.docs[i].number_of_pages_median} of pages</p>
                        <p>Average rating: ${data.docs[i].ratings_average}</p>
                        `;
                        resultsOutput.appendChild(newDiv);
                        }
                    }
                }   
            }else{
                document.getElementById("result-count").innerHTML="No results found.";
            }
        });
    }
}

// fetch and display the data for the works written by author key
function getAuthorWorks(key){
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
                        <br><button>Add to list</button>
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
                    <br><a href="javascript:getAuthorWorks('${data.docs[i].key}')"><h3>${data.docs[i].name}</h3></a>
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
                    <br><a href="javascript:getAuthorWorks('${data.docs[i].key}')"><h3>${data.docs[i].name}</h3></a>
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
                        <br><button>Add to list</button>
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
                        <br><button>Add to list</button>
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
function addBookInput(title, author){
    openModal();
    // function to handle form submission
    function handleFormSubmission (e) {
        e.preventDefault();

        const listCategory = document.getElementById('lists').value;
        const score = document.getElementById('scores').value;
        if(listCategory){
            console.log(title, author, listCategory, score);
            // add to list
            AddBooksToLists(title, author, score, listCategory);
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
        }
    }

    // attach eventlistener for form submission
    document.getElementById('modalInput').addEventListener('submit', handleFormSubmission);
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

    closeModalBtn.addEventListener('click', () => {
        modal.classList.add("hidden");
        overlay.classList.add("hidden");
        const categorySelect = document.getElementById("lists");
        const scoreSelect = document.getElementById("scores");
        categorySelect.selectedIndex = 0;
        scoreSelect.selectedIndex = 0;
        
    });

    overlay.addEventListener('click', () => {
        modal.classList.add("hidden");
        overlay.classList.add("hidden");
        const categorySelect = document.getElementById("lists");
        const scoreSelect = document.getElementById("scores");
        categorySelect.selectedIndex = 0;
        scoreSelect.selectedIndex = 0;
    });
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


const app = ()=>{
    navSlide();
    getTrending();
    performSearch();
    homeSearch();
    loadHomeSearch();
    closeModal();
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
