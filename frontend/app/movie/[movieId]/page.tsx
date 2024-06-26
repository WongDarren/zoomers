'use client';
import Reviews from '@/app/components/Reviews';
import { Review } from '@/app/review.types';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Textarea } from '@/components/ui/textarea';
import { useToast } from '@/components/ui/use-toast';
import axios from 'axios';
import Image from 'next/image';
import { useEffect, useState } from 'react';
import { Rating } from 'react-simple-star-rating';
import { Movie } from '../../movie.types';

interface FormData {
  reviewText: string;
  stars: number;
  mediaId: string;
}

const MovieDetail = ({ params }: { params: { movieId: string } }) => {
  const { toast } = useToast();
  const [movieDetails, setMovieDetails] = useState<Movie>();
  const [reviews, setReviews] = useState<Review[]>([]);
  const imageUrl = 'https://image.tmdb.org/t/p/original';
  const [formData, setFormData] = useState<FormData>({
    reviewText: '',
    stars: 2.5,
    mediaId: params.movieId
  });

  const handleFormChange = (
    e: React.ChangeEvent<HTMLTextAreaElement | HTMLInputElement>
  ) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  // TODO: Figure out what to do with this
  const updateReviews = () => {
    fetch(`http://localhost:8000/reviews/${params.movieId}`)
      .then(res => res.json())
      .then(data => setReviews(data));
  };

  // Get movie details
  useEffect(() => {
    if (params.movieId !== undefined) {
      fetch(`http://localhost:8000/movie/${params.movieId}}`)
        .then(res => res.json())
        .then(data => setMovieDetails(data));
    }
  }, [params.movieId]);

  // Get reviews for this movie
  useEffect(() => {
    if (params.movieId !== undefined) {
      fetch(`http://localhost:8000/reviews/${params.movieId}`)
        .then(res => res.json())
        .then(data => setReviews(data));
    }
  }, [params.movieId]);

  const handleReviewSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    axios
      .post(
        `http://localhost:8000/reviews`,
        {
          MediaId: params.movieId,
          stars: formData.stars,
          ReviewText: formData.reviewText || ''
        },
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem('authToken')}`
          }
        }
      )
      .then(res => {
        if (res.status === 200) {
          toast({
            title: 'Review Submitted',
            description: `Your review for ${movieDetails?.title} been submitted`,
            duration: 5000
          });
          updateReviews();
        }
      })
      .catch(_ => {
        toast({
          variant: 'destructive',
          title: 'Error',
          description:
            'There was an error submitting your review. You may have already submitted a review for this film.'
        });
      });
  };

  return movieDetails ? (
    <div className="-my-20 mx-auto max-w-screen-lg">
      <div className="flex flex-col items-center justify-center">
        <div className="relative -z-20 mb-4 h-[450px] w-full">
          <Image
            src={`${imageUrl}${movieDetails.backdrop_path}`}
            layout="fill"
            objectFit="cover"
            alt="Movie backdrop image"
          />
          {/* TODO: Soften the gradient */}
          {/* Overlay for bottom fade */}
          <div className="absolute bottom-0 left-0 right-0 h-32 bg-gradient-to-t from-white to-transparent" />
          {/* Overlay for top fade */}
          <div className="absolute left-0 right-0 top-0 h-32 bg-gradient-to-b from-white to-transparent" />
          {/* Overlay for left side fade */}
          <div className="absolute bottom-0 left-0 top-0 w-60 bg-gradient-to-r from-white to-transparent" />
          {/* Overlay for right side fade */}
          <div className="absolute bottom-0 right-0 top-0 w-60 bg-gradient-to-l from-white to-transparent" />
        </div>
        <div className="flex w-[95%] justify-start">
          <div className="mr-8 shrink-0">
            <Image
              src={`${imageUrl}${movieDetails.poster_path}`}
              alt={movieDetails.title}
              width={200}
              height={300}
              className="rounded-md border border-black"
            />
          </div>
          <div>
            <h1 className="mb-2 font-serif text-3xl">{movieDetails.title}</h1>
            <p className="mb-2 text-sm uppercase">{movieDetails.tagline}</p>
            <p className="mr-4">{movieDetails.overview}</p>
          </div>
          <div className="flex min-h-[300px] min-w-[30%]">
            <Card className="grow-1 w-full">
              <CardHeader>
                <CardTitle>Add A Review</CardTitle>
                <Rating
                  initialValue={formData.stars}
                  onClick={rate => setFormData({ ...formData, stars: rate })}
                  allowFraction
                  size={30}
                  SVGclassName="inline-block"
                  className="mt-2"
                />
              </CardHeader>
              <CardContent>
                <form onSubmit={handleReviewSubmit}>
                  {/* // TODO: When text area is resized, the review card move. We need to determine what to do with this */}
                  <Textarea
                    placeholder="Leave a Review Here"
                    // TODO: Figure out what to do with this TS error
                    onChange={handleFormChange}
                    name="reviewText"
                    className="mb-4 w-full"
                  />

                  <Button type="submit" className="mt-4">
                    Submit New Review
                  </Button>
                </form>
              </CardContent>
            </Card>
          </div>
        </div>
        <div className="w-full">
          {reviews.length > 0 && <Reviews params={params} />}
        </div>
      </div>
    </div>
  ) : (
    <div>Loading...</div>
  );
};

export default MovieDetail;
