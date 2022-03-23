import React from 'react';
import Home from '../Components/Home/Home';
import {render} from '@testing-library/react';
import useEvent from '@testing-library/user-event';
import handlePageChange from '../Components/Home/Home';
import axios from 'axios';
import Details from '../Components/Details/Details';
import { elementFinder, renderWithMemoryRouter } from '../Utilities/testUtilities';

describe("Testing Home Component", () => {
    beforeEach(async () => {
        jest.spyOn(axios, "get").mockResolvedValue({
          data: {
            hits: [
              {
                created_at: "2022-03-23T01:29:56.000Z",
                title: "Nvidia Announces Hopper Architecture, the Next Generation of Accelerated",
                url: "https://nvidianews.nvidia.com/news/nvidia-announces-hopper-architecture-the-next-generation-of-accelerated-computing",
                author: "RafelMri",
              },
            ],
          },
        });
    });

    test("should initially render header of component", async () => {
        renderWithMemoryRouter("/", <Home />);
    
        await elementFinder("header");
    });

    
})