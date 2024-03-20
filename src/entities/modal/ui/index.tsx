import {
  Button,
  Modal,
  ModalBody,
  ModalCloseButton,
  ModalContent,
  ModalFooter,
  ModalHeader,
  ModalOverlay,
} from '@chakra-ui/react';
import type { FC, PropsWithChildren } from 'react';

type IModalWindowProps = {
  isOpen: boolean;
  onClose: () => void;
  title: string;
  actionTitle?: string;
  action?: () => void;
  actionType?: 'button' | 'reset' | 'submit' | undefined;
  formId?: string | null;
};

export const ModalWindow: FC<PropsWithChildren<IModalWindowProps>> = ({
  isOpen,
  onClose,
  title,
  children,
  actionTitle,
  formId,
  action = () => {},
  actionType = 'button',
}) => (
  <>
    <Modal isOpen={isOpen} onClose={onClose}>
      <ModalOverlay />
      <ModalContent>
        <ModalHeader>{title}</ModalHeader>
        <ModalCloseButton />
        <ModalBody>{children}</ModalBody>

        <ModalFooter>
          <Button colorScheme="blue" mr={3} onClick={onClose}>
            Закрыть
          </Button>
          {actionTitle && formId !== null && (
            <Button
              form={formId}
              onClick={action}
              type={actionType}
              variant="ghost"
            >
              {actionTitle}
            </Button>
          )}
        </ModalFooter>
      </ModalContent>
    </Modal>
  </>
);
