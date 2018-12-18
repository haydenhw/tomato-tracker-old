import React from 'react';
import { connect } from 'react-redux';
import LogTable from '../components/LogTable'

const Log = ({ logs }) => <LogTable logs={logs} />

const mapStateToProps = state => {
  const { log } = state;
  const { logs } = log;
  return {
    logs,
  }
}

Log.defaultProps = {
  logs: []
}

export default connect(mapStateToProps)(Log);
