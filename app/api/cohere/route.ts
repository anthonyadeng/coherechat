import { chat } from './cohereClient';
import { type NextRequest } from 'next/server';

export async function POST(request: NextRequest) {
  const data = await request.json();
  const { message, chatHistory } = data;
  const res = await chat(message, chatHistory);
  return Response.json({ res });
}

// import fetch from 'node-fetch';
// import fs from 'fs';

// const formData = new FormData();
// formData.append('mode', 'text-to-image');
// formData.append('prompt', 'afd, dffsgs, ');
// formData.append('aspect_ratio', '1:1');
// formData.append('output_format', 'png');
// formData.append('model', 'sd3');

// (async () => {
//   const response = await fetch(
//     'https://api.stability.ai/v2beta/stable-image/generate/sd3',
//     {
//       method: 'POST',
//       headers: {
//         Accept: 'image/*',
//         Authorization: 'Bearer sk-<STABILITY_API_KEY>',
//       },
//       body: formData,
//     }
//   );

//   const buffer = await response.arrayBuffer();

//   fs.writeFile('afd,.png', Buffer.from(buffer), () =>
//     console.log('finished downloading!')
//   );
// })().catch(console.error);
