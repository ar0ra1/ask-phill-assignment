import Head from "next/head";
import useRequest from "../lib/useRequest";
import { PageWrapper } from "../components/PageWrapper";
import { Footer } from "../components/Footer";

export default function Home() {
  const { data, error } = useRequest({ url: "/miista-export.json" });

  return (
    <div className="bg-siteBg">
      <Head>
        <title>Assignment - Ask Phill</title>
        <meta name="description" content="Generated by create next app" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <main className="flex flex-col justify-center p-4">
        <h1 className="my-5 text-6xl text-center">
          Assingment <br /> <span className="text-orange-700 ">Ask</span> Phill
        </h1>

        {error ? (
          <div className="text-center">
            <h3 className="text-5xl text-red-500">Oh no!</h3>
            <p>Error Occured!</p>
          </div>
        ) : data ? (
          <PageWrapper data={data} />
        ) : (
          <p className="text-5xl text-center text-orange-700">Loading...</p>
        )}
      </main>

      <Footer />
    </div>
  );
}
