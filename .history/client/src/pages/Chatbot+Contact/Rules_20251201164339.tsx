import React, { useState } from 'react';

export const PickleballRules: React.FC = () => {

  return (
    <div>
      <h2>How to Play Pickleball</h2>
        <p>Pickleball is played with a paddle and a plastic ball with holes. Here are the basic rules:</p>
        <ul>
          <li>The game can be played as singles or doubles.</li>
          <li>The serve must be made underhand and diagonally cross-court.</li>
          <li>Points can only be scored by the serving team.</li>
          <li>The ball must bounce once on each side before volleys are allowed.</li>
          <li>The non-volley zone (kitchen) is a 7-foot area on both sides of the net where volleys are not allowed.</li>
          <li>Games are typically played to 11 points, and a team must win by 2 points.</li>
        </ul>
        <p>For more detailed rules, please refer to the official Pickleball rulebook.</p>
    </div>
  );
};