import Link from 'next/link'

const Navbar = () => {
  return (
    <nav className="w-screen h-14 flex justify-center items-center bg-gray-200">
      <Link href="/">
        <h1 className="text-xl uppercase md:text-2xl">animes crud</h1>
      </Link>
    </nav>
  )
}

export default Navbar
