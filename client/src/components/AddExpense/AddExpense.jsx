import React, { useState, useContext } from "react";
import "./AddExpense.css";
import Select from "react-select";
import { HiCollection } from "react-icons/hi";
import { IoFastFood } from "react-icons/io5";
import { FaCartArrowDown, FaMoneyBillWave } from "react-icons/fa";
import { RiTaxiFill } from "react-icons/ri";
import { FcClapperboard, FcDepartment, FcMoneyTransfer, FcOk, FcPlanner, FcPlus } from "react-icons/fc";
import axios from "axios";
import AuthContext from "../../context/AuthContext";
import { useNavigate } from "react-router-dom";
import Loader from '../Loader/Loader'
import { FormControl, FormControlLabel, Radio, RadioGroup } from "@mui/material";
import toast from 'react-hot-toast';

function AddExpense({ setShowAddExpense }) {
  const { user, reloadPage, setReloadPage } = useContext(AuthContext)
  const [load, setLoad] = useState({
    submit: false,
  })
  const [mode, setMode] = useState('debit')
  const navigate = useNavigate()
  const data = [
    {
      value: "rent",
      text: 'Rent',
      icon: <FaMoneyBillWave className="category-icon rent" />
    },
    {
      value: "food",
      text: 'Food',
      icon: <IoFastFood className="category-icon food" />
    },
    {
      value: "entertainment",
      text: 'Entertainment',
      icon: <FcClapperboard className="category-icon entertainment" />
    },
    {
      value: "transport",
      text: 'Transport',
      icon: <RiTaxiFill className="category-icon transport" />
    },
    {
      value: "shopping",
      text: 'Shopping',
      icon: <FaCartArrowDown className="category-icon shopping" />
    },
    {
      value: "emi",
      text: 'EMI',
      icon: <FcPlanner className="category-icon emi" />
    },
    {
      value: "hospital",
      text: 'Hospital',
      icon: <FcPlus className="category-icon hospital" />
    },
    {
      value: "school",
      text: 'School',
      icon: <FcDepartment className="category-icon school" />
    },
    {
      value: "fees",
      text: 'Fees',
      icon: <FcMoneyTransfer className="category-icon fees" />
    },
    {
      value: "savings",
      text: 'Saving',
      icon: <FcOk className="category-icon fees" />
    },
    {
      value: "other",
      text: 'Other',
      icon: <HiCollection className="category-icon other" />
    }
  ]
  const [category, setCategory] = useState(null)
  const [amount, setAmount] = useState(null)
  const [description, setDescription] = useState("")
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      setLoad({ ...load, submit: true })
      if (category != "" && description != "") {
        const result = await axios.post('/item', {
          amount: (mode === 'credit' ? amount * -1 : amount)
          , description, category: category.value
        })
        setShowAddExpense(false)
        setReloadPage(!reloadPage);
        toast.success("Expense added successfully")
      }
    } catch (err) {
      toast.error(err?.response?.data?.message ?? "Internal Server Error")
      console.log('error', err)
    } finally {
      setLoad({ ...load, submit: false })
    }
  }
  return (
    <div className="AddExpense">
      <form className="add-container" onSubmit={handleSubmit}>
        <div className="add-header">
          <h2>Add Expense</h2>
        </div>
        <div className="add-label">
          Category
        </div>
        <div className="add-input">
          <Select
            value={category}
            onChange={setCategory}
            isSearchable={false}
            className="add-select-box"
            readOnly={true}
            placeholder="Select Category"
            options={data}
            getOptionLabel={(e) => (
              <div style={{ display: "flex", alignItems: "center" }}>
                {e.icon}
                <span style={{ marginLeft: 5 }}>{e.text}</span>
              </div>
            )}
          />
        </div>
        <div className="add-label">Description</div>
        <div className="add-input">
          <input type="text" placeholder="Enter description"
            value={description}
            onChange={(e) => setDescription(e.target.value)} />
        </div>
        <div className="add-label">Amount</div>
        <div className="add-input">
          <input type="number" placeholder="Enter Amount"
            value={amount}
            onChange={(e) => setAmount(parseInt(Math.abs(e.target.value)))} />
        </div>
        <div className="add-label">Mode</div>
        <div className="add-input">
          <FormControl>
            <RadioGroup
              row
              aria-labelledby="demo-row-radio-buttons-group-label"
              name="row-radio-buttons-group"
              onChange={(e) => {
                setMode(e.target.value)
              }}
              value={mode}
            >
              <FormControlLabel value="debit" control={<Radio />} label="Debit" />
              <FormControlLabel value="credit" control={<Radio />} label="Credit" />
            </RadioGroup>
          </FormControl>
        </div>
        <div className="add-btn">
          <button type="reset" onClick={() => setShowAddExpense(false)}>Close</button>
          <button type="submit">Add</button>
        </div>
      </form>
      {
        load.submit && <Loader />
      }
    </div>
  );
}

export default AddExpense;
