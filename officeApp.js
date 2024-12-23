import { auth, db } from "./firebase-config.js";
import {
  collection,
  getDocs,
  setDoc,
} from "https://www.gstatic.com/firebasejs/9.16.0/firebase-firestore.js";

const loadingScreen = document.getElementById("loadingScreen");

function showLoader() {
  loadingScreen.style.display = "flex";
}

function hideLoader() {
  loadingScreen.style.display = "none";
}

function showTickAnimation(duration = 2000) {
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

async function populateBuildingDropdown() {
  const buildingDropdown = document.getElementById("buildingDropdown");
  buildingDropdown.innerHTML =
    '<option value="" disabled selected>Select a building</option>'; // Clear previous options

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
        option.value = buildingData.Name; // Use the building Name as the value
        option.textContent = buildingData.Name; // Display the building name
        buildingDropdown.appendChild(option);
      }
    });
  } catch (error) {
    console.error("Error fetching buildings:", error);
    alert("Failed to load buildings. Please try again later.");
  }
}

// // Function to fetch and render professors' office information
// async function renderOffices() {
//   const officesContainer = document.getElementById("officesContainer"); // Ensure this element exists in your HTML

//   try {
//     showLoader();

//     const officesRef = collection(db, "offices"); // Reference to "offices" collection

//     const snapshot = await getDocs(officesRef); // Fetch the data

//     const dayOrder = [
//       "Monday",
//       "Tuesday",
//       "Wednesday",
//       "Thursday",
//       "Friday",
//       "Saturday",
//       "Sunday",
//     ]; // Define the correct order of days

//     snapshot.forEach((doc) => {
//       const data = doc.data();

//       // Create the main office container
//       const officeDiv = document.createElement("div");
//       officeDiv.classList.add("office_container");

//       // Title with professor's name
//       const title = document.createElement("h2");
//       title.classList.add("office_container_title");
//       title.textContent = `Dr. ${data.name}`;
//       officeDiv.appendChild(title);

//       // Create table for day and time
//       const table = document.createElement("table");

//       // Table header
//       const thead = document.createElement("thead");
//       thead.innerHTML = `
//                 <tr>
//                     <th>Day</th>
//                     <th>Time</th>
//                 </tr>
//             `;
//       table.appendChild(thead);

//       // Table body with day-time data
//       const tbody = document.createElement("tbody");

//       // Sort the days based on the predefined dayOrder array
//       dayOrder.forEach((day) => {
//         if (data.DNT[day]) {
//           const time = data.DNT[day];
//           // Add rows only if there is a time value
//           if (time) {
//             const tr = document.createElement("tr");
//             tr.innerHTML = `
//                         <td>${day}</td>
//                         <td>${time}</td>
//                     `;
//             tbody.appendChild(tr);
//           }
//         }
//       });

//       table.appendChild(tbody);
//       officeDiv.appendChild(table);

//       // Building and room info
//       const buildingInfo = document.createElement("p");
//       buildingInfo.innerHTML = `<span class="office_container_semi_title">Building:</span> ${data.building} ${data.room}`;
//       officeDiv.appendChild(buildingInfo);

//       // In Office status
//       const inOfficeStatus = document.createElement("p");
//       inOfficeStatus.innerHTML = `
//                 <span class="office_container_semi_title">In Office:</span>
//                 <i class="${
//                   data.inOffice
//                     ? "available fa fa-check"
//                     : "unavailable fa fa-times"
//                 }" aria-hidden="true"></i>
//             `;
//       officeDiv.appendChild(inOfficeStatus);

//       // Available status
//       const availabilityStatus = document.createElement("p");
//       availabilityStatus.innerHTML = `
//                 <span class="office_container_semi_title">Available:</span>
//                 <i class="${
//                   data.available
//                     ? "available fa fa-check"
//                     : "unavailable fa fa-times"
//                 }" aria-hidden="true"></i>
//             `;
//       officeDiv.appendChild(availabilityStatus);

//       // Email info
//       const emailInfo = document.createElement("p");
//       emailInfo.innerHTML = `<span class="office_container_semi_title">E-Mail:</span> ${data.email}`;
//       officeDiv.appendChild(emailInfo);

