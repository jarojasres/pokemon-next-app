import { FC, PropsWithChildren } from "react";
import Head from "next/head";
import { Navbar } from "components/ui";

interface Props {
  title?: string;
}

export const Layout: FC<PropsWithChildren<Props>> = ({ children, title }): JSX.Element => {

  return (
    <>
      <Head>
        <title>{title || "PokemonApp"}</title>
        <meta name="description" content="PokemonApp" />
        <meta name="author" content="Julián Rojas" />
        <meta name="keywords" content="pokemon" />
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