'use client'
export default function Error({ error }: { error: Error }) {
  return <div style={{ padding: 40, color: 'red' }}>
    <h2>Error</h2>
    <pre>{error.message}</pre>
    <pre>{error.stack}</pre>
  </div>
}