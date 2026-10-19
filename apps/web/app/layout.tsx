export const metadata = { title: 'Chat' }

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="pt-BR">
      <body style={{ fontFamily: 'system-ui', maxWidth: 600, margin: '2rem auto', padding: '0 1rem' }}>
        {children}
      </body>
    </html>
  )
}
