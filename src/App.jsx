import React, { Component, Fragment } from 'react';
import styled, { css, keyframes } from 'styled-components';
import axios from 'axios';
import moment from 'moment';
import decode from 'decode-html';

axios.defaults.baseURL = 'https://statsapi.web.nhl.com/';

const teams = {
  1: 'NJD',
  2: 'NYI',
  3: 'NYR',
  4: 'PHI',
  5: 'PIT',
  6: 'BOS',
  7: 'BUF',
  8: 'MTL',
  9: 'OTT',
  10: 'TOR',
  12: 'CAR',
  13: 'FLA',
  14: 'TBL',
  15: 'WSH',
  16: 'CHI',
  17: 'DET',
  18: 'NSH',
  19: 'STL',
  20: 'CGY',
  21: 'COL',
  22: 'EDM',
  23: 'VAN',
  24: 'ANA',
  25: 'DAL',
  26: 'LAK',
  28: 'SJS',
  29: 'CBJ',
  30: 'MIN',
  52: 'WPG',
  53: 'ARI',
  54: 'VGK'
};

const subreddits = {
  '/r/anaheimducks': 'ana',
  '/r/bostonbruins': 'bos',
  '/r/sabres': 'buf',
  '/r/calgaryflames': 'cgy',
  '/r/canes': 'car',
  '/r/hawks': 'chi',
  '/r/coloradoavalanche': 'col',
  '/r/bluejackets': 'cbj',
  '/r/dallasstars': 'dal',
  '/r/detroitredwings': 'det',
  '/r/edmontonoilers': 'edm',
  '/r/floridapanthers': 'fla',
  '/r/losangeleskings': 'lak',
  '/r/wildhockey': 'min',
  '/r/habs': 'mtl',
  '/r/goldenknights': 'vgk',
  '/r/predators': 'nsh',
  '/r/devils': 'njd',
  '/r/newyorkislanders': 'nyi',
  '/r/rangers': 'nyr',
  '/r/ottawasenators': 'ott',
  '/r/flyers': 'phi',
  '/r/coyotes': 'ari',
  '/r/penguins': 'pit',
  '/r/sanjosesharks': 'sjs',
  '/r/stlouisblues': 'stl',
  '/r/tampabaylightning': 'tbl',
  '/r/leafs': 'tor',
  '/r/canucks': 'van',
  '/r/caps': 'wsh',
  '/r/winnipegjets': 'wpg'
};

