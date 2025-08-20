'use client'

import './i18n'
import { ThemeProvider } from '../contexts/ThemeContext'
import { ErrorBoundary } from '../components/ErrorBoundary'

export default function Providers({ children }: { children: React.ReactNode }) {
  return (
    <ErrorBoundary>
      <ThemeProvider>
        {children}
      </ThemeProvider>
    </ErrorBoundary>
  )
}