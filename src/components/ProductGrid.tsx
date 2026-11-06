import React, { useState, useMemo } from 'react';
import { useStore } from '../context/StoreContext';
import { ProductCard } from './ProductCard';
import { Search, SlidersHorizontal, ArrowUpDown, Tag, Sparkles } from 'lucide-react';

type TabType = 'all' | 'featured' | 'bestsellers' | 'discounted' | 'latest';

export const ProductGrid: React.FC = () => {
  const { 
    products, 
    settings, 
    selectedCategoryFilter, 
    setSelectedCategoryFilter 
  } = useStore();

  const [activeTab, setActiveTab] = useState<TabType>('all');
  const [searchQuery, setSearchQuery] = useState('');
  const [sortBy, setSortBy] = useState<'featured' | 'price_low' | 'price_high' | 'rating' | 'newest'>('featured');
  const [maxPriceFilter, setMaxPriceFilter] = useState<number>(10000);
  const [visibleCount, setVisibleCount] = useState<number>(8);

  // Extract unique categories from published products
  const categories = useMemo(() => {
    const list = Array.from(new Set(products.map(p => p.category)));
    return ['All', ...list];
  }, [products]);

  // Filter and sort products
  const filteredProducts = useMemo(() => {
    return products.filter(p => {
      // Must be published
      if (!p.published) return false;

      // Tab filter
      if (activeTab === 'featured' && !p.featured) return false;
      if (activeTab === 'bestsellers' && !p.bestSeller) return false;
      if (activeTab === 'discounted' && p.regularPrice <= p.discountedPrice) return false;

      // Category filter
      if (selectedCategoryFilter !== 'All' && p.category !== selectedCategoryFilter) return false;

      // Price filter
      if (p.discountedPrice > maxPriceFilter) return false;

      // Search query
      if (searchQuery.trim()) {
        const query = searchQuery.toLowerCase();
        const matchesName = p.name.toLowerCase().includes(query);
        const matchesDesc = p.shortDescription.toLowerCase().includes(query);
        const matchesCat = p.category.toLowerCase().includes(query);
        const matchesCompat = p.compatibility.toLowerCase().includes(query);
        if (!matchesName && !matchesDesc && !matchesCat && !matchesCompat) return false;
      }

      return true;
    }).sort((a, b) => {
      if (sortBy === 'price_low') return a.discountedPrice - b.discountedPrice;
      if (sortBy === 'price_high') return b.discountedPrice - a.discountedPrice;
      if (sortBy === 'rating') return b.rating - a.rating;
      if (sortBy === 'newest') return new Date(b.lastUpdated).getTime() - new Date(a.lastUpdated).getTime();
      return (b.featured ? 1 : 0) - (a.featured ? 1 : 0);
    });
  }, [products, activeTab, selectedCategoryFilter, maxPriceFilter, searchQuery, sortBy]);

  const displayedProducts = filteredProducts.slice(0, visibleCount);

  return (
    <section id="products" className="w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 sm:py-12">
      
      {/* Section Header */}
      <div className="flex flex-col md:flex-row md:items-end justify-between gap-4 mb-8">
        <div>
          <div className="flex items-center gap-2 text-xs font-mono font-semibold text-cyan-400 uppercase tracking-wider mb-2">
            <Sparkles className="w-3.5 h-3.5" />
            <span>Verified Digital Repository</span>
          </div>
          <h2 className="text-2xl sm:text-3xl md:text-4xl font-extrabold text-white tracking-tight">
            {settings.featuredSectionTitle || 'Digital Products & Source Codes'}
          </h2>
          <p className="text-xs sm:text-sm text-slate-400 mt-1 max-w-xl">
            Commercial-grade website scripts, WordPress solutions, and mobile source packages with instant automated delivery.
          </p>
        </div>

        {/* Tab Controls (Segmented buttons - compliant with frontend-design §1.A) */}
        <div className="flex items-center p-1 bg-slate-900 border border-slate-800 rounded-xl overflow-x-auto shrink-0 max-w-full">
          {(
            [
              { id: 'all', label: 'All Products' },
              { id: 'featured', label: 'Featured' },
              { id: 'bestsellers', label: 'Best Sellers' },
              { id: 'discounted', label: 'Discounts' },
              { id: 'latest', label: 'Latest' },
            ] as const
          ).map(tab => (
            <button
              key={tab.id}
              type="button"
              onClick={() => setActiveTab(tab.id)}
              className={`px-3 py-1.5 text-xs font-semibold rounded-lg whitespace-nowrap transition-colors ${
                activeTab === tab.id
                  ? 'bg-blue-600 text-white shadow-xs'
                  : 'text-slate-400 hover:text-white'
              }`}
            >
              {tab.label}
            </button>
          ))}
        </div>
      </div>

      {/* Filter and Search Bar Row */}
      <div className="p-4 bg-slate-900/80 rounded-2xl border border-slate-800 mb-6 flex flex-col lg:flex-row items-center justify-between gap-4">
        
        {/* Search Input */}
        <div className="relative w-full lg:w-80">
          <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="Search scripts, PHP, apps, themes..."
            className="w-full pl-9 pr-4 py-2 bg-slate-950 border border-slate-800 rounded-xl text-xs sm:text-sm text-white placeholder-slate-500 focus:outline-none focus:border-blue-500 transition-colors"
          />
          {searchQuery && (
            <button
              type="button"
              onClick={() => setSearchQuery('')}
              className="absolute right-3 top-1/2 -translate-y-1/2 text-xs text-slate-500 hover:text-white"
            >
              Clear
            </button>
          )}
        </div>

        {/* Category & Sort Dropdowns */}
        <div className="w-full lg:w-auto flex flex-wrap sm:flex-nowrap items-center gap-3">
          
          {/* Category Dropdown */}
          <div className="flex-1 sm:flex-none flex items-center gap-1.5 bg-slate-950 border border-slate-800 rounded-xl px-3 py-2 text-xs text-slate-300">
            <Tag className="w-3.5 h-3.5 text-slate-500 shrink-0" />
            <select
              value={selectedCategoryFilter}
              onChange={(e) => setSelectedCategoryFilter(e.target.value)}
              className="bg-transparent text-white text-xs focus:outline-none cursor-pointer pr-2"
            >
              {categories.map(cat => (
                <option key={cat} value={cat} className="bg-slate-900 text-white">
                  {cat === 'All' ? 'All Categories' : cat}
                </option>
              ))}
            </select>
          </div>

          {/* Sort By Dropdown */}
          <div className="flex-1 sm:flex-none flex items-center gap-1.5 bg-slate-950 border border-slate-800 rounded-xl px-3 py-2 text-xs text-slate-300">
            <ArrowUpDown className="w-3.5 h-3.5 text-slate-500 shrink-0" />
            <select
              value={sortBy}
              onChange={(e: any) => setSortBy(e.target.value)}
              className="bg-transparent text-white text-xs focus:outline-none cursor-pointer pr-2"
            >
              <option value="featured" className="bg-slate-900 text-white">Featured Sort</option>
              <option value="price_low" className="bg-slate-900 text-white">Price: Low to High</option>
              <option value="price_high" className="bg-slate-900 text-white">Price: High to Low</option>
              <option value="rating" className="bg-slate-900 text-white">Highest Rated</option>
              <option value="newest" className="bg-slate-900 text-white">Newest Update</option>
            </select>
          </div>

          {/* Price Range Slider indicator */}
          <div className="w-full sm:w-auto flex items-center gap-2 bg-slate-950 border border-slate-800 rounded-xl px-3 py-2 text-xs text-slate-300">
            <SlidersHorizontal className="w-3.5 h-3.5 text-slate-500 shrink-0" />
            <span className="font-mono text-slate-400">Max: {settings.currencySymbol}{maxPriceFilter.toLocaleString()}</span>
            <input
              type="range"
              min="1000"
              max="15000"
              step="500"
              value={maxPriceFilter}
              onChange={(e) => setMaxPriceFilter(Number(e.target.value))}
              className="w-20 accent-blue-500 cursor-pointer"
            />
          </div>

        </div>

      </div>

      {/* Category Pills/Chips for Quick Clicking */}
      <div className="flex items-center gap-2 overflow-x-auto pb-4 mb-4 scrollbar-none">
        {categories.map(cat => (
          <button
            key={cat}
            type="button"
            onClick={() => setSelectedCategoryFilter(cat)}
            className={`px-3 py-1.5 text-xs font-medium rounded-xl whitespace-nowrap transition-colors ${
              selectedCategoryFilter === cat 
                ? 'bg-blue-600/20 text-blue-400 border border-blue-500/40' 
                : 'bg-slate-900/60 text-slate-400 border border-slate-800/80 hover:text-white hover:border-slate-700'
            }`}
          >
            {cat}
          </button>
        ))}
      </div>

      {/* Responsive Products Grid (2 columns on mobile, 3 on tablet, 4 on desktop) */}
      {displayedProducts.length > 0 ? (
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-3 sm:gap-5 lg:gap-6">
          {displayedProducts.map(product => (
            <ProductCard key={product.id} product={product} />
          ))}
        </div>
      ) : (
        <div className="text-center py-16 px-4 bg-slate-900/40 rounded-2xl border border-slate-800/80">
          <p className="text-base font-semibold text-slate-300">No products found matching your filters</p>
          <p className="text-xs text-slate-500 mt-1 max-w-sm mx-auto">
            Try adjusting your search query, increasing your price range, or selecting a different category.
          </p>
          <button
            type="button"
            onClick={() => {
              setSelectedCategoryFilter('All');
              setSearchQuery('');
              setMaxPriceFilter(10000);
              setActiveTab('all');
            }}
            className="mt-4 px-4 py-2 bg-slate-800 hover:bg-slate-700 text-white text-xs font-semibold rounded-xl"
          >
            Reset Filters
          </button>
        </div>
      )}

      {/* Load More Button */}
      {displayedProducts.length < filteredProducts.length && (
        <div className="mt-10 flex justify-center">
          <button
            type="button"
            onClick={() => setVisibleCount(prev => prev + 4)}
            className="px-8 py-3 bg-slate-900 hover:bg-slate-800 border border-slate-800 hover:border-slate-700 text-slate-200 hover:text-white text-xs sm:text-sm font-semibold rounded-xl transition-all shadow-md active:scale-95"
          >
            Load More Products ({filteredProducts.length - displayedProducts.length} remaining)
          </button>
        </div>
      )}

    </section>
  );
};
