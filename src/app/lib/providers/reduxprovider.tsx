"use client";

import { Provider } from 'react-redux';
import { ReactNode } from 'react';
import { store ,persistor} from '@/app/store';
import { PersistGate } from 'redux-persist/integration/react';



interface ReduxProviderProps {
  children: ReactNode;
}

export default function ReduxProvider({ children }: ReduxProviderProps) {
  return <Provider store={store}>
      <PersistGate loading={null} persistor={persistor}>
        {children}
      </PersistGate>
    </Provider>
}