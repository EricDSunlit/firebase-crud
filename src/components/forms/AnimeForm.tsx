'use client'

import { useEffect, useState } from 'react'
import { useRouter, useParams } from 'next/navigation'

import { useForm } from 'react-hook-form'
import { yupResolver } from '@hookform/resolvers/yup'
import { useToast } from '@/hooks/use-toast'

import { Anime } from '../../types/anime'
import { createAnime, getAnime, updateAnime } from '@/services/animes'
import { animeFormSchema } from '@/validators/animes.validator'

const AnimeForm = ({
  isEdit = false,
  isDetailView
}: {
  isEdit?: boolean
  isDetailView?: boolean
}) => {
  const router = useRouter()
  const params = useParams()
  const { toast } = useToast()

  const [anime, setAnime] = useState<Anime>({} as Anime)
  const [isLoading, setIsLoading] = useState<boolean>(false)

  const {
    register,
    handleSubmit,
    getValues,
    formState: { errors }
  } = useForm<Anime>({
    values: anime,
    resolver: yupResolver(animeFormSchema)
  })

  const onSubmit = async (data: Anime) => {
    if (isEdit) {
      updateAnime(params.anime as string, data)
        .then(() => {
          toast({
            title: 'Edición exitosa',
            description: 'El anime ha sido actualizado correctamente'
          })
          router.push('/')
        })
        .catch((error) => {
          toast({
            title: 'Edición fallida',
            description: `${error}`,
            variant: 'destructive'
          })
        })
    } else {
      createAnime(data)
        .then(() => {
          toast({
            title: 'Creación exitosa',
            description: 'El anime ha sido creado correctamente'
          })
          router.push('/')
        })
        .catch((error) => {
          toast({
            title: 'Creción fallida',
            description: `${error}`,
            variant: 'destructive'
          })
        })
    }
  }

  useEffect(() => {
    if (isEdit || isDetailView) {
      setIsLoading(true)
      const fetchAnime = async () => {
        const data = await getAnime(params.anime as string)
        setAnime(data)
      }
      fetchAnime().finally(() => setIsLoading(false))
    }
  }, [isEdit, params.anime, isDetailView])

  if (isLoading) return <div className="text-center mt-5">Cargando...</div>

  return (
    <div className="flex justify-center mt-14">
      <form
        onSubmit={handleSubmit(onSubmit)}
        className="space-y-4 w-3/4 flex flex-col"
      >
        <div className="flex flex-col gap-2">
          <label>Nombre</label>
          <input
            {...register('name')}
            defaultValue={anime?.name}
            className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-xl focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
            placeholder="Dragon Ball Z"
            disabled={isDetailView}
          />
          {errors.name ? (
            <p className="text-red-500 px-2 text-sm">{errors.name?.message}</p>
          ) : null}
        </div>

        <div className="flex flex-col gap-2">
          <label>Estatus</label>
          <select
            {...register('status')}
            value={anime?.status || ''}
            onChange={(e) => {
              setAnime({ ...getValues(), status: e.target.value })
            }}
            className="bg-gray-50 border  border-gray-300 text-gray-900 text-sm rounded-xl  focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
            disabled={isDetailView}
          >
            <option defaultValue="">Selecciona una opción</option>
            <option value="En emisión">En emisión</option>
            <option value="Finalizado">Finalizado</option>
            <option value="Cancelado">Cancelado</option>
          </select>
          {errors.status ? (
            <p className="text-red-500 px-2 text-sm">
              {errors.status?.message}
            </p>
          ) : null}
        </div>

        <div className="flex flex-col gap-2">
          <label>Genero</label>
          <select
            {...register('genre')}
            value={anime?.genre || ''}
            onChange={(e) => {
              setAnime({ ...getValues(), genre: e.target.value })
            }}
            className="bg-gray-50 border  border-gray-300 text-gray-900 text-sm rounded-xl  focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
            disabled={isDetailView}
          >
            <option defaultValue="">Selecciona una opción</option>
            <option value="Shounen">Shounen</option>
            <option value="Seinen">Seinen</option>
            <option value="Shoujo">Shoujo</option>
            <option value="Kodomo">Kodomo</option>
            <option value="Josei">Josei</option>
          </select>
          {errors.genre ? (
            <p className="text-red-500 px-2 text-sm">{errors.genre?.message}</p>
          ) : null}
        </div>

        <div className="flex flex-col gap-2">
          <label>Sinopsis</label>
          <textarea
            {...register('synopsis')}
            defaultValue={anime?.synopsis}
            className="block p-2.5 w-full text-sm text-gray-900 bg-gray-50 rounded-lg border border-gray-300 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
            placeholder="Escribe la sipnosis aquí..."
            disabled={isDetailView}
          />
          {errors.synopsis ? (
            <p className="text-red-500 px-2 text-sm">
              {errors.synopsis?.message}
            </p>
          ) : null}
        </div>

        <div className="flex flex-col gap-2">
          <label>Cantidad de temporadas</label>
          <input
            type="number"
            {...register('seasons')}
            defaultValue={anime?.seasons}
            className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-xl focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
            placeholder="2"
            disabled={isDetailView}
          />
          {errors.seasons ? (
            <p className="text-red-500 px-2 text-sm">
              {errors.seasons?.message}
            </p>
          ) : null}
        </div>

        <div className="flex flex-col gap-2">
          <label>Cantidad de episodios</label>
          <input
            type="number"
            {...register('episodes')}
            defaultValue={anime?.episodes}
            className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-xl focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
            placeholder="200"
            disabled={isDetailView}
          />
          {errors.episodes ? (
            <p className="text-red-500 px-2 text-sm">
              {errors.episodes?.message}
            </p>
          ) : null}
        </div>

        {!isDetailView ? (
          <input
            type="submit"
            value={'Guardar'}
            className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded-xl cursor-pointer flex md:self-end w-22 justify-center"
          />
        ) : null}
      </form>
    </div>
  )
}
export default AnimeForm
