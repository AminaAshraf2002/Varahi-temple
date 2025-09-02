import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Home from './Pages/Home';
import About from './Pages/About';
import Festivals from './Pages/Festivals';
import Offerings from './Pages/Offerings';
import Gallery from './Pages/Gallery';
import Contact from './Pages/Contact';
import PoojaBooking from './Pages/PoojaBooking';
import PoojaReceipt from './Pages/PoojaReceipt';

// Admin Components
import AdminLogin from './admin/AdminLogin';
import AdminDashboard from './admin/AdminDashboard';

import './App.css';

function App() {
  return (
    <div className="App">
      <Router>
        <Routes>
          {/* Main Pages */}
          <Route path="/" element={<Home />} />
          <Route path="/home" element={<Home />} />
          <Route path="/about" element={<About />} />
          <Route path="/festivals" element={<Festivals />} />
          <Route path="/gallery" element={<Gallery />} />
          <Route path="/offerings" element={<Offerings />} />
          <Route path="/contact" element={<Contact />} />
          
          {/* Pooja Booking System */}
          <Route path="/book-pooja" element={<PoojaBooking />} />
          <Route path="/pooja-booking" element={<PoojaBooking />} />
          <Route path="/booking" element={<PoojaBooking />} />
          
          {/* Receipt Pages */}
          <Route path="/receipt" element={<PoojaReceipt />} />
          <Route path="/pooja-receipt" element={<PoojaReceipt />} />
          <Route path="/receipt/:receiptId" element={<PoojaReceipt />} />
          
          {/* Alternative Routes */}
          <Route path="/panchami-pooja" element={<PoojaBooking />} />
          <Route path="/online-booking" element={<PoojaBooking />} />
          <Route path="/book-online" element={<PoojaBooking />} />
          
          {/* Admin Routes */}
          <Route path="/admin" element={<AdminLogin />} />
      
          <Route path="/admin/dashboard" element={<AdminDashboard />} />
          
          
          {/* Redirect old routes */}
          <Route path="/history" element={<About />} />
          
          {/* 404 - Page Not Found (Optional) */}
          <Route path="*" element={<Home />} />
        </Routes>
      </Router>
    </div>
  );
}

export default App;