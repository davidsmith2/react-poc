import {core} from './core';

const STATE = {
    list: {
        'SAT & SAT Subject': {
            enabled: false
        },
        'PSAT/NMSQT': {
            enabled: false
        },
        'PSAT 10': {
            enabled: false
        },
        'PSAT 8/9 - Fall': {
            enabled: false
        },
        'PSAT 8/9 - Spring': {
            enabled: false
        }
    },
    fetching: false,
    assessments: [],
    academicYears: [],
    admins: [],
    content: {
        title: '',
        description: ''
    }
};

function changeState(oldState, newState) {
    return Object.assign({}, oldState, newState);
}

export function reducer(state = STATE, action) {
    switch(action.type) {
        case 'REQUEST_CONTENT':
            return changeState(state, core.requestContent());
        case 'RECEIVE_CONTENT':
            return changeState(state, core.receiveContent(action.data));
        case 'REQUEST_ASSESSMENTS':
            return changeState(state, core.requestAssessments());
        case 'RECEIVE_ASSESSMENTS':
            return changeState(state, core.receiveAssessments(action.data));
        case 'REQUEST_ACADEMIC_YEARS':
            return changeState(state, core.requestAcademicYears());
        case 'RECEIVE_ACADEMIC_YEARS':
            return changeState(state, core.receiveAcademicYears(action.data));
        case 'REQUEST_ADMINS':
            return changeState(state, core.requestAdmins());
        case 'RECEIVE_ADMINS':
            return changeState(state, core.receiveAdmins(action.data));
    }
    return state;
}
