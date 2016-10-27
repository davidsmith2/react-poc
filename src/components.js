import React from 'react';
import {pick, omit} from 'lodash';

import {fetch} from './helpers';

class ContentHeading extends React.Component {
    render() {
        return <h1>{this.props.value}</h1>
    }
}

class ContentBody extends React.Component {
    render() {
        return <div dangerouslySetInnerHTML={{__html: this.props.value}} />
    }
}

class Content extends React.Component {
    render() {
        return <div>
            <ContentHeading value={this.props.data.content.title} />
            <ContentBody value={this.props.data.content.description} />
        </div>;
    }

    componentWillMount() {
        fetch.call(this.context.store, 'CONTENT');
    }
}

Content.contextTypes = {
    store: React.PropTypes.object.isRequired
};

class Button extends React.Component {
    render() {
        return <button disabled={this.props.disabled}>{this.props.label}</button>
    }

}

class Buttons extends React.Component {
    constructor(props, context) {
        super(props, context)
    }

    buttonIsEnabled(label) {
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
            buttons.push(<Button key={label} label={label} disabled={!this.buttonIsEnabled(label)} />)
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

Buttons.contextTypes = {
    store: React.PropTypes.object.isRequired
};

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

export class Panel extends React.Component {
    render() {
        return <div>
            <Spinner data={pick(this.props, 'fetching')} />
            <Content data={pick(this.props, 'content')} />
            <Buttons data={omit(this.props, 'content', 'fetching')} />
        </div>;
    }
}
