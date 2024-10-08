import React, { useEffect } from 'react';
import SideBar from '../components/SideBar';
import MainSection from '../components/MainSection';
import RightBar from '../components/RightBar';
import Header from '../components/Header';
import BottomNavBar from '../components/BottomNavBar';
import { useNavigate } from 'react-router-dom';

function Home() {
  const userId = localStorage.getItem('id');
  const navigate = useNavigate();

  useEffect(() => {
    if (!userId) {
      navigate('../');
    }
  }, [userId, navigate]);

  if (!userId) {
    return null; // Return null to avoid rendering the rest of the page until userId is checked
  }

  return (
    <div className="mx-auto h-screen flex xl:max-w-[1200px]">
      <SideBar />
      <div className="w-full xl:w-1/2 h-screen overflow-y-auto main-section scrollbar-custom">
        <Header />
        <MainSection />
      </div>
      <RightBar />
      <BottomNavBar />
    </div>
  );
}

export default Home;
