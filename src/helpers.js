const DATA = {
    CONTENT: {
        title: 'Roster Reports',
        description: `<ul>
            <li>blah blah blah</li>
            <li>blah blah blah</li>
            <li>blah blah blah</li>
        </ul>
        <p>blah blah blah</p>`
    },
    ASSESSMENTS: [
        {assessment: 'SAT', administered: false},
        {assessment: 'SAT Subject', administered: false},
        {assessment: 'PSAT/NMSQT', administered: true},
        {assessment: 'PSAT 10', administered: false},
        {assessment: 'PSAT 8/9', administered: true}
    ],
    ACADEMIC_YEARS: [
        {academicYear: '2018'}
    ],
    ADMINS: [
        {admin: 'Spring'}
    ]
};

export function fetch(resourceType) {
    function request() {
        return {type: 'REQUEST_' + resourceType};
    }
    function receive(data) {
        return {type: 'RECEIVE_' + resourceType, data};
    }
    this.dispatch(request());
    setTimeout(() => {
        this.dispatch(receive(DATA[resourceType]));
    }, 2000);
}
