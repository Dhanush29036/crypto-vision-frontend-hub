
import { ArrowUpRight, ArrowDownRight, Star } from "lucide-react";
import { Button } from "@/components/ui/button";

export interface CryptoCurrency {
  id: string;
  name: string;
  symbol: string;
  price: number;
  change24h: number;
  volume24h: number;
  marketCap: number;
  image: string;
  rank: number;
}

interface CryptoCardProps {
  crypto: CryptoCurrency;
}

export function CryptoCard({ crypto }: CryptoCardProps) {
  const isPriceUp = crypto.change24h >= 0;
  const formattedPrice = new Intl.NumberFormat("en-US", {
    style: "currency",
    currency: "USD",
    minimumFractionDigits: 2,
    maximumFractionDigits: crypto.price < 1 ? 6 : 2,
  }).format(crypto.price);

  const formattedChange = `${isPriceUp ? "+" : ""}${crypto.change24h.toFixed(2)}%`;
  const formattedMarketCap = formatLargeNumber(crypto.marketCap);
  const formattedVolume = formatLargeNumber(crypto.volume24h);

  return (
    <div className="crypto-card">
      <div className="p-4">
        {/* Header with rank, icon, name, and watch button */}
        <div className="flex items-center justify-between mb-3">
          <div className="flex items-center space-x-3">
            <span className="text-xs text-muted-foreground">#{crypto.rank}</span>
            <div className="flex items-center space-x-2">
              <img src={crypto.image} alt={crypto.name} className="w-7 h-7" />
              <div>
                <h3 className="text-base font-semibold">{crypto.name}</h3>
                <span className="text-xs text-muted-foreground">{crypto.symbol.toUpperCase()}</span>
              </div>
            </div>
          </div>
          <Button
            variant="ghost"
            size="icon"
            className="h-8 w-8"
            title="Add to watchlist"
          >
            <Star className="h-4 w-4" />
          </Button>
        </div>

        {/* Price and change */}
        <div className="mb-3">
          <div className="flex items-center space-x-2">
            <span className="text-lg font-bold">{formattedPrice}</span>
            <span
              className={`flex items-center text-sm ${
                isPriceUp ? "price-up" : "price-down"
              }`}
            >
              {isPriceUp ? (
                <ArrowUpRight className="h-3.5 w-3.5 mr-0.5" />
              ) : (
                <ArrowDownRight className="h-3.5 w-3.5 mr-0.5" />
              )}
              {formattedChange}
            </span>
          </div>
        </div>

        {/* Market cap and volume */}
        <div className="grid grid-cols-2 gap-2 text-xs text-muted-foreground">
          <div>
            <div className="mb-1">Market Cap</div>
            <div className="font-medium text-foreground">{formattedMarketCap}</div>
          </div>
          <div>
            <div className="mb-1">24h Volume</div>
            <div className="font-medium text-foreground">{formattedVolume}</div>
          </div>
        </div>
      </div>

      {/* Action buttons */}
      <div className="flex border-t border-border">
        <Button
          variant="ghost"
          className="flex-1 rounded-none py-2 text-xs font-medium"
          asChild
        >
          <a href={`/market/${crypto.id}`}>Details</a>
        </Button>
        <Button
          variant="ghost"
          className="flex-1 rounded-none py-2 text-xs font-medium border-l border-border text-primary"
          asChild
        >
          <a href={`/predictions/${crypto.id}`}>Predict</a>
        </Button>
      </div>
    </div>
  );
}

// Helper function to format large numbers
function formatLargeNumber(num: number): string {
  if (num >= 1_000_000_000) {
    return `$${(num / 1_000_000_000).toFixed(2)}B`;
  }
  if (num >= 1_000_000) {
    return `$${(num / 1_000_000).toFixed(2)}M`;
  }
  if (num >= 1_000) {
    return `$${(num / 1_000).toFixed(2)}K`;
  }
  return `$${num.toFixed(2)}`;
}
