import zipcodes from 'zipcodes';

const zipSeeds = [98103, 97209];
const validZips = zipSeeds.reduce((acc, zip) => {
  const zipList = zipcodes.radius(zip, 20);
  return [ ...acc, ...zipList ];
}, []);

export default validZips;
