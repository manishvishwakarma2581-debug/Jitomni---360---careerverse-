import React, { useState } from 'react';
import { X, Network, Sparkles, Layers, FileCode } from 'lucide-react';
import { Language, TopicItem } from '../types';
import { translations } from '../data/translations';
import { synthesizeAdaptive360 } from '../utils/topicClassifier';
import { MermaidDiagram } from './MermaidDiagram';

interface InfographicModalProps {
  topic: TopicItem;
  lang: Language;
  onClose: () => void;
}

export const InfographicModal: React.FC<InfographicModalProps> = ({ topic, lang, onClose }) => {
  const adaptive = topic.adaptive360 || synthesizeAdaptive360(
    topic.name.en || topic.name.hi || 'Topic',
    topic.subject || 'General',
    topic.chapter || 'Foundations',
    topic.classLevel,
    topic.examType
  );

  const mermaidData = adaptive.mermaidInfographic || {
    diagramCode: `graph TD\n  A[${topic.name.en || 'Topic'}] --> B[Key Principle]\n  B --> C[Mastery Drill]`,
    title: { hi: `${topic.name.hi || topic.name.en} इन्फोग्राफिक मैप`, en: `${topic.name.en} Infographic Map` },
    type: 'flowchart',
  };

  const [activeTab, setActiveTab] = useState<'mermaid' | 'nodes'>('mermaid');

  const info = topic.infographicData;
  const nodes = info?.nodes || [];
  const [selectedNodeId, setSelectedNodeId] = useState<string>(nodes[0]?.id || '1');
  const selectedNode = nodes.find((n) => n.id === selectedNodeId) || nodes[0];

  const titleText = mermaidData.title[lang] || mermaidData.title['hi'] || mermaidData.title['en'] || topic.name[lang] || topic.name['en'];

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-2 sm:p-4 bg-black/90 backdrop-blur-md animate-in fade-in duration-200">
      <div className="bg-[#0A1931] w-full max-w-4xl rounded-2xl sm:rounded-3xl border border-amber-500/50 shadow-2xl overflow-hidden flex flex-col max-h-[92vh]">
        {/* Header */}
        <div className="p-4 sm:p-5 bg-[#030B1E] border-b border-amber-500/30 flex items-center justify-between">
          <div className="flex items-center gap-2.5">
            <span className="p-2 rounded-xl bg-purple-500/20 text-purple-300 font-bold border border-purple-500/40 flex items-center gap-1">
              <Network className="w-4 h-4 text-amber-300" />
              <span>360° Infographic Map</span>
            </span>
            <div>
              <h3 className="font-heading font-black text-white text-base sm:text-lg">
                {topic.name[lang] || topic.name['en']}
              </h3>
              <p className="text-xs text-amber-300/80">Dynamic Mermaid Vector & Concept Blueprint</p>
            </div>
          </div>
          <button
            onClick={onClose}
            className="p-1.5 rounded-lg bg-slate-800 text-slate-300 hover:text-white"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Tab switcher if nodes exist */}
        {nodes.length > 0 && (
          <div className="px-4 py-2 bg-[#071329] border-b border-slate-800 flex gap-2">
            <button
              onClick={() => setActiveTab('mermaid')}
              className={`px-3 py-1 rounded-lg text-xs font-bold transition-all flex items-center gap-1.5 ${
                activeTab === 'mermaid'
                  ? 'bg-purple-600 text-white'
                  : 'bg-slate-800 text-slate-400 hover:text-slate-200'
              }`}
            >
              <FileCode className="w-3.5 h-3.5" />
              <span>Mermaid.js Vector SVG</span>
            </button>
            <button
              onClick={() => setActiveTab('nodes')}
              className={`px-3 py-1 rounded-lg text-xs font-bold transition-all flex items-center gap-1.5 ${
                activeTab === 'nodes'
                  ? 'bg-purple-600 text-white'
                  : 'bg-slate-800 text-slate-400 hover:text-slate-200'
              }`}
            >
              <Layers className="w-3.5 h-3.5" />
              <span>Node Connection Grid</span>
            </button>
          </div>
        )}

        {/* Blueprint Body */}
        <div className="p-4 sm:p-6 overflow-y-auto space-y-6 flex-1">
          {activeTab === 'mermaid' ? (
            <div className="space-y-4">
              <MermaidDiagram
                code={mermaidData.diagramCode}
                title={titleText}
              />
            </div>
          ) : (
            <div className="space-y-4">
              {/* Summary Box */}
              <div className="p-4 rounded-2xl bg-[#102447] border border-amber-500/30 text-xs sm:text-sm text-slate-200">
                <span className="font-bold text-amber-400 block mb-1">विहंगावलोकन (360° Blueprint Overview):</span>
                {info?.summary[lang] || info?.summary['en'] || 'Visual node connections mapping key principles.'}
              </div>

              {/* Connected Node Flow */}
              <div className="space-y-3">
                <h4 className="text-xs font-bold text-slate-400 uppercase tracking-wider">
                  इंटरैक्टिव नोड्स (Click a node to inspect):
                </h4>

                <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-3">
                  {nodes.map((node, idx) => {
                    const isSelected = node.id === selectedNodeId;
                    return (
                      <button
                        key={node.id}
                        onClick={() => setSelectedNodeId(node.id)}
                        className={`p-3.5 rounded-2xl border text-left transition-all relative overflow-hidden flex flex-col justify-between min-h-[105px] ${
                          isSelected
                            ? 'bg-[#102447] border-amber-400 ring-2 ring-amber-400/50 shadow-lg scale-105'
                            : 'bg-[#071329] border-slate-800 hover:border-slate-700'
                        }`}
                      >
                        <div className="flex items-center justify-between">
                          <span
                            className="w-6 h-6 rounded-lg text-xs font-black flex items-center justify-center text-slate-950"
                            style={{ backgroundColor: node.color }}
                          >
                            {idx + 1}
                          </span>
                          {isSelected && <Sparkles className="w-4 h-4 text-amber-400" />}
                        </div>

                        <h5 className="font-bold text-white text-xs mt-2 leading-tight">
                          {node.label[lang] || node.label['en']}
                        </h5>
                      </button>
                    );
                  })}
                </div>
              </div>

              {/* Selected Node Details Card */}
              {selectedNode && (
                <div className="p-5 rounded-2xl bg-gradient-to-r from-[#030B1E] via-[#0A1931] to-[#102447] border border-amber-500/40 space-y-3 animate-in fade-in duration-150">
                  <div className="flex items-center gap-3">
                    <span
                      className="w-4 h-4 rounded-full"
                      style={{ backgroundColor: selectedNode.color }}
                    />
                    <h4 className="text-lg font-black text-white font-heading">
                      {selectedNode.label[lang] || selectedNode.label['en']}
                    </h4>
                  </div>

                  <p className="text-slate-200 text-sm sm:text-base leading-relaxed">
                    {selectedNode.desc[lang] || selectedNode.desc['en']}
                  </p>
                </div>
              )}
            </div>
          )}
        </div>

        {/* Footer */}
        <div className="p-4 bg-[#030B1E] border-t border-slate-800 flex items-center justify-between">
          <span className="text-xs text-slate-400">JITOMNI Visual Infographic Engine</span>
          <button
            onClick={onClose}
            className="px-5 py-2 rounded-xl bg-slate-800 text-slate-200 font-bold text-xs sm:text-sm hover:bg-slate-700"
          >
            {translations.buttons.close[lang]}
          </button>
        </div>
      </div>
    </div>
  );
};
