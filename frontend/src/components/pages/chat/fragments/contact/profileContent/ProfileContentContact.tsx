import React from 'react'
import HeaderContactLayout from '../HeaderContactLayout'
import { useSession } from '@providers/AuthProvider'
import Icon from '../../../../../../constants/icons';
import { colors } from '../../../../../../constants/color';
import PrfofleInputField from './PrfofleInputField';
import ContactContentLayout from '../ContactContentLayout';

function ProfileContentContact() {

  const { user } = useSession();
  return (
    <ContactContentLayout>
      <HeaderContactLayout
        label='Profile'
      />
      <div className='flex flex-col px-10 text-white'>

        {/* Profile Photo start */}
        <div className='w-full flex justify-center py-6'>
          <span
            className='text-3xl text-white w-[200px] flex justify-center items-center aspect-square rounded-full bg-gray-500'
          >
            {user.username?.charAt(0).toUpperCase()}
          </span>
        </div>
        {/* Profile Photo end */}

        <div className='flex flex-col gap-3'>
          <h3 className='text-green-primary'>Your name</h3>
          <PrfofleInputField
            action={async () => { }}
            value={user.username || ""}
          />
          <p className='pt-2 text-icon-color'>This is not your usernmae or PIN.</p>
        </div>

        <div className='flex flex-col gap-3 mt-12'>
          <h3 className='text-green-primary'>About</h3>
          <PrfofleInputField
            action={async () => { }}
            value={"Mee" || ""}
          />
        </div>
      </div>
    </ContactContentLayout>
  )
}

export default ProfileContentContact
