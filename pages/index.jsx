import React, { Component, Fragment } from 'react';
import styled, { css, keyframes } from 'styled-components';
import axios from 'axios';
import moment from 'moment';

axios.defaults.baseURL = 'https://statsapi.web.nhl.com/';

const logos = {
  ANA: {
    common: css`
      background-size: 150%;
      background-image: url(/static/logos/logo_ana.svg);
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
      background-image: url(/static/logos/logo_ari.svg);
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
      background-image: url(/static/logos/logo_bos.svg);
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
      background-image: url(/static/logos/logo_buf.svg);
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
      background-image: url(/static/logos/logo_car.svg);
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
      background-image: url(/static/logos/logo_cbj.svg);
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
      background-image: url(/static/logos/logo_cgy.svg);
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
      background-image: url(/static/logos/logo_chi.svg);
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
      background-image: url(/static/logos/logo_col.svg);
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
      background-image: url(/static/logos/logo_dal.svg);
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
      background-image: url(/static/logos/logo_det.svg);
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
      background-image: url(/static/logos/logo_edm.svg);
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
      background-image: url(/static/logos/logo_fla.svg);
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
      background-image: url(/static/logos/logo_lak.svg);
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
      background-image: url(/static/logos/logo_min.svg);
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
      background-image: url(/static/logos/logo_mtl.svg);
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
      background-image: url(/static/logos/logo_njd.svg);
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
      background-image: url(/static/logos/logo_nsh.svg);
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
      background-image: url(/static/logos/logo_nyi.svg);
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
      background-image: url(/static/logos/logo_nyr.svg);
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
      background-image: url(/static/logos/logo_ott.svg);
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
      background-image: url(/static/logos/logo_phi.svg);
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
      background-image: url(/static/logos/logo_pit.svg);
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
      background-image: url(/static/logos/logo_sjs.svg);
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
      background-image: url(/static/logos/logo_stl.svg);
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
      background-image: url(/static/logos/logo_tbl.svg);
    `,
    away: css`
      background-position: 100% 50%;
    `,
    home: css`
      background-position: 100% 50%;
      transform: scaleX(-1);
    `
  },
  TOR: {
    common: css`
      background-size: 125%;
      background-image: url(/static/logos/logo_tor.svg);
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
      background-image: url(/static/logos/logo_van.svg);
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
      background-image: url(/static/logos/logo_vgk.svg);
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
      background-image: url(/static/logos/logo_wpg.svg);
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
      background-image: url(/static/logos/logo_wsh.svg);
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
  display: flex;
  padding: 16px;
`;

const GameList = styled.div`
  width: 960px;
  margin-right: 16px;

  > * + * {
    margin-top: 16px;
  }
`;

const PlayList = styled.div`
  flex: 1;
  display: flex;
  flex-direction: column;

  > * + * {
    margin-top: 16px;
  }
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
  font-family: 'Roboto';
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
  padding: 32px;
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
  position: absolute;
  display: flex;
  top: 0;
  left: 0;
  right: 0;
  padding: 16px;
  z-index: 2;

  a {
    flex: 1;
  }

  span {
    text-align: center;
  }

  span + a {
    flex: 1;
    text-align: right;
  }
`;

const GameLink = styled.a`
  font-size: 14px;
  color: #6a6a6a;
  text-decoration: none;
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
  font-size: 24px;
  font-weight: 500;
`;

const GameClock = styled.span`
  display: flex;
  justify-content: center;
  align-items: center;
  font-size: 24px;
  line-height: 2;

  ${props => props.stopped && 'color: #e53935;'};
`;

const GameSpecial = styled.span`
  display: flex;
  flex-direction: column;
  margin-top: 32px;
  font-size: 18px;
  line-height: 1.6;

  ${TeamColumn} & {
    width: 80px;
    text-align: center;
    margin-top: 0;
    position: absolute;
    top: 50%;
    ${props => (props.away ? 'right: 16px' : 'left: 16px')};
    transform: translateY(-50%);
  }
`;

export default class extends Component {
  state = {
    games: [],
    plays: []
  };

  async componentDidMount() {
    this.fetchGames();
    setInterval(this.fetchGames, 1000 * 15);
  }

  fetchGames = async () => {
    const scheduleResponse = await axios.get('/api/v1/schedule');
    const redditResponse = await axios.get(
      'https://www.reddit.com/r/hockey/search.json?q=flair%3A%22%5BGDT%5D%22+OR+flair%3A%22%5BGDT+Playoffs%5D%22&restrict_sr=on&sort=new&t=day'
    );
    const gameResponses = await Promise.all(
      scheduleResponse.data.dates.reduce(
        (acc, date) => acc.concat(date.games.map(game => axios.get(game.link))),
        []
      )
    );

    const games = gameResponses.map(gameResponse => ({
      id: gameResponse.data.gamePk,
      ...gameResponse.data.gameData,
      ...gameResponse.data.liveData
    }));
    const posts = redditResponse.data.data.children.map(post => post.data);

    this.setState({
      games: games.map(game => {
        return {
          id: game.id,
          date: moment(game.datetime.dateTime),
          gdt: posts.find(
            post =>
              post.title.includes(game.teams.away.name) &&
              post.title.includes(game.teams.home.name)
          ),
          status: parseInt(game.status.statusCode),
          period: game.linescore.currentPeriodOrdinal,
          time: game.linescore.currentPeriodTimeRemaining,
          stopped:
            game.plays.currentPlay &&
            game.plays.currentPlay.result.eventTypeId === 'STOP',
          intermission:
            game.linescore.intermissionInfo.intermissionTimeRemaining,
          powerplay:
            game.linescore.powerPlayInfo &&
            game.linescore.powerPlayInfo.inSituation,
          powerplayTime:
            game.linescore.powerPlayInfo &&
            `${Math.floor(
              game.linescore.powerPlayInfo.situationTimeRemaining / 60
            )}:${(
              '00' +
              Math.floor(
                game.linescore.powerPlayInfo.situationTimeRemaining % 60
              )
            ).slice(-2)}`,
          homeTeam: {
            name: game.teams.home.abbreviation,
            goals: game.linescore.teams.home.goals,
            shots: game.linescore.teams.home.shotsOnGoal,
            skaters: game.linescore.teams.home.numSkaters,
            emptyNet: game.linescore.teams.home.goaliePulled
          },
          awayTeam: {
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

  render() {
    return (
      <Container>
        <UpdateTimer />
        <GameList>
          {this.state.games.map(game => (
            <GameContainer key={game.id}>
              {game.gdt && (
                <GameHeader>
                  <GameLink
                    href={`https://reddit.com/comments/${game.gdt.id}/`}
                    target="_blank"
                  >
                    Game Thread
                  </GameLink>
                  <span>{game.date.format('ddd, MMM DD [at] h:mm A')}</span>
                  <GameLink
                    href={`https://reddit-stream.com/comments/${game.gdt.id}/`}
                    target="_blank"
                  >
                    Comment Stream
                  </GameLink>
                </GameHeader>
              )}
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
                {game.status <= 2 && (
                  <GamePeriod>{game.date.format('h:mm A')}</GamePeriod>
                )}

                {game.time !== 'END' &&
                  game.time !== 'Final' && (
                    <Fragment>
                      <GamePeriod>{game.period}</GamePeriod>
                      <GameClock stopped={game.stopped}>{game.time}</GameClock>
                      {game.powerplay &&
                        game.awayTeam.skaters === game.homeTeam.skaters && (
                          <GameSpecial>
                            <span>
                              {game.awayTeam.skaters} on {game.homeTeam.skaters}
                            </span>
                            <span>{game.powerplayTime}</span>
                          </GameSpecial>
                        )}
                    </Fragment>
                  )}

                {game.time === 'END' && (
                  <Fragment>
                    <GamePeriod>End of {game.period}</GamePeriod>
                    <GameSpecial>
                      <span>Intermission</span>
                      <span>
                        {Math.floor(game.intermission / 60)}:{(
                          '00' + Math.floor(game.intermission % 60)
                        ).slice(-2)}
                      </span>
                    </GameSpecial>
                  </Fragment>
                )}

                {game.time === 'Final' && <GamePeriod>Final</GamePeriod>}
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
          {this.state.plays.map(play => (
            <Play key={play.result.eventCode} theme={play.result.eventTypeId}>
              {['GOAL', 'PENALTY'].includes(play.result.eventTypeId) ? (
                <Fragment>
                  <PlayLogo
                    src={`/static/logos/logo_${play.team.triCode.toLowerCase()}.svg`}
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
                    src={`/static/logos/logo_${play.awayTeam.name.toLowerCase()}.svg`}
                  />
                  <PlayTitle>
                    {play.result.eventTypeId === 'PERIOD_START'
                      ? 'Start'
                      : 'End'}{' '}
                    of {play.about.ordinalNum} Period
                  </PlayTitle>
                  <PlayLogo
                    src={`/static/logos/logo_${play.homeTeam.name.toLowerCase()}.svg`}
                  />
                </Fragment>
              )}
            </Play>
          ))}
        </PlayList>
      </Container>
    );
  }
}
