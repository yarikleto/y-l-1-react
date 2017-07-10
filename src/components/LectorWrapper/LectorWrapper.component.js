import React from 'react';
import './LectorWrapper.component.css';
import { inject, observer } from 'mobx-react';
import classNames from 'classnames';

const LectorWrapper = inject('store')(
  observer(({ store, lectorInfo, lectorId }) => {
    return (
      <div className="main__name-of-lector-wrapper">
        <div
          className={classNames(
            'main__name-of-lector',
            {
              'active': lectorId === store.activeUserInfoId,
            }
          )}
          
          onClick={store.displayLectorInfoById(lectorId)}
        >
          {lectorInfo.name}
        </div>
        <div className="main__lector-info">
          <div className="container">
            <div className="main__lector-photo-wrapper">
              <img
                className="main__lector-photo"
                src={lectorInfo.photoUrl}
                alt="Фото лектора"
              />
            </div>
            <div className="main__lector-description">
              <div className="main__desc-name">
                {lectorInfo.name}
              </div>
              <div className="main__desc-about">
                {lectorInfo.aboutLector}
              </div>
            </div>
          </div>

          <div
            className="main__close-info"
            onClick={store.closeLectorInfo}
          />
        </div>
      </div>
    );
  })
);

export default LectorWrapper;
