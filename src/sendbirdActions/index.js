import SendBird from 'sendbird';

const APP_ID = process.env.REACT_APP_SENDBIRD_APP_ID;

export const sbConnect = (userId, nickname, profileUrl) => {
  return new Promise((resolve, reject) => {
    let data = {}
    const sb = new SendBird({ appId: APP_ID });
    sb.connect(userId, (user, error) => {
      if (error) {
        reject('Sendbird login failed.');
      } else {
        data.user = user;
        const channelListQuery = sb.GroupChannel.createMyGroupChannelListQuery();
        channelListQuery.includeEmpty = true;
        if (channelListQuery.hasNext) {
          channelListQuery.next((channels, error) => {
            if (error) {
              reject('No channels found.');
            } else {
              data.channels = channels;
              resolve(data);
            }
          });
        }
      }
    });
  });
};

export const sbCreateChannel = (recipientId) => {
  return new Promise((resolve, reject) => {
    const sb = SendBird.getInstance();
    if (sb) {
      sb.GroupChannel.createChannelWithUserIds([recipientId], true, null, null, null, null, (createdChannel, error) => {
        if (error) {
          reject('Channel could not be created');
        } else {
          const channelListQuery = sb.GroupChannel.createMyGroupChannelListQuery();
          channelListQuery.includeEmpty = true;
          if (channelListQuery.hasNext) {
            channelListQuery.next((channels, error) => {
              if (error) reject('No channels found.');
              else resolve(channels);
            });
          }
        }
      });
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
