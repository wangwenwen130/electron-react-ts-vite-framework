import { useTempPassword } from 'main/hooks'
import React, { useEffect, useRef } from 'react'

function tempPassword(): React.ReactNode {
  const { updatePW, tempPwUpType } = useTempPassword()
  const tiemId = useRef<NodeJS.Timer | null>(null)

  const autoUpdate = () => {
    tiemId.current && clearTimeout(tiemId.current)
    switch (tempPwUpType) {
      case 1:
        tiemId.current = setInterval(updatePW, 1000 * 60 * 60 * 24)
        break
      case 2:
        tiemId.current = setInterval(updatePW, 1000 * 60 * 60 * 12)
        break
      case 3:
        tiemId.current = setInterval(updatePW, 1000 * 60 * 60)
        break
    }
  }

  useEffect(() => {
    updatePW()
    autoUpdate()
  }, [tempPwUpType])

  useEffect(() => {
    /** 初始化临时密码 */
    updatePW()
  }, [])
  return null
}

export default React.memo(tempPassword)
