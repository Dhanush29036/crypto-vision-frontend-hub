
import { Card } from "@/components/ui/card";

export default function News() {
  return (
    <div className="container mx-auto p-6">
      <h1 className="text-2xl font-bold mb-6">Crypto News</h1>
      <Card className="p-6">
        <p className="text-muted-foreground">Latest cryptocurrency news and updates will be displayed here.</p>
      </Card>
    </div>
  );
}
