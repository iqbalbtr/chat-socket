import { useContact } from '@contexts/chat/ContactContext'
import { StatusUser } from '@contexts/chat/contact/StatusContactContext'
import { getHourTime } from '@utils/timeNotif'

export default function StatusCard({ data }: { data: StatusUser }) {

  const { contact } = useContact()
  const dataLength = data.data.length

  const statusNotif = data.data.filter(foo => !foo.status_read[0]).length  >= 1 ? true : false
  
  return (
    <div className='w-full  pl-1 hover:bg-hover-color pb-3' key={data.id}>
      <div className='w-full flex items-center gap-4' >
        <img 
        className={`w-[45px] h-[45px] aspect-square object-cover rounded-full mt-2 outline-offset-2 outline ${statusNotif ? "outline-2 outline-green-accent" : "outline-2 outline-gray-400"}`} 
        src={data.data[dataLength - 1]?.src!} 
        alt="" />
        <div className='text-left  border-hover-color border-t w-full pt-2'>
          <h3>{contact.find(foo => foo.username === data.username)?.name}</h3>
          <span className='text-sm text-icon-color'>Today at {getHourTime(data.data[dataLength - 1]?.create_at)}</span>
        </div>
      </div>
    </div>
  )
}
