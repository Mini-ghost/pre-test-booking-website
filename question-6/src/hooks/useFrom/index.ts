import React from 'react'

// hooks
import { useEventCallback } from '../useEventCallback'

type FormValues = Record<string, any>
type FormErrors<Values> = Partial<Record<keyof Values, 'string'>>

interface UseFormOptions<Values> {
  initialValues: Values
  onSubmit(values: Values): void
  validation?(values: Values): FormErrors<Values> | undefined
}

interface FormState<Values> {
  values: Values
  errors: FormErrors<Values>
}

type FormAction<Values> =
  | {
    type: 'SET_FIELD_VALUS'
    payload: {
      name: keyof Values
      value: Values[keyof Values]
    }
  }
  | {
    type: 'SET_ERRORS'
    payload: FormErrors<Values>
  }

function formReducer<Values> (
  state: FormState<Values>,
  action: FormAction<Values>,
) {
  switch (action.type) {
    case 'SET_FIELD_VALUS':
      return { ...state, values: { ...state.values, [action.payload.name]: action.payload.value }}
    case 'SET_ERRORS':
      return { ...state, errors: action.payload }
    default:
      return state
  }
}

const emptyErrors: FormErrors<unknown> = {}

export function useForm<Values extends FormValues>(options: UseFormOptions<Values>): {
  values: Values
  errors: FormErrors<Values>
  handleChange(e: React.ChangeEvent<any>): void
  handleSubmit(e: React.MouseEvent<HTMLButtonElement, MouseEvent>): void
} {
  const [state, dispatch] = React.useReducer<React.Reducer<FormState<Values>, FormAction<Values>>>(formReducer, {
    values: options.initialValues,
    errors: emptyErrors
  })

  const handleChange = useEventCallback((event: React.ChangeEvent<any>) => {
    const { target } = event
    const {
      type,
      name,
      value: valueTraget,
      checked
    } = target

    const value = /checkbox/.test(type)
      ? checked
      : valueTraget


    dispatch({
      type: 'SET_FIELD_VALUS',
      payload: { name, value }
    })
  })

  const handleSubmit = useEventCallback(() => {
    const error = options.validation?.(state.values)

    dispatch({
      type: 'SET_ERRORS',
      payload: error ?? emptyErrors
    })

    options.onSubmit(state.values)
  })

  return {
    ...state,
    handleChange,
    handleSubmit
  }
}