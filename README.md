# Where's Waldo - Bulmaca Oyunu

Bu proje, bir junior web developer tarafından full-stack web geliştirme becerilerini öğrenmek ve uygulamak amacıyla geliştirilmiş bir portföy projesidir. Klasik "Where's Waldo" (Nerede Bu Waldo?) oyununun web versiyonudur. Kullanıcılar bir resim üzerinde belirli karakterleri ve nesneleri bulmaya çalışır ve en hızlı süreleri liderlik tablosunda görüntüleyebilir.

## 📋 İçindekiler

- [Proje Hakkında](#proje-hakkında)
- [Kullanılan Teknolojiler](#kullanılan-teknolojiler)
- [Proje Yapısı](#proje-yapısı)
- [Gereksinimler](#gereksinimler)
- [Kurulum](#kurulum)
- [Çalıştırma](#çalıştırma)
- [API Endpoints](#api-endpoints)
- [Veritabanı](#veritabanı)
- [Kullanılan Öğrenme Kaynakları](#kullanılan-öğrenme-kaynakları)
- [Geliştirme Notları](#geliştirme-notları)

## 🎮 Proje Hakkında

Bu proje, bir junior web developer'ın öğrenme sürecinde geliştirdiği full-stack web uygulamasıdır. Proje, modern web teknolojilerini öğrenmek ve pratik yapmak amacıyla oluşturulmuştur. Proje iki ana bölümden oluşur:

- **Backend**: RESTful API servisi (Express.js + Prisma + PostgreSQL)
- **Frontend**: Kullanıcı arayüzü (React + Vite + React Router)

### Bu Projede Öğrenilenler

- Full-stack web geliştirme (Backend + Frontend)
- RESTful API tasarımı ve geliştirme
- Veritabanı yönetimi (PostgreSQL + Prisma ORM)
- React ile modern kullanıcı arayüzü geliştirme
- State yönetimi ve routing
- CORS yapılandırması
- Environment variables kullanımı
- Git versiyon kontrolü

### Oyun Nasıl Çalışır?

1. Kullanıcı oyun sayfasına girer
2. Resim üzerinde belirli karakterleri ve nesneleri bulmaya çalışır
3. Her karakter/nesne bulunduğunda işaretlenir
4. Tüm karakterler bulunduğunda oyun biter ve süre kaydedilir
5. Kullanıcılar liderlik tablosunda en iyi süreleri görebilir

## 🛠️ Kullanılan Teknolojiler

### Backend
- **Node.js**: JavaScript runtime ortamı
- **Express.js**: Web framework (RESTful API oluşturmak için)
- **Prisma**: Modern ORM (Object-Relational Mapping) - Veritabanı işlemleri için
- **PostgreSQL**: İlişkisel veritabanı
- **CORS**: Cross-Origin Resource Sharing (Frontend ile iletişim için)
- **dotenv**: Ortam değişkenlerini yönetmek için

### Frontend
- **React 19**: Kullanıcı arayüzü kütüphanesi
- **React Router**: Sayfa yönlendirme (routing)
- **Vite**: Modern build tool ve development server
- **ESLint**: Kod kalitesi ve hata kontrolü

## 📁 Proje Yapısı

```
where-s-waldo/
├── backend/                 # Backend (API) klasörü
│   ├── app.js              # Express uygulamasının ana dosyası
│   ├── controllers/        # İş mantığı (business logic)
│   │   ├── indexController.js
│   │   └── usersController.js
│   ├── routes/             # API route tanımlamaları
│   │   ├── indexRouter.js
│   │   └── usersRouter.js
│   ├── prisma/             # Prisma veritabanı şeması ve migration'lar
│   │   ├── schema.prisma   # Veritabanı model tanımlamaları
│   │   ├── seed.js         # Veritabanına başlangıç verilerini ekler
│   │   └── migrations/     # Veritabanı değişiklik geçmişi
│   ├── lib/                # Yardımcı kütüphaneler
│   │   └── prisma.js       # Prisma client yapılandırması
│   └── package.json        # Backend bağımlılıkları
│
└── frontend/               # Frontend (React) klasörü
    ├── src/
    │   ├── components/     # Yeniden kullanılabilir React bileşenleri
    │   │   ├── result-dialog-box.jsx
    │   │   └── user-result.jsx
    │   ├── routes/         # Sayfa bileşenleri
    │   │   ├── gameboard.jsx      # Oyun sayfası
    │   │   ├── leaderboard.jsx    # Liderlik tablosu
    │   │   ├── index.jsx          # Ana sayfa
    │   │   └── root.jsx           # Layout bileşeni
    │   ├── styles/         # CSS dosyaları
    │   ├── assets/         # Görseller ve statik dosyalar
    │   ├── routes.jsx       # Route tanımlamaları
    │   └── main.jsx        # React uygulamasının giriş noktası
    └── package.json        # Frontend bağımlılıkları
```

## 📦 Gereksinimler

Projeyi çalıştırmak için aşağıdaki yazılımların yüklü olması gerekir:

- **Node.js** (v18 veya üzeri) - [İndirme sayfası](https://nodejs.org/)
- **npm** (Node.js ile birlikte gelir)
- **PostgreSQL** (v12 veya üzeri) - [İndirme sayfası](https://www.postgresql.org/download/)

### Node.js Kurulumunu Kontrol Etme

Terminal'de şu komutu çalıştırarak Node.js'in kurulu olup olmadığını kontrol edebilirsiniz:

```bash
node --version
npm --version
```

## 🚀 Kurulum

### 1. Projeyi İndirin

Eğer projeyi GitHub'dan klonluyorsanız:

```bash
git clone <repository-url>
cd where-s-waldo
```

### 2. PostgreSQL Veritabanı Kurulumu

1. PostgreSQL'i bilgisayarınıza kurun
2. PostgreSQL'e bağlanın ve yeni bir veritabanı oluşturun:

```sql
CREATE DATABASE wheres_waldo;
```

3. Veritabanı bağlantı bilgilerinizi not edin (host, port, kullanıcı adı, şifre)

### 3. Backend Kurulumu

1. Backend klasörüne gidin:

```bash
cd backend
```

2. Bağımlılıkları yükleyin:

```bash
npm install
```

3. Ortam değişkenlerini ayarlayın:

`backend` klasöründe `.env` adında bir dosya oluşturun ve aşağıdaki içeriği ekleyin:

```env
DATABASE_URL="postgresql://kullanici_adi:sifre@localhost:5432/wheres_waldo?schema=public"
PORT=3000
```

**Önemli**: `kullanici_adi`, `sifre` ve `wheres_waldo` değerlerini kendi PostgreSQL ayarlarınıza göre değiştirin.

4. Prisma migration'larını çalıştırın (veritabanı tablolarını oluşturur):

```bash
npx prisma migrate deploy
```

veya development için:

```bash
npx prisma migrate dev
```

5. Prisma Client'ı oluşturun:

```bash
npx prisma generate
```

6. Veritabanını seed edin (başlangıç verilerini ekle):

```bash
npx prisma db seed
```

### 4. Frontend Kurulumu

1. Yeni bir terminal açın ve frontend klasörüne gidin:

```bash
cd frontend
```

2. Bağımlılıkları yükleyin:

```bash
npm install
```

## ▶️ Çalıştırma

### Backend'i Çalıştırma

Backend klasöründe:

```bash
npm start
```

Backend başarıyla çalışıyorsa terminal'de şu mesajı göreceksiniz:
```
express is running on port 3000
```

### Frontend'i Çalıştırma

Frontend klasöründe (yeni bir terminal'de):

```bash
npm run dev
```

Frontend başarıyla çalışıyorsa terminal'de bir URL göreceksiniz (genellikle `http://localhost:5173`).

Tarayıcınızda bu URL'yi açarak uygulamayı kullanabilirsiniz.

## 🔌 API Endpoints

Backend API'si aşağıdaki endpoint'leri sağlar:

### Targets (Hedefler/Karakterler)

- **GET** `/api/targets` - Tüm hedefleri getir
- **GET** `/api/targets/:targetId` - Belirli bir hedefi ID ile getir

### Users (Kullanıcılar)

- **GET** `/api/users` - Tüm kullanıcıları getir (liderlik tablosu için)
- **POST** `/api/users` - Yeni bir kullanıcı oluştur

**Örnek POST Request:**

```json
{
  "name": "Alper",
  "game_time": 120
}
```

## 🗄️ Veritabanı

Proje PostgreSQL veritabanı kullanır. Prisma ORM ile yönetilir.

### Modeller

#### Target (Hedef)
- `id`: Benzersiz kimlik (UUID)
- `name`: Hedefin adı (örn: "Waldo", "Wenda", "key")
- `topLeftX`: Sol üst köşe X koordinatı (0-1 arası normalize edilmiş)
- `topLeftY`: Sol üst köşe Y koordinatı (0-1 arası normalize edilmiş)
- `bottomRightX`: Sağ alt köşe X koordinatı (0-1 arası normalize edilmiş)
- `bottomRightY`: Sağ alt köşe Y koordinatı (0-1 arası normalize edilmiş)

#### User (Kullanıcı)
- `id`: Benzersiz kimlik (UUID)
- `name`: Kullanıcı adı (varsayılan: "Anonymous")
- `game_time`: Oyun süresi (saniye cinsinden)

### Prisma Komutları

- **Veritabanı şemasını görüntüle**: `npx prisma studio` (Grafik arayüz açar)
- **Migration oluştur**: `npx prisma migrate dev --name migration_adi`
- **Veritabanını sıfırla**: `npx prisma migrate reset`

## 📝 Lisans

MIT License

## 👤 Yazar

Alper Mutlu Akcan - alper.makcan@gmail.com
