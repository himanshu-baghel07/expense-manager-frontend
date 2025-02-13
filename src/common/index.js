import { BASE_URL } from "./constant";

const URI = {
  register: `${BASE_URL}/api/v1/users/register`,
  login: `${BASE_URL}/api/v1/users/login`,
  authenticate: `${BASE_URL}/api/v1/users/authenticate`,
  getExpenses: `${BASE_URL}/api/v1/users/get-expenses`,
  getChartData: `${BASE_URL}/api/v1/users/get-chart-data`,
};

export default URI;
