import React from 'react';

import { BLOCKS, MARKS } from '@contentful/rich-text-types';
import { documentToReactComponents } from '@contentful/rich-text-react-renderer';

const richTextDocument = {
  nodeType: 'document',
  data: {},
  content: [
    {
      nodeType: 'paragraph',
      data: {},
      content: [
        {
          nodeType: 'text',
          value: 'Hello',
          data: {},
          marks: [{ type: 'bold' }]
        },
        {
          nodeType: 'text',
          value: ' world!',
          data: {},
          marks: [{ type: 'italic' }]
        }
      ]
    }
  ]
};

const FAQ = (props) => {
  return (
    <div className="container">
      <div className="banner">
        <h1>{props.data.name}</h1>
        <p>{props.data.subtitle}</p>
      </div>
      {documentToReactComponents(props.data.text)}
      {/* <pre>{JSON.stringify(props.data, null, 2)}</pre> */}
    </div>
    
  );
}

export default FAQ;