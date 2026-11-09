import { db } from "./index";
import { products, admins, settings } from "./schema";
import bcrypt from "bcryptjs";

const IMG = {
  // Men
  men1: "https://images.pexels.com/photos/29502168/pexels-photo-29502168.jpeg?auto=compress&cs=tinysrgb&fit=crop&h=1200&w=800",
  men2: "https://images.pexels.com/photos/30947677/pexels-photo-30947677.jpeg?auto=compress&cs=tinysrgb&fit=crop&h=1200&w=800",
  men3: "https://images.pexels.com/photos/31840923/pexels-photo-31840923.jpeg?auto=compress&cs=tinysrgb&fit=crop&h=1200&w=800",
  men4: "https://images.pexels.com/photos/14230730/pexels-photo-14230730.jpeg?auto=compress&cs=tinysrgb&fit=crop&h=1200&w=800",
  men5: "https://images.pexels.com/photos/29501905/pexels-photo-29501905.jpeg?auto=compress&cs=tinysrgb&fit=crop&h=1200&w=800",
  men6: "https://images.pexels.com/photos/5264943/pexels-photo-5264943.jpeg?auto=compress&cs=tinysrgb&fit=crop&h=1200&w=800",
  men7: "https://images.pexels.com/photos/19816073/pexels-photo-19816073.jpeg?auto=compress&cs=tinysrgb&fit=crop&h=1200&w=800",
  men8: "https://images.pexels.com/photos/30947670/pexels-photo-30947670.jpeg?auto=compress&cs=tinysrgb&fit=crop&h=1200&w=800",
  // Women
  women1: "https://images.pexels.com/photos/39296295/pexels-photo-39296295.jpeg?auto=compress&cs=tinysrgb&fit=crop&h=1200&w=800",
  women2: "https://images.pexels.com/photos/17071184/pexels-photo-17071184.jpeg?auto=compress&cs=tinysrgb&fit=crop&h=1200&w=800",
  women3: "https://images.pexels.com/photos/34922839/pexels-photo-34922839.jpeg?auto=compress&cs=tinysrgb&fit=crop&h=1200&w=800",
  women4: "https://images.pexels.com/photos/19306663/pexels-photo-19306663.jpeg?auto=compress&cs=tinysrgb&fit=crop&h=1200&w=800",
  women5: "https://images.pexels.com/photos/17071210/pexels-photo-17071210.jpeg?auto=compress&cs=tinysrgb&fit=crop&h=1200&w=800",
  women6: "https://images.pexels.com/photos/37292005/pexels-photo-37292005.jpeg?auto=compress&cs=tinysrgb&fit=crop&h=1200&w=800",
  women7: "https://images.pexels.com/photos/16876900/pexels-photo-16876900.jpeg?auto=compress&cs=tinysrgb&fit=crop&h=1200&w=800",
  women8: "https://images.pexels.com/photos/17071188/pexels-photo-17071188.jpeg?auto=compress&cs=tinysrgb&fit=crop&h=1200&w=800",
  // Shoes
  shoe1: "https://images.pexels.com/photos/11324518/pexels-photo-11324518.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=650&w=940",
  shoe2: "https://images.pexels.com/photos/11324548/pexels-photo-11324548.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=650&w=940",
  shoe3: "https://images.pexels.com/photos/7857501/pexels-photo-7857501.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=650&w=940",
  shoe4: "https://images.pexels.com/photos/12628400/pexels-photo-12628400.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=650&w=940",
  shoe5: "https://images.pexels.com/photos/28271086/pexels-photo-28271086.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=650&w=940",
  // Perfume
  perf1: "https://images.pexels.com/photos/7850600/pexels-photo-7850600.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=650&w=940",
  perf2: "https://images.pexels.com/photos/11711833/pexels-photo-11711833.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=650&w=940",
  perf3: "https://images.pexels.com/photos/10924522/pexels-photo-10924522.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=650&w=940",
  perf4: "https://images.pexels.com/photos/36779953/pexels-photo-36779953.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=650&w=940",
  perf5: "https://images.pexels.com/photos/9957568/pexels-photo-9957568.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=650&w=940",
  // Bags
  bag1: "https://images.pexels.com/photos/7953286/pexels-photo-7953286.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=650&w=940",
  bag2: "https://images.pexels.com/photos/14806252/pexels-photo-14806252.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=650&w=940",
  bag3: "https://images.pexels.com/photos/12643950/pexels-photo-12643950.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=650&w=940",
  bag4: "https://images.pexels.com/photos/20591025/pexels-photo-20591025.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=650&w=940",
  bag5: "https://images.pexels.com/photos/6167276/pexels-photo-6167276.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=650&w=940",
  // Watches
  watch1: "https://images.pexels.com/photos/10436602/pexels-photo-10436602.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=650&w=940",
  watch2: "https://images.pexels.com/photos/10414974/pexels-photo-10414974.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=650&w=940",
  watch3: "https://images.pexels.com/photos/9423289/pexels-photo-9423289.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=650&w=940",
  watch4: "https://images.pexels.com/photos/6166169/pexels-photo-6166169.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=650&w=940",
  watch5: "https://images.pexels.com/photos/19793735/pexels-photo-19793735.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=650&w=940",
  // Kids
  kid1: "https://images.pexels.com/photos/40061319/pexels-photo-40061319.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=650&w=940",
  kid2: "https://images.pexels.com/photos/38778561/pexels-photo-38778561.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=650&w=940",
  kid3: "https://images.pexels.com/photos/1620759/pexels-photo-1620759.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=650&w=940",
  kid4: "https://images.pexels.com/photos/36909815/pexels-photo-36909815.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=650&w=940",
  kid5: "https://images.pexels.com/photos/40288460/pexels-photo-40288460.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=650&w=940",
  // Sunglasses
  sun1: "https://images.pexels.com/photos/27353350/pexels-photo-27353350.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=650&w=940",
  sun2: "https://images.pexels.com/photos/18002479/pexels-photo-18002479.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=650&w=940",
  sun3: "https://images.pexels.com/photos/9011189/pexels-photo-9011189.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=650&w=940",
  sun4: "https://images.pexels.com/photos/8084237/pexels-photo-8084237.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=650&w=940",
};

