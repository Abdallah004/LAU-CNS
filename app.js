import { db } from "./netlify/functions/firebase-config.js"; // Firestore instance
import {
  doc,
  getDoc,
} from "https://www.gstatic.com/firebasejs/9.16.0/firebase-firestore.js";
// Fetch data for a single building
let slideshowInterval; // Keep track of the slideshow interval globally
const suggestionBtn = document.getElementById("suggestion-btn");
const currentLocationDiv = document.getElementById("currentLocationDiv");
const dataDivTitle = document.getElementById("data-div-title");

async function fetchBuildingData(buildingID) {
  try {
    const docRef = doc(db, "buildings", buildingID); // Reference to the document
    const docSnap = await getDoc(docRef); // Fetch the document

    if (docSnap.exists()) {
      const buildingData = docSnap.data(); // Extract document data
      console.log("Building Data:", buildingData);

      return buildingData;
    } else {
      console.error("No such building!");
      return null;
    }
  } catch (error) {
    console.error("Error fetching building data:", error);
  }
}

let arr = ["x", "y"];

async function fetchBuildingImages(buildingID) {
  try {
    const docRef = doc(db, "buildings", buildingID); // Reference the Firestore document
    const docSnap = await getDoc(docRef); // Fetch the document

    if (docSnap.exists()) {
      const buildingData = docSnap.data(); // Extract document data
      console.log("Building Data:", buildingData);
      const imageLinks = buildingData.imgs; // Get the imgs array
      createSlideshow(imageLinks); // Pass the array to create the slideshow
    } else {
      console.error("No such building!");
    }
  } catch (error) {
    console.error("Error fetching building data:", error);
  }
}

const menu = document.getElementById("menu");
const openMenu = document.getElementById("menu-open");
const closeMenu = document.getElementById("menu-close");
const openSearch = document.getElementById("search-open");

openMenu.addEventListener("click", function () {
  menu.style.width = "250px";
});

closeMenu.addEventListener("click", function () {
  menu.style.width = "0";
});

openSearch.addEventListener("click", function () {
  searchContainer.style.display = "inline";
  menu.style.width = "0";
});

const locations = [
  { name: "Sage Hall", id: "sage-hall" },
  { name: "Nicol Hall", id: "nicol-hall" },
  { name: "Computer Science Department", id: "nicol-hall", lvl: 5 },
  { name: "Irwin Hall", id: "irwin-hall" },
  { name: "Registrar Office", id: "irwin-hall", lvl: 1 },
  { name: "Business Office", id: "irwin-hall", lvl: 1 },
  { name: "Admissions Office", id: "irwin-hall", lvl: 2 },
  { name: "Cafeteria", id: "wadad-sabbagh-ksc", lvl: 3 },
  { name: "Cyber Cafe", id: "wadad-sabbagh-ksc", lvl: 3 },
  { name: "Clinic", id: "wadad-sabbagh-ksc", lvl: 3 },
  { name: "Nurse", id: "wadad-sabbagh-ksc", lvl: 3 },
  { name: "Gym", id: "wadad-sabbagh-ksc", lvl: 1 },
  { name: "Fitness Center", id: "wadad-sabbagh-ksc", lvl: 1 },
  { name: "Wadad Sabbagh Khoury Student Center", id: "wadad-sabbagh-ksc" },
  { name: "Student Lounge 4", id: "wadad-sabbagh-ksc", lvl: 4 },
  { name: "Student Lounge 5", id: "wadad-sabbagh-ksc", lvl: 5 },
  { name: "Music Room", id: "wadad-sabbagh-ksc", lvl: 2 },
  { name: "Dean Of Students Office", id: "wadad-sabbagh-ksc", lvl: 4 },
  { name: "Red Cross", id: "wadad-sabbagh-ksc", lvl: 4 },
  { name: "Safadi Fine Arts", id: "safadi" },
  { name: "Upper Gate", id: "upper-gate" },
  { name: "University Services", id: "university-services" },
  { name: "Orme Gray", id: "orme-gray" },
  { name: "Shannon Hall", id: "shannon-hall" },
  { name: "Lower Gate", id: "lower-gate" },
  { name: "Gathering Area", id: "gathering-area" },
  { name: "Fountain", id: "fountain" },
  { name: "Middle Gate", id: "middle-gate" },
  { name: "Riyad Nassar Library", id: "library" },
  { name: "Adnan Kassar School Of Business", id: "aksob" },
  { name: "Joseph G. Jabbra Gymnasium", id: "gymnasium" },
  { name: "Pool", id: "gymnasium", lvl: 2 },
  { name: "Tennis", id: "gymnasium", lvl: 5 },
  { name: "BasketBall", id: "gymnasium", lvl: 3 },
  { name: "Ping-Pong", id: "gymnasium", lvl: 4 },
];

