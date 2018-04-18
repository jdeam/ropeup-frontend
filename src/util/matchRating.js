import moment from 'moment';

export function calculateTotalMatch(user, match) {
  let { matchRating } = match;
  matchRating *= 1.3;
  if (user.gym === match.gym) {
    matchRating = (matchRating+1)/2.4;
  }
  if (user.lead === match.lead && user.tr === match.tr) {
    matchRating = (matchRating+1)/2.4;
  }
  const userAvgGrade = (user.grade_low + user.grade_high)/2;
  const matchAvgGrade = (match.grade_low + match.grade_high)/2;
  if (Math.abs(userAvgGrade-matchAvgGrade) < 1) {
    matchRating = (matchRating+1)/2.4;
  }
  let userYears = moment(user.start_year, 'YYYY').fromNow('years').split(' ')[0];
  let matchYears = moment(match.start_year, 'YYYY').fromNow('years').split(' ')[0];
  if (userYears === 'a') userYears = 1;
  if (matchYears === 'a') matchYears = 1;
  userYears = parseInt(userYears, 10);
  matchYears = parseInt(matchYears, 10);
  if (Math.abs(userYears-matchYears) < 2) matchRating = (matchRating+1)/2.4;

  return matchRating;
}