const CLOTH_SIZES = ["S", "M", "L", "XL", "XXL"];
const SHOE_SIZES = ["40", "41", "42", "43", "44", "45"];
const KID_SIZES = ["2-3", "4-5", "6-7", "8-9", "10-11"];

const seedProducts = [
  { name: 'جينز رجالي ستريت فيت أزرق', category: 'جينز رجالي', price: 1299, oldPrice: 1599, image: 'https://images.pexels.com/photos/1598507/pexels-photo-1598507.jpeg?auto=compress&cs=tinysrgb&w=900', description: 'قطعة من تشكيلة NEXX JEANS للدنيم والستريت وير. راحة في اللبس وتفاصيل تكمّل إطلالتك.', sizes: CLOTH_SIZES, colors: ["أزرق", "أسود"], stock: 12, featured: true, rating: 4.7 },
  { name: 'جينز رجالي سليم فيت أسود', category: 'جينز رجالي', price: 1199, oldPrice: 1499, image: 'https://images.pexels.com/photos/1342609/pexels-photo-1342609.jpeg?auto=compress&cs=tinysrgb&w=900', description: 'قطعة من تشكيلة NEXX JEANS للدنيم والستريت وير. راحة في اللبس وتفاصيل تكمّل إطلالتك.', sizes: CLOTH_SIZES, colors: ["أزرق", "أسود"], stock: 12, featured: true, rating: 4.7 },
  { name: 'جينز واسع Baggy أزرق فاتح', category: 'جينز رجالي', price: 1399, oldPrice: 1699, image: 'https://images.pexels.com/photos/298863/pexels-photo-298863.jpeg?auto=compress&cs=tinysrgb&w=900', description: 'قطعة من تشكيلة NEXX JEANS للدنيم والستريت وير. راحة في اللبس وتفاصيل تكمّل إطلالتك.', sizes: CLOTH_SIZES, colors: ["أزرق", "أسود"], stock: 12, featured: true, rating: 4.7 },
  { name: 'جاكيت جينز كلاسيك', category: 'جاكيتات جينز', price: 1899, oldPrice: 2299, image: 'https://images.pexels.com/photos/1040945/pexels-photo-1040945.jpeg?auto=compress&cs=tinysrgb&w=900', description: 'قطعة من تشكيلة NEXX JEANS للدنيم والستريت وير. راحة في اللبس وتفاصيل تكمّل إطلالتك.', sizes: CLOTH_SIZES, colors: ["أزرق", "أسود"], stock: 12, featured: true, rating: 4.7 },
  { name: 'تيشيرت أوفر سايز أبيض', category: 'تيشيرتات', price: 599, oldPrice: 799, image: 'https://images.pexels.com/photos/8532616/pexels-photo-8532616.jpeg?auto=compress&cs=tinysrgb&w=900', description: 'قطعة من تشكيلة NEXX JEANS للدنيم والستريت وير. راحة في اللبس وتفاصيل تكمّل إطلالتك.', sizes: CLOTH_SIZES, colors: ["أزرق", "أسود"], stock: 12, featured: false, rating: 4.7 },
  { name: 'تيشيرت أوفر سايز أسود', category: 'تيشيرتات', price: 599, oldPrice: null, image: 'https://images.pexels.com/photos/5698851/pexels-photo-5698851.jpeg?auto=compress&cs=tinysrgb&w=900', description: 'قطعة من تشكيلة NEXX JEANS للدنيم والستريت وير. راحة في اللبس وتفاصيل تكمّل إطلالتك.', sizes: CLOTH_SIZES, colors: ["أزرق", "أسود"], stock: 12, featured: false, rating: 4.7 },
  { name: 'بنطلون Cargo زيتي', category: 'بناطيل', price: 1199, oldPrice: 1499, image: 'https://images.pexels.com/photos/6311392/pexels-photo-6311392.jpeg?auto=compress&cs=tinysrgb&w=900', description: 'قطعة من تشكيلة NEXX JEANS للدنيم والستريت وير. راحة في اللبس وتفاصيل تكمّل إطلالتك.', sizes: CLOTH_SIZES, colors: ["أزرق", "أسود"], stock: 12, featured: false, rating: 4.7 },
  { name: 'بنطلون Cargo أسود', category: 'بناطيل', price: 1199, oldPrice: null, image: 'https://images.pexels.com/photos/6311391/pexels-photo-6311391.jpeg?auto=compress&cs=tinysrgb&w=900', description: 'قطعة من تشكيلة NEXX JEANS للدنيم والستريت وير. راحة في اللبس وتفاصيل تكمّل إطلالتك.', sizes: CLOTH_SIZES, colors: ["أزرق", "أسود"], stock: 12, featured: false, rating: 4.7 },
  { name: 'جينز نسائي Wide Leg', category: 'جينز نسائي', price: 1299, oldPrice: 1599, image: 'https://images.pexels.com/photos/977586/pexels-photo-977586.jpeg?auto=compress&cs=tinysrgb&w=900', description: 'قطعة من تشكيلة NEXX JEANS للدنيم والستريت وير. راحة في اللبس وتفاصيل تكمّل إطلالتك.', sizes: CLOTH_SIZES, colors: ["أزرق", "أسود"], stock: 12, featured: false, rating: 4.7 },
  { name: 'جينز نسائي Mom Fit', category: 'جينز نسائي', price: 1249, oldPrice: null, image: 'https://images.pexels.com/photos/1082529/pexels-photo-1082529.jpeg?auto=compress&cs=tinysrgb&w=900', description: 'قطعة من تشكيلة NEXX JEANS للدنيم والستريت وير. راحة في اللبس وتفاصيل تكمّل إطلالتك.', sizes: CLOTH_SIZES, colors: ["أزرق", "أسود"], stock: 12, featured: false, rating: 4.7 },
  { name: 'جاكيت جينز نسائي قصير', category: 'جاكيتات جينز', price: 1799, oldPrice: 2199, image: 'https://images.pexels.com/photos/1462637/pexels-photo-1462637.jpeg?auto=compress&cs=tinysrgb&w=900', description: 'قطعة من تشكيلة NEXX JEANS للدنيم والستريت وير. راحة في اللبس وتفاصيل تكمّل إطلالتك.', sizes: CLOTH_SIZES, colors: ["أزرق", "أسود"], stock: 12, featured: false, rating: 4.7 },
  { name: 'هودي أساسي رمادي', category: 'هوديز', price: 999, oldPrice: 1199, image: 'https://images.pexels.com/photos/428338/pexels-photo-428338.jpeg?auto=compress&cs=tinysrgb&w=900', description: 'قطعة من تشكيلة NEXX JEANS للدنيم والستريت وير. راحة في اللبس وتفاصيل تكمّل إطلالتك.', sizes: CLOTH_SIZES, colors: ["أزرق", "أسود"], stock: 12, featured: false, rating: 4.7 }
];