const searchInput = document.getElementById("searchInput");
const searchResults = document.getElementById("searchResults");
const closeSearch = document.getElementById("search-close");
const searchContainer = document.getElementById("search-container");
const closeDataBtn = document.getElementById("closeData");
const dataDiv = document.getElementById("data-div");

function renderResults(results) {
  searchResults.innerHTML = "";
  results.forEach((location) => {
    const div = document.createElement("div");
    div.className = "result";
    div.textContent = location.name;
    div.setAttribute("data-read", location.id); // Assign unique data-read attribute
    div.setAttribute("data-read-lvl", location.lvl); // Assign unique data-read attribute
    searchResults.appendChild(div);
  });
}

searchInput.addEventListener("input", () => {
  const query = searchInput.value.toLowerCase();
  const filteredLocations = locations.filter((location) =>
    location.name.toLowerCase().includes(query)
  );
  renderResults(filteredLocations);
});

closeSearch.addEventListener("click", () => {
  searchContainer.style.display = "none";
});

// Initial empty results
renderResults([]);

closeDataBtn.addEventListener("click", function () {
  dataDiv.style.display = "none";
  if(document.getElementById("iframeDetails")){
    document.getElementById("iframeDetails").style.display = "none";
  }
});

// async function handleBuildingClick(buildingId) {
//     dataDiv.style.display = "inline";

//     console.log(`Fetching data for: ${buildingId}`);

//     // Fetch the building data once
//     const buildingData = await fetchBuildingData(buildingId);
//     if (!buildingData) {
//         console.error("No data available for this building.");
//         return;
//     }

//     // Use the fetched data
//     createSlideshow(buildingData.imgs); // Pass imgs array for slideshow
//     displayBuildingData(buildingData); // Pass the whole object for info display
// }

async function handleBuildingClick(buildingId, lvl = null) {
  dataDiv.style.display = "inline";

  console.log(`Fetching data for: ${buildingId}, Level: ${lvl}`);

  // Fetch the building data once
  const buildingData = await fetchBuildingData(buildingId);
  if (!buildingData) {
    console.error("No data available for this building.");
    return;
  }

  // Use the fetched data
  createSlideshow(buildingData.imgs); // Pass imgs array for slideshow
  displayBuildingData(buildingData, lvl); // Pass lvl to preselect dropdown
}

// Handle clicks on search results
searchResults.addEventListener("click", async (event) => {
  const clickedElement = event.target;
  if (clickedElement.classList.contains("result")) {
    const buildingId = clickedElement.getAttribute("data-read");
    const buildingIdLvl = clickedElement.getAttribute("data-read-lvl");

    dataDivTitle.innerHTML = event.target.innerHTML;
    await handleBuildingClick(buildingId, buildingIdLvl);

    // Close search bar and results
    searchContainer.style.display = "none";
    searchInput.value = ""; // Clear the search input
    searchResults.innerHTML = ""; // Clear the search results
  }
});

// Handle clicks on suggestion buttons
document.addEventListener("click", async (event) => {
  const clickedElement = event.target;
  if (clickedElement.classList.contains("suggestion")) {
    dataDivTitle.innerHTML = event.target.innerHTML;
    const buildingId = clickedElement.getAttribute("data-read");
    const buildingIdLvl = clickedElement.getAttribute("data-read-lvl");
    await handleBuildingClick(buildingId, buildingIdLvl);
  }
});

suggestionBtn.addEventListener("click", async (event) => {
  const clickedElement = event.target;
  if (clickedElement.classList.contains("result")) {
    dataDiv.style.display = "inline";
    const buildingId = clickedElement.getAttribute("data-read");
    console.log(`Fetching data for: ${buildingId}`);

    // Fetch the building data once
    const buildingData = await fetchBuildingData(buildingId);
    if (!buildingData) {
      console.error("No data available for this building.");
      return;
    }

    // Use the fetched data
    createSlideshow(buildingData.imgs); // Pass imgs array for slideshow
    displayBuildingData(buildingData); // Pass the whole object for info display

    // Close search bar and results
    searchContainer.style.display = "none";
    searchInput.value = ""; // Clear the search input
    searchResults.innerHTML = ""; // Clear the search results
  }
});

