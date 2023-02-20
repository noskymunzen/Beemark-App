import useForm from "@/hooks/useForm";
import { UserData } from "@/services/profile/profile.types";
import {
  Card,
  CardBody,
  CardHeader,
  FormControl,
  FormLabel,
  Heading,
  Input,
  Stack,
  StackDivider,
  Text,
} from "@chakra-ui/react";
import { FC, useEffect } from "react";
import SectionCard from "./SectionCard";

interface ProfileCardProps {
  ctxName: ReturnType<typeof useForm<{ name: string }>>;
  ctxEmail: ReturnType<typeof useForm<{ email: string }>>;
  ctxPass: ReturnType<typeof useForm<{ currentPass: string; newPass: string }>>;
  onSubmitName: () => void;
  onSubmitEmail: () => void;
  onSubmitPass: () => void;
  userData: UserData;
  saving: boolean;
  onChangeBtnName: (value: string, key: string) => void;
  btnNames: { name: string; email: string; password: string };
}

const ProfileCard: FC<ProfileCardProps> = ({
  ctxName,
  ctxEmail,
  ctxPass,
  onSubmitName,
  onSubmitEmail,
  onSubmitPass,
  userData,
  saving,
  onChangeBtnName,
  btnNames,
}) => {
  useEffect(() => {
    console.log(btnNames);
  }, [btnNames]);

  return (
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
            value={userData.name}
            onChangeBtnName={onChangeBtnName}
            onSubmit={onSubmitName}
          >
            <FormControl>
              <Input
                isDisabled={saving && true}
                type="text"
                borderColor="gray.300"
                defaultValue={userData.name}
                value={ctxName.values.name}
                onBlur={() => ctxName.touchField("name")}
                onChange={(e) => {
                  ctxName.setField("name", e.target.value);
                }}
              />
              {ctxName.touched.name && ctxName.errors.name && (
                <Text color="tomato" fontSize="xs">
                  {ctxName.errors.name}
                </Text>
              )}
            </FormControl>
          </SectionCard>
          <SectionCard
            saving={saving}
            btnName={btnNames.email}
            title="Email"
            section="email"
            value={userData.email}
            onChangeBtnName={onChangeBtnName}
            onSubmit={onSubmitEmail}
          >
            <FormControl>
              <Input
                isDisabled={saving && true}
                type="text"
                borderColor="gray.300"
                defaultValue={userData.email}
                value={ctxEmail.values.email}
                onBlur={() => ctxEmail.touchField("email")}
                onChange={(e) => {
                  ctxEmail.setField("email", e.target.value);
                }}
              />
              {ctxEmail.touched.email && ctxEmail.errors.email && (
                <Text color="tomato" fontSize="xs">
                  {ctxEmail.errors.email}
                </Text>
              )}
            </FormControl>
          </SectionCard>
          <SectionCard
            saving={saving}
            btnName={btnNames.password}
            title="Password"
            section="password"
            value="*********"
            onChangeBtnName={onChangeBtnName}
            onSubmit={onSubmitPass}
          >
            <>
              <FormControl display="flex" mt="1rem">
                <FormLabel minW="100px" fontSize="sm">
                  Current
                </FormLabel>
                <Input
                  type="password"
                  isDisabled={saving && true}
                  borderColor="gray.300"
                  value={ctxPass.values.currentPass}
                  onBlur={() => ctxPass.touchField("currentPass")}
                  onChange={(e) => {
                    ctxPass.setField("currentPass", e.target.value);
                  }}
                />
                {ctxPass.touched.currentPass && ctxPass.errors.currentPass && (
                  <Text color="tomato" fontSize="xs">
                    {ctxPass.errors.currentPass}
                  </Text>
                )}
              </FormControl>
              <FormControl display="flex" mt="1rem">
                <FormLabel minW="100px" fontSize="sm">
                  New password
                </FormLabel>
                <Input
                  type="password"
                  isDisabled={saving && true}
                  borderColor="gray.300"
                  value={ctxPass.values.newPass}
                  onBlur={() => ctxPass.touchField("newPass")}
                  onChange={(e) => {
                    ctxPass.setField("newPass", e.target.value);
                  }}
                />
                {ctxPass.touched.newPass && ctxPass.errors.newPass && (
                  <Text color="tomato" fontSize="xs">
                    {ctxPass.errors.newPass}
                  </Text>
                )}
              </FormControl>
              <FormControl display="flex" mt="1rem">
                <FormLabel minW="100px" fontSize="sm">
                  Repet new password
                </FormLabel>
                <Input type="text" borderColor="gray.300" />
              </FormControl>
            </>
          </SectionCard>
        </Stack>
      </CardBody>
    </Card>
  );
};

export default ProfileCard;
