import { Button, FormControl, FormLabel, Input } from "@chakra-ui/react";
import BoxForm from "./BoxForm";

const ResetPassForm = ({ loginValues, setLoginValues }) => {
  return (
    <BoxForm title="Reset password">
      <FormControl display="flex" mt="1rem">
        <FormLabel minW="100px" fontSize="sm">
          New password
        </FormLabel>
        <Input type="text" borderColor="gray.300" />
      </FormControl>
      <FormControl display="flex" mt="1rem">
        <FormLabel minW="100px" fontSize="sm">
          Repet new password
        </FormLabel>
        <Input type="text" borderColor="gray.300" />
      </FormControl>

      <Button
        mt="1rem"
        color="white"
        bg="#0987A0"
        _hover={{ backgroundColor: "#086F83" }}
      >
        Save new password
      </Button>
    </BoxForm>
  );
};

export default ResetPassForm;
