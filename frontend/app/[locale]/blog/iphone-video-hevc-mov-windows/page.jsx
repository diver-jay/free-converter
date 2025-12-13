import IPhoneVideoBlog from '../posts/IPhoneVideoBlog';

export const metadata = {
  title:
    "Why your iPhone video (HEVC/MOV) won't play on Windows & How to fix it | Open Convert",
  description:
    "iPhone videos (HEVC/MOV) won't play on Windows PC, Android, or editing software? Learn why and fix it instantly. Convert MOV to MP4 free, no quality loss.",
  keywords:
    "iPhone video won't play on Windows, HEVC not supported, MOV to MP4 converter, iPhone video compatibility, convert iPhone video, HEVC codec, iPhone video on PC, iPhone video to Android, fix iPhone video playback",
  alternates: {
    canonical:
      'https://www.open-convert.com/blog/iphone-video-hevc-mov-windows',
  },
  openGraph: {
    type: 'article',
    title: "Why your iPhone video (HEVC/MOV) won't play on Windows & How to fix it",
    description:
      "iPhone videos (HEVC/MOV) won't play on Windows PC, Android, or editing software? Learn why and fix it instantly. Convert MOV to MP4 free, no quality loss.",
    url: 'https://www.open-convert.com/blog/iphone-video-hevc-mov-windows',
  },
  twitter: {
    card: 'summary_large_image',
    title: "Why your iPhone video (HEVC/MOV) won't play on Windows & How to fix it",
    description:
      "iPhone videos (HEVC/MOV) won't play on Windows PC, Android, or editing software? Learn why and fix it instantly. Convert MOV to MP4 free, no quality loss.",
  },
};

export default function Page() {
  return <IPhoneVideoBlog />;
}
