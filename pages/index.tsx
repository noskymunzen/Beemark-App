import BookmarkCard from "@/components/BookmarkCard";
import BookmarkModal from "@/components/BookmarkModal";
import DeletAlert from "@/components/DeleteAlert";
import WithAuthentication from "@/hoc/WithAuthentication";
import DashboardLayout from "@/layout/DashboardLayout";
import $bookmark from "@/services/bookmark/bookmark.service";
import { Bookmark } from "@/types";
import { AddIcon, CloseIcon, Search2Icon } from "@chakra-ui/icons";

import {
  Flex,
  IconButton,
  Input,
  InputGroup,
  InputRightElement,
  SimpleGrid,
  useDisclosure,
} from "@chakra-ui/react";
import { useEffect, useRef, useState } from "react";
import { useQuery } from "react-query";

const Home = () => {
  const [search, setSearch] = useState("");
  const [editing, setEditing] = useState(false);
  const [bookmarkValues, setBookmarkValues] = useState<Bookmark>({
    url: "",
    title: "",
    excerpt: "",
    tags: [],
  });
  const [currentIndex, setCurrentIndex] = useState(-1);
  const [bookmarks, setBookmarks] = useState<Bookmark[]>([]);

  const { isOpen, onOpen, onClose } = useDisclosure();
  const {
    isOpen: isOpenAlert,
    onOpen: onOpenAlert,
    onClose: onCloseAlert,
  } = useDisclosure();
  const cancelRef = useRef();

  const onAddTag = (value: string) => {
    if (value === "") return;
    setBookmarkValues({
      ...bookmarkValues,
      tags: [...new Set([...bookmarkValues.tags, value])],
    });
  };

  const onRemoveTag = (value: string) => {
    setBookmarkValues({
      ...bookmarkValues,
      tags: [...bookmarkValues.tags].filter((tag) => tag !== value),
    });
  };

  const onChangeValue = (key: string, value: string) => {
    setBookmarkValues({
      ...bookmarkValues,
      [key]: value,
    });
  };

  const onCancel = () => {
    onClose();
    if (editing) {
      setBookmarkValues({
        url: "",
        title: "",
        excerpt: "",
        tags: [],
      });
    }
  };
  const onBookmarkEdit = (bookmark: Bookmark, i: number) => {
    setBookmarkValues({ ...bookmark });
    setCurrentIndex(i);
    setEditing(true);
    onOpen();
  };
  const onBookmarkDelete = (index: number) => {
    setCurrentIndex(index);
    onOpenAlert();
  };

  const onBookmarkAdd = () => {
    setEditing(false);
    onOpen();
  };
  const queryPostBookmark = useQuery(
    "postCreateBookmark",
    () => $bookmark.postCreateBookmark(bookmarkValues),
    {
      enabled: false,
      onSuccess: (res) => {
        console.log(res.data);
      },
      onError: (err) => {
        console.log(err);
      },
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
      onError: (err) => {
        console.log(err);
      },
    }
  );

  const queryPutBookmark = useQuery(
    "putBookmark",
    () =>
      $bookmark.putBookmark(bookmarks.at(currentIndex)!._id!, bookmarkValues),
    {
      enabled: false,
      onSuccess: (res) => {
        console.log(res);
      },
      onError: (err) => {
        console.log(err);
      },
    }
  );

  const queryDeleteBookmark = useQuery(
    "deleteBookmark",
    () => $bookmark.deleteBookmark(bookmarks.at(currentIndex)!._id!),
    {
      enabled: false,
      onSuccess: async () => {
        await queryGetBookmark.refetch();
      },
      onError: (err) => {
        console.log(err);
      },
    }
  );

  const onDeleteCancel = () => {
    setCurrentIndex(-1);
    onCloseAlert();
  };

  const onDeleteConfirm = async () => {
    await queryDeleteBookmark.refetch();
    onDeleteCancel();
  };

  const onSaveForm = async () => {
    editing
      ? await queryPutBookmark.refetch()
      : await queryPostBookmark.refetch();
  };

  const getBookmark = async () => {
    await queryGetBookmark.refetch();
  };

  useEffect(() => {
    getBookmark();
  }, []);

  return (
    <WithAuthentication>
      <DashboardLayout
        title="Home"
        namePage=""
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
                <InputRightElement
                  color="#F0F8FF"
                  //ref={scrollRef}
                >
                  {search === "" ? (
                    <Search2Icon />
                  ) : (
                    <IconButton
                      aria-label=""
                      size="xs"
                      icon={<CloseIcon />}
                      //onClick={onCleanInput}
                    />
                  )}
                </InputRightElement>
                <Input
                  color="#F0F8FF"
                  //ref={inputRef}
                  //disabled={skeleton}
                  borderColor="#F0F8FF"
                  focusBorderColor="#F0F8FF"
                  type="text"
                  placeholder="Type tags, title, url"
                  _placeholder={{ color: "#CBD5E0" }}
                  //onChange={() => onChangeSearch()}
                />
              </InputGroup>
            </Flex>
          </>
        }
      >
        <IconButton
          zIndex={!isOpen ? "99999" : "0"}
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
          title={editing ? "Edit Bookmark" : "Create a Bookmark"}
          isOpen={isOpen}
          onCancel={onCancel}
          bookmarkValues={bookmarkValues}
          onChange={onChangeValue}
          onAddTag={onAddTag}
          onRemoveTag={onRemoveTag}
          onSave={onSaveForm}
        />
        <SimpleGrid
          columns={[1, 4]}
          mt="1rem"
          spacing={{ base: "1rem", md: "0" }}
        >
          {bookmarks.map((bookmark, i) => (
            <BookmarkCard
              key={i}
              bookmark={bookmark}
              onEdit={() => onBookmarkEdit(bookmark, i)}
              onDelete={() => onBookmarkDelete(i)}
            />
          ))}
          <DeletAlert
            onConfirm={onDeleteConfirm}
            cancelRef={cancelRef}
            isOpenAlert={isOpenAlert}
            onCloseAlert={onCloseAlert}
          />
        </SimpleGrid>
      </DashboardLayout>
    </WithAuthentication>
  );
};

export default Home;
