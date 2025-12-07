import React from 'react';
import { Link } from 'react-router-dom';
export const Rules: React.FC = () => {
  return (
    <div>
      <h2>Court Rules</h2>
        <p>We all love clean, safe courts! Please adhere to the following rules while using any of our courts:</p>
        <ul>
          <li>Leave the court in better condition than you found it.</li>
          <li>No food or drinks (except water) on the courts.</li>
          <li>Wear appropriate court shoes to avoid damaging the surface.</li>
          <li>Respect other players and stick to your booked timeslot.</li>
          <li>Follow all posted signs and guidelines.</li>
        </ul>
        <p>For additional questions or to report issues, please send us a message.</p>
    </div>
  );
};