import {handleDeleteCard} from "../index";
import {CardOOP} from "./CardOOP";
import {Section} from "./SectionOOP";

let CardList = {}

const elementsContainer = document.querySelector(".elements");
const addPopup = document.querySelector(".popup_add-popup");

function buildCards(cards, userId) {
  CardList = new Section(
    { items: cards, renderer: (card) => {
        const newCard = new CardOOP({card:card, userID:userId, handleDeleteCard},'#element-image');
        const cardElement = newCard.createElement();
        CardList.addItem({element:cardElement});
      }
    }, '.elements');
  CardList.renderItems();
}


function addElementsContainer(elementsContainer, data, userID) {
  const newCard = new CardOOP({card:data, userID, handleDeleteCard}, '#element-image');
  const cardElement = newCard.createElement();
  CardList.addItem({element:cardElement, isReverse:true});
}

export {elementsContainer, addPopup, addElementsContainer, buildCards};