const defaultSettings: Record<string, string> = {
  store_name: "NEXX JEANS",
  store_tagline: "DENIM CULTURE · EVERYDAY ICONS",
  phone: "+201005655530",
  email: "",
  address: "العاشر من رمضان، الشرقية، مصر",
  whatsapp: "+201005655530",
  announcement: "NEXX JEANS — DENIM MADE TO STAND OUT",
  hero_title: "ستايلك. هويتك. NEXX.",
  hero_subtitle: "اكتشف قطع الدنيم والملابس العصرية المصممة لتعبّر عنك",
  shipping_fee: "50",
  free_shipping_over: "1000",
};

async function main() {
  console.log("🌱 Seeding database...");

  // Admin user
  const username = process.env.ADMIN_USERNAME;
  if (!username) throw new Error("ADMIN_USERNAME must be configured");
  const password = process.env.ADMIN_PASSWORD;
  if (!password || password.length < 14) throw new Error("ADMIN_PASSWORD must be set to a strong password (14+ characters)");
  const hash = await bcrypt.hash(password, 12);
  await db
    .insert(admins)
    .values({ username, passwordHash: hash })
    .onConflictDoUpdate({
      target: admins.username,
      set: { passwordHash: hash },
    });
  console.log(`✅ Admin user ready: ${username}`);

  // Settings
  for (const [key, value] of Object.entries(defaultSettings)) {
    await db
      .insert(settings)
      .values({ key, value })
      .onConflictDoUpdate({ target: settings.key, set: { value } });
  }
  console.log("✅ Settings seeded");

  // Products (clear first for idempotent seeding)
  await db.delete(products);
  await db.insert(products).values(seedProducts);
  console.log(`✅ ${seedProducts.length} products seeded`);

  console.log("🎉 Seeding complete");
  process.exit(0);
}

main().catch((e) => {
  console.error("❌ Seed failed:", e);
  process.exit(1);
});
