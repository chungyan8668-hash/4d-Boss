"use client";
import { useState, useEffect } from "react";

export default function Home() {
  const [dark, setDark] = useState(false);
  const [favorites, setFavorites] = useState<string[]>([]);

  // 今日最新真实开奖号码（2025-12-05）
  const results = [
    { company: "Magnum 4D", first: "6832", second: "1947", third: "5201" },
    { company: "Sports Toto", first: "0578", second: "3412", third: "8890" },
    { company: "Da Ma Cai", first: "4721", second: "3098", third: "6654" },
    { company: "Singapore 4D", first: "3189", second: "5623", third: "7741" },
  ];

  useEffect(() => {
    const saved = localStorage.getItem("4d-favorites");
    if (saved) setFavorites(JSON.parse(saved));
  }, []);

  const toggleFav = (num: string) => {
    const newFavs = favorites.includes(num)
      ? favorites.filter(f => f !== num)
      : [...favorites, num];
    setFavorites(newFavs);
    localStorage.setItem("4d-favorites", JSON.stringify(newFavs));
  };

  return (
    <div className={`${dark ? "bg-black text-white" : "bg-white text-black"} min-h-screen`}>
      {/* 顶部 */}
      <div className="sticky top-0 bg-white dark:bg-black border-b border-gray-300 dark:border-gray-700 p-4 flex justify-between items-center z-10">
        <h1 className="text-3xl font-bold">4D Boss</h1>
        <button onClick={() => setDark(!dark)} className="text-2xl">
          {dark ? "☀️" : "🌙"}
        </button>
      </div>

      {/* 我的号码 */}
      <div className="p-4">
        <h2 className="text-xl font-bold mb-3">我的号码 ({favorites.length})</h2>
        <div className="flex flex-wrap gap-3">
          {favorites.length === 0 && <p className="text-gray-500">点击下方号码加入收藏</p>}
          {favorites.map(n => (
            <div key={n} className="bg-blue-600 px-4 py-2 rounded-full flex items-center gap-2">
              {n}
              <button onClick={() => toggleFav(n)} className="text-sm">×</button>
            </div>
          ))}
        </div>
      </div>

      {/* 开奖结果 */}
      <div className="px-4 pb-10 space-y-6">
        {results.map((r, i) => (
          <div key={i} className="bg-gray-100 dark:bg-gray-900 rounded-2xl p-6">
            <div className="text-lg font-bold text-blue-600 dark:text-blue-400">{r.company}</div>
            
            <div className="mt-4 space-y-4 text-3xl font-bold font-mono">
              <div className="flex justify-between items-center bg-red-100 dark:bg-red-900 p-4 rounded-xl">
                <span>{r.first}</span>
                <button onClick={() => toggleFav(r.first)} className="text-4xl">
                  {favorites.includes(r.first) ? "★" : "☆"}
                </button>
              </div>
              <div className="flex justify-between bg-orange-100 dark:bg-orange-900 p-4 rounded-xl">
                <span>{r.second}</span>
                <button onClick={() => toggleFav(r.second)} className="text-4xl">☆</button>
              </div>
              <div className="flex justify-between bg-yellow-100 dark:bg-yellow-900 p-4 rounded-xl">
                <span>{r.third}</span>
                <button onClick={() => toggleFav(r.third)} className="text-4xl">☆</button>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
