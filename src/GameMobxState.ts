import { makeAutoObservable } from 'mobx';

interface ResponseItemType {
  name: string;
  gender: string;
  mass: string;
}

export class GameState {
  results: Array<ResponseItemType> = [];
  isLoading: boolean | undefined = true;
  chosenCards: Array<ResponseItemType> = [];
  playerOnePoint: number = 0;
  computerPoint: number = 0;
  attemptsTaken: number = 0;

  constructor() {
    // Automatically makes all fields observable and methods actions
    makeAutoObservable(this);
  }

  loadData = async () => {
    try {
      const response = await fetch(`https://swapi.dev/api/people/`);
      const respJson = await response.json();
      this.results = respJson.results;
    } catch (err) {
      console.error('fetch error', err);
      alert(err);
    } finally {
      this.isLoading = false;
    }
  }

  pickCards = () => {
    this.attemptsTaken += 1;
    this.chosenCards = [];
    
    let allElements = [...this.results];
    
    for (let i = 0; i < 2; i++) {
      const index = Math.floor(Math.random() * allElements.length);
      const randomNum = allElements[index];
      this.chosenCards.push(randomNum);
      allElements = allElements.filter((el) => el !== randomNum);
    }
    this.countPoints();
  }

  countPoints = () => {
    const massArray = this.chosenCards.map((el) => parseFloat(el.mass));
    const maxMass = Math.max(...massArray);

    if (parseFloat(this.chosenCards[0].mass) === maxMass) {
      this.playerOnePoint += 1;
    }

    if (parseFloat(this.chosenCards[1].mass) === maxMass) {
      this.computerPoint += 1;
    }
  }

  resetValues = () => {
    this.playerOnePoint = 0;
    this.computerPoint = 0;
    this.attemptsTaken = 0;
    this.chosenCards = [];
  }
}
