import SendBird from 'sendbird';

const APP_ID = process.env.REACT_APP_SENDBIRD_APP_ID;

export const sbConnect = (userId) => {
  return new Promise((resolve, reject) => {
    const sb = new SendBird({ appId: APP_ID });
    sb.connect(userId, (user, error) => {
      if (error) reject('Sendbird login failed.');
      else resolve(user);
    });
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

export const sbGetChannels = () => {
  return new Promise((resolve, reject) => {
    const sb = SendBird.getInstance();
    if (sb) {
      const channelListQuery = sb.GroupChannel.createMyGroupChannelListQuery();
      if (channelListQuery.hasNext) {
        channelListQuery.next((channels, error) => {
          if (error) reject('No channels found.');
          else resolve(channels);
        });
      }
    }
  });
};

// export const sbCreateChannel = (recipientId) => {
//   return new Promise((resolve, reject) => {
//     const sb = SendBird.getInstance();
//     if (sb) {
//       sb.GroupChannel.createChannelWithUserIds(
//         [recipientId],
//         true,
//         null,
//         null,
//         null,
//         null,
//         (createdChannel, error) => {
//           return error ? console.error(error) : createdChannel;
//         }
//       );
//     }
//   });
// };
