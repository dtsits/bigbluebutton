import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';
import Styled from './styles';
import UserListParticipants from './user-participants/user-list-participants/component';
import ChatList from './user-messages/chat-list/component';
import UserNotesContainer from './user-notes/container';
import TimerContainer from './timer/container';
import UserCaptionsContainer from './user-captions/container';
import GuestPanelOpenerContainer from '../user-list-graphql/user-participants-title/guest-panel-opener/component';
import UserPollsContainer from './user-polls/container';
import BreakoutRoomContainer from './breakout-room/container';
import { isChatEnabled } from '/imports/ui/services/features';
import UserTitleContainer from '../user-list-graphql/user-participants-title/component';

const propTypes = {
  currentUser: PropTypes.shape({}).isRequired,
  isTimerActive: PropTypes.bool.isRequired,
};

const ROLE_MODERATOR = Meteor.settings.public.user.role_moderator;

class UserContent extends PureComponent {
  render() {
    const {
      currentUser,
      isTimerActive,
      compact,
    } = this.props;

    return (
      <Styled.Content data-test="userListContent">
        {isChatEnabled() ? <ChatList /> : null}
        {currentUser?.role === ROLE_MODERATOR ? <UserCaptionsContainer /> : null}
        <UserNotesContainer />
        {isTimerActive && <TimerContainer isModerator={currentUser?.role === ROLE_MODERATOR} />}
        {currentUser?.role === ROLE_MODERATOR ? (
          <GuestPanelOpenerContainer />
        ) : null}
        <UserPollsContainer isPresenter={currentUser?.presenter} />
        <BreakoutRoomContainer />
        <UserTitleContainer />
        <UserListParticipants compact={compact} />
      </Styled.Content>
    );
  }
}

UserContent.propTypes = propTypes;

export default UserContent;
