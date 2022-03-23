import axios from "axios";
import App from "../App";
import { elementFinder, renderWithMemoryRouter, textExpecter, textFinderRx } from "../Utilities/testUtilities";

describe("App Router", () => {
    beforeEach(() => {
        jest.spyOn(axios, "get").mockResolvedValue({
            data: { hits: 0 },
        });
    });

    test("should render Home Page '/'", async () => {
        renderWithMemoryRouter("/", <App />);

        await textExpecter("Post List");
    });

    test("Should go to '/details' from App", () => {
        renderWithMemoryRouter("/details", <App />);

        elementFinder("detailsPosts");
    });

    test("should render NotFound page on invalid route", async () => {
        renderWithMemoryRouter("/invalidRoute", <App />);

        await textFinderRx("page Not Found");
    });
});