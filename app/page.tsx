import { columns } from "@/components/books/columns";
import { DataTable } from "@/components/books/data-table";
import { Book } from "@/types";

async function getBooks(): Promise<Book[]> {
  return [
    {
      id: "1",
      isbn: "6273152140",
      title: "Journey to the Stars",
      authors: ["Emily Brontë"],
      publisher: "Macmillan",
      details: {
        likes: 115,
        reviews: 5,
        reviewsList: [
          "Couldn't put it down.",
          "Exceptional writing.",
          "Amazing book!",
          "A bit slow in the middle.",
          "Highly recommended!"
        ],
        reviewsAuthorList: [
          "Reviewer1",
          "Reviewer2",
          "Reviewer3",
          "Reviewer4",
          "Reviewer5"
        ]
      }
    },
    {
      id: "2",
      isbn: "8266480304",
      title: "The Enigma of Time",
      authors: ["Emily Brontë"],
      publisher: "Macmillan",
      details: {
        likes: 246,
        reviews: 1,
        reviewsList: ["Couldn't put it down."],
        reviewsAuthorList: ["Reviewer6"]
      }
    },
    {
      id: "3",
      isbn: "2879872499",
      title: "Whispers of the Forest",
      authors: ["Mark Twain", "Jane Austen"],
      publisher: "HarperCollins",
      details: {
        likes: 311,
        reviews: 2,
        reviewsList: ["Exceptional writing.", "Amazing book!"],
        reviewsAuthorList: ["Reviewer7", "Reviewer8"]
      }
    },
    {
      id: "4",
      isbn: "7539373792",
      title: "Journey to the Stars",
      authors: ["Emily Brontë"],
      publisher: "Penguin Random House",
      details: {
        likes: 129,
        reviews: 4,
        reviewsList: ["A bit slow in the middle.", "Exceptional writing.", "Exceptional writing.", "Amazing book!"],
        reviewsAuthorList: [
          "Reviewer4",
          "Reviewer3",
          "Reviewer2",
          "Reviewer1"
        ]
      }
    },
    {
      id: "5",
      isbn: "4157777825",
      title: "The Enigma of Time",
      authors: ["Alice Walker", "John Doe"],
      publisher: "HarperCollins",
      details: {
        likes: 95,
        reviews: 6,
        reviewsList: [
          "Exceptional writing.",
          "Couldn't put it down.",
          "Highly recommended!",
          "A bit slow in the middle.",
          "Best book ever!",
          "Amazing book!"
        ],
        reviewsAuthorList: ["Reviewer11", "Reviewer12", "Reviewer13", "Reviewer14", "Reviewer15", "Reviewer16"]
      }
    }
  ];
}

export default async function Home() {
  const data = await getBooks();
  return (
    <div className="container mx-auto py-10">
      <DataTable columns={columns} data={data} />
    </div>
  );
}
