import "./css/AdoptionPage.css";
import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap-icons/font/bootstrap-icons.css";
import "./css/PetPage.css";
import "./css/shared.css";
import React, { useEffect, useState } from "react";
import getPetsData from "../utils/getPetsData";
import LoadingScreen from "./LoadingScreen";
import { Link } from "react-router-dom";

function AdoptionPage() {
  const [pets, setPets] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [submitted, setSubmitted] = useState(false);
  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    phoneNumber: "",
  });

  useEffect(() => {
    const fetchPets = async () => {
      try {
        const data = await getPetsData();
        setPets(data);
      } catch (err) {
        setError("Failed to load pet data. Please try again later.");
      } finally {
        setLoading(false);
      }
    };

    fetchPets();
  }, []);

  if (loading) {
    return <LoadingScreen />;
  }

  if (error) {
    return (
      <div className="error-message">
        <p>{error}</p>
        <Link to="/">
          <button className="home-btn btn">
            <i className="bi bi-house-heart-fill"></i> Home
          </button>
        </Link>
      </div>
    );
  }

  const handleSubmit = (e) => {
    e.preventDefault();

    setSubmitted(true);

    setFormData({
      firstName: "",
      lastName: "",
      email: "",
      phoneNumber: "",
    });
  };

  const submitMessage = () => (
    <h3 className="submit-msg">
      Thank you for offering a home to one of our furry friends! :) We will
      contact you to finish the adoption process.
    </h3>
  );

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };

  return (
    <div className="max-space-available adopt-page-full">
      <div className="home-btn-div padding-left">
        <Link to="/">
          <button className="home-btn btn">
            <i className="bi bi-house-heart-fill"></i> Home
          </button>
        </Link>
      </div>
      <div className="adopt-page max-space-available">
        <form className="adopt-page-content" onSubmit={handleSubmit}>
          <div>
            {!submitted ? (
              <h3 className="form-title">
                Please fill out this form to bring your new furry friend home!
              </h3>
            ) : (
              submitMessage()
            )}
          </div>
          <div className="data-section">
            <label>First Name:</label>
            <input
              type="text"
              className="text-area"
              name="firstName"
              value={formData.firstName}
              onChange={handleInputChange}
              required
            />
          </div>
          <div className="data-section">
            <label>Last Name:</label>
            <input
              type="text"
              className="text-area"
              name="lastName"
              value={formData.lastName}
              onChange={handleInputChange}
              required
            />
          </div>
          <div className="data-section">
            <label>Email:</label>
            <input
              type="email"
              className="text-area"
              name="email"
              value={formData.email}
              onChange={handleInputChange}
              required
            />
          </div>
          <div className="data-section">
            <label>Phone Number:</label>
            <input
              type="tel"
              className="text-area"
              name="phoneNumber"
              value={formData.phoneNumber}
              onChange={handleInputChange}
              required
            />
          </div>
          <div className="submit-div">
            <button type="submit" className="adopt-submit">
              Adopt That Pet!
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}

export default AdoptionPage;
