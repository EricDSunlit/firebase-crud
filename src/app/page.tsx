import Link from 'next/link'
import { buttonVariants } from '@/components/ui/Button'

import AnimesDataTable from '@/components/AnimeDataTable'

function Home() {
  return (
    <main>
      <section className="flex flex-col items-center md:items-end">
        <Link
          href="/anime-create"
          className={buttonVariants({
            variant: 'ghost',
            className: 'bg-gray-200 rounded-xl mt-4 mb-6 hover:bg-gray-300'
          })}
        >
          Agregar +
        </Link>
      </section>

      <section className="flex justify-center ">
        <div className="w-3/4">
          <AnimesDataTable />
        </div>
      </section>
    </main>
  )
}

export default Home
