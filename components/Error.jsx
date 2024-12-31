import React from 'react';

const Error = () => {
  const styles = {
    container: {
      display: 'flex',
      justifyContent: 'center',
      alignItems: 'center',
      height: '100vh', // Full viewport height
      backgroundColor: '#6342ff', // Light background color
    },
    message: {
      fontSize: '24px',
      fontWeight: 'bold',
      color: 'white', // Text color
    },
  };

  return (
    <div style={styles.container}>
      <div style={styles.message}>
        Kindly Install MetaMask for Seamless Transactions.
      </div>
    </div>
  );
};

export default Error;
