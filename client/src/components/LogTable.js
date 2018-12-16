import React from 'react';
import shortId from 'shortid';
import { getDuration, getNewRocordedTime } from '../helpers/logHelpers';
import { secondsToHMMSS, unixTimestampToHMM } from '../helpers/time';

import {
  Table,
  TableBody,
  TableHeader,
  TableHeaderColumn,
  TableRow,
  TableRowColumn,
} from 'material-ui/Table';

const tableHeadings = [
  'Task',
  'Start Time',
  'End Time',
  'Duration',
  'Prev Total',
  'New Total',
  'Project',
];

const renderTableHeadings = (tableHeadings) => (
  tableHeadings.map(heading => (
    <TableHeaderColumn key={shortId.generate()}>{heading}</TableHeaderColumn>
  ))
);

const renderColumn = value => (
    <TableRowColumn key={shortId.generate()}>
      {value}
    </TableRowColumn>
);

const renderRow = entry => {
  const {
    endTime,
    recordedTime,
    parentProjectName,
    startTime,
    taskName,
  } = entry;

  return (
    <TableRow key={shortId.generate()}>
      {renderColumn(taskName)}
      {renderColumn(unixTimestampToHMM(startTime))}
      {renderColumn(unixTimestampToHMM(endTime))}
      {renderColumn(getDuration(startTime, endTime))}
      {renderColumn(secondsToHMMSS(recordedTime))}
      {renderColumn(getNewRocordedTime(recordedTime, startTime, endTime))}
      {renderColumn(parentProjectName)}
    </TableRow>
  );
}

const renderRows = entries => (
  entries.map(entry => renderRow(entry))
);

const LogTable = ({ entries }) => (
  <Table>
    <TableHeader>
      <TableRow>
        {renderTableHeadings(tableHeadings)}
      </TableRow>
    </TableHeader>
    <TableBody>
      {renderRows(entries)}
    </TableBody>
  </Table>
);

export default LogTable;
