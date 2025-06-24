import { onAuthStateChanged, updateProfile } from 'firebase/auth';
import { getDownloadURL, getStorage, ref, uploadBytes } from 'firebase/storage';
import React, { useEffect, useState } from 'react';
import TourComponent from "../../components/tourcomponent";
import { auth } from '../../firebaseConfig';
import './profilepage.css';

const ProfilePage = () => {
  const [activeTab, setActiveTab] = useState('about');
  const [tours, setTours] = useState([]);
  const [user, setUser] = useState(null);
  const [editModalOpen, setEditModalOpen] = useState(false);
  const [editName, setEditName] = useState('');
  const [editPhone, setEditPhone] = useState('');
  const [editPhoto, setEditPhoto] = useState(null);
  const [editPhotoPreview, setEditPhotoPreview] = useState(null);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (firebaseUser) => {
      setUser(firebaseUser);
      if (firebaseUser) {
        setEditName(firebaseUser.displayName || '');
        setEditPhone(firebaseUser.phoneNumber || '');
        setEditPhotoPreview(firebaseUser.photoURL || null);
      }
    });
    return () => unsubscribe();
  }, []);

  useEffect(() => {
    fetch('http://localhost:5000/api/tours')
      .then(res => res.json())
      .then(data => setTours(data))
      .catch(err => console.error(err));
  }, []);

  const handleEditProfile = () => {
    setEditModalOpen(true);
  };

  const handlePhotoChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setEditPhoto(file);
      setEditPhotoPreview(URL.createObjectURL(file));
    }
  };

  const handleEditSave = async (e) => {
    e.preventDefault();
    if (user) {
      try {
        let photoURL = user.photoURL;
        if (editPhoto) {
          // Use UID as identifier for storage path
          const storage = getStorage();
          const storageRef = ref(storage, `profile_photos/${user.uid}.jpg`);
          await uploadBytes(storageRef, editPhoto);
          photoURL = await getDownloadURL(storageRef);
        }
        await updateProfile(user, { displayName: editName, photoURL });
        setUser({ ...user, displayName: editName, photoURL });
        setEditModalOpen(false);
      } catch (err) {
        alert('Failed to update profile.');
      }
    }
  };

  if (!user) return <div>Loading user...</div>;

  return (
    <div className="profile-container">
      <div className="profile-card">
        <div className="profile-content">
          {/* Left Sidebar */}
          <aside className="profile-sidebar">
            <div className="profile-image-container">
              <img
                src={user.photoURL || 'https://ui-avatars.com/api/?name=' + encodeURIComponent(user.displayName || user.email || 'User')}
                alt={user.displayName || user.email || 'User'}
                className="profile-image"
              />
              <p className="caption">Profile</p>
            </div>
            {/* You can show user's favorite locations or remove this section if not needed */}
          </aside>
          {/* Main Content Area */}
          <main className="profile-main">
            <div className="profile-header">
              <div className="profile-info">
                <h1 className="profile-name">{user.displayName || 'No Name'}</h1>
                <div className="profile-location">
                  <span className="location-icon">📧</span>
                  <span>{user.email}</span>
                </div>
                {/* You can show a rating or other info here if you want */}
              </div>
              <div className="edit-profile-container">
                <button className="send-message-btn" onClick={handleEditProfile}>
                  Edit Profile
                </button>
              </div>
            </div>
            {/* Remove action buttons not relevant for own profile */}
            <div className="user-profile-tabs">
              <button
                className={`user-profile-tab ${activeTab === 'tours' ? 'active' : ''}`}
                onClick={() => setActiveTab('tours')}
              >
                <span className="clock-icon">🧭</span>
                <span>Tours</span>
              </button>
              <button
                className={`user-profile-tab ${activeTab === 'about' ? 'active' : ''}`}
                onClick={() => setActiveTab('about')}
              >
                <span className="about-icon">👤</span>
                <span>About</span>
              </button>
            </div>
            <div className="tab-content">
              {activeTab === 'about' && (
                <div className="about-content">
                  <div className="info-section">
                    <h3 className="section-label">Contact Information</h3>
                    <div className="info-grid">
                      <div className="info-item">
                        <p className="info-label">E-mail:</p>
                        <p className="info-value email">{user.email}</p>
                      </div>
                      <div className="info-item">
                        <p className="info-label">Phone:</p>
                        <p className="info-value">{user.phoneNumber || 'Not set'}</p>
                      </div>
                    </div>
                  </div>
                  {/* You can add more info fields here if you store them in Firestore */}
                </div>
              )}
              {activeTab === 'tours' && (
                <div className="tours-container">
                  <div className="tour-list">
                    {tours.length > 0 ? (
                      tours.map((tour, index) => (
                        <TourComponent
                          key={index}
                          image={tour.image}
                          title={tour.title}
                          destinations={tour.destinations}
                          price={tour.price}
                          preDefTourId={tour.preDefTourId}
                        />
                      ))
                    ) : (
                      <p>Loading tours...</p>
                    )}
                  </div>
                </div>
              )}
            </div>
            {/* Edit Profile Modal */}
            {editModalOpen && (
              <div className="modal-overlay">
                <div className="modal-content">
                  <h2>Edit Profile</h2>
                  <form onSubmit={handleEditSave}>
                    <div className="form-group" style={{ textAlign: 'center' }}>
                      <img
                        src={editPhotoPreview || user.photoURL || 'https://ui-avatars.com/api/?name=' + encodeURIComponent(editName || user.email || 'User')}
                        alt="Profile Preview"
                        className="profile-image"
                        style={{ width: 90, height: 90, objectFit: 'cover', borderRadius: 16, marginBottom: 8 }}
                      />
                      <input
                        type="file"
                        accept="image/*"
                        onChange={handlePhotoChange}
                        style={{ marginTop: 8 }}
                      />
                    </div>
                    <div className="form-group">
                      <label>Name</label>
                      <input
                        type="text"
                        value={editName}
                        onChange={e => setEditName(e.target.value)}
                        required
                      />
                    </div>
                    <div className="form-group">
                      <label>Phone</label>
                      <input
                        type="text"
                        value={editPhone}
                        onChange={e => setEditPhone(e.target.value)}
                        placeholder="Not set"
                        disabled
                      />
                      <small>Phone editing not supported in demo</small>
                    </div>
                    <div style={{ display: 'flex', gap: '1rem', marginTop: 16 }}>
                      <button type="submit" className="send-message-btn">Save</button>
                      <button type="button" className="report-btn" onClick={() => setEditModalOpen(false)}>Cancel</button>
                    </div>
                  </form>
                </div>
              </div>
            )}
          </main>
        </div>
      </div>
    </div>
  );
};

export default ProfilePage;