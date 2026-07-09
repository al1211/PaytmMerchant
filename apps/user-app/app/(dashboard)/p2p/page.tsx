import React from 'react'
import { SendMoney } from '../../../component/SendMoneyCard'

const page = () => {
  return (
    <div className='w-screen h-screen bg-green-500'>
        <div className='flex items-center justify-center w-screen bg-red-500 h-screen'>

          <SendMoney/>
        </div>
    </div>
  )
}

export default page