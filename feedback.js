// document.querySelectorAll('.star').forEach(star => {
//     star.addEventListener('click', function () {
//       const value = this.getAttribute('data-value');
//       document.querySelectorAll('.star').forEach(s => {
//         s.classList.toggle('filled', s.getAttribute('data-value') <= value);
//       });
//     });
//   });
// Import Firestore and Authentication from Firebase
import { auth, db } from "./netlify/functions/firebase-config.js";
import {
  collection,
  addDoc,
} from "https://www.gstatic.com/firebasejs/9.16.0/firebase-firestore.js";

document.addEventListener("DOMContentLoaded", () => {
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

  let selectedStars = 0;

  // Handle star selection
  document.querySelectorAll(".star").forEach((star) => {
    star.addEventListener("click", function () {
      selectedStars = parseInt(this.getAttribute("data-value")); // Update the selected star count
      document.querySelectorAll(".star").forEach((s) => {
        s.classList.toggle(
          "filled",
          s.getAttribute("data-value") <= selectedStars
        );
      });
    });
  });

  // Handle form submission
  const submitBtn = document.querySelector(".submit-btn");
  submitBtn.addEventListener("click", async () => {
    if (selectedStars === 0) {
      alert("Please select a star rating.");
      return;
    }

    const feedbackNotes =
      document.querySelector(".feedback-notes").value ||
      "No additional notes provided.";

    // Get the authenticated user's email
    const user = auth.currentUser;

    const email = user.email;

    // Prepare feedback data
    const feedbackData = {
      email,
      stars: selectedStars,
      notes: feedbackNotes,
      timestamp: new Date(), // Optional: Add a timestamp
    };

    try {
      // Save feedback to Firestore
      await addDoc(collection(db, "feedback"), feedbackData);
      showTickAnimation();

      // Reset form after successful submission
      document
        .querySelectorAll(".star")
        .forEach((s) => s.classList.remove("filled"));
      document.querySelector(".feedback-notes").value = "";
      selectedStars = 0;
    } catch (error) {
      console.error("Error submitting feedback:", error);
      alert("Failed to submit feedback. Please try again later.");
    }
  });
});
