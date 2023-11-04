'use client'

import { Button, Textarea, cn } from '@nextui-org/react'
import { useSearchParams } from 'next/navigation'
import { useRef, useState } from 'react'

export interface PostFormProps {
  postAction: (params: FormData) => Promise<void>
}
export const PostForm = ({ postAction }: PostFormProps) => {
  const formRef = useRef(null) as any
  const [validationError, setValidationError] = useState({} as any)
  const [characterCount, setCharacterCount] = useState(0)
  const useParams = useSearchParams()

  async function action(data: FormData) {
    console.log('data', data)
    const authId = useParams.get('auth')
    data.append('authorId', authId ?? '2')

    const result: any = await postAction(data)
    if (result?.error) {
      setValidationError(result?.error)
      console.log(result?.error)
    } else {
      if (formRef.current.reset) {
        formRef.current.reset()
      }
      setValidationError(null)
    }
  }

  return (
    <form ref={formRef} action={action}>
      <div
        className={cn(
          'flex w-full items-center justify-center gap-2 rounded-2xl bg-gradient-to-tr from-pink-500 to-yellow-500 p-8 text-white shadow-lg',
          {
            'bg-gradient-to-tr from-pink-100 to-yellow-500':
              validationError?.content
          }
        )}
      >
        <Textarea
          name='content'
          radius='lg'
          minRows={2}
          isInvalid={validationError?.content}
          onChange={e => setCharacterCount(e.target.value.length)}
          classNames={{
            label: 'text-black/50 dark:text-white/90',
            input: [
              'bg-transparent',
              'text-black/90 dark:text-white/90',
              'placeholder:text-default-700/50 dark:placeholder:text-white/60',
              'p-4'
            ],
            innerWrapper: 'bg-transparent',
            inputWrapper: [
              'shadow-xl',
              'bg-default-200/50',
              'dark:bg-default/60',
              'backdrop-blur-xl',
              'backdrop-saturate-200',
              'hover:bg-default-200/70',
              'dark:hover:bg-default/70',
              'group-data-[focused=true]:bg-default-200/50',
              'dark:group-data-[focused=true]:bg-default/60',
              '!cursor-text'
            ]
          }}
          placeholder='What is on your mind?'
        />

        <Button type='submit' color='primary'>
          Post it
        </Button>
      </div>
      <p
        className='
       relative
       -top-9
        rounded-lg
        p-2
        text-sm
        font-semibold
        text-red-500
      '
      >
        {JSON.stringify(validationError?.content?._errors.join(', '))}
      </p>
      <div className='mt-3 text-sm text-black/70 dark:text-white/60 '>
        {characterCount}/777 characters
      </div>
    </form>
  )
}
