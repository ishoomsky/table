import {
  isEmptyObject,
  generateRandomId,
  getWindowDimensions,
} from "../utilities"; 


describe("utilities unit tests", () => {
  it("function isEmptyObject without values should returns: true", () => {
    expect(isEmptyObject({})).toBe(true);
  });
  it("function isEmptyObject with values should returns: false", () => {
    expect(isEmptyObject({ mock: "mockdata" })).toBe(false);
  });

  it("function generateRandomId should returns string", () => {
    expect(typeof generateRandomId()).toBe("string");
  });
  it("function generateRandomId should contains 9 symbols", () => {
    expect(typeof generateRandomId()).toBe("string");
  });

  it("function getWindowDimensions returns object", () => {
    expect(
      getWindowDimensions() instanceof Object &&
        !(getWindowDimensions() instanceof Array)
    ).toBeTruthy();
  });
  it("function getWindowDimensions returns object with values width and height", () => {
    expect(
      Object.keys(getWindowDimensions()).indexOf("width") > -1 &&
        Object.keys(getWindowDimensions()).indexOf("height") > -1
    ).toBeTruthy();
  });
  it("function getWindowDimensions should return correct window.innerWidth and window.innerHeight values", () => {
    const { width, height } = getWindowDimensions();
    expect(width).toBe(window.innerWidth);
    expect(height).toBe(window.innerHeight);
  });
});
