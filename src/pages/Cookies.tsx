import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { ArrowLeft, ExternalLink, Cookie, AlertCircle } from "lucide-react";
import { getConfig } from "@/lib/bakesale-config";
import { useEffect, useState } from "react";
import type { BakesaleConfig } from "@/types/bakesale";

const Cookies = () => {
  const [config, setConfig] = useState<BakesaleConfig>(getConfig);

  useEffect(() => {
    setConfig(getConfig());
  }, []);

  return (
    <div className="min-h-screen bg-background">
      <section className="relative overflow-hidden px-4 pt-10 pb-6 text-center">
        <div className="absolute inset-0 bg-gradient-to-b from-secondary/30 to-transparent pointer-events-none" />
        <div className="relative z-10 max-w-lg mx-auto space-y-3">
          <div className="text-6xl">🍪</div>
          <h1 className="text-3xl md:text-4xl font-display font-bold text-foreground leading-tight">
            About the <span className="text-primary">Cookies</span>
          </h1>
          <p className="text-muted-foreground font-body">
            Ingredients, allergens, and recipe credits
          </p>
        </div>
      </section>

      <section className="px-4 pb-8 max-w-lg mx-auto space-y-5">
        {config.recipes.map((recipe, i) => (
          <Card
            key={i}
            className="border-2 border-secondary/50 shadow-lg rounded-2xl overflow-hidden"
          >
            <CardContent className="p-6 space-y-4">
              <div className="flex items-start gap-3">
                <div className="text-4xl flex-shrink-0">{recipe.emoji || "🍪"}</div>
                <div className="space-y-1">
                  <h2 className="text-xl font-display font-bold text-foreground leading-tight">
                    {recipe.name}
                  </h2>
                  {recipe.description && (
                    <p className="text-sm text-muted-foreground font-body">
                      {recipe.description}
                    </p>
                  )}
                </div>
              </div>

              {recipe.ingredients && (
                <div className="space-y-2">
                  <div className="flex items-center gap-2">
                    <Cookie className="h-4 w-4 text-primary" />
                    <h3 className="font-display font-semibold text-foreground">
                      Ingredients
                    </h3>
                  </div>
                  <p className="text-sm font-body text-foreground/80 leading-relaxed">
                    {recipe.ingredients}
                  </p>
                </div>
              )}

              {recipe.allergens && (
                <div className="space-y-2 rounded-xl bg-accent/10 border border-accent/30 p-4">
                  <div className="flex items-center gap-2">
                    <AlertCircle className="h-4 w-4 text-accent" />
                    <h3 className="font-display font-semibold text-foreground">
                      Allergen Info
                    </h3>
                  </div>
                  <p className="text-sm font-body text-foreground/80 leading-relaxed">
                    {recipe.allergens}
                  </p>
                </div>
              )}

              {recipe.sourceUrl && (
                <a
                  href={recipe.sourceUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-1 text-sm font-body text-primary hover:text-primary/80 underline underline-offset-2"
                >
                  Recipe from {recipe.sourceName || "source"}
                  <ExternalLink className="h-3 w-3" />
                </a>
              )}
            </CardContent>
          </Card>
        ))}

        <div className="text-center pt-2">
          <Link to="/">
            <Button
              variant="outline"
              className="rounded-xl font-display border-2 border-secondary"
            >
              <ArrowLeft className="h-4 w-4 mr-2" />
              Back to the bake sale
            </Button>
          </Link>
        </div>
      </section>

      <footer className="text-center py-8 text-sm text-muted-foreground font-body">
        <p>Made with 🧈 and ❤️ by {config.bakerName}</p>
      </footer>
    </div>
  );
};

export default Cookies;