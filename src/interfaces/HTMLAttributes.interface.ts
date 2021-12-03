import React from 'react';
interface HTMLAttributes extends React.HTMLAttributes<HTMLElement> {
    ['data-testid']?: string;
}
export default HTMLAttributes;
