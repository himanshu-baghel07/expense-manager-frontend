import React, { useEffect, useState } from "react";
import NavigationBar from "../Navbar/Navbar";
import "./Homescreen.css";
import axios from "axios";
import URI from "../../common";

const Homescreen = () => {
  // const { username } = useSelector((state) => state.user_detail);
  const [loading, setLoading] = useState(false);
  const [expenseData, setExpenseData] = useState([]);

  const accessToken = sessionStorage.getItem("access_token");
  const headers = {
    Authorization: accessToken
      ? `Bearer ${sessionStorage.getItem("access_token")} `
      : "",
  };

  const getexpenses = async () => {
    setLoading(true);
    try {
      const response = await axios.get(URI.getExpenses, {
        headers,
      });
      console.log("Reponse", response.data.data);
      setExpenseData(response.data.data);
    } catch (error) {
      console.error("Err>", error);
      setExpenseData;
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    getexpenses();
  }, []);

  return (
    <div className="homescreen">
      <NavigationBar />
      <div className="homescreen_main">
        <h2>Homescreen</h2>
        <div className="homescreen_cont">
          <div className="common_sec">
            <div className="expense_table">
              {expenseData.length !== 0 ? (
                <table>
                  <thead>
                    <tr>
                      <th>Title</th>
                      <th>Amount</th>
                      <th>Description</th>
                      <th>Category</th>
                      <th>Date</th>
                    </tr>
                  </thead>
                  <tbody>
                    {expenseData.map((data, index) => (
                      <tr key={index}>
                        <td>{data.title}</td>
                        <td>{data.amount}</td>
                        <td>{data.description}</td>
                        <td>{data.category}</td>
                        <td>{new Date(data.date).toLocaleDateString()}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              ) : (
                <p>No expenses found</p>
              )}
            </div>

            <div>Bottom</div>
          </div>
          <div className="common_sec">2</div>
        </div>
      </div>
    </div>
  );
};

export default Homescreen;
