import Temppw from './temp_pw'

export default function businessLayout({ children }: { children: React.ReactNode }) {
  return (
    <>
      <Temppw />
      {children}
    </>
  )
}
