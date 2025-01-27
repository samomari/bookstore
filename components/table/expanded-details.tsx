import { Book } from "@/types";

type ExpandedDetailsProps = {
  book: Book;
};

export const ExpandedDetails = ({
  book,
}: ExpandedDetailsProps) => {
  const placeholderText = `${book.title}\n \n \n \n \n \n \n \n \n \n${book.authors[0]}`;
  const placeholderCover =  `https://placehold.co/200x300?text=${encodeURIComponent(placeholderText)}`;

  return (
    <div className="flex gap-4 p-4 border-t">
      <div>
        <img
          src={placeholderCover}
          alt={`${book.title} cover`}
          className="rounded-md shadow-md"
        />
      </div>
      <div>
        <h2 className="text-lg font-semibold">{book.title}</h2>
        <p className="text-sm text-gray-600">ISBN: {book.isbn}</p>
        <p className="text-sm text-gray-600">Publisher: {book.publisher}</p>
        <p className="text-sm text-gray-600">Authors: {book.authors.join(", ")}</p>
        
        {book.details! && (
          <div className="mt-2">
            <p className="text-sm">
              <strong>Likes:</strong> {book.details!.likes}
            </p>
            <p className="text-sm">
              <strong>Reviews:</strong> {book.details!.reviews}
            </p>
            {book.details!.reviewsList?.length > 0 && (
              <div className="mt-2">
                <strong>Reviews:</strong>
                <ul className="mt-1 pl-4 list-disc text-sm text-gray-700">
                  {book.details!.reviewsList.map((review, idx) => (
                    <li key={idx} className="flex flex-col mb-2">
                      <p>{review}</p>
                      <span className="text-xs text-gray-500">
                        - {book.details!.reviewsAuthorList[idx]}
                      </span>
                    </li>
                  ))}
                </ul>
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  );
};
