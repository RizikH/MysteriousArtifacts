document.addEventListener("DOMContentLoaded", () => {
    const addButton = document.querySelector('#add-product-btn');
    if (addButton) {
        addButton.addEventListener('click', showAddForm);
    }
});

function showAddForm() {
    const form = document.querySelector('.addProductForm');
    form.style.display = "flex";
}