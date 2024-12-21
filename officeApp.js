// Import necessary Firebase modules
import { auth, db } from "./firebase-config.js";
import {
  collection,
  getDocs,
  doc,
  getDoc,
  updateDoc,
} from "https://www.gstatic.com/firebasejs/9.16.0/firebase-firestore.js";

function showTickAnimation(duration = 700) {
  const tickAnimationContainer = document.getElementById(
    "tickAnimationContainer"
  );

  // Ensure the tick animation container exists
  if (!tickAnimationContainer) {
    console.error("Tick animation container not found!");
    return;
  }

  // Show the container and trigger the animation
  tickAnimationContainer.style.display = "flex";

  // Automatically hide the animation after the specified duration
  setTimeout(() => {
    tickAnimationContainer.style.display = "none";
  }, duration);
}

function closeModal() {
  document.getElementById("editModal").style.display = "none";
}

// DOM Elements
const loadingScreen = document.getElementById("loadingScreen");
const editModal = document.getElementById("editModal");
const editBtn = document.getElementById("editBtn");
const searchInput = document.getElementById("searchInput");
const officesContainer = document.getElementById("officesContainer");
const daysContainer = document.getElementById("daysContainer");
const timeInputsContainer = document.getElementById("timeInputs");

// Predefined day order for sorting
const dayOrder = [
  "Monday",
  "Tuesday",
  "Wednesday",
  "Thursday",
  "Friday",
  "Saturday",
  "Sunday",
];

// Loader Functions
function showLoader() {
  loadingScreen.style.display = "flex";
}

function hideLoader() {
  loadingScreen.style.display = "none";
}

// Populate Building Dropdown
async function populateBuildingDropdown() {
  const buildingDropdown = document.getElementById("buildingDropdown");
  buildingDropdown.innerHTML =
    '<option value="" disabled selected>Select a building</option>';

  try {
    const buildingsRef = collection(db, "buildings");
    const snapshot = await getDocs(buildingsRef);

    snapshot.forEach((doc) => {
      const buildingData = doc.data();
      if (
        !Array.from(buildingDropdown.options).some(
          (option) => option.value === buildingData.Name
        )
      ) {
        const option = document.createElement("option");
        option.value = buildingData.Name;
        option.textContent = buildingData.Name;
        buildingDropdown.appendChild(option);
      }
    });
  } catch (error) {
    console.error("Error fetching buildings:", error);
    alert("Failed to load buildings.");
  }
}

// Render Offices
async function renderOffices() {
  try {
    showLoader();
    const officesRef = collection(db, "offices");
    const snapshot = await getDocs(officesRef);

    officesContainer.innerHTML = ""; // Clear container

    snapshot.forEach((doc) => {
      const data = doc.data();

      const officeDiv = document.createElement("div");
      officeDiv.classList.add("office_container");

      // Add title
      const title = document.createElement("h2");
      title.classList.add("office_container_title");
      title.textContent = `Dr. ${data.name}`;
      officeDiv.appendChild(title);

      // Add table
      const table = document.createElement("table");
      const thead = document.createElement("thead");
      thead.innerHTML = `
        <tr>
          <th>Day</th>
          <th>Time</th>
        </tr>`;
      table.appendChild(thead);

      const tbody = document.createElement("tbody");
      dayOrder.forEach((day) => {
        if (data.DNT[day]) {
          const time = data.DNT[day];
          const tr = document.createElement("tr");
          tr.innerHTML = `<td>${day}</td><td>${time}</td>`;
          tbody.appendChild(tr);
        }
      });
      table.appendChild(tbody);
      officeDiv.appendChild(table);

      // Building info
      const buildingInfo = document.createElement("p");
      buildingInfo.innerHTML = `<span class="office_container_semi_title">Building:</span> ${data.building} ${data.room}`;
      officeDiv.appendChild(buildingInfo);

      // In Office Status
      const inOfficeStatus = document.createElement("p");
      inOfficeStatus.innerHTML = `
        <span class="office_container_semi_title">In Office:</span> 
        <i class="${
          data.inOffice ? "available fa fa-check" : "unavailable fa fa-times"
        }" aria-hidden="true"></i>`;
      officeDiv.appendChild(inOfficeStatus);

      // Availability Status
      const availabilityStatus = document.createElement("p");
      availabilityStatus.innerHTML = `
        <span class="office_container_semi_title">Available:</span> 
        <i class="${
          data.available ? "available fa fa-check" : "unavailable fa fa-times"
        }" aria-hidden="true"></i>`;
      officeDiv.appendChild(availabilityStatus);

      // Email info
      const emailInfo = document.createElement("p");
      emailInfo.innerHTML = `<span class="office_container_semi_title">E-Mail:</span> ${data.email}`;
      officeDiv.appendChild(emailInfo);

      officesContainer.appendChild(officeDiv);
    });

    hideLoader();
  } catch (error) {
    console.error("Error fetching offices:", error);
    hideLoader();
    alert("Failed to load offices.");
  }
}

