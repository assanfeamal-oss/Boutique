import React, { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';

const DetailsProduit = () => {
  const { id } = useParams();
  const [produit, setProduit] = useState(null);
  const [loading, setLoading] = useState(true);

    useEffect(() => {
    fetch(`https://fakestoreapi.com/products/${id}`)
      .then(response => {
        if (!response.ok) {
          throw new Error('Produit introuvable');
        }
        return response.json();
      })
      .then(data => {
        setProduit(data);
        setLoading(false);
      })
      .catch(error => {
        console.error("Erreur:", error);
        setLoading(false);
      });
  }, [id]);

    
  if (loading) return <h2 style={{ textAlign: 'center', marginTop: '50px' }}>Chargement...</h2>;
  if (!produit) return <h2 style={{ textAlign: 'center', marginTop: '50px' }}>Produit introuvable.</h2>;

  return (
    <div style={{ padding: '40px', fontFamily: 'Arial', maxWidth: '900px', margin: '0 auto' }}>
      <Link to="/" style={{ textDecoration: 'none', color: '#673ab7', fontWeight: 'bold' }}>
        ← Retour à la liste
      </Link>
      
      <div style={{ display: 'flex', marginTop: '30px', gap: '40px', border: '1px solid #eee', padding: '30px', borderRadius: '15px' }}>
        
        <div style={{ flex: '1', textAlign: 'center' }}>
          <img src={produit.image} alt={produit.title} style={{ maxWidth: '100%', height: '300px', objectFit: 'contain' }} />
        </div>

        
        <div style={{ flex: '2' }}>
          <span style={{ backgroundColor: '#e1bee7', color: '#4a148c', padding: '5px 10px', borderRadius: '15px', fontSize: '12px', fontWeight: 'bold' }}>
            {produit.category}
          </span>
          <h1 style={{ marginTop: '15px', color: '#333' }}>{produit.title}</h1>
          <p style={{ fontSize: '18px', color: '#ff9800' }}>⭐ {produit.rating.rate} ({produit.rating.count} reviews)</p>
          <h2 style={{ color: '#673ab7', fontSize: '28px' }}>${produit.price}</h2>
          <h3 style={{ marginTop: '20px' }}>Description</h3>
          <p style={{ color: '#555', lineHeight: '1.6' }}>{produit.description}</p>
          <button style={{ padding: '12px 25px', backgroundColor: '#9c27b0', color: 'white', border: 'none', borderRadius: '8px', cursor: 'pointer', marginTop: '20px', fontSize: '16px' }}>
            Continue Shopping
          </button>
        </div>
      </div>
    </div>
  );
};

export default DetailsProduit;