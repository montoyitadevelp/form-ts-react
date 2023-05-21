
import React, { useReducer, useState } from 'react'
import './App.css'



//Todos son opcionales, menos el onChange que retorna vacio
 type Props = {
  type?: string
  name?: string
  label?: string
  value?: string
  autoFocus?: boolean
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void
}

//Destructurar las posibles propiedades que puedan pasar este input
function Input(props: Props) {
  const {
    type = 'text',
    autoFocus = false,
    name,
    value,
    label,
    onChange,
  } = props

  // El input lleva los type con sus props, igualmente que el label y este se retorna
  return (
    <>
      <label className='text-xs text-gray-600' htmlFor={name}>
        {label}
      </label>
      <input
      id={name} type={type} autoFocus={autoFocus} value={value} name={name} onChange={onChange} className='block w-full rounded-md border border-indigo-200 focus:border-indigo-500 focus:ring-inherit text-sm p-1' />
    </>
  )
}

//
type UserForm = {
  name: string
  lastName: string
  email: string
  password: string
}

//Este objeto cumple con todos los datos del userform, typescript los califica como el mismo tipo
const initialState = {
  name: '',
  lastName: '',
  email: '',
  password: '',
}

//Resetear el formulario
type ResetAction = {
  type: 'reset'
}

//Actualizar los campos
type FieldAction = {
  type: 'name' | 'lastName' | 'email' | 'password' 
  payload: string
}

//Union de tipos 
type Action = ResetAction | FieldAction

//Actualizar el estado de los componentes, unions de las actions esetAction | FieldAction. determinar el tipo de datos en el switch
function formReducer(state = initialState, action: Action) {
  switch (action.type) {
    case 'name':
      return { ...state, name: action.payload }
    case 'lastName':
      return { ...state, lastName: action.payload }
    case 'email':
      return { ...state, email: action.payload }
    case 'password':
      return { ...state, password: action.payload }
      case 'reset':
        return initialState
      default:
        return state
  }
}



//Hook useState
function App() {
  const [isSending, setIsSending] = useState(false) //Bandera para saber si se esta enviando al front
  const [state, dispatch] = useReducer(formReducer, initialState)
  
  const handleChange = (action:FieldAction['type'], e: React.ChangeEvent<HTMLInputElement>) => {
    dispatch({ type: action, payload: e.target.value })
  }


  //El handleSubmit necesita del evento para enviar los datos en la propiedad de HTMLFromElement
  //Preventdefault para que no se recargue la pagina, log de los valores
   const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => { 
    e.preventDefault()
    setIsSending(true)
    console.log(state)

    
  }
  //Llamamos a la función handle
  //Cada vez que cambia el valor del input le asignamos el valor que viene en el evento y aplica para todos
  //Va estar desabilitado si se esta enviando el form o si las variables no tienen un valor definido en el front
  //Obtener los valores del state y el some los recoge y si algunos de ellos esta vacio retorna true y desabilitado
  return (
    <>
      <form onSubmit={handleSubmit} autoComplete='off' className='overflow-hidden border shadow-2xl rounded-md p-4 w-60 '>
        <h1 className='text-center text-xl'>Register an Account</h1>
        <div className='border border-black-500 my-2' />
        <Input autoFocus={true} name="name" label='Name:' value={state.name} onChange={(e) => handleChange('name', e)}/* onChange={(e) => dispatch({ type: 'name', payload: e.target.value})} */ /> 
        <Input name='lastName' label='Last Name:' value={state.lastName} onChange={(e) => handleChange('lastName', e)} /* onChange={(e) => dispatch({ type: 'lastName', payload: e.target.value})} */ />
        <Input name='email' type='email' label='Email:' value={state.email} 
        onChange={(e) => handleChange('email', e)}/* onChange={(e) => dispatch({ type: 'email', payload: e.target.value})} *//>
        <Input name='password' type='password' label='Password: 'value={state.password} onChange={(e) => handleChange('password', e)} /* onChange={(e) => dispatch({ type: 'password', payload: e.target.value})} *//>
        <button type='submit' disabled={isSending || Object.values(state).some((v) => !v)} className='bg-blue-400 disabled:opacity-75 text-white w-full rounded mt-2 transition-colors hover:disabled:hover:bg-blue-400 disabled:cursor-not-allowed'>
          {isSending ? 'Sending...' : 'Send'}
        </button>
      </form>
    </>
  )
} 





export default App
