// Corrected section
const response = await openai.audio.speech.create({
  model: 'tts-1',
  voice: 'alloy',
  input: text,
});

// Convert response to audio blob properly
const audioBuffer = await response.arrayBuffer();
const audioBlob = new Blob([audioBuffer], { type: 'audio/mpeg' });

if (audioBlob.size === 0) {
  console.error('Empty audio blob received');
  return NextResponse.json(
    { error: 'Generated empty audio' },
    { status: 500 }
  );
}

console.log('Returning audio blob, size:', audioBlob.size);

return new NextResponse(audioBlob, {
  headers: {
    'Content-Type': 'audio/mpeg',
  },
});
