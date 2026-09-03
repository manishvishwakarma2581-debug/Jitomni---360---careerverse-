import React, { useState } from 'react';
import { X, Play, ExternalLink, Search, Sparkles, Volume2, VolumeX, RotateCcw, Video, List, CheckCircle2 } from 'lucide-react';
import { Language, TopicItem } from '../types';
import { speech } from '../utils/speech';

interface YouTubePlayerModalProps {
  topic: TopicItem;
  lang: Language;
  onClose: () => void;
}

export const YouTubePlayerModal: React.FC<YouTubePlayerModalProps> = ({ topic, lang, onClose }) => {
  const [activeMode, setActiveMode] = useState<'youtube' | 'script'>('youtube');
  const [currentSceneIdx, setCurrentSceneIdx] = useState<number>(0);
  const [isPlayingScript, setIsPlayingScript] = useState<boolean>(false);
  const [isAudioEnabled, setIsAudioEnabled] = useState<boolean>(true);
  const [isIframeLoaded, setIsIframeLoaded] = useState<boolean>(false);

  const topicName = topic.name[lang] || topic.name['hi'] || topic.name['en'];
  const videoData = topic.adaptive360?.youtubeVideo;
  const scriptScenes = videoData?.scenesScript || topic.videoScript?.scenes || [];

  const defaultSearch = videoData?.searchQuery || `${topicName} ${topic.subject} ${topic.classLevel ? 'Class ' + topic.classLevel : topic.examType || ''} Hindi animation lesson`;
  const [searchQuery, setSearchQuery] = useState<string>(defaultSearch);

  // Encoded YouTube search embed URL
  const encodedQuery = encodeURIComponent(searchQuery);
  const embedUrl = `https://www.youtube-nocookie.com/embed?listType=search&list=${encodedQuery}&autoplay=1`;
  const directSearchUrl = `https://www.youtube.com/results?search_query=${encodedQuery}`;

  const recommendedChannels = videoData?.recommendedChannels || [
    'NCERT Official',
    'Khan Academy India',
    'Physics Wallah',
    'Dear Sir',
    'Drishti IAS',
    'Wi-Fi Study',
  ];

  const quickSearchQueries = [
    `${topicName} 3D Animation Explanation`,
    `${topicName} 10-Second Short Trick`,
    `${topicName} Full Chapter Marathon`,
    `${topicName} Previous Year Questions PYQ`,
  ];

  const handlePlayScriptScene = (idx: number) => {
    setCurrentSceneIdx(idx);
    const scene = scriptScenes[idx];
    if (scene && isAudioEnabled) {
      speech.stop();
      const text = scene.narration[lang] || scene.narration['hi'] || scene.narration['en'];
      speech.speak(text, lang, () => {
        if (idx < scriptScenes.length - 1) {
          handlePlayScriptScene(idx + 1);
        } else {
          setIsPlayingScript(false);
        }
      });
    }
  };

  const toggleScriptPlay = () => {
    if (isPlayingScript) {
      speech.stop();
      setIsPlayingScript(false);
    } else {
      setIsPlayingScript(true);
      handlePlayScriptScene(currentSceneIdx);
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-2 sm:p-4 bg-black/90 backdrop-blur-md animate-in fade-in duration-200">
      <div className="bg-[#0A1931] w-full max-w-4xl rounded-2xl sm:rounded-3xl border border-amber-500/50 shadow-2xl overflow-hidden flex flex-col max-h-[92vh]">
        {/* Header */}
        <div className="p-4 sm:p-5 bg-[#030B1E] border-b border-amber-500/30 flex items-center justify-between">
          <div className="flex items-center gap-2.5">
            <span className="p-2 rounded-xl bg-red-600/20 text-red-400 font-bold border border-red-500/40 flex items-center gap-1.5">
              <Video className="w-4 h-4" />
              <span>YouTube 360° Studio</span>
            </span>
            <div>
              <h3 className="font-heading font-black text-white text-base sm:text-lg">{topicName}</h3>
              <p className="text-xs text-amber-300/80">Adaptive Video & AI Visual Script</p>
            </div>
          </div>
          <button
            onClick={() => {
              speech.stop();
              onClose();
            }}
            className="p-1.5 rounded-lg bg-slate-800 text-slate-300 hover:text-white"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Mode Selector Tabs */}
        <div className="px-4 py-2.5 bg-[#071329] border-b border-slate-800 flex items-center justify-between gap-3">
          <div className="flex items-center gap-2">
            <button
              onClick={() => {
                speech.stop();
                setActiveMode('youtube');
              }}
              className={`px-3.5 py-1.5 rounded-xl text-xs font-bold transition-all flex items-center gap-1.5 ${
                activeMode === 'youtube'
                  ? 'bg-red-600 text-white shadow-md shadow-red-600/30'
                  : 'bg-slate-800 text-slate-400 hover:text-slate-200'
              }`}
            >
              <Play className="w-3.5 h-3.5 fill-current" />
              <span>YouTube Video Player</span>
            </button>
            <button
              onClick={() => {
                setActiveMode('script');
              }}
              className={`px-3.5 py-1.5 rounded-xl text-xs font-bold transition-all flex items-center gap-1.5 ${
                activeMode === 'script'
                  ? 'bg-blue-600 text-white shadow-md shadow-blue-600/30'
                  : 'bg-slate-800 text-slate-400 hover:text-slate-200'
              }`}
            >
              <Sparkles className="w-3.5 h-3.5 text-amber-300" />
              <span>AI Scene-by-Scene Script</span>
            </button>
          </div>

          <a
            href={directSearchUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="px-3 py-1.5 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-200 text-xs font-bold flex items-center gap-1 border border-slate-700"
          >
            <span>Open in YouTube</span>
            <ExternalLink className="w-3.5 h-3.5" />
          </a>
        </div>

        {/* Body Content */}
        <div className="p-4 sm:p-6 overflow-y-auto flex-1 space-y-4">
          {activeMode === 'youtube' ? (
            <div className="space-y-4">
              {/* Responsive Video Frame */}
              <div className="relative bg-black rounded-2xl overflow-hidden aspect-video w-full border border-slate-800 shadow-2xl flex items-center justify-center">
                {isIframeLoaded ? (
                  <iframe
                    title="YouTube Educational Video Search Player"
                    src={embedUrl}
                    className="w-full h-full"
                    allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                    allowFullScreen
                  />
                ) : (
                  <div className="absolute inset-0 bg-gradient-to-br from-slate-900 via-[#071329] to-black flex flex-col items-center justify-center p-6 text-center space-y-4">
                    <div className="w-16 h-16 rounded-full bg-red-600/90 text-white flex items-center justify-center shadow-lg shadow-red-600/40 animate-pulse cursor-pointer hover:scale-110 transition-transform"
                         onClick={() => setIsIframeLoaded(true)}>
                      <Play className="w-8 h-8 fill-white ml-1" />
                    </div>
                    <div>
                      <h4 className="text-white font-bold text-base sm:text-lg">Click to Load & Stream Video</h4>
                      <p className="text-xs text-slate-400 mt-1 max-w-md">
                        {topicName} • Verified Top Educational Videos
                      </p>
                    </div>
                    <button
                      onClick={() => setIsIframeLoaded(true)}
                      className="px-5 py-2.5 rounded-xl bg-red-600 hover:bg-red-500 text-white font-bold text-xs sm:text-sm flex items-center gap-2 shadow-md"
                    >
                      <Play className="w-4 h-4 fill-white" />
                      <span>Play YouTube Stream Now</span>
                    </button>
                  </div>
                )}
              </div>

              {/* Search Query Customizer */}
              <div className="p-3.5 rounded-2xl bg-[#071329] border border-amber-500/30 space-y-2">
                <div className="flex items-center gap-2">
                  <Search className="w-4 h-4 text-amber-400" />
                  <span className="text-xs font-bold text-white">YouTube सर्च कीवर्ड्स (Change Query):</span>
                </div>
                <div className="flex gap-2">
                  <input
                    type="text"
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    className="flex-1 px-3 py-1.5 rounded-xl bg-[#030B1E] border border-slate-700 text-white text-xs focus:outline-none focus:border-amber-400"
                  />
                  <a
                    href={`https://www.youtube.com/results?search_query=${encodeURIComponent(searchQuery)}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="px-4 py-1.5 rounded-xl bg-red-600 hover:bg-red-500 text-white text-xs font-bold flex items-center gap-1 shrink-0"
                  >
                    <span>Search</span>
                    <ExternalLink className="w-3.5 h-3.5" />
                  </a>
                </div>

                {/* Quick Query Pills */}
                <div className="flex flex-wrap gap-1.5 pt-1">
                  {quickSearchQueries.map((q, idx) => (
                    <button
                      key={idx}
                      onClick={() => setSearchQuery(q)}
                      className="px-2.5 py-1 rounded-lg bg-slate-800/80 hover:bg-slate-700 text-slate-300 text-[11px] transition-colors border border-slate-700/60"
                    >
                      {q}
                    </button>
                  ))}
                </div>
              </div>

              {/* Curated Channels */}
              <div className="p-3.5 rounded-2xl bg-[#030B1E] border border-slate-800 space-y-2">
                <span className="text-xs font-bold text-amber-400 block">अनुशंसित एजुकेशनल चैनल्स (Curated Verified Creators):</span>
                <div className="flex flex-wrap gap-2">
                  {recommendedChannels.map((ch, idx) => (
                    <span
                      key={idx}
                      className="px-2.5 py-1 rounded-lg bg-slate-800 text-slate-300 text-xs font-medium border border-slate-700 flex items-center gap-1"
                    >
                      <CheckCircle2 className="w-3 h-3 text-emerald-400" />
                      <span>{ch}</span>
                    </span>
                  ))}
                </div>
              </div>
            </div>
          ) : (
            /* AI Visual Script Mode */
            <div className="space-y-4">
              <div className="p-4 rounded-2xl bg-[#071329] border border-blue-500/30 flex items-center justify-between">
                <div>
                  <h4 className="font-bold text-white text-sm sm:text-base">AI Visual Script & Voice-Over</h4>
                  <p className="text-xs text-slate-400">Total {scriptScenes.length} Interactive Scenes</p>
                </div>
                <div className="flex items-center gap-2">
                  <button
                    onClick={() => setIsAudioEnabled(!isAudioEnabled)}
                    className={`p-2 rounded-xl text-xs font-bold flex items-center gap-1 border ${
                      isAudioEnabled ? 'bg-blue-600/20 text-blue-300 border-blue-500/40' : 'bg-slate-800 text-slate-400 border-slate-700'
                    }`}
                  >
                    {isAudioEnabled ? <Volume2 className="w-4 h-4 text-blue-400" /> : <VolumeX className="w-4 h-4" />}
                    <span>{isAudioEnabled ? 'Voice On' : 'Voice Off'}</span>
                  </button>
                  <button
                    onClick={toggleScriptPlay}
                    className="px-4 py-2 rounded-xl bg-amber-500 text-slate-950 font-bold text-xs sm:text-sm hover:scale-105 transition-all flex items-center gap-1.5 shadow-md shadow-amber-500/30"
                  >
                    {isPlayingScript ? <X className="w-4 h-4" /> : <Play className="w-4 h-4 fill-slate-950" />}
                    <span>{isPlayingScript ? 'Pause' : 'Play Narration'}</span>
                  </button>
                </div>
              </div>

              {/* Scene Cards */}
              <div className="space-y-3">
                {scriptScenes.map((scene, idx) => {
                  const isCurrent = idx === currentSceneIdx;
                  return (
                    <div
                      key={idx}
                      onClick={() => handlePlayScriptScene(idx)}
                      className={`p-4 rounded-2xl border transition-all cursor-pointer ${
                        isCurrent
                          ? 'bg-[#102447] border-amber-400 ring-2 ring-amber-400/40 shadow-lg'
                          : 'bg-[#030B1E] border-slate-800 hover:border-slate-700'
                      }`}
                    >
                      <div className="flex items-center justify-between mb-2">
                        <span className="px-2 py-0.5 rounded bg-amber-500/20 text-amber-300 text-xs font-mono font-bold">
                          Scene {idx + 1} • {scene.timestamp || '0:00'}
                        </span>
                        {isCurrent && (
                          <span className="px-2 py-0.5 rounded-full bg-emerald-500/20 text-emerald-400 text-[11px] font-bold animate-pulse">
                            Playing Now
                          </span>
                        )}
                      </div>
                      <div className="text-xs text-cyan-300 mb-2 font-medium">
                        🎬 <strong>Visual:</strong> {scene.visual || 'Dynamic 3D blueprint animation'}
                      </div>
                      <p className="text-slate-200 text-xs sm:text-sm leading-relaxed">
                        {scene.narration[lang] || scene.narration['hi'] || scene.narration['en']}
                      </p>
                    </div>
                  );
                })}
              </div>
            </div>
          )}
        </div>

        {/* Footer */}
        <div className="p-4 bg-[#030B1E] border-t border-slate-800 flex items-center justify-between text-xs text-slate-400">
          <span>JITOMNI Smart Learning Video Hub</span>
          <button
            onClick={() => {
              speech.stop();
              onClose();
            }}
            className="px-4 py-1.5 rounded-xl bg-slate-800 text-slate-200 hover:bg-slate-700 font-bold"
          >
            Close
          </button>
        </div>
      </div>
    </div>
  );
};
