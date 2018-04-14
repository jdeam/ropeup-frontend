import SendBird from 'sendbird';
import Promise from 'bluebird';

const APP_ID = process.env.REACT_APP_SENDBIRD_APP_ID;

export const sbConnect = (userId, nickname, profileUrl) => {
  return new Promise((resolve, reject) => {
    const sb = new SendBird({ appId: APP_ID });
    sb.connect(userId, (user, error) => {
      if (error) {
        reject('Could not connect to Sendbird.');
      } else {
        sb.updateCurrentUserInfo(nickname, profileUrl, (updatedUser, error) => {
          if (error) reject('Could not update user info.');
          else resolve(updatedUser);
        });
      }
    });
  });
};

export const sbCreateGroupChannelListQuery = () => {
  const sb = SendBird.getInstance();
  return sb.GroupChannel.createMyGroupChannelListQuery();
};

export const sbFetchGroupChannels = (groupChannelListQuery) => {
  return new Promise((resolve, reject) => {
    groupChannelListQuery.includeEmpty = true;
    groupChannelListQuery.next((channels, error) => {
      if (error) reject('No channels found');
      else resolve(channels);
    });
  });
};

export const sbUpdateUser = (nickname, profileUrl) => {
  return new Promise((resolve, reject) => {
    const sb = SendBird.getInstance();
    if (sb) sb.updateCurrentUserInfo(nickname, profileUrl, (user, error) => {
      if (error) reject('Update user failed.');
      else resolve(user);
    });
  });
};

export const sbCreateChannel = (recipientId) => {
  return new Promise((resolve, reject) => {
    const sb = SendBird.getInstance();
    if (sb) {
      sb.GroupChannel.createChannelWithUserIds([recipientId], true, null, null, null, null, (channel, error) => {
        if (error) reject('Could not create channel.');
        else resolve(channel);
      });
    }
  });
};

export const sbEnterChannel = (channelUrl) => {
  return new Promise((resolve, reject) => {
    const sb = SendBird.getInstance();
    if (sb) {
      sb.GroupChannel.getChannel(channelUrl, (channel, error) => {
        if (error) reject('Could not join channel.')
        else resolve(channel);
      })
    }
  });
};

export const sbDisconnect = () => {
  return new Promise((resolve, reject) => {
    const sb = SendBird.getInstance();
    if (sb) sb.disconnect(() => {
      resolve(null);
    });
    else resolve(null);
  });
};
