'use client'
import React, { useRef, useState } from 'react'
import {
  Modal,
  ModalContent,
  ModalHeader,
  ModalBody,
  ModalFooter,
  Button,
  useDisclosure,
  Checkbox,
  Input,
  Link
} from '@nextui-org/react'
import { UserPlus2 } from 'lucide-react'
export interface UserFormProps {
  userAction: (params: FormData) => Promise<void>
}

export default function App({ userAction }: UserFormProps) {
  const { isOpen, onOpen, onOpenChange } = useDisclosure()
  const [validationError, setValidationError] = useState({} as any)
  const formRef = useRef(null) as any

  async function action(data: FormData) {
    const result: any = await userAction(data)
    if (result?.error) {
      setValidationError(result?.error)
    } else {
      if (formRef.current.reset) {
        formRef.current.reset()
        onOpenChange()
      }
      setValidationError(null)
    }
  }
  return (
    <>
      <Button
        onPress={onOpen}
        color='primary'
        className='absolute right-[40px]'
      >
        <UserPlus2 className='h-8 w-8' />
      </Button>
      <Modal isOpen={isOpen} onOpenChange={onOpenChange} placement='top-center'>
        <ModalContent>
          {onClose => (
            <form ref={formRef} action={action}>
              <ModalHeader className='flex flex-col gap-1'>
                New User
              </ModalHeader>
              <ModalBody>
                <div className='flex justify-between px-1 py-2'>
                  <Input
                    autoFocus
                    label=''
                    placeholder='Enter your name'
                    variant='bordered'
                    name='name'
                    isInvalid={validationError?.username}
                  />
                </div>
                <div className='flex justify-between px-1 py-2'>
                  <Input
                    autoFocus
                    label=''
                    placeholder='Enter your username'
                    variant='bordered'
                    name='username'
                    isInvalid={validationError?.username}
                  />
                </div>
                {validationError && (
                  <p
                    className='
                   mt-2 rounded-lg
                   border border-red-500
                   bg-red-100
                   p-2
                   text-sm
                   font-semibold
                   text-red-500
                 
                 '
                  >
                    <p>
                      {validationError?.username?._errors.join(', ') ?? ' '}
                    </p>
                    <p>{validationError?.name?._errors.join(', ') ?? ' '}</p>
                  </p>
                )}
              </ModalBody>
              <ModalFooter>
                <Button color='danger' variant='flat' onPress={onClose}>
                  Close
                </Button>
                <Button color='primary' type='submit'>
                  Save
                </Button>
              </ModalFooter>
            </form>
          )}
        </ModalContent>
      </Modal>
    </>
  )
}
