
import { useState } from "react";
import { 
  Table, 
  TableBody, 
  TableCell, 
  TableHead, 
  TableHeader, 
  TableRow 
} from "@/components/ui/table";
import { Input } from "@/components/ui/input";
import { 
  ArrowUpDown, 
  ArrowUp, 
  ArrowDown, 
  Search, 
  Star, 
  ArrowUpRight, 
  ArrowDownRight 
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { CryptoCurrency } from "./crypto-card";

interface CryptoTableProps {
  cryptos: CryptoCurrency[];
}

type SortKey = "rank" | "price" | "change24h" | "volume24h" | "marketCap";
type SortDirection = "asc" | "desc";

export function CryptoTable({ cryptos }: CryptoTableProps) {
  const [sortKey, setSortKey] = useState<SortKey>("rank");
  const [sortDirection, setSortDirection] = useState<SortDirection>("asc");
  const [search, setSearch] = useState("");

  // Handle sorting
  const handleSort = (key: SortKey) => {
    if (sortKey === key) {
      setSortDirection(sortDirection === "asc" ? "desc" : "asc");
    } else {
      setSortKey(key);
      setSortDirection("asc");
    }
  };

  // Filter and sort cryptos
  const filteredAndSortedCryptos = [...cryptos]
    .filter(
      (crypto) =>
        crypto.name.toLowerCase().includes(search.toLowerCase()) ||
        crypto.symbol.toLowerCase().includes(search.toLowerCase())
    )
    .sort((a, b) => {
      const aValue = a[sortKey];
      const bValue = b[sortKey];
      
      if (sortDirection === "asc") {
        return aValue > bValue ? 1 : -1;
      } else {
        return aValue < bValue ? 1 : -1;
      }
    });

  // Render sort icon
  const renderSortIcon = (key: SortKey) => {
    if (sortKey === key) {
      return sortDirection === "asc" ? (
        <ArrowUp className="ml-2 h-4 w-4" />
      ) : (
        <ArrowDown className="ml-2 h-4 w-4" />
      );
    }
    return <ArrowUpDown className="ml-2 h-4 w-4" />;
  };

  return (
    <div className="w-full">
      {/* Search and filter section */}
      <div className="mb-4">
        <div className="relative">
          <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
          <Input
            placeholder="Search by name or symbol..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="pl-10"
          />
        </div>
      </div>

      {/* Table */}
      <div className="rounded-md border">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead className="w-[50px]">#</TableHead>
              <TableHead>Name</TableHead>
              <TableHead className="w-[120px] text-right">
                <Button
                  variant="ghost"
                  onClick={() => handleSort("price")}
                  className="flex h-8 items-center justify-end p-0 font-medium"
                >
                  Price {renderSortIcon("price")}
                </Button>
              </TableHead>
              <TableHead className="w-[120px] text-right">
                <Button
                  variant="ghost"
                  onClick={() => handleSort("change24h")}
                  className="flex h-8 items-center justify-end p-0 font-medium"
                >
                  24h % {renderSortIcon("change24h")}
                </Button>
              </TableHead>
              <TableHead className="hidden md:table-cell w-[180px] text-right">
                <Button
                  variant="ghost"
                  onClick={() => handleSort("marketCap")}
                  className="flex h-8 items-center justify-end p-0 font-medium"
                >
                  Market Cap {renderSortIcon("marketCap")}
                </Button>
              </TableHead>
              <TableHead className="hidden md:table-cell w-[150px] text-right">
                <Button
                  variant="ghost"
                  onClick={() => handleSort("volume24h")}
                  className="flex h-8 items-center justify-end p-0 font-medium"
                >
                  Volume (24h) {renderSortIcon("volume24h")}
                </Button>
              </TableHead>
              <TableHead className="w-[50px]"></TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {filteredAndSortedCryptos.length > 0 ? (
              filteredAndSortedCryptos.map((crypto) => (
                <TableRow key={crypto.id}>
                  <TableCell className="font-medium">{crypto.rank}</TableCell>
                  <TableCell>
                    <div className="flex items-center space-x-3">
                      <img src={crypto.image} alt={crypto.name} className="w-6 h-6" />
                      <div>
                        <div className="font-medium">{crypto.name}</div>
                        <div className="text-xs text-muted-foreground">
                          {crypto.symbol.toUpperCase()}
                        </div>
                      </div>
                    </div>
                  </TableCell>
                  <TableCell className="text-right font-medium">
                    {new Intl.NumberFormat("en-US", {
                      style: "currency",
                      currency: "USD",
                      minimumFractionDigits: 2,
                      maximumFractionDigits: crypto.price < 1 ? 6 : 2,
                    }).format(crypto.price)}
                  </TableCell>
                  <TableCell className="text-right">
                    <div
                      className={`flex items-center justify-end ${
                        crypto.change24h >= 0 ? "price-up" : "price-down"
                      }`}
                    >
                      {crypto.change24h >= 0 ? (
                        <ArrowUpRight className="h-3.5 w-3.5 mr-0.5" />
                      ) : (
                        <ArrowDownRight className="h-3.5 w-3.5 mr-0.5" />
                      )}
                      {`${crypto.change24h >= 0 ? "+" : ""}${crypto.change24h.toFixed(2)}%`}
                    </div>
                  </TableCell>
                  <TableCell className="hidden md:table-cell text-right">
                    {formatLargeNumber(crypto.marketCap)}
                  </TableCell>
                  <TableCell className="hidden md:table-cell text-right">
                    {formatLargeNumber(crypto.volume24h)}
                  </TableCell>
                  <TableCell>
                    <Button variant="ghost" size="sm" className="h-8 w-8 p-0">
                      <Star className="h-4 w-4" />
                    </Button>
                  </TableCell>
                </TableRow>
              ))
            ) : (
              <TableRow>
                <TableCell colSpan={7} className="h-24 text-center">
                  No results found
                </TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>
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
