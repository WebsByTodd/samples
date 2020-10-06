import axios from "axios";

interface ApiResponse {
  id: number;
}
export const fetchData = (): Promise<ApiResponse> => {
  return new Promise((resolve, reject) => {
    axios
      .get("https://httpstat.us/200")
      .then(() => {
        resolve({
          id: 123
        });
      })
      .catch(reject);
  });
};
