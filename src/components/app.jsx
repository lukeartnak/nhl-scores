import React, { Component } from 'react';
import styled, { keyframes } from 'styled-components';
import {
  fetchUpcomingGames,
  fetchGameThreads,
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
    threads: [],
    commentsById: {},
    selectedGameId: null
  };

  async componentDidMount() {
    const refreshGames = async () => {
      const games = await fetchUpcomingGames();
      this.setState({ games });
    };

    const refreshGameThreads = async () => {
      const threads = await fetchGameThreads(this.state.games);
      this.setState({ threads });
    };

    const refreshComments = async () => {
      const { threads } = this.state;
      const comments = await Promise.all(
        threads.map(thread => fetchComments(thread.id))
      );
      this.setState(state => ({
        commentsById: comments.reduce(
          (acc, comment, i) => ({ ...acc, [threads[i].id]: comment }),
          state.commentsById
        )
      }));
    };

    setInterval(() => refreshGames(), 1000 * 15);
    setInterval(() => refreshGameThreads(), 1000 * 60);
    setInterval(() => refreshComments(), 1000 * 30);

    await refreshGames();
    await refreshGameThreads();
    refreshComments();
  }

  render() {
    const { games, threads, commentsById, selectedGameId } = this.state;
    const game = games.find(game => game.id === selectedGameId) || {};
    const thread = threads.find(t => t.game === game.id) || {};

    return (
      <ApplicationWrapper>
        <RefreshTimer />
        <GameList
          games={games}
          selectedGameId={selectedGameId}
          onSelectGame={selectedGameId => this.setState({ selectedGameId })}
        />
        {game.id && (
          <GameView {...game} comments={commentsById[thread.id] || []} />
        )}
      </ApplicationWrapper>
    );
  }
}
