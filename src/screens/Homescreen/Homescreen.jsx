import React, { useEffect, useState } from "react";
import NavigationBar from "../Navbar/Navbar";
import "./Homescreen.css";
import axios from "axios";
import URI from "../../common";
import { Button, Modal } from "react-bootstrap";
import ExpenseChart from "./ExpenseChart";

const Homescreen = () => {
  // const { username } = useSelector((state) => state.user_detail);
  const [loading, setLoading] = useState(false);
  const [expenseData, setExpenseData] = useState([]);
  const [createExpeMod, setCreateExpeMod] = useState(false);
  const [formData, setFormData] = useState({
    title: "",
    amount: 0,
    description: "",
    category: "",
    date: null,
  });
  const [chartData, setChartData] = useState([]);

  const accessToken = sessionStorage.getItem("access_token");
  const headers = {
    Authorization: accessToken
      ? `Bearer ${sessionStorage.getItem("access_token")} `
      : "",
  };

  const fetchExpenses = async () => {
    setLoading(true);
    try {
      const response = await axios.get(URI.getExpenses, {
        headers,
      });
      console.log("Reponse", response.data.data);
      setExpenseData(response.data.data);
    } catch (error) {
      console.error("Err>", error);
      setExpenseData([]);
    } finally {
      setLoading(false);
    }
  };

  const fetchChartData = async () => {
    setLoading(true);
    try {
      const response = await axios.get(URI.getChartData, {
        headers,
      });
      console.log("Reponse chart", response.data.data);
      setChartData(response.data.data);
    } catch (error) {
      console.error("Err>", error);
      setExpenseData([]);
    } finally {
      setLoading(false);
    }
  };

  console.log("Form data>>", formData);

  const handleFormCreateExpense = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleCreateExpense = async () => {
    // form validation
  };

  useEffect(() => {
    fetchExpenses();
    fetchChartData();
  }, []);

  return (
    <div className="homescreen">
      <NavigationBar />
      <div className="homescreen_main">
        <div className="homescreen_cont">
          <div className="common_sec">
            {/* <div className="expense_table">
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
            </div> */}

            <ExpenseChart chartData={chartData} />

            <div>Bottom</div>
          </div>
          <div className="common_sec">
            <button onClick={() => setCreateExpeMod(true)}>
              Create expense
            </button>
          </div>
        </div>
        <Modal
          show={createExpeMod}
          size="md"
          aria-labelledby="contained-modal-title-vcenter"
          centered
        >
          <Modal.Body className="modal_body">
            <h4>Create new expense</h4>
            <div
              onClick={() => {
                setCreateExpeMod(false);
              }}
            >
              X
            </div>
            <div className="create_expense_form">
              <form className="form_tag_style" onSubmit={handleCreateExpense}>
                <div>
                  <input
                    type="text"
                    name="title"
                    required
                    value={formData.title}
                    onChange={handleFormCreateExpense}
                    placeholder="Title"
                    className="input_box_style"
                  />
                </div>

                <div>
                  <input
                    type="text"
                    name="amount"
                    required
                    value={formData.amount}
                    onChange={handleFormCreateExpense}
                    placeholder="Amount"
                    className="input_box_style"
                    pattern="^\d+(\.\d{1,2})?$"
                    title="Please enter a valid amount (e.g., 100 or 100.50)"
                  />
                </div>
                <div>
                  <input
                    type="text"
                    name="description"
                    required
                    value={formData.description}
                    onChange={handleFormCreateExpense}
                    placeholder="Description"
                    className="input_box_style"
                  />
                </div>
                <div></div>
                <div className="error_cont">
                  {/* {errorMsg && (
                  <div className="error_style">
                    <img className="error_icon" alt="error" src={errorIcon} />
                    {errorMsg}
                  </div>
                )} */}
                </div>

                <button
                  type="submit"
                  // className={`submit_btn ${loading && "submit_btn_disable"}`}
                  // disabled={loading}
                >
                  {/* {loading ? (
                  <img src={loaderBtn} alt="loading" className="loader_style" />
                ) : (
                  <>Log in</>
                )} */}
                  Create expense
                </button>
              </form>
            </div>
          </Modal.Body>
        </Modal>
      </div>
    </div>
  );
};

export default Homescreen;
