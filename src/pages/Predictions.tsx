
import { useState } from "react";
import { Layout } from "@/components/layout/layout";
import { ThemeProvider } from "@/components/theme-provider";
import { PredictionForm, PredictionData } from "@/components/prediction/prediction-form";
import { CryptoCurrency } from "@/components/crypto/crypto-card";
import { LineChart, TrendingUp, TrendingDown, Download, Info } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

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
  }
];

const Predictions = () => {
  const [activePrediction, setActivePrediction] = useState<{
    data: PredictionData;
    results: {
      coin: CryptoCurrency;
      predictedPrice: number;
      minPrice: number;
      maxPrice: number;
      confidence: number;
      priceChange: number;
      likelihood: "high" | "medium" | "low";
    };
  } | null>(null);

  const handlePredictionSubmit = (data: PredictionData) => {
    const selectedCoin = mockCryptos.find((c) => c.id === data.coinId);
    
    if (!selectedCoin) return;
    
    // Mock prediction result - in a real app this would come from an API
    const currentPrice = selectedCoin.price;
    const predictedPrice = currentPrice * (1 + (Math.random() * 0.3 - 0.1));
    const priceChange = ((predictedPrice - currentPrice) / currentPrice) * 100;
    const confidence = data.confidenceLevel === "high" ? 95 : data.confidenceLevel === "medium" ? 80 : 60;
    const margin = currentPrice * (1 - confidence / 100);
    
    setActivePrediction({
      data,
      results: {
        coin: selectedCoin,
        predictedPrice,
        minPrice: predictedPrice - margin,
        maxPrice: predictedPrice + margin,
        confidence,
        priceChange,
        likelihood: data.confidenceLevel as "high" | "medium" | "low"
      }
    });
  };

  return (
    <ThemeProvider>
      <Layout>
        <section className="py-10 md:py-16">
          <div className="max-container">
            <div className="mb-8">
              <h1 className="text-3xl font-bold mb-2">Cryptocurrency Price Predictions</h1>
              <p className="text-muted-foreground">
                Advanced AI forecasting for crypto markets
              </p>
            </div>
            
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
              <div className="lg:col-span-1">
                <PredictionForm 
                  availableCoins={mockCryptos} 
                  onPredictionSubmit={handlePredictionSubmit} 
                />
              </div>
              
              <div className="lg:col-span-2">
                {activePrediction ? (
                  <Card>
                    <CardHeader>
                      <div className="flex items-center justify-between">
                        <div className="flex items-center space-x-3">
                          <img 
                            src={activePrediction.results.coin.image} 
                            alt={activePrediction.results.coin.name} 
                            className="w-8 h-8" 
                          />
                          <CardTitle>{activePrediction.results.coin.name} Price Prediction</CardTitle>
                        </div>
                        <Button variant="outline" size="sm">
                          <Download className="h-4 w-4 mr-2" />
                          Export
                        </Button>
                      </div>
                    </CardHeader>
                    <CardContent>
                      <Tabs defaultValue="prediction">
                        <TabsList className="mb-6">
                          <TabsTrigger value="prediction">Prediction</TabsTrigger>
                          <TabsTrigger value="chart">Chart</TabsTrigger>
                          <TabsTrigger value="history">History</TabsTrigger>
                        </TabsList>
                        
                        <TabsContent value="prediction">
                          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
                            <div className="space-y-3">
                              <div className="text-sm text-muted-foreground">Current Price</div>
                              <div className="text-2xl font-bold">
                                ${activePrediction.results.coin.price.toLocaleString(undefined, {
                                  minimumFractionDigits: 2,
                                  maximumFractionDigits: activePrediction.results.coin.price < 1 ? 6 : 2
                                })}
                              </div>
                            </div>
                            
                            <div className="space-y-3">
                              <div className="text-sm text-muted-foreground">Predicted Price</div>
                              <div className="text-2xl font-bold flex items-center">
                                ${activePrediction.results.predictedPrice.toLocaleString(undefined, {
                                  minimumFractionDigits: 2,
                                  maximumFractionDigits: activePrediction.results.predictedPrice < 1 ? 6 : 2
                                })}
                                
                                {activePrediction.results.priceChange >= 0 ? (
                                  <span className="ml-2 flex items-center text-crypto-green text-sm font-medium">
                                    <TrendingUp className="h-4 w-4 mr-1" />
                                    +{activePrediction.results.priceChange.toFixed(2)}%
                                  </span>
                                ) : (
                                  <span className="ml-2 flex items-center text-crypto-red text-sm font-medium">
                                    <TrendingDown className="h-4 w-4 mr-1" />
                                    {activePrediction.results.priceChange.toFixed(2)}%
                                  </span>
                                )}
                              </div>
                            </div>
                          </div>
                          
                          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-8">
                            <Card className="bg-muted/50">
                              <CardContent className="p-4">
                                <div className="text-xs text-muted-foreground mb-1">Minimum Price Range</div>
                                <div className="text-lg font-semibold">
                                  ${activePrediction.results.minPrice.toLocaleString(undefined, {
                                    minimumFractionDigits: 2,
                                    maximumFractionDigits: activePrediction.results.minPrice < 1 ? 6 : 2
                                  })}
                                </div>
                              </CardContent>
                            </Card>
                            
                            <Card className="bg-muted/50">
                              <CardContent className="p-4">
                                <div className="text-xs text-muted-foreground mb-1">Maximum Price Range</div>
                                <div className="text-lg font-semibold">
                                  ${activePrediction.results.maxPrice.toLocaleString(undefined, {
                                    minimumFractionDigits: 2,
                                    maximumFractionDigits: activePrediction.results.maxPrice < 1 ? 6 : 2
                                  })}
                                </div>
                              </CardContent>
                            </Card>
                            
                            <Card className="bg-muted/50">
                              <CardContent className="p-4">
                                <div className="text-xs text-muted-foreground mb-1">Confidence Level</div>
                                <div className="text-lg font-semibold">
                                  {activePrediction.results.confidence}%
                                </div>
                              </CardContent>
                            </Card>
                          </div>
                          
                          <div className="bg-muted/30 p-4 rounded-lg flex items-start space-x-3 text-sm">
                            <Info className="h-5 w-5 text-muted-foreground flex-shrink-0 mt-0.5" />
                            <div>
                              <p className="font-medium mb-1">Prediction Accuracy</p>
                              <p className="text-muted-foreground">
                                This prediction is based on historical price patterns, market trends, and current market conditions.
                                The confidence level indicates the statistical probability of the price falling within the predicted range.
                              </p>
                            </div>
                          </div>
                        </TabsContent>
                        
                        <TabsContent value="chart">
                          <div className="bg-muted/30 rounded-lg h-80 flex items-center justify-center">
                            <div className="text-center">
                              <LineChart className="h-10 w-10 text-muted-foreground mx-auto mb-3" />
                              <p className="text-muted-foreground">Interactive chart visualization would appear here</p>
                            </div>
                          </div>
                        </TabsContent>
                        
                        <TabsContent value="history">
                          <div className="bg-muted/30 rounded-lg h-80 flex items-center justify-center">
                            <div className="text-center">
                              <p className="text-muted-foreground">Historical prediction data would appear here</p>
                            </div>
                          </div>
                        </TabsContent>
                      </Tabs>
                    </CardContent>
                  </Card>
                ) : (
                  <div className="h-full flex items-center justify-center bg-muted/30 rounded-lg p-10">
                    <div className="text-center">
                      <TrendingUp className="h-16 w-16 text-muted-foreground mx-auto mb-4" />
                      <h3 className="text-xl font-medium mb-2">No Active Prediction</h3>
                      <p className="text-muted-foreground mb-6">
                        Select a cryptocurrency and configure prediction parameters to generate a price forecast.
                      </p>
                    </div>
                  </div>
                )}
              </div>
            </div>
          </div>
        </section>
      </Layout>
    </ThemeProvider>
  );
};

export default Predictions;
