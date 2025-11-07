import React, { useState, useMemo } from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { MapPin, Search, Heart, Loader2 } from "lucide-react";
import { motion } from "framer-motion";
import logo from "@/assets/logo.webp";

const SAMPLE_PROPS = [
  {
    id: 1,
    title: "3 BHK Apartment — Green View Residency",
    location: "Koramangala, Bangalore",
    price: "₹ 95 L",
    area: "1350 sqft",
    beds: 3,
    baths: 2,
    img: "https://images.unsplash.com/photo-1600585154340-be6161a56a0c?q=80&w=1200&auto=format&fit=crop",
    badge: "Ready to Move",
  },
  {
    id: 2,
    title: "Independent Villa with Garden",
    location: "Whitefield, Bangalore",
    price: "₹ 2.85 Cr",
    area: "2800 sqft",
    beds: 5,
    baths: 4,
    img: "https://images.unsplash.com/photo-1600566753190-17f0baa2a6c3?q=80&w=1200&auto=format&fit=crop",
    badge: "New Listing",
  },
  {
    id: 3,
    title: "1 BHK Furnished Studio",
    location: "HSR Layout, Bangalore",
    price: "₹ 29 L",
    area: "560 sqft",
    beds: 1,
    baths: 1,
    img: "https://images.unsplash.com/photo-1580587771525-78b9dba3b914?q=80&w=1200&auto=format&fit=crop",
    badge: "Furnished",
  },
  {
    id: 4,
    title: "2 BHK Premium Flat",
    location: "Indiranagar, Bangalore",
    price: "₹ 68 L",
    area: "1100 sqft",
    beds: 2,
    baths: 2,
    img: "https://images.unsplash.com/photo-1512917774080-9991f1c4c750?q=80&w=1200&auto=format&fit=crop",
    badge: "Prime Location",
  },
  {
    id: 5,
    title: "4 BHK Penthouse",
    location: "Kormangala, Bangalore",
    price: "₹ 1.85 Cr",
    area: "2400 sqft",
    beds: 4,
    baths: 3,
    img: "https://images.unsplash.com/photo-1613490493576-7fde63acd811?q=80&w=1200&auto=format&fit=crop",
    badge: "Luxury",
  },
  {
    id: 6,
    title: "Studio Apartment Near Metro",
    location: "Electronic City, Bangalore",
    price: "₹ 22 L",
    area: "480 sqft",
    beds: 1,
    baths: 1,
    img: "https://images.unsplash.com/photo-1502672260266-1c1ef2d93688?q=80&w=1200&auto=format&fit=crop",
    badge: "Metro Access",
  },
];

function PropertyCard({ p, onSave }: { p: typeof SAMPLE_PROPS[0]; onSave: (p: typeof SAMPLE_PROPS[0]) => void }) {
  return (
    <motion.div
      layout
      initial={{ opacity: 0, y: 8 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0 }}
      className="bg-card rounded-2xl overflow-hidden shadow-sm hover:shadow-lg transition-all duration-300"
    >
      <div className="relative">
        <img src={p.img} alt={p.title} className="w-full h-44 object-cover" />
        <div className="absolute top-3 left-3">
          <span className="rounded-full bg-background/90 backdrop-blur-sm px-3 py-1 text-xs font-semibold">
            {p.beds}B • {p.baths}B
          </span>
        </div>
        <button
          onClick={() => onSave(p)}
          className="absolute top-3 right-3 bg-background/90 backdrop-blur-sm p-2 rounded-full shadow hover:bg-accent hover:text-accent-foreground transition-colors"
          aria-label="save"
        >
          <Heart size={16} />
        </button>
      </div>
      <CardContent className="p-4">
        <div className="flex items-start justify-between gap-2">
          <div>
            <h3 className="text-lg font-semibold leading-tight">{p.title}</h3>
            <p className="text-sm text-muted-foreground flex items-center gap-1 mt-1">
              <MapPin size={14} /> {p.location}
            </p>
          </div>
          <div className="text-right">
            <p className="text-lg font-bold text-primary">{p.price}</p>
            <p className="text-sm text-muted-foreground">{p.area}</p>
          </div>
        </div>
        <div className="mt-3 flex items-center justify-between">
          <Badge variant="secondary">{p.badge}</Badge>
          <Button size="sm">View Details</Button>
        </div>
      </CardContent>
    </motion.div>
  );
}

