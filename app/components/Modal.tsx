"use client"
import { useRouter, useSearchParams } from "next/navigation"; // correção aqui
import { useEffect } from "react";
import {
  Modal,
  ModalContent,
  ModalHeader,
  ModalBody,
  ModalFooter,
  Button,
  useDisclosure,
} from "@nextui-org/react";

export default function App({ children, open }: { children: React.ReactNode, open: boolean }) {
  const { isOpen, onOpen, onOpenChange } = useDisclosure();
  const router = useRouter();
  const params = useSearchParams()
  const authId = params.get('auth') ?? '1'

  useEffect(() => {
    if (open) {
      onOpen();
    }
  }, [open, onOpen]);

  const handleOnClose = () => {
    onOpenChange(); 
    router.push(`/?auth=${authId}`);
  };

  return (
    <>
      <Modal isOpen={isOpen} onClose={handleOnClose} size="4xl">
        <ModalContent>
          <ModalHeader className="flex flex-col gap-1">User Profile</ModalHeader>
          <ModalBody>
            {children}
          </ModalBody>
          <ModalFooter>
            <Button color="danger" variant="light" onPress={handleOnClose}>
              Close
            </Button>
          </ModalFooter>
        </ModalContent>
      </Modal>
    </>
  );
}
