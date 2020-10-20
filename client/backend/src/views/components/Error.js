import React, { memo } from 'react';
import styled from '@emotion/styled';

const ErrorContainer = styled('div')`
  width: 100%;
  box-sizing: border-box;
  padding: 8px 10px;
  color: #9a0200;
  border: 1px solid #9a0200;
  background-color: #ffb5b4;
`;

const Error = memo(({ error }) => {
    return (
        error ? (
            <ErrorContainer>
                Error: {error.message || 'Error is not recognized'}
            </ErrorContainer>
        ) : null
    )
});

export default Error;