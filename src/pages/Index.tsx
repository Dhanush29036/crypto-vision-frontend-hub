
import { useState } from "react";
import { Layout } from "@/components/layout/layout";
import { Button } from "@/components/ui/button";
import { ThemeProvider } from "@/components/theme-provider";
import { Card, CardContent } from "@/components/ui/card";
import { CryptoCard, CryptoCurrency } from "@/components/crypto/crypto-card";
import { TrendingUp, ChevronRight, BarChart2, Cpu, Shield, LineChart } from "lucide-react";

// Mock data for top cryptocurrencies
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
  }
];

// FAQ data
const faqs = [
  {
    question: "How accurate are the price predictions?",
    answer: "Our AI models achieve an accuracy rate of 75-85% depending on the timeframe and market conditions. All predictions include confidence intervals and accuracy metrics to help you make informed decisions."
  },
  {
    question: "What data sources do you use?",
    answer: "We aggregate data from multiple high-quality sources including major exchanges, blockchain data, social sentiment analysis, economic indicators, and market news to provide comprehensive market insights."
  },
  {
    question: "How often are predictions updated?",
    answer: "Market data is updated in real-time. AI price predictions are recalculated hourly for short-term forecasts (24h-7d) and daily for longer-term forecasts (30d-90d)."
  },
  {
    question: "Is this financial advice?",
    answer: "No, our predictions are for informational purposes only and should not be considered financial advice. Always conduct your own research before making investment decisions."
  }
];

