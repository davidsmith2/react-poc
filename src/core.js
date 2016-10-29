export const core = {
    requestContent() {
        console.log('requesting content...')
        return {fetching: 'content'};
    },
    receiveContent(data) {
        console.log('receiving content...')
        return {content: data, fetching: false};
    },
    requestAssessments() {
        console.log('requesting assessments...')
        return {fetching: 'assessments'};
    },
    receiveAssessments(data) {
        console.log('receiving assessments...')
        return {assessments: data, fetching: false};
    },
    requestAcademicYears() {
        console.log('requesting academic years...')
        return {fetching: 'academic years'};
    },
    receiveAcademicYears(data) {
        console.log('receiving academic years...')
        return {academicYears: data, fetching: false};
    },
    requestAdmins() {
        console.log('requesting admins...')
        return {fetching: 'admins'};
    },
    receiveAdmins(data) {
        console.log('receiving admins...')
        return {admins: data, fetching: false};
    }
};
