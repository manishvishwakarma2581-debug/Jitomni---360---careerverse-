import React from 'react';
import { YouTubePlayerModal } from './YouTubePlayerModal';
import { Language, TopicItem } from '../types';

interface VideoModalProps {
  topic: TopicItem;
  lang: Language;
  onClose: () => void;
}

export const VideoModal: React.FC<VideoModalProps> = (props) => {
  return <YouTubePlayerModal {...props} />;
};
