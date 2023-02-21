import {
  AlertDialog,
  AlertDialogBody,
  AlertDialogContent,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogOverlay,
  Button,
} from "@chakra-ui/react";

interface DeleteAlertProps {
  isOpen: boolean;
  cancelRef: any;
  onClose: () => void;
  onConfirm: () => void;
}

const DeletAlert = ({
  isOpen,
  cancelRef,
  onClose,
  onConfirm,
}: DeleteAlertProps) => {
  return (
    <AlertDialog
      isOpen={isOpen}
      leastDestructiveRef={cancelRef}
      onClose={onClose}
    >
      <AlertDialogOverlay>
        <AlertDialogContent>
          <AlertDialogHeader fontSize="lg" fontWeight="bold">
            Delete Bookmark
          </AlertDialogHeader>

          <AlertDialogBody>
            {`Are you sure? You can't undo this action afterwards.`}
          </AlertDialogBody>

          <AlertDialogFooter>
            <Button size="sm" ref={cancelRef} onClick={onClose}>
              Cancel
            </Button>
            <Button size="sm" colorScheme="red" onClick={onConfirm} ml={3}>
              Delete
            </Button>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialogOverlay>
    </AlertDialog>
  );
};

export default DeletAlert;