function displayBuildingData(buildingData, preselectedLvl = null) {
  if (!buildingData) {
    console.error("No building data to display.");
    return;
  }

  const dataDiv = document.getElementById("data-info-div");
  let htmlContent = "";

  //   if (buildingData.Name) {
  //     htmlContent += `<strong>In Building: </strong${buildingData.Name}><value id = level-html></value><br><br>`;
  //     // htmlContent += `<strong>In Building: </strong>${buildingData.Name} Level: ${selected}<br><br>`;
  //   }

  if (buildingData.Name) {
    htmlContent += `<strong>In Building: </strong> ${buildingData.Name} 
                    <span id="level-html"></span><br><br>`;
  }
  if (buildingData.Area) {
    htmlContent += `<strong>Area: </strong>${buildingData.Area}<br><br>`;
  }
  if (buildingData.History) {
    htmlContent += `<strong>History: </strong>${buildingData.History}<br><br>`;
  }
  if (buildingData.Description) {
    htmlContent += `<strong>Description: </strong>${buildingData.Description}<br><br>`;
  }
  if (buildingData.YOC) {
    htmlContent += `<strong>Year Of Completion: </strong>${buildingData.YOC}<br><br>`;
  }
  if (buildingData.Occupancy) {
    htmlContent += `<strong>Occupancy: </strong>${buildingData.Occupancy}<br><br>`;
  }

  if (buildingData.FL && buildingData.LL) {
    htmlContent += `<strong>Levels: </strong>${buildingData.FL} → ${buildingData.LL}<br><br>`;
  }

  if (buildingData.reserveLink) {
    htmlContent += `<strong>Reserve Study Room: </strong><a class="reserve-link" href = ${buildingData.reserveLink}> Click here to reserve!</a><br><br>`;
  }

  if (buildingData.FL && buildingData.LL) {
    const firstLevel = parseInt(buildingData.FL, 10);
    const lastLevel = parseInt(buildingData.LL, 10);

    if (!isNaN(firstLevel) && !isNaN(lastLevel) && firstLevel <= lastLevel) {
      htmlContent += `<strong class="dest-level">Destination Level: </strong>
            <select id="levelDropdown">`;

      // Generate dropdown options
      for (let level = firstLevel; level <= lastLevel; level++) {
        const selected = level === parseInt(preselectedLvl) ? "selected" : "";
        htmlContent += `<option value="${level}" ${selected}>${level}</option>`;
      }

      htmlContent += `</select><br><br>`;
    }
  }

  //   dataDiv.innerHTML = htmlContent; // Render to DOM
  setTimeout(() => {
    const levelHtml = document.getElementById("level-html");
    if (levelHtml && preselectedLvl != "undefined") {
      levelHtml.innerHTML = preselectedLvl
        ? `<br><br><strong>Level:</strong> ${preselectedLvl}`
        : "";
    } else {
      console.error("Failed to find #level-html in DOM");
    }
  }, 0);

  if (buildingData.DOF) {
    htmlContent += `<iframe id="iframeDetails" class="DOF-iframe" src="${buildingData.DOF}" width="640" height="480"
        allow="autoplay"></iframe>`;
  }

  
  dataDiv.innerHTML = htmlContent;

  
const iframe = document.getElementById("iframeDetails");
detailsBtn.addEventListener("click", () => {
  if (iframe.style.display === "none" || iframe.style.display === "") {
      iframe.style.display = "block";
      arrowIcon.classList.remove("fa-arrow-down");
      arrowIcon.classList.add("fa-arrow-up");
  } else {
      iframe.style.display = "none";
      arrowIcon.classList.remove("fa-arrow-up");
      arrowIcon.classList.add("fa-arrow-down");
  }
});

const toOfficeBtn = document.getElementById("toOfficeBtn");
toOfficeBtn.addEventListener("click", function () {
  window.location.href = "offices.html";
});


  // Optional: Add an event listener to the dropdown
  const levelDropdown = document.getElementById("levelDropdown");
  if (levelDropdown) {
    levelDropdown.addEventListener("change", (event) => {
      console.log("Selected Level:", event.target.value);
      // navigateFromData.innerHTML = "Take me to level " + event.target.value;
    });
  }

  const navigateFromData = document.getElementById("navigateFromData");

  // Replace the button to remove all previous event listeners
  const newNavigateFromData = navigateFromData.cloneNode(true);
  navigateFromData.parentNode.replaceChild(
    newNavigateFromData,
    navigateFromData
  );

  // Add the event listener to the new button
  newNavigateFromData.addEventListener("click", function () {
    arr[0] =
      buildingData.Name +
      " - Floor " +
      document.getElementById("levelDropdown").value;
    // console.log(
    //   buildingData.Name +
    //     " - Floor " +
    //     document.getElementById("levelDropdown").value
    // );
    currentLocationDiv.style.display = "inline";
  });
}
function createSlideshow(imgLinks) {
  if (!imgLinks || imgLinks.length === 0) {
    console.error("No images to display in slideshow.");
    return;
  }

  const imgElement = document.getElementById("slideshow-image");

  // Clear any previous slideshow interval
  if (slideshowInterval) {
    clearInterval(slideshowInterval);
  }

  // Reset the slideshow state
  imgElement.src = ""; // Clear the current image
  imgElement.style.opacity = 0;

  let currentIndex = 0;

  // Set the first image with a fade-in effect
  imgElement.src = imgLinks[currentIndex];
  imgElement.style.opacity = 1;

  // Start a new interval for the slideshow
  slideshowInterval = setInterval(() => {
    imgElement.style.opacity = 0; // Fade out the current image

    setTimeout(() => {
      // Change the image after fade-out
      currentIndex = (currentIndex + 1) % imgLinks.length;
      imgElement.src = imgLinks[currentIndex];

      // Fade in the new image
      imgElement.style.opacity = 1;
    }, 1500); // Match the fade-out duration (1s)
  }, 4000); // 3s display + 1s fade
}

