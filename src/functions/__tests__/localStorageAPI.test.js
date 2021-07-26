import * as localStorageAPI from "../localStorageAPI";

const localStorageMockKey = "test-app";
const mockData = [
  {
    mockData: "mockData",
  },
  {
    mockData: "mockData",
  },
  {
    mockData: "mockData",
  },
];

beforeAll(() => {
  localStorageAPI.set(mockData, localStorageMockKey);
});

describe("localStorageAPI unit tests", () => {
  it("should compare data from LS and return true", () => {
    const dataFromLs = localStorageAPI.get(localStorageMockKey);
    const compareData = () =>
      JSON.stringify(dataFromLs) === JSON.stringify(mockData);
    expect(compareData()).toBeTruthy();
  });
  it("should return true", () => {
    expect(
      localStorageAPI.isLocalStorageNotEmpty(localStorageMockKey)
    ).toBe(true);
  });
});

afterAll(()=>{
  window.localStorage.clear();
})