// Fetch and Populate Professor Data in Edit Modal
async function fetchProfessorData() {
  const user = auth.currentUser;
  const email = user.email;
  const docRef = doc(db, "offices", email);
  const docSnap = await getDoc(docRef);

  if (docSnap.exists()) {
    const data = docSnap.data();

    document.getElementById("buildingDropdown").value = data.building;
    document.getElementById("roomInput").value = data.room;

    // In Office
    if (data.inOffice) {
      document.getElementById("inOfficeYes").classList.remove("unselectedFa");
      document.getElementById("inOfficeNo").classList.add("unselectedFa");
    } else {
      document.getElementById("inOfficeNo").classList.remove("unselectedFa");
      document.getElementById("inOfficeYes").classList.add("unselectedFa");
    }

    // Available
    if (data.available) {
      document.getElementById("availableYes").classList.remove("unselectedFa");
      document.getElementById("availableNo").classList.add("unselectedFa");
    } else {
      document.getElementById("availableNo").classList.remove("unselectedFa");
      document.getElementById("availableYes").classList.add("unselectedFa");
    }

    // Populate days and times
    data.DNT &&
      Object.entries(data.DNT).forEach(([day, time]) => {
        const dayButton = document.querySelector(`button[data-day="${day}"]`);
        if (dayButton) {
          dayButton.classList.add("selected");
          addTimeInput(day, time);
        }
      });
  }
}

// Add Time Input for Days
function addTimeInput(day, time = "") {
  const div = document.createElement("div");
  div.innerHTML = `
    <label>${day}:</label>
    <input type="text" data-day="${day}" value="${time}" placeholder="e.g., 9:00 AM - 5:00 PM" />
  `;
  timeInputsContainer.appendChild(div);
}

// Save Updated Data
document.getElementById("saveBtn").addEventListener("click", async () => {
  const user = auth.currentUser;
  const email = user.email;

  const building = document.getElementById("buildingDropdown").value;
  const room = document.getElementById("roomInput").value;

  const inOffice = document
    .getElementById("inOfficeNo")
    .classList.contains("unselectedFa");

  const available = document
    .getElementById("availableNo")
    .classList.contains("unselectedFa");

  const days = {};
  document.querySelectorAll("#timeInputs input").forEach((input) => {
    days[input.dataset.day] = input.value;
  });

  try {
    await updateDoc(doc(db, "offices", email), {
      building,
      room,
      inOffice,
      available,
      DNT: days,
    });
    showTickAnimation();
    closeModal();
    editBtn.style.display = "block";
    renderOffices();
  } catch (error) {
    console.error("Error updating office hours:", error);
    alert("Failed to update office hours.");
  }
});

// Authentication State and Edit Button Logic
auth.onAuthStateChanged((user) => {
  if (user) {
    const email = user.email;
    if (email.endsWith("@lau.edu")) {
      editBtn.style.display = "block";
    }
  }
});

// Open Modal
editBtn.addEventListener("click", () => {
  editModal.style.display = "block";
  editBtn.style.display = "none";
  fetchProfessorData();
});

// Close Modal
document.getElementById("editClose").addEventListener("click", () => {
  editModal.style.display = "none";
  editBtn.style.display = "block";
  location.reload();
});

// Search Functionality
searchInput.addEventListener("input", () => {
  const searchValue = searchInput.value.toLowerCase();
  const officeContainers = document.querySelectorAll(".office_container");

  officeContainers.forEach((container) => {
    const name = container
      .querySelector(".office_container_title")
      .textContent.toLowerCase();
    container.style.display = name.includes(searchValue) ? "block" : "none";
  });
});

// Initialize
showLoader();
renderOffices();
populateBuildingDropdown();
