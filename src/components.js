import React from 'react';
import {pick, omit, find} from 'lodash';

import {fetch} from './helpers';

export class Spinner extends React.Component {
    render() {
        if (!!this.props.data.fetching) {
            return <span key="spinner" ref="spinner">Fetching {this.props.data.fetching}...</span>;
        }
        return <div id="spinner" />
    }

}

export class Content extends React.Component {
    static contextTypes = {
        store: React.PropTypes.object.isRequired
    };

    render() {
        return <div id="content">
            <h1 ref="title">{this.props.data.content.title}</h1>
            <div ref="description" dangerouslySetInnerHTML={{__html: this.props.data.content.description}} />
        </div>;
    }

    componentWillMount() {
        fetch.call(this.context.store, 'CONTENT');
    }

}

export class Buttons extends React.Component {
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
        return find(this.props.data.assessments, (obj) => obj.assessment === assessment && !!obj.administered);
    }

    assessmentHasBeenAdministeredInSeason(season) {
        return find(this.props.data.admins, (obj) => obj.admin === season);
    }

    assessmentWillBeAdministered() {
        return this.props.data.academicYears.length;
    }

    render() {
        var buttons = [];
        for (var label in this.props.data.list) {
            buttons.push(<button disabled={!this.buttonShouldBeEnabled(label)} key={label}>{label}</button>)
        }
        return <div id="buttons">{buttons}</div>;
    }

    componentWillMount() {
        setTimeout(() => {
            fetch.call(this.context.store, 'ASSESSMENTS');
            setTimeout(() => {
                fetch.call(this.context.store, 'ACADEMIC_YEARS');
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
