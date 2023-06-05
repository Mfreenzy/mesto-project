const popup = document.querySelector(".popup");
const profileName = document.querySelector(".profile__name");
const profileProf = document.querySelector(".profile__prof");
const nameInput = document.querySelector(".popup__input_text_ed-name");
const jobInput = document.querySelector(".popup__input_text_ed-prof");
const editProfile = document.querySelector(".popup_edit-profile");

export function openPopup(popup) {
    popup.classList.add("popup_opened");
}

export function closePopup(popup) {
    popup.classList.remove("popup_opened");
}

export function handleFormSubmit(evt) {
    evt.preventDefault();
    profileName.textContent = nameInput.value;
    profileProf.textContent = jobInput.value;
    closePopup(editProfile);
    evt.target.reset();
  }
  
export {profileName, profileProf, nameInput, jobInput, editProfile}