const currentLocationInput = document.getElementById("currentLocationInput");
const currentLocationResults = document.getElementById(
  "currentLocationResults"
);
const currentLocationClose = document.getElementById("currentLocationClose");

// Function to render search results for current location
function renderCurrentLocationResults(results) {
  currentLocationResults.innerHTML = ""; // Clear old results
  results.forEach((location) => {
    const div = document.createElement("div");
    div.className = "current-location-result";
    // div.className = "result";
    div.textContent = location.name;
    div.setAttribute("data-read", location.id); // Add location ID
    div.setAttribute("data-read-lvl", location.lvl || ""); // Add optional level
    currentLocationResults.appendChild(div);
  });
}

// Handle input in current location search
currentLocationInput.addEventListener("input", () => {
  const query = currentLocationInput.value.toLowerCase();
  const filteredLocations = locations.filter((location) =>
    location.name.toLowerCase().includes(query)
  );
  renderCurrentLocationResults(filteredLocations);
});

// Handle closing the search results
currentLocationClose.addEventListener("click", () => {
  currentLocationDiv.style.display = "none";
  currentLocationInput.value = "";
});

// // Handle selecting a location from the search results
// currentLocationResults.addEventListener("click", async (event) => {
//   const clickedElement = event.target;

//   if (clickedElement.classList.contains("current-location-result")) {
//     const buildingId = clickedElement.getAttribute("data-read");
//     const buildingIdLvl = clickedElement.getAttribute("data-read-lvl");
//     arr[1] = `Current Location Selected: ${buildingId}, Level: ${
//       buildingIdLvl || buildingData.FL
//     }`;

//     // Display the selected current location in the input field
//     currentLocationInput.value = clickedElement.textContent;
//     console.log(arr);

//     // Close search results
//     currentLocationResults.innerHTML = "";
//     currentLocationDiv.style.display = "none";
//   }
// });

currentLocationResults.addEventListener("click", async (event) => {
  const clickedElement = event.target;

  if (clickedElement.classList.contains("current-location-result")) {
    const buildingId = clickedElement.getAttribute("data-read");
    const buildingIdLvl = clickedElement.getAttribute("data-read-lvl");

    // If buildingIdLvl is not provided, fetch buildingData
    let level = buildingIdLvl;
    if (!level) {
      const buildingData = await fetchBuildingData(buildingId);
      level = buildingData ? buildingData.FL : "N/A";
    }

    // Update the array with the current location
    arr[1] = `Current Location Selected: ${buildingId}, Level: ${level}`;

    console.log(arr);

    // Display the selected current location in the input field
    currentLocationInput.value = clickedElement.textContent;

    // Close search results
    currentLocationResults.innerHTML = "";
    currentLocationDiv.style.display = "none";
  }
});
const detailsBtn = document.getElementById("detailsBtn");
const buildingDetails = document.getElementById("buildingDetails");

const arrowIcon = document.getElementById("arrowIcon");
// detailsBtn.addEventListener("click", function () {
//   // Check if the details are currently displayed
//   if (
//     buildingDetails.style.display === "none" ||
//     buildingDetails.style.display === ""
//   ) {
//     // Show the details
//     detailsBtn.innerHTML = `Details <i class="fa fa-arrow-up" aria-hidden="true"></i>`;
//     buildingDetails.style.display = "inline";
//   } else {
//     // Hide the details
//     detailsBtn.innerHTML = `Details <i class="fa fa-arrow-down" aria-hidden="true"></i>`;
//     buildingDetails.style.display = "none";
//   }
// });

