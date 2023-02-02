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
} from "@chakra-ui/react";
import { useEffect, useState } from "react";
import SecctionProfile from "./SecctionProfile";

const ProfileCard = ({
  name = "Ninoska Münzenmayer",
  email = "munzenmayer@outlook.com",
  password = "******",
}) => {
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
          <SecctionProfile
            btnName={btnNames.name}
            title="Name"
            section="name"
            value={name}
            onChangeBtnName={onChangeBtnName}
            form={
              <FormControl>
                <Input type="text" borderColor="gray.300" />
              </FormControl>
            }
          />
          <SecctionProfile
            btnName={btnNames.email}
            title="Email"
            section="email"
            value={email}
            onChangeBtnName={onChangeBtnName}
            form={
              <FormControl>
                <Input type="text" borderColor="gray.300" />
              </FormControl>
            }
          />
          <SecctionProfile
            btnName={btnNames.password}
            title="Password"
            section="password"
            value={password}
            onChangeBtnName={onChangeBtnName}
            form={
              <>
                <FormControl display="flex" mt="1rem">
                  <FormLabel minW="100px" fontSize="sm">
                    Current
                  </FormLabel>
                  <Input type="text" borderColor="gray.300" />
                </FormControl>
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
              </>
            }
          />
        </Stack>
      </CardBody>
    </Card>
  );
};

export default ProfileCard;
