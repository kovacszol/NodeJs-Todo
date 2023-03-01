function edit_click(clicked_id) {
    const normalDiv = document.getElementById(`normal-div-${clicked_id}`);
    const editDiv = document.getElementById(`edit-div-${clicked_id}`);
    editDiv.style.display = "block";
    normalDiv.style.display = "none";
}
document.getElementById("createInput").addEventListener("input", function () {
    if (this.value.length < 3) {
        this.classList.remove("is-valid");
        this.classList.add("is-invalid");
    } else {
        this.classList.remove("is-invalid");
        this.classList.add("is-valid");
    }
});