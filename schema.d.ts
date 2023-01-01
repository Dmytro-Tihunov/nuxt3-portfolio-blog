export interface post {
  _path: string;
  title: string;
  description: string;
  date: number;
  img: string;
  publishDate: string;
  tags: string[];
  readingTime: { text: string };
}
