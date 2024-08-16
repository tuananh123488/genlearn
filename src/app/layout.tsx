import type { Metadata } from 'next'
import { Inter } from 'next/font/google'
import './globals.css'
import axios from "axios";
import Provider from '@/components/provider';
import Toast, { StatusToast } from '@/components/toast';
import { useContext } from 'react';
import { ThemeContext } from '@/components/context/themeContext';
import Openal from '@/components/openal/openal';
const inter = Inter({ subsets: ['latin'] })
axios.create({
  baseURL: 'http://localhost:8080'
})

export const metadata: Metadata = {
  title: 'GenLearn',
  description: 'Education',
  icons: {
    icon: '/logo-mini.png',
  },
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <head>
        <link
          href="https://unpkg.com/boxicons@2.1.4/css/boxicons.min.css"
          rel="stylesheet"
        />
      </head>
      <body className={inter.className}>
        <div className='bg-[white] w-[100%] min-h-screen z-10 relative'>
          <Provider>
            {children}
            <Openal />
          </Provider>
        </div>
      </body>
    </html>
  )
}
