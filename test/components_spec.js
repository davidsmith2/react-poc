import React from 'react';
import ReactDOM from 'react-dom';
import {
	renderIntoDocument
} from 'react-addons-test-utils';
import {expect} from 'chai';
import {mount} from 'enzyme';

import {Spinner, Content, Buttons} from '../src/components';

describe('Components', () => {
	const mountOptions = {
		context: {store: {dispatch() {}}},
		childContextTypes: {store: React.PropTypes.object}
	};

	describe('Spinner', () => {

		it('is shown when data is loading', () => {
			const data = {fetching: true};
			const component = renderIntoDocument(<Spinner data={data} />);
			const spinner = ReactDOM.findDOMNode(component.refs.spinner);
			expect(spinner).to.be.ok;
			expect(spinner.textContent).to.contain('Fetching');
		});


		it('is hidden when data isn\'t loading', () => {
			const data = {fetching: false};
			const component = renderIntoDocument(<Spinner data={data} />);
			const spinner = ReactDOM.findDOMNode(component.refs.spinner);
			expect(spinner).not.to.be.ok;
		});

	});

	describe('Content', () => {

		it('should render', () => {
			const data = {content: {title: 'title', description: 'description'}};
			const component = mount(<Content data={data} />, mountOptions);
			expect(component.ref('title').text()).to.equal('title');
			expect(component.ref('description').text()).to.equal('description');
		});

	});

	describe('Buttons', () => {

		it('should render', () => {
			const data = {list: {'label': {enabled: false}}};
			const component = mount(<Buttons data={data} />, mountOptions);
			expect(component.find('button')).to.have.length(1);
			expect(component.find('button').at(0).text()).to.equal('label');
		});

		it('should handle PSAT/NMSQT', () => {
			const data = {
				list: {'PSAT/NMSQT': {enabled: false}},
				assessments: [{assessment: 'PSAT/NMSQT', administered: true}]
			};
			const component = mount(<Buttons data={data} />, mountOptions);
			expect(component.find('button').at(0).prop('disabled')).to.equal(false);
		});

		it('should handle SAT & SAT Subject', () => {
			const data = {
				list: {'SAT & SAT Subject': {enabled: false}},
				academicYears: [{academicYear: '2018'}]
			};
			const component = mount(<Buttons data={data} />, mountOptions);
			expect(component.find('button').at(0).prop('disabled')).to.equal(false);
		});

		it('should handle PSAT/NMSQT', () => {
			const data = {
				list: {'PSAT/NMSQT': {enabled: false}},
				assessments: [{assessment: 'PSAT/NMSQT', administered: true}]
			};
			const component = mount(<Buttons data={data} />, mountOptions);
			expect(component.find('button').at(0).prop('disabled')).to.equal(false);
		});

		it('should handle PSAT 8/9', () => {
			const data = {
				list: {'PSAT 8/9 - Fall': {enabled: false}},
				assessments: [{assessment: 'PSAT 8/9', administered: true}],
				admins: [{admin: 'Fall'}]
			};
			const component = mount(<Buttons data={data} />, mountOptions);
			expect(component.find('button').at(0).prop('disabled')).to.equal(false);
		});

	});

});
