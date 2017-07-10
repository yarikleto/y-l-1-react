import React from 'react';
import './Lecture.component.css';
import { LectorWrapper } from '../../components';
import { observer } from 'mobx-react';

const Lecture = observer(({ lectureInfo }) => {
  return (
    <li className="main__lecture" data-display="true" data-id="1">
      <div className="main__lecture-date-wrapper">
        <div className="main__lecture-date">
          {lectureInfo.date}
        </div>
        <div className="main__lecture-time">
          {lectureInfo.time}
        </div>
      </div>
      <div className="main__name-of-school-wrapper">
        {lectureInfo.schools.map((school, i) => {
          return (
            <div className="main__name-of-school" key={i}>
              {school}
            </div>
          );
        })}
      </div>
      <div className="main__lecture-topic">
        {lectureInfo.topic}
      </div>
      <LectorWrapper
        lectorInfo={lectureInfo.lectorInfo}
        lectorId={lectureInfo.id}
      />
      <div className="main__lecture-address-wrapper">
        <div className="main__lecture-address-title">
          {lectureInfo.room}
        </div>
        <div className="main__lecture-address">
          {lectureInfo.address}
        </div>
      </div>
      <div className="main__youtube">
        <a
          className="main__youtube-link"
          href={lectureInfo.linkOfRecord}
          target="_blank"
        />
      </div>
    </li>
  );
});

export default Lecture;
