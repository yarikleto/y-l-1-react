import React from 'react';
import { inject, observer } from 'mobx-react';
import './LecturesFilter.component.css';
import classNames from 'classnames';

const LecturesFilter = inject('store')(
  observer(({ store }) => {
    return (
      <div className="lectures-filter">
        <div
          className={classNames('lectures-filter__toggle', {
            active: store.filterInputs.toggle,
          })}
          onClick={store.switchActivationFilterToggle}
        >
          Фильтры
        </div>
        <div className="lectures-filter__content">
          <div className="lectures-filter__date">
            <div className="lectures-filter__date-title">Выбрать дату</div>
            <input
              type="date"
              className="lectures-filter__date-input"
              onChange={store.syncDateInputWithStore}
            />
          </div>
          <div className="lectures-filter__school">
            <div
              className={classNames('lectures-filter__school-title', {
                active: store.filterInputs.school.buttonIsActive,
              })}
              onClick={store.switchActivationFilterSchoolTitle}
            >
              Выбрать школу
            </div>
            <div className="lectures-filter__school-content">
              {getSchoolItems()}
            </div>
          </div>
          <div className="lectures-filter__lector">
            <div
              className={classNames('lectures-filter__lector-title', {
                active: store.filterInputs.lector.buttonIsActive,
              })}
              onClick={store.switchActivationFilterLectorTitle}
            >
              По лекторам
            </div>
            <div className="lectures-filter__lector-content">
              {getLectorItems()}
            </div>
          </div>
        </div>
      </div>
    );

    function getSchoolItems() {
      const schoolItems = store.filterInputs.school.schoolItems;
      return schoolItems.map(({ name, checked, id }) => {
        return (
          <div
            key={id}
            className={classNames('lectures-filter__school-item', {
              active: checked,
            })}
            onClick={store.activateSchoolItemById(id)}
          >
            {name}
          </div>
        );
      });
    }

    function getLectorItems() {
      const lectorItems = store.filterInputs.lector.lectorItems;
      return lectorItems.map(({ name, checked, id }) => {
        return (
          <div
            key={id}
            className={classNames('lectures-filter__lector-item', {
              active: checked,
            })}
            onClick={store.activateLectorItemById(id)}
          >
            {name}
          </div>
        );
      });
    }
  })
);

export default LecturesFilter;
