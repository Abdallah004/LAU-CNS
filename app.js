const menu = document.getElementById("menu")
const openMenu = document.getElementById("menu-open")
const closeMenu = document.getElementById("menu-close")
const openSearch = document.getElementById("search-open")


openMenu.addEventListener("click", function(){
    menu.style.width = "250px";
})

closeMenu.addEventListener("click", function(){
    menu.style.width = "0";
})

openSearch.addEventListener("click", function(){
    searchContainer.style.display = "inline";
    menu.style.width = "0";
})





const locations = [
    "Sage Hall",
    "Nicol Hall",
    "Irwin Hall",
    "Cafeteria",
    "Wadad Sabbagh Khoury Student Center",
    "Safadi Fine Arts",
    "Upper Gate",
    "Gymnasium",
    "University Services",
    "Orme Gray",
    "Shannon Hall",
    "Lower Gate",
    "Middle Gate",
    "Riyad Nassar Library",
    "Adnan Kassar School Of Business"
];

const searchInput = document.getElementById("searchInput");
const searchResults = document.getElementById("searchResults");
const closeSearch = document.getElementById("search-close");
const searchContainer = document.getElementById("search-container");

function renderResults(results) {
    searchResults.innerHTML = "";
    results.forEach(location => {
        const div = document.createElement("div");
        div.className = "result";
        div.textContent = location;
        searchResults.appendChild(div);
    });
}

searchInput.addEventListener("input", () => {
    const query = searchInput.value.toLowerCase();
    const filteredLocations = locations.filter(location =>
        location.toLowerCase().includes(query)
    );
    renderResults(filteredLocations);
});

closeSearch.addEventListener("click", () => {
    searchContainer.style.display = "none";
});

// Initial empty results
renderResults([]);