export interface IPost {
  id: string;
  title: string;
  views: number;
  date: string;
  type?: 'text' | 'image' | 'video';
  file: string;
  previewImage: string;
}
