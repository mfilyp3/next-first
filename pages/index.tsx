import styles from "./home.module.scss";
import Head from "next/head";
import { SubscribeButton } from "../components/SubscribeButton";
import { GetStaticProps } from "next";
import { stripe } from "../services/stripe";

interface IHomeProps {
  product: {
    priceId: string;
    amount: number;
  };
}

export default function Index({ product }: IHomeProps) {
  return (
    <>
      <Head>
        <title>hello world</title>
      </Head>
      <main className={styles.contentContainer}>
        <section className={styles.hero}>
          <span> 👏 Hey, Welcome</span>
          <h1>
            News about the <span>React</span> world.
          </h1>
          <p>
            Get access to all the publications <br />
            <span>for {product.amount} month</span>
          </p>

          <SubscribeButton priceId={product.priceId} />
        </section>

        <img src="/images/avatar.svg" alt="Coding girl" />
      </main>
    </>
  );
}

//export const getServerSideProps: GetServerSideProps = async () => {
export const getStaticProps: GetStaticProps = async () => {
  const price = await stripe.prices.retrieve("price_1K4oXNLj4ubbqDbWqq21HiDs", {
    expand: ["product"],
  });

  const product = {
    priceId: price.id,
    amount: new Intl.NumberFormat("en-US", {
      style: "currency",
      currency: "USD",
    }).format(price.unit_amount / 100),
  };

  return {
    props: {
      product,
    },
    revalidate: 86400, // 24 horas
  };
};
