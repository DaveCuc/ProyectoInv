document.addEventListener('DOMContentLoaded', () => {
    const trigger = document.getElementById('avatarTrigger');
    const popup = document.getElementById('avatarPopup');
    const choices = document.querySelectorAll('.avatar-choice');
    const input = document.getElementById('avatarInput');
  
    const savedAvatar = localStorage.getItem('avatarSeleccionado');
    if (savedAvatar) {
      trigger.className = 'avatar-trigger bg-' + savedAvatar + '64';
      input.value = savedAvatar;
    }
  
    trigger.addEventListener('click', () => {
      popup.style.display = popup.style.display === 'block' ? 'none' : 'block';
    });
  
    choices.forEach(choice => {
      choice.addEventListener('click', () => {
        choices.forEach(c => c.classList.remove('selected'));
        choice.classList.add('selected');
  
        const avatarId = choice.dataset.avatar;
  
        trigger.className = 'avatar-trigger bg-' + avatarId + '64';
        input.value = avatarId;
        localStorage.setItem('avatarSeleccionado', avatarId);
  
        popup.style.display = 'none';
      });
    });
  });
  