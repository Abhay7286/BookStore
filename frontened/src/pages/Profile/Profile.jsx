import React, { useState } from "react";
import "./Profile.css";
import { useUserStore } from "../../store/useUserStore.js";

const Profile = () => {
  const { user, updateUser, updateAddress } = useUserStore();
  const [isEditingProfile, setIsEditingProfile] = useState(false);
  const [isEditingAddress, setIsEditingAddress] = useState(false);
  const [currentAddress, setCurrentAddress] = useState(null);
  const [formData, setFormData] = useState({
    name: user.name,
    email: user.email,
    phone: user.phone,
  });

  const [addressData, setAddressData] = useState({
    street: user.address.street || "",
    landmark: user.address.landmark || "",
    city: user.address.city || "",
    state:  user.address.state || "",
    pincode: user.address.pincode || "",
    country:  user.address.country || "",
  });

  const handleProfileChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleAddressChange = (e) => {
    setAddressData({ ...addressData, [e.target.name]: e.target.value });
  };

  const saveProfile = () => {
    updateUser(formData); 
    setIsEditingProfile(false);
  };

  const saveAddress = () => {
    updateAddress(addressData);
    setIsEditingAddress(false);
  };

  return (
    <div className="profile-container">
      <header className="profile-header">
        <h1>My Profile</h1>
        <p>Manage your account and settings</p>
      </header>

      {/* Profile Section */}
      <section className="profile-details">
        <div className="profile-card">
          <div className="profile-info">
            {!isEditingProfile ? (
              <>
                <h2>{user.name}</h2>
                <p>{user.email}</p>
                <p>{user.phone}</p>
                <button className="edit-btn" onClick={() => setIsEditingProfile(true)}>Edit Profile</button>
              </>
            ) : (
              <>
                <input
                  type="text"
                  name="name"
                  value={formData.name}
                  onChange={handleProfileChange}
                  placeholder="Name"
                />
                <input
                  type="email"
                  name="email"
                  value={formData.email}
                  onChange={handleProfileChange}
                  placeholder="Email"
                />
                <input
                  type="text"
                  name="phone"
                  value={formData.phone}
                  onChange={handleProfileChange}
                  placeholder="Phone"
                />
                <button className="save-btn" onClick={saveProfile}>Save</button>
                <button className="cancel-btn" onClick={() => setIsEditingProfile(false)}>Cancel</button>
              </>
            )}
          </div>
        </div>
      </section>

      {/* Address Book Section */}
      <section className="address-book">
        <h2>Address Book</h2>
        <div className="address-card">
          <h3>Home</h3>
          <p>
            {user.address.street} <br />
            {user.address.landmark} <br />
            {user.address.city} <br />
            {user.address.state} <br />
            {user.address.pincode} <br />
            {user.address.country}
          </p>
          <button
            className="edit-btn"
            onClick={() => {
              setIsEditingAddress(true);
              setCurrentAddress({
                street: "123 Example Street",
                city: "Mumbai",
                state: "Maharashtra",
                pincode: "400001",
                country: "India",
              });
            }}
          >
            Edit
          </button>
          <button className="delete-btn">Delete</button>
        </div>
        <button className="add-address-btn">+ Add New Address</button>
      </section>

      {/* Edit Address Modal */}
      {isEditingAddress && (
        <div className="modal">
          <div className="modal-content">
            <h2>Edit Address</h2>
            <input
              type="text"
              name="street"
              value={addressData.street || currentAddress?.street}
              onChange={handleAddressChange}
              placeholder="Street"
            />
            <input
              type="text"
              name="city"
              value={addressData.city || currentAddress?.city}
              onChange={handleAddressChange}
              placeholder="City"
            />
            <input
              type="text"
              name="state"
              value={addressData.state || currentAddress?.state}
              onChange={handleAddressChange}
              placeholder="State"
            />
            <input
              type="text"
              name="pincode"
              value={addressData.pincode || currentAddress?.pincode}
              onChange={handleAddressChange}
              placeholder="Pincode"
            />
            <input
              type="text"
              name="country"
              value={addressData.country || currentAddress?.country}
              onChange={handleAddressChange}
              placeholder="Country"
            />
            <button className="save-btn" onClick={saveAddress}>Save</button>
            <button className="cancel-btn" onClick={() => setIsEditingAddress(false)}>Cancel</button>
          </div>
        </div>
      )}
    </div>
  );
};

export default Profile;
