const cards = document.querySelectorAll('.card');

let matchedCard = 0;
let cardOne, cardTwo;
let disableDeck = false;
function flipCard(e) {
    let clickedCard = e.target;
    if (clickedCard !== cardOne && !disableDeck) {
        clickedCard.classList.add('flip');
        if (!cardOne) {
            return cardOne = clickedCard;
        }
        cardTwo = clickedCard;
        disableDeck = false;

        let cardOneImg = cardOne.querySelector('img').src,
        cardTwoImg = cardTwo.querySelector('img').src;
        matchCards(cardOneImg, cardTwoImg);
    }
}

function matchCards(img1, img2) {
    if(img1 === img2) {
        matchedCard++;
        if(matchedCard == 8) {
         setTimeout(() => {
            Swal.fire({
                title: "You Won the Game",
                width: 600,
                padding: "3em",
                color: "#716add",
                background: "#fff url(/images/trees.png)",
                backdrop: `
                  rgba(0,0,123,0.4)
                  url("/images/nyan-cat.gif")
                  left top
                  no-repeat
                `
              });
            return shuffleCard();
         }, 1000);
        }

        cardOne.removeEventListener('click', flipCard);
        cardTwo.removeEventListener('click' , flipCard);
        cardOne = cardTwo = "";
        return disableDeck = false;
    }
   
   setTimeout(() => {
    cardOne.classList.add('shake');
    cardTwo.classList.add('shake');
   },400);


setTimeout(() => {
    cardOne.classList.remove('shake' , 'flip');
    cardTwo.classList.remove('shake' , 'flip');
    cardOne = cardTwo = '';
    disableDeck = false;
   },1200);

}

function shuffleCard() {
     matchedCard = 0;
     cardOne = cardTwo ="";
     disableDeck = false;
     let arr =[1,2,3,4,5,6,7,8,1,2,3,4,5,6,7,8];
     arr.sort(() => Math.random() > 0.5 ? 1 : -1);

     cards.forEach((card, index) => {
        card.classList.remove('flip');
        let imgTag = card.querySelector('img');
        imgTag.src = `images/img${arr[index]}.png`;
        card.addEventListener('click', flipCard);
    });
}

shuffleCard();

cards.forEach(card => {
    
    card.addEventListener('click', flipCard);
});