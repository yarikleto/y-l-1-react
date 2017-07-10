import React from 'react';
import {Lecture} from '../../components';
import './LecturesList.component.css';
import {observer} from 'mobx-react';

const LecturesList = observer(({lectures}) => {
  return (
    <ul className="main__lectures-list">
      {renderLectures(lectures)}
    </ul>
  );
});

export default LecturesList;

// Render functions

function renderLectures(lectures) {
  return lectures.map(lecture => {
    return <Lecture lectureInfo={lecture} key={lecture.id}/>;
  });
}
