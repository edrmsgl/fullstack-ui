'use client';
import React from 'react'
import Title from './title'
import Image from 'next/image';

const MessagesData = [
  {
    personImage: "https://randomuser.me/api/portraits/women/1.jpg",
    personName: "Dr. Lila Ramirez",
    personMessage: "Hi team, just a reminder that our science fair preparation meeting starts at 10:00 am. Please bring your materials and be ready to present your ideas."
  },
  {
    personImage: "https://randomuser.me/api/portraits/men/2.jpg",
    personName: "Mr. John Carter",
    personMessage: "I’ve gone through the project timeline again and noticed some dependencies we didn’t account for. Let’s review them in our next check-in."
  },
  {
    personImage: "https://randomuser.me/api/portraits/women/3.jpg",
    personName: "Ms. Anna Kowalski",
    personMessage: "Thanks for submitting your reports on time. I’ll be reviewing them this afternoon and will share feedback before the weekend."
  },
  {
    personImage: "https://randomuser.me/api/portraits/men/4.jpg",
    personName: "Dr. Samir Patel",
    personMessage: "Could you please double-check the figures in the second section of the document? There seems to be a mismatch with the previous dataset."
  },
  {
    personImage: "https://randomuser.me/api/portraits/women/5.jpg",
    personName: "Mrs. Emily Stone",
    personMessage: "The students responded very positively to the new reading assignments. I think it’s a great idea to continue this format next term."
  },
  {
    personImage: "https://randomuser.me/api/portraits/men/6.jpg",
    personName: "Mr. Ahmed Khan",
    personMessage: "Let’s make sure we allocate some extra time for the Q&A session tomorrow. Based on the last meeting, there were quite a few unresolved questions."
  },
  {
    personImage: "https://randomuser.me/api/portraits/women/7.jpg",
    personName: "Dr. Naomi Lee",
    personMessage: "I've attached the updated syllabus for next semester. Please review and let me know if there are any topics you'd like to include or revise."
  },
  {
    personImage: "https://randomuser.me/api/portraits/men/8.jpg",
    personName: "Mr. Carlos Mendez",
    personMessage: "Just finished setting up the lab equipment for tomorrow’s experiment. Everything should be ready for students by 9:00 am."
  },
  {
    personImage: "https://randomuser.me/api/portraits/women/9.jpg",
    personName: "Ms. Sarah Chen",
    personMessage: "I’m currently finalizing the presentation slides. If anyone has visuals or data to include, please send them over by the end of the day."
  },
  {
    personImage: "https://randomuser.me/api/portraits/men/10.jpg",
    personName: "Prof. David Kim",
    personMessage: "Excellent work on the recent assessments. The students showed real improvement, and your guidance clearly made a difference."
  }
];

const Messages = ({ title }: { title: string }) => {
  return (
    <div className='bg-white rounded-2xl w-full p-4'>
      <Title title={title} />
      <div className='w-full'>
        {MessagesData.map((messageItem, index) => (
          <div className='my-2' key={index}>
            <div className={'flex justify-center items-center rounded-md p-2.5 gap-2.5'}>
            <div className='w-1/6'>
              <Image src={messageItem.personImage} alt='' width={50} height={50} unoptimized className='rounded-full overflow-hidden' />
            </div>
            <div className='w-5/6'>
              <div className='font-bold text-[16px]'>{messageItem.personName}</div>
              <div className='text-gray-400 text-[12px]'>{messageItem.personMessage}</div>
            </div>
          </div>
          </div>
        ))}
      </div>
    </div>
  )
}

export default Messages;