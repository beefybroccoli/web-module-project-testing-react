import React from "react";
import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import Display from "../Display";
import fetchShow from "../../api/fetchShow";
import sampleTestData from "../../data/sampleTestData";
jest.mock("../../api/fetchShow.js");

///Tasks:
//1. Add in nessisary imports and values to establish the testing suite.

//-------------------------------------------------------------
//2. Test that the Display component renders without any passed in props.
test("render Display component", () => {
  //arrange---------------------------------------------------
  // eslint-disable-next-line react/react-in-jsx-scope
  render(<Display />);
  const image = screen.getByRole("img");
  //act-------------------------------------------------------
  //assert----------------------------------------------------
  expect(image).toBeTruthy();
});

//-------------------------------------------------------------
//3. Rebuild or copy a show test data element as used in the previous set of tests.

//-------------------------------------------------------------
//4. Test that when the fetch button is pressed, the show component will display. Make sure to account for the api call and change of state in building your test.
test("show season selector when user click", async () => {
  //arrange---------------------------------------------------
  fetchShow.mockResolvedValueOnce(sampleTestData);
  render(<Display />);
  const button = screen.getByRole("button");
  //   console.log(button);
  //act-------------------------------------------------------
  userEvent.click(button);

  const show = await screen.findByTestId("show-container");
  //assert----------------------------------------------------

  expect(show).toBeTruthy();
});

//-------------------------------------------------------------
//5. Test that when the fetch button is pressed, the amount of select options rendered is equal to the amount of seasons in your test data.
test("select options equal to number of seasons in test data", async () => {
  //arrange---------------------------------------------------
  fetchShow.mockResolvedValueOnce(sampleTestData);
  render(<Display />);
  //act------------------------------------------------------
  const button = screen.getByRole("button");
  userEvent.click(button);
  const selectionOptions = await screen.findAllByTestId("season-option");
  const testData = console.log(
    "selectionOptions.length = ",
    selectionOptions.length
  );
  console.log(
    "sampleTestData.seasons.length = ",
    sampleTestData.seasons.length
  );

  //assert----------------------------------------------------
  expect(selectionOptions).toHaveLength(sampleTestData.seasons.length);
});

// //-------------------------------------------------------------
// //6. Notice the optional functional prop passed in to the Display component client code. Test that when the fetch button is pressed, this function is called.
// test("test displayFunc is called when user click at `Press to Get Show Data`", async () => {
//   //arrange------------------------------------------------
//   const displayFunc = jest.fn();
//   render(<Display displayFunc={displayFunc} />);

//   //act----------------------------------------------------
//   fetchShow.mockResolvedValueOnce(sampleTestData);
//   const button = screen.getByRole("button");
//   userEvent.click(button);

//   //assert-------------------------------------------------
//   //????????????????????????????????????????????????????????
// });
