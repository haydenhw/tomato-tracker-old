import React from 'react';
import { connect } from 'react-redux';
import LogTable from '../components/LogTable'

const Log = ({ entries }) => {
  return <LogTable entries={entries} />
}

const mapStateToProps = state => {
  const { log } = state;
  const { entries } = log;

  return {
    entries,
  }
}

export default connect(mapStateToProps)(Log);
