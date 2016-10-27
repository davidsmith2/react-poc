import {connect} from 'react-redux';

import {Panel} from './components';

function mapStateToProps(state) {
    return {
        content: state.content,
        list: state.list,
        assessments: state.assessments,
        academicYears: state.academicYears,
        admins: state.admins,
        fetching: state.fetching
    };
}

export const PanelContainer = connect(
    mapStateToProps
)(Panel);
