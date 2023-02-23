import SectionCard from "@/components/SectionCard";
import {
  isEmail,
  isMatchPass,
  isPassword,
  isRequired,
  isString,
  solveValidation,
} from "@/helpers/validators.helpers";
import useForm from "@/hooks/useForm";
import DashboardLayout from "@/layout/DashboardLayout";
import $auth from "@/services/auth/auth.service";
import { ChangePassErrorMsg } from "@/services/profile/profile.const";
import { ChangePassError } from "@/services/profile/profile.enum";
import $profile from "@/services/profile/profile.service";
import { ResponseAxios, User } from "@/types";
import {
  Card,
  CardBody,
  CardHeader,
  FormControl,
  FormErrorMessage,
  FormLabel,
  Heading,
  Input,
  Stack,
  StackDivider,
  useDisclosure,
  useToast,
} from "@chakra-ui/react";
import { AxiosResponse } from "axios";
import { useEffect, useState } from "react";
import { useQuery } from "react-query";

const Settings = () => {
  const toast = useToast({});

  const [userData, setUserData] = useState<Partial<User>>({});
  const [saving, setSaving] = useState(false);
  const [btnNames, setBtnNames] = useState({
    name: "Edit",
    email: "Edit",
    password: "Edit",
  });

  const onChangeBtnName = (value: string, key: string) => {
    if (value === "Cancel") {
      setBtnNames({ ...btnNames, [key]: "Edit" });
      return;
    }
    setBtnNames({ ...btnNames, [key]: "Cancel" });
  };

  const {
    isOpen: isOpenDrw,
    onOpen: onOpenDrw,
    onClose: onCloseDrw,
  } = useDisclosure();

  const queryUserData = useQuery("getUserData", () => $auth.getUserData(), {
    enabled: false,
    onSuccess: async (res) => {
      setUserData(res.data);
    },
    onError: (err) => {},
  });

  useEffect(() => {
    queryUserData.refetch();
  }, []);
  // TODO: replace with specific type
  //change name
  const updateNameForm = useForm<{ name: string }>({
    initialValues: {
      name: userData.name,
    },
    validate: (values) => ({
      name: solveValidation([isRequired(values.name), isString(values.name)]),
    }),
    onSubmit: () => {
      putName();
    },
  });

  const queryPutName = useQuery(
    "putName",
    () => $profile.putDataUser(updateNameForm.values),
    {
      enabled: false,
      onSuccess: (res) => {
        queryUserData.refetch();
        setBtnNames({ ...btnNames, ["name"]: "Edit" });
        setTimeout(() => {
          setSaving(false);
        }, 1000);
      },

      onError: (err) => {},
    }
  );

  const putName = async () => {
    setSaving(true);
    await queryPutName.refetch();
  };

  //change email
  const updateEmailForm = useForm<{ email: string }>({
    initialValues: {
      email: userData.email,
    },
    validate: (values) => ({
      email: solveValidation([
        isRequired(values.email),
        isEmail(values.email! || ""),
        isString(values.email),
      ]),
    }),
    onSubmit: () => {
      putEmail();
    },
  });

  const queryPutEmail = useQuery(
    "putEmail",
    () => $profile.putDataUser(updateEmailForm.values),
    {
      enabled: false,
      onSuccess: (res) => {
        queryUserData.refetch();
        setBtnNames({ ...btnNames, ["email"]: "Edit" });
        setTimeout(() => {
          setSaving(false);
        }, 1000);
      },

      onError: (err) => {},
    }
  );

  const putEmail = async () => {
    setSaving(true);
    await queryPutEmail.refetch();
  };

  //change password
  const updatePassForm = useForm<{
    currentPass: string;
    newPass: string;
    repetPass: string;
  }>({
    initialValues: {
      currentPass: "",
      newPass: "",
      repetPass: "",
    },
    validate: (values) => ({
      currentPass: solveValidation([
        isRequired(values.currentPass),
        isString(values.currentPass),
      ]),
      newPass: solveValidation([
        isRequired(values.newPass),
        isString(values.newPass),
        isPassword(values.newPass!),
      ]),
      repetPass: solveValidation([
        isRequired(values.currentPass),
        isString(values.currentPass),
        isPassword(values.currentPass!),
        isMatchPass(values.newPass!, values.repetPass!),
      ]),
    }),
    onSubmit: () => {
      putPassword();
    },
  });

  const queryPutPass = useQuery(
    "putPassword",
    () =>
      $profile.putDataUser({
        passwords: {
          currentPassword: updatePassForm.values.currentPass,
          newPassword: updatePassForm.values.newPass,
        },
      }),
    {
      enabled: false,
      onSuccess: (res) => {
        queryUserData.refetch();
        setBtnNames({ ...btnNames, ["password"]: "Edit" });
        setTimeout(() => {
          setSaving(false);
        }, 1000);
      },

      onError: (err: { response: AxiosResponse<ResponseAxios> }) => {
        setSaving(false);
        if (err.response.data.type! in ChangePassError) {
          toast({
            title:
              ChangePassErrorMsg[err.response.data.type! as ChangePassError],
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

  const putPassword = async () => {
    setSaving(true);
    await queryPutPass.refetch();
  };

  return (
    <>
      <DashboardLayout
        title="Settings"
        namePage="Settings"
        isOpen={isOpenDrw}
        onOpen={onOpenDrw}
        onClose={onCloseDrw}
        user={userData.name || ""}
      >
        <Card>
          <CardHeader>
            <Heading size="md">Profile</Heading>
          </CardHeader>
          <CardBody>
            <Stack divider={<StackDivider />} spacing="4">
              <SectionCard
                saving={saving}
                btnName={btnNames.name}
                title="Name"
                section="name"
                value={userData?.name || ""}
                onChangeBtnName={onChangeBtnName}
                onSubmit={updateNameForm.submit}
              >
                <FormControl
                  isInvalid={
                    updateNameForm.touched.name && updateNameForm.errors.name
                  }
                >
                  <Input
                    isDisabled={saving && true}
                    type="text"
                    borderColor="gray.300"
                    defaultValue={userData.name}
                    value={updateNameForm.values.name}
                    onBlur={() => updateNameForm.touchField("name")}
                    onChange={(e) => {
                      updateNameForm.setField("name", e.target.value);
                    }}
                  />
                  <FormErrorMessage>
                    {updateNameForm.errors.name}
                  </FormErrorMessage>
                </FormControl>
              </SectionCard>
              <SectionCard
                saving={saving}
                btnName={btnNames.email}
                title="Email"
                section="email"
                value={userData?.email || ""}
                onChangeBtnName={onChangeBtnName}
                onSubmit={updateEmailForm.submit}
              >
                <FormControl
                  isInvalid={
                    updateEmailForm.touched.email &&
                    updateEmailForm.errors.email
                  }
                >
                  <Input
                    isDisabled={saving && true}
                    type="text"
                    borderColor="gray.300"
                    defaultValue={userData.email}
                    value={updateEmailForm.values.email}
                    onBlur={() => updateEmailForm.touchField("email")}
                    onChange={(e) => {
                      updateEmailForm.setField("email", e.target.value);
                    }}
                  />
                  <FormErrorMessage>
                    {updateEmailForm.errors.email}
                  </FormErrorMessage>
                </FormControl>
              </SectionCard>
              <SectionCard
                saving={saving}
                btnName={btnNames.password}
                title="Password"
                section="password"
                value="*********"
                onChangeBtnName={onChangeBtnName}
                onSubmit={updatePassForm.submit}
              >
                <>
                  <FormControl
                    display="flex"
                    flexDirection="column"
                    mt="1rem"
                    isInvalid={
                      updatePassForm.touched.currentPass &&
                      updatePassForm.errors.currentPass
                    }
                  >
                    <FormLabel minW="100px" fontSize="sm">
                      Current
                    </FormLabel>
                    <Input
                      type="password"
                      borderColor="gray.300"
                      isDisabled={saving && true}
                      value={updatePassForm.values.currentPass}
                      onBlur={() => updatePassForm.touchField("currentPass")}
                      onChange={(e) => {
                        updatePassForm.setField("currentPass", e.target.value);
                      }}
                    />
                    <FormErrorMessage>
                      {updatePassForm.errors.currentPass}
                    </FormErrorMessage>
                  </FormControl>
                  <FormControl
                    display="flex"
                    flexDirection="column"
                    mt="1rem"
                    isInvalid={
                      updatePassForm.touched.newPass &&
                      updatePassForm.errors.newPass
                    }
                  >
                    <FormLabel minW="100px" fontSize="sm">
                      New password
                    </FormLabel>
                    <Input
                      borderColor="gray.300"
                      type="password"
                      isDisabled={saving && true}
                      value={updatePassForm.values.newPass}
                      onBlur={() => updatePassForm.touchField("newPass")}
                      onChange={(e) => {
                        updatePassForm.setField("newPass", e.target.value);
                      }}
                    />
                    <FormErrorMessage>
                      {updatePassForm.errors.newPass}
                    </FormErrorMessage>
                  </FormControl>
                  <FormControl
                    display="flex"
                    flexDirection="column"
                    mt="1rem"
                    isInvalid={
                      updatePassForm.touched.repetPass &&
                      updatePassForm.errors.repetPass
                    }
                  >
                    <FormLabel minW="100px" fontSize="sm">
                      Repet new password
                    </FormLabel>
                    <Input
                      type="password"
                      borderColor="gray.300"
                      value={updatePassForm.values?.repetPass}
                      onBlur={() => updatePassForm.touchField("repetPass")}
                      onChange={(e) => {
                        updatePassForm.setField("repetPass", e.target.value);
                      }}
                    />
                    <FormErrorMessage>
                      {updatePassForm.errors.repetPass}
                    </FormErrorMessage>
                  </FormControl>
                </>
              </SectionCard>
            </Stack>
          </CardBody>
        </Card>
      </DashboardLayout>
    </>
  );
};
export default Settings;
