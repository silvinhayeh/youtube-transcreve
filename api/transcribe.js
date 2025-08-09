import { getTranscript } from "youtube-transcript";

export default async function handler(req, res) {
  const videoUrl = req.query.url;
  if (!videoUrl) {
    return res.status(400).json({ error: "URL do vídeo não fornecida" });
  }

  try {
    const videoId = videoUrl.split("v=")[1]?.split("&")[0] || videoUrl.split("/").pop();
    const transcript = await getTranscript(videoId, { lang: "pt" });
    if (!transcript || transcript.length === 0) {
      return res.status(404).json({ error: "Nenhuma legenda encontrada" });
    }
    const text = transcript.map(t => t.text).join(" ");
    res.status(200).json({ text });
  } catch (error) {
    res.status(500).json({ error: "Erro ao buscar transcrição" });
  }
}
