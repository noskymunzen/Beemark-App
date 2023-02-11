import {
  Button,
  ButtonGroup,
  FormControl,
  FormLabel,
  Input,
} from "@chakra-ui/react";
import Link from "next/link";
import BoxForm from "./BoxForm";

const RecoverForm = ({ emailRecover, setEmailRecover, postRecover }) => {
  return (
    <BoxForm title=" Recover your account">
      <>
        <FormControl>
          <FormLabel mt="1rem">
            Enter your email to find your account.
          </FormLabel>
          <Input
            type="email"
            placeholder="Email"
            value={emailRecover}
            onChange={(e) => {
              setEmailRecover(e.target.value);
            }}
          />
        </FormControl>
        <ButtonGroup display="flex" justifyContent="flex-end" mt="1.5rem">
          <Link href="/auth/login">
            <Button minW="85px" type="submit">
              Cancel
            </Button>
          </Link>
          <Button
            minW="85px"
            color="white"
            bg="#0987A0"
            _hover={{ backgroundColor: "#086F83" }}
            type="submit"
            onClick={postRecover}
          >
            Seek
          </Button>
        </ButtonGroup>
      </>
    </BoxForm>
  );
};

export default RecoverForm;
