import Home from '../Components/Home/Home';
import {render} from '@testing-library/react';
import axios from 'axios';
import { elementFinder, renderWithMemoryRouter } from '../Utilities/testUtilities';
import { act } from 'react-dom/test-utils';
import { BrowserRouter, MemoryRouter } from 'react-router-dom';

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