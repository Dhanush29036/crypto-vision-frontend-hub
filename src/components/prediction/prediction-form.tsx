
import { useState } from "react";
import { 
  Calendar, 
  CalendarIcon, 
  TrendingUp,
  AlertCircle,
  Clock,
  Filter
} from "lucide-react";
import { format } from "date-fns";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { CryptoCurrency } from "@/components/crypto/crypto-card";
import { Calendar as CalendarComponent } from "@/components/ui/calendar";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { 
  Select, 
  SelectContent, 
  SelectItem, 
  SelectTrigger, 
  SelectValue 
} from "@/components/ui/select";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";

interface PredictionFormProps {
  availableCoins: CryptoCurrency[];
  onPredictionSubmit: (data: PredictionData) => void;
}

export interface PredictionData {
  coinId: string;
  timeframe: string;
  endDate: Date;
  confidenceLevel: string;
}

const timeframeOptions = [
  { value: "24h", label: "24 Hours" },
  { value: "7d", label: "7 Days" },
  { value: "30d", label: "30 Days" },
  { value: "90d", label: "90 Days" },
];

const confidenceLevelOptions = [
  { value: "high", label: "High (95%)" },
  { value: "medium", label: "Medium (80%)" },
  { value: "low", label: "Low (60%)" },
];

