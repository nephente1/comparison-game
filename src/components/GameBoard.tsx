import { useEffect, useMemo } from "react";
import {observer} from 'mobx-react-lite';
import {GameState} from '../GameMobxState';
import {Cards} from './Cards';
import {TextInHeader, MainText, Button, NamesBox , ResultsWrapper, CardsWrapper, TitleText, NewGame, Spinner} from '../style/gameBoard.styles';

export const GameBoard = observer(() => {

  // getting values from global mobx state through destructuring:
  const { isLoading, chosenCards, playerOnePoint, computerPoint, attemptsTaken, loadData, pickCards, resetValues } = useMemo(() => new GameState(), []);

  useEffect(() => {
    loadData();
  }, [loadData]);

  const massArray = chosenCards.map((el) => parseFloat(el.mass));
  const maxMass = Math.max.apply(null, massArray);

  const renderCards = () => {
    if (chosenCards !== null) {
      return chosenCards.map((el, id) => (
        <Cards
          name={el.name}
          gender={el.gender}
          mass={el.mass}
          key={id}
          playerOneWins={id === 0 && parseFloat(el.mass) === maxMass}
          computerWins={id === 1 && parseFloat(el.mass) === maxMass}
        />
      ));
    }
  };

  return (
    <NamesBox>
      <header>
        <MainText>Choose cards</MainText>
        <TextInHeader>Player with bigger mass wins</TextInHeader>
        <TextInHeader>Attempts taken: {attemptsTaken}</TextInHeader>
        <Button onClick={pickCards}>PLAY!</Button>
      </header>

      {isLoading && <Spinner />}
      <ResultsWrapper>
        <CardsWrapper>
          <h2>Player One</h2>
          <TitleText>Points: {playerOnePoint}</TitleText>
        </CardsWrapper>
        <CardsWrapper>
          <h2>Computer</h2>
          <TitleText>Points: {computerPoint}</TitleText>
        </CardsWrapper>
      </ResultsWrapper>
      <ResultsWrapper>{renderCards()}</ResultsWrapper>
      <NewGame onClick={resetValues}>New game</NewGame>
    </NamesBox>
  );
});
