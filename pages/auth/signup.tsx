import {
  isEmail,
  isPassword,
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
import { useRouter } from "next/router";
import { useQuery } from "react-query";
import SignupForm from "../../components/SignupForm";

export default function Signup() {
  const toast = useToast({});
  const router = useRouter();

  const signForm = useForm<PostSignup>({
    initialValues: {
      name: "",
      email: "",
      password: "",
    },
    validate: (values) => ({
      name: solveValidation([isString(values.name), isRequired(values.name)]),
      email: solveValidation([
        isString(values.email),
        isRequired(values.email),
        isEmail(values.email!),
      ]),
      password: solveValidation([
        isRequired(values.password),
        isString(values.password),
        isPassword(values.password),
      ]),
    }),
    onSubmit: () => {
      postSignup();
    },
  });

  const querySignup = useQuery(
    "postSignup",
    () => $auth.postSignup(signForm.values),
    {
      enabled: false,
      onSuccess: (res) => {
        console.log(res.data.token);
        localStorage.setItem("token", res.data.token);
        toast({
          title: "Account created successfully",
          status: "success",
        });
        setTimeout(() => {
          router.push("/auth/login");
        }, 3000);
      },
      onError: (err: {
        response: AxiosResponse<{ message: string; type?: string }>;
      }) => {
        console.log(err.response.data.type);
        if (err.response.data.type! in AuthError) {
          toast({
            title: AuthErrorMsg[err.response.data.type! as AuthError],
            status: "error",
          });
        }
        if (err.response.status === 500) {
          toast({
            title: "Server Error",
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
  const postSignup = async () => {
    await querySignup.refetch();
  };

  return (
    <Flex flexDirection="column">
      <HeaderMain
        title="Sign up"
        formShowed={"signup"}
        isPageResetPass={false}
      />
      <Container py="1.5rem">
        <SignupForm ctx={signForm} onSubmit={() => signForm.submit()} />
        <HStack justify="center" mt="0.5rem">
          <Text>Are you already a user?</Text>
          <Link href="/auth/login">
            <Button variant="link" color="#0987A0">
              Login
            </Button>
          </Link>
        </HStack>
      </Container>
    </Flex>
  );
}
