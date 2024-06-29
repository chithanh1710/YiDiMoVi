import Main from "@/_components/Main";
import { getMovieByNational, getMovieBySlugAndPage } from "@/_libs/service";
import removeAccents from "@/_utils/removeAccents";
import { Metadata } from "next";
import Image from "next/image";
import { AllMovieFetchPagination } from "@/_components/AllMovieFetchPagination";

type Props = {
  params: { slug: string };
  searchParams: { [key: string]: string | string[] | undefined };
};

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  let { slug } = params;
  slug = slug.split("-").join(" ");
  return {
    title: `Phim ${slug} - YidiMovi`,
    keywords: `phim ${slug}, phim bom tấn, phim chiếu rạp, xem phim online`,
    description: `Khám phá các bộ phim ${slug} hấp dẫn nhất trên YidiMovi. Xem ngay các bộ phim chiếu rạp mới nhất và các tập phim bom tấn.`,
    openGraph: {
      title: `Phim ${slug} - YidiMovi`,
      description: `Khám phá các bộ phim ${slug} hấp dẫn nhất trên YidiMovi. Xem ngay các bộ phim chiếu rạp mới nhất và các tập phim bom tấn.`,
      url: `${process.env.NEXT_APP_DOMAIN}/block/highlight/${slug}`,
      type: "website",
      images: "website.png",
    },
    twitter: {
      card: "summary_large_image",
      title: `Phim ${slug} - YidiMovi`,
      description: `Khám phá các bộ phim ${slug} hấp dẫn nhất trên YidiMovi. Xem ngay các bộ phim chiếu rạp mới nhất và các tập phim bom tấn.`,
      images: "website.png",
    },
    robots: "index, follow",
  };
}

export default async function page({ params, searchParams }: Props) {
  const { slug } = params;
  const { type } = searchParams;
  const name = decodeURIComponent(slug);
  const nameFormat = removeAccents(name);

  const dataList =
    type === "National"
      ? await getMovieByNational(nameFormat, "1")
      : await getMovieBySlugAndPage(nameFormat, "1");

  const { poster_url, name: nameMovie } = dataList.items[0];
  return (
    <Main>
      <section className="mb-8">
        <div className="w-full aspect-video relative rounded-2xl overflow-hidden">
          <Image
            alt={nameMovie}
            src={poster_url}
            priority
            fill
            className="object-cover absolute"
          />
        </div>
        <h1 className="text-center sm:text-3xl text-2xl font-bold mt-8">
          Phim {name}
        </h1>
      </section>
      <AllMovieFetchPagination type={type} name={name} dataDefault={dataList} />
    </Main>
  );
}