import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Input } from "../ui/input";
import { Shuffle } from "lucide-react";
import seedrandom from "seedrandom";
import { Slider } from "../ui/slider";
import { CSVLink } from "react-csv";

type ToolbarProps = {
  lang: string;
  seed: number;
  page: number;
  likes: number;
  reviews: number;
  data: any[];
  onLangChange: (lang: string) => void;
  onSeedChange: (seed: number) => void;
  onLikesChange: (likes: number) => void;
  onReviewsChange: (reviews: number) => void;
};

export default function Toolbar({
  lang,
  seed,
  page,
  likes,
  reviews,
  data,
  onLangChange,
  onSeedChange,
  onLikesChange,
  onReviewsChange,
}: ToolbarProps) {
  const generateSeed = () => {
    const rng = seedrandom(`${seed}-${page}`);
    return Math.floor(rng() * 90000000 + 10000000);
  };

  const [inputValues, setInputValues] = useState({
    seed: seed,
    likes: likes,
    reviews: reviews,
  });

  const [isClient, setIsClient] = useState(false);

  const handleInputChange = (name: keyof typeof inputValues) => (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLInputElement>
  ) => {
    setInputValues(prev => ({
      ...prev,
      [name]: e.target.value,
    }));
  };

  const handleSliderChange = (name: keyof typeof inputValues) => (
    newValue: number[]
  ) => {
    setInputValues(prev => ({
      ...prev,
      [name]: newValue[0],
    }));
  };

  useEffect(() => {
    setIsClient(true);
  }, []);

  useEffect(() => {
    const timeout = setTimeout(() => {
      onSeedChange(inputValues.seed);
      onLikesChange(inputValues.likes);
      onReviewsChange(inputValues.reviews);
    }, 500);

    return () => clearTimeout(timeout);
  }, [inputValues, onSeedChange, onLikesChange, onReviewsChange]);

  const formatDataForCSV = (data: Book[]) => {
    return data.map(item => ({
      id: item.id,
      isbn: item.isbn,
      title: item.title,
      author: item.author,
      publisher: item.publisher,
      likes: item.details?.likes,
      reviews: item.details?.reviews,
      reviewsList: item.details?.reviewsList?.join(", "),
      reviewsAuthorList: item.details?.reviewsAuthorList?.join(", "),
    }));
  };

  return (
    <div className="flex items-center rounded-t-md justify-between rounded-top shadow-sm pb-2 h-[48px]">
      <div className="flex space-x-4">
        <Select value={lang} onValueChange={onLangChange}>
          <SelectTrigger className="w-[180px]">
            <SelectValue placeholder="Language" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="en">English</SelectItem>
            <SelectItem value="ru">Russian</SelectItem>
            <SelectItem value="de">German</SelectItem>
          </SelectContent>
        </Select>
        <div className="flex items-center h-[36px] rounded-md border shadow-sm px-2">
          <Input
            type="number"
            value={inputValues.seed}
            onChange={handleInputChange("seed")}
            className="w-auto h-[24px] border-none text-center cursor-pointer focus-visible:ring-0 shadow-none"
          />
          <Button variant="ghost" onClick={() => setInputValues(prev => ({ ...prev, seed: generateSeed() }))}>
            <Shuffle />
          </Button>
        </div>
        <Slider
          min={0}
          max={5}
          step={0.1}
          value={[inputValues.likes]}
          onValueChange={handleSliderChange("likes")}
          className="w-[200px]"
        />
        <div className="flex items-center h-[36px] rounded-md px-2">
          <Input
            type="number"
            min={0}
            max={10}
            step={0.1}
            value={inputValues.reviews}
            onChange={handleInputChange("reviews")}
            className="w-[80px]"
            placeholder="Reviews"
          />
        </div>
        {isClient && (
          <Button variant="outline">
            <CSVLink
              data={formatDataForCSV(data)}
              filename={`books-${seed}.csv`}
              className="text-primary"
            >
              Export CSV
            </CSVLink>
          </Button>
        )}
      </div>
    </div>
  );
}
