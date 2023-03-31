import React, { useEffect, useState } from 'react';
import './App.css';
import Navbar from './components/Navbar'
import Filter from './components/Filter'
import Cards from './components/Cards'
import Spinner from './components/Spinner'
import { apiUrl, filterData } from './data'
import { toast } from 'react-toastify';

function App() {

  const [courses, setCourses] = useState(null);
  const [category, setCategory] = useState(filterData[0].title);

  //before data fetch of courses show loading spin for that add state
  const [loading, setLoading] = useState(true);

  //api hit for data fetching

  async function fetchData() {
    //before data fetch add loading spin
    setLoading(true);

    //api call krne ka syntax-tareeka
    try {
      let response = await fetch(apiUrl);
      let output = await response.json();

      //set output in state hook
      //why setting output.data because in api object all info is present in {data:vale}
      //to access all value use output.data
      setCourses(output.data);
    }
    catch (error) {
      toast.error("data fetch failed");
    }

    //after data fetch remove loading spin
    setLoading(false);
  }

  useEffect(() => {
    fetchData();
  }, []);



  return (
    <div className="min-h-screen flex flex-col bg-gradient-to-r from-slate-500 to-slate-800">
      <div><Navbar /></div>
      <div >
        <div><Filter filterData={filterData} category={category} setCategory={setCategory}/></div>

        <div className='w-11/12 max-w-[1200px] mx-auto flex flex-wrap justify-center items-center min-h-[50vh]'>
          {
            //eighter card coursers show or loading spin if data not fetch
            loading ? (<Spinner />) : (<Cards courses={courses} category={category} />)
          }
        </div>
      </div>
    </div>
  );
}

export default App;
