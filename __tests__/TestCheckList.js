jest.autoMockOff();

import React from 'react';
import TestUtils from 'react-addons-test-utils';
import CheckList from '../app/components/CheckList';

describe('Test Check List', () => {
    it('Test01', () => {
        let tasks = [
            {
                id: 0,
                taskName: 'task0'
            }
        ];
        let checkList = TestUtils.renderIntoDocument(<CheckList tasks={tasks} cardId={0}/>);
        let checkboxes = TestUtils.scryRenderedDOMComponentsWithClass(checkList, 'check-box-not-selected');
        expect(checkboxes.length).toBe(1);
            });
})
