import React, { createContext, useContext, ReactNode } from 'react';
import { Dependencies, createDependencies } from '../../infrastructure/factory/dependencies';

const DependenciesContext = createContext<Dependencies | undefined>(undefined);

export const DependenciesProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const dependencies = createDependencies();

  return (
    <DependenciesContext.Provider value={dependencies}>
      {children}
    </DependenciesContext.Provider>
  );
};

export const useDependencies = () => {
  const context = useContext(DependenciesContext);
  if (!context) {
    throw new Error('useDependencies must be used within a DependenciesProvider');
  }
  return context;
};
