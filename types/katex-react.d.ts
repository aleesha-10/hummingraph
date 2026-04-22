// path: types/katex-react.d.ts
declare module 'katex-react' {
  import React from 'react';

  export interface KatexProps {
    math: string;
    errorColor?: string;
    renderError?: (error: Error) => React.ReactNode;
  }

  export class BlockMath extends React.Component<KatexProps> {}
  export class InlineMath extends React.Component<KatexProps> {}
}