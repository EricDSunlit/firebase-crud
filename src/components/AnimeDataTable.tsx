'use client'

import { useEffect, useState } from 'react'
import { ColumnDef } from '@tanstack/react-table'
import { DataTable } from './ui/DataTable'
import { Button } from '@/components/ui/Button'
import { MoreHorizontal } from 'lucide-react'
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuTrigger
} from '@/components/ui/Dropdown-menu'
import Link from 'next/link'

import { Anime } from '@/types/anime'
import { deleteAnime, getAnimes } from '@/services/animes'
import { useToast } from '@/hooks/use-toast'

const AnimesDataTable = () => {
  const [animes, setAnimes] = useState<Anime[]>([])
  const [isLoading, setIsLoading] = useState<boolean>(true)
  const { toast } = useToast()

  const fetchAnimes = async () => {
    setAnimes(await getAnimes())
  }

  const removeAnime = async (id: string) => {
    if (window.confirm('¿Desea eliminar este anime?')) {
      await deleteAnime(id)
        .then(() => fetchAnimes())
        .catch(() => {
          toast({
            title: 'Eliminación fallida',
            description: 'No se ha podido eliminar el anime',
            variant: 'destructive'
          })
        })
        .finally(() => {
          toast({
            title: 'Eliminación exitosa',
            description: 'El anime ha sido eliminado correctamente'
          })
        })
    }
  }

  useEffect(() => {
    fetchAnimes().finally(() => setIsLoading(false))
  }, [])

  const columns: ColumnDef<Anime>[] = [
    {
      accessorKey: 'name',
      header: 'Nombre'
    },
    {
      accessorKey: 'genre',
      header: 'Género'
    },
    {
      accessorKey: 'status',
      header: 'Estado'
    },
    {
      accessorKey: 'seasons',
      header: 'Temporadas'
    },
    {
      id: 'actions',
      enableHiding: false,
      cell: ({ row }) => {
        const anime = row.original

        return (
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="ghost" className="h-8 w-8 p-0">
                <span className="sr-only">Open menu</span>
                <MoreHorizontal className="h-4 w-4" />
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end" className="bg-white">
              <DropdownMenuLabel>Acciones</DropdownMenuLabel>
              <Link href={`/${anime.id}`}>
                <DropdownMenuItem className="focus:bg-gray-200 cursor-pointer">
                  Ver detalles
                </DropdownMenuItem>
              </Link>
              <Link href={`/${anime.id}/edit`}>
                <DropdownMenuItem className="focus:bg-gray-200 cursor-pointer">
                  Editar
                </DropdownMenuItem>
              </Link>
              <DropdownMenuItem
                onClick={() => removeAnime(anime.id!)}
                className="focus:bg-gray-200 focus:text-red-500 cursor-pointer text-red-500"
              >
                Eliminar
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        )
      }
    }
  ]

  if (isLoading)
    return (
      <div className="flex justify-center">
        <span>Cargando...</span>
      </div>
    )

  return (
    <>
      <DataTable columns={columns} data={animes} />
    </>
  )
}

export default AnimesDataTable
