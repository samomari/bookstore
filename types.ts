export type Book = {
  id: string;
  isbn: string;
  title: string;
  authors: string[];
  publisher: string;
  details?: {
    likes: number;
    reviews: number;
    reviewsList: string[];
    reviewsAuthorList: string[];
  };
};