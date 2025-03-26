document.addEventListener('DOMContentLoaded', () => {
    const tecnicaButtons = document.querySelectorAll('.tecnica-btn');

    tecnicaButtons.forEach(button => {
        button.addEventListener('click', () => {
            // Remove the 'selected' class from all buttons
            tecnicaButtons.forEach(btn => {
                btn.classList.remove('selected');
            });
            // Add the 'selected' class to the clicked button
            button.classList.add('selected');
            // You can also add logic here to store the selected technique's value.
        });
    });
});