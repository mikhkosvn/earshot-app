import 'server-only';

export type DecodedWav = {
  sampleRate: number;
  channels: Int16Array[];
  bitsPerSample: number;
  durationSeconds: number;
};

const readAscii = (view: DataView, offset: number, length: number) =>
  String.fromCharCode(
    ...Array.from({ length }, (_, index) => view.getUint8(offset + index)),
  );

export const decodeWav = (bytes: Uint8Array): DecodedWav => {
  const view = new DataView(bytes.buffer, bytes.byteOffset, bytes.byteLength);
  if (readAscii(view, 0, 4) !== 'RIFF' || readAscii(view, 8, 4) !== 'WAVE') {
    throw new Error('The file is not a WAV file.');
  }
  let offset = 12;
  let channelCount = 0;
  let sampleRate = 0;
  let bitsPerSample = 0;
  while (offset + 8 <= view.byteLength) {
    const chunkId = readAscii(view, offset, 4);
    const chunkSize = view.getUint32(offset + 4, true);
    const body = offset + 8;
    if (chunkId === 'fmt ') {
      channelCount = view.getUint16(body + 2, true);
      sampleRate = view.getUint32(body + 4, true);
      bitsPerSample = view.getUint16(body + 14, true);
    }
    if (chunkId === 'data') {
      if (bitsPerSample !== 16) {
        throw new Error('Only 16-bit PCM WAV files are supported.');
      }
      const available = Math.min(chunkSize, view.byteLength - body);
      const frameCount = Math.floor(available / (channelCount * 2));
      const channels = Array.from(
        { length: channelCount },
        () => new Int16Array(frameCount),
      );
      for (let frame = 0; frame < frameCount; frame += 1) {
        for (let channel = 0; channel < channelCount; channel += 1) {
          channels[channel][frame] = view.getInt16(
            body + (frame * channelCount + channel) * 2,
            true,
          );
        }
      }
      return {
        sampleRate,
        channels,
        bitsPerSample,
        durationSeconds: frameCount / sampleRate,
      };
    }
    offset = body + chunkSize + (chunkSize % 2);
  }
  throw new Error('The WAV file has no data chunk.');
};
