import React, { Fragment } from 'react';
import FontAwesome from 'react-fontawesome';
import './MatchDetail.css';

const MatchImage = ({ zip, match, history }) => {
  const rating = `${(match.matchRating*100).toFixed()}% Match`;
  return (
    <Fragment>
      <div className="matchdetail-header-container">
        <div className="matchdetail-header">
          <div className="matchdetail-header-left">
            <a
              className="matchdetail-header-back-nav"
              onClick={ () => history.goBack() }
            >
              <FontAwesome
                className="fa-2x"
                name="angle-left"
              />
            </a>
          </div>
          <div className="matchdetail-header-center">
            <div className="matchdetail-name-rating">
              <div className="matchdetail-name">
                { match.username }
              </div>
              <div className="matchdetail-rating">
                { rating }
              </div>
            </div>
          </div>
          <div className="matchdetail-header-right">
          </div>
        </div>
      </div>
      <div className="matchdetail-img-container">
        <div className="image matchdetail-img">
          <img
            src={ match.img_url }
            className="match-image"
            alt=""
          />
        </div>
      </div>
    </Fragment>
  );
}

export default MatchImage;
