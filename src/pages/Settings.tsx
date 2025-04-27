
import { Card } from "@/components/ui/card";

export default function Settings() {
  return (
    <div className="container mx-auto p-6">
      <h1 className="text-2xl font-bold mb-6">Settings</h1>
      <Card className="p-6">
        <p className="text-muted-foreground">Account settings and preferences will be configured here.</p>
      </Card>
    </div>
  );
}
