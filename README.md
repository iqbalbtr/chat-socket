# WEB RTC SOCKET 

Project yang di bangun menggunakan express sebagai http protokol untuk bagian backend dan react vite pada frontend. Socket io digunakan untuk menjalakan secara realtime dalam menerima request dari sisi client ataupun menerima response dari sisi server ke sisi client.

<br>

> [!TIP]
> Pastikan node js sudah terinstall di komputer. Ketik "npm -v" untuk mengeceknya

## Installasi 

### 1. Clone dari repository

 ```git
 $ git clone https://github.com/liynx45/chat-socket.git
```

### 2. Buka directory project
```cmd
$ cd chat-socket
```

### 3. Lakukan installasi dependensi di masing masing sisi

#### a. Client

```cmd
$ cd frontend
$ npm install
```

#### b. Server 
```cmd
$ cd backend
$ npm install
```
<br>

## Konfigurasi

### 1. Server

Lakukan migrasi pada prisma untuk konfigurasi pada database.
```
$ npx prisma migrate dev
```
Rename file .env.example menjadi .env , lalu buat kata kunci untuk proses verifikasi jwt
```
.env
...
TOKEN_KEY=[buat kata kunci]
```

<br>

## Penggunaan

Setelah instalasi selesai, gunakan perintah-perintah berikut untuk menjalankan proyek di setiap sisinya:

#### 1. Pengembangan

Untuk mode pengembangan gunakan:
```cmd
$ npm run dev
```
#### 2. Production

Untuk melihat pratinjau proyek gunakan:

```cmd
// untuk server
$ npm run serve

// untuk client
$ npm run priview
```
> [!NOTE]
> Pastikan untuk menjalankan perintah tersebut di direktori yang sesuai antara backend dan frontend



> [!TIP]
> Happy Coding!



