import axios from 'axios';
import React, { useContext, useState } from 'react'
import AuthContext from '../../context/AuthContext'
import '../AddExpense/AddExpense.css'
import Loader from '../Loader/Loader';
import toast from 'react-hot-toast';

function EditDefaultMonthLimit({ handleClose, reloadPage }) {
  const { user, updateLogin } = useContext(AuthContext);
  const [monthlyLimit, setMonthlyLimit] = useState(user?.monthlyLimit);
  const [load, setLoad] = useState(false)
  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoad(true)
    try {
      await axios.patch('/user/editDefaultMonthLimit/' + parseInt(monthlyLimit));
      toast.success("Default month limit updated successfully");
      updateLogin()
      reloadPage();
      handleClose()
    } catch (err) {
              toast.error(err?.response?.data?.message ?? "Internal Server Error")
        console.log('error', err)
    } finally {
      setLoad(false)
    }
  }
  return (
    <div className="AddExpense">
      <form className="add-container" onSubmit={handleSubmit}>
        <div className="add-header">
          <h2>Edit Default Month Limit</h2>
        </div>
        <div className="add-label">Amount</div>
        <div className="add-input">
          <input type="number" placeholder="Enter Month Limit"
            value={monthlyLimit} onChange={(e) => { setMonthlyLimit(e.target.value) }}
            onClick={(e) => e.target.select()}
          />
        </div>
        <div className="add-btn">
          <button type='reset' onClick={handleClose}>Close</button>
          <button type='submit' disabled={monthlyLimit === 0 || monthlyLimit == ""}>Update</button>
        </div>
      </form>
      {
        load && <Loader />
      }
    </div>
  )
}

export default EditDefaultMonthLimit