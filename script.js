// Replace with your actual API Key and Form ID
const API_KEY = "9b90ee03c0f019823c2daed6aca8e133";
const FORM_ID = "25056657714215";
const STUDENT_ID_FIELD = "syracuseUniversity4"; // Unique Name

async function fetchExistingStudentIDs() {
    let url = `https://api.jotform.com/form/${FORM_ID}/submissions?apikey=${API_KEY}`;

    try {
        let response = await fetch(url);
        let data = await response.json();

        console.log("API Response:", data); // Debugging log

        if (data.content) {
            let studentIDs = data.content.map(submission => {
                // Convert answers object to array and find the Student ID field
                let answersArray = Object.values(submission.answers);
                let studentField = answersArray.find(ans => ans.name === STUDENT_ID_FIELD);
                return studentField ? studentField.answer : null;
            }).filter(id => id); // Remove null values

            console.log("Fetched Student IDs:", studentIDs);
            return studentIDs;
        } else {
            console.warn("No submissions found.");
            return [];
        }
    } catch (error) {
        console.error("Error fetching student IDs:", error);
        return [];
    }
}

// ✅ Validate Student ID without accessing iFrame directly
document.addEventListener("DOMContentLoaded", async function () {
    console.log("Page loaded...");

    let studentIDs = await fetchExistingStudentIDs();

    let studentInput = document.getElementById("student-id-input"); // Replace with actual input field in your HTML

    if (studentInput) {
        console.log("Student ID input detected:", studentInput);

        studentInput.addEventListener("blur", function () {
            let enteredID = studentInput.value.trim();
            console.log("Entered Student ID:", enteredID);

            if (studentIDs.includes(enteredID)) {
                console.log("Student ID matched! Showing alert...");
                alert("⚠️ You have already registered with this Student ID!");
                studentInput.value = ""; // Clear input
            }
        });
    } else {
        console.error("Student ID input field not found!");
    }
});
