'use client'
import React from 'react'
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
export default function App({ action }: any) {
  const { isOpen, onOpen, onOpenChange } = useDisclosure()

  return (
    <>
      <Button
        onPress={onOpen}
        color='primary'
        className='absolute right-[40px]'
      >
        <UserPlus2 className='w-8 h-8' />
      </Button>
      <Modal isOpen={isOpen} onOpenChange={onOpenChange} placement='top-center'>
        <ModalContent>
          {onClose => (
            <form action={action}>
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
                  />
                </div>
                <div className='flex justify-between px-1 py-2'>
                  <Input
                    autoFocus
                    label=''
                    placeholder='Enter your username'
                    variant='bordered'
                    name='username'
                  />
                </div>
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
