import React from 'react';

const Loader = () => {
  const styles = {
    loaderWrapper: {
      position: 'fixed',
      top: 0,
      left: 0,
      width: '100%',
      height: '100%',
      display: 'flex',
      justifyContent: 'center',
      alignItems: 'center',
      backgroundColor: 'transparent', // Optional: semi-transparent background
      zIndex: 9999, // Ensure the loader is on top of other elements
    },
    spinner: {
      border: '8px solid #f3f3f3', // Light grey
      borderTop: '8px solid #6610f2', // Blue
      borderRadius: '50%',
      width: '60px',
      height: '60px',
      animation: 'spin 1s linear infinite',
    },
  };

  return (
    <div style={styles.loaderWrapper}>
      <div style={styles.spinner}></div>
      <style>
        {`
          @keyframes spin {
            0% { transform: rotate(0deg); }
            100% { transform: rotate(360deg); }
          }
        `}
      </style>
    </div>
  );
};

export default Loader;
