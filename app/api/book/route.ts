import { faker } from "@faker-js/faker";
import { Book } from "@/types";
import { NextRequest } from "next/server";

const generateISBN = (): string => {
  const group1 = faker.string.numeric(3); 
  const group2 = faker.string.numeric(1); 
  const group3 = faker.string.numeric(3); 
  const group4 = faker.string.numeric(6); 
  const group5 = faker.string.numeric(1); 
  return `${group1}-${group2}-${group3}-${group4}-${group5}`;
};

const generateBook = (id: number): Book => ({
  id: id.toString(),
  isbn: generateISBN(),
  title: faker.book.title(),
  author: [faker.person.firstName() + ' ' + faker.person.lastName()],
  publisher: faker.company.name() + ', ' +faker.date.between({ from: '2000-01-01', to: Date.now() }).getFullYear(),
  details: {
    likes: faker.number.int({ min: 0, max: 1000 }),
    reviews: faker.number.int({ min: 0, max: 1000 }),
    reviewsList: [faker.lorem.sentence(), faker.lorem.sentence()],
    reviewsAuthorList: [faker.person.fullName(), faker.person.fullName()],
  },
})

export async function GET(req: NextRequest) {
  const { searchParams } = new URL(req.url);
  const page = parseInt(searchParams.get('page') || '1');
  const limit = 20;
  const books = Array.from({ length: limit }, (_, i) => generateBook((page - 1) * limit + i + 1));

  return new Response(JSON.stringify(books));
}