function edit_click(clicked_id) {
    const normalDiv = document.getElementById(`normal-div-${clicked_id}`);
    const editDiv = document.getElementById(`edit-div-${clicked_id}`);
    editDiv.style.display = "block";
    normalDiv.style.display = "none";
}
async function update_click(clicked_id) {
    const normalDiv = document.getElementById(`normal-div-${clicked_id}`);
    const editDiv = document.getElementById(`edit-div-${clicked_id}`);
    const editInput = document.getElementById(`edit-input-${clicked_id}`);
    const updatedText = editInput.value;
    normalDiv.innerText = updatedText;
    editDiv.style.display = "none";
    normalDiv.style.display = "block";
}
function delete_click(clicked_id) {
    const normalDiv = document.getElementById(`normal-div-${clicked_id}`);
    const editDiv = document.getElementById(`edit-div-${clicked_id}`);
    editDiv.style.display = "none";
    normalDiv.style.display = "none";
}