import React, { Fragment } from 'react';
import styled, { css } from 'styled-components';

const GameListWrapper = styled.div`
  grid-area: game-list;
  display: flex;
  overflow-x: scroll;
  background: #ffffff;
`;

const selected = css`
  cursor: pointer;
  border-top: 2px solid #4a4a4a;
`;

const GameWrapper = styled.div`
  display: flex;
  padding: 16px;
  border-right: 1px solid #eee;

  ${props => props.selected && selected};

  &:hover {
    ${selected};
  }
`;

const TeamColumn = styled.div`
  flex: 1;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
`;

const TeamName = styled.span`
  font-size: 16px;
  margin-bottom: 4px;
`;

const TeamGoals = styled.span`
  font-size: 24px;
  font-weight: 500;
`;

const StatusColumn = styled.div`
  min-width: 100px;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
`;

const GamePeriod = styled.span`
  font-size: 14px;
  margin-bottom: 4px;
`;

const GameClock = styled.span`
  font-size: 14px;
  font-weight: 300;

  ${props => props.stopped && 'color: #e53935;'};
`;

function Game({ id, date, home, away, status, selected, onSelect }) {
  const showDate = !status.started && !status.ended && !status.intermission;
  const showPeriod = status.started && !status.ended && !status.intermission;
  const showFinal = status.started && status.ended && !status.intermission;
  const showIntermission =
    status.started && !status.ended && status.intermission;
  return (
    <GameWrapper onClick={() => onSelect(id)} selected={selected}>
      <TeamColumn team={away.code}>
        <TeamName>{away.code}</TeamName>
        <TeamGoals>{away.goals}</TeamGoals>
      </TeamColumn>
      <StatusColumn>
        {showDate && (
          <Fragment>
            <GamePeriod>{date.format('ddd Do')}</GamePeriod>
            <GameClock>{date.format('h:mm A')}</GameClock>
          </Fragment>
        )}
        {showPeriod && (
          <Fragment>
            <GamePeriod>{status.periodOrdinal}</GamePeriod>
            <GameClock>{status.periodClock}</GameClock>
          </Fragment>
        )}
        {showIntermission && (
          <Fragment>
            <GamePeriod>End {status.periodOrdinal}</GamePeriod>
            <GameClock>{status.intermissionClock}</GameClock>
          </Fragment>
        )}
        {showFinal && <GamePeriod>Final</GamePeriod>}
      </StatusColumn>
      <TeamColumn team={home.code}>
        <TeamName>{home.code}</TeamName>
        <TeamGoals>{home.goals}</TeamGoals>
      </TeamColumn>
    </GameWrapper>
  );
}

export function GameList({ games, selectedGameId, onSelectGame }) {
  return (
    <GameListWrapper>
      {games.map(game => (
        <Game
          key={game.id}
          {...game}
          selected={game.id === selectedGameId}
          onSelect={onSelectGame}
        />
      ))}
    </GameListWrapper>
  );
}
