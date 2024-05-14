import { DeepgramClient } from '@deepgram/sdk';
import { webvtt } from '@deepgram/captions';

export async function post(req: Request) {
  // 1. Parse o corpo da requisição
  const data = await req.json();

  // 2. Verifica se o evento é do tipo 'video.asset.ready'
  if (data.type === 'video.asset.ready') {
    // Aqui, assumimos que você tem a URL do vídeo. 
    // Você precisa ajustar essa parte para obter a URL correta do vídeo.
    const videoUrl = 'URL_DO_SEU_VIDEO';

    // 3. Configura o SDK do Deepgram
    const deepgram = new DeepgramClient('SEU_DEEPGRAM_API_KEY');
    
    try {
      // Realiza a transcrição
      const { result, error } = await deepgram.listen.prerecorded.transcribeUrl(
        { url: videoUrl },
        { model: 'nova' }
      );

      if (error) {
        console.error('Erro na transcrição:', error);
        return new Response('Erro na transcrição', { status: 500 });
      }

      // Converte o resultado para WebVTT
      const vttOutput = webvtt(result);

      // Aqui você pode salvar o resultado da transcrição ou fazer o que for necessário com ele

      return new Response('Transcrição concluída com sucesso', { status: 200 });
    } catch (error) {
      console.error('Erro ao processar o webhook:', error);
      return new Response('Erro interno do servidor', { status: 500 });
    }
  } else {
    // Se o tipo do evento não for 'video.asset.ready', retorna um status de sucesso,
    // mas sem processar nada.
    return new Response('Evento ignorado', { status: 200 });
  }
}
