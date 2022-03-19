import React from 'react';
import Home from '../Components/Home/Home';
import {render} from '@testing-library/react';
import useEvent from '@testing-library/user-event';
import handlePageChange from '../Components/Home/Home';

describe("Testing Home Component", () => {
    test("finding header with testId", () => {
        const {getByTestId} = render(<h1 data-testid="header" style={{"textAlign": "center"}}>Post List</h1>)
        expect(getByTestId("header")).toHaveTextContent("Post List");
    })
})