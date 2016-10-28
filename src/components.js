import React from 'react';
import {pick, omit} from 'lodash';

import {fetch} from './helpers';

class Spinner extends React.Component {
    render() {
        if (!!this.props.data.fetching) {
            return <div>
                <span key="spinner">Fetching {this.props.data.fetching}...</span>
            </div>
        }
        return <div />
    }

}

class Content extends React.Component {
    static contextTypes = {
        store: React.PropTypes.object.isRequired
    };

    render() {
        return <div>
            <div><h1>{this.props.data.content.title}</h1></div>
            <div dangerouslySetInnerHTML={{__html: this.props.data.content.description}} />
        </div>;
    }

    componentWillMount() {
        fetch.call(this.context.store, 'CONTENT');
    }

}

class Buttons extends React.Component {
    static contextTypes = {
        store: React.PropTypes.object.isRequired
    };

    constructor(props, context) {
        super(props, context)
    }

    buttonShouldBeEnabled(label) {
        switch(label) {
            case 'SAT & SAT Subject':
                return this.assessmentHasBeenAdministered('SAT') ||
                    this.assessmentHasBeenAdministered('SAT Subject') ||
                    this.assessmentWillBeAdministered();
            case 'PSAT 8/9 - Fall':
            case 'PSAT 8/9 - Spring':
                return this.assessmentHasBeenAdministered(label.split(' - ')[0]) &&
                    this.assessmentHasBeenAdministeredInSeason(label.split(' - ')[1]);
            default:
                return this.assessmentHasBeenAdministered(label);
        }
    }

    assessmentHasBeenAdministered(assessment) {
        return this.props.data.assessments.find((obj) => obj.assessment === assessment && !!obj.administered);
    }

    assessmentHasBeenAdministeredInSeason(season) {
        return this.props.data.admins.find((obj) => obj.admin === season);
    }

    assessmentWillBeAdministered() {
        return !!this.props.data.academicYears.length;
    }

    render() {
        var buttons = [];
        for (var label in this.props.data.list) {
            buttons.push(<button disabled={!this.buttonShouldBeEnabled(label)} key={label}>{label}</button>)
        }
        return <div>{buttons}</div>;
    }

    componentWillMount() {
        setTimeout(() => {
            fetch.call(this.context.store, 'ACADEMIC_YEARS');
            setTimeout(() => {
                fetch.call(this.context.store, 'ASSESSMENTS');
                setTimeout(() => {
                    fetch.call(this.context.store, 'ADMINS');
                }, 3000)
            }, 3000)
        }, 3000)
    }

}

export class Panel extends React.Component {
    render() {
        return <div>
            <Spinner data={pick(this.props, 'fetching')} />
            <Content data={pick(this.props, 'content')} />
            <Buttons data={omit(this.props, 'content', 'fetching')} />
        </div>;
    }
}
