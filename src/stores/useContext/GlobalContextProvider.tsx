import React from 'react';
import { AuthProvider } from './AuthProvider';
import { LoadingProvider } from './LoadingProvider';

function ProviderComposer({ contexts, children }: any) {
  return contexts.reduceRight((nested: any, base: any) => React.cloneElement(base, { children: nested }), children);
}

function GlobalContextProvider({ children }: any) {
  return <ProviderComposer contexts={[<AuthProvider />, <LoadingProvider />]}>{children}</ProviderComposer>;
}

export { GlobalContextProvider };
