// Replace these values with your actual API Key and Form ID
const API_KEY = "9b90ee03c0f019823c2daed6aca8e133";
const FORM_ID = "250566577142158";
const STUDENT_ID_FIELD = "syracuseUniversity4";  // Replace with the actual unique name

async function fetchExistingStudentIDs() {
    let url = `https://api.jotform.com/form/${250566577142158}/submissions?apikey=${API_KEY}`;
    
    try {
        let response = await fetch(url);
        let data = await response.json();
        
        if (data.content) {
            let studentIDs = data.content.map(submission => {
                return submission.answers.find(ans => ans.name === STUDENT_ID_FIELD)?.answer;
            }).filter(id => id); // Filter out empty values
            
            return studentIDs;
        } else {
            return [];
        }
    } catch (error) {
        console.error("Error fetching student IDs:", error);
        return [];
    }
}

// Attach event listener to check input field inside the JotForm iframe
document.addEventListener("DOMContentLoaded", function() {
    let iframe = document.getElementById("jotform-iframe");

    iframe.onload = async function() {
        let studentIDs = await fetchExistingStudentIDs();

        let iframeDoc = iframe.contentDocument || iframe.contentWindow.document;
        let studentInput = iframeDoc.querySelector("[name='Syracuse University Student ID Number']"); // Update with your field's input name

        if (studentInput) {
            studentInput.addEventListener("blur", function() {
                let enteredID = studentInput.value.trim();

                if (studentIDs.includes(enteredID)) {
                    alert("⚠️ You have already registered with this Student ID!");
                    studentInput.value = ""; // Clear input
                }
            });
        }
    };
});
