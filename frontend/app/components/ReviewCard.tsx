import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger
} from '@radix-ui/react-tooltip';
import axios from 'axios';
import Image from 'next/image';
import { useEffect, useState } from 'react';
import { Movie } from '../movie.types';
import { Review } from '../review.types';
import { generateStars } from '../utils/generateStars';
import { transformTimestamp } from '../utils/tranformUTCTimestamp';

interface Props {
  review: Review;
}

const ReviewCard = ({ review }: Props) => {
  // TODO: Need to get media info (title, image, etc.) in review
  const [movieData, setMovieData] = useState<Movie>();
  useEffect(() => {
    axios.get(`http://localhost:8000/movie/${review.MediaId}`).then(res => {
      setMovieData(res.data);
    });
  }, [review]);
  return (
    <>
      <div className="border-grey rounded-sm border">
        <Image
          src={`https://image.tmdb.org/t/p/original${movieData?.poster_path}`}
          width={200}
          height={300}
          alt={`${movieData?.title} poster`}
          className="rounded-t-sm"
        />
        <div className="flex rounded-b-sm bg-slate-300 p-1">
          <Image
            src={
              review.ProfilePictureUrl ||
              'https://avatars.githubusercontent.com/u/75668877'
            }
            alt="profile"
            className="mr-1 h-[20px] w-[20px] self-center rounded-full border border-slate-500"
            width={20}
            height={20}
          />
          <p className="font-semibold">{review.DisplayName || 'Anonymous'}</p>
        </div>
      </div>
      <div className="flex justify-between">
        <div className="flex">{generateStars(review.stars)}</div>
        <div>
          <TooltipProvider>
            <Tooltip>
              <TooltipTrigger asChild>
                <p>{transformTimestamp(review.Date)}</p>
              </TooltipTrigger>
              <TooltipContent>
                {/* //TODO: Format this hover to look better and be in the local timezone format: MM-DD-YYYY hh:mm */}
                <p>{review.Date}</p>
              </TooltipContent>
            </Tooltip>
          </TooltipProvider>
        </div>
      </div>
    </>
  );
};
export default ReviewCard;
