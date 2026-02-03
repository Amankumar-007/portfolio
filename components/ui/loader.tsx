"use client"
import React from 'react';
import styled from 'styled-components';

const Loader = () => {
  return (
    <StyledWrapper>
      <div className="container">
        <div className="sun" />
        <div className="orbit orbit-1" />
        <div className="orbit orbit-2" />
        <div className="orbit orbit-3" />
      </div>
    </StyledWrapper>
  );
}

const StyledWrapper = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  height: 100px;

  .container {
    position: relative;
    width: 80px;
    height: 80px;
    display: flex;
    justify-content: center;
    align-items: center;
  }

  /* Central Glowing Core */
  .sun {
    width: 12px;
    height: 12px;
    background: #6366f1; /* Modern Indigo */
    border-radius: 50%;
    box-shadow: 0 0 15px #6366f1, 0 0 30px #6366f1;
  }

  .orbit {
    position: absolute;
    border-radius: 50%;
    border: 1.5px solid rgba(99, 102, 241, 0.2);
    border-top-color: #6366f1;
    animation: spin linear infinite;
  }

  /* Inner Ring */
  .orbit-1 {
    width: 30px;
    height: 30px;
    animation-duration: 1.2s;
  }

  /* Middle Ring */
  .orbit-2 {
    width: 55px;
    height: 55px;
    animation-duration: 1.8s;
    animation-direction: reverse; /* Reverse rotation for depth */
  }

  /* Outer Ring */
  .orbit-3 {
    width: 80px;
    height: 80px;
    animation-duration: 2.5s;
  }

  @keyframes spin {
    from {
      transform: rotate(0deg);
    }
    to {
      transform: rotate(360deg);
    }
  }
`;

export default Loader;