'use client'
import React from 'react'
import { SessionProvider, signOut, useSession } from 'next-auth/react';
import Toast, { StatusToast } from './toast';
import ProviderContext from './context/themeContext';

const Provider = ({ children }: {
    children: React.ReactNode,
}) => {

    return (
        <SessionProvider >
            <ProviderContext>
                {children}
            </ProviderContext>
        </SessionProvider>
    )
}

export default Provider