//       // Append the complete officeDiv to the container
//       officesContainer.appendChild(officeDiv);
//       hideLoader();
//       populateBuildingDropdown();
//     });
//   } catch (error) {
//     hideLoader();
//     console.error("Error fetching offices data:", error);
//   }
// }
import { onSnapshot } from "https://www.gstatic.com/firebasejs/9.16.0/firebase-firestore.js";

async function renderOffices() {
  const officesContainer = document.getElementById("officesContainer"); // Ensure this element exists in your HTML

  try {
    showLoader();

    const officesRef = collection(db, "offices"); // Reference to "offices" collection

    // Listen for real-time updates
    onSnapshot(officesRef, (snapshot) => {
      officesContainer.innerHTML = ""; // Clear the container before re-rendering

      const dayOrder = [
        "Monday",
        "Tuesday",
        "Wednesday",
        "Thursday",
        "Friday",
        "Saturday",
        "Sunday",
      ]; // Define the correct order of days

      snapshot.forEach((doc) => {
        const data = doc.data();

        // Create the main office container
        const officeDiv = document.createElement("div");
        officeDiv.classList.add("office_container");

        // Title with professor's name
        const title = document.createElement("h2");
        title.classList.add("office_container_title");
        title.textContent = `Dr. ${data.name}`;
        officeDiv.appendChild(title);

        // Create table for day and time
        const table = document.createElement("table");

        // Table header
        const thead = document.createElement("thead");
        thead.innerHTML = `
                  <tr>
                      <th>Day</th>
                      <th>Time</th>
                  </tr>
              `;
        table.appendChild(thead);

        // Table body with day-time data
        const tbody = document.createElement("tbody");

        // Sort the days based on the predefined dayOrder array
        dayOrder.forEach((day) => {
          if (data.DNT[day]) {
            const time = data.DNT[day];
            // Add rows only if there is a time value
            if (time) {
              const tr = document.createElement("tr");
              tr.innerHTML = `
                          <td>${day}</td>
                          <td>${time}</td>
                      `;
              tbody.appendChild(tr);
            }
          }
        });

        table.appendChild(tbody);
        officeDiv.appendChild(table);

        // Building and room info
        const buildingInfo = document.createElement("p");
        // buildingInfo.innerHTML = `<span class="office_container_semi_title">Building:</span> ${data.building} ${data.room}`;
        buildingInfo.innerHTML = `
  <span class="office_container_semi_title">Building:</span>
  <a href="home.html?building=${encodeURIComponent(
    data.building
  )}" class="building-link">${data.building}</a> ${data.room}
`;

        officeDiv.appendChild(buildingInfo);

        // In Office status
        const inOfficeStatus = document.createElement("p");
        inOfficeStatus.innerHTML = `
                  <span class="office_container_semi_title">In Office:</span> 
                  <i class="${
                    data.inOffice
                      ? "available fa fa-check"
                      : "unavailable fa fa-times"
                  }" aria-hidden="true"></i>
              `;
        officeDiv.appendChild(inOfficeStatus);

        // Available status
        const availabilityStatus = document.createElement("p");
        availabilityStatus.innerHTML = `
                  <span class="office_container_semi_title">Available:</span> 
                  <i class="${
                    data.available
                      ? "available fa fa-check"
                      : "unavailable fa fa-times"
                  }" aria-hidden="true"></i>
              `;
        officeDiv.appendChild(availabilityStatus);

        // Email info
        const emailInfo = document.createElement("p");
        emailInfo.innerHTML = `<span class="office_container_semi_title">E-Mail:</span> ${data.email}`;
        officeDiv.appendChild(emailInfo);

        // Append the complete officeDiv to the container
        officesContainer.appendChild(officeDiv);
      });

      hideLoader();
      populateBuildingDropdown();
    });
  } catch (error) {
    hideLoader();
    console.error("Error fetching offices data:", error);
  }
}

// Call the render function on page load
renderOffices();

// ========

import { getAuth } from "https://www.gstatic.com/firebasejs/9.16.0/firebase-auth.js";

// const auth = getAuth();
auth.onAuthStateChanged(async (user) => {
  if (user) {
    const email = user.email;
    const editBtn = document.getElementById("editBtn");
    if (email.endsWith("@lau.edu")) {
      // Show edit button for professors
      editBtn.style.display = "block";
    } else {
      // Hide edit button for students
      editBtn.style.display = "none";
    }
  }

  if (user) {
    const email = user.email;
    const editBtn = document.getElementById("editBtn");
    const createBtn = document.getElementById("createBtn");

    try {
      const docRef = doc(db, "offices", email);
      const docSnap = await getDoc(docRef);

      // OLD: if (email.endsWith("@lau.edu.lb") || email == "karim.tello@lau.edu") {
      if (email.endsWith("@lau.edu.lb")) {
        if (docSnap.exists()) {
          editBtn.style.display = "block";
          createBtn.style.display = "none";
        } else {
          editBtn.style.display = "none";
          createBtn.style.display = "block";
        }
      } else {
        editBtn.style.display = "none";
        createBtn.style.display = "none";
      }
    } catch (error) {
      console.error("Error checking Firestore document:", error);
      editBtn.style.display = "none";
    }
  } else {
    console.log("No user is signed in.");
  }
});

// Open Modal
document.getElementById("editBtn").addEventListener("click", () => {
  document.getElementById("editModal").style.display = "block";
  document.getElementById("editBtn").style.display = "none";

  // Fetch and populate current data
  fetchProfessorData();
});
showLoader();

document.getElementById("editClose").addEventListener("click", () => {
  document.getElementById("editModal").style.display = "none";
  document.getElementById("editBtn").style.display = "block";
  location.reload();
});

// Close Modal
function closeModal() {
  document.getElementById("editModal").style.display = "none";
}

import {
  doc,
  getDoc,
} from "https://www.gstatic.com/firebasejs/9.16.0/firebase-firestore.js";

async function fetchProfessorData() {
  const user = auth.currentUser;
  const email = user.email;
  const docRef = doc(db, "offices", email);
  const docSnap = await getDoc(docRef);

  if (docSnap.exists()) {
    const data = docSnap.data();
    document.getElementById("buildingDropdown").value = data.building;
    document.getElementById("roomInput").value = data.room;

    // Update In Office buttons
    if (data.inOffice) {
      document.getElementById("inOfficeYes").classList.remove("unselectedFa");
      document.getElementById("inOfficeNo").classList.add("unselectedFa");
    } else {
      document.getElementById("inOfficeNo").classList.remove("unselectedFa");
      document.getElementById("inOfficeYes").classList.add("unselectedFa");
    }

    // Update Available buttons
    if (data.available) {
      document.getElementById("availableYes").classList.remove("unselectedFa");
      document.getElementById("availableNo").classList.add("unselectedFa");
    } else {
      document.getElementById("availableNo").classList.remove("unselectedFa");
      document.getElementById("availableYes").classList.add("unselectedFa");
    }

    // Populate days and times
    Object.entries(data.DNT).forEach(([day, time]) => {
      const dayButton = document.querySelector(`button[data-day="${day}"]`);
      if (dayButton) {
        dayButton.classList.add("selected");
        addTimeInput(day, time);
      }
    });
  }
}

// Add Time Input for Selected Days
function addTimeInput(day, time = "") {
  const container = document.getElementById("timeInputs");
  const div = document.createElement("div");
  const existingInput = container.querySelector(`input[data-day="${day}"]`);
  if (existingInput) {
    // If the day already exists, update its value
    existingInput.value = time;
    return;
  }

  div.setAttribute("data-day-container", day);
  div.innerHTML = `
    <label>${day}:</label>
    <input type="text" data-day="${day}" value="${time}" placeholder="e.g., 9:00 AM - 5:00 PM" />
  `;
  container.appendChild(div);
  const dayOrder = [
    "Monday",
    "Tuesday",
    "Wednesday",
    "Thursday",
    "Friday",
    "Saturday",
    "Sunday",
  ];

  const divs = Array.from(container.children); // Get all current divs
  divs.sort((a, b) => {
    const dayA = a.getAttribute("data-day-container");
    const dayB = b.getAttribute("data-day-container");
    return dayOrder.indexOf(dayA) - dayOrder.indexOf(dayB);
  });

  // Clear the container and reappend divs in the correct order
  container.innerHTML = "";
  divs.forEach((div) => container.appendChild(div));
}

// Handle Day Selection
document.getElementById("daysContainer").addEventListener("click", (e) => {
  const button = e.target;
  if (button.tagName === "BUTTON") {
    const day = button.dataset.day;
    button.classList.toggle("selected");

    if (button.classList.contains("selected")) {
      addTimeInput(day);
    } else {
      // Remove time input for deselected day
      document.querySelector(`input[data-day="${day}"]`).parentElement.remove();
    }
  }
});

import { updateDoc } from "https://www.gstatic.com/firebasejs/9.16.0/firebase-firestore.js";

document.getElementById("inOfficeYes").addEventListener("click", () => {
  document.getElementById("inOfficeYes").classList.remove("unselectedFa");
  document.getElementById("inOfficeNo").classList.add("unselectedFa");
});

document.getElementById("inOfficeNo").addEventListener("click", () => {
  document.getElementById("inOfficeNo").classList.remove("unselectedFa");
  document.getElementById("inOfficeYes").classList.add("unselectedFa");
});

document.getElementById("availableYes").addEventListener("click", () => {
  document.getElementById("availableYes").classList.remove("unselectedFa");
  document.getElementById("availableNo").classList.add("unselectedFa");
});

document.getElementById("availableNo").addEventListener("click", () => {
  document.getElementById("availableNo").classList.remove("unselectedFa");
  document.getElementById("availableYes").classList.add("unselectedFa");
});

document.getElementById("saveBtn").addEventListener("click", async () => {
  const user = auth.currentUser;
  const email = user.email;

  const building = document.getElementById("buildingDropdown").value;
  const room = document.getElementById("roomInput").value;

  // Determine In Office value
  const inOffice = document
    .getElementById("inOfficeNo")
    .classList.contains("unselectedFa");

  // Determine Available value
  const available = document
    .getElementById("availableNo")
    .classList.contains("unselectedFa");

  // Gather day and time data
  const days = {};
  document.querySelectorAll("#timeInputs input").forEach((input) => {
    const day = input.dataset.day;
    const time = input.value;
    days[day] = time;
  });

  // Update Firestore document
  try {
    console.log("office: " + inOffice);
    console.log("available: " + available);
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
  } catch (error) {
    console.error("Error updating office hours:", error);
    alert("Failed to update office hours.");
  }
});

document.getElementById("searchInput").addEventListener("input", function () {
  const searchValue = this.value.toLowerCase(); // Get the value entered by the user
  const officeContainers = document.querySelectorAll(".office_container"); // Get all professor divs

  officeContainers.forEach((container) => {
    const name = container
      .querySelector(".office_container_title")
      .textContent.toLowerCase(); // Get the professor's name
    if (name.includes(searchValue)) {
      container.style.display = "block"; // Show if the name matches
    } else {
      container.style.display = "none"; // Hide if the name does not match
    }
  });
});

document.getElementById("createBtn").addEventListener("click", async () => {
  try {
    const user = auth.currentUser;
    if (!user) {
      throw new Error("User not authenticated");
    } else {
      const email = user.email;
      const nameParts = email
        .split("@")[0] // Get the part before "@"
        .split(".") // Split by "."
        .map((part) => part.charAt(0).toUpperCase() + part.slice(1)); // Capitalize each part

      const fullName = nameParts.join(" "); // Combine first and last names

      const officeDocRef = doc(db, "offices", email); // Document reference with email as the ID
      console.log(db);
      console.log("office");
      console.log(email);

      // Create the document
      await setDoc(officeDocRef, {
        DNT: {}, // Empty map for DNT
        available: false, // Set to false
        inOffice: false, // Set to false
        email: email, // Use the user's email
        name: fullName, // Generated full name
        room: "", // Empty string for room
      });

      showTickAnimation();
      location.reload();
    }
  } catch (error) {
    console.error("Error creating office document:", error);
    alert("Failed to create office document. Please try again later.");
  }
});
