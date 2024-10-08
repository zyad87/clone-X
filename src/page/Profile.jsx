import React, { useEffect } from 'react';
import SideBar from '../components/SideBar';
import RightBar from '../components/RightBar';
import BottomNavBar from '../components/BottomNavBar';
import ProfileSection from '../components/ProfileSection';
import { useNavigate } from 'react-router-dom';

function Profile() {
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
        <ProfileSection />
      </div>
      <RightBar />
      <BottomNavBar />
    </div>
  );
}

export default Profile;
