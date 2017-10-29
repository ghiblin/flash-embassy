import React from 'react';
import Panel from './panel';

export default function({ cards }) {
  return (
    <div>
      {
        cards && cards.map((c, i) => 
          <Panel key={i} cardNumber={i} frontContent={c.italian} backContent={c.english} />
        )
      }
    </div>
  )
}