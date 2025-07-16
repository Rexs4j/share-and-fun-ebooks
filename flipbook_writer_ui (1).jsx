import React, { useState } from 'react';
import HTMLFlipBook from 'react-pageflip';

const ADMIN_EMAIL = "rex42803@gmail.com";

const COLORS = [
  '#FFF8DC', '#FAFAD2', '#E6E6FA', '#F0FFF0', '#F5F5DC', '#F0FFFF',
  '#F5DEB3', '#FDF5E6', '#FFE4E1', '#F0F8FF', '#E0FFFF', '#FFF0F5',
  '#FFEBCD', '#FFEFD5', '#FFF5EE', '#F8F8FF', '#FFFAF0', '#F0FFF0',
  '#E6E6FA', '#D3FFCE', '#F5F5DC', '#FDF5E6', '#FFFFE0', '#FFFACD',
  '#F0E68C', '#FFF0F5', '#E0FFFF', '#F0F8FF', '#FAFAD2', '#FFE4B5',
  '#D8BFD8', '#FFEFD5', '#FFDAB9', '#E0FFFF', '#E6E6FA', '#F0FFFF',
  '#FFF8DC', '#F5F5F5', '#F5F5DC', '#FFF5EE', '#FFFACD', '#E0FFFF',
  '#F0FFF0', '#FDF5E6', '#F0F8FF', '#FFE4C4', '#D3D3D3', '#ADD8E6',
  '#F08080', '#E0FFFF', '#F8F8FF', '#F5F5DC', '#F0F8FF', '#FFDAB9'
];

function HomePage({ onNavigate }) {
  return (
    <div
      className="p-8 text-center min-h-screen bg-cover bg-center"
      style={{ backgroundImage: "url('https://images.unsplash.com/photo-1497493292307-31c376b6e479?auto=format&fit=crop&w=1920&q=80')" }}
    >
      <div className="bg-white bg-opacity-80 p-10 rounded-xl shadow-md inline-block">
        <h1 className="text-3xl font-bold mb-6 text-green-800">Welcome to Share and Fun Ebooks</h1>
        <p className="mb-6 text-lg text-green-700">Create your own book or explore books written by others!</p>
        <div className="space-x-4">
          <button onClick={() => onNavigate('write')} className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600">✍️ Create a Book</button>
          <button onClick={() => onNavigate('browse')} className="px-4 py-2 bg-green-500 text-white rounded hover:bg-green-600">📚 Browse Books</button>
        </div>
      </div>
    </div>
  );
}

function FlipbookWriter() {
  const [pages, setPages] = useState([
    { id: 1, text: "", color: COLORS[0] },
    { id: 2, text: "", color: COLORS[1] }
  ]);

  const handleChange = (id, value) => {
    setPages((prev) =>
      prev.map((page) =>
        page.id === id ? { ...page, text: value } : page
      )
    );
  };

  const handleColorChange = (id, color) => {
    setPages((prev) =>
      prev.map((page) =>
        page.id === id ? { ...page, color } : page
      )
    );
  };

  const addPages = () => {
    const newId = pages.length + 1;
    setPages([
      ...pages,
      { id: newId, text: "", color: COLORS[newId % COLORS.length] },
      { id: newId + 1, text: "", color: COLORS[(newId + 1) % COLORS.length] },
    ]);
  };

  return (
    <div className="p-4 bg-gradient-to-br from-green-50 to-green-100 min-h-screen">
      <h1 className="text-2xl font-bold mb-4 text-center">Create Your Book</h1>
      <div className="flex justify-center">
        <HTMLFlipBook width={300} height={400} showCover={false}>
          {pages.map((page) => (
            <div
              key={page.id}
              className="p-4 shadow-md"
              style={{ backgroundColor: page.color }}
            >
              <textarea
                value={page.text}
                onChange={(e) => handleChange(page.id, e.target.value)}
                className="w-full h-full outline-none resize-none bg-transparent"
                maxLength={500}
                placeholder="Start writing... (max 500 words)"
              />
              <div className="mt-2">
                <label className="text-sm mr-2">Page Color:</label>
                <select
                  value={page.color}
                  onChange={(e) => handleColorChange(page.id, e.target.value)}
                  className="text-sm px-2 py-1 border rounded"
                >
                  {COLORS.map((c, idx) => (
                    <option key={idx} value={c} style={{ backgroundColor: c }}>
                      Page {idx + 1}
                    </option>
                  ))}
                </select>
              </div>
            </div>
          ))}
        </HTMLFlipBook>
      </div>
      <div className="mt-4 flex justify-center">
        <button onClick={addPages} className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600">Add More Pages</button>
      </div>
    </div>
  );
}

function BuyBook({ authorEarnings, adminEarnings, onBuy, userEmail }) {
  return (
    <div className="p-8 text-center">
      <h2 className="text-xl font-semibold mb-4">Buy a Book for ₹100</h2>
      <button onClick={onBuy} className="px-4 py-2 bg-purple-500 text-white rounded hover:bg-purple-600">💳 Buy Now</button>
      <div className="mt-6">
        <p>📚 Author Earnings: ₹{authorEarnings}</p>
        {userEmail === ADMIN_EMAIL && <p>👑 Admin Earnings: ₹{adminEarnings}</p>}
      </div>
    </div>
  );
}

export default function App() {
  const [page, setPage] = useState('home');
  const [authorEarnings, setAuthorEarnings] = useState(0);
  const [adminEarnings, setAdminEarnings] = useState(0);
  const [userEmail, setUserEmail] = useState("rex42803@gmail.com"); // Simulated logged-in user

  const handleBuy = () => {
    setAuthorEarnings(prev => prev + 70);
    setAdminEarnings(prev => prev + 30);
    alert("Thank you for buying! ₹70 sent to author, ₹30 to admin.");
  };

  return (
    <div>
      {page === 'home' && <HomePage onNavigate={setPage} />}
      {page === 'write' && <FlipbookWriter />}
      {page === 'browse' && (
        <BuyBook 
          authorEarnings={authorEarnings} 
          adminEarnings={adminEarnings} 
          onBuy={handleBuy} 
          userEmail={userEmail}
        />
      )}
    </div>
  );
}
