import axios from 'axios';
import moment from 'moment';
import decode from 'decode-html';

const periodNames = {
  1: '1st Period',
  2: '2nd Period',
  3: '3rd Period',
  4: 'Overtime',
  5: 'Double Overtime',
  6: 'Triple Overtime'
};

const periodOrdinals = {
  1: '1st',
  2: '2nd',
  3: '3rd',
  4: 'OT',
  5: '2OT',
  6: '3OT'
};

const titles = {
  GAME_START: () => 'Start of Game',
  PERIOD_START: period => `Start of ${period}`,
  PERIOD_END: period => `End of ${period}`,
  GAME_END: () => 'End of Game'
};

function formatMinutes(minutes) {
  const m = Math.floor(minutes / 60);
  const s = Math.floor(minutes % 60);
  return `${m}:${('00' + s).slice(-2)}`;
}

export async function fetchUpcomingGames() {
  const startDate = moment()
    .subtract(1, 'days')
    .format('YYYY-MM-DD');
  const endDate = moment()
    .add(1, 'days')
    .format('YYYY-MM-DD');
  const { data } = await axios.get(
    `https://statsapi.web.nhl.com/api/v1/schedule?expand=schedule.game.seriesSummary,seriesSummary.series&startDate=${startDate}&endDate=${endDate}`
  );
  return Promise.all(
    data.dates.reduce(
      (acc, date) => acc.concat(date.games.map(game => fetchGame(game))),
      []
    )
  );
}

function formatPlay(play) {
  return {
    id: play.result.eventCode,
    date: moment(play.about.dateTime),
    type: play.result.eventTypeId,
    team: play.team && play.team.triCode,
    players: play.players && play.players.map(player => player.player.fullName),
    period: periodOrdinals[play.about.period],
    time: play.about.periodTime,
    title: play.result.description
      .replace(', assists: none', '')
      .replace(', assists:', ' assisted by')
      .replace(/ \(\d+\)/g, '')
      .replace(', ', ' and ')
      .replace(
        play.result.secondaryType,
        play.result.secondaryType.toLowerCase()
      )
      .replace('delaying game -', 'delaying game by')
      .replace('delay of game -', 'delaying game by')
      .replace('deflected', 'deflection')
      .replace('interference - goalkeeper', 'goaltender interference')
  };
}

async function fetchGame({ gamePk, seriesSummary }) {
  const {
    data: {
      gameData: {
        datetime: { dateTime }
      },
      liveData: {
        plays: {
          allPlays,
          scoringPlays,
          penaltyPlays,
          currentPlay = { result: {} }
        },
        linescore: {
          currentPeriod,
          currentPeriodTimeRemaining,
          teams: { away, home },
          intermissionInfo = {},
          powerPlayInfo = {}
        }
      }
    }
  } = await axios.get(
    `https://statsapi.web.nhl.com/api/v1/game/${gamePk}/feed/live`
  );
  return {
    id: gamePk,
    date: moment(dateTime),
    title: seriesSummary && `Round ${seriesSummary.series.round.number} - ${
      seriesSummary.gameLabel
    } - ${seriesSummary.seriesStatusShort || 'Tied 0-0'}`,
    away: {
      name: away.team.name,
      code: away.team.abbreviation,
      goals: away.goals,
      shots: away.shotsOnGoal,
      skaters: away.numSkaters
    },
    home: {
      name: home.team.name,
      code: home.team.abbreviation,
      goals: home.goals,
      shots: home.shotsOnGoal,
      skaters: home.numSkaters
    },
    status: {
      started: allPlays.length > 1,
      stopped: currentPlay.result.eventTypeId === 'GAME_STOPPAGE',
      ended: currentPlay.result.eventTypeId === 'GAME_END',
      period: periodNames[currentPeriod],
      periodOrdinal: periodOrdinals[currentPeriod],
      periodClock: currentPeriodTimeRemaining,
      powerplay: !!powerPlayInfo.inSituation,
      powerplaySide:
        home.numSkaters > away.numSkaters
          ? 'home'
          : home.numSkaters < away.numSkaters
            ? 'away'
            : 'even',
      powerplayClock:
        powerPlayInfo.inSituation &&
        formatMinutes(powerPlayInfo.situationTimeRemaining),
      intermission: !!intermissionInfo.inIntermission,
      intermissionClock:
        intermissionInfo.inIntermission &&
        formatMinutes(intermissionInfo.intermissionTimeRemaining)
    },
    plays: [
      ...scoringPlays.map(i => formatPlay(allPlays[i])),
      ...penaltyPlays.map(i => formatPlay(allPlays[i])),
      ...allPlays.filter(play => titles[play.result.eventTypeId]).map(play => ({
        id: play.result.eventCode,
        date: moment(play.about.dateTime),
        type: play.result.eventTypeId,
        title: (() => {
          switch (play.result.eventTypeId) {
            case 'PERIOD_START':
              return `Start of ${periodNames[play.about.period]}`;
            case 'PERIOD_END':
              return `End of ${periodNames[play.about.period]}`;
            case 'GAME_END':
              const winnerName =
                away.goals > home.goals
                  ? away.team.abbreviation
                  : home.team.abbreviation;
              const winnerScore = Math.max(away.goals, home.goals);
              const loserScore = Math.min(away.goals, home.goals);
              return `${winnerName} wins ${winnerScore}-${loserScore}`;
            default:
              return 'Unknown';
          }
        })()
      }))
    ].sort((a, b) => b.date.diff(a.date))
  };
}

export async function fetchGameThreads(games) {
  const {
    data: {
      data: { children }
    }
  } = await axios.get(
    `https://www.reddit.com/r/hockey/search.json?q=flair%3A%22%5BGDT%5D%22+OR+flair%3A%22%5BPGT%5D%22&restrict_sr=on&sort=new&t=month`
  );

  return children.reduce((acc, child) => {
    const { id, title, created } = child.data;
    const game = games.find(game => {
      return (
        title.includes(game.home.name) &&
        title.includes(game.away.name) &&
        Math.abs(moment(created * 1000).diff(game.date, 'minutes')) < 720
      );
    });
    return game ? acc.concat({ id, game: game.id }) : acc;
  }, []);
}

function formatComment(comment) {
  const flairPattern = /([A-Z]{3}) - (NHL|Bandwagon)/;
  return {
    id: comment.id,
    author: comment.author,
    team: flairPattern.test(comment.author_flair_text)
      ? flairPattern.exec(comment.author_flair_text)[1]
      : 'nhl',
    body: decode(comment.body_html)
  };
}

export async function fetchComments(id) {
  const {
    data: [
      ,
      {
        data: { children }
      }
    ]
  } = await axios.get(`https://www.reddit.com/r/hockey/comments/${id}.json`);

  return children
    .slice(0, children.length - 1)
    .map(child => formatComment(child.data));
}