export default function Index() {
  const [query, setQuery] = useState("");
  const [minPrice, setMinPrice] = useState(0);
  const [maxPrice, setMaxPrice] = useState(0);
  const [saved, setSaved] = useState<typeof SAMPLE_PROPS>([]);
  const [loading, setLoading] = useState(false);

  const filtered = useMemo(() => {
    const q = query.trim().toLowerCase();
    return SAMPLE_PROPS.filter((p) => {
      if (q && !(p.title + p.location).toLowerCase().includes(q)) return false;
      const num = Number(p.price.replace(/[^0-9]/g, ""));
      if (minPrice && num < minPrice) return false;
      if (maxPrice && num > maxPrice) return false;
      return true;
    });
  }, [query, minPrice, maxPrice]);

  function handleSave(property: typeof SAMPLE_PROPS[0]) {
    setSaved((s) => {
      if (s.find((x) => x.id === property.id)) return s.filter((x) => x.id !== property.id);
      return [property, ...s];
    });
  }

  function fakeSearch() {
    setLoading(true);
    setTimeout(() => setLoading(false), 700);
  }

  return (
    <div className="min-h-screen bg-gradient-to-b from-secondary/30 to-background">
      <header className="max-w-7xl mx-auto px-4 py-6 flex items-center justify-between">
        <div className="flex items-center gap-4">
          <img src={logo} alt="Konu Real Estate" className="h-14 w-auto" />
          <div>
            <h1 className="text-xl font-bold text-foreground">Konu Real Estate</h1>
            <p className="text-sm text-muted-foreground">Find your dream home today</p>
          </div>
        </div>
        <nav className="flex items-center gap-3">
          <Button variant="ghost" className="hidden md:inline-flex">Sell</Button>
          <Button variant="ghost" className="hidden md:inline-flex">Buy</Button>
          <Button variant="ghost">Rent</Button>
          <Button variant="outline" className="hidden md:inline-flex">Sign in</Button>
        </nav>
      </header>

      <main className="max-w-7xl mx-auto px-4">
        <section className="grid grid-cols-1 lg:grid-cols-3 gap-6 items-start">
          {/* Main Content */}
          <div className="lg:col-span-2">
            <Card className="p-6">
              <div className="flex flex-col md:flex-row gap-3 items-end">
                <div className="flex-1 w-full">
                  <label className="text-xs text-muted-foreground font-medium">Search for locality, project or landmark</label>
                  <div className="mt-2 flex gap-2">
                    <Input
                      value={query}
                      onChange={(e) => setQuery(e.target.value)}
                      placeholder="e.g. Koramangala, 2 BHK, near metro"
                      className="flex-1"
                    />
                    <Button onClick={() => { fakeSearch(); }} className="gap-2">
                      {loading ? <Loader2 className="animate-spin" size={18} /> : <Search size={18} />}
                      <span className="hidden sm:inline">Search</span>
                    </Button>
                  </div>
                </div>
                <div className="w-full md:w-48">
                  <label className="text-xs text-muted-foreground font-medium">Sort</label>
                  <select className="mt-2 w-full rounded-lg border border-input bg-background px-3 py-2 text-sm">
                    <option>Relevance</option>
                    <option>Price: Low to High</option>
                    <option>Price: High to Low</option>
                    <option>Newest</option>
                  </select>
                </div>
              </div>

              <div className="mt-4 grid grid-cols-1 sm:grid-cols-3 gap-3">
                <div>
                  <label className="text-xs text-muted-foreground font-medium">Min price (₹ Lakhs)</label>
                  <input
                    type="number"
                    value={minPrice || ""}
                    onChange={(e) => setMinPrice(Number(e.target.value))}
                    className="mt-1 w-full rounded-lg border border-input bg-background px-3 py-2 text-sm"
                    placeholder="Min"
                  />
                </div>
                <div>
                  <label className="text-xs text-muted-foreground font-medium">Max price (₹ Lakhs)</label>
                  <input
                    type="number"
                    value={maxPrice || ""}
                    onChange={(e) => setMaxPrice(Number(e.target.value))}
                    className="mt-1 w-full rounded-lg border border-input bg-background px-3 py-2 text-sm"
                    placeholder="Max"
                  />
                </div>
                <div>
                  <label className="text-xs text-muted-foreground font-medium">Property type</label>
                  <select className="mt-1 w-full rounded-lg border border-input bg-background px-3 py-2 text-sm">
                    <option>All</option>
                    <option>Apartment</option>
                    <option>Villa</option>
                    <option>Plot</option>
                  </select>
                </div>
              </div>
            </Card>

            <div className="mt-6">
              <h2 className="text-2xl font-bold mb-4">Featured Listings</h2>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                {filtered.map((p) => (
                  <PropertyCard key={p.id} p={p} onSave={handleSave} />
                ))}
              </div>
              {filtered.length === 0 && (
                <div className="mt-8 text-center py-12">
                  <p className="text-muted-foreground text-lg">No properties match your filters.</p>
                  <Button variant="outline" className="mt-4" onClick={() => { setQuery(""); setMinPrice(0); setMaxPrice(0); }}>
                    Clear Filters
                  </Button>
                </div>
              )}
            </div>
          </div>

          {/* Sidebar */}
          <aside className="space-y-6">
            <Card className="p-4">
              <h3 className="font-semibold text-lg mb-3">Map</h3>
              <div className="h-72 rounded-lg overflow-hidden border border-border bg-secondary/20 flex items-center justify-center">
                <div className="text-center">
                  <MapPin className="mx-auto text-muted-foreground mb-2" size={48} strokeWidth={1.5} />
                  <p className="text-sm text-muted-foreground">Map view</p>
                </div>
              </div>
            </Card>

            <Card className="p-4">
              <div className="flex items-center justify-between mb-3">
                <h3 className="font-semibold text-lg">Saved Properties</h3>
                <Badge variant="secondary">{saved.length}</Badge>
              </div>
              <div className="space-y-3">
                {saved.length === 0 && (
                  <p className="text-sm text-muted-foreground py-4 text-center">
                    No saved properties yet. Click the <Heart size={14} className="inline" /> icon to save.
                  </p>
                )}
                {saved.map((s) => (
                  <div key={s.id} className="flex items-center gap-3 p-2 rounded-lg hover:bg-secondary/50 transition-colors">
                    <img src={s.img} alt={s.title} className="w-12 h-12 object-cover rounded-md" />
                    <div className="flex-1 min-w-0">
                      <div className="text-sm font-medium truncate">{s.title}</div>
                      <div className="text-xs text-muted-foreground truncate">{s.location}</div>
                    </div>
                  </div>
                ))}
              </div>
            </Card>

            <Card className="p-4 bg-gradient-to-br from-primary/10 to-accent/10 border-primary/20">
              <h3 className="font-semibold text-lg mb-2">Need help?</h3>
              <p className="text-sm text-muted-foreground mb-4">
                Talk to our advisors for property verification and legal assistance.
              </p>
              <div className="flex flex-col gap-2">
                <Button className="w-full">Chat now</Button>
                <Button variant="outline" className="w-full">Schedule visit</Button>
              </div>
            </Card>
          </aside>
        </section>

        <section className="mt-12 mb-16">
          <Card className="bg-gradient-to-r from-primary to-primary/80 text-primary-foreground border-none overflow-hidden">
            <CardContent className="p-8">
              <div className="max-w-4xl">
                <h2 className="text-3xl font-bold mb-2">List your property — reach millions</h2>
                <p className="text-primary-foreground/90 mb-6">
                  Fast listing, verified leads and smart promotions to make your property stand out.
                </p>
                <div className="flex flex-wrap gap-3">
                  <Button size="lg" variant="secondary">List Property</Button>
                  <Button size="lg" variant="outline" className="bg-transparent border-primary-foreground text-primary-foreground hover:bg-primary-foreground hover:text-primary">
                    Learn more
                  </Button>
                </div>
              </div>
            </CardContent>
          </Card>
        </section>
      </main>

      <footer className="border-t border-border mt-12 py-8 bg-secondary/20">
        <div className="max-w-7xl mx-auto px-4 flex flex-col md:flex-row items-center justify-between gap-4">
          <div className="text-sm text-muted-foreground">
            © {new Date().getFullYear()} Konu Real Estate — Inspired by MagicBricks & NoBroker
          </div>
          <div className="flex items-center gap-4 text-sm text-muted-foreground">
            <a href="#" className="hover:text-foreground transition-colors">Privacy</a>
            <a href="#" className="hover:text-foreground transition-colors">Terms</a>
            <a href="#" className="hover:text-foreground transition-colors">Contact</a>
          </div>
        </div>
      </footer>
    </div>
  );
}
