import React, { useState, useRef } from 'react'
import '../styles/Profile.css'
import { useNavigate } from 'react-router-dom'
import { useAuth } from '../Authentication/AuthContext'
import axiosInstance from '../Authentication/axioxInstance'

const Profile = () => {
    const navigate = useNavigate()
    const { user } = useAuth()
    const [showPopup, setShowPopup] = useState(false)
    const [profileImage, setProfileImage] = useState('')
    const fileInputRef = useRef(null)

    const togglePopup = () => {
        setShowPopup(!showPopup)
    }

    const handleDeleteProfile = async () => {
      const confirmDelete = window.confirm(" Are yousure you want to delete your profile")
      if (confirmDelete) {
        try {
          await axiosInstance.delete(`/users/${user._id}`)
          alert("Your profile has been deleted successfully.")
          navigate('/')
          window.location.reload()
        } catch (error) {
          console.error('Error deleting profile:', error)
          alert("There was an error deleting your profile. Please try again.")
        }
      }
    }


    const handleImageChange = (event) => {
      const file = event.target.files[0]
      if (file) {
          const reader = new FileReader()
          reader.onloadend = () => {
              setProfileImage(reader.result)
          };
          reader.readAsDataURL(file)
      }
    }

    const handleChangeProfileImage = () => {
      fileInputRef.current.click()
    };

    return (
      <div className="profile-container">
      <div className="profile-header">
          <h2>Profile</h2>
      </div>
      <div className="profile-content">
          <div className="profile-image">
              <button className="change-image-button" onClick={handleChangeProfileImage}>
                  Change Profile Picture
              </button>
              <input 
                  type="file" 
                  accept="image/*" 
                  onChange={handleImageChange} 
                  ref={fileInputRef} 
                  style={{ display: 'none' }}
              />
          </div>
          <div className="profile-details">
          <p><strong>{user ? user.firstName : 'First Name'} {user ? user.lastName : 'Last Name'}</strong></p>
          </div>
          <div className="profile-actions">
              <button className="action-button" onClick={() => navigate('/cart')}>Cart</button>
              <button className="action-button" onClick={() => navigate('/ProductList')}>Add To Cart</button>
          </div>
          <div className="edit-button-container">
              <button className="edit-button" onClick={togglePopup}>Edit Profile</button>
          </div>
      </div>

      {user && user.admin &&  (
        <div className='admin-section'>
        <h3>Admin Panel</h3>
        <button className='admin-button' onClick={() => navigate('/EditProduct')}>Edit Products</button>
        </div>
      )}

      {showPopup && (
          <div className="popup">
              <div className="popup-content">
                  <button className="popup-back" onClick={togglePopup}>Back</button>
                  <button className="popup-delete" onClick={handleDeleteProfile}>Delete Profile</button>
              </div>
          </div>
      )}
    </div>
    );
  };

    export default Profile