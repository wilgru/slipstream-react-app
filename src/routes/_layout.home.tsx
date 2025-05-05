import { createFileRoute, redirect } from '@tanstack/react-router'
import { SlipCard } from 'src/components/SlipCard/SlipCard'
import { colours } from 'src/constants/colours.constant'
import { useGetSlips } from 'src/hooks/slips/useGetSlips'
import isAuthenticated from 'src/utils/users/isAuthenticated'

export const Route = createFileRoute('/_layout/home')({
  component: JournalComponent,
  // loader: ({ params }) => fetchJournal(params.journalId),
  beforeLoad: async ({ location }) => {
    if (!isAuthenticated()) {
      throw redirect({
        to: '/login',
        search: {
          redirect: location.href,
        },
      })
    }
  },
})

export default function JournalComponent() {
  const { slips } = useGetSlips({ isFlagged: false })

  return (
    <div className="w-[700px] h-full">
      <div className="p-3 mb-[50vh] ml-9 mr-3 min-h-full rounded-2xl flex flex-col gap-10 bg-white">
        {slips.map((slip) => (
          <SlipCard slip={slip} colour={colours.red} />
        ))}
      </div>
    </div>
  )
}
