import * as yup from 'yup'

export const animeFormSchema = yup.object({
  name: yup.string().required('El nombre del anime es requerido'),
  status: yup
    .string()
    .required('El estado del anime es requerido')
    .oneOf(
      ['En emisión', 'Finalizado', 'Cancelado'],
      'Seleccione un estado valido'
    ),
  genre: yup
    .string()
    .required('El genero del anime es requerido')
    .oneOf(
      ['Shounen', 'Seinen', 'Shoujo', 'Kodomo', 'Josei'],
      'Seleccione un genero valido'
    ),
  synopsis: yup
    .string()
    .required('La sinopsis del anime es requerida')
    .min(20, 'La sinopsis debe tener al menos 20 caracteres'),
  seasons: yup
    .number()
    .typeError('La cantidad de episodios debe ser un número')
    .required('La cantidad de temporadas es requerido')
    .moreThan(0, 'El número de temporadas debe ser mayor a 0'),
  episodes: yup
    .number()
    .typeError('La cantidad de episodios debe ser un número')
    .required('El número de episodios es requerido')
    .moreThan(0, 'El número de episodios debe ser mayor a 0')
})
