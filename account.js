const editButton = document.getElementById("edit-route");
const selectInput = document.getElementById("path-options");
const currentPath = document.getElementById("current-path");

editButton.addEventListener("click", () => {
    if (selectInput.classList.contains("hidden")) {
        selectInput.classList.remove("hidden"); 
        currentPath.style.display = "none";    
    } else {
        selectInput.classList.add("hidden");   
        currentPath.style.display = "inline"; 
        currentPath.textContent = selectInput.value; 
    }
});

selectInput.addEventListener("change", () => {
    currentPath.textContent = selectInput.value; 
});
