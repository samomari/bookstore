import { faker } from "@faker-js/faker";
import { fakerDE, fakerRU, fakerEN } from "@faker-js/faker";
import { Book } from "@/types";
import { NextRequest } from "next/server";
import seedrandom from "seedrandom";

const locales = {
  en: fakerEN,
  de: fakerDE,
  ru: fakerRU,
};

const generateISBN = (): string => {
  const group1 = faker.string.numeric(3);
  const group2 = faker.string.numeric(1);
  const group3 = faker.string.numeric(3);
  const group4 = faker.string.numeric(6);
  const group5 = faker.string.numeric(1);
  return `${group1}-${group2}-${group3}-${group4}-${group5}`;
};

const getChance = (value: number, seed: string): number => {
  const rng = seedrandom(seed);
  const integerPart = Math.floor(value);
  const fractionalPart = value % 1;
  const randomValue = rng();
  return randomValue < fractionalPart ? integerPart + 1 : integerPart;
};

const generateBook = (
  id: number,
  fakerLocale: typeof faker,
  likes: number,
  reviews: number,
  seed: string,
): Book => {
  const likesCount = getChance(likes, `${seed}-likes-${id}`);
  const reviewCount = getChance(reviews, `${seed}-reviews-${id}`);
  const reviewsList = Array.from({ length: reviewCount }, () =>
    fakerLocale.lorem.sentence(),
  );
  const reviewsAuthorList = Array.from({ length: reviewCount }, () =>
    fakerLocale.person.fullName(),
  );

  return {
    id: id.toString(),
    isbn: generateISBN(),
    title: fakerLocale.book.title(),
    author: [
      fakerLocale.person.firstName() + " " + fakerLocale.person.lastName(),
    ],
    publisher:
      fakerLocale.company.name() +
      ", " +
      fakerLocale.date
        .between({ from: "1950-01-01", to: Date.now() })
        .getFullYear(),
    details: {
      likes: likesCount,
      reviews: reviewCount,
      reviewsList,
      reviewsAuthorList,
    },
  };
};

export async function GET(req: NextRequest) {
  const { searchParams } = new URL(req.url);
  const page = parseInt(searchParams.get("page") || "1");
  const lang = searchParams.get("lang") || "en";
  const seed = searchParams.get("seed") || "0";
  const likes = parseFloat(searchParams.get("likes") || "0");
  const reviews = parseFloat(searchParams.get("reviews") || "0");
  const limit = 20;

  const fakerLocale = locales[lang as keyof typeof locales] || fakerEN;
  fakerLocale.seed(parseInt(seed + likes + reviews, 10));

  const books = Array.from({ length: limit }, (_, i) =>
    generateBook((page - 1) * limit + i + 1, fakerLocale, likes, reviews, seed),
  );

  return new Response(JSON.stringify(books));
}
