import { FFmpeg } from '@ffmpeg/ffmpeg';

export async function convertVideoToAnimatedWebp({ name, buffer }: ConvertVideoArgs): Promise<Uint8Array> {
    const ffmpeg = new FFmpeg();
    await ffmpeg.load({
        coreURL: './ffmpeg-core.js',
        wasmURL: './ffmpeg-core.wasm',
    });
    await ffmpeg.writeFile(name, buffer);
    await ffmpeg.exec([
        '-i',
        name,
        '-vcodec',
        'libwebp',
        '-lossless',
        '0',
        '-loop',
        '0',
        '-preset',
        'picture',
        '-an',
        '-vsync',
        '0',
        'output.webp',
    ]);
    return await ffmpeg.readFile('output.webp') as Uint8Array;
}

globalThis.convertVideoToAnimatedWebp = convertVideoToAnimatedWebp;
