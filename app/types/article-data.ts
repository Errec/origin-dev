export type ArticleData = {
  title: string;
  content: any; // TODO: a more specific type for Portable Text content
  titleImage:
    | string
    | {
        asset: {
          _id?: string;
          _ref?: string;
          url?: string;
        };
      };
  currentSlug: string;
  releaseDate: string;
};
