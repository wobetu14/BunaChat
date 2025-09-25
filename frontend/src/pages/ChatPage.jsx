import React from 'react'
import { useAuthStore } from '../store/useAuthStore'

const ChatPage = () => {
  const { logout } = useAuthStore();
  return (
    <div className='z-10'>
      <button type='submit' onClick={logout} className="text-white z-10">
        Logout
      </button>
    </div>
  );
}

export default ChatPage