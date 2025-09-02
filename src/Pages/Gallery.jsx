// Gallery.jsx - Updated with Video Imports
import React, { useEffect, useState } from 'react';
import AOS from 'aos';
import 'aos/dist/aos.css';
import Header from '../components/Header';
import Footer from '../components/Footer';
import './Gallery.css';

// Import images
import templeDeity from '../assets/logo.png';
import templeBuilding from '../assets/about.jpg';
import festivalCelebration from '../assets/gallery.jpg';
import poojaRitual from '../assets/gallery3.JPG';
import templeInterior from '../assets/gallery4.jpg';
import templeExterior from '../assets/gallery1.JPG';
import ceremonyHall from '../assets/above.jpg';

// Import videos - Add your video files to assets/videos folder
import dailyPoojaVideo from '../assets/gallery.MOV';
import festivalVideo from '../assets/gallery.mp4';
import ceremonyVideo from '../assets/gallery2.mp4';
import templeHistoryVideo from '../assets/gallery3.mp4';

const Gallery = () => {
  const [activeFilter, setActiveFilter] = useState('all');
  const [selectedImage, setSelectedImage] = useState(null);
  const [showLightbox, setShowLightbox] = useState(false);
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const [selectedVideo, setSelectedVideo] = useState(null);
  const [showVideoModal, setShowVideoModal] = useState(false);

  useEffect(() => {
    // Initialize AOS
    AOS.init({
      duration: 1000,
      once: true,
      offset: 120,
      easing: 'ease-out-cubic',
      delay: 100
    });

    // Scroll to top when component mounts
    window.scrollTo(0, 0);
  }, []);

  // Gallery Images Data
  const galleryImages = [
    {
      id: 1,
      src: templeDeity,
      title: "Divine Goddess Varahi",
      category: "deity",
      description: "Sacred image of Goddess Varahi, the main deity of our temple",
      date: "2024",
      photographer: "Temple Archives"
    },
    {
      id: 2,
      src: templeBuilding,
      title: "Temple Architecture",
      category: "architecture",
      description: "Beautiful traditional Kerala architecture of the main temple building",
      date: "2024",
      photographer: "Temple Documentation"
    },
    {
      id: 3,
      src: festivalCelebration,
      title: "Festival Celebrations",
      category: "festivals",
      description: "Devotees gathering during the annual temple festival celebrations",
      date: "2024",
      photographer: "Festival Committee"
    },
    {
      id: 4,
      src: poojaRitual,
      title: "Sacred Pooja Rituals",
      category: "rituals",
      description: "Daily pooja rituals being performed by the temple priests",
      date: "2024",
      photographer: "Ritual Documentation"
    },
    {
      id: 5,
      src: templeInterior,
      title: "Temple Interior",
      category: "architecture",
      description: "Beautifully decorated interior of the temple sanctum",
      date: "2024",
      photographer: "Interior Design Team"
    },
    {
      id: 6,
      src: templeExterior,
      title: "Temple Exterior View",
      category: "architecture",
      description: "Majestic exterior view of the temple complex",
      date: "2024",
      photographer: "Architecture Documentation"
    },
    {
      id: 7,
      src: ceremonyHall,
      title: "Ceremony Hall",
      category: "events",
      description: "The spacious ceremony hall used for special events and gatherings",
      date: "2024",
      photographer: "Event Management"
    },
    {
      id: 8,
      src: templeBuilding,
      title: "Evening Temple View",
      category: "architecture",
      description: "Beautiful evening view of the temple with traditional lighting",
      date: "2024",
      photographer: "Evening Documentation"
    },
    {
      id: 9,
      src: festivalCelebration,
      title: "Devotees in Prayer",
      category: "devotees",
      description: "Devotees engaged in sincere prayers and meditation",
      date: "2024",
      photographer: "Spiritual Moments"
    },
    {
      id: 10,
      src: poojaRitual,
      title: "Abhishekam Ceremony",
      category: "rituals",
      description: "Sacred abhishekam being performed to the deity",
      date: "2024",
      photographer: "Ritual Photography"
    },
    {
      id: 11,
      src: templeInterior,
      title: "Sanctum Sanctorum",
      category: "deity",
      description: "The most sacred area of the temple where the main deity resides",
      date: "2024",
      photographer: "Sacred Spaces"
    },
    {
      id: 12,
      src: ceremonyHall,
      title: "Cultural Programs",
      category: "events",
      description: "Traditional cultural programs during festival times",
      date: "2024",
      photographer: "Cultural Documentation"
    }
  ];

  // Gallery Categories
  const categories = [
    { id: 'all', name: 'All Photos', count: galleryImages.length, icon: 'fas fa-images' },
    { id: 'deity', name: 'Deity', count: galleryImages.filter(img => img.category === 'deity').length, icon: 'fas fa-star' },
    { id: 'architecture', name: 'Architecture', count: galleryImages.filter(img => img.category === 'architecture').length, icon: 'fas fa-building' },
    { id: 'festivals', name: 'Festivals', count: galleryImages.filter(img => img.category === 'festivals').length, icon: 'fas fa-calendar-alt' },
    { id: 'rituals', name: 'Rituals', count: galleryImages.filter(img => img.category === 'rituals').length, icon: 'fas fa-pray' },
    { id: 'events', name: 'Events', count: galleryImages.filter(img => img.category === 'events').length, icon: 'fas fa-calendar-check' },
    { id: 'devotees', name: 'Devotees', count: galleryImages.filter(img => img.category === 'devotees').length, icon: 'fas fa-users' }
  ];

  // Video Gallery Data with imported videos
  const videoGallery = [
    {
      id: 1,
      thumbnail: poojaRitual,
      videoSrc: dailyPoojaVideo, // Imported video file
      title: "Daily Pooja Rituals",
      description: "Experience the serenity of daily temple rituals and prayers",
  
      category: "rituals",
      
    },
    {
      id: 2,
      thumbnail: festivalCelebration,
      videoSrc: festivalVideo, // Imported video file
      title: "Festival Celebrations",
      description: "Highlights from our recent temple festival celebrations",
    
      category: "festivals",
    
    },
    {
      id: 3,
      thumbnail: ceremonyHall,
      videoSrc: ceremonyVideo, // Imported video file
      title: "Special Ceremonies",
      description: "Sacred ceremonies and special events at our temple",
    
      category: "ceremonies",
    
    },
    {
      id: 4,
      thumbnail: templeInterior,
      videoSrc: templeHistoryVideo, // Imported video file
      title: "Temple Tour & History",
      description: "A comprehensive tour of our temple with historical insights",
      category: "history",
     
    }
  ];

  // Filter images based on active category
  const filteredImages = activeFilter === 'all' 
    ? galleryImages 
    : galleryImages.filter(image => image.category === activeFilter);

  // Handle image click for lightbox
  const handleImageClick = (image, index) => {
    setSelectedImage(image);
    setCurrentImageIndex(index);
    setShowLightbox(true);
    document.body.style.overflow = 'hidden';
  };

  // Handle video click
  const handleVideoClick = (video) => {
    setSelectedVideo(video);
    setShowVideoModal(true);
    document.body.style.overflow = 'hidden';
  };

  // Close lightbox
  const closeLightbox = () => {
    setShowLightbox(false);
    setSelectedImage(null);
    document.body.style.overflow = 'unset';
  };

  // Close video modal
  const closeVideoModal = () => {
    setShowVideoModal(false);
    setSelectedVideo(null);
    document.body.style.overflow = 'unset';
  };

  // Navigate to next image
  const nextImage = () => {
    const nextIndex = (currentImageIndex + 1) % filteredImages.length;
    setCurrentImageIndex(nextIndex);
    setSelectedImage(filteredImages[nextIndex]);
  };

  // Navigate to previous image
  const prevImage = () => {
    const prevIndex = currentImageIndex === 0 ? filteredImages.length - 1 : currentImageIndex - 1;
    setCurrentImageIndex(prevIndex);
    setSelectedImage(filteredImages[prevIndex]);
  };

  // Handle keyboard navigation
  useEffect(() => {
    const handleKeyPress = (e) => {
      if (showLightbox) {
        if (e.key === 'Escape') {
          closeLightbox();
        } else if (e.key === 'ArrowRight') {
          nextImage();
        } else if (e.key === 'ArrowLeft') {
          prevImage();
        }
      }
      if (showVideoModal && e.key === 'Escape') {
        closeVideoModal();
      }
    };

    window.addEventListener('keydown', handleKeyPress);
    return () => window.removeEventListener('keydown', handleKeyPress);
  }, [showLightbox, showVideoModal, currentImageIndex]);

  return (
    <div className="gallery-page">
      {/* Header */}
      <Header />

      {/* Hero Section */}
      <section className="gallery-hero">
        <div className="gallery-hero-bg">
          <img src={festivalCelebration} alt="Temple Gallery" />
          <div className="gallery-hero-overlay"></div>
        </div>
        
        <div className="gallery-hero-content">
          <div className="container">
            <div className="hero-text" data-aos="fade-up">
              <div className="section-badges">
                <i className="fas fa-camera"></i>
                <span>Sacred Moments</span>
              </div>
              <h1>Temple Photo Gallery</h1>
              <p>Discover the Beauty and Spirituality Through Our Sacred Images</p>
              <div className="hero-breadcrumb">
                <span>Home</span>
                <i className="fas fa-chevron-right"></i>
                <span>Gallery</span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Gallery Statistics */}
      <section className="gallery-stats">
        <div className="container">
          <div className="stats-grid" data-aos="fade-up">
            <div className="stat-card">
              <div className="stat-icon">
                <i className="fas fa-images"></i>
              </div>
              <div className="stat-number">{galleryImages.length}+</div>
              <div className="stat-label">Sacred Images</div>
            </div>
            <div className="stat-card">
              <div className="stat-icon">
                <i className="fas fa-video"></i>
              </div>
              <div className="stat-number">{videoGallery.length}</div>
              <div className="stat-label">Sacred Videos</div>
            </div>
            <div className="stat-card">
              <div className="stat-icon">
                <i className="fas fa-building"></i>
              </div>
              <div className="stat-number">25+</div>
              <div className="stat-label">Architecture Shots</div>
            </div>
            <div className="stat-card">
              <div className="stat-icon">
                <i className="fas fa-heart"></i>
              </div>
              <div className="stat-number">100+</div>
              <div className="stat-label">Devotional Moments</div>
            </div>
          </div>
        </div>
      </section>

      {/* Gallery Categories Filter */}
      <section className="gallery-filters">
        <div className="container">
          <div className="filters-header" data-aos="fade-up">
            <h2>Browse by Category</h2>
            <p>Explore our collection of sacred images organized by themes</p>
          </div>

          <div className="filter-categories" data-aos="fade-up" data-aos-delay="200">
            {categories.map((category) => (
              <button
                key={category.id}
                className={`category-filter ${activeFilter === category.id ? 'active' : ''}`}
                onClick={() => setActiveFilter(category.id)}
              >
                <div className="filter-icon">
                  <i className={category.icon}></i>
                </div>
                <div className="filter-content">
                  <span className="filter-name">{category.name}</span>
                  <span className="filter-count">{category.count} photos</span>
                </div>
              </button>
            ))}
          </div>
        </div>
      </section>

      {/* Gallery Grid */}
      <section className="gallery-grid-section">
        <div className="container">
          <div className="gallery-header" data-aos="fade-up">
            <h2>
              {activeFilter === 'all' ? 'All Photos' : categories.find(cat => cat.id === activeFilter)?.name}
            </h2>
            <p>{filteredImages.length} photos in this collection</p>
          </div>

          <div className="gallery-grid">
            {filteredImages.map((image, index) => (
              <div 
                key={image.id} 
                className={`gallery-item ${image.category}`}
                data-aos="fade-up" 
                data-aos-delay={100 + index * 50}
                onClick={() => handleImageClick(image, index)}
              >
                <div className="gallery-image">
                  <img src={image.src} alt={image.title} loading="lazy" />
                  <div className="gallery-overlay">
                    <div className="overlay-content">
                      <div className="image-category">
                        <i className={categories.find(cat => cat.id === image.category)?.icon}></i>
                        <span>{image.category}</span>
                      </div>
                      <h3>{image.title}</h3>
                      <p>{image.description}</p>
                      <div className="image-meta">
                        <span className="image-date">
                          <i className="fas fa-calendar"></i>
                          {image.date}
                        </span>
                        <span className="image-photographer">
                          <i className="fas fa-camera"></i>
                          {image.photographer}
                        </span>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>

          {filteredImages.length === 0 && (
            <div className="no-images" data-aos="fade-up">
              <div className="no-images-content">
                <i className="fas fa-image"></i>
                <h3>No images found</h3>
                <p>Try selecting a different category to view more photos.</p>
              </div>
            </div>
          )}
        </div>
      </section>

      {/* Video Gallery Section - Updated with imported videos */}
      <section className="video-gallery">
        <div className="container">
          <div className="section-header" data-aos="fade-up">
            <div className="section-badge">
              <i className="fas fa-video"></i>
              <span>Video Gallery</span>
            </div>
            <h2>Sacred Video Moments</h2>
            <p>Experience temple life through our video collection</p>
          </div>

          <div className="video-grid">
            {videoGallery.map((video, index) => (
              <div 
                key={video.id} 
                className="video-card" 
                data-aos="fade-up" 
                data-aos-delay={200 + index * 100}
                onClick={() => handleVideoClick(video)}
              >
                <div className="video-thumbnail">
                  <img src={video.thumbnail} alt={video.title} />
                  <div className="play-button">
                    <i className="fas fa-play"></i>
                  </div>
                  <div className="video-duration">{video.duration}</div>
                  <div className="video-category-badge">
                    <span>{video.category}</span>
                  </div>
                </div>
                <div className="video-content">
                  <h3>{video.title}</h3>
                  <p>{video.description}</p>
                  <div className="video-meta">
                    <span><i className="fas fa-eye"></i> {video.views} views</span>
                    <span><i className="fas fa-clock"></i> {video.uploadDate}</span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Image Lightbox Modal */}
      {showLightbox && selectedImage && (
        <div className="lightbox-overlay" onClick={closeLightbox}>
          <div className="lightbox-container" onClick={(e) => e.stopPropagation()}>
            <button className="lightbox-close" onClick={closeLightbox}>
              <i className="fas fa-times"></i>
            </button>
            
            <button className="lightbox-nav lightbox-prev" onClick={prevImage}>
              <i className="fas fa-chevron-left"></i>
            </button>
            
            <button className="lightbox-nav lightbox-next" onClick={nextImage}>
              <i className="fas fa-chevron-right"></i>
            </button>

            <div className="lightbox-content">
              <div className="lightbox-image">
                <img src={selectedImage.src} alt={selectedImage.title} />
              </div>
              
              <div className="lightbox-info">
                <div className="info-header">
                  <h2>{selectedImage.title}</h2>
                  <div className="info-category">
                    <i className={categories.find(cat => cat.id === selectedImage.category)?.icon}></i>
                    <span>{selectedImage.category}</span>
                  </div>
                </div>
                
                <p className="info-description">{selectedImage.description}</p>
                
                <div className="info-meta">
                  <div className="meta-item">
                    <i className="fas fa-calendar"></i>
                    <span>{selectedImage.date}</span>
                  </div>
                  <div className="meta-item">
                    <i className="fas fa-camera"></i>
                    <span>{selectedImage.photographer}</span>
                  </div>
                  <div className="meta-item">
                    <i className="fas fa-images"></i>
                    <span>{currentImageIndex + 1} of {filteredImages.length}</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Video Modal */}
      {showVideoModal && selectedVideo && (
        <div className="video-modal-overlay" onClick={closeVideoModal}>
          <div className="video-modal-container" onClick={(e) => e.stopPropagation()}>
            <button className="video-modal-close" onClick={closeVideoModal}>
              <i className="fas fa-times"></i>
            </button>
            
            <div className="video-modal-content">
              <div className="video-player">
                <video 
                  controls 
                  autoPlay 
                  width="100%" 
                  height="100%"
                  poster={selectedVideo.thumbnail}
                >
                  <source src={selectedVideo.videoSrc} type="video/mp4" />
                  Your browser does not support the video tag.
                </video>
              </div>
              
              <div className="video-modal-info">
                <h2>{selectedVideo.title}</h2>
                <p>{selectedVideo.description}</p>
                <div className="video-modal-meta">
                  <span><i className="fas fa-eye"></i> {selectedVideo.views} views</span>
                  <span><i className="fas fa-clock"></i> {selectedVideo.uploadDate}</span>
                  <span><i className="fas fa-tag"></i> {selectedVideo.category}</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Footer */}
      <Footer />
    </div>
  );
};

export default Gallery;