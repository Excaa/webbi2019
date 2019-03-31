import React, { FunctionComponent } from 'react';
import { NavLink } from 'react-router-dom';
import { Moment } from 'moment';

import { Program, sortAndGroupForTimetable } from '../../logic/Program';
import { ProgramListItem } from './ProgramItem';

const TimetableNavItem: FunctionComponent<{date: Moment, text: string}> = ({ date, text }) => (
  <NavLink to={`/programs/timetable/${date.format('DDMM')}`}>
    {text} ({date.format('D.M.')})
  </NavLink>
);

const TimetableNav: FunctionComponent<{prev: Moment | null, next: Moment | null, title?: string}> = ({ prev, next, title }) => (
  <ul className='timetable-nav'>
    {title && (
      <li className='navitem -title'>
        <h3>{ title }</h3>
      </li>
    )}
    <li className='navitem -prev'>
      {prev && (<TimetableNavItem text='Edellinen päivä' date={ prev } />)}
    </li>
    <li className='navitem -next'>
      {next && (<TimetableNavItem text='Seuraava päivä' date={ next } />)}
    </li>
  </ul>
);

const ProgramTimetable: FunctionComponent<{programs: Program[], date: Moment}> = ({ programs, date }) => {
  if (programs && programs.length > 0) {
    const toShow = sortAndGroupForTimetable(programs, date);
    return (
      <div>
        <TimetableNav
          prev={toShow.prev}
          next={toShow.next}
          title={ toShow.date.format('D.M.') }
        />
        {toShow.programs.map((p: Program, i: number) => (
          <ProgramListItem key={i} {...p} />
        ))}
        <TimetableNav prev={toShow.prev} next={toShow.next} />
      </div>
    );
  } else {
    return (<div></div>);
  }
};

export default ProgramTimetable;
