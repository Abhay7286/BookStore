import React, { useState } from "react";
import "./Profile.css";
import { useUserStore } from "../../store/useUserStore.js";
import { useEffect } from "react";

const Profile = () => {
  const { user, updateUser, updateAddress, userOrders,fetchUserOrders} = useUserStore();
  const [isEditingProfile, setIsEditingProfile] = useState(false);
  const [isEditingAddress, setIsEditingAddress] = useState(false);

  useEffect(() => {
    fetchUserOrders();
  }, [fetchUserOrders]);

  const [formData, setFormData] = useState({
    name: user.name,
    email: user.email,
    phone: user.phone,
  });

  const [addressData, setAddressData] = useState({
    street: user.address[0].street || "",
    landmark: user.address[0].landmark || "",
    city: user.address[0].city || "",
    state: user.address[0].state || "",
    pincode: user.address[0].pincode || "",
    country: user.address[0].country || "",
  });


  // console.log(userOrders[userOrders.length - 1]);


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

      <section className="profile-details">
        <div className="profile-card">
          <div className="profile-info">
            {!isEditingProfile ? (
              <>
                <p>Full Name: {user.name}</p>
                <p>Email: {user.email}</p>
                <p>Mobile Number: {user.phone}</p>
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

      <section className="address-book">
        <h2>Saved Addresses</h2>
        <div className="address-card">
          <h3>Address</h3>
          <p>
            Street: {addressData.street} <br/>
            Landmark: {addressData.landmark} <br />
            City: {addressData.city} <br />
            State: {addressData.state} <br />
            Pincode: {addressData.pincode} <br />
            Country: {addressData.country}
          </p>
          <button
            className="edit-btn"
            onClick={ () => {setIsEditingAddress(true)} }
          >
            Edit
          </button>
          <button className="delete-btn">Delete</button>
        </div>
        <button className="add-address-btn">+ Add New Address</button>
      </section>

      {isEditingAddress && (
        <div className="modal">
          <div className="modal-content">
            <h2>Edit Address</h2>
            <input
              type="text"
              name="street"
              value={addressData.street}
              onChange={handleAddressChange}
              placeholder="Street"
            />
            <input
              type="text"
              name="landmark"
              value={addressData.landmark}
              onChange={handleAddressChange}
              placeholder="Landmark"
            />
            <input
              type="text"
              name="city"
              value={addressData.city}
              onChange={handleAddressChange}
              placeholder="City"
            />
            <input
              type="text"
              name="state"
              value={addressData.state}
              onChange={handleAddressChange}
              placeholder="State"
            />
            <input
              type="text"
              name="pincode"
              value={addressData.pincode }
              onChange={handleAddressChange}
              placeholder="Pincode"
            />
            <input
              type="text"
              name="country"
              value={addressData.country }
              onChange={handleAddressChange}
              placeholder="Country"
            />
            <button className="save-btn" onClick={saveAddress}>Save</button>
            <button className="cancel-btn" onClick={() => setIsEditingAddress(false)}>Cancel</button>
          </div>
        </div>
      )}

{/* <section className="address-book">
        <h2>Last Ordered</h2>
        <div className="address-card">
          <h3>Order</h3>
          <p>
            books: {userOrders[userOrders.length - 1].books} <br/>
            TotalAmount: {userOrders[userOrders.length - 1].totalamount} <br />
            Country: {addressData.country}
          </p>
          <button
            className="edit-btn"
            onClick={ () => {setIsEditingAddress(true)} }
          >
            Edit
          </button>
          <button className="delete-btn">Delete</button>
        </div>
        <button className="add-address-btn">+ Add New Address</button>
      </section> */}
    </div>
  );
};

export default Profile;
