import SendBird from 'sendbird';

const APP_ID = process.env.REACT_APP_SENDBIRD_APP_ID;

export const sbConnect = (userId, nickname) => {
  return new Promise((resolve, reject) => {
    const sb = new SendBird({ appId: APP_ID });
    sb.connect(userId, (user, error) => {
      if (error) reject('Sendbird login failed.');
      else sb.updateCurrentUserInfo(nickname, null, (user, error) => {
        if (error) reject('Update user failed.');
        else resolve(user);
      })
    });
  });
}

export const sbDisconnect = () => {
  return new Promise((resolve, reject) => {
    const sb = SendBird.getInstance();
    console.log(sb);
    // if (sb) sb.disconnect(() => {
    //   resolve(null);
    // });
    // else resolve(null);
  });
}