export function PredictionForm({ availableCoins, onPredictionSubmit }: PredictionFormProps) {
  const [selectedCoin, setSelectedCoin] = useState<string>("");
  const [timeframe, setTimeframe] = useState<string>("7d");
  const [endDate, setEndDate] = useState<Date | undefined>(
    new Date(Date.now() + 7 * 24 * 60 * 60 * 1000)
  );
  const [confidenceLevel, setConfidenceLevel] = useState<string>("medium");
  const [isLoading, setIsLoading] = useState(false);

  const handleSubmit = () => {
    if (!selectedCoin || !endDate) return;
    
    setIsLoading(true);
    
    // Simulate API call
    setTimeout(() => {
      onPredictionSubmit({
        coinId: selectedCoin,
        timeframe,
        endDate,
        confidenceLevel,
      });
      setIsLoading(false);
    }, 1500);
  };

  const selectedCoinData = availableCoins.find((coin) => coin.id === selectedCoin);

  return (
    <Card className="shadow-sm">
      <CardHeader>
        <CardTitle className="text-xl flex items-center gap-2">
          <TrendingUp className="h-5 w-5 text-primary" />
          Price Prediction
        </CardTitle>
        <CardDescription>
          Get AI-powered price predictions for your favorite cryptocurrencies
        </CardDescription>
      </CardHeader>
      <CardContent className="space-y-4">
        {/* Coin Selection */}
        <div className="space-y-2">
          <label htmlFor="coin-select" className="text-sm font-medium">
            Select Cryptocurrency
          </label>
          <Select value={selectedCoin} onValueChange={setSelectedCoin}>
            <SelectTrigger id="coin-select">
              <SelectValue placeholder="Select a cryptocurrency" />
            </SelectTrigger>
            <SelectContent>
              {availableCoins.map((coin) => (
                <SelectItem key={coin.id} value={coin.id}>
                  <div className="flex items-center">
                    <img 
                      src={coin.image} 
                      alt={coin.name} 
                      className="w-5 h-5 mr-2" 
                    />
                    {coin.name} ({coin.symbol.toUpperCase()})
                  </div>
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>

        {selectedCoin && (
          <>
            {/* Current Price Info */}
            <div className="bg-muted/50 rounded-md p-3">
              <div className="text-sm text-muted-foreground mb-1">Current Price</div>
              <div className="text-lg font-bold">
                {new Intl.NumberFormat("en-US", {
                  style: "currency",
                  currency: "USD",
                  minimumFractionDigits: 2,
                  maximumFractionDigits: selectedCoinData && selectedCoinData.price < 1 ? 6 : 2,
                }).format(selectedCoinData?.price || 0)}
              </div>
            </div>

            {/* Timeframe Selection */}
            <div className="space-y-2">
              <div className="flex items-center">
                <Clock className="w-4 h-4 mr-2 text-muted-foreground" />
                <label className="text-sm font-medium">Prediction Timeframe</label>
              </div>
              <div className="grid grid-cols-2 gap-2 sm:grid-cols-4">
                {timeframeOptions.map((option) => (
                  <Button
                    key={option.value}
                    type="button"
                    variant={timeframe === option.value ? "default" : "outline"}
                    className="text-sm"
                    onClick={() => {
                      setTimeframe(option.value);
                      // Update end date based on timeframe
                      const now = new Date();
                      let newEndDate: Date;
                      switch (option.value) {
                        case "24h":
                          newEndDate = new Date(now.getTime() + 24 * 60 * 60 * 1000);
                          break;
                        case "7d":
                          newEndDate = new Date(now.getTime() + 7 * 24 * 60 * 60 * 1000);
                          break;
                        case "30d":
                          newEndDate = new Date(now.getTime() + 30 * 24 * 60 * 60 * 1000);
                          break;
                        case "90d":
                          newEndDate = new Date(now.getTime() + 90 * 24 * 60 * 60 * 1000);
                          break;
                        default:
                          newEndDate = new Date(now.getTime() + 7 * 24 * 60 * 60 * 1000);
                      }
                      setEndDate(newEndDate);
                    }}
                  >
                    {option.label}
                  </Button>
                ))}
              </div>
            </div>
            
            {/* Date Selection */}
            <div className="space-y-2">
              <div className="flex items-center">
                <Calendar className="w-4 h-4 mr-2 text-muted-foreground" />
                <label className="text-sm font-medium">Target Date</label>
              </div>
              <Popover>
                <PopoverTrigger asChild>
                  <Button
                    variant="outline"
                    className={cn(
                      "w-full justify-start text-left font-normal",
                      !endDate && "text-muted-foreground"
                    )}
                  >
                    <CalendarIcon className="mr-2 h-4 w-4" />
                    {endDate ? format(endDate, "PPP") : <span>Pick a date</span>}
                  </Button>
                </PopoverTrigger>
                <PopoverContent className="w-auto p-0" align="start">
                  <CalendarComponent
                    mode="single"
                    selected={endDate}
                    onSelect={setEndDate}
                    disabled={(date) => date < new Date()}
                    initialFocus
                    className="p-3 pointer-events-auto"
                  />
                </PopoverContent>
              </Popover>
            </div>
            
            {/* Confidence Level */}
            <div className="space-y-2">
              <div className="flex items-center">
                <Filter className="w-4 h-4 mr-2 text-muted-foreground" />
                <label className="text-sm font-medium">Confidence Level</label>
              </div>
              <Select value={confidenceLevel} onValueChange={setConfidenceLevel}>
                <SelectTrigger>
                  <SelectValue placeholder="Select confidence level" />
                </SelectTrigger>
                <SelectContent>
                  {confidenceLevelOptions.map((option) => (
                    <SelectItem key={option.value} value={option.value}>
                      {option.label}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>

            <Alert className="bg-muted/50 text-foreground">
              <AlertCircle className="h-4 w-4" />
              <AlertTitle>Prediction Disclaimer</AlertTitle>
              <AlertDescription className="text-xs text-muted-foreground">
                Predictions are based on historical data and AI models. They should not be considered as financial advice. Always do your own research before investing.
              </AlertDescription>
            </Alert>
          </>
        )}
      </CardContent>
      <CardFooter>
        <Button 
          className="w-full" 
          onClick={handleSubmit}
          disabled={!selectedCoin || !endDate || isLoading}
        >
          {isLoading ? "Processing..." : "Generate Prediction"}
        </Button>
      </CardFooter>
    </Card>
  );
}
