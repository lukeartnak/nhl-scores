import React, { Fragment } from "react";
import styled, { css } from "styled-components";

import { Logo, teams } from "./logo";

const GameViewWrapper = styled.div`
  grid-area: game-view;
  display: grid;
  grid-gap: 16px;
  grid-template-columns: 2fr 1fr;
  grid-template-rows: 320px auto;
  grid-template-areas:
    "boxscore plays"
    "comments plays";

  @media (max-width: 1268px) {
    grid-template-columns: 1fr;
    grid-template-rows: 320px auto;
    grid-template-areas:
      "boxscore"
      "plays"
      "comments";
  }
`;

const BoxscoreSection = styled.section`
  grid-area: "boxscore";
  position: relative;
  display: flex;
  background: #ffffff;
`;

const PlaysSection = styled.section`
  grid-area: "plays";
`;

const CommentsSection = styled.section`
  grid-area: "comments";
`;

const GameTitle = styled.div`
  display: flex;
  flex-direction: column;
  position: absolute;
  top: 16px;
  left: 0;
  right: 0;
  text-align: center;
  line-height: 1.6;
  z-index: 1;
`;

const TeamColumn = styled.div`
  flex: 1;
  position: relative;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  font-weight: 900;

  * {
    position: relative;
  }
`;

const TeamLogo = styled.div`
  position: absolute;
  top: 0;
  bottom: 0;
  left: 0;
  right: 0;
  opacity: .05;
  background-image: url('logos/logo_${(props) =>
    props.team.toLowerCase()}.svg');  
  background-repeat: no-repeat;
  ${(props) => teams[props.team].common};
  ${(props) => teams[props.team][props.side]};
`;

const TeamName = styled.span`
  font-size: 32px;
`;

const TeamGoals = styled.span`
  font-size: 96px;
  line-height: 112px;
`;

const TeamShots = styled.span`
  font-size: 16px;
  text-transform: uppercase;
`;

const StatusColumn = styled.div`
  min-width: 200px;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  font-size: 24px;
`;

const GamePeriod = styled.span`
  font-weight: 500;
`;

const GameClock = styled.span`
  text-align: center;
  font-weight: 400;
  line-height: 2;

  ${(props) => props.stopped && "color: #e53935;"};
`;

const specialTeamStyles = {
  even: css`
    right: 50%;
    bottom: 24px;
    transform: translateX(50%);
  `,
  away: css`
    top: 50%;
    right: 50%;
    transform: translateX(-250%) translateY(-50%);
  `,
  home: css`
    top: 50%;
    right: 50%;
    transform: translateX(350%) translateY(-50%);
  `,
};

const SpecialTeam = styled.div`
  display: flex;
  flex-direction: column;
  position: absolute;
  font-size: 18px;
  ${(props) => specialTeamStyles[props.side]};
`;

const themes = {
  GOAL: "rgba(76, 175, 80, 0.1)",
  PENALTY: "rgba(244, 67, 54, 0.1)",
  PERIOD_START: "rgba(33, 150, 243, .1)",
  PERIOD_END: "rgba(33, 150, 243, .1)",
  GAME_END: "rgba(255, 193, 7, .2)",
};

const Play = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 16px;
  background: ${(props) => themes[props.type]};
  margin-bottom: 16px;
`;

const PlayLogo = styled(Logo)`
  max-width: 40px;
  max-height: 40px;
  flex-basis: 48px;
`;

const PlayTitle = styled.span`
  flex: 1;
  text-align: center;
  margin: 0 16px;
  line-height: 1.6;
`;

const PlayTime = styled.div`
  display: flex;
  flex-direction: column;
  text-align: center;
  flex-basis: 48px;

  span:first-of-type {
    font-weight: 500;
    margin-bottom: 8px;
  }

  span:last-of-type {
    font-size: 16px;
  }
`;

const Comment = styled.div`
  display: flex;
  align-items: flex-start;
  background: #ffffff;
  padding: 16px;
  font-family: "Roboto";
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

const CommentLogo = styled(Logo)`
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

export function GameView({ date, title, home, away, status, plays, comments }) {
  const showDate = !status.started && !status.ended && !status.intermission;
  const showPeriod = status.started && !status.ended && !status.intermission;
  const showFinal = status.started && status.ended && !status.intermission;
  const showIntermission =
    status.started && !status.ended && status.intermission;
  const showPowerplay = status.started && !status.ended && status.powerplay;
  return (
    <GameViewWrapper>
      <BoxscoreSection>
        <GameTitle>
          <span>
            {away.name} at {home.name}
          </span>
          <span>{title}</span>
        </GameTitle>
        <TeamColumn>
          <TeamLogo team={away.code} side="away" />
          <TeamName>{away.code}</TeamName>
          <TeamGoals>{away.goals}</TeamGoals>
          <TeamShots>{away.shots} Shots</TeamShots>
        </TeamColumn>
        <StatusColumn>
          {showDate && (
            <Fragment>
              <GamePeriod>{date.format("ddd Do")}</GamePeriod>
              <GameClock>{date.format("h:mm A")}</GameClock>
            </Fragment>
          )}
          {showPeriod && (
            <Fragment>
              <GamePeriod>{status.periodOrdinal}</GamePeriod>
              <GameClock stopped={status.stopped}>
                {status.periodClock}
              </GameClock>
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
        <TeamColumn>
          <TeamLogo team={home.code} side="home" />
          <TeamName>{home.code}</TeamName>
          <TeamGoals>{home.goals}</TeamGoals>
          <TeamShots>{home.shots} Shots</TeamShots>
        </TeamColumn>
        {showPowerplay && (
          <SpecialTeam side={status.powerplaySide}>
            {home.skaters > away.skaters ? (
              <GamePeriod>
                {home.skaters} on {away.skaters}
              </GamePeriod>
            ) : (
              <GamePeriod>
                {away.skaters} on {home.skaters}
              </GamePeriod>
            )}
            <GameClock>{status.powerplayClock}</GameClock>
          </SpecialTeam>
        )}
      </BoxscoreSection>
      <PlaysSection>
        {plays.map((play) => (
          <Play key={play.id} type={play.type}>
            <PlayLogo team={play.team ? play.team : away.code} />
            <PlayTitle>{play.title}</PlayTitle>
            {play.team ? (
              <PlayTime>
                <span>{play.period}</span>
                <span>{play.time}</span>
              </PlayTime>
            ) : (
              <PlayLogo team={home.code} />
            )}
          </Play>
        ))}
      </PlaysSection>
      <CommentsSection>
        {comments.slice(0, 20).map((comment) => (
          <Comment key={comment.id}>
            <CommentLogo team={comment.team} />
            <CommentBody>
              <CommentAuthor>{comment.author}</CommentAuthor>
              <CommentText dangerouslySetInnerHTML={{ __html: comment.body }} />
            </CommentBody>
          </Comment>
        ))}
      </CommentsSection>
    </GameViewWrapper>
  );
}
