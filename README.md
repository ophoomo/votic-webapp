This is a [Next.js](https://nextjs.org/) project bootstrapped with [`create-next-app`](https://github.com/vercel/next.js/tree/canary/packages/create-next-app).

## Getting Started

First, run the development server:

```bash
npm run dev
# or
yarn dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

You can start editing the page by modifying `pages/index.tsx`. The page auto-updates as you edit the file.

[API routes](https://nextjs.org/docs/api-routes/introduction) can be accessed on [http://localhost:3000/api/hello](http://localhost:3000/api/hello). This endpoint can be edited in `pages/api/hello.ts`.

The `pages/api` directory is mapped to `/api/*`. Files in this directory are treated as [API routes](https://nextjs.org/docs/api-routes/introduction) instead of React pages.

## Learn More

To learn more about Next.js, take a look at the following resources:

- [Next.js Documentation](https://nextjs.org/docs) - learn about Next.js features and API.
- [Learn Next.js](https://nextjs.org/learn) - an interactive Next.js tutorial.

You can check out [the Next.js GitHub repository](https://github.com/vercel/next.js/) - your feedback and contributions are welcome!

## Deploy on Vercel

The easiest way to deploy your Next.js app is to use the [Vercel Platform](https://vercel.com/new?utm_medium=default-template&filter=next.js&utm_source=create-next-app&utm_campaign=create-next-app-readme) from the creators of Next.js.

Check out our [Next.js deployment documentation](https://nextjs.org/docs/deployment) for more details.

## VoticApp

- ชื่อโครงงาน โปรแกรมช่วยในการตัดสินใจของนักศึกษา
- รายชื่อสมาชิก
  *6306021621073 นายธนภูมิ อุ่นจิตร Sec 2
   6306021621111 นายชญานิน ชากลาง Sec 2
   6306021621120 นายศรัณย์ชัย ศิริวงศ์ตระกูล Sec 2

- อธิบายการทำงานของโครงงาน 

เป็นโครงงานเกี่ยวกับการช่วยตัดสินใจของนักศึกษาภายในห้องเรียน
เนื่องจากปัญหาโควิด ทำให้นักศึกษาไม่สามารถพบเจอกันได้และเมื่อมีเรื่องที่ต้องตัดสินใจอะไรสักอย่างร่วมกัน นักศึกษาไม่ค่อยมีเครื่องมือเฉพาะทางการช่วยตัดสินใจ
เราได้เห็นปัญหาตรงจุดนี้ เราจึงจะพัฒนาเครื่องมือที่มีไว้สำหรับการโหวตและช่วยในการตัดสินใจของนักศึกษาภายในห้องเรียน หรือ ภายในกลุ่ม
โดยวิธีการใช้งาน นักศึกษาสามารถสมัครสมาชิก เข้าสู่ระบบไป สร้างห้อง หรือ กลุ่มของตนเอง และ นำโค้ด ไปให้เพื่อนเพื่อเข้ากลุ่ม หลังจากเข้ากลุ่มกันเสร็จแล้ว นักศึกษคนใดก็ได้สามารถสร้างหัวข้อขึ้นมา 
หลังจากสร้างเสร็จ มันก็จะมีหัวข้อนั้นเด้งขึ้นมาให้โหวต หลังจากโหวตเสร็จ หรือ หมดเวลา ระบบจะทำการสรุปผลให้

โปรแกรมมีความสามารถดังนี้
1.สมัครสมาชิก
2.เข้าสู่ระบบ
3.สร้างกลุ่ม
4.เข้าร่วมกลุ่ม
5.เปิดหัวข้อโหวต และกำหนดเวลาปิดได้ ภายในกลุ่ม
6.สามารถโหวตได้
7.ดูสรุปผลโหวตได้
8.ดูรายชื่อคนที่โหวต

มีประโยชน์ดังนี้
ช่วยให้นักศึกษาตัดสินใจอะไรได้รวดเร็วยิ่งขึ้น และสะดวกสบายมากยิ่งขึ้น

- เครื่องมือที่ใช้
Front-end: nextjs
Back-end: nestjs
Database: mongodb