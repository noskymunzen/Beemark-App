import { BookmarkError } from "./bookmark.enum";

export const BookmarkErrorMsg: { [key in BookmarkError]?: string } = {
  [BookmarkError.BookmarkNotFound]: "Bookmark not found.",
};
