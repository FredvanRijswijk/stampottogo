import React from 'react';
import { array, shape } from 'prop-types';
import { RichText } from 'prismic-reactjs';
import { Box, Context, Image } from 'theme-ui'
import {
  Button,
  Desc,
  Eyebrow,
  Grid,
  Head,
  TextBlock,
  Title,
  Slice,
  Wrap,
} from '../../node_modules/essential-slices/src/components'

const section = {
  maxWidth: '600px',
  margin: '4em auto',
  textAlign: 'center',
};

const h2 = {
  color: '#8592e0',
};

const BigHeader = ({ slice }) => (

<>

{ slice.primary.title ? <RichText render={slice.primary.title} /> : <div></div>}
    { slice.primary.subtitle_headline ? <RichText render={slice.primary.subtitle_headline} /> : <div></div>}
    
    { slice.primary.description && (
      <Desc sx={{ textAlign: 'left', mx: 0 }}>
      <RichText render={slice.primary.description} />
    </Desc>
    )}
   
</>

);

BigHeader.propTypes = {
  slice: shape({
    primary: shape({
      title: array.isRequired,
    }).isRequired,
  }).isRequired,
};

export default BigHeader;
