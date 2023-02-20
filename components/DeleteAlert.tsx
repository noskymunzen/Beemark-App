import {
  AlertDialog,
  AlertDialogBody,
  AlertDialogContent,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogOverlay,
  Button,
} from "@chakra-ui/react";

const DeletAlert = ({ isOpenAlert, cancelRef, onCloseAlert, onConfirm }) => {
  return (
    <>
      <AlertDialog
        isOpen={isOpenAlert}
        leastDestructiveRef={cancelRef}
        onClose={onCloseAlert}
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
              <Button size="sm" ref={cancelRef} onClick={onCloseAlert}>
                Cancel
              </Button>
              <Button size="sm" colorScheme="red" onClick={onConfirm} ml={3}>
                Delete
              </Button>
            </AlertDialogFooter>
          </AlertDialogContent>
        </AlertDialogOverlay>
      </AlertDialog>
    </>
  );
};

export default DeletAlert;
