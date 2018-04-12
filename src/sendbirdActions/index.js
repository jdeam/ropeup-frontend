import SendBird from 'sendbird';

const APP_ID = process.env.REACT_APP_SENDBIRD_APP_ID;

export const sbConnect = (userId) => {
  return new Promise((resolve, reject) => {
    let data = {}
    const sb = new SendBird({ appId: APP_ID });
    sb.connect(userId, (user, error) => {
      if (error) {
        reject('Sendbird login failed.');
      } else {
        data.user = user;
        const channelListQuery = sb.GroupChannel.createMyGroupChannelListQuery();
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

export const sbGetChannels = () => {
  return new Promise((resolve, reject) => {
    const sb = SendBird.getInstance();
    const channelListQuery = sb.GroupChannel.createMyGroupChannelListQuery();
    if (channelListQuery.hasNext) {
      channelListQuery.next((channels, error) => {
        if (error) reject('No channels found.');
        else resolve(channels);
      });
    };
  });
};


export const sbCreateChannel = (recipientId) => {
  return new Promise((resolve, reject) => {
    const sb = SendBird.getInstance();
    if (sb) {
      sb.GroupChannel.createChannelWithUserIds(
        [recipientId],
        true,
        null,
        null,
        null,
        null,
        (createdChannel, error) => {
          return error ?
          reject('Channel could not be created') :
          resolve(createdChannel);
        }
      );
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
