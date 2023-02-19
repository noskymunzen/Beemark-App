import ProfileCard from "@/components/ProfileCard";
import {
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
import { User } from "@/types";
import { useDisclosure, useToast } from "@chakra-ui/react";
import { AxiosResponse } from "axios";
import { useEffect, useState } from "react";
import { useQuery } from "react-query";

export default function settings() {
  const toast = useToast({});

  const [userData, setUserData] = useState<User>({});
  const [saving, setSaving] = useState(false);
  const [btnNames, setBtnNames] = useState({
    name: "Edit",
    email: "Edit",
    password: "Edit",
  });

  const onChangeBtnName = (value, key) => {
    if (value === "Cancel") {
      setBtnNames({ ...btnNames, [key]: "Edit" });
      console.log("Edit");
      return;
    }
    setBtnNames({ ...btnNames, [key]: "Cancel" });
    console.log("cancel");
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
    onError: (err) => {
      console.log(err);
    },
  });

  useEffect(() => {
    queryUserData.refetch();
  }, []);
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
        console.log(res.data);
        queryUserData.refetch();
        setBtnNames({ ...btnNames, ["name"]: "Edit" });
        setTimeout(() => {
          setSaving(false);
        }, 1000);
      },

      onError: (err) => {
        console.log(err);
      },
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
        // isEmail(values.email!),
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
        console.log(res.data);
        queryUserData.refetch();
        setBtnNames({ ...btnNames, ["email"]: "Edit" });
        setTimeout(() => {
          setSaving(false);
        }, 1000);
      },

      onError: (err) => {
        console.log(err);
      },
    }
  );

  const putEmail = async () => {
    setSaving(true);
    await queryPutEmail.refetch();
  };

  //change password
  const updatePassForm = useForm<{ currentPass: string; newPass: string }>({
    initialValues: {
      currentPass: "",
      newPass: "",
    },
    validate: (values) => ({
      currentPass: solveValidation([
        isRequired(values.currentPass),
        isString(values.currentPass),
      ]),
      newPass: solveValidation([
        isRequired(values.currentPass),
        isString(values.currentPass),
        isPassword(values.currentPass!),
      ]),
    }),
    onSubmit: () => {
      putPassword();
    },
  });

  const queryPutPass = useQuery(
    "putEmail",
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
        console.log(res.data);
        queryUserData.refetch();
        setBtnNames({ ...btnNames, ["password"]: "Edit" });
        setTimeout(() => {
          setSaving(false);
        }, 1000);
      },

      onError: (err: {
        response: AxiosResponse<{ message: string; type?: string }>;
      }) => {
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
      >
        <ProfileCard
          onChangeBtnName={onChangeBtnName}
          btnNames={btnNames}
          saving={saving}
          userData={userData}
          ctxName={updateNameForm}
          ctxEmail={updateEmailForm}
          ctxPass={updatePassForm}
          onSubmitName={() => updateNameForm.submit()}
          onSubmitEmail={() => updateEmailForm.submit()}
          onSubmitPass={() => updatePassForm.submit()}
        />
      </DashboardLayout>
    </>
  );
}
