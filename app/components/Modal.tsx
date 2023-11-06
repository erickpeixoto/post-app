"use client"
import { useRouter } from "next/navigation"; // correção aqui
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

  useEffect(() => {
    if (open) {
      onOpen();
    }
  }, [open, onOpen]);

  const handleOnClose = () => {
    onOpenChange(); // Passar false para fechar o modal
    router.push('/'); // Redirecionar para a rota "/"
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
