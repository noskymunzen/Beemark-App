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
import { PostLogin } from "@/services/auth/auth.types";
import { ResponseAxios } from "@/types";
import {
  Button,
  Container,
  Flex,
  HStack,
  Stack,
  Text,
  useToast,
} from "@chakra-ui/react";
import { AxiosResponse } from "axios";
import HeaderMain from "layout/HeaderMain";
import Link from "next/link";
import { useRouter } from "next/router";
import { useEffect } from "react";
import { useQuery } from "react-query";
import LoginForm from "../../components/LoginForm";

export default function Login() {
  const toast = useToast({});
  const router = useRouter();

  const queryUserData = useQuery("getUserData", () => $auth.getUserData(), {
    enabled: false,
    onSuccess: async (res) => {
      await router.push("/");
      localStorage.setItem("userData", JSON.stringify(res.data));
    },
    onError: (err) => {},
  });
  const getUserData = async () => {
    await queryUserData.refetch();
  };

  const loginForm = useForm<PostLogin>({
    initialValues: {
      email: "",
      password: "",
    },
    validate: (values) => ({
      email: solveValidation([
        isRequired(values.email),
        isEmail(values.email!),
      ]),
      password: solveValidation([
        isRequired(values.password),
        isString(values.password!),
      ]),
    }),
    onSubmit: () => {
      postLogin();
    },
  });

  const queryLogin = useQuery(
    "postLogin",
    () => $auth.postLogin(loginForm.values),
    {
      enabled: false,
      onSuccess: async (res) => {
        localStorage.setItem("token", res.data.token);
        await router.push("/");
      },
      onError: (err: { response: AxiosResponse<ResponseAxios> }) => {
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

  const postLogin = async () => {
    await queryLogin.refetch();
  };

  useEffect(() => {
    getUserData();
  }, []);

  return (
    <Flex flexDirection="column">
      <HeaderMain title="Log in" formType={"login"} hideLinks={false} />
      <Container py="1.5rem">
        <>
          <LoginForm ctx={loginForm} onSubmit={() => loginForm.submit()} />
          <Stack
            mt="0.5rem"
            direction={["column", "row"]}
            justify="center"
            align="center"
          >
            <Link href="/auth/recover">
              <Button variant="link" color="#0987A0">
                Forgot your password?
              </Button>
            </Link>
            <HStack>
              <Text>Still not a user?</Text>
              <Link href="/auth/signup">
                <Button variant="link" color="#0987A0">
                  Register Now!
                </Button>
              </Link>
            </HStack>
          </Stack>
        </>
      </Container>
    </Flex>
  );
}
