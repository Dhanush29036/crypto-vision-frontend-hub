
import { useState } from "react";
import { Layout } from "@/components/layout/layout";
import { CryptoTable } from "@/components/crypto/crypto-table";
import { CryptoCurrency } from "@/components/crypto/crypto-card";
import { ThemeProvider } from "@/components/theme-provider";

// Mock data for cryptocurrencies
const mockCryptos: CryptoCurrency[] = [
  {
    id: "bitcoin",
    name: "Bitcoin",
    symbol: "btc",
    price: 63421.52,
    change24h: 2.34,
    volume24h: 32456789012,
    marketCap: 1234567890123,
    image: "https://cryptologos.cc/logos/bitcoin-btc-logo.png",
    rank: 1
  },
  {
    id: "ethereum",
    name: "Ethereum",
    symbol: "eth",
    price: 3128.91,
    change24h: -0.78,
    volume24h: 18345678901,
    marketCap: 378901234567,
    image: "https://cryptologos.cc/logos/ethereum-eth-logo.png",
    rank: 2
  },
  {
    id: "binancecoin",
    name: "Binance Coin",
    symbol: "bnb",
    price: 563.29,
    change24h: 1.21,
    volume24h: 2145678901,
    marketCap: 91234567890,
    image: "https://cryptologos.cc/logos/bnb-bnb-logo.png",
    rank: 3
  },
  {
    id: "solana",
    name: "Solana",
    symbol: "sol",
    price: 121.87,
    change24h: 5.62,
    volume24h: 6789012345,
    marketCap: 45678901234,
    image: "https://cryptologos.cc/logos/solana-sol-logo.png",
    rank: 4
  },
  {
    id: "cardano",
    name: "Cardano",
    symbol: "ada",
    price: 0.452,
    change24h: -1.83,
    volume24h: 1234567890,
    marketCap: 15678901234,
    image: "https://cryptologos.cc/logos/cardano-ada-logo.png",
    rank: 5
  },
  {
    id: "ripple",
    name: "XRP",
    symbol: "xrp",
    price: 0.573,
    change24h: 0.42,
    volume24h: 2567890123,
    marketCap: 28901234567,
    image: "https://cryptologos.cc/logos/xrp-xrp-logo.png",
    rank: 6
  },
  {
    id: "polkadot",
    name: "Polkadot",
    symbol: "dot",
    price: 6.78,
    change24h: -0.53,
    volume24h: 845678901,
    marketCap: 8456789012,
    image: "https://cryptologos.cc/logos/polkadot-new-dot-logo.png",
    rank: 7
  },
  {
    id: "dogecoin",
    name: "Dogecoin",
    symbol: "doge",
    price: 0.123,
    change24h: 8.42,
    volume24h: 3456789012,
    marketCap: 16789012345,
    image: "https://cryptologos.cc/logos/dogecoin-doge-logo.png",
    rank: 8
  },
  {
    id: "avalanche",
    name: "Avalanche",
    symbol: "avax",
    price: 34.21,
    change24h: 3.17,
    volume24h: 789012345,
    marketCap: 10890123456,
    image: "https://cryptologos.cc/logos/avalanche-avax-logo.png",
    rank: 9
  },
  {
    id: "chainlink",
    name: "Chainlink",
    symbol: "link",
    price: 13.97,
    change24h: 1.05,
    volume24h: 567890123,
    marketCap: 7765432109,
    image: "https://cryptologos.cc/logos/chainlink-link-logo.png",
    rank: 10
  }
];

const Market = () => {
  return (
    <ThemeProvider>
      <Layout>
        <section className="py-10 md:py-16">
          <div className="max-container">
            <div className="mb-8">
              <h1 className="text-3xl font-bold mb-2">Cryptocurrency Market</h1>
              <p className="text-muted-foreground">
                Live prices and market data for the top cryptocurrencies
              </p>
            </div>
            
            <CryptoTable cryptos={mockCryptos} />
          </div>
        </section>
      </Layout>
    </ThemeProvider>
  );
};

export default Market;
