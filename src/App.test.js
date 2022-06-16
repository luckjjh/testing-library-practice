/* eslint-disable testing-library/prefer-screen-queries */
import React from "react";
import axiosInstance from "./axios.instance";
import MockAdapter from "axios-mock-adapter";
import { render, waitFor, cleanup,screen, getAllByAltText, getAllByTestId } from "@testing-library/react";
import App from "./App";

const apiKey = "207002a5564d447292dac501ce2f71ac";
const mock = new MockAdapter(axiosInstance, { onNoMatch: "throwException" });
const todos = [{"EnglishName":"aaaa"},
  {"EnglishName":"bbbb"},
  {"EnglishName":"cccc"}]

const datas = {
  EnglishName:"dddd",
}
const weatherdd = [{
  WeatherText:"eeee",
}]

beforeAll(() => {
  mock.reset();
});

afterEach(cleanup);

const renderComponent = () => render(<App />);

describe("axios mocking test", () => {
  it("should render loading followed by todos", async () => {
    mock.onGet(`/locations/v1/topcities/50.json?apikey=${apiKey}`).reply(200, todos);
    const { queryByText, getByTestId } = renderComponent();
    expect(queryByText(/Loading/i)).toBeInTheDocument();
    await waitFor(()=>getByTestId("todos"));
    expect(queryByText(/aaaa/i)).toBeInTheDocument();
  });
  it("asdasd", async () => {
    mock.onGet(`locations/v1/cities/geoposition/search.json?q=37.59,127.065&apikey=${apiKey}`).reply(200, datas);
    const { queryByText, getByTestId } = renderComponent();
    expect(queryByText(/Loading/i)).toBeInTheDocument();
    await waitFor(()=>getByTestId("todos"));
    expect(queryByText(/dddd/i)).toBeInTheDocument();
  });
  
  it("aaaaasdasd", async () => {
    mock.onGet(`/currentconditions/v1/2002520.json?apikey=${apiKey}`).reply(200, weatherdd);
    const { queryByText, getByTestId } = renderComponent();
    expect(queryByText(/Loading/i)).toBeInTheDocument();
    await waitFor(()=>getByTestId("todos"));
    expect(queryByText(/eeee/i)).toBeInTheDocument();
  });
});
