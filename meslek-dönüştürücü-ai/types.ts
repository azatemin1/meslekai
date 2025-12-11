import React from 'react';

export interface Profession {
  id: string;
  name: string; // Turkish name for display
  promptName: string; // English name for the prompt
  icon: React.ReactNode;
}

export interface Background {
  id: string;
  name: string;
  promptName: string;
  icon: React.ReactNode;
}

export interface GeneratedImageResult {
  imageUrl: string;
  profession: string;
}

export enum AppState {
  IDLE = 'IDLE',
  LOADING = 'LOADING',
  SUCCESS = 'SUCCESS',
  ERROR = 'ERROR'
}