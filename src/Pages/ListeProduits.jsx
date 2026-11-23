import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';

const ListeProduits = () => {
  const [produits, setProduits] = useState([]);
  const [searchId, setSearchId] = useState('');
  const navigate = useNavigate();

  
   useEffect(() => {
    fetch('https://fakestoreapi.com/products')
      .then(response => {
        if (!response.ok) {
          throw new Error('Erreur réseau');
        }
        return response.json();
      })
      .then(data => {
        setProduits(data);
      })
      .catch(error => console.error("Erreur lors de la récupération:", error));
  }, []);

  const handleSearch = () => {
    if (searchId.trim() !== '') {
     
      navigate(`/produit/${searchId}`);
    }
  };

  return (
    <div style={{ padding: '20px', fontFamily: 'Arial' }}>
      <h1 style={{ color: '#6a1b9a' }}>Discover Our Amazing Products</h1>
      
      {/* Barre de recherche */}
      <div style={{ margin: '20px 0', display: 'flex', gap: '10px' }}>
        <input 
          type="number" 
          placeholder="Product ID..." 
          value={searchId}
          onChange={(e) => setSearchId(e.target.value)}
          style={{ padding: '10px', width: '200px', borderRadius: '5px', border: '1px solid #ccc' }}
        />
        <button 
          onClick={handleSearch}
          style={{ padding: '10px 20px', backgroundColor: '#9c27b0', color: 'white', border: 'none', borderRadius: '5px', cursor: 'pointer' }}
        >
          Rechercher
        </button>
      </div>

      
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(250px, 1fr))', gap: '20px' }}>
        {produits.map(produit => (
          <div key={produit.id} style={{ border: '1px solid #eee', borderRadius: '10px', padding: '15px', textAlign: 'center', boxShadow: '0 4px 8px rgba(0,0,0,0.1)' }}>
            <img src={produit.image} alt={produit.title} style={{ height: '150px', objectFit: 'contain', marginBottom: '10px' }} />
            <h3 style={{ fontSize: '16px', height: '40px', overflow: 'hidden' }}>{produit.title}</h3>
            <p style={{ fontWeight: 'bold', color: '#333' }}>${produit.price}</p>
            
          
            <Link to={`/produit/${produit.id}`}>
              <button style={{ padding: '8px 15px', backgroundColor: '#673ab7', color: 'white', border: 'none', borderRadius: '5px', cursor: 'pointer', marginTop: '10px' }}>
                Voir Détails
              </button>
            </Link>
          </div>
        ))}
      </div>
    </div>
  );
};

export default ListeProduits;