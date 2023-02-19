import {
  isEmail,
  isRequired,
  isString,
  solveValidation,
} from "@/helpers/validators.helpers";
import useForm from "@/hooks/useForm";
import { AuthErrorMsg } from "@/services/auth/auth.const";
import { AuthError } from "@/services/auth/auth.enum";
import $auth from "@/services/auth/auth.service";
import { PostSignup } from "@/services/auth/auth.types";
import {
  Button,
  Container,
  Flex,
  HStack,
  Text,
  useToast,
} from "@chakra-ui/react";
import { AxiosResponse } from "axios";
import HeaderMain from "layout/HeaderMain";
import Link from "next/link";
import { useQuery } from "react-query";
import RecoverForm from "../../components/RecoverForm";

export default function Recover() {
  const toast = useToast({});

  const recoverForm = useForm<PostSignup>({
    initialValues: {
      email: "",
    },
    validate: (values) => ({
      email: solveValidation([
        isString(values.email),
        isRequired(values.email),
        isEmail(values.email!),
      ]),
    }),
    onSubmit: () => {
      postRecover();
    },
  });

  const queryrecover = useQuery(
    "postRecover",
    () => $auth.postRecover(recoverForm.values),
    {
      enabled: false,
      onSuccess: (res) => {
        localStorage.setItem("code", res.data.code);
        toast({
          title: "You will receive an email within 5 minutes.",
          description: " Please check email in spam",
          status: "success",
        });
      },
      onError: (err: {
        response: AxiosResponse<{ message: string; type?: string }>;
      }) => {
        if (err.response.data.type! in AuthError) {
          toast({
            title: AuthErrorMsg[err.response.data.type! as AuthError],
            status: "error",
          });
        }
        if (err.response.status === 400) {
          toast({
            title: "Something has gone wrong",
            status: "error",
          });
        }
        if (err.response.status === 500) {
          toast({
            title: "Server Error",
            status: "error",
          });
        }
      },
    }
  );

  const postRecover = async () => {
    await queryrecover.refetch();
    console.log(queryrecover.status === "success");
  };

  return (
    <Flex flexDirection="column">
      <HeaderMain title="" formShowed={"recover"} isPageResetPass={false} />
      <Container py="1.5rem">
        <RecoverForm ctx={recoverForm} onSubmit={() => recoverForm.submit()} />
        <HStack
          display={{ base: "flex", md: "none" }}
          mt="0.5rem"
          direction={["column", "row"]}
          justify="center"
          align="center"
        >
          <Link href="/auth/login">
            <Button variant="link" color="#0987A0">
              Try login again
            </Button>
          </Link>
          <Text>or</Text>
          <Link href="/auth/signup">
            <Button variant="link" color="#0987A0">
              Register
            </Button>
          </Link>
        </HStack>
      </Container>
    </Flex>
  );
}
