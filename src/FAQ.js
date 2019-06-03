import React from 'react';

import { documentToReactComponents } from '@contentful/rich-text-react-renderer';

const FAQ = (props) => {
  return (
    <div className="container">
      <div className="banner">
        <h1>{props.data.name}</h1>
        <p>{props.data.subtitle}</p>
      </div>
      {documentToReactComponents(props.data.text)}
    </div>
    
  );
}

export default FAQ;