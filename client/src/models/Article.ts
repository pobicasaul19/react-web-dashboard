export interface ArticlePayload {
  comapny: string;
  title: string;
  link: string;
  date: string;
  content: string;
  image: string;
}
export interface Article extends ArticlePayload {
  uuid: string;
  id: number;
  status: string;
  writer: string | null;
  editor: string | null;
}
