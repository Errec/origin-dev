export type Objective = {
  title: string;
  text: string;
};

export type AboutPage = {
  pageTitle: string;
  pageSubtitle: string;
  backgroundImage: string;
  objectives: Objective[];
};

export type AboutObjectivesSectionProps = {
  id: string;
  objectives: Objective[];
};