const logos = {
  ANA: {
    common: css`
      background-size: 150%;
      background-image: url(logos/logo_ana.svg);
    `,
    away: css`
      background-position: 100% 50%;
    `,
    home: css`
      background-position: 100% 50%;
      transform: scaleX(-1);
    `
  },
  ARI: {
    common: css`
      background-size: 175%;
      background-image: url(logos/logo_ari.svg);
    `,
    away: css`
      background-position: 100% 25%;
    `,
    home: css`
      background-position: 100% 25%;
      transform: scaleX(-1);
    `
  },
  BOS: {
    common: css`
      background-size: 110%;
      background-image: url(logos/logo_bos.svg);
    `,
    away: css`
      background-position: 100% 50%;
    `,
    home: css`
      background-position: 0 50%;
    `
  },
  BUF: {
    common: css`
      background-size: 110%;
      background-image: url(logos/logo_buf.svg);
    `,
    away: css`
      background-position: 0 40%;
      transform: scaleX(-1);
    `,
    home: css`
      background-position: 0 40%;
    `
  },
  CAR: {
    common: css`
      background-size: 175%;
      background-image: url(logos/logo_car.svg);
    `,
    away: css`
      background-position: 100% 30%;
    `,
    home: css`
      background-position: 100% 30%;
      transform: scaleX(-1);
    `
  },
  CBJ: {
    common: css`
      background-size: 125%;
      background-image: url(logos/logo_cbj.svg);
    `,
    away: css`
      background-position: 100% 50%;
    `,
    home: css`
      background-position: 100% 50%;
      transform: scaleX(-1);
    `
  },
  CGY: {
    common: css`
      background-size: 125%;
      background-image: url(logos/logo_cgy.svg);
    `,
    away: css`
      background-position: 100% 50%;
    `,
    home: css`
      background-position: 100% 50%;
      transform: scaleX(-1);
    `
  },
  CHI: {
    common: css`
      background-size: 125%;
      background-image: url(logos/logo_chi.svg);
    `,
    away: css`
      background-position: 0 50%;
      transform: scaleX(-1);
    `,
    home: css`
      background-position: 0 50%;
    `
  },
  COL: {
    common: css`
      background-size: 110%;
      background-image: url(logos/logo_col.svg);
    `,
    away: css`
      background-position: 100% 75%;
    `,
    home: css`
      background-position: 100% 75%;
      transform: scaleX(-1);
    `
  },
  DAL: {
    common: css`
      background-size: 150%;
      background-image: url(logos/logo_dal.svg);
    `,
    away: css`
      background-position: 100% 50%;
    `,
    home: css`
      background-position: 100% 50%;
      transform: scaleX(-1);
    `
  },
  DET: {
    common: css`
      background-size: 160%;
      background-image: url(logos/logo_det.svg);
    `,
    away: css`
      background-position: 0 60%;
      transform: scaleX(-1);
    `,
    home: css`
      background-position: 0 60%;
    `
  },
  EDM: {
    common: css`
      background-size: 110%;
      background-image: url(logos/logo_edm.svg);
    `,
    away: css`
      background-position: 100% 50%;
    `,
    home: css`
      background-position: 0 50%;
    `
  },
  FLA: {
    common: css`
      background-size: 110%;
      background-image: url(logos/logo_fla.svg);
    `,
    away: css`
      background-position: 0 40%;
      transform: scaleX(-1);
    `,
    home: css`
      background-position: 0 40%;
    `
  },
  LAK: {
    common: css`
      background-size: 100%;
      background-image: url(logos/logo_lak.svg);
    `,
    away: css`
      background-position: 100% 25%;
    `,
    home: css`
      background-position: 0 25%;
    `
  },
  MIN: {
    common: css`
      background-size: 150%;
      background-image: url(logos/logo_min.svg);
    `,
    away: css`
      background-position: 0 50%;
      transform: scaleX(-1);
    `,
    home: css`
      background-position: 0 50%;
    `
  },
  MTL: {
    common: css`
      background-size: 150%;
      background-image: url(logos/logo_mtl.svg);
    `,
    away: css`
      background-position: 100% 50%;
    `,
    home: css`
      background-position: 100% 50%;
      transform: scaleX(-1);
    `
  },
  NJD: {
    common: css`
      background-size: 110%;
      background-image: url(logos/logo_njd.svg);
    `,
    away: css`
      background-position: 100% 50%;
    `,
    home: css`
      background-position: 0 50%;
    `
  },
  NSH: {
    common: css`
      background-size: 150%;
      background-image: url(logos/logo_nsh.svg);
    `,
    away: css`
      background-position: 100% 50%;
    `,
    home: css`
      background-position: 100% 50%;
      transform: scaleX(-1);
    `
  },
  NYI: {
    common: css`
      background-size: 110%;
      background-image: url(logos/logo_nyi.svg);
    `,
    away: css`
      background-position: 100% 40%;
    `,
    home: css`
      background-position: 0 40%;
    `
  },
  NYR: {
    common: css`
      background-size: 110%;
      background-image: url(logos/logo_nyr.svg);
    `,
    away: css`
      background-position: 100% 50%;
    `,
    home: css`
      background-position: 0 50%;
    `
  },
  OTT: {
    common: css`
      background-size: 150%;
      background-image: url(logos/logo_ott.svg);
    `,
    away: css`
      background-position: 100% 75%;
    `,
    home: css`
      background-position: 100% 75%;
      transform: scaleX(-1);
    `
  },
  PHI: {
    common: css`
      background-size: 125%;
      background-image: url(logos/logo_phi.svg);
    `,
    away: css`
      background-position: 100% 50%;
    `,
    home: css`
      background-position: 100% 50%;
      transform: scaleX(-1);
    `
  },
  PIT: {
    common: css`
      background-size: 150%;
      background-image: url(logos/logo_pit.svg);
    `,
    away: css`
      background-position: 0 20%;
      transform: scaleX(-1);
    `,
    home: css`
      background-position: 0 20%;
    `
  },
  SJS: {
    common: css`
      background-size: 150%;
      background-image: url(logos/logo_sjs.svg);
    `,
    away: css`
      background-position: 100% 75%;
    `,
    home: css`
      background-position: 100% 75%;
      transform: scaleX(-1);
    `
  },
  STL: {
    common: css`
      background-size: 125%;
      background-image: url(logos/logo_stl.svg);
    `,
    away: css`
      background-position: 100% 50%;
    `,
    home: css`
      background-position: 100% 50%;
      transform: scaleX(-1);
    `
  },
  TBL: {
    common: css`
      background-size: 125%;
      background-image: url(logos/logo_tbl.svg);
    `,
    away: css`
      background-position: 100% 50%;
    `,
    home: css`
      background-position: 0 50%;
    `
  },
  TOR: {
    common: css`
      background-size: 125%;
      background-image: url(logos/logo_tor.svg);
    `,
    away: css`
      background-position: 100% 75%;
    `,
    home: css`
      background-position: 0 75%;
    `
  },
  VAN: {
    common: css`
      background-size: 125%;
      background-image: url(logos/logo_van.svg);
    `,
    away: css`
      background-position: 100% 75%;
    `,
    home: css`
      background-position: 100% 75%;
      transform: scaleX(-1);
    `
  },
  VGK: {
    common: css`
      background-size: 110%;
      background-image: url(logos/logo_vgk.svg);
    `,
    away: css`
      background-position: 100% 50%;
    `,
    home: css`
      background-position: 100% 50%;
      transform: scaleX(-1);
    `
  },
  WPG: {
    common: css`
      background-size: 125%;
      background-image: url(logos/logo_wpg.svg);
    `,
    away: css`
      background-position: 100% 50%;
    `,
    home: css`
      background-position: 100% 50%;
      transform: scaleX(-1);
    `
  },
  WSH: {
    common: css`
      background-size: 110%;
      background-image: url(logos/logo_wsh.svg);
    `,
    away: css`
      background-position: 100% 50%;
    `,
    home: css`
      background-position: 0 50%;
    `
  }
};

const timer = keyframes`
  to {
    max-width: 100vw;
  }
`;

const UpdateTimer = styled.div`
  position: absolute;
  top: 0;
  left: 0;
  width: 100vw;
  height: 4px;
  max-width: 0;
  animation: ${timer} 15s linear infinite;
  background: #4a4a4a;
`;

const Container = styled.div`
  min-height: 100vh;
  display: grid;
  grid-template-columns: 2fr 1fr;
  grid-template-areas: auto auto;
  grid-template-areas:
    'game-list play-list'
    'comment-list play-list';
  grid-gap: 16px;
  margin: 16px;
`;

const GameList = styled.div`
  grid-area: game-list;

  > * + * {
    margin-top: 16px;
  }
`;

const PlayList = styled.div`
  grid-area: play-list;
  display: flex;
  flex-direction: column;

  > * + * {
    margin-top: 16px;
  }
`;

const CommentList = styled.div`
  grid-area: comment-list;
`;

const themes = {
  GOAL: 'rgba(76, 175, 80, 0.1)',
  PENALTY: 'rgba(244, 67, 54, 0.1)',
  PERIOD_START: 'rgba(33, 150, 243, .1)',
  PERIOD_END: 'rgba(33, 150, 243, .1)'
};

const Play = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 16px;
  background: ${props => themes[props.theme]};
`;

const PlayLogo = styled.img`
  max-width: 48px;
  max-height: 48px;
`;

const PlayTitle = styled.span`
  flex: 1;
  text-align: center;
  margin: 0 16px;
  line-height: 1.6;
  font-weight: 400;
`;

const PlayTime = styled.div`
  display: flex;
  flex-direction: column;
  text-align: center;

  span:first-of-type {
    font-weight: 500;
    margin-bottom: 8px;
  }

  span:last-of-type {
    font-size: 16px;
  }
`;

const TeamColumn = styled.div`
  position: relative;
  z-index: 1;
  display: flex;
  flex-direction: column;
  padding: 64px 32px;
  text-align: center;
`;

const GameColumn = styled.div`
  display: flex;
  flex-direction: column;
  padding: 16px 32px;
  text-align: center;
  justify-content: center;
`;

const GameContainer = styled.div`
  position: relative;
  display: flex;
  background: #ffffff;

  ${TeamColumn} {
    flex: 1;
  }

  ${GameColumn} {
    width: 200px;
  }
`;

const GameHeader = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  line-height: 1.6;
`;

const TeamLogo = styled.div`
  position: absolute;
  top: 0;
  left: 0;
  bottom: 0;
  right: 0;
  background-repeat: no-repeat;
  z-index: -1;
  opacity: 0.05;

  ${props => logos[props.team].common};
  ${props => logos[props.team][props.side]};
`;

