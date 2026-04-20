// import { NextRequest, NextResponse } from 'next/server';
// import prisma from '@/lib/prisma';

// export async function GET(req: NextRequest) {
//   const sessionToken = req.nextUrl.searchParams.get('sessionToken');
//   if (!sessionToken) return NextResponse.json({ reflections: [] });

//   const session = await prisma.portalSession.findUnique({ where: { sessionToken } });
//   if (!session) return NextResponse.json({ reflections: [] });

//   const reflections = await prisma.reflectionEntry.findMany({
//     where: { sessionToken },
//     orderBy: { updatedAt: 'desc' },
//   });

//   return NextResponse.json({ reflections });
// }

// export async function POST(req: NextRequest) {
//   try {
//     const { sessionToken, surahNumber, reflectionText } = await req.json();
//     if (!sessionToken || !surahNumber || !reflectionText) {
//       return NextResponse.json({ error: 'sessionToken, surahNumber, and reflectionText required' }, { status: 400 });
//     }

//     const session = await prisma.portalSession.findUnique({ where: { sessionToken } });
//     if (!session) return NextResponse.json({ error: 'Session not found' }, { status: 404 });

//     const existing = await prisma.reflectionEntry.findFirst({
//       where: { sessionToken, surahNumber: Number(surahNumber) },
//     });

//     let reflection;
//     if (existing) {
//       reflection = await prisma.reflectionEntry.update({
//         where: { id: existing.id },
//         data: { reflectionText, updatedAt: new Date() },
//       });
//     } else {
//       reflection = await prisma.reflectionEntry.create({
//         data: { sessionToken, surahNumber: Number(surahNumber), reflectionText },
//       });
//     }

//     return NextResponse.json({ reflection });
//   } catch {
//     return NextResponse.json({ error: 'Failed to save reflection' }, { status: 500 });
//   }
// }
import { NextRequest, NextResponse } from 'next/server';
import prisma from '@/lib/prisma';


// simple validation helpers
const urlRegex = /(https?:\/\/|www\.)/i;
const badWords = [
  // 🔴 English explicit
  "sex", "porn", "porno", "xxx", "nude", "nsfw",
  "fuck", "fck", "fuk", "fucc", "f*ck", "f**k", "fux", "fuxk",
  "shit", "sh1t", "sh!t", "shiit",
  "bitch", "b!tch", "biatch", "bich",
  "ass", "a$$", "asshole", "arse",
  "dick", "cock", "penis",
  "pussy", "vagina",
  "slut", "whore", "hoe", "prostitute",

  // 🔴 Violence / self harm
  "kill", "murder", "die", "suicide", "hang", "shoot",
  "bomb", "terror", "terrorist",

  // 🔴 Roman Urdu / Hindi abuse
  "bc", "b.c", "mc", "m.c",
  "bhenchod", "madarchod", "lund", "chut",
  "randi", "harami", "kutta", "kutiya",
  "kamina", "beghairat",

  // 🔴 Gaming / slang toxicity
  "noob", "idiot", "stupid", "retard",

  // 🔴 Religious abuse (careful category)
  "kafir", "lanat", "jahannam",

  // 🔴 Short aggressive slang
  "bsdk", "bkchodi", "bakchodi", "gaand"
];

function isValidText(text: string) {
  if (text.length < 20 || text.length > 80) return false;
  if (urlRegex.test(text)) return false;

  const lower = text.toLowerCase();
  if (badWords.some(word => lower.includes(word))) return false;

  return true;
}

// ✅ GET (no major change, just safer)
export async function GET(req: NextRequest) {
  const sessionToken = req.nextUrl.searchParams.get('sessionToken');

  if (!sessionToken) {
    return NextResponse.json({ reflections: [] });
  }

  const session = await prisma.portalSession.findUnique({
    where: { sessionToken }
  });

  if (!session) {
    return NextResponse.json({ reflections: [] });
  }

  const reflections = await prisma.reflectionEntry.findMany({
    where: { sessionToken },
    orderBy: { updatedAt: 'desc' },
  });

  return NextResponse.json({ reflections });
}


// ✅ POST (fixed + validation + no crashes)
export async function POST(req: NextRequest) {
  try {
    const body = await req.json();

    const { sessionToken, surahNumber, reflectionText , userId } = body;

    // 🔴 required fields check
    if (!sessionToken || !surahNumber || !reflectionText) {
      return NextResponse.json(
        { error: 'sessionToken, surahNumber, and reflectionText required' },
        { status: 400 }
      );
    }

    // 🔴 type safety
    const surahNum = Number(surahNumber);

    if (isNaN(surahNum)) {
      return NextResponse.json(
        { error: 'Invalid surahNumber' },
        { status: 400 }
      );
    }

    // 🔴 text validation (same as backend rules)
    if (!isValidText(reflectionText)) {
      return NextResponse.json(
        { error: 'Text must be 20-80 chars, no links or inappropriate words' },
        { status: 400 }
      );
    }

    // 🔴 session check
    const session = await prisma.portalSession.findUnique({
      where: { sessionToken }
    });

    if (!session) {
      return NextResponse.json(
        { error: 'Session not found' },
        { status: 404 }
      );
    }

    // 🔴 check existing (one per surah)
    const existing = await prisma.reflectionEntry.findFirst({
      where: {
        sessionToken,
        surahNumber: surahNum
      },
    });

    let reflection;

    if (existing) {
      // ✅ update
      reflection = await prisma.reflectionEntry.update({
        where: { id: existing.id },
        data: {
          reflectionText,
          updatedAt: new Date(),
          isApproved: false // 🔥 reset approval on edit
        },
      });
    } else {
      // ✅ create
      reflection = await prisma.reflectionEntry.create({
        data: {
          sessionToken,
          userId,
          surahNumber: surahNum,
          reflectionText,
          isApproved: false
        },
      });
    }

    return NextResponse.json(
      { message: 'Saved successfully', reflection },
      { status: 200 }
    );

  } catch (error) {
    console.error("POST /reflections error:", error); // 🔥 DEBUG

    return NextResponse.json(
      { error: 'Failed to save reflection' },
      { status: 500 }
    );
  }
}