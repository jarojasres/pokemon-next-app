import { FC, PropsWithChildren } from "react";
import Head from "next/head";
import { Navbar } from "components/ui";

interface Props {
  title?: string;
}

const origin = typeof window === "undefined" ? "" : window.location.origin;

export const Layout: FC<PropsWithChildren<Props>> = ({ children, title }): JSX.Element => {

  return (
    <>
      <Head>
        <title>{title || "PokemonApp"}</title>
        <meta name="description" content="PokemonApp" />
        <meta name="author" content="Julián Rojas" />
        <meta name="keywords" content="pokemon" />
        <meta property="og:title" content={`Informacion sobre - ${title}`} />
        <meta property="og:description" content={`Esta es la página sobre ${title}`} />
        <meta property="og:image" content={`${origin}/img/banner.png`} />
      </Head>
      <Navbar />
      <main style={{
        padding: "0 20px"
      }}>
        { children }
      </main>
    </>
  );
};