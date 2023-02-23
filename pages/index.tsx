import BookmarkCard from "@/components/BookmarkCard";
import BookmarkModal from "@/components/BookmarkModal";
import DeletAlert from "@/components/DeleteAlert";
import WithAuthentication from "@/hoc/WithAuthentication";
import useForm from "@/hooks/useForm";
import DashboardLayout from "@/layout/DashboardLayout";
import $auth from "@/services/auth/auth.service";
import $bookmark from "@/services/bookmark/bookmark.service";
import { Bookmark, ResponseAxios } from "@/types";
import { AddIcon, CloseIcon, Search2Icon } from "@chakra-ui/icons";

import {
  isRequired,
  isString,
  solveValidation,
  validUrl,
} from "@/helpers/validators.helpers";
import { BookmarkErrorMsg } from "@/services/bookmark/bookmark.const";
import { BookmarkError } from "@/services/bookmark/bookmark.enum";
import {
  Flex,
  IconButton,
  Input,
  InputGroup,
  InputRightElement,
  SimpleGrid,
  Spinner,
  useDisclosure,
  useToast,
} from "@chakra-ui/react";
import { AxiosResponse } from "axios";
import { useEffect, useRef, useState } from "react";
import { useQuery } from "react-query";

const Home = () => {
  const [spinner, setSpinner] = useState(false);
  const [nameUser, setNameUser] = useState("");

  const [search, setSearch] = useState("");
  const inputRef = useRef<HTMLInputElement>(null);

  const [currentIndex, setCurrentIndex] = useState(-1);
  const [bookmarks, setBookmarks] = useState<Bookmark[]>([]);

  const [editing, setEditing] = useState(false);

  const bookmarkModal = useDisclosure();

  const drawer = useDisclosure();

  const alert = useDisclosure();

  const cancelRef = useRef();

  const toast = useToast({});

  const bookmarkForm = useForm<Bookmark>({
    initialValues: {
      url: "",
      title: "",
      excerpt: "",
      tags: [],
    },
    validate: (values) => ({
      url: solveValidation([
        isString(values.url),
        isRequired(values.url),
        validUrl(values.url || ""),
      ]),
      title: solveValidation([isString(values.title)]),
    }),
    onSubmit: () => {
      onSaveForm();
    },
  });

  const onAddTag = (value: string) => {
    if (value === "") return;
    bookmarkForm.setField("tags", [...bookmarkForm.values.tags, value]);
  };

  const onRemoveTag = (value: string) => {
    bookmarkForm.setField(
      "tags",
      [...bookmarkForm.values.tags].filter((tag) => tag !== value)
    );
  };

  const onCancel = () => {
    bookmarkModal.onClose();
    if (editing) {
      bookmarkForm.setValues({
        url: "",
        title: "",
        excerpt: "",
        tags: [],
      });
    }
  };
  const onBookmarkEdit = (bookmark: Bookmark, i: number) => {
    bookmarkForm.setValues({ ...bookmark });
    setCurrentIndex(i);
    setEditing(true);
    bookmarkModal.onOpen();
  };
  const onBookmarkDeleteAlert = (index: number) => {
    setCurrentIndex(index);
    alert.onOpen();
  };

  const onBookmarkAdd = () => {
    bookmarkForm.setValues(bookmarkForm.values);
    setEditing(false);
    bookmarkModal.onOpen();
  };

  const queryPostBookmark = useQuery(
    "postCreateBookmark",
    () => $bookmark.postCreateBookmark(bookmarkForm.values),
    {
      enabled: false,
      onSuccess: (res) => {},
      onError: (err) => {},
    }
  );

  const queryGetBookmark = useQuery(
    "getBookmark",
    () => $bookmark.getBookmark(search),
    {
      enabled: false,
      onSuccess: (res) => {
        setBookmarks(res.data);
      },
      onError: (err) => {},
    }
  );

  const queryPutBookmark = useQuery(
    "putBookmark",
    () =>
      $bookmark.putBookmark(
        bookmarks.at(currentIndex)!._id!,
        bookmarkForm.values
      ),
    {
      enabled: false,
      onSuccess: () => {
        bookmarkForm.setValues({
          url: "",
          title: "",
          excerpt: "",
          tags: [],
        });
      },
      onError: (err: { response: AxiosResponse<ResponseAxios> }) => {
        if (err.response.data.type! in BookmarkError) {
          toast({
            title: BookmarkErrorMsg[err.response.data.type! as BookmarkError],
            status: "error",
          });
        }
      },
    }
  );

  const queryUserData = useQuery("getUserData", () => $auth.getUserData(), {
    enabled: false,
    onSuccess: async (res) => {
      setNameUser(res.data.name);
    },
    onError: (err) => {},
  });

  useEffect(() => {
    queryUserData.refetch();
  }, []);

  const queryDeleteBookmark = useQuery(
    "deleteBookmark",
    () => $bookmark.deleteBookmark(bookmarks.at(currentIndex)!._id!),
    {
      enabled: false,
      onSuccess: async () => {
        bookmarkForm.values = {
          url: "",
          title: "",
          excerpt: "",
          tags: [],
        };
        await queryGetBookmark.refetch();
      },
      onError: (err: { response: AxiosResponse<ResponseAxios> }) => {
        if (err.response.data.type! in BookmarkError) {
          toast({
            title: BookmarkErrorMsg[err.response.data.type! as BookmarkError],
            status: "error",
          });
        }
      },
    }
  );

  const onDeleteCancel = () => {
    setCurrentIndex(-1);
    alert.onClose();
  };

  const onDeleteConfirm = async () => {
    await queryDeleteBookmark.refetch();
    onDeleteCancel();
  };

  const onSaveForm = async () => {
    bookmarkModal.onClose();
    setSpinner(true);
    editing
      ? await queryPutBookmark.refetch()
      : await queryPostBookmark.refetch();
    await queryGetBookmark.refetch();
    setSpinner(false);
  };

  const getBookmark = async () => {
    setSpinner(true);
    await queryGetBookmark.refetch();
    setTimeout(() => {
      setSpinner(false);
    }, 500);
  };

  const debounceRef = useRef<NodeJS.Timeout>();

  const onChangeSearch = () => {
    if (debounceRef.current) clearTimeout(debounceRef.current);
    setBookmarks([]);
    debounceRef.current = setTimeout(() => {
      if (!inputRef.current) return;
      setSearch(inputRef.current.value);
    }, 1000);
  };

  const onCleanInput = () => {
    if (!inputRef.current) return;
    inputRef.current.value = "";
    setSearch("");
  };

  useEffect(() => {
    getBookmark();
  }, [search]);

  return (
    <WithAuthentication>
      <DashboardLayout
        title="Home"
        namePage=""
        user={nameUser}
        isOpen={drawer.isOpen}
        onOpen={drawer.onOpen}
        onClose={drawer.onClose}
        headerComponent={
          <>
            <Flex
              gap="5"
              position="fixed"
              left={{ base: "17%", md: "25%" }}
              right={{ base: "10%", md: "25%" }}
              alignItems="center"
            >
              <InputGroup maxW="650px">
                <InputRightElement color="#F0F8FF">
                  {search === "" ? (
                    <Search2Icon />
                  ) : (
                    <IconButton
                      color="#0987A0"
                      aria-label=""
                      size="xs"
                      icon={<CloseIcon />}
                      onClick={onCleanInput}
                    />
                  )}
                </InputRightElement>
                <Input
                  color="#F0F8FF"
                  ref={inputRef}
                  borderColor="#F0F8FF"
                  focusBorderColor="#F0F8FF"
                  type="text"
                  placeholder="Type tags, title, url"
                  _placeholder={{ color: "#CBD5E0" }}
                  onChange={() => onChangeSearch()}
                />
              </InputGroup>
            </Flex>
          </>
        }
      >
        <IconButton
          zIndex={!bookmarkModal.isOpen || !drawer.isOpen ? "999" : "0"}
          isDisabled={bookmarkModal.isOpen || drawer.isOpen}
          position="fixed"
          right={{ base: "2rem", md: "5rem" }}
          bottom={{ base: "5%", md: "15%" }}
          aria-label="Add bookmark"
          bg="#0987A0"
          _hover={{ bg: "#086F83" }}
          color="white"
          height="50px"
          width="50px"
          borderRadius="40px"
          onClick={onBookmarkAdd}
          icon={<AddIcon />}
        />

        <BookmarkModal
          ctx={bookmarkForm}
          onSubmit={() => bookmarkForm.submit()}
          title={editing ? "Edit Bookmark" : "Create a Bookmark"}
          isOpen={bookmarkModal.isOpen}
          onCancel={onCancel}
          onAddTag={onAddTag}
          onRemoveTag={onRemoveTag}
        />
        <SimpleGrid columns={[1, 4]} mt="1rem" gap={3}>
          {spinner && <Spinner />}
          {!spinner &&
            bookmarks.map((bookmark, i) => (
              <BookmarkCard
                key={i}
                bookmark={bookmark}
                onEdit={() => onBookmarkEdit(bookmark, i)}
                onDelete={() => onBookmarkDeleteAlert(i)}
              />
            ))}
          <DeletAlert
            onConfirm={onDeleteConfirm}
            cancelRef={cancelRef}
            isOpen={alert.isOpen}
            onClose={alert.onClose}
          />
        </SimpleGrid>
      </DashboardLayout>
    </WithAuthentication>
  );
};

export default Home;
