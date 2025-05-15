import { useState, useEffect } from 'react'
import { Button } from 'antd'
import { useTranslation } from 'react-i18next'

export default function Home() {
  const [count, setCount] = useState(0)
  const { t } = useTranslation()

  return (
    <>
      <div>{count}</div>
      <Button className="color-red w-200px bg-blue hover:bg-blue" onClick={() => setCount(count + 1)}>
        点击++{t('sys')}
      </Button>
    </>
  )
}
