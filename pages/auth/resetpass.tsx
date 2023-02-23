import {
  isMatchPass,
  isPassword,
  isRequired,
  isString,
  solveValidation,
} from "@/helpers/validators.helpers";
import useForm from "@/hooks/useForm";
import HeaderMain from "@/layout/HeaderMain";
import $auth from "@/services/auth/auth.service";
import {
  Center,
  Container,
  Flex,
  Spinner,
  Text,
  useToast,
} from "@chakra-ui/react";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import { useQuery } from "react-query";
import ResetPassForm from "../../components/ResetPassForm";

export default function ResetPass() {
  const [isValid, setIsValid] = useState(false);
  const [hasFetch, setHasFetch] = useState(false);
  const [code, setCode] = useState("");

  const toast = useToast({});
  const router = useRouter();

  const queryCode = useQuery(
    "checkCodePass",
    () =>
      $auth.checkCodePass({
        code,
      }),
    {
      enabled: false,
      onSuccess: (res) => {
        setIsValid(res.status === 200);
      },
      onError: (err) => {},
      onSettled: () => {
        setHasFetch(true);
      },
    }
  );

  const resetPassForm = useForm<{ password: string; confirmPass: string }>({
    initialValues: {
      password: "",
      confirmPass: "",
    },
    validate: (values) => ({
      password: solveValidation([
        isString(values.password),
        isRequired(values.password),
        isPassword(values.password || ""),
      ]),
      confirmPass: solveValidation([
        isString(values.confirmPass),
        isRequired(values.confirmPass),
        isPassword(values.confirmPass || ""),
        isMatchPass(values.password!, values.confirmPass!),
      ]),
    }),
    onSubmit: () => {
      resetPassword();
    },
  });

  const queryResetPassword = useQuery(
    "resetPassword",
    () =>
      $auth.resetPassword({
        code,
        password: resetPassForm.values.password,
      }),
    {
      enabled: false,
      onSuccess: (res) => {
        toast({
          title: "Password changed.",
          description: "Try to Login again...",
          status: "success",
        });
        setTimeout(() => {
          router.push("/auth/login");
        }, 3000);
      },
      onError: (err) => {},
    }
  );

  const getIsValidToken = async () => {
    await queryCode.refetch();
  };

  const resetPassword = async () => {
    await queryResetPassword.refetch();
  };

  useEffect(() => {
    if (router.query.code) {
      setCode(String(router.query.code));
    }
  }, [router]);

  useEffect(() => {
    if (code) {
      getIsValidToken();
    }
  }, [code]);

  return (
    <Flex flexDirection="column">
      <HeaderMain title="" formType={""} hideLinks={true} />
      <Container py="1.5rem">
        {queryCode.isLoading && <Spinner />}
        {hasFetch && (
          <>
            {isValid ? (
              <ResetPassForm
                ctx={resetPassForm}
                onSubmit={() => resetPassForm.submit()}
              />
            ) : (
              <Center fontSize="lg">
                <Text>Link has expired or it was already used.</Text>
              </Center>
            )}
          </>
        )}
      </Container>
    </Flex>
  );
}
