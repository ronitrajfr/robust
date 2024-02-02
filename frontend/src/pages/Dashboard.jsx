import React, { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom';
import { Appbar } from '../components/Appbar'
import { Balance } from '../components/Balance'
import { Users } from '../components/Users'
import axios from 'axios';

const isAuthenticated = !!localStorage.getItem('token');

export const Dashboard = () => {

  const [balance, setBalance] = useState([]);

  const navigate = useNavigate();

  useEffect(() => {
    if (!isAuthenticated) {
      navigate('/signup');
    }

  }, [navigate, isAuthenticated])

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get("http://localhost:3000/api/v1/account/balance", {
          headers: {
            Authorization: `Bearer ${localStorage.getItem('token')}`,
          },
        });
        console.log(response.data)
        setBalance(response.data.balance);
      } catch (error) {
        console.error("Error fetching balance:", error);
      }
    };

    fetchData();
  }, [])



  return (
    <div>
      <Appbar />
      <div className='m-8'>
        <Balance value={balance} />
        <Users />
      </div>
    </div>
  )
}
