import React from 'react';
import PropTypes from 'prop-types';
import { hashHistory } from 'react-router';

import Nag from '../components/Nag';
import Modal from './Modal';

export default function ProjectNagModal(props) {
  
  return (
    <Modal>
        <Nag 
          nagMessage="Please add a project before continuing"
          onAccept={() => hashHistory.push("/projects/new")}
          title="No projects added yet"
        />
      </Modal>  
    );
  }


ProjectNagModal.propTypes = {
  
}
