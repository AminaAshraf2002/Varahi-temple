import React, { useRef, useState, useEffect } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';

const PoojaReceipt = () => {
  const receiptRef = useRef();
  const location = useLocation();
  const navigate = useNavigate();
  const [isLoading, setIsLoading] = useState(false);
  
  // Get booking data from navigation state or use default
  const defaultBookingData = {
    receiptNumber: "VST2024001",
    date: new Date().toLocaleDateString('en-IN'),
    devotee: {
      devoteName: "Test User",
      star: "Ashwathi"
    },
    pooja: {
      poojaEnglish: "Panchami Pooja",
      amount: 500
    },
    paymentMethod: "UPI Payment",
    temple: {
      name: "AALUMTHAZHAM SREE VARAHI TEMPLE",
      address: "Aalumthazham, Pathanamthitta District, Kerala - 689645",
      phone: "+91 8304091400"
    },
    participantNumber: 1,
    transactionId: "pay_test123456"
  };

  const bookingData = location.state?.bookingData || defaultBookingData;

  // Check if this is a test receipt
  const isTestReceipt = !location.state?.bookingData;

  useEffect(() => {
    // Log receipt data for debugging
    if (location.state?.bookingData) {
      console.log('Receipt data received:', location.state.bookingData);
    } else {
      console.log('Using default test receipt data');
    }
  }, [location.state]);

  const handlePrint = () => {
    try {
      window.print();
    } catch (error) {
      console.error('Print error:', error);
      alert('Print functionality not available in this browser');
    }
  };

  const handleDownloadImage = async () => {
    setIsLoading(true);
    
    try {
      // Create canvas to convert receipt to image
      const canvas = document.createElement('canvas');
      const ctx = canvas.getContext('2d');
      
      // Set A4 dimensions (at 96 DPI)
      canvas.width = 794;  // A4 width in pixels at 96 DPI
      canvas.height = 1123; // A4 height in pixels at 96 DPI
      
      // Fill white background
      ctx.fillStyle = '#ffffff';
      ctx.fillRect(0, 0, canvas.width, canvas.height);
      
      // Add receipt content as text (enhanced approach)
      ctx.fillStyle = '#000000';
      ctx.font = 'bold 28px Arial';
      ctx.textAlign = 'center';
      ctx.fillText(bookingData.temple.name, canvas.width/2, 80);
      
      ctx.font = '16px Arial';
      ctx.fillText(bookingData.temple.address, canvas.width/2, 110);
      ctx.fillText(bookingData.temple.phone, canvas.width/2, 135);
      
      // Receipt title with background
      ctx.fillStyle = '#8B0000';
      ctx.fillRect(50, 150, canvas.width - 100, 40);
      ctx.fillStyle = '#ffffff';
      ctx.font = 'bold 20px Arial';
      ctx.fillText('POOJA RECEIPT', canvas.width/2, 175);
      
      // Receipt details
      ctx.fillStyle = '#000000';
      ctx.font = '16px Arial';
      ctx.textAlign = 'left';
      const leftMargin = 100;
      let yPos = 230;
      
      const details = [
        `Receipt No: ${bookingData.receiptNumber}`,
        `Date: ${bookingData.date}`,
        `Devotee Name: ${bookingData.devotee.devoteName}`,
        `Star (Nakshatra): ${bookingData.devotee.star}`,
        `Pooja: ${bookingData.pooja.poojaEnglish}`,
        `Amount Paid: ₹${bookingData.pooja.amount}`,
        `Payment Method: ${bookingData.paymentMethod}`,
        ...(bookingData.participantNumber ? [`Participant #: ${bookingData.participantNumber}`] : []),
        ...(bookingData.transactionId ? [`Transaction ID: ${bookingData.transactionId}`] : [])
      ];
      
      details.forEach(detail => {
        ctx.fillText(detail, leftMargin, yPos);
        yPos += 35;
      });
      
      // Footer
      ctx.textAlign = 'center';
      ctx.font = 'bold 18px Arial';
      ctx.fillStyle = '#8B0000';
      ctx.fillText('Thank you for your devotion!', canvas.width/2, yPos + 60);
      
      ctx.font = '14px Arial';
      ctx.fillStyle = '#666666';
      ctx.fillText('Please bring this receipt on the day of pooja', canvas.width/2, yPos + 90);
      ctx.fillText(`Generated on: ${new Date().toLocaleDateString('en-IN')}`, canvas.width/2, yPos + 120);
      
      // Convert canvas to blob and download
      canvas.toBlob((blob) => {
        if (blob) {
          const url = URL.createObjectURL(blob);
          const a = document.createElement('a');
          a.href = url;
          a.download = `Receipt_${bookingData.receiptNumber}_${new Date().toISOString().split('T')[0]}.png`;
          document.body.appendChild(a);
          a.click();
          document.body.removeChild(a);
          URL.revokeObjectURL(url);
        } else {
          throw new Error('Failed to create image blob');
        }
      }, 'image/png');
      
    } catch (error) {
      console.error('Download error:', error);
      alert('Failed to download image. Please try the print option instead.');
    } finally {
      setIsLoading(false);
    }
  };

  const handleGoHome = () => {
    navigate('/');
  };

  const handleBookAnother = () => {
    navigate('/pooja-booking');
  };

  return (
    <div style={{ 
      fontFamily: 'Arial, sans-serif', 
      backgroundColor: '#f5f5f5', 
      minHeight: '100vh',
      padding: '20px'
    }}>
      {/* Test Receipt Warning */}
      {isTestReceipt && (
        <div style={{
          backgroundColor: '#fff3cd',
          border: '1px solid #ffeaa7',
          borderRadius: '5px',
          padding: '15px',
          margin: '0 auto 20px auto',
          maxWidth: '210mm',
          textAlign: 'center',
          color: '#856404'
        }}>
          ⚠️ This is a test receipt with sample data. Actual receipts will show real booking information.
        </div>
      )}

      {/* A4 Receipt Container */}
      <div 
        ref={receiptRef}
        style={{
          width: '210mm',
          minHeight: '297mm',
          margin: '0 auto',
          backgroundColor: 'white',
          padding: '40px',
          boxShadow: '0 0 20px rgba(0,0,0,0.1)',
          fontSize: '14px',
          lineHeight: '1.6'
        }}
      >
        {/* Header */}
        <div style={{ textAlign: 'center', marginBottom: '40px' }}>
          <div style={{ 
            fontSize: '26px', 
            fontWeight: 'bold', 
            color: '#8B0000',
            marginBottom: '10px'
          }}>
            {bookingData.temple.name}
          </div>
          <div style={{ fontSize: '14px', color: '#666', marginBottom: '5px' }}>
            {bookingData.temple.address}
          </div>
          <div style={{ fontSize: '14px', color: '#666' }}>
            Phone: {bookingData.temple.phone}
          </div>
        </div>

        {/* Receipt Title */}
        <div style={{ 
          textAlign: 'center', 
          fontSize: '20px', 
          fontWeight: 'bold',
          marginBottom: '30px',
          padding: '12px',
          border: '2px solid #8B0000',
          backgroundColor: '#f9f9f9',
          borderRadius: '5px'
        }}>
          POOJA RECEIPT
        </div>

        {/* Receipt Details */}
        <div style={{ marginBottom: '40px' }}>
          <table style={{ width: '100%', borderCollapse: 'collapse' }}>
            <tbody>
              <tr>
                <td style={{ 
                  padding: '12px 0', 
                  borderBottom: '1px solid #eee',
                  fontWeight: 'bold',
                  width: '40%'
                }}>
                  Receipt Number:
                </td>
                <td style={{ 
                  padding: '12px 0', 
                  borderBottom: '1px solid #eee',
                  fontFamily: 'monospace',
                  fontSize: '16px'
                }}>
                  {bookingData.receiptNumber}
                </td>
              </tr>
              <tr>
                <td style={{ 
                  padding: '12px 0', 
                  borderBottom: '1px solid #eee',
                  fontWeight: 'bold'
                }}>
                  Date:
                </td>
                <td style={{ 
                  padding: '12px 0', 
                  borderBottom: '1px solid #eee'
                }}>
                  {bookingData.date}
                </td>
              </tr>
              <tr>
                <td style={{ 
                  padding: '12px 0', 
                  borderBottom: '1px solid #eee',
                  fontWeight: 'bold'
                }}>
                  Devotee Name:
                </td>
                <td style={{ 
                  padding: '12px 0', 
                  borderBottom: '1px solid #eee',
                  fontWeight: '500'
                }}>
                  {bookingData.devotee.devoteName}
                </td>
              </tr>
              <tr>
                <td style={{ 
                  padding: '12px 0', 
                  borderBottom: '1px solid #eee',
                  fontWeight: 'bold'
                }}>
                  Star (Nakshatra):
                </td>
                <td style={{ 
                  padding: '12px 0', 
                  borderBottom: '1px solid #eee'
                }}>
                  {bookingData.devotee.star}
                </td>
              </tr>
              <tr>
                <td style={{ 
                  padding: '12px 0', 
                  borderBottom: '2px solid #8B0000',
                  fontWeight: 'bold'
                }}>
                  Pooja:
                </td>
                <td style={{ 
                  padding: '12px 0', 
                  borderBottom: '2px solid #8B0000',
                  fontWeight: 'bold',
                  color: '#8B0000'
                }}>
                  {bookingData.pooja.poojaEnglish}
                </td>
              </tr>
              <tr>
                <td style={{ 
                  padding: '15px 0',
                  fontWeight: 'bold',
                  fontSize: '16px'
                }}>
                  Amount Paid:
                </td>
                <td style={{ 
                  padding: '15px 0',
                  fontWeight: 'bold',
                  fontSize: '20px',
                  color: '#28a745'
                }}>
                  ₹{bookingData.pooja.amount}
                </td>
              </tr>
              <tr>
                <td style={{ 
                  padding: '12px 0',
                  fontWeight: 'bold'
                }}>
                  Payment Method:
                </td>
                <td style={{ 
                  padding: '12px 0'
                }}>
                  {bookingData.paymentMethod} (via Razorpay)
                </td>
              </tr>
              {bookingData.participantNumber && (
                <tr>
                  <td style={{ 
                    padding: '12px 0',
                    fontWeight: 'bold'
                  }}>
                    Participant Number:
                  </td>
                  <td style={{ 
                    padding: '12px 0',
                    fontWeight: '500'
                  }}>
                    #{bookingData.participantNumber} of 100
                  </td>
                </tr>
              )}
              {bookingData.transactionId && (
                <tr>
                  <td style={{ 
                    padding: '12px 0',
                    fontWeight: 'bold'
                  }}>
                    Transaction ID:
                  </td>
                  <td style={{ 
                    padding: '12px 0',
                    fontFamily: 'monospace',
                    fontSize: '12px'
                  }}>
                    {bookingData.transactionId}
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>

        {/* Footer */}
        <div style={{ 
          marginTop: '60px',
          textAlign: 'center',
          borderTop: '1px solid #eee',
          paddingTop: '20px'
        }}>
          <div style={{ 
            fontSize: '18px', 
            fontWeight: 'bold',
            color: '#8B0000',
            marginBottom: '15px'
          }}>
            Thank you for your devotion! 🙏
          </div>
          <div style={{ 
            fontSize: '14px', 
            color: '#666',
            marginBottom: '10px'
          }}>
            Please bring this receipt on the day of pooja
          </div>
          <div style={{ 
            fontSize: '12px', 
            color: '#666',
            marginBottom: '15px'
          }}>
            For any queries, contact: {bookingData.temple.phone}
          </div>
          <div style={{ 
            fontSize: '12px', 
            color: '#999',
            borderTop: '1px solid #eee',
            paddingTop: '10px'
          }}>
            Generated on: {new Date().toLocaleDateString('en-IN')} at {new Date().toLocaleTimeString('en-IN')}
          </div>
        </div>
      </div>

      {/* Action Buttons */}
      <div style={{ 
        textAlign: 'center', 
        marginTop: '30px',
        display: 'flex',
        justifyContent: 'center',
        gap: '15px',
        flexWrap: 'wrap'
      }}>
        <button 
          onClick={handlePrint}
          style={{
            backgroundColor: '#8B0000',
            color: 'white',
            border: 'none',
            padding: '12px 24px',
            borderRadius: '5px',
            fontSize: '16px',
            cursor: 'pointer',
            fontWeight: 'bold',
            display: 'flex',
            alignItems: 'center',
            gap: '8px'
          }}
        >
          🖨️ Print Receipt
        </button>
        
        <button 
          onClick={handleDownloadImage}
          disabled={isLoading}
          style={{
            backgroundColor: isLoading ? '#ccc' : '#28a745',
            color: 'white',
            border: 'none',
            padding: '12px 24px',
            borderRadius: '5px',
            fontSize: '16px',
            cursor: isLoading ? 'not-allowed' : 'pointer',
            fontWeight: 'bold',
            display: 'flex',
            alignItems: 'center',
            gap: '8px'
          }}
        >
          {isLoading ? (
            <>⏳ Generating...</>
          ) : (
            <>📄 Download PNG</>
          )}
        </button>

        <button 
          onClick={handleBookAnother}
          style={{
            backgroundColor: '#17a2b8',
            color: 'white',
            border: 'none',
            padding: '12px 24px',
            borderRadius: '5px',
            fontSize: '16px',
            cursor: 'pointer',
            fontWeight: 'bold'
          }}
        >
          📅 Book Another Pooja
        </button>

        <button 
          onClick={handleGoHome}
          style={{
            backgroundColor: '#6c757d',
            color: 'white',
            border: 'none',
            padding: '12px 24px',
            borderRadius: '5px',
            fontSize: '16px',
            cursor: 'pointer',
            fontWeight: 'bold'
          }}
        >
          🏠 Go Home
        </button>
      </div>

      <style>{`
        @media print {
          body * {
            visibility: hidden;
          }
          
          div[style*="210mm"] * {
            visibility: visible;
          }
          
          div[style*="210mm"] {
            position: absolute;
            left: 0;
            top: 0;
            width: 210mm !important;
            height: 297mm !important;
            margin: 0 !important;
            box-shadow: none !important;
          }
          
          button {
            display: none !important;
          }
          
          div[style*="fff3cd"] {
            display: none !important;
          }
        }
        
        button:hover:not(:disabled) {
          opacity: 0.9;
          transform: translateY(-1px);
          transition: all 0.2s ease;
        }
        
        @media (max-width: 768px) {
          div[style*="210mm"] {
            width: 100% !important;
            padding: 20px !important;
          }
        }
      `}</style>
    </div>
  );
};

export default PoojaReceipt;