import React, { useState, useEffect } from "react";
import EmployeeNavbar from "../Employeedash/Navbar";
import { useSelector } from "react-redux";
import { FaUserCircle, FaSave, FaCamera, FaEdit } from "react-icons/fa";

export default function EmployeeProfile() {
  const { currentUser } = useSelector((state) => state.login);

  const defaultData = {
    id: "EMP-102",
    name: "John Doe",
    role: "Server",
    email: "john.doe@example.com",
    phone: "1234567890",
    username: "johndoe",
    lastLogin: "2025-10-15 10:30 AM",
    photo: "", // Default or from JSON
    password: "password123", // stored password (for demo)
  };

  const [profile, setProfile] = useState(currentUser || defaultData);
  const [editMode, setEditMode] = useState(false);
  const [passwordData, setPasswordData] = useState({
    current: "",
    new: "",
    confirm: "",
  });

  useEffect(() => {
    const savedProfile = JSON.parse(localStorage.getItem("employeeProfile"));
    if (savedProfile) setProfile(savedProfile);
  }, []);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setProfile((prev) => ({ ...prev, [name]: value }));
  };

  const handlePhotoChange = (e) => {
    const file = e.target.files[0];
    if (!file) return;
    const reader = new FileReader();
    reader.onloadend = () => {
      setProfile((prev) => ({ ...prev, photo: reader.result }));
      localStorage.setItem("employeePhoto", JSON.stringify(reader.result));
    };
    reader.readAsDataURL(file);
  };

  const handlePasswordChange = (e) => {
    const { name, value } = e.target;
    setPasswordData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSave = () => {
    // Password validation
    if (passwordData.current || passwordData.new || passwordData.confirm) {
      if (passwordData.current !== profile.password) {
        alert("Current password is incorrect!");
        return;
      }
      if (passwordData.new !== passwordData.confirm) {
        alert("New passwords do not match!");
        return;
      }
      setProfile((prev) => ({ ...prev, password: passwordData.new }));
    }

    localStorage.setItem("employeeProfile", JSON.stringify(profile));
    setEditMode(false);
    setPasswordData({ current: "", new: "", confirm: "" });
    alert("Profile updated successfully!");
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-[#f7f0fd] via-[#dfc9b8] to-[#ae8c72] text-[#04040b]">
      <EmployeeNavbar />
      <div className="max-w-4xl mx-auto p-8">
        <h1 className="text-3xl font-bold mb-6">My Profile</h1>

        <div className="bg-[#f7f0fd]/70 border border-[#ae8c72] rounded-3xl p-8 shadow-lg flex flex-col md:flex-row gap-8">
          {/* Left - Photo */}
          <div className="flex flex-col items-center gap-4">
            {profile.photo ? (
              <img
                src={profile.photo}
                alt={profile.name}
                className="w-32 h-32 rounded-full border-2 border-[#ae8c72]"
              />
            ) : (
              <FaUserCircle className="text-9xl text-[#ae8c72]" />
            )}

            {editMode && (
              <label className="cursor-pointer flex items-center gap-2 text-[#04040b]/70 hover:text-[#ae8c72] transition">
                <FaCamera /> Upload Photo
                <input
                  type="file"
                  accept="image/*"
                  onChange={handlePhotoChange}
                  className="hidden"
                />
              </label>
            )}
          </div>

          {/* Right - Info Form */}
          <div className="flex-1 flex flex-col gap-4">
            <div className="grid md:grid-cols-2 gap-4">
              {[
                { label: "Full Name", name: "name" },
                { label: "Role", name: "role" },
                { label: "Email", name: "email" },
                { label: "Phone", name: "phone" },
              ].map((field) => (
                <div key={field.name}>
                  <label className="text-sm font-medium">{field.label}</label>
                  <input
                    type={field.name === "email" ? "email" : "text"}
                    name={field.name}
                    value={profile[field.name]}
                    onChange={handleChange}
                    readOnly={!editMode}
                    className={`w-full mt-1 px-3 py-2 rounded-xl border border-[#ae8c72]/50 ${
                      editMode
                        ? "bg-white/70 text-[#04040b]"
                        : "bg-white/30 text-[#04040b]/70 cursor-not-allowed"
                    }`}
                  />
                </div>
              ))}
            </div>

            <div className="grid md:grid-cols-2 gap-4 mt-2">
              <div>
                <label className="text-sm font-medium">Username</label>
                <input
                  type="text"
                  value={profile.username}
                  readOnly
                  className="w-full mt-1 px-3 py-2 rounded-xl border border-[#ae8c72]/50 bg-white/50 text-[#04040b]/70 cursor-not-allowed"
                />
              </div>
              <div>
                <label className="text-sm font-medium">Last Login</label>
                <input
                  type="text"
                  value={profile.lastLogin}
                  readOnly
                  className="w-full mt-1 px-3 py-2 rounded-xl border border-[#ae8c72]/50 bg-white/50 text-[#04040b]/70 cursor-not-allowed"
                />
              </div>
            </div>

            {/* Password Section */}
            {editMode && (
              <div className="mt-4 border-t border-[#ae8c72]/50 pt-4">
                <h3 className="text-lg font-semibold text-[#ae8c72] mb-2">
                  Change Password
                </h3>
                <div className="grid md:grid-cols-3 gap-4">
                  <input
                    type="password"
                    name="current"
                    placeholder="Current Password"
                    value={passwordData.current}
                    onChange={handlePasswordChange}
                    className="w-full px-3 py-2 rounded-xl border border-[#ae8c72]/50 bg-white/70 text-[#04040b]"
                  />
                  <input
                    type="password"
                    name="new"
                    placeholder="New Password"
                    value={passwordData.new}
                    onChange={handlePasswordChange}
                    className="w-full px-3 py-2 rounded-xl border border-[#ae8c72]/50 bg-white/70 text-[#04040b]"
                  />
                  <input
                    type="password"
                    name="confirm"
                    placeholder="Confirm New Password"
                    value={passwordData.confirm}
                    onChange={handlePasswordChange}
                    className="w-full px-3 py-2 rounded-xl border border-[#ae8c72]/50 bg-white/70 text-[#04040b]"
                  />
                </div>
              </div>
            )}

            {/* Buttons */}
            <div className="flex gap-4 mt-4">
              {!editMode ? (
                <button
                  onClick={() => setEditMode(true)}
                  className="bg-[#ae8c72] hover:bg-[#dfc9b8] text-white font-semibold px-6 py-2 rounded-xl flex items-center gap-2 transition"
                >
                  <FaEdit /> Edit Profile
                </button>
              ) : (
                <button
                  onClick={handleSave}
                  className="bg-[#ae8c72] hover:bg-[#dfc9b8] text-white font-semibold px-6 py-2 rounded-xl flex items-center gap-2 transition"
                >
                  <FaSave /> Save Changes
                </button>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