const TeamName = styled.span`
  font-size: 32px;
  font-weight: 900;
`;

const TeamGoals = styled.div`
  font-size: 96px;
  font-weight: 900;
  margin: 8px 0;
`;

const TeamShots = styled.div`
  font-size: 16px;
  font-weight: 900;
  text-transform: uppercase;
`;

const GamePeriod = styled.span`
  flex: 1;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  font-size: 24px;
  font-weight: 500;
`;

const GameClock = styled.span`
  text-align: center;
  font-weight: 400;
  font-size: 24px;
  line-height: 2;

  ${props => props.stopped && 'color: #e53935;'};
`;

const GameSpecial = styled.span`
  display: flex;
  flex-direction: column;
  font-size: 18px;
  line-height: 1.6;

  ${TeamColumn} & {
    width: 80px;
    text-align: center;
    position: absolute;
    top: 50%;
    ${props => (props.away ? 'right: 16px' : 'left: 16px')};
    transform: translateY(-50%);
  }
`;

const Comment = styled.div`
  display: flex;
  align-items: flex-start;
  background: #ffffff;
  padding: 16px;
  font-family: 'Roboto';
  font-size: 14px;

  h1,
  h2,
  h3,
  h4,
  h5,
  h6 {
    font-size: 16px;
    font-weight: 500;
    margin-bottom: 8px;
  }

  em {
    font-style: italic;
  }

  strong {
    font-weight: 500;
  }

  a {
    color: #0099ff;
    text-decoration: none;
  }

  table {
    width: 100%;
    font-size: 14px;
    margin-bottom: 16px;
  }

  thead {
    background: #4a4a4a;
    color: #ffffff;
  }

  tbody {
    background: #fafafa;
  }

  th,
  td {
    padding: 8px;
  }
`;

const CommentLogo = styled.img`
  flex-basis: 48px;
  max-height: 32px;
  max-width: 32px;
  margin-right: 16px;
`;

const CommentBody = styled.div`
  display: flex;
  flex-direction: column;
`;

const CommentText = styled.div`
  line-height: 1.6;
`;

const CommentAuthor = styled.span`
  font-weight: 500;
  font-size: 10px;
  margin-bottom: 4px;
  text-transform: uppercase;
`;

function formatMinutes(minutes) {
  return `${Math.floor(minutes / 60)}:${('00' + Math.floor(minutes % 60)).slice(
    -2
  )}`;
}

export default class App extends Component {
  state = {
    games: [],
    plays: [],
    comments: []
  };

  async componentDidMount() {
    setInterval(this.fetchGames, 1000 * 15);
    setInterval(this.fetchComments, 1000 * 60);
    await this.fetchGames();
    this.fetchComments();
  }

  fetchGames = async () => {
    const scheduleResponse = await axios.get(
      '/api/v1/schedule?expand=schedule.game.seriesSummary,seriesSummary.series'
    );
    const scheduledGames = scheduleResponse.data.dates.reduce(
      (acc, date) => acc.concat(date.games),
      []
    );
    const gameResponses = await Promise.all(
      scheduledGames.map(game => axios.get(game.link))
    );

    const games = gameResponses.map((gameResponse, i) => ({
      id: gameResponse.data.gamePk,
      ...scheduledGames[i].seriesSummary,
      ...gameResponse.data.gameData,
      ...gameResponse.data.liveData
    }));

    this.setState({
      games: games.map(game => {
        return {
          id: game.id,
          date: moment(game.datetime.dateTime),
          roundLabel: `Round ${game.series.round.number}`,
          gameLabel: game.gameLabel,
          seriesLabel: game.seriesStatusShort || 'Tied 0-0',
          status: parseInt(game.status.statusCode, 10),
          period: game.linescore.currentPeriodOrdinal,
          time: game.linescore.currentPeriodTimeRemaining,
          stopped:
            game.plays.currentPlay &&
            game.plays.currentPlay.result.eventTypeId === 'STOP',
          intermission: game.linescore.intermissionInfo.inIntermission,
          intermissionTime: formatMinutes(
            game.linescore.intermissionInfo.intermissionTimeRemaining
          ),
          powerplay:
            game.linescore.powerPlayInfo &&
            game.linescore.powerPlayInfo.inSituation,
          powerplayTime:
            game.linescore.powerPlayInfo &&
            formatMinutes(game.linescore.powerPlayInfo.situationTimeRemaining),
          homeTeam: {
            nameFull: game.teams.home.name,
            name: game.teams.home.abbreviation,
            goals: game.linescore.teams.home.goals,
            shots: game.linescore.teams.home.shotsOnGoal,
            skaters: game.linescore.teams.home.numSkaters,
            emptyNet: game.linescore.teams.home.goaliePulled
          },
          awayTeam: {
            nameFull: game.teams.away.name,
            name: game.teams.away.abbreviation,
            goals: game.linescore.teams.away.goals,
            shots: game.linescore.teams.away.shotsOnGoal,
            skaters: game.linescore.teams.away.numSkaters,
            emptyNet: game.linescore.teams.away.goaliePulled
          }
        };
      }),
      plays: games
        .reduce(
          (plays, game) =>
            plays
              .concat(game.plays.scoringPlays.map(i => game.plays.allPlays[i]))
              .concat(game.plays.penaltyPlays.map(i => game.plays.allPlays[i]))
              .concat(
                game.plays.allPlays
                  .filter(play =>
                    ['PERIOD_START', 'PERIOD_END'].includes(
                      play.result.eventTypeId
                    )
                  )
                  .map(play => ({
                    ...play,
                    homeTeam: {
                      name: game.teams.home.abbreviation
                    },
                    awayTeam: {
                      name: game.teams.away.abbreviation
                    }
                  }))
              ),
          []
        )
        .sort((a, b) => moment(b.about.dateTime).diff(a.about.dateTime))
    });
  };

  fetchComments = async () => {
    const redditResponse = await axios.get(
      'https://www.reddit.com/r/hockey/search.json?q=flair%3A%22%5BGDT%5D%22+OR+flair%3A%22%5BGDT+Playoffs%5D%22&restrict_sr=on&sort=new&t=day'
    );

    const commentResponses = await Promise.all(
      redditResponse.data.data.children.map(post =>
        axios.get(`https://www.reddit.com/comments/${post.data.id}.json`)
      )
    );

    this.setState({
      comments: this.state.games.reduce(
        (acc, game) => ({
          ...acc,
          [game.id]: commentResponses.find(commentResponse => {
            const title = commentResponse.data[0].data.children[0].data.title.toLowerCase();
            return (
              title.includes(game.awayTeam.nameFull.toLowerCase()) ||
              title.includes(game.homeTeam.nameFull.toLowerCase())
            );
          })
        }),
        {}
      )
    });
  };

  render() {
    return (
      <Container>
        <UpdateTimer />
        <GameList>
          {this.state.games.map(game => (
            <GameContainer key={game.id}>
              <TeamColumn>
                <TeamLogo team={game.awayTeam.name} side="away" />
                <TeamName>{game.awayTeam.name}</TeamName>
                <TeamGoals>{game.awayTeam.goals}</TeamGoals>
                <TeamShots>{game.awayTeam.shots} SOG</TeamShots>
                {game.powerplay &&
                  game.awayTeam.skaters > game.homeTeam.skaters && (
                    <GameSpecial away>
                      <span>
                        {game.awayTeam.skaters === 5 &&
                        game.homeTeam.skaters === 4
                          ? 'Power Play'
                          : `${game.awayTeam.skaters} on ${
                              game.homeTeam.skaters
                            }`}
                      </span>
                      <span>{game.powerplayTime}</span>
                    </GameSpecial>
                  )}
                {game.awayTeam.emptyNet && <GameSpecial>Empty Net</GameSpecial>}
              </TeamColumn>
              <GameColumn>
                <GameHeader>
                  <span>
                    {game.roundLabel} &middot; {game.gameLabel} &middot;{' '}
                    {game.seriesLabel}
                  </span>
                  <span>{game.date.format('ddd, MMM DD [at] h:mm A')}</span>
                </GameHeader>
                <GamePeriod>
                  {game.status <= 2 && (
                    <span>{game.date.format('h:mm A')}</span>
                  )}
                  {game.time !== 'END' &&
                    game.time !== 'Final' && (
                      <Fragment>
                        <span>{game.period}</span>
                        <GameClock stopped={game.stopped}>
                          {game.time}
                        </GameClock>
                      </Fragment>
                    )}
                  {game.time === 'END' && <span>End of {game.period}</span>}
                  {game.time === 'Final' && <span>Final</span>}
                </GamePeriod>

                <GameSpecial>
                  {game.intermission && (
                    <Fragment>
                      <span>Intermission</span>
                      <span>{game.intermissionTime}</span>
                    </Fragment>
                  )}
                  {!game.intermission &&
                    game.powerplay &&
                    game.awayTeam.skaters === game.homeTeam.skaters && (
                      <Fragment>
                        <span>
                          {game.awayTeam.skaters} on {game.homeTeam.skaters}
                        </span>
                        <span>{game.powerplayTime}</span>
                      </Fragment>
                    )}
                </GameSpecial>
              </GameColumn>
              <TeamColumn>
                <TeamLogo team={game.homeTeam.name} side="home" />
                <TeamName>{game.homeTeam.name}</TeamName>
                <TeamGoals>{game.homeTeam.goals}</TeamGoals>
                <TeamShots>{game.homeTeam.shots} SOG</TeamShots>
                {game.powerplay &&
                  game.homeTeam.skaters > game.awayTeam.skaters && (
                    <GameSpecial>
                      <span>
                        {game.homeTeam.skaters === 5 &&
                        game.awayTeam.skaters === 4
                          ? 'Power Play'
                          : `${game.homeTeam.skaters} on ${
                              game.awayTeam.skaters
                            }`}
                      </span>
                      <span>{game.powerplayTime}</span>
                    </GameSpecial>
                  )}
                {game.homeTeam.emptyNet && (
                  <GameSpecial away>Empty Net</GameSpecial>
                )}
              </TeamColumn>
            </GameContainer>
          ))}
        </GameList>
        <PlayList>
          {this.state.plays.map(play => {
            return (
              <Play key={play.result.eventCode} theme={play.result.eventTypeId}>
                {['GOAL', 'PENALTY'].includes(play.result.eventTypeId) ? (
                  <Fragment>
                    <PlayLogo
                      src={`logos/logo_${teams[
                        play.team.id
                      ].toLowerCase()}.svg`}
                    />
                    <PlayTitle>
                      {play.result.description
                        .replace(', assists: none', '')
                        .replace(', assists:', ' assisted by')
                        .replace(/ \(\d+\)/g, '')
                        .replace(', ', ' and ')
                        .replace(
                          play.result.secondaryType,
                          play.result.secondaryType.toLowerCase()
                        )
                        .replace('deflected', 'deflection')
                        .replace(
                          'interference - goalkeeper',
                          'goaltender interference'
                        )}
                    </PlayTitle>
                    <PlayTime>
                      <span>{play.about.ordinalNum}</span>
                      <span>{play.about.periodTime}</span>
                    </PlayTime>
                  </Fragment>
                ) : (
                  <Fragment>
                    <PlayLogo
                      src={`logos/logo_${play.awayTeam.name.toLowerCase()}.svg`}
                    />
                    <PlayTitle>
                      {play.result.eventTypeId === 'PERIOD_START'
                        ? 'Start'
                        : 'End'}{' '}
                      of {play.about.ordinalNum} Period
                    </PlayTitle>
                    <PlayLogo
                      src={`logos/logo_${play.homeTeam.name.toLowerCase()}.svg`}
                    />
                  </Fragment>
                )}
              </Play>
            );
          })}
        </PlayList>
        <CommentList>
          {this.state.games
            .filter(game => this.state.comments[game.id])
            .map(game =>
              this.state.comments[game.id].data[1].data.children.slice(
                0,
                this.state.comments[game.id].data[1].data.children.length - 1
              )
            )
            .map(comments =>
              comments.map(comment => {
                return (
                  <Comment key={comment.data.id}>
                    <CommentLogo
                      src={
                        /([A-Z]{3}) - (NHL|Bandwagon)/.test(
                          comment.data.author_flair_text
                        )
                          ? `logos/logo_${/([A-Z]{3}) - (NHL|Bandwagon)/
                              .exec(comment.data.author_flair_text)[1]
                              .toLowerCase()}.svg`
                          : 'logos/logo_nhl.svg'
                      }
                    />
                    <CommentBody>
                      <CommentAuthor>{comment.data.author}</CommentAuthor>
                      <CommentText
                        dangerouslySetInnerHTML={{
                          __html: decode(comment.data.body_html)
                        }}
                      />
                    </CommentBody>
                  </Comment>
                );
              })
            )}
        </CommentList>
      </Container>
    );
  }
}
