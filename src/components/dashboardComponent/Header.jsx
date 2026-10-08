import React, { useState, useEffect } from "react";
import { UserCircle, ChevronDown, ChevronUp, LogOut, Store, User } from "lucide-react";
import { RiAdminLine } from "react-icons/ri";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import ReactDOM from "react-dom";
import { logoutUser, UpdateProfile, fetchProfile } from "../../features/auth/authUserSlice";
import { toast } from "react-hot-toast";

const Header = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const [open, setOpen] = useState(false);
  const [isProfileOpen, setIsProfileOpen] = useState(false);
  const [isEditing, setIsEditing] = useState(false);

  const profile = useSelector((state) => state.auth.user);

  const [profileData, setProfileData] = useState({
    email: "",
    phone: "",
  });

  useEffect(() => {
    dispatch(fetchProfile());
  }, [dispatch]);

  useEffect(() => {
    if (profile) {
      setProfileData({
        email: profile.email || "",
        phone: profile.phone || "",
      });
    }
  }, [profile]);

  useEffect(() => {
    if (isProfileOpen) {
      setOpen(false);
    }
  }, [isProfileOpen]);

  const handleLogout = () => {
    dispatch(logoutUser());
  };

  const handleSite = () => {
    navigate("/");
  };

  const handleProfile = () => {
    setIsProfileOpen((prev) => !prev);
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setProfileData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const resetProfileData = () => {
    setProfileData({
      email: profile.email || "",
      phone: profile.phone || "",
    });
  };

  const handleSave = async () => {
    try {
      if (!profile?._id) {
        alert("User ID missing, cannot update profile.");
        return;
      }
      await dispatch(UpdateProfile({ id: profile._id, userData: profileData })).unwrap();
      setIsEditing(false);
      dispatch(fetchProfile()); // Refresh profile data
      toast.success("Profile updated successfully!");
      
    } catch (err) {
      alert("Failed to update profile: " + err.message);
    }
  };

  return (
    <>
      <header className="bg-white flex items-center justify-between md:px-3 px-2 border-b shadow-sm">
        <div className="flex items-center space-x-3">
          <div className="flex items-center space-x-1">
            <h2 className="font-bold text-black md:text-2xl text-lg">Dashboard</h2>
            <img src="/luckmytrip.png" alt="Opencart" className="md:h-10 h-8 w-10 md:w-12" />
          </div>
        </div>

        <div className="flex items-center justify-end md:space-x-4 space-x-2">
          <div className="relative hover:bg-gray-100 py-3">
            <button className="flex items-center space-x-2" onClick={() => setOpen((prev) => !prev)}>
              <UserCircle className="md:w-8 md:h-8 w-5 h-5 text-blue-500 rounded-full" />
              <span className="text-blue-500 hidden md:block">
                {profile?.role?.toUpperCase() || "USER"}
              </span>
              {!open ? (
                <ChevronDown className="w-4 h-4 text-blue-500" />
              ) : (
                <ChevronUp className="w-4 h-4 text-blue-700" />
              )}
            </button>

            {open && (
              <div className="absolute top-10 right-0 bg-white rounded shadow-lg border z-20 w-48">
                <div
                  className="px-4 py-2 flex items-center gap-2 cursor-pointer hover:bg-blue-50"
                  onClick={handleProfile}
                >
                  <User className="text-purple-600 w-5 h-5" />
                  <button className="text-base font-semibold">Your Profile</button>
                </div>
                <div
                  className="border-t px-4 py-2 flex items-center gap-2 cursor-pointer hover:bg-blue-50"
                  onClick={handleSite}
                >
                  <Store className="w-5 h-5 text-purple-600" />
                  <button className="text-base font-semibold">Open Site</button>
                </div>
              </div>
            )}
          </div>

          {isProfileOpen &&
            ReactDOM.createPortal(
              <div className="fixed inset-0 bg-black bg-opacity-30 backdrop-blur-sm flex items-center justify-center z-50">
                <div className="bg-white rounded-xl shadow-2xl p-6 w-full max-w-sm relative">
                  <button
                    onClick={handleProfile}
                    className="absolute top-3 right-3 text-gray-400 hover:text-red-500"
                    aria-label="Close"
                  >
                    ✖
                  </button>

                  <div className="flex flex-col items-center justify-center space-y-1 mt-2">
                    <div className="bg-indigo-100 p-4 rounded-full mb-2 shadow border border-indigo-300">
                      <RiAdminLine size={36} className="text-indigo-600" />
                    </div>

                    <h2 className="text-xl font-semibold">{profile?.role?.toUpperCase()}</h2>

                    <form
                      className="w-full mt-4 space-y-4"
                      onSubmit={async (e) => {
                        e.preventDefault();
                        if (isEditing) {
                          await handleSave();
                        } else {
                          setIsEditing(true);
                        }
                      }}
                    >
                      <div>
                        <label className="block mb-1 font-medium">Email</label>
                        <input
                          type="email"
                          name="email"
                          value={profileData.email}
                          readOnly={!isEditing}
                          onChange={handleInputChange}
                          className={`w-full px-3 py-2 rounded border ${
                            isEditing
                              ? "focus:ring-2 focus:ring-indigo-500"
                              : "bg-gray-100 cursor-not-allowed"
                          }`}
                          required
                        />
                      </div>

                      <div>
                        <label className="block mb-1 font-medium">Phone</label>
                        <input
                          type="tel"
                          name="phone"
                          value={profileData.phone}
                          readOnly={!isEditing}
                          onChange={handleInputChange}
                          className={`w-full px-3 py-2 rounded border ${
                            isEditing
                              ? "focus:ring-2 focus:ring-indigo-500"
                              : "bg-gray-100 cursor-not-allowed"
                          }`}
                          required
                        />
                      </div>

                      <div className="flex justify-between space-x-3">
                        {!isEditing ? (
                          <button
                            type="submit"
                            className="px-4 py-2 bg-indigo-600 rounded text-white font-semibold w-full"
                          >
                            Edit
                          </button>
                        ) : (
                          <>
                            <button
                              type="submit"
                              className="px-4 py-2 bg-green-600 rounded text-white font-semibold w-full"
                            >
                              Save
                            </button>
                            <button
                              type="button"
                              onClick={() => {
                                setIsEditing(false);
                                resetProfileData();
                              }}
                              className="px-4 py-2 bg-gray-400 rounded text-white font-semibold w-full"
                            >
                              Cancel
                            </button>
                          </>
                        )}
                      </div>
                    </form>
                  </div>
                </div>
              </div>,
              document.body
            )}

          <button
            onClick={handleLogout}
            className="flex items-center space-x-1 cursor-pointer hover:bg-gray-100 md:py-4 py-2"
          >
            <span className="text-blue-500 font-medium text-sm md:text-medium">Logout</span>
            <LogOut className="text-blue-500 w-6 h-6 md:w-6 md:h-6" />
          </button>
        </div>
      </header>
    </>
  );
};

export default Header;
