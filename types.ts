export type Book = {
  id: string;
  isbn: string;
  title: string;
  author: string[];
  publisher: string;
  details?: {
    likes: number;
    reviews: number;
    reviewsList: string[];
    reviewsAuthorList: string[];
  };
};
