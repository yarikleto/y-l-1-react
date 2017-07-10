import React from 'react';
import { LecturesFilter, LecturesList } from '../../components';
import { inject, observer } from 'mobx-react';
import './Main.component.css';

const Main = inject('store')(
  observer(({ store }) => {
    return (
      <main className="main">
        <h1 className="main__title">Расписание лекций проекта «Мобилизация»</h1>
        <div className="main__lectures-timetable">
          <LecturesFilter/>
          <LecturesList lectures={store.filteredLectures}/>
        </div>
      </main>
    );
  })
);

export default Main;
