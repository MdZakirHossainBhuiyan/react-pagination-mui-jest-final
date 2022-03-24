import React from 'react';
import Home from '../Components/Home/Home';
import {render} from '@testing-library/react';
import useEvent from '@testing-library/user-event';
import handlePageChange from '../Components/Home/Home';
import axios from 'axios';
import Details from '../Components/Details/Details';
import { buttonClickerAsync, elementFinder, renderWithMemoryRouter } from '../Utilities/testUtilities';
import { act } from 'react-dom/test-utils';
import { BrowserRouter, MemoryRouter, Switch } from 'react-router-dom';
import App from '../App';

describe("Testing Home Component", () => {
    beforeEach(async () => {
        jest.spyOn(axios, "get").mockResolvedValue({
          data: [
              {
                created_at: "2022-03-23T01:29:56.000Z",
                title: "Nvidia Announces Hopper Architecture, the Next Generation of Accelerated",
                url: "https://nvidianews.nvidia.com/news/nvidia-announces-hopper-architecture-the-next-generation-of-accelerated-computing",
                author: "RafelMri",
              },
            ],
        });
    });

    test("should initially render header of component", async () => {
        renderWithMemoryRouter("/", <Home />);
    
        await elementFinder("header");
    });

    test("should render loader of component", () => {
        act(async () => {
            render(
                <BrowserRouter>
                    <MemoryRouter>
                        <Home />
                    </MemoryRouter>
                </BrowserRouter>
            );
          });
    
        elementFinder("loaderTest");
    });

    test("should render header part of table", () => {
        act(async () => {
            render(
                <BrowserRouter>
                    <MemoryRouter>
                        <Home />
                    </MemoryRouter>
                </BrowserRouter>
            );
          });
    
        elementFinder("tableHeader");
    });

    test("should render body part of table", () => {
        act(async () => {
            render(
                <BrowserRouter>
                    <MemoryRouter>
                        <Home />
                    </MemoryRouter>
                </BrowserRouter>
            );
          });
    
        elementFinder("tableBody");
    });

    // test("should render raw JSON if clicked on a news", async () => {
    //     renderWithMemoryRouter("/", <App />);
    
    //     await buttonClickerAsync("Nvidia Announces Hopper Architecture, the Next Generation of Accelerated?", 0);
    //     await elementFinder("detailsPosts");
    //   });

    test("should render pagination", () => {
        act(async () => {
            render(
                <BrowserRouter>
                    <MemoryRouter>
                        <Home />
                    </MemoryRouter>
                </BrowserRouter>
            );
          });
    
        elementFinder("pagePagination");
    });
    
})