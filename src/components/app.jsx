import React, { Component } from 'react';
import styled, { keyframes } from 'styled-components';
import {
  fetchUpcomingGames,
  fetchGameThreads,
  fetchPostgameThreads,
  fetchComments
} from '../util/apis';

import { GameList } from './game-list';
import { GameView } from './game-view';

const ApplicationWrapper = styled.div`
  max-width: 1280px;
  min-height: 100vh;
  margin: 32px auto;
  display: grid;
  grid-gap: 16px;
  grid-template-rows: 80px auto;
  grid-template-areas:
    'game-list'
    'game-view';
`;

const fill = keyframes`
  to {
    max-width: 100vw;
  }
`;

const RefreshTimer = styled.div`
  position: absolute;
  top: 0;
  left: 0;
  width: 100vw;
  height: 4px;
  max-width: 0;
  animation: ${fill} 15s linear infinite;
  background: #4a4a4a;
`;

export class Application extends Component {
  state = {
    games: [],
    gdts: [],
    pgts: [],
    commentsById: {},
    selectedGameId: null
  };

  componentDidMount() {
    const refreshGames = async () => {
      const games = await fetchUpcomingGames();
      this.setState({ games });
    };

    const refreshGameThreads = async () => {
      const gdts = await fetchGameThreads();
      this.setState({ gdts }, () => refreshComments());
      const pgts = await fetchPostgameThreads();
      this.setState({ pgts }, () => refreshComments());
    };

    const refreshComments = () => {
      const { gdts, pgts } = this.state;
      pgts.concat(gdts).forEach(async ({ id }) => {
        const comments = await fetchComments(id);
        this.setState(state => ({
          commentsById: { ...state.commentsById, [id]: comments }
        }));
      });
    };

    refreshGames();
    setInterval(() => refreshGames(), 1000 * 15);

    refreshGameThreads();
    setInterval(() => refreshGameThreads(), 1000 * 60);

    refreshComments();
    setInterval(() => refreshComments(), 1000 * 30);
  }

  render() {
    const { games, gdts, pgts, commentsById, selectedGameId } = this.state;
    const game = games.find(game => game.id === selectedGameId);
    const gdt = game
      ? pgts
          .concat(gdts)
          .find(
            ({ title }) =>
              title.includes(game.home.name) &&
              title.includes(game.away.name) &&
              title.includes(game.date.format('D')) &&
              title.includes(game.date.format('MMM')) &&
              title.includes(game.date.format('YYYY'))
          ) || {}
      : {};

    return (
      <ApplicationWrapper>
        <RefreshTimer />
        <GameList
          games={games}
          selectedGameId={selectedGameId}
          onSelectGame={selectedGameId => this.setState({ selectedGameId })}
        />
        {game && <GameView {...game} comments={commentsById[gdt.id] || []} />}
      </ApplicationWrapper>
    );
  }
}