const Index = () => {
  const [expandedFaq, setExpandedFaq] = useState<number | null>(null);

  const toggleFaq = (index: number) => {
    setExpandedFaq(expandedFaq === index ? null : index);
  };

  return (
    <ThemeProvider defaultTheme="dark">
      <Layout>
        {/* Hero Section */}
        <section className="py-14 md:py-24 bg-gradient-to-br from-background via-background to-accent/5">
          <div className="max-container">
            <div className="flex flex-col-reverse md:grid md:grid-cols-2 gap-8 items-center">
              <div className="space-y-6 animate-fade-in">
                <h1 className="text-4xl md:text-5xl lg:text-6xl font-extrabold leading-tight tracking-tighter">
                  <span className="heading-gradient">AI-Powered</span> Crypto <br />Price Predictions
                </h1>
                <p className="text-xl text-muted-foreground">
                  Leverage advanced AI models to forecast cryptocurrency price movements with unprecedented accuracy.
                </p>
                <div className="flex flex-col sm:flex-row gap-4">
                  <Button size="lg" asChild>
                    <a href="/predictions" className="px-8">
                      Get Started
                    </a>
                  </Button>
                  <Button size="lg" variant="outline" asChild>
                    <a href="/market" className="px-8">
                      Explore Market
                    </a>
                  </Button>
                </div>
              </div>
              <div className="flex justify-center">
                <div className="relative">
                  <div className="w-64 h-64 md:w-80 md:h-80 rounded-full bg-primary/10 animate-pulse-glow flex items-center justify-center">
                    <TrendingUp className="w-32 h-32 md:w-40 md:h-40 text-primary/50" />
                  </div>
                  <div className="absolute top-0 -right-4 w-24 h-24 bg-secondary/20 rounded-full animate-pulse-glow" style={{ animationDelay: "0.5s" }} />
                  <div className="absolute bottom-4 -left-8 w-16 h-16 bg-accent/20 rounded-full animate-pulse-glow" style={{ animationDelay: "1s" }} />
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Top Cryptocurrencies */}
        <section className="py-16 bg-card/30">
          <div className="max-container">
            <div className="mb-10 flex flex-col sm:flex-row justify-between items-start sm:items-center">
              <div>
                <h2 className="text-3xl font-bold mb-2">Top Cryptocurrencies</h2>
                <p className="text-muted-foreground">Live market data from top exchanges</p>
              </div>
              <Button variant="outline" className="mt-4 sm:mt-0" asChild>
                <a href="/market" className="flex items-center">
                  View All Markets
                  <ChevronRight className="ml-2 h-4 w-4" />
                </a>
              </Button>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
              {mockCryptos.map((crypto) => (
                <CryptoCard key={crypto.id} crypto={crypto} />
              ))}
            </div>
          </div>
        </section>

        {/* Features */}
        <section className="py-16">
          <div className="max-container">
            <div className="mb-12 text-center">
              <h2 className="text-3xl font-bold mb-4">Advanced Prediction Platform</h2>
              <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
                Our platform combines cutting-edge AI with comprehensive market data to deliver accurate crypto price predictions.
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
              {[
                {
                  icon: <BarChart2 className="h-10 w-10 text-primary" />,
                  title: "Real-time Analysis",
                  description: "Live data from all major exchanges with real-time price updates and market trends."
                },
                {
                  icon: <Cpu className="h-10 w-10 text-secondary" />,
                  title: "AI Predictions",
                  description: "Advanced machine learning models trained on historical data to forecast price movements."
                },
                {
                  icon: <LineChart className="h-10 w-10 text-accent" />,
                  title: "Interactive Charts",
                  description: "Customizable visualization tools to analyze price patterns and prediction accuracy."
                },
                {
                  icon: <Shield className="h-10 w-10 text-primary" />,
                  title: "Portfolio Tracking",
                  description: "Secure portfolio management with performance metrics and prediction alerts."
                },
              ].map((feature, index) => (
                <Card key={index} className="glass-card">
                  <CardContent className="p-6 text-center">
                    <div className="mb-4 flex justify-center">{feature.icon}</div>
                    <h3 className="text-xl font-bold mb-2">{feature.title}</h3>
                    <p className="text-muted-foreground">{feature.description}</p>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        </section>

        {/* Testimonials */}
        <section className="py-16 bg-muted/30">
          <div className="max-container">
            <h2 className="text-3xl font-bold mb-12 text-center">What Our Users Say</h2>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              {[
                {
                  text: "The AI prediction models have been surprisingly accurate. I've been able to make more informed trading decisions and improved my returns significantly.",
                  author: "Michael K.",
                  role: "Crypto Trader"
                },
                {
                  text: "CryptoVision's portfolio tracking tools combined with the price predictions have completely transformed how I manage my crypto investments.",
                  author: "Sarah L.",
                  role: "Investor"
                },
                {
                  text: "As a developer in the blockchain space, I appreciate the technical depth of the analytics. The API access to prediction data is incredibly valuable.",
                  author: "David R.",
                  role: "Blockchain Developer"
                }
              ].map((testimonial, index) => (
                <Card key={index} className="bg-card border">
                  <CardContent className="p-6">
                    <div className="mb-4 text-4xl text-primary/70">"</div>
                    <p className="mb-6 italic">{testimonial.text}</p>
                    <div>
                      <h4 className="font-bold">{testimonial.author}</h4>
                      <p className="text-sm text-muted-foreground">{testimonial.role}</p>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        </section>

        {/* FAQ */}
        <section className="py-16">
          <div className="max-container">
            <h2 className="text-3xl font-bold mb-12 text-center">Frequently Asked Questions</h2>

            <div className="max-w-3xl mx-auto divide-y divide-border">
              {faqs.map((faq, index) => (
                <div key={index} className="py-5">
                  <button
                    className="flex w-full text-left justify-between items-center"
                    onClick={() => toggleFaq(index)}
                  >
                    <h3 className="text-lg font-medium">{faq.question}</h3>
                    <ChevronRight
                      className={`h-5 w-5 transition-transform ${
                        expandedFaq === index ? "rotate-90" : ""
                      }`}
                    />
                  </button>
                  {expandedFaq === index && (
                    <div className="mt-3 text-muted-foreground">
                      <p>{faq.answer}</p>
                    </div>
                  )}
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* CTA */}
        <section className="py-16 bg-gradient-to-br from-primary/10 via-secondary/10 to-accent/10">
          <div className="max-container text-center">
            <h2 className="text-3xl font-bold mb-6">Ready to Predict the Future?</h2>
            <p className="text-xl text-muted-foreground mb-8 max-w-2xl mx-auto">
              Join thousands of traders using CryptoVision's AI predictions to gain an edge in the cryptocurrency market.
            </p>
            <div className="flex flex-col sm:flex-row justify-center gap-4">
              <Button size="lg" asChild>
                <a href="/predictions" className="px-8">
                  Start Predicting Now
                </a>
              </Button>
              <Button size="lg" variant="outline" asChild>
                <a href="/market" className="px-8">
                  Explore the Market
                </a>
              </Button>
            </div>
          </div>
        </section>
      </Layout>
    </ThemeProvider>
  );
};

export default Index;
