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
    ACADEMIC_YEARS: [],
    ASSESSMENTS: [
        {assessment: 'SAT', administered: true},
        {assessment: 'SAT Subject', administered: true},
        {assessment: 'PSAT/NMSQT', administered: false},
        {assessment: 'PSAT 10', administered: true},
        {assessment: 'PSAT 8/9', administered: true}
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
