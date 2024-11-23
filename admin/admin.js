window.addEventListener('DOMContentLoaded', () =>{
    const editBtns = document.getElementsByClassName('edit');


    Array.from(editBtns).forEach((editBtn) => {
        editBtn.addEventListener('click', () => {
            window.location.href = "admin-edit.html"; 
        });
    });